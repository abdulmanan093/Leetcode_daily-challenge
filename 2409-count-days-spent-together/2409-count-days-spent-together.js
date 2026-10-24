
/**
 * @param {string} arriveAlice
 * @param {string} leaveAlice
 * @param {string} arriveBob
 * @param {string} leaveBob
 * @return {number}
 */
var countDaysTogether = function(arriveAlice, leaveAlice, arriveBob, leaveBob) {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const toDayNumber = (date) => {
        const [month, day] = date.split("-").map(Number);
        let total = day;

        for (let i = 0; i < month - 1; i++) {
            total += daysInMonth[i];
        }

        return total;
    };

    const start = Math.max(toDayNumber(arriveAlice), toDayNumber(arriveBob));
    const end = Math.min(toDayNumber(leaveAlice), toDayNumber(leaveBob));

    return Math.max(0, end - start + 1);
};
