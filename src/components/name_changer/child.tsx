import * as React from "react"

//NEWTHINGS 19. Add ChildProps interface with name and setName function
interface ChildProps{
    name: string
    setName: (name:string) => void 
}

//NEWTHINGS 20. Add ChildState interface with name
interface ChildState {
    readonly name: string
}

//NEWTHINGS 21. Add inputEvent interface for submitting form 
interface InputEvent {
    readonly target: {
        readonly name: string,
        readonly value: string,
    }
}

//NEWTHINGS 22. Create child class as react component with ChildProps and ChildState. Add name from props as initial state
//NEWTHINGS 23. Add handle Chinage and Handle Submit functions, bind the this context. 
//24. Add return tsx statement calling handleChange on input change and handleSubmit on button click
export class Child extends React.Component<ChildProps, ChildState> {
    constructor(props: ChildProps){
        super(props)
        //set initial state of name to empty string
        this.state = { name: props.name}
        // bind the this context for child component functions
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    //upudate local state with each change of input
    handleChange(event: InputEvent): void {
        this.setState({name: event.target.value});
    }

    //When form is submitted, dispatch action creator to set app state name to local/component state name
    //Then set the local state to an empty string to clear the input field. 
    handleSubmit = () => {
        this.props.setName(this.state.name)
        this.setState({name: ''})     
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