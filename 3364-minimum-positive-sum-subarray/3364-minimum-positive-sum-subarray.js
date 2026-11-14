/**
 * @param {number[]} nums
 * @param {number} l
 * @param {number} r
 * @return {number}
 */
var minimumSumSubarray = function(nums, l, r) {
    let minSum = Infinity;
    const n = nums.length;

    // Loop through each possible starting index
    for (let i = 0; i < n; i++) {
        let currentSum = 0;

        // Expand the subarray from index i up to length r
        for (let j = i; j < n && (j - i + 1) <= r; j++) {
            currentSum += nums[j];
            const length = j - i + 1;

            // Check if the length is at least l and the sum is positive
            if (length >= l && currentSum > 0) {
                minSum = Math.min(minSum, currentSum);
            }
        }
    }

    // If no valid subarray was found, return -1
    return minSum === Infinity ? -1 : minSum;
};
