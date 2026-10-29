/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {string} s
 * @param {string[]} queries
 * @return {boolean[]}
 */
var palindromePath = function(n, edges, s, queries) {
    // Build adjacency list
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    // DFS to get tin, tout, depth, and parent for LCA / tree flattening
    const tin = new Array(n).fill(0);
    const tout = new Array(n).fill(0);
    const depth = new Array(n).fill(0);
    const up = Array.from({ length: n }, () => new Array(18).fill(-1));
    let timer = 0;

    const dfs = (u, p, d) => {
        tin[u] = ++timer;
        depth[u] = d;
        up[u][0] = p;
        for (let i = 1; i < 18; i++) {
            if (up[u][i - 1] !== -1) {
                up[u][i] = up[up[u][i - 1]][i - 1];
            }
        }
        for (const v of adj[u]) {
            if (v !== p) {
                dfs(v, u, d + 1);
            }
        }
        tout[u] = timer;
    };

    dfs(0, -1, 0);

    const getLCA = (u, v) => {
        if (depth[u] < depth[v]) [u, v] = [v, u];
        for (let i = 17; i >= 0; i--) {
            if (depth[u] - (1 << i) >= depth[v]) {
                u = up[u][i];
            }
        }
        if (u === v) return u;
        for (let i = 17; i >= 0; i--) {
            if (up[u][i] !== up[v][i]) {
                u = up[u][i];
                v = up[v][i];
            }
        }
        return up[u][0];
    };

    // Fenwick Tree (Binary Indexed Tree) on DFS order
    const bit = new Array(n + 2).fill(0);
    const add = (idx, val) => {
        for (; idx <= n; idx += idx & -idx) bit[idx] ^= val;
    };
    const queryBIT = (idx) => {
        let res = 0;
        for (; idx > 0; idx -= idx & -idx) res ^= bit[idx];
        return res;
    };
    const rangeUpdate = (l, r, val) => {
        add(l, val);
        add(r + 1, val);
    };

    const charToMask = (c) => 1 << (c.charCodeAt(0) - 97);
    const nodeMasks = new Array(n);
    for (let i = 0; i < n; i++) {
        nodeMasks[i] = charToMask(s[i]);
        rangeUpdate(tin[i], tout[i], nodeMasks[i]);
    }

    const isPalindromeMask = (mask) => mask === 0 || (mask & (mask - 1)) === 0;

    const answer = [];
    for (const q of queries) {
        const parts = q.split(' ');
        if (parts[0] === 'update') {
            const u = parseInt(parts[1]);
            const c = parts[2];
            const newMask = charToMask(c);
            const diff = nodeMasks[u] ^ newMask;
            if (diff !== 0) {
                rangeUpdate(tin[u], tout[u], diff);
                nodeMasks[u] = newMask;
            }
        } else {
            const u = parseInt(parts[1]);
            const v = parseInt(parts[2]);
            const lca = getLCA(u, v);
            const maskU = queryBIT(tin[u]);
            const maskV = queryBIT(tin[v]);
            
            // Corrected formula: maskU ^ maskV ^ mask[LCA]
            const pathMask = maskU ^ maskV ^ nodeMasks[lca];
            answer.push(isPalindromeMask(pathMask));
        }
    }

    return answer;
};
