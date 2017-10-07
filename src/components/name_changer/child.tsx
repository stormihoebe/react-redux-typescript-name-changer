import * as React from "react"

// const styles = require("./child.module.css")


interface ChildProps{
    name: string
    setName: (name:string) => void 
}
interface ChildState {
    readonly name: string
}

interface InputEvent {
    readonly target: {
        readonly name: string,
        readonly value: string,
    }
}

export class Child extends React.Component<ChildProps, ChildState> {
    constructor(props: ChildProps){
        super(props)
        //set initial state of name to empty string
        this.state = { name: props.name}
        // bind the this context for child component functions
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event: InputEvent): void {
        this.setState({name: event.target.value});
    }

    //When form is submitted, dispatch action creator
    handleSubmit = () => {
        
        this.props.setName(this.state.name)     
    }
    render(): JSX.Element {
        
        return (
            <div>
                <label>
                    Name:
                <input 
                    type="text" 
                    value={this.state.name} 
                    onChange={this.handleChange} />
                </label>
                <button value="Submit" 
                    onClick={this.handleSubmit}>
                    Submit
                </button>
            </div>
        );
    }
}

export default Child