import { Action } from "../actions"
//NEWTHINGS 3. create setName Reducer
const nameChangerApp = (
    state ={
        name:"Stormi"
    }, 
    action: Action) => {
        // debugger
    switch (action.type){
        case 'SET_NAME':
            return { ...state,
                name: action.name
            }
        default:
            return state
    }
}
export default nameChangerApp