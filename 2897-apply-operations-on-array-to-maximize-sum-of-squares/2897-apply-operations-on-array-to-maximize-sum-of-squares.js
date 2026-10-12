/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSum = function(nums, k) {
    const MOD = 1000000007n; // Using BigInt to prevent 64-bit float precision loss
    const bitCounts = new Array(30).fill(0);
    
    // Step 1: Count the frequency of each bit across all numbers
    for (const num of nums) {
        for (let b = 0; b < 30; b++) {
            if ((num >> b) & 1) {
                bitCounts[b]++;
            }
        }
    }
    
    let totalSumOfSquares = 0n;
    
    // Step 2: Form the k largest possible numbers greedily
    for (let i = 0; i < k; i++) {
        let currentNum = 0n;
        for (let b = 0; b < 30; b++) {
            if (bitCounts[b] > 0) {
                currentNum |= (1n << BigInt(b));
                bitCounts[b]--; // Use up one occurrence of this bit
            }
        }
        // Add its square to the total modulo 10^9 + 7
        totalSumOfSquares = (totalSumOfSquares + (currentNum * currentNum)) % MOD;
    }
    
    return Number(totalSumOfSquares);
};
