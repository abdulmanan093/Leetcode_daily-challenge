/**
 * @param {number} n
 * @param {number[]} costs
 * @return {number}
 */
var climbStairs = function(n, costs) {
    // dp[i] stores the minimum cost to reach step i
    const dp = new Array(n + 1).fill(Infinity);
    
    // Base case: Starting at step 0 costs nothing
    dp[0] = 0;
    
    for (let i = 1; i <= n; i++) {
        const currentCost = costs[i - 1];
        
        // Option 1: Jump 1 step from i - 1
        if (i >= 1) {
            dp[i] = Math.min(dp[i], dp[i - 1] + currentCost + 1);
        }
        
        // Option 2: Jump 2 steps from i - 2
        if (i >= 2) {
            dp[i] = Math.min(dp[i], dp[i - 2] + currentCost + 4);
        }
        
        // Option 3: Jump 3 steps from i - 3
        if (i >= 3) {
            dp[i] = Math.min(dp[i], dp[i - 3] + currentCost + 9);
        }
    }
    
    return dp[n];
};
