/**
 * @param {number} m
 * @param {number} n
 * @return {string[]}
 */
var createGrid = function(m, n) {
    const grid = Array.from({ length: m }, () => Array(n).fill('#'));
    
    // Fill the first row with '.'
    for (let j = 0; j < n; j++) {
        grid[0][j] = '.';
    }
    
    // Fill the last column with '.'
    for (let i = 0; i < m; i++) {
        grid[i][n - 1] = '.';
    }
    
    return grid.map(row => row.join(''));
};
