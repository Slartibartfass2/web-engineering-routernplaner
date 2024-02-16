import { v4 as uuidv4 } from "uuid";

type StopId = uuidv4;
type LineId = uuidv4;
type EdgeId = string;

interface PathNode {
  readonly id: StopId;
  readonly cost: number;
  readonly delay: number;
  readonly line: Line;
}

interface Line {
  readonly id: LineId;
  readonly display: string;
  readonly heading: StopId;
}

interface Edge {
  readonly id: EdgeId;
  readonly cost: number;
  readonly line: Line;
  readonly source: Stop;
  readonly target: Stop;
}

interface Stop {
  readonly id: StopId;
  readonly name: string;
  readonly edges: Edge[];
}

interface Departure {
  readonly line: LineId;
  readonly display: string;
  readonly time: Date;
}

interface Graph {
  readonly nodes: Stop[];
}

function getEdge(startStop: Stop, nextStop: Stop): Edge | undefined {
  return startStop.edges.find((edge) => edge.target === nextStop);
}

function findNode(graph: Graph, id: StopId): Stop | undefined {
  return graph.nodes.find((node) => node.id == id);
}

const edgesToString = (edges: Edge[]) =>
  `[${edges.map((edge) => edge.target.id).join(" ")}]`;

function print(graph: Graph) {
  const output = graph.nodes
    .map((node) => `${node.id} -> ${edgesToString(node.edges)}`)
    .join("\n");
  console.log(output);
}
