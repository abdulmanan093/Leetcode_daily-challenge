/**
 * @param {number[]} nums
 * @return {number}
 */
var minMoves = function(nums) {
    let min = nums[0];
    let sum = 0;
    
    // Find the minimum value and the total sum in a single pass
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] < min) {
            min = nums[i];
        }
        sum += nums[i];
    }
    
    // Calculate total moves using the simplified formula
    return sum - (nums.length * min);
};
