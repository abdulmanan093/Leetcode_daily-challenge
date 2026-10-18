/**
 * @param {number[]} nums
 * @return {number}
 */
var numOfWays = function(nums) {
    const MOD = 1000000007;
    const n = nums.length;
    
    // Precompute combinations (Pascal's Triangle) using BigInt 0n
    const table = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0n));
    
    for (let i = 0; i <= n; i++) {
        table[i][0] = 1n; // C(i, 0) is always 1
        for (let j = 1; j <= i; j++) {
            table[i][j] = (table[i - 1][j - 1] + table[i - 1][j]) % BigInt(MOD);
        }
    }
    
    function ways(arr) {
        if (arr.length <= 2) return 1n;
        
        const root = arr[0];
        const left = [];
        const right = [];
        
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < root) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        
        const leftWays = ways(left);
        const rightWays = ways(right);
        
        const leftLen = left.length;
        const rightLen = right.length;
        
        // Fetch C(leftLen + rightLen, leftLen) from our table
        const comb = table[leftLen + rightLen][leftLen];
        
        let res = (comb * leftWays) % BigInt(MOD);
        res = (res * rightWays) % BigInt(MOD);
        
        return res;
    }
    
    // Subtract 1 to exclude the original array permutation itself
    return Number((ways(nums) - 1n + BigInt(MOD)) % BigInt(MOD));
};
