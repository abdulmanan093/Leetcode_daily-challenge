/**
 * @param {number[][]} grid
 * @return {number}
 */
var closedIsland = function(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    
    // Helper function to flood connected land (0 -> 1)
    const dfs = (r, c) => {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === 1) {
            return;
        }
        // Mark the current land cell as water so we don't revisit it
        grid[r][c] = 1;
        
        // Traverse in all 4 directions
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    };
    
    // Step 1: Flood all islands that touch the top or bottom boundaries
    for (let c = 0; c < cols; c++) {
        if (grid[0][c] === 0) dfs(0, c);
        if (grid[rows - 1][c] === 0) dfs(rows - 1, c);
    }
    
    // Step 2: Flood all islands that touch the left or right boundaries
    for (let r = 0; r < rows; r++) {
        if (grid[r][0] === 0) dfs(r, 0);
        if (grid[r][cols - 1] === 0) dfs(r, cols - 1);
    }
    
    // Step 3: Any remaining 0s are part of a completely closed island
    let closedIslandCount = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 0) {
                closedIslandCount++;
                dfs(r, c); // Flood this closed island to avoid double counting
            }
        }
    }
    
    return closedIslandCount;
};
