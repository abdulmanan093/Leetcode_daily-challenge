/**
 * @param {number[]} nums
 * @return {number}
 */
var minSwaps = function(nums) {
    // Helper function to calculate the sum of digits of a number
    const getDigitSum = (num) => {
        let sum = 0;
        while (num > 0) {
            sum += num % 10;
            num = Math.floor(num / 10);
        }
        return sum;
    };

    // Pair each number with its original index and its digit sum
    let mapped = nums.map((num, originalIndex) => {
        return {
            val: num,
            originalIndex: originalIndex,
            digitSum: getDigitSum(num)
        };
    });

    // Sort based on the custom rules:
    // 1. Increasing order of digit sums.
    // 2. If digit sums are equal, the smaller absolute number comes first.
    mapped.sort((a, b) => {
        if (a.digitSum !== b.digitSum) {
            return a.digitSum - b.digitSum;
        }
        return a.val - b.val;
    });

    let visited = new Array(nums.length).fill(false);
    let totalSwaps = 0;

    for (let i = 0; i < nums.length; i++) {
        // If the element is already visited or it's already in the correct spot
        if (visited[i] || mapped[i].originalIndex === i) {
            continue;
        }

        // Cycle detection
        let cycleSize = 0;
        let j = i;
        
        while (!visited[j]) {
            visited[j] = true;
            // Jump to the original index where this element came from
            j = mapped[j].originalIndex;
            cycleSize++;
        }

        // If a cycle is formed, it takes (cycleSize - 1) swaps to correct it
        if (cycleSize > 1) {
            totalSwaps += (cycleSize - 1);
        }
    }

    return totalSwaps;
};
