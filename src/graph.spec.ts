import { v4 as uuidv4 } from "uuid";
import { Graph, Line } from "./types";
import { dfsearch } from "./graph";

function createEdge(src: any, tgt: any, line: Line): any {
  return {
    id: uuidv4(),
    cost: 1,
    source: src,
    target: tgt,
    line: line,
  };
}

function testDFSearch(): Graph {
  const line: Line = {
    id: 1,
    display: "Line 1",
    heading: 1,
  };

  let s1: any = { id: 1, name: "s1" };
  let s2: any = { id: 2, name: "s2" };
  let s3: any = { id: 3, name: "s3" };
  let s4: any = { id: 4, name: "s4" };
  let s5: any = { id: 5, name: "s5" };
  let s6: any = { id: 6, name: "s6" };
  let s7: any = { id: 7, name: "s7" };
  let s8: any = { id: 8, name: "s8" };

  const s1_s2 = createEdge(s1, s2, line);
  const s1_s3 = createEdge(s1, s3, line);
  s1.edges = [s1_s2, s1_s3];

  const s2_s5 = createEdge(s2, s5, line);
  s2.edges = [s2_s5];

  const s3_s6 = createEdge(s3, s6, line);
  const s3_s4 = createEdge(s3, s4, line);
  s3.edges = [s3_s4, s3_s6];

  const s4_s2 = createEdge(s4, s2, line);
  const s4_s7 = createEdge(s4, s7, line);
  const s4_s8 = createEdge(s4, s8, line);
  s4.edges = [s4_s2, s4_s7, s4_s8];

  const s5_s6 = createEdge(s5, s6, line);
  s5.edges = [s5_s6];

  const s6_s2 = createEdge(s6, s2, line);
  const s6_s7 = createEdge(s6, s7, line);
  s6.edges = [s6_s2, s6_s7];

  const s7_s5 = createEdge(s7, s5, line);
  const s7_s8 = createEdge(s7, s8, line);
  s7.edges = [s7_s5, s7_s8];

  const s8_s3 = createEdge(s8, s3, line);
  s8.edges = [s8_s3];

  const graph: Graph = {
    nodes: [s1, s2, s3, s4, s5, s6, s7, s8],
  };
  return graph;
}

test("2->8", () => {
  const graph: Graph = testDFSearch();

  const path = dfsearch(graph, [], [], 2, 8);

  expect(path).toBeDefined();
});

test("2->1", () => {
  const graph: Graph = testDFSearch();

  const path = dfsearch(graph, [], [], 2, 1);

  expect(path).toBeUndefined();
});
