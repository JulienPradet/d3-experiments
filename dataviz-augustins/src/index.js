import { select } from "d3-selection";
import { json } from "d3-fetch";
import formatData from "./formatData";
import incrementTo from "./incrementTo";
import displayCollection from "./displayCollection";

json("/data/json/collections.json").then(data => {
  const totalText = select(".js-total-collection").text(0);
  incrementTo(data.length, totalText);

  const formattedData = formatData(data.slice(0, 100));
  displayCollection(formattedData, select(".js-raw-collection"));
});
