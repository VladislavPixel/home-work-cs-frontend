import { useEffect, useState, useCallback } from "react";
import { eventEmitter } from "../utils/event-emitter";

function SomeCounter(): JSX.Element {
	const [counter, setCounter] = useState(0);

	const memoCallback = useCallback(() => {
		setCounter((prevState) => prevState + 1);
	}, []);

	useEffect(() => {
		eventEmitter.on("update-counter", memoCallback);
	}, [memoCallback]);

	return (
		<div>Счетчик кликов по кнопке: {counter}</div>
	);
};

export { SomeCounter };
