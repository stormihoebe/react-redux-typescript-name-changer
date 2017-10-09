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



#### Helpful links if you're new to TypeScript, Redux, or React Router v4
- [TypeScript](https://github.com/Microsoft/TypeScript-React-Starter#creating-a-component)
- [Redux](http://redux.js.org/#watch-the-30-free-videos)
- [react-redux-typescript-guide](https://github.com/piotrwitek/react-redux-typescript-guide#react)
- [React Router](https://reacttraining.com/react-router/web/guides/philosophy)



#### Get login working with your backend
- on line 30 of client.ts replace "url here" with your root url
- then if you're posting your creds to the backend change login method to something like this
```js
login = (username: string, password: string): HandledResp => {
    return request.
        post(this.buildUrl("/login")).
        send({ username, password }).
        type("application/json").
        accept("application/json").
        end().
        then((res: Resp) => handleResp(res))
        .catch((res: Resp) => handleResp(res))
}
```
- then uncomment code in session_sagas .ts

#### Adding a route
- update src/index.tsx
```js
...
import YourComponent from "./pages/your_component/your_component"

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <PublicRoute path="/" component={pageShell(LoginPage)}/>
                <PrivateRoute path="/dashboard" component={pageShell(Dashboard)}/>
                <PrivateRoute path="/your_route" component={pageShell(YourComponent)}/>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root"),
)
```

#### Includes component library [blueprintjs](http://blueprintjs.com//docs/)
- checkout src/components/progress_spinner/progress_spinner.tsx

#### Includes [css modules](https://github.com/gajus/react-css-modules/blob/master/README.md#css-modules) and [blueprint css](http://blueprintjs.com//docs/#core/components/navbar.css-api)

```js
import * as React from "react"

const styles = require("./navbar.module.css")

interface NavbarProps {
    readonly logout: () => void,
    readonly userName: string,
}

export function Navbar(props: NavbarProps): JSX.Element {
    const { userName, logout } = props

    return(
        <nav className={`pt-navbar .modifier ${styles.nav_bar}`}>
            <div className={styles.container}>
                <div className="pt-navbar-group pt-align-right">
                    <button className={`pt-button pt-minimal ${styles.user_menu}`}>
                        <span className={styles.user_name} onClick={logout}>{userName}</span>
                        <span
                            className={`pt-icon-standard pt-icon-chevron-down ${styles.user_menu_chevron}`}
                        />
                    </button>
                </div>
            </div>
        </nav>
    )
}
```

#### Helpful VS Code workplace settings
```js
"files.exclude": {
    "node_modules/": true,
    "build/": true,
    "**/*.css": true
}
```