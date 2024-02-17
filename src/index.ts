import "./style.css";
import MapImg from "./map.png";
import { getStopList } from "./getdata";

const mapImg = document.getElementById("map-img");
if (mapImg !== null) {
  (mapImg as HTMLImageElement).src = MapImg;
}

getStopList()
  .then((stops) => {
    const stations = stops.map((stop) => `<option value="${stop}"></option>`).join();
    const datalist = document.getElementById("stations")
    if (datalist !== null) {
      datalist.innerHTML = stations;
    }
  })
