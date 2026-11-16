/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var digitSum = function(s, k) {
    while (s.length > k) {
        let nextS = "";
        
        // Step through the string in chunks of size k
        for (let i = 0; i < s.length; i += k) {
            let groupSum = 0;
            
            // Sum the digits in the current group
            for (let j = i; j < i + k && j < s.length; j++) {
                groupSum += Number(s[j]);
            }
            
            // Append the sum as a string to the next round's string
            nextS += groupSum.toString();
        }
        
        s = nextS;
    }
    
    return s;
};
