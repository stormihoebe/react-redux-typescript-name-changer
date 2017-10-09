import * as React from 'react';

//NEWTHINGS 17. Import Child
import Child from './child'


//NEWTHINGS 14. Add ParentProps interface with name and setName function
interface ParentProps{
    name: string
    setName: (name:string) => void 
}

//NEWTHINGS 15. Add ParentState interface with name
interface ParentState {
    readonly name: string
}

//NEWTHINGS 16. Create parent class as react component with ParentProps and ParentState
//NewThings 18. Add Child to parent render, pass it name and SetName as props
class Parent extends React.Component<ParentProps, ParentState> {
    render(): JSX.Element {
        const {name} = this.props
        return ( 
        <div>
            <h1>{name}</h1>
            <Child name={name} setName={this.props.setName}/>
        </div>)
    }
}

export default Parent