import { forwardRef } from "react";
import { eventEmitter } from "../utils/event-emitter";

const SomeBtn = forwardRef((_, ref) => {
	function handlerSubmitForm(e) {
		e.preventDefault();

		eventEmitter.emit("submit-counter");
	};

	return (
		<div ref={ref} className="wrapper-btns">
			<button onClick={() => {
				eventEmitter.emit("update-counter");
			}} type="button">Нажми на меня - клик</button>
			<form onSubmit={handlerSubmitForm}>
				<button type="submit">Нажми, чтобы засабмитить форму</button>
			</form>
		</div>
	);
});

SomeBtn.eventEmitter = eventEmitter;

export { SomeBtn };
