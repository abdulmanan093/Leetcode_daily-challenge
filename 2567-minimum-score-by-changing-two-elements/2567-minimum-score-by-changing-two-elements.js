/**
 * @param {number[]} nums
 * @return {number}
 */
var minimizeSum = function(nums) {
    // Sort the array in ascending order
    nums.sort((a, b) => a - b);
    
    const n = nums.length;
    
    // Case 1: Change the two smallest elements
    const option1 = nums[n - 1] - nums[2];
    
    // Case 2: Change the two largest elements
    const option2 = nums[n - 3] - nums[0];
    
    // Case 3: Change the smallest and the largest element
    const option3 = nums[n - 2] - nums[1];
    
    return Math.min(option1, option2, option3);
};
