/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSelectedElements = function(nums) {
    nums.sort((a, b) => a - b);
    const dp = new Map();
    let ans = 0;

    for (const num of nums) {
        const endAtNext = (dp.get(num) || 0) + 1;
        const endAtCurr = (dp.get(num - 1) || 0) + 1;

        dp.set(num + 1, endAtNext);
        dp.set(num, endAtCurr);

        ans = Math.max(ans, endAtCurr, endAtNext);
    }

    return ans;
};
