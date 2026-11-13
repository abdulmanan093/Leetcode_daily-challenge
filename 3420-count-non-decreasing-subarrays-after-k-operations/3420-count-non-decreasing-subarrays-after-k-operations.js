/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countNonDecreasingSubarrays = function(nums, k) {
    const n = nums.length;
    let ans = 0;
    let cost = 0;
    let r = n - 1;
    
    // Monotonic decreasing deque storing indices of peaks from left to right.
    // Using a pre-allocated array with head/tail pointers for O(1) operations.
    const deque = new Int32Array(n);
    let head = 0;
    let tail = 0;

    // Iterate left pointer 'l' from right to left (n - 1 down to 0)
    for (let l = n - 1; l >= 0; l--) {
        // 1. Add nums[l] to the front of the window
        // Any peaks to the right that are smaller than nums[l] will now be 
        // raised to nums[l] instead of their previous peak value.
        while (head < tail && nums[deque[tail - 1]] < nums[l]) {
            const poppedIdx = deque[--tail];
            const nextBoundary = (head < tail) ? deque[tail - 1] : r + 1;
            const count = nextBoundary - poppedIdx;
            
            // Update cost: elements controlled by poppedIdx are now raised to nums[l]
            cost += count * (nums[l] - nums[poppedIdx]);
        }
        
        // Push current index 'l' as the new left-most peak
        deque[tail++] = l;

        // 2. Shrink window from the right if total operations exceed k
        while (cost > k) {
            // The element at 'r' is controlled by the oldest peak at deque[head]
            const controllingPeakIdx = deque[head];
            cost -= (nums[controllingPeakIdx] - nums[r]);
            
            // If the controlling peak itself is removed from the window, pop it
            if (controllingPeakIdx === r) {
                head++;
            }
            r--;
        }

        // 3. All subarrays starting at 'l' and ending at any index from 'l' to 'r' are valid
        ans += (r - l + 1);
    }

    return ans;
};
