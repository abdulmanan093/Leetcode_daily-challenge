/**
 * @param {string} s
 * @return {number}
 */
var minOperations = function(s) {
    let n = s.length;

    // 1. Check if already sorted (0 operations)
    let isSorted = true;
    for (let i = 0; i < n - 1; i++) {
        if (s[i] > s[i + 1]) {
            isSorted = false;
            break;
        }
    }
    if (isSorted) return 0;

    // 2. If length is 2 and not sorted, it's impossible
    if (n === 2) return -1;

    // 3. Find the global minimum and maximum characters
    let minChar = s[0];
    let maxChar = s[0];
    for (let i = 1; i < n; i++) {
        if (s[i] < minChar) minChar = s[i];
        if (s[i] > maxChar) maxChar = s[i];
    }

    // 4. Check if 1 operation is enough
    if (s[0] === minChar || s[n - 1] === maxChar) {
        return 1;
    }

    // 5. Check if 2 operations are enough (min or max character exists in the middle)
    for (let i = 1; i < n - 1; i++) {
        if (s[i] === minChar || s[i] === maxChar) {
            return 2;
        }
    }

    // 6. Otherwise, it takes 3 operations
    return 3;
};
