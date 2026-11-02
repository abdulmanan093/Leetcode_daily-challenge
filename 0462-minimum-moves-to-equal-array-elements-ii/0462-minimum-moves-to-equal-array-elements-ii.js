/**
 * @param {number[]} nums
 * @return {number}
 */
var minMoves2 = function(nums) {
    // Step 1: Sort the array in ascending order
    nums.sort((a, b) => a - b);
    
    // Step 2: Choose the median as our target value
    const median = nums[Math.floor(nums.length / 2)];
    let moves = 0;
    
    // Step 3: Calculate total moves to bring every element to the median
    for (let i = 0; i < nums.length; i++) {
        moves += Math.abs(nums[i] - median);
    }
    
    return moves;
};
