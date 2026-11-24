/**
 * @param {number[]} nums
 * @return {number}
 */
var maxLength = function(nums) {
    const gcd = (a, b) => {
        while (b !== 0) {
            const t = b;
            b = a % b;
            a = t;
        }
        return a;
    };

    const lcm = (a, b) => (a / gcd(a, b)) * b;

    const MAX_TARGET = 2520 * 10; // lcm(1..10) * max(nums[i]) = 25200
    let ans = 1;

    for (let i = 0; i < nums.length; i++) {
        let prod = 1;
        let curGcd = 0;
        let curLcm = 1;

        for (let j = i; j < nums.length; j++) {
            const val = nums[j];
            prod *= val;
            curGcd = curGcd === 0 ? val : gcd(curGcd, val);
            curLcm = lcm(curLcm, val);

            if (prod > MAX_TARGET) {
                break;
            }

            if (prod === curLcm * curGcd) {
                ans = Math.max(ans, j - i + 1);
            }
        }
    }

    return ans;
};
