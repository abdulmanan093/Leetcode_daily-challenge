/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var targetIndices = function(nums, target) {
    // Sort the array in non-decreasing (ascending) order
    nums.sort((a, b) => a - b);
    
    const result = [];
    
    // Iterate through the sorted array and collect indices where nums[i] === target
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) {
            result.push(i);
        }
    }
    
    return result;
};
