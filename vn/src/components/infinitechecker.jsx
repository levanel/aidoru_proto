// This is a pure logic function, not a component
export const checkStoryCycle = (prerequisites) => {
    const adj = new Map();
    const inDegree = new Map();
    const allNodes = new Set();

    for (const [node, prereq] of prerequisites) {
        allNodes.add(node);
        allNodes.add(prereq);

        if (!adj.has(prereq)) adj.set(prereq, []);
        if (!inDegree.has(node)) inDegree.set(node, 0);
        if (!inDegree.has(prereq)) inDegree.set(prereq, 0);

        adj.get(prereq).push(node);
        inDegree.set(node, (inDegree.get(node) || 0) + 1);
    }

    const queue = [];
    for (const node of allNodes) {
        if ((inDegree.get(node) || 0) === 0) {
            queue.push(node);
        }
    }

    let visitedCount = 0;
    while (queue.length > 0) {
        const curr = queue.shift();
        visitedCount++;
        const neighbors = adj.get(curr) || [];
        for (const neighbor of neighbors) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }
    return visitedCount !== allNodes.size;
};