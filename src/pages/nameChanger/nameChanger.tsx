import * as React from 'react'

export interface StatefulNameProps {
    label: string,
}

type State = {
    name: string,
}

export class Parent extends React.Component<StatefulNameProps, State>{
    state: State = {
        name: "Stormi"
    }

    nameSetter(name: string) {
        this.setState({ name })
    }

    render() {
        return <div>
            <h1>{this.state.name}</h1>
            
        </div>
    }
}

//<Child name={this.state.name} action={this.nameSetter}/>