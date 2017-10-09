import * as React from "react"

import { RouteComponentProps } from "react-router"

import * as redux from "redux"
import { connect } from "react-redux"
import { AppState, Session } from "../../redux/core"
import { setPageTitle } from "../../util/page_utils"
import * as actions from "../../redux/actions"
// NEWTHINGS 12. Import Parent
import Parent from "../../components/name_changer/parent"

const styles = require("./dashboard.module.css")

// NEWTHINGS 7. Add name to reduxState interface
interface ReduxState {
    readonly session: Session,
    readonly name: {readonly name: string}
}

// NEWTHINGS 8. Add setName to Redux actions
interface ReduxActions {
    readonly logout: () => void
    readonly bootstrap: () => void
    readonly setName: (name: string) => void
}

// NEWTHINGS 9. Add name to dashboard props
interface DashboardProps extends RouteComponentProps<{}> {
    readonly name: {readonly name: string}
}

// NEWTHINGS 10. Add name to map state to pros
const mapStateToProps = (state: AppState, ownProps: DashboardProps): ReduxState => ({
    session: state.session,
    name: state.name,
})

// NEWTHINGS 11. Add setName to mapDispatch
const mapDispatchToProps = (dispatch: redux.Dispatch<AppState>): ReduxActions => ({
    logout: () => dispatch( actions.logout() ),
    bootstrap: () => dispatch( actions.bootstrap() ),
    setName: (name: string) => dispatch(actions.setName(name)),
})

interface DashboardState {
}

// NEWTHINGS 13. Add Parent to Dashboard render, pass it name and SetName
export class Dashboard extends React.Component<ReduxState & ReduxActions & DashboardProps, DashboardState> {
    constructor(props: ReduxState & ReduxActions & DashboardProps) {
        super(props)

        this.state = {
        }
    }

    componentWillMount(): void {
        setPageTitle("Dashboard")
        this.props.bootstrap()
    }

    goToLogin = () => this.props.history.push("/")

    logout = () => {
        this.props.logout()
        this.goToLogin()
    }

    render(): JSX.Element {
        
        return (
            <div className={styles.dashboard}>
                <Parent name={this.props.name.name} setName={this.props.setName}/>
            </div>
        )
    }
}

const ConnectedApp: React.ComponentClass<DashboardProps> = connect(mapStateToProps, mapDispatchToProps)(Dashboard)
export default ConnectedApp