import * as React from "react"
import * as ReactDOM from "react-dom"
import { Dashboard } from "./dashboard"
import { create as renderer } from "react-test-renderer"
import { genericRouteProps } from "../../util/page_utils"

//NEWTHINGS 13.5. Add SetName and name to test actions
const actions = {
    logout: () => ({}),
    bootstrap: () => ({}),
    session: {
       loggedIn: false,
       accessToken: "",
    },
    setName: () => ({}),
    name: {name:""}
}

//NEWTHINGS 13.6. Add setName and name to render test
const render = () => (
    <Dashboard
        {...genericRouteProps}
        logout={actions.logout}
        bootstrap={actions.bootstrap}
        session={actions.session}
        setName={actions.setName}
        name={actions.name}
    />
)

it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(render(), div)
})

it("renders a snapshot", () => {
    const tree = renderer(render()).toJSON()
    expect(tree).toMatchSnapshot()
})