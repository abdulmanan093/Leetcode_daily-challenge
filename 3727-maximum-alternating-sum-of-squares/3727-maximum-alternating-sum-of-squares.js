/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAlternatingSum = function(nums) {
    const n = nums.length;
    // Map each number to its square
    const squares = new Array(n);
    for (let i = 0; i < n; i++) {
        squares[i] = nums[i] * nums[i];
    }
    
    // Sort squares in ascending order
    squares.sort((a, b) => a - b);
    
    // The first floor(n / 2) elements will be subtracted (negative positions)
    // The rest will be added (positive positions)
    const mid = Math.floor(n / 2);
    let totalScore = 0;
    
    for (let i = 0; i < mid; i++) {
        totalScore -= squares[i];
    }
    for (let i = mid; i < n; i++) {
        totalScore += squares[i];
    }
    
    return totalScore;
};
