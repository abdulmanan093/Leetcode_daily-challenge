/**
 * @param {number[][]} grid
 * @return {number}
 */
var uniquePaths = function(grid) {
    const MOD = 1090000007; // Note: problem says modulo 10^9 + 7
    // Let's use 1000000007 (10^9 + 7), standard competitive programming modulus
    const MOD_VAL = 1000000007;
    const m = grid.length;
    const n = grid[0].length;

    // dp[i][j][0] -> number of paths entering cell (i, j) moving RIGHT
    // dp[i][j][1] -> number of paths entering cell (i, j) moving DOWN
    const dp = Array.from({ length: m }, () =>
        Array.from({ length: n }, () => [0, 0])
    );

    // Helper to simulate reflections from cell (r, c) given initial direction (dir)
    // dir: 0 for right, 1 for down
    function getNextState(r, c, dir) {
        let currR = r;
        let currC = c;
        let currDir = dir;

        while (currR >= 0 && currR < m && currC >= 0 && currC < n && grid[currR][currC] === 1) {
            if (currDir === 0) {
                // Trying to move right into a mirror -> turns down into (currR + 1, currC)
                currR += 1;
                currDir = 1; // now moving down
            } else {
                // Trying to move down into a mirror -> turns right into (currR, currC + 1)
                currC += 1;
                currDir = 0; // now moving right
            }
        }

        if (currR < 0 || currR >= m || currC < 0 || currC >= n) {
            return null; // Out of bounds
        }
        return [currR, currC, currDir];
    }

    // Base cases from start (0, 0)
    // From (0,0), initial moves are right (0,1) or down (1,0)
    // Let's propagate paths cell by cell
    // We can initialize start position:
    // If (0,0) is not a mirror (guaranteed 0), how do we start?
    // We can consider a virtual source or seed the initial right/down moves from (0,0).
    
    // Actually, a clean way is to iterate through each cell (i, j) and state (dir) and push paths to neighbors.
    // Let's seed dp table:
    // A path can arrive at initial state. Let's start with 1 way to be at (0,0).
    // Wait, the robot moves from (0,0) right or down.
    
    // Let's properly transition:
    // We can define a DP table where dp[i][j][dir] stores ways to arrive at (i,j) facing/moving in `dir` (0: right, 1: down).
    // Wait, standard grid DP:
    // If we are at cell (i, j), we can try moving right (from i, j-1) or down (from i-1, j).
    
    // Let's trace movement:
    // From any cell (i, j), moving RIGHT means we attempt to go to (i, j + 1). If grid[i][j+1] is a mirror, it reflects.
    // Moving DOWN means we attempt to go to (i + 1, j). If grid[i+1][j] is a mirror, it reflects.
    
    // Let's initialize a 2D array or use tabular DP:
    const waysRight = Array.from({ length: m }, () => Array(n).fill(0));
    const waysDown = Array.from({ length: m }, () => Array(n).fill(0));

    // At top-left (0,0), we can choose to move right or down.
    // Let's simulate the first step from (0,0):
    // If we move right from (0,0) -> target cell is (0, 1) with direction right (0)
    let resRight = getNextState(0, 1, 0);
    if (resRight) {
        let [tr, tc, tdir] = resRight;
        if (tdir === 0) waysRight[tr][tc] = (waysRight[tr][tc] + 1) % MOD_VAL;
        else waysDown[tr][tc] = (waysDown[tr][tc] + 1) % MOD_VAL;
    }

    // If we move down from (0,0) -> target cell is (1, 0) with direction down (1)
    let resDown = getNextState(1, 0, 1);
    if (resDown) {
        let [tr, tc, tdir] = resDown;
        if (tdir === 0) waysRight[tr][tc] = (waysRight[tr][tc] + 1) % MOD_VAL;
        else waysDown[tr][tc] = (waysDown[tr][tc] + 1) % MOD_VAL;
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) continue;

            // Total ways reaching (i, j) = coming from left (moving right) + coming from top (moving down)
            // Wait, at cell (i, j), how could we have arrived?
            // If there's a contribution from `waysRight[i][j]` and `waysDown[i][j]` accumulated from previous steps:
            let totalWaysHere = (waysRight[i][j] + waysDown[i][j]) % MOD_VAL;
            if (totalWaysHere === 0) continue;

            if (i === m - 1 && j === n - 1) continue; // Reached destination

            // From (i, j), we can try moving right -> target (i, j + 1) with dir 0
            if (j + 1 < n) {
                let next = getNextState(i, j + 1, 0);
                if (next) {
                    let [tr, tc, tdir] = next;
                    if (tdir === 0) {
                        waysRight[tr][tc] = (waysRight[tr][tc] + totalWaysHere) % MOD_VAL;
                    } else {
                        waysDown[tr][tc] = (waysDown[tr][tc] + totalWaysHere) % MOD_VAL;
                    }
                }
            }

            // From (i, j), we can try moving down -> target (i + 1, j) with dir 1
            if (i + 1 < m) {
                let next = getNextState(i + 1, j, 1);
                if (next) {
                    let [tr, tc, tdir] = next;
                    if (tdir === 0) {
                        waysRight[tr][tc] = (waysRight[tr][tc] + totalWaysHere) % MOD_VAL;
                    } else {
                        waysDown[tr][tc] = (waysDown[tr][tc] + totalWaysHere) % MOD_VAL;
                    }
                }
            }
        }
    }

    return (waysRight[m - 1][n - 1] + waysDown[m - 1][n - 1]) % MOD_VAL;
};
