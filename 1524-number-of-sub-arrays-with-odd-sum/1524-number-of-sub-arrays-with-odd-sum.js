/**
 * @param {number[]} arr
 * @return {number}
 */
var numOfSubarrays = function(arr) {
    const MOD = 1e9 + 7;
    let totalOddSubarrays = 0;
    let currentSum = 0;
    
    // Start with evenCount = 1 to account for a prefix sum of 0
    let evenCount = 1;
    let oddCount = 0;

    for (let num of arr) {
        currentSum += num;

        if (currentSum % 2 !== 0) {
            // Current prefix sum is odd; pair it with previous even prefix sums
            totalOddSubarrays = (totalOddSubarrays + evenCount) % MOD;
            oddCount++;
        } else {
            // Current prefix sum is even; pair it with previous odd prefix sums
            totalOddSubarrays = (totalOddSubarrays + oddCount) % MOD;
            evenCount++;
        }
    }

    return totalOddSubarrays;
};
