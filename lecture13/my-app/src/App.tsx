import { GreySquare } from "./components/grey-square";
import { SomeCounter } from "./components/some-counter";
import { on } from "./visitors/on";
import { once } from "./visitors/once";
import { inView } from "./visitors/in-view";
import { withAccept } from "./components/hoc/with-accept";
import { SomeBtn } from "./components/some-btn";

function App(): JSX.Element {
	const cb1 = () => {
		console.log("Visitor при срабатывании click");
	};

	const cb2 = () => {
		console.log("Visitor при срабатывании submit");
	};

	const handlerEntered = () => {
		console.log("В поле моей видимости ваш отмеченный компонент!!!!!!!!!!!");
	};

	const handlerLeaved = () => {
		console.log("Ваш отмеченный компонент ушел из поля моей видимости................");
	};

	const visitors = [
		on("update-counter", cb1),
		once("submit-counter", cb2),
		inView({
			delay: 1000,
			entered: handlerEntered,
			leaved: handlerLeaved
		})
	];

	const SomeBtnWithAccept = withAccept(SomeBtn, visitors);

  return (
    <div className="app">
			<GreySquare />
			<SomeCounter />
			<SomeBtnWithAccept />
    </div>
  );
}

export default App;
