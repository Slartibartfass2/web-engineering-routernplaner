import { Departure, Departures, LineId } from "./types";

function getDateDifferenceInSeconds(from: Date, to: Date) {
  return (to.getTime() - from.getTime()) / 1000;
}

function getNext(
  departures: Departures,
  line: LineId,
  time: Date
): Departure | undefined {
  return departures.departures
    .filter((departure) => departure.line == line)
    .sort(
      (a, b) =>
        getDateDifferenceInSeconds(time, a.time) -
        getDateDifferenceInSeconds(time, b.time)
    )[0];
}

function getDelay(departures: Departures, line: LineId, time: Date): number {
  const nextDeparture = getNext(departures, line, time);
  if (nextDeparture === undefined) {
    return Number.POSITIVE_INFINITY;
  }
  return getDateDifferenceInSeconds(time, nextDeparture.time) / 60;
}
