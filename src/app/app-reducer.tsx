export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null
}

type InitialStateType = typeof initialState
export type ActionsType = SetAppStatusACType | SetErrorACType

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return {...state, status: action.status}
    case "APP/SET-ERROR":
      return {...state, error: action.changeErr}
    default:
      return state
  }
}

export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

export type SetErrorACType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (changeErr: null | string) => ({type: 'APP/SET-ERROR', changeErr} as const)