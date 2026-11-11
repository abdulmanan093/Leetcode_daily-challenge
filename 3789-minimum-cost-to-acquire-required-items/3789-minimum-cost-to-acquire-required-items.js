/**
 * @param {number} cost1
 * @param {number} cost2
 * @param {number} costBoth
 * @param {number} need1
 * @param {number} need2
 * @return {number}
 */
var minimumCost = function(cost1, cost2, costBoth, need1, need2) {
    // Effective minimum cost for a single unit of type 1 or type 2
    const minSingle1 = Math.min(cost1, costBoth);
    const minSingle2 = Math.min(cost2, costBoth);
    
    // Overlapping units needed for both requirements
    const common = Math.min(need1, need2);
    
    // Minimum cost to satisfy the overlapping portion
    const commonCost = common * Math.min(costBoth, cost1 + cost2);
    
    // Cost for any remaining units of type 1 or type 2
    const rem1Cost = (need1 - common) * minSingle1;
    const rem2Cost = (need2 - common) * minSingle2;
    
    return commonCost + rem1Cost + rem2Cost;
};
