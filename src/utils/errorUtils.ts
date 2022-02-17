import {ActionsType, setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {addTodolistAC} from "../features/TodolistsList/todolists-reducer";

export const handleServerNetworkError = (dispatch: Dispatch<ActionsType>, message: string) => {
  dispatch(setAppErrorAC(message))
  dispatch(setAppStatusAC('succeeded'))
}

