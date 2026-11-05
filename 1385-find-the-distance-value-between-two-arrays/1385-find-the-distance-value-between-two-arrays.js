/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @param {number} d
 * @return {number}
 */
var findTheDistanceValue = function(arr1, arr2, d) {
    // Sort arr2 to enable binary search
    arr2.sort((a, b) => a - b);
    let distanceValue = 0;

    for (let i = 0; i < arr1.length; i++) {
        let val = arr1[i];
        
        // Define the target range that would make val invalid
        let low = val - d;
        let high = val + d;
        
        if (!hasElementInRange(arr2, low, high)) {
            distanceValue++;
        }
    }

    return distanceValue;
};

// Helper function to check if any element in sorted array falls within [low, high]
function hasElementInRange(arr, low, high) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        if (arr[mid] >= low && arr[mid] <= high) {
            return true; // Found an element within <= d distance
        } else if (arr[mid] < low) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return false;
}