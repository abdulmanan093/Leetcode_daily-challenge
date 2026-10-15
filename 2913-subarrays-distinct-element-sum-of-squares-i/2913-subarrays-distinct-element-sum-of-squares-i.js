/**
 * @param {number[]} nums
 * @return {number}
 */
var sumCounts = function(nums) {
    let totalSumOfSquares = 0;
    const n = nums.length;

    // Iterate over each starting position of the subarray
    for (let i = 0; i < n; i++) {
        const distinctElements = new Set();
        
        // Expand the subarray from index i to j
        for (let j = i; j < n; j++) {
            distinctElements.add(nums[j]);
            
            // Get the count of distinct values, square it, and add to total
            let distinctCount = distinctElements.size;
            totalSumOfSquares += distinctCount * distinctCount;
        }
    }

    return totalSumOfSquares;
};
