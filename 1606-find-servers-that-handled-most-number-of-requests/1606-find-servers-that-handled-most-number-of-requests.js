/**
 * @param {number} k
 * @param {number[]} arrival
 * @param {number[]} load
 * @return {number[]}
 */
var busiestServers = function(k, arrival, load) {
    // requestCount[i] tracks how many requests server i handles
    const requestCount = new Array(k).fill(0);
    
    // LeetCode provides a native MinPriorityQueue.
    // It stores elements as objects with a priority property or customized priority.
    // We store an array [freeTime, serverId] and sort by freeTime.
    const busyHeap = new MinPriorityQueue({ compare: (a, b) => a[0] - b[0] });
    
    // Build a Segment Tree to track available servers. 
    // Value 1 means available, 0 means busy.
    const tree = new Array(4 * k).fill(0);
    
    function build(node, start, end) {
        if (start === end) {
            tree[node] = 1; // Initially all servers are available
            return;
        }
        const mid = (start + end) >> 1;
        build(node * 2, start, mid);
        build(node * 2 + 1, mid + 1, end);
        tree[node] = tree[node * 2] + tree[node * 2 + 1];
    }
    
    function update(node, start, end, idx, val) {
        if (start === end) {
            tree[node] = val;
            return;
        }
        const mid = (start + end) >> 1;
        if (idx <= mid) {
            update(node * 2, start, mid, idx, val);
        } else {
            update(node * 2 + 1, mid + 1, end, idx, val);
        }
        tree[node] = tree[node * 2] + tree[node * 2 + 1];
    }
    
    // Find the first available server index >= target
    function findNext(node, start, end, target) {
        if (tree[node] === 0 || end < target) return -1;
        if (start === end) return start;
        
        const mid = (start + end) >> 1;
        // First try the left subtree if it falls within target limits
        let res = findNext(node * 2, start, mid, target);
        if (res !== -1) return res;
        
        // Otherwise try the right subtree
        return findNext(node * 2 + 1, mid + 1, end, target);
    }
    
    // Initialize our availability tracking tree
    build(1, 0, k - 1);
    
    for (let i = 0; i < arrival.length; i++) {
        const currTime = arrival[i];
        
        // 1. Free up servers that finished their task before or at currTime
        while (!busyHeap.isEmpty() && busyHeap.front()[0] <= currTime) {
            const [_, serverId] = busyHeap.dequeue();
            update(1, 0, k - 1, serverId, 1); // Set availability back to 1
        }
        
        // 2. Determine target server index
        const targetServer = i % k;
        
        // Find next available server starting from targetServer to k-1
        let assignedServer = findNext(1, 0, k - 1, targetServer);
        
        // If not found, wrap around and check from 0 to targetServer-1
        if (assignedServer === -1) {
            assignedServer = findNext(1, 0, k - 1, 0);
        }
        
        // 3. Assign the request if an available server is found
        if (assignedServer !== -1) {
            requestCount[assignedServer]++;
            // Mark server as busy (0) in the segment tree
            update(1, 0, k - 1, assignedServer, 0);
            // Push its expected release time to the min-heap
            busyHeap.enqueue([currTime + load[i], assignedServer]);
        }
        // If assignedServer is still -1, the request is dropped.
    }
    
    // 4. Extract the busiest server(s)
    const maxCount = Math.max(...requestCount);
    const result = [];
    for (let i = 0; i < k; i++) {
        if (requestCount[i] === maxCount) {
            result.push(i);
        }
    }
    
    return result;
};
