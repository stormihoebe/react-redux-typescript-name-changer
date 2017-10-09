# Name Changer Application 
This application uses the [react-redux-typescript-seed](https://github.com/olioapps/react-redux-typescript-seed) as a starting off point and implements [the react-name-changer](https://github.com/olioapps/onboarding/tree/master/react-name-changer). I have documented inline the steps needed to add new stateful components to the seed. You can also follow along with the tutorial below to learn how to go from the seed to the name changer application and begin to feel comfortable working with the seed to create applications. 

###  Running Name Changer Application
- clone repo `git clone https://github.com/stormihoebe/react-redux-typescript-name-changer`
- open cloned repo `cd react-redux-typescript-name-changer`
- install `yarn install`
- start `yarn start`
- open [localhost:3000](http://localhost:3000/)
- login with dummy creds
- view name changer form on localhost:3000/dashboard

## Tutorial: Recreating Name Changer Application Step by Step
This tutorial will describe step by step how to go from the react-redux-typescript-seed to the name changer app.

#### Starting react-redux-typescript-seed
- clone react-redux-typescript-seed `git clone https://github.com/olioapps/react-redux-typescript-seed`
- open cloned repo `cd react-redux-typescript-seed`
- install `yarn install`
- start `yarn start`
- open [localhost:3000](http://localhost:3000/)

#### Adding new elements to app state
- In a code editor (like Visual Studio Code) open `react-redux-typescript-seed/src/redux/core.ts`
- Add name to AppState interface
```sh
export interface AppState {
    readonly session: Session,
    readonly error: Error,
    readonly spinner: boolean,
    readonly name: { readonly name: string } // this is the new stuff, elements of appState must be readonly
}
```
- Refactor defaultAppState to include name 
```sh
const defaultAppState: AppState = {
    session: {
        accessToken: "",
        loggedIn: false,
    },
    error: {
        text: "",
    },
    spinner: false,
    name: {name: "Stormi"}, // this is the new stuff
}
``` 
#### Create setName reducer
- create a new file in ../src/redux/reducers named `setName_reducer.ts`
- open `setName_reducer.ts`
- create setName reducer and export it 
```sh
import { Action } from "../actions"

const nameChangerApp = (
    state = {
        name: "Stormi",
    }, 
    action: Action) => {
        // debugger
    switch (action.type) {
        case "SET_NAME":
            return { ...state,
                name: action.name,
            }
        default:
            return state
    }
}
export default nameChangerApp
```
#### Add setName to rootReducer 
- Open file  `../src/redux/reducers/root_reducer.ts`
- import setName at the top of the page `import setName from "./setName_reducer"`
- refactor rootReducer to include name
```sh
const rootReducer = combineReducers({
    session,
    error,
    spinner,
    name: setName, // this is new
})
``` 
#### Refactoring actions to include setName
- Open file  `../src/redux/actions/index.ts`
- To the bottom of the file, add Set name action creator 
```sh
export const setName = (name: string) => ({
    type: "SET_NAME",
    name,
})
```
- create a SetNameAction interface 
```sh
export interface SetNameAction {
    readonly type: "SET_NAME", 
    readonly name: string,
}
```
- add setNameAction to Action type 
```sh
export type Action =
|   ReceiveAccessTokenAction
|   ReceiveErrorAction
|   LoginAction
|   LogoutAction
|   BootstrapAction
|   ClearErrorAction
|   SetSpinnerAction
|   SetNameAction // this is new
```
#### Refactoring dashboard page

- Open file  `../src/pages/dashboard/dashboard.tsx`
- Add name to ReduxState interface 
```sh
interface ReduxState {
    readonly session: Session,
    readonly name: {readonly name: string} // this is new
}
```
- Add setName to ReduxActions
```sh
interface ReduxActions {
    readonly logout: () => void
    readonly bootstrap: () => void
    readonly setName: (name: string) => void // this is new
}
```
- Add name to dashboard props
```sh
interface DashboardProps extends RouteComponentProps<{}> {
    readonly name: {readonly name: string} // this is new
}
```
- Add name and setName to mapStatetoProps and mapDispatchToProps respectively 
```sh

// Add name to map state to pros
const mapStateToProps = (state: AppState, ownProps: DashboardProps): ReduxState => ({
    session: state.session,
    name: state.name, // this is new
})

// Add setName to mapDispatch
const mapDispatchToProps = (dispatch: redux.Dispatch<AppState>): ReduxActions => ({
    logout: () => dispatch( actions.logout() ),
    bootstrap: () => dispatch( actions.bootstrap() ),
    setName: (name: string) => dispatch(actions.setName(name)), // this is new
})

```
- Refactor Dashboard component render to show the Parent Component 
```sh 
render(): JSX.Element {
        
        return (
            <div className={styles.dashboard}>
                <Parent name={this.props.name.name} setName={this.props.setName}/>
            </div>
        )
    }
```
- Import Parent (You will create Parent in the next step)
```sh
import Parent from "../../components/name_changer/parent"
```
#### Refactor dashboard.test to include name and setName 
- Open file  `../src/pages/dashboard/dashboard.test.tsx`
- Add setName and name to test actions 
```sh
const actions = {
    logout: () => ({}),
    bootstrap: () => ({}),
    session: {
       loggedIn: false,
       accessToken: "",
    },
    setName: () => ({}), // this is new
    name: {name:""} // this is new
}
```
- Add setName and name to render test
```sh
const render = () => (
    <Dashboard
        {...genericRouteProps}
        logout={actions.logout}
        bootstrap={actions.bootstrap}
        session={actions.session}
        setName={actions.setName} // this is new
        name={actions.name} // this is new
    />
)
```

#### Creating component files
(Note: Each component should have it's own directory that includes a .css, .scss, and .tsx file. We are are simplifying this step by putting both items in a name_changer components directory and skipping over the styling files)
- Create directory `..src/components/name_changer`
- Create file `..src/components/name_changer/parent.tsx`
- Create file `..src/components/name_changer/child.tsx`

#### The Parent Component 
- add the following code the the new `../name_changer/parent.tsx`
```sh
import * as React from "react"
import Child from "./child"

interface ParentProps {
    readonly name: string
    readonly setName: (name: string) => void 
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
            <Child 
                name={name}
                setName={this.props.setName}
            />
        </div>
        )
    }
}

export default Parent
```
#### The Stateful Child Component 
- add the following code the the new `../name_changer/child.tsx`
```sh
import * as React from "react"

interface ChildProps {
    readonly name: string
    readonly setName: (name: string) => void 
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
    constructor(props: ChildProps) {
        super(props)
        // set initial state of name to empty string
        this.state = { name: props.name}
        // bind the this context for child component functions
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // upudate local state with each change of input
    handleChange(event: InputEvent): void {
        this.setState({name: event.target.value})
    }

    // When form is submitted, dispatch action creator to set app state name to local/component state name
    // Then set the local state to an empty string to clear the input field. 
    handleSubmit = () => {
        this.props.setName(this.state.name)
        this.setState({name: ""})     
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
        )
    }
}

export default Child

```

### Going farther 
check out the [react-redux-typescript-seed](https://github.com/olioapps/react-redux-typescript-seed) by Olio Apps for additional documentation on logging in with your backend, adding routes, and more. 


#### Helpful links if you're new to TypeScript, Redux, or React Router v4
- [TypeScript](https://github.com/Microsoft/TypeScript-React-Starter#creating-a-component)
- [Redux](http://redux.js.org/#watch-the-30-free-videos)
- [react-redux-typescript-guide](https://github.com/piotrwitek/react-redux-typescript-guide#react)
- [React Router](https://reacttraining.com/react-router/web/guides/philosophy)

