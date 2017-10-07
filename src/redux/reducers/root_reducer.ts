import { combineReducers } from "redux"
import error from "./error_reducer"
import session from "./session_reducer"
import spinner from "./spinner_reducer"
import setName from "./setName_reducer"

//NEWTHINGS 4. Add setName reducer to  rootReducer
const rootReducer = combineReducers({
    session,
    error,
    spinner,
    name: setName
})

export default rootReducer