import * as React from 'react';
import Child from './child'

interface ParentProps{
    name: string
    setName: (name:string) => void 
}

interface ParentState {
    readonly name: string
}

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