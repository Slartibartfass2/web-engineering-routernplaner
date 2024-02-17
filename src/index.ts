import "./style.css";
import MapImg from "./map.png";
import { getDepartures, getGraph, getStopList } from "./getdata";
import { dfsearch } from "./graph";
import { Graph } from "./types";

const mapImg = document.getElementById("map-img");
if (mapImg !== null) {
  (mapImg as HTMLImageElement).src = MapImg;
}

let graph: Graph;
getGraph().then((g) => {
  graph = g;
});

let stations: string[] = [];
function setStopList(stops: string[]) {
  const stopList = document.getElementById("stop-list");
  if (stopList !== null) {
    stopList.innerHTML = stops
      .map(
        (stop) =>
          `<li><div>${stop}</div><input type="checkbox" name="${stop}" /></li>`
      )
      .join("");
  }
}

function setOptions(stops: string[]) {
  const options = stops
    .map((stop) => `<option value="${stop}"></option>`)
    .join("");
  const datalist = document.getElementById("stations");
  if (datalist !== null) {
    datalist.innerHTML = options;
  }
}

getStopList().then((stops) => {
  stations = stops;
  setOptions(stops);
  setStopList(stops);
});

const filter = document.getElementById(
  "stop-filter"
) as HTMLInputElement | null;
filter?.addEventListener("input", function () {
  const searchText = this.value.toLowerCase();
  const suggestions = stations.filter((station) =>
    station.toLowerCase().includes(searchText)
  );
  setStopList(suggestions);
});

const searchButton = document.getElementById(
  "search-connection"
) as HTMLInputElement | null;
searchButton?.addEventListener("click", function () {
  console.log(stations);
  const startStation = document.getElementById(
    "start-station"
  ) as HTMLInputElement | null;
  const stopStation = document.getElementById(
    "stop-station"
  ) as HTMLInputElement | null;
  const start = startStation?.value ?? "";
  const stop = stopStation?.value ?? "";
  const startId = stations.indexOf(start.trim());
  const stopId = stations.indexOf(stop.trim());
  if (startId === -1 || stopId === -1) {
    console.error("Invalid input!");
    return;
  }
  getDepartures(new Date(), startId).then((departures) => {
    const resultList = document.getElementById(
      "result-list"
    ) as HTMLDivElement | null;
    if (resultList !== null) {
      resultList.innerText = JSON.stringify(departures, null, 2);
    }
  });
  // const path = dfsearch(graph, [], [], startId, stopId);
});
