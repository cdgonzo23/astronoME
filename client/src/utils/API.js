import { currentDate } from "./currentDate";

export const neoFeed = () => {
  return fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${currentDate}&api_key=XQ7xFZNSplEZXx0FcSm7FpWkx8nyFrQZ3TEQ5xfE`);
};
export const dailyImage = () => {
  return fetch(`https://api.nasa.gov/planetary/apod?api_key=XQ7xFZNSplEZXx0FcSm7FpWkx8nyFrQZ3TEQ5xfE`);
};
