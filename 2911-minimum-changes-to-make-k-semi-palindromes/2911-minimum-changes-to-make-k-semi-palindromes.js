/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var minimumChanges = function(s, k) {
    const n = s.length;
    const INF = 1e9;
    
    // Precompute divisors for every possible length from 2 to n
    const divisors = Array.from({ length: n + 1 }, () => []);
    for (let len = 2; len <= n; len++) {
        for (let d = 1; d < len; d++) {
            if (len % d === 0) {
                divisors[len].push(d);
            }
        }
    }
    
    // cost[i][j] = min changes to make s[i..j] a semi-palindrome
    const cost = Array.from({ length: n }, () => new Array(n).fill(INF));
    
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const len = j - i + 1;
            let minSubCost = INF;
            
            for (const d of divisors[len]) {
                let currentChanges = 0;
                const groupLen = len / d;
                
                // Check each of the 'd' interleaved groups
                for (let rem = 0; rem < d; rem++) {
                    let left = 0;
                    let right = groupLen - 1;
                    while (left < right) {
                        if (s[i + rem + left * d] !== s[i + rem + right * d]) {
                            currentChanges++;
                        }
                        left++;
                        right--;
                    }
                }
                minSubCost = Math.min(minSubCost, currentChanges);
            }
            cost[i][j] = minSubCost;
        }
    }
    
    // dp[p][i] = min changes to split prefix of length i into p semi-palindromes
    const dp = Array.from({ length: k + 1 }, () => new Array(n + 1).fill(INF));
    dp[0][0] = 0;
    
    for (let p = 1; p <= k; p++) {
        // Each of the p parts must have length at least 2
        for (let i = p * 2; i <= n; i++) {
            for (let j = (p - 1) * 2; j <= i - 2; j++) {
                if (dp[p - 1][j] !== INF) {
                    dp[p][i] = Math.min(dp[p][i], dp[p - 1][j] + cost[j][i - 1]);
                }
            }
        }
    }
    
    return dp[k][n];
};
