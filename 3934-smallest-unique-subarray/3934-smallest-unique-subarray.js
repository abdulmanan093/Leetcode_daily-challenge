/**
 * @param {number[]} nums
 * @return {number}
 */
var smallestUniqueSubarray = function(nums) {
    const n = nums.length;
    
    // Two independent bases and prime moduli to prevent hash collisions
    const BASE1 = 1315423911n;
    const MOD1 = 1000000007n;
    const BASE2 = 100003n;
    const MOD2 = 1000000009n;
    
    // Precompute powers and prefix hashes
    const pow1 = new BigInt64Array(n + 1);
    const pow2 = new BigInt64Array(n + 1);
    const hash1 = new BigInt64Array(n + 1);
    const hash2 = new BigInt64Array(n + 1);
    
    pow1[0] = 1n;
    pow2[0] = 1n;
    
    for (let i = 0; i < n; i++) {
        const val = BigInt(nums[i]);
        pow1[i + 1] = (pow1[i] * BASE1) % MOD1;
        pow2[i + 1] = (pow2[i] * BASE2) % MOD2;
        
        hash1[i + 1] = (hash1[i] * BASE1 + val) % MOD1;
        hash2[i + 1] = (hash2[i] * BASE2 + val) % MOD2;
    }
    
    // Helper to check if at least one subarray of length `len` appears exactly once
    const hasUnique = (len) => {
        const freq = new Map();
        const p1 = pow1[len];
        const p2 = pow2[len];
        
        for (let i = 0; i <= n - len; i++) {
            let h1 = (hash1[i + len] - (hash1[i] * p1) % MOD1 + MOD1) % MOD1;
            let h2 = (hash2[i + len] - (hash2[i] * p2) % MOD2 + MOD2) % MOD2;
            
            // Combine both hashes into a single unique 64-bit key
            const key = (h1 << 32n) | h2;
            freq.set(key, (freq.get(key) || 0) + 1);
        }
        
        for (const count of freq.values()) {
            if (count === 1) return true;
        }
        return false;
    };
    
    // Binary search for the minimum valid length
    let low = 1;
    let high = n;
    let ans = n;
    
    while (low <= high) {
        const mid = (low + high) >> 1;
        if (hasUnique(mid)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    
    return ans;
};
