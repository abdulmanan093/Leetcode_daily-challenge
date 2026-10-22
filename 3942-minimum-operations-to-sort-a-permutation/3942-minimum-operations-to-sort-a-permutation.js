/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function(nums) {
    const n = nums.length;
    const idx0 = nums.indexOf(0);
    
    // Check if the array is cyclically increasing
    let isInc = true;
    for (let i = 0; i < n; i++) {
        if (nums[(idx0 + i) % n] !== i) {
            isInc = false;
            break;
        }
    }
    
    // Check if the array is cyclically decreasing
    let isDec = true;
    for (let i = 0; i < n; i++) {
        if (nums[(idx0 - i + n) % n] !== i) {
            isDec = false;
            break;
        }
    }
    
    let minOps = Infinity;
    
    if (isInc) {
        minOps = Math.min(minOps, idx0, n - idx0 + 2);
    }
    
    if (isDec) {
        minOps = Math.min(minOps, n - idx0, idx0 + 2);
    }
    
    return minOps === Infinity ? -1 : minOps;
};
