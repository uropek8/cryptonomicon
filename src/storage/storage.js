import { fetchCoinsNames } from "../api/api";

export const getCoinsNames = async () => {
  let coinsNamesData = localStorage.getItem("coins-names");

  if (coinsNamesData) {
    coinsNamesData = JSON.parse(coinsNamesData);
  } else {
    coinsNamesData = await fetchCoinsNames();

    localStorage.setItem("coins-names", JSON.stringify(coinsNamesData));
  }

  return coinsNamesData;
}