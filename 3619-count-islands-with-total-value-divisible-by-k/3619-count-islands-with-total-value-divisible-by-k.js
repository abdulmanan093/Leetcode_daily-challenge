/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var countIslands = function(grid, k) {
    const m = grid.length;
    const n = grid[0].length;
    let count = 0;

    // Helper function for DFS traversal
    const dfs = (r, c) => {
        // Base case: check boundary conditions and if the cell is land (> 0)
        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] === 0) {
            return 0;
        }

        // Add current cell value to the island total
        let sum = grid[r][c];
        
        // Mark the cell as visited by setting it to 0
        grid[r][c] = 0;

        // Explore all 4 directions
        sum += dfs(r + 1, c);
        sum += dfs(r - 1, c);
        sum += dfs(r, c + 1);
        sum += dfs(r, c - 1);

        return sum;
    };

    // Traverse the grid to find islands
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] > 0) {
                // Get the total sum of the current island
                const islandSum = dfs(i, j);
                
                // Check divisibility by k
                if (islandSum % k === 0) {
                    count++;
                }
            }
        }
    }

    return count;
};
