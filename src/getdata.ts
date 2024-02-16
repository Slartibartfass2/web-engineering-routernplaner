import bent from "bent";
import { v4 as uuidv4 } from "uuid";
import { Departures, Edge, Line, Stop, StopId } from "./main";

const basicLink = "http://webeng.informatik.uni-ulm.de/line/";

async function requestData(url: string): Promise<any> {
  const getJSON = bent("json");
  return await getJSON(url);
}

export async function getStopList(): Promise<string[]> {
  const response = await requestData(basicLink + "/stop");

  if (typeof response !== "object" || !Array.isArray(response["stops"])) {
    throw new Error("Response is not an object");
  }

  return response["stops"] as string[];
}

interface RawLine {
  id: number;
  display: string;
  heading: number;
  trip: {
    stop: number;
    time: number;
  }[];
}

export async function getGraph(): Promise<any> {
  const response = await requestData(basicLink + "/data");

  if (
    typeof response !== "object" ||
    !Array.isArray(response["lines"]) ||
    !Array.isArray(response["stops"])
  ) {
    throw new Error("Response is not an object");
  }

  const stopNames = response["stops"] as string[];
  const partialStops = stopNames.map((name, id) => {
    return { id, name };
  });

  const rawLines = response["lines"] as RawLine[];
  const lines: Line[] = [];
  const edges: Edge[] = [];

  for (const rawLine of rawLines) {
    const line: Line = {
      id: rawLine.id,
      display: rawLine.display,
      heading: rawLine.heading,
    };
    lines.push(line);

    const trip = rawLine.trip;
    trip.forEach((stop, i) => {
      if (i === trip.length - 1) {
        return;
      }

      edges.push({
        id: uuidv4(),
        source: partialStops[stop.stop] as any,
        target: partialStops[trip[i + 1].stop] as any,
        line: line,
        cost: stop.time,
      });
    });
  }

  partialStops.forEach((stop) => {
    (stop as any).edges = edges.filter((edge) => edge.source.id === stop.id);
  });

  return { nodes: partialStops as Stop[] };
}

export async function getDepartures(
  startDate: Date,
  stopId: StopId
): Promise<Departures> {
  const time = `${startDate.getHours()}:${startDate.getMinutes()}`;
  const response = await requestData(
    basicLink + `/stop/${stopId}/departure?start=${time}`
  );

  if (!Array.isArray(response)) {
    throw Error("Response object is not an array");
  }

  const rawDepartures = response as {
    line: number;
    display: string;
    time: string;
    heading: number;
  }[];

  return {
    date: startDate,
    departures: rawDepartures.map((departure) => {
      const [hours, minutes] = departure.time.split(":").map(Number.parseInt);
      return {
        line: departure.line,
        display: departure.display,
        time: new Date(2019, 5, 27, hours, minutes),
        heading: departure.heading,
      };
    }),
  };
}
