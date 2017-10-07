import { deleteAccessToken } from "../util/access_token_utils"

interface BaseRepository<T> {
    readonly items: Map<string, T>,
    readonly selected: string,
    readonly sort: ReadonlyArray<string>,
}

export interface Example {
    readonly id: string,
    readonly title: string,
}

export interface Example extends BaseRepository<Example> {
}

export interface Session {
    readonly loggedIn: boolean,
    readonly accessToken: string,
}

export interface Error {
    readonly text: string,
}

/////////////////////////////////////////
//NEWTHINGS 1. Add name to AppState interface
export interface AppState {
    readonly session: Session,
    readonly error: Error,
    readonly spinner: boolean,
    readonly name: {name: string}
}

//NEWTHINGS 2. Add name to default state
const defaultAppState: AppState = {
    session: {
        accessToken: "",
        loggedIn: false,
    },
    error: {
        text: "",
    },
    spinner: false,
    name: {name: "Stormi"}
}

export const INITIAL_STATE: AppState = defaultAppState

// session

export const setSession = (state: Session, accessToken: string): Session => {
    return ({
        accessToken: accessToken,
        loggedIn: true,
    })
}


export const removeSession = (state: Session): Session => {
    deleteAccessToken()
    return ({
        accessToken: "",
        loggedIn: false,
    })
}


// error

export const setError = (state: Error, errorText: string): Error => ({
    text: errorText,
})

