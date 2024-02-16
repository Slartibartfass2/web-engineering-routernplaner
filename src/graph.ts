import { Edge, Graph, PathNode, Stop, StopId } from "./types";

export function getEdge(startStop: Stop, nextStop: Stop): Edge | undefined {
  return startStop.edges.find((edge) => edge.target === nextStop);
}

export function findNode(graph: Graph, id: StopId): Stop | undefined {
  return graph.nodes.find((node) => node.id == id);
}

const edgesToString = (edges: readonly Edge[]) =>
  `[${edges.map((edge) => edge.target.id).join(" ")}]`;

export function print(graph: Graph) {
  const output = graph.nodes
    .map((node) => `${node.id} -> ${edgesToString(node.edges)}`)
    .join("\n");
  console.log(output);
}

export function dfsearch(
  graph: Graph,
  visitedNodes: StopId[],
  existingPath: PathNode[],
  startId: StopId,
  targetId: StopId
): PathNode[] | undefined {
  const startNode = findNode(graph, startId);
  if (!startNode) {
    return undefined;
  }

  visitedNodes.push(startNode.id);
  const path = existingPath.concat({
    id: startId,
    cost: 0,
    delay: 0,
    line: {
      id: Math.random(),
      display: "Start",
      heading: startId,
    },
  });

  if (startId === targetId) {
    return path;
  }

  for (const edge of startNode.edges) {
    if (visitedNodes.includes(edge.target.id)) {
      continue;
    }

    const newPath = dfsearch(
      graph,
      visitedNodes,
      path,
      edge.target.id,
      targetId
    );

    if (newPath) {
      return newPath;
    }
  }

  return undefined;
}
