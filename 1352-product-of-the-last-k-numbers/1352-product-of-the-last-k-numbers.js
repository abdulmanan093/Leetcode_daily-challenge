var ProductOfNumbers = function() {
    // Initialize with an array containing 1 as a neutral base for multiplication
    this.prefix = Array.of(1);
};

/** 
 * @param {number} num
 * @return {void}
 */
ProductOfNumbers.prototype.add = function(num) {
    if (num === 0) {
        // Reset the prefix array because any product including this 0 will be 0
        this.prefix = Array.of(1);
    } else {
        // Multiply the last prefix product by the new number
        const lastProduct = this.prefix[this.prefix.length - 1];
        this.prefix.push(lastProduct * num);
    }
};

/** 
 * @param {number} k
 * @return {number}
 */
ProductOfNumbers.prototype.getProduct = function(k) {
    const n = this.prefix.length;
    
    // If k >= n, there was a 0 within the last k elements that caused a reset
    if (k >= n) {
        return 0;
    }
    
    // Divide the latest cumulative product by the product right before the k window
    return this.prefix[n - 1] / this.prefix[n - 1 - k];
};

