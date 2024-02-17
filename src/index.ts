import "./style.css";
import MapImg from "./map.png";
import { getStopList } from "./getdata";

const mapImg = document.getElementById("map-img");
if (mapImg !== null) {
  (mapImg as HTMLImageElement).src = MapImg;
}

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
