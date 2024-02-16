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
