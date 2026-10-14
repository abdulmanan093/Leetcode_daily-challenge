/**
 * @param {number} num
 * @param {number} sum
 * @return {string}
 */
var maxSumOfSquares = function(num, sum) {
    // The maximum possible sum for 'num' digits is 9 * num
    if (sum > 9 * num) {
        return "";
    }
    
    // Calculate the maximum number of 9s we can use
    const k = Math.floor(sum / 9);
    const r = sum % 9;
    
    // Construct the parts of the string
    const nines = "9".repeat(k);
    const remainder = r > 0 ? r.toString() : "";
    const zeros = "0".repeat(num - k - (r > 0 ? 1 : 0));
    
    return nines + remainder + zeros;
};
