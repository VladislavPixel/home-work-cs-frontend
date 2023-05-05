async function forEach(asyncIterator, callback) {
	for await(const event of asyncIterator) {
		callback(event);
	}

	console.log("Вышел из рабочего цикла");
};

export { forEach };
