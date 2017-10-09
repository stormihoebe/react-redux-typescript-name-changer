export interface LoginAction {
    readonly type: "LOGIN",
    readonly username: string,
    readonly password: string,
}

export interface ReceiveAccessTokenAction {
    readonly type: "RECEIVE_ACCESS_TOKEN",
    readonly accessToken: string,
}

export interface ReceiveErrorAction {
    readonly type: "RECEIVE_ERROR",
    readonly errorText: string,
}

export interface LogoutAction {
    readonly type: "LOGOUT",
}

export interface BootstrapAction {
    readonly type: "BOOTSTRAP",
}

export interface ClearErrorAction {
    readonly type: "CLEAR_ERROR",
}

export interface SetSpinnerAction {
    readonly type: "SET_SPINNER",
    readonly visible: boolean,
}
// NEWTHINGS   5.5 Add SetNameAction interface
export interface SetNameAction {
    readonly type: "SET_NAME", 
    readonly name: string,
}

// NEWTHINGS 6. Add setNameAction to Action
export type Action =
|   ReceiveAccessTokenAction
|   ReceiveErrorAction
|   LoginAction
|   LogoutAction
|   BootstrapAction
|   ClearErrorAction
|   SetSpinnerAction
|   SetNameAction

// session
export const login = (username: string, password: string): Action => ({
   type: "LOGIN",
   username,
   password,
})

export const logout = () => ({
    type: "LOGOUT",
})

export const receiveAccessToken = (accessToken: string): Action => ({
    type: "RECEIVE_ACCESS_TOKEN",
    accessToken,
})

// bootstap

export const bootstrap = () => ({
    type: "BOOTSTRAP",
})

// spinner

export const setSpinner = (visible: boolean) => ({
    type: "SET_SPINNER",
    visible,
})

// error

export const receiveError = (errorText: string) => ({
    type: "RECEIVE_ERROR",
    errorText,
})

export const clearError = () => ({
    type: "CLEAR_ERROR",
})

// NEWTHINGS 5. Add setName action creator
export const setName = (name: string) => ({
    type: "SET_NAME",
    name,
})
