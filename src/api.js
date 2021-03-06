const API_KEY =
	"007e40a1d992ab907d6960e0627091251a00b7b0a56b288c075ba9e53d0f18c3";
const tickerHandlers = new Map();

// TODO refactoring to use searchParams
const loadTickers = () => {
	if (tickerHandlers.size === 0) {
		return;
	}
	fetch(
		`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${[
			...tickerHandlers.keys(),
		].join(",")}&tsyms=USD&api_key=${API_KEY}`
	)
		.then((res) => res.json())
		.then((rawData) => {
			const updatedPrices = Object.fromEntries(
				Object.entries(rawData).map(([key, val]) => [key, val.USD])
			);
			Object.entries(updatedPrices).forEach(([currency, newPrice]) => {
				const handlers = tickerHandlers.get(currency) || [];
				handlers.forEach((fn) => fn(newPrice));
			});
		})
		.catch((error) => console.log("Error Fetch: ", error));
};

export const subscribeToTicker = (ticker, cb) => {
	const subscribers = tickerHandlers.get(ticker) || [];
	tickerHandlers.set(ticker, [...subscribers, cb]);
};

export const unsubscribeToTicker = (ticker) => {
	tickerHandlers.delete(ticker);
};

setInterval(loadTickers, 3000);
window.tickerHandlers = tickerHandlers;
