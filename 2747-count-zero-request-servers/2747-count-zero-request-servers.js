/**
 * @param {number} n
 * @param {number[][]} logs
 * @param {number} x
 * @param {number[]} queries
 * @return {number[]}
 */
var countServers = function(n, logs, x, queries) {
    // 1. Sort the logs by their timestamp ascending
    logs.sort((a, b) => a[1] - b[1]);
    
    // 2. Pair each query with its original index so we can sort them but answer in order
    const sortedQueries = queries.map((q, idx) => ({ time: q, index: idx }));
    sortedQueries.sort((a, b) => a.time - b.time);
    
    const ans = new Array(queries.length);
    
    // Using a Map or a Uint32Array to track active server frequencies in the window
    // Map is safe here since active servers won't exceed min(n, logs.length)
    const serverCounts = new Map(); 
    
    let left = 0;  // Out-of-window logs pointer
    let right = 0; // In-window logs pointer
    
    for (const query of sortedQueries) {
        const queryTime = query.time;
        const windowStart = queryTime - x;
        const windowEnd = queryTime;
        
        // Expand the right boundary: add logs that are <= windowEnd
        while (right < logs.length && logs[right][1] <= windowEnd) {
            const serverId = logs[right][0];
            serverCounts.set(serverId, (serverCounts.get(serverId) || 0) + 1);
            right++;
        }
        
        // Shrink the left boundary: remove logs that are < windowStart
        while (left < logs.length && logs[left][1] < windowStart) {
            const serverId = logs[left][0];
            if (serverCounts.has(serverId)) {
                const count = serverCounts.get(serverId) - 1;
                if (count === 0) {
                    serverCounts.delete(serverId);
                } else {
                    serverCounts.set(serverId, count);
                }
            }
            left++;
        }
        
        // The number of servers that did NOT receive a request is:
        // Total servers (n) - Distinct servers that received a request in this window
        ans[query.index] = n - serverCounts.size;
    }
    
    return ans;
};
