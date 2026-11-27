/**
 * @param {number[][]} items
 * @param {number} budget
 * @return {number}
 */
var maximumSaleItems = function(items, budget) {
    const n = items.length;
    let minPrice = Infinity;

    for (let i = 0; i < n; i++) {
        if (items[i][1] < minPrice) {
            minPrice = items[i][1];
        }
    }

    // Count how many other items j != i have factor[j] divisible by factor[i]
    const divCount = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        const factorI = items[i][0];
        let cnt = 0;
        for (let j = 0; j < n; j++) {
            if (i !== j && items[j][0] % factorI === 0) {
                cnt++;
            }
        }
        divCount[i] = cnt;
    }

    // 0/1 Knapsack: choose a subset of item types to buy at least once.
    // Buying item i costs price[i] and yields 1 (itself) + divCount[i] (free copies).
    const NEG_INF = -1e9;
    const dp = new Array(budget + 1).fill(NEG_INF);
    dp[0] = 0;

    for (let i = 0; i < n; i++) {
        const price = items[i][1];
        const gain = 1 + divCount[i];
        for (let b = budget; b >= price; b--) {
            if (dp[b - price] + gain > dp[b]) {
                dp[b] = dp[b - price] + gain;
            }
        }
    }

    // Spend any remaining budget on extra copies of the cheapest item(s)
    let ans = 0;
    for (let b = 0; b <= budget; b++) {
        if (dp[b] >= 0) {
            const extraCopies = Math.floor((budget - b) / minPrice);
            ans = Math.max(ans, dp[b] + extraCopies);
        }
    }

    return ans;
};
