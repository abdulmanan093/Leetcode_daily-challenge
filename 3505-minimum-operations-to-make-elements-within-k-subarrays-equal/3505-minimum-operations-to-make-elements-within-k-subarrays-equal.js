// Renamed to avoid conflicts with LeetCode's built-in global Heap class
class CustomHeap {
    constructor(compare) {
        this.data = [];
        this.compare = compare;
    }
    push(val) {
        this.data.push(val);
        this.up(this.data.length - 1);
    }
    pop() {
        if (this.data.length === 0) return null;
        const top = this.data[0];
        const bottom = this.data.pop();
        if (this.data.length > 0) {
            this.data[0] = bottom;
            this.down(0);
        }
        return top;
    }
    peek() {
        return this.data.length > 0 ? this.data[0] : null;
    }
    size() {
        return this.data.length;
    }
    up(i) {
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (this.compare(this.data[i], this.data[p])) {
                const tmp = this.data[i];
                this.data[i] = this.data[p];
                this.data[p] = tmp;
                i = p;
            } else {
                break;
            }
        }
    }
    down(i) {
        const len = this.data.length;
        while ((i << 1) + 1 < len) {
            let left = (i << 1) + 1;
            let right = left + 1;
            let best = i;
            if (this.compare(this.data[left], this.data[best])) best = left;
            if (right < len && this.compare(this.data[right], this.data[best])) best = right;
            if (best !== i) {
                const tmp = this.data[i];
                this.data[i] = this.data[best];
                this.data[best] = tmp;
                i = best;
            } else {
                break;
            }
        }
    }
}

/**
 * @param {number[]} nums
 * @param {number} x
 * @param {number} k
 * @return {number}
 */
var minOperations = function(nums, x, k) {
    const n = nums.length;
    
    // Heaps to track sliding window median
    const lower = new CustomHeap((a, b) => a > b); // Max-heap
    const upper = new CustomHeap((a, b) => a < b); // Min-heap
    
    let lowerSum = 0, upperSum = 0;
    let lowerCount = 0, upperCount = 0;
    const delayed = new Map(); // For lazy deletion
    
    function prune(heap) {
        while (heap.size() > 0) {
            const val = heap.peek();
            const count = delayed.get(val) || 0;
            if (count > 0) {
                delayed.set(val, count - 1);
                heap.pop();
            } else {
                break;
            }
        }
    }
    
    const minOps = [];
    
    for (let i = 0; i < n; i++) {
        const num = nums[i];
        if (lower.size() === 0 || num <= lower.peek()) {
            lower.push(num);
            lowerSum += num;
            lowerCount++;
        } else {
            upper.push(num);
            upperSum += num;
            upperCount++;
        }
        
        if (i >= x) {
            const outNum = nums[i - x];
            prune(lower);
            if (outNum <= lower.peek()) {
                lowerCount--;
                lowerSum -= outNum;
            } else {
                upperCount--;
                upperSum -= outNum;
            }
            delayed.set(outNum, (delayed.get(outNum) || 0) + 1);
        }
        
        prune(lower);
        prune(upper);
        
        if (lowerCount < upperCount) {
            const val = upper.pop();
            lower.push(val);
            upperSum -= val;
            lowerSum += val;
            upperCount--;
            lowerCount++;
            prune(upper);
        } else if (lowerCount - upperCount > 1) {
            const val = lower.pop();
            upper.push(val);
            lowerSum -= val;
            upperSum += val;
            lowerCount--;
            upperCount++;
            prune(lower);
        }
        
        if (i >= x - 1) {
            prune(lower);
            prune(upper);
            const median = lower.peek();
            const ops = (median * lowerCount - lowerSum) + (upperSum - median * upperCount);
            minOps.push(ops);
        }
    }
    
    const dp = Array.from({ length: n + 1 }, () => Array(k + 1).fill(Infinity));
    for (let i = 0; i <= n; i++) {
        dp[i][0] = 0;
    }
    
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= k; j++) {
            dp[i][j] = dp[i - 1][j];
            
            if (i >= x) {
                const cost = minOps[i - x];
                if (dp[i - x][j - 1] !== Infinity) {
                    dp[i][j] = Math.min(dp[i][j], dp[i - x][j - 1] + cost);
                }
            }
        }
    }
    
    return dp[n][k];
};
