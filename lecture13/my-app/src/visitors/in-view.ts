function inView(settings) {
	const { delay, entered, leaved } = settings;

	let isFirstTrigger = true;

	return {
		visit(ctx) {
			const callback = (entries, observer) => {
				entries.forEach((entry) => {
					const { isIntersecting } = entry;

					if (isIntersecting) {
						entered();

					} else {
						if (!isFirstTrigger) {
							leaved();
						}
					}

					isFirstTrigger = false;
				});
			};

			setTimeout(() => {
				const observer = new IntersectionObserver(callback);

				const target = ctx.element;

				observer.observe(target);
			}, delay);
		}
	};
};

export { inView };
