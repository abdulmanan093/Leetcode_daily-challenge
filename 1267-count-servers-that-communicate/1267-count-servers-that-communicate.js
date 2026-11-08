/**
 * @param {number[][]} grid
 * @return {number}
 */
var countServers = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    
    const rowCount = new Array(m).fill(0);
    const colCount = new Array(n).fill(0);
    
    // First pass: count servers in each row and column
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                rowCount[i]++;
                colCount[j]++;
            }
        }
    }
    
    let communicatingServers = 0;
    
    // Second pass: count servers that share a row or column with another server
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                if (rowCount[i] > 1 || colCount[j] > 1) {
                    communicatingServers++;
                }
            }
        }
    }
    
    return communicatingServers;
};

