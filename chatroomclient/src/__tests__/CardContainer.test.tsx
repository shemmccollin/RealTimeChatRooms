import ReactDOM from "react-dom";
import CardContainer from "../components/CardContainer";

describe("CardContainer component test", () =>{
    let container: HTMLDivElement
    
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(<CardContainer/>, container);
    })

    afterEach(() =>{
        document.body.appendChild(container);
        container.remove();
    })

    test('Renders correctly 1 p tag', () =>{
        const inputs = container.querySelectorAll('p');
        expect(inputs).toHaveLength(6);
    })

    test('Renders correctly 1 div tag', () =>{
        const input = container.querySelectorAll('div');
        expect(input).toHaveLength(26);
    })
});