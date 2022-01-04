import { fetchCoinsNames } from "../api/api";

export const getCoinsNames = async () => {
  let namesData = localStorage.getItem("coins-names");

  if (namesData) {
    namesData = JSON.parse(namesData);
  } else {
    const coinsNames = await fetchCoinsNames();
    
    if (coinsNames) {
      namesData = coinsNames;
      
      localStorage.setItem("coins-names", JSON.stringify(coinsNames));
    } else {
      namesData = [];
    }
  }

  return namesData;
};

export const getAddedTickers = () => {
  let tickersData = localStorage.getItem("cryptonomicon-list");

  if (tickersData) {
    tickersData = JSON.parse(tickersData);
  } else {
    tickersData = null;
  }

  return tickersData;
};
