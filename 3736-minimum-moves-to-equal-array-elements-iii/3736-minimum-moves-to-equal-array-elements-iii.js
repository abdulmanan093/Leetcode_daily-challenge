/**
 * @param {number[]} nums
 * @return {number}
 */
var minMoves = function(nums) {
    // Find the maximum value in the array
    const maxVal = Math.max(...nums);
    
    // Sum up the differences between the max value and each element
    let totalMoves = 0;
    for (let i = 0; i < nums.length; i++) {
        totalMoves += maxVal - nums[i];
    }
    
    return totalMoves;
};
