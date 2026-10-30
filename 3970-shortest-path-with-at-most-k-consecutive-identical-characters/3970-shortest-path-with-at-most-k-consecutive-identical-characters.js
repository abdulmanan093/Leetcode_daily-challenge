/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {string} labels
 * @param {number} k
 * @return {number}
 */
var shortestPath = function(n, edges, labels, k) {
    // Build adjacency list: u -> list of [v, w]
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v, w] of edges) {
        adj[u].push([v, w]);
    }

    // Min-priority queue simulation or binary heap
    // Since we don't have a built-in PQ in JS, a simple min-heap or sorted array approach / custom PQ is needed.
    // For large constraints (n <= 5 * 10^4), a proper MinPriorityQueue or custom binary heap is required.
    // Here is the structure using a MinPriorityQueue (available in LeetCode environment):
    
    const pq = new MinPriorityQueue({ compare: (a, b) => a[0] - b[0] });
    // State: [distance, node, lastChar, count]
    const startChar = labels[0];
    pq.enqueue([0, 0, startChar, 1]);

    // Visited map: key = `${node}_${lastChar}_${count}` -> min distance
    const distMap = new Map();

    while (!pq.isEmpty()) {
        const [d, u, lastChar, count] = pq.dequeue();

        if (u === n - 1) {
            return d;
        }

        const stateKey = `${u}_${lastChar}_${count}`;
        if (distMap.has(stateKey) && distMap.get(stateKey) < d) {
            continue;
        }
        distMap.set(stateKey, d);

        for (const [v, w] of adj[u]) {
            const nextChar = labels[v];
            const nextCount = (nextChar === lastChar) ? count + 1 : 1;

            if (nextCount <= k) {
                const nextDist = d + w;
                const nextStateKey = `${v}_${nextChar}_${nextCount}`;
                
                if (!distMap.has(nextStateKey) || nextDist < distMap.get(nextStateKey)) {
                    distMap.set(nextStateKey, nextDist);
                    pq.enqueue([nextDist, v, nextChar, nextCount]);
                }
            }
        }
    }

    return -1;
};
