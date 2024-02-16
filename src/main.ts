export type StopId = number;
export type LineId = number;
export type EdgeId = string;

export interface PathNode {
  readonly id: StopId;
  readonly cost: number;
  readonly delay: number;
  readonly line?: Line;
}

export interface Line {
  readonly id: LineId;
  readonly display: string;
  readonly heading: StopId;
}

export interface Edge {
  readonly id: EdgeId;
  readonly cost: number;
  readonly line: Line;
  readonly source: Stop;
  readonly target: Stop;
}

export interface Stop {
  readonly id: StopId;
  readonly name: string;
  readonly edges: readonly Edge[];
}

export interface Departure {
  readonly line: LineId;
  readonly display: string;
  readonly time: Date;
  readonly heading: StopId;
}

export interface Departures {
  readonly departures: Departure[];
  readonly date: Date;
}

export interface Graph {
  readonly nodes: readonly Stop[];
}

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
