import { Observable } from "rxjs";

const API_BASE_URL = "https://data.toulouse-metropole.fr/api/v2";
const CATALOG = "catalog";
const DATASET = "statistiques-consultation-datatoulouse-metropolefr";
const ROWS_BY_FETCH = 100;
const MAX = 300;

const getSearch = query => {
  return (
    "?" +
    Object.keys(query)
      .reduce((urlSearchParams, key) => {
        urlSearchParams.append(key, query[key]);
        return urlSearchParams;
      }, new URLSearchParams(""))
      .toString()
  );
};

const getUrl = (start, count) => {
  const path = `${API_BASE_URL}/${CATALOG}/datasets/${DATASET}/records`;
  const query = {
    rows: count,
    start: start
  };
  const url = new URL(path);
  url.search = getSearch(query);
  return url;
};

const getRecords = data =>
  data && !data.errorcode
    ? data.records.map(({ record }) => record.fields)
    : [];

const fetchRecords = (start, rows) =>
  Observable.fromPromise(
    fetch(getUrl(start, rows)).then(response => response.json())
  ).map(data => ({
    totalCount: data.total_count,
    nextStart: start + rows,
    records: getRecords(data)
  }));

const fetchStreamRecords = () =>
  fetchRecords(0, ROWS_BY_FETCH)
    .expand(({ totalCount, nextStart, records }) => {
      if (nextStart < totalCount && nextStart < MAX && records.length > 0) {
        return fetchRecords(nextStart, ROWS_BY_FETCH);
      } else {
        return Observable.empty();
      }
    })
    .map(({ records }) => records);

const fetchStats = () =>
  fetchStreamRecords()
    .scan((fullList, newRecords) => [...fullList, ...newRecords], [])
    .do(records => console.log(records.length));

export default fetchStats;
