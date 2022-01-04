export const formatedPrice = (price) => {
  if (price === "-") {
    return price;
  }

  return price > 1 ? Number(price).toFixed(2) : Number(price).toPrecision(2);
};
