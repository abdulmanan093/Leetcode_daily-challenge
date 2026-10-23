/**
 * @param {number[]} nums
 * @return {number}
 */
var sortPermutation = function(nums) {
    
};/**
 * @param {number[]} nums
 * @return {number}
 */
var sortPermutation = function(nums) {
    // Initialize ans with -1 (in binary, -1 has all bits set to 1)
    let ans = -1;
    let isSorted = true;

    for (let i = 0; i < nums.length; i++) {
        // Find elements that are not in their sorted positions
        if (nums[i] !== i) {
            ans &= nums[i];
            isSorted = false;
        }
    }

    // If already sorted, return 0; otherwise return the cumulative AND result
    return isSorted ? 0 : ans;
};
