/**
 * @param {number[][]} grid
 * @return {number}
 */
var minCost = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    
    // dp[j][k] will be 1 if XOR sum 'k' is possible at column 'j'
    const dp = Array.from({ length: n }, () => new Uint8Array(1024));
    
    // Base case: Starting cell
    dp[0][grid[0][0]] = 1;
    
    // Initialize the first row (can only move right)
    for (let j = 1; j < n; j++) {
        const val = grid[0][j];
        for (let k = 0; k < 1024; k++) {
            if (dp[j - 1][k]) {
                dp[j][k ^ val] = 1;
            }
        }
    }
    
    // Temporary buffer to hold the transitions for the current cell
    const current = new Uint8Array(1024);
    
    // Process the remaining rows
    for (let i = 1; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const val = grid[i][j];
            current.fill(0);
            
            // 1. Move Down: Transitions from the top neighbor (previous row's dp[j])
            for (let k = 0; k < 1024; k++) {
                if (dp[j][k]) {
                    current[k ^ val] = 1;
                }
            }
            
            // 2. Move Right: Transitions from the left neighbor (current row's dp[j-1])
            if (j > 0) {
                for (let k = 0; k < 1024; k++) {
                    if (dp[j - 1][k]) {
                        current[k ^ val] = 1;
                    }
                }
            }
            
            // Update the dp table for the current cell
            dp[j].set(current);
        }
    }
    
    // Find the minimum possible XOR sum in the bottom-right cell
    for (let k = 0; k < 1024; k++) {
        if (dp[n - 1][k]) {
            return k;
        }
    }
    
    return -1;
};
