import { useEffect, useRef } from "react";

function withAccept(Component, iterableVisitors) {
	return function WrapperComponent(props): JSX.Element {
		const wrapperRef = useRef(null);

		useEffect(() => {
			if (wrapperRef.current) {
				Component.element = wrapperRef.current;

				for (const visitor of iterableVisitors) {
					visitor.visit(Component);
				}
			}
		}, []);

		return <Component ref={wrapperRef} {...props} />;
	};
};

export { withAccept };
