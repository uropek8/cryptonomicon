const API_KEY =
	"007e40a1d992ab907d6960e0627091251a00b7b0a56b288c075ba9e53d0f18c3";
const AGGREGATE_IDX = "5";
const tickerHandlers = new Map();
const socket = new WebSocket(
	`wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`
);

socket.addEventListener("message", (e) => {
	const { TYPE: type, FROMSYMBOL: currency, PRICE: newPrice } = JSON.parse(
		e.data
	);

	if (!type === AGGREGATE_IDX) {
		return;
	}

	const handlers = tickerHandlers.get(currency) || [];
	handlers.forEach((fn) => fn(newPrice));
});

// TODO refactoring to use searchParams
// const loadTickers = () => {
// 	if (tickerHandlers.size === 0) {
// 		return;
// 	}
// 	fetch(
// 		`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${[
// 			...tickerHandlers.keys(),
// 		].join(",")}&tsyms=USD&api_key=${API_KEY}`
// 	)
// 		.then((res) => res.json())
// 		.then((rawData) => {
// 			const updatedPrices = Object.fromEntries(
// 				Object.entries(rawData).map(([key, val]) => [key, val.USD])
// 			);
// 			Object.entries(updatedPrices).forEach(([currency, newPrice]) => {
// 				const handlers = tickerHandlers.get(currency) || [];
// 				handlers.forEach((fn) => fn(newPrice));
// 			});
// 		})
// 		.catch((error) => console.log("Error Fetch: ", error));
// };

function sendToWsMessage(message) {
	const stringifyMessage = JSON.stringify(message);

	if (socket.readyState === WebSocket.OPEN) {
		socket.send(stringifyMessage);
		return;
	}

	socket.addEventListener(
		"open",
		() => {
			socket.send(stringifyMessage);
		},
		{ once: true }
	);
}

function sunscribeToTickerOnWs(ticker) {
	sendToWsMessage({
		action: "SubAdd",
		subs: [`5~CCCAGG~${ticker}~USD`],
	});
}

function unsunscribeFromTickerOnWs(ticker) {
	sendToWsMessage({
		action: "SubRemove",
		subs: [`5~CCCAGG~${ticker}~USD`],
	});
}

export const subscribeToTicker = (ticker, cb) => {
	const subscribers = tickerHandlers.get(ticker) || [];
	tickerHandlers.set(ticker, [...subscribers, cb]);
	sunscribeToTickerOnWs(ticker);
};

export const unsubscribeToTicker = (ticker) => {
	tickerHandlers.delete(ticker);
	unsunscribeFromTickerOnWs(ticker);
};

window.tickerHandlers = tickerHandlers;
