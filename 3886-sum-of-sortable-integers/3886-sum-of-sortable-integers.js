/**
 * @param {number[]} nums
 * @return {number}
 */
var sortableIntegers = function(nums) {
    const n = nums.length;
    let sumOfK = 0;
    
    // Helper function to validate if a specific divisor k is sortable
    function isSortable(k) {
        let prevMax = -Infinity;
        
        for (let start = 0; start < n; start += k) {
            const end = start + k;
            let dropIndex = -1;
            let dropCount = 0;
            
            // Count circular drops within the current subarray block
            for (let i = start; i < end; i++) {
                const nextI = start + (i - start + 1) % k;
                if (nums[i] > nums[nextI]) {
                    dropCount++;
                    dropIndex = i;
                }
            }
            
            let currentMin, currentMax;
            
            if (dropCount === 0) {
                // If there are no drops, all elements in this block are identical
                currentMin = nums[start];
                currentMax = nums[start];
            } else if (dropCount === 1) {
                // The minimum element will be the one immediately after the drop
                const nextIdx = start + (dropIndex - start + 1) % k;
                currentMin = nums[nextIdx];
                currentMax = nums[dropIndex];
            } else {
                // More than 1 drop means it cannot be sorted by cyclic rotation
                return false;
            }
            
            // Check cross-block sorted order validity
            if (currentMin < prevMax) {
                return false;
            }
            
            prevMax = currentMax;
        }
        
        return true;
    }
    
    // Enumerate all possible divisors k of n
    for (let k = 1; k <= n; k++) {
        if (n % k === 0) {
            if (isSortable(k)) {
                sumOfK += k;
            }
        }
    }
    
    return sumOfK;
};
