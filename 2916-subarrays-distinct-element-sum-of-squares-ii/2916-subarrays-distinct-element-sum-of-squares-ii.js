/**
 * @param {number[]} nums
 * @return {number}
 */
var sumCounts = function(nums) {
    const MOD = 1000000007;
    const n = nums.length;
    
    // Segment Tree representation
    const sum = new Array(4 * n).fill(0);
    const sqSum = new Array(4 * n).fill(0);
    const lazy = new Array(4 * n).fill(0);
    
    // Helper function to push updates down to children nodes
    function pushDown(node, start, end) {
        if (lazy[node] === 0) return;
        
        const mid = (start + end) >> 1;
        const leftNode = node * 2 + 1;
        const rightNode = node * 2 + 2;
        const val = lazy[node];
        
        // Update left child
        const lenL = mid - start + 1;
        sqSum[leftNode] = (sqSum[leftNode] + 2 * val * sum[leftNode] + val * val * lenL) % MOD;
        sum[leftNode] = (sum[leftNode] + val * lenL) % MOD;
        lazy[leftNode] = (lazy[leftNode] + val) % MOD;
        
        // Update right child
        const lenR = end - mid;
        sqSum[rightNode] = (sqSum[rightNode] + 2 * val * sum[rightNode] + val * val * lenR) % MOD;
        sum[rightNode] = (sum[rightNode] + val * lenR) % MOD;
        lazy[rightNode] = (lazy[rightNode] + val) % MOD;
        
        lazy[node] = 0;
    }
    
    // Range update to increment values in [ql, qr] by 1
    function updateRange(node, start, end, ql, qr) {
        if (ql <= start && end <= qr) {
            const len = end - start + 1;
            sqSum[node] = (sqSum[node] + 2 * sum[node] + len) % MOD;
            sum[node] = (sum[node] + len) % MOD;
            lazy[node] = (lazy[node] + 1) % MOD;
            return;
        }
        
        pushDown(node, start, end);
        const mid = (start + end) >> 1;
        
        if (ql <= mid) {
            updateRange(node * 2 + 1, start, mid, ql, qr);
        }
        if (qr > mid) {
            updateRange(node * 2 + 2, mid + 1, end, ql, qr);
        }
        
        sum[node] = (sum[node * 2 + 1] + sum[node * 2 + 2]) % MOD;
        sqSum[node] = (sqSum[node * 2 + 1] + sqSum[node * 2 + 2]) % MOD;
    }
    
    let totalSum = 0;
    const lastSeen = new Map();
    
    for (let r = 0; r < n; r++) {
        const x = nums[r];
        const l_prev = lastSeen.has(x) ? lastSeen.get(x) : -1;
        
        // Increment distinct counts for all subarrays starting from l_prev + 1 up to r
        updateRange(0, 0, n - 1, l_prev + 1, r);
        
        // Accumulate the current sum of squares across all active subarrays ending at r
        totalSum = (totalSum + sqSum[0]) % MOD;
        
        // Track the current index as the most recent position of x
        lastSeen.set(x, r);
    }
    
    return totalSum;
};
