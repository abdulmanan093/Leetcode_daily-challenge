/**
 * @param {number[]} servers
 * @param {number[]} tasks
 * @return {number[]}
 */
var assignTasks = function(servers, tasks) {
    // Free servers ordered by: [weight, index]
    const free = new TaskMinHeap((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));

    // Busy servers ordered by: [freeTime, weight, index]
    const busy = new TaskMinHeap((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        if (a[1] !== b[1]) return a[1] - b[1];
        return a[2] - b[2];
    });

    for (let i = 0; i < servers.length; i++) {
        free.push([servers[i], i]);
    }

    const ans = new Array(tasks.length);
    let time = 0;

    for (let j = 0; j < tasks.length; j++) {
        // Advance time to at least the arrival time of task j
        time = Math.max(time, j);

        // If no servers are free, fast-forward time to the earliest completion
        if (free.size() === 0) {
            time = busy.peek()[0];
        }

        // Move all servers that finish at or before current 'time' back to 'free'
        while (busy.size() > 0 && busy.peek()[0] <= time) {
            const [, weight, index] = busy.pop();
            free.push([weight, index]);
        }

        // Assign task j to the highest-priority free server
        const [weight, index] = free.pop();
        ans[j] = index;
        busy.push([time + tasks[j], weight, index]);
    }

    return ans;
};

class TaskMinHeap {
    constructor(compare) {
        this.data = [];
        this.compare = compare;
    }

    size() {
        return this.data.length;
    }

    peek() {
        return this.data[0];
    }

    push(val) {
        this.data.push(val);
        this.bubbleUp(this.data.length - 1);
    }

    pop() {
        if (this.data.length === 1) return this.data.pop();
        const top = this.data[0];
        this.data[0] = this.data.pop();
        this.bubbleDown(0);
        return top;
    }

    bubbleUp(idx) {
        while (idx > 0) {
            const parent = (idx - 1) >> 1;
            if (this.compare(this.data[idx], this.data[parent]) < 0) {
                [this.data[idx], this.data[parent]] = [this.data[parent], this.data[idx]];
                idx = parent;
            } else {
                break;
            }
        }
    }

    bubbleDown(idx) {
        const len = this.data.length;
        while (true) {
            let smallest = idx;
            const left = (idx << 1) + 1;
            const right = left + 1;

            if (left < len && this.compare(this.data[left], this.data[smallest]) < 0) {
                smallest = left;
            }
            if (right < len && this.compare(this.data[right], this.data[smallest]) < 0) {
                smallest = right;
            }
            if (smallest !== idx) {
                [this.data[idx], this.data[smallest]] = [this.data[smallest], this.data[idx]];
                idx = smallest;
            } else {
                break;
            }
        }
    }
}
