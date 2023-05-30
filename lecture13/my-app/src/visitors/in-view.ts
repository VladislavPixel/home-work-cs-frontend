import { InViewFnArg, IResultVisitor } from "../types";

function inView(settings: InViewFnArg): IResultVisitor {
	const { delay, entered, leaved } = settings;

	let isFirstTrigger: boolean = true;

	return {
		visit(ctx: Record<any, any>): void {
			const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
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

			setTimeout((): void => {
				const observer = new IntersectionObserver(callback);

				const target = ctx.element;

				observer.observe(target);
			}, delay);
		}
	};
};

export { inView };
