/**
 * @param {number[][]} items
 * @param {number} budget
 * @return {number}
 */
var maximumSaleItems = function(items, budget) {
    const n = items.length;
    const freq = new Int32Array(n + 1);
    let minPrice = Infinity;

    // 1. Count factor frequencies and find the minimum price overall
    for (let i = 0; i < n; i++) {
        const [factor, price] = items[i];
        freq[factor]++;
        if (price < minPrice) {
            minPrice = price;
        }
    }

    // 2. Compute how many items have a factor divisible by f (including self)
    const divisibleCount = new Int32Array(n + 1);
    for (let f = 1; f <= n; f++) {
        if (freq[f] === 0) continue;
        for (let multiple = f; multiple <= n; multiple += f) {
            divisibleCount[f] += freq[multiple];
        }
    }

    // 3. Collect all useful bonus batches: [price, maxBonusCopies]
    // A bonus copy gives 2 items, so it's only worth buying if price <= 2 * minPrice
    const bonusBatches = [];
    for (let i = 0; i < n; i++) {
        const [factor, price] = items[i];
        const maxBonus = divisibleCount[factor] - 1; // Exclude i itself
        if (maxBonus > 0 && price <= 2 * minPrice) {
            bonusBatches.push([price, maxBonus]);
        }
    }

    // 4. Sort bonus batches by price ascending
    bonusBatches.sort((a, b) => a[0] - b[0]);

    let totalItems = 0;
    let remainingBudget = budget;

    // 5. Greedily purchase bonus copies (each yields 2 items)
    for (let i = 0; i < bonusBatches.length; i++) {
        const [price, count] = bonusBatches[i];
        if (remainingBudget < price) break;

        const canBuy = Math.min(count, Math.floor(remainingBudget / price));
        totalItems += canBuy * 2;
        remainingBudget -= canBuy * price;
    }

    // 6. Spend any leftover budget on the cheapest single item (each yields 1 item)
    totalItems += Math.floor(remainingBudget / minPrice);

    return totalItems;
};
