/**
 * @param {number} n
 * @return {boolean}
 */
var canAliceWin = function(n) {
    let stones = 10;
    let aliceTurn = true;

    while (n >= stones) {
        n -= stones;
        stones--;
        aliceTurn = !aliceTurn;
    }

    // If the loop ends on Bob's turn (!aliceTurn), Bob cannot move, so Alice wins.
    return !aliceTurn;
};
