function onlyEvent(eventName: string) {
	return function(event) {
		return event.type === eventName;
	};
};

export { onlyEvent };
