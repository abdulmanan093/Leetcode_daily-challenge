/**
 * @param {number[]} parent
 * @param {string} s
 * @return {number[]}
 */
var findSubtreeSizes = function (parent, s) {
  const n = parent.length;
  const children = Array.from({ length: n }, () => []);
  for (let i = 1; i < n; i++) {
    children[parent[i]].push(i);
  }

  const newParent = parent.slice();
  const lastSeen = new Array(26).fill(-1);

  // Iterative DFS to find closest ancestor with matching character
  // State 0: enter node, State 1: exit node (restore lastSeen)
  const stack = [[0, 0]];
  const prevStack = [];

  while (stack.length > 0) {
    const [u, state] = stack.pop();
    const c = s.charCodeAt(u) - 97;

    if (state === 0) {
      const prev = lastSeen[c];
      prevStack.push(prev);
      if (prev !== -1) {
        newParent[u] = prev;
      }
      lastSeen[c] = u;

      stack.push([u, 1]);
      for (let i = children[u].length - 1; i >= 0; i--) {
        stack.push([children[u][i], 0]);
      }
    } else {
      lastSeen[c] = prevStack.pop();
    }
  }

  // Build new tree and compute subtree sizes post-order
  const newChildren = Array.from({ length: n }, () => []);
  for (let i = 1; i < n; i++) {
    newChildren[newParent[i]].push(i);
  }

  const ans = new Array(n).fill(1);
  const order = [];
  const bfsStack = [0];

  while (bfsStack.length > 0) {
    const u = bfsStack.pop();
    order.push(u);
    for (const v of newChildren[u]) {
      bfsStack.push(v);
    }
  }

  for (let i = order.length - 1; i >= 0; i--) {
    const u = order[i];
    let size = 1;
    for (const v of newChildren[u]) {
      size += ans[v];
    }
    ans[u] = size;
  }

  return ans;
};
