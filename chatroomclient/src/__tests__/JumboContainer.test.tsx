import ReactDOM from "react-dom";
import JumboContainer from "../components/JumboContainer";

describe("JumboContainer component test", () =>{
    let container: HTMLDivElement
    
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(<JumboContainer/>, container);
    })

    afterEach(() =>{
        document.body.appendChild(container);
        container.remove();
    })

    test('Renders correctly 1 h1 tag', () =>{
        const inputs = container.querySelectorAll('h1');
        expect(inputs).toHaveLength(1);
    })

    test('Renders correctly 1 div tag', () =>{
        const input = container.querySelectorAll('div');
        expect(input).toHaveLength(1);
    })
});