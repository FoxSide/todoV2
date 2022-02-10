import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from "redux";

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistACType = ReturnType<typeof setTodolistsAC>


type ActionsType =
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistACType
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>

const initialState: Array<TodolistDomainType> = [
  /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
  {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.id)
    }
    case 'ADD-TODOLIST': {
      return [{...action.todolist, filter: 'all'}, ...state]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      const todolist = state.find(tl => tl.id === action.id);
      if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.title = action.title;
      }
      return [...state]
    }
    case 'CHANGE-TODOLIST-FILTER': {
      const todolist = state.find(tl => tl.id === action.id);
      if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.filter = action.filter;
      }
      return [...state]
    }
    case 'SET-TODOLISTS': {
      return action.todolists.map(tl => ({
        ...tl,
        filter: 'all'
      }))
    }

    default:
      return state;
  }
}
// action
export const removeTodolistAC = (todolistId: string) => {
  return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodolistAC = (todolist: TodolistType) => {
  return {type: 'ADD-TODOLIST', todolist} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
  return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
  return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const
}
export const setTodolistsAC = (todolists: Array<TodolistType>) => {
  return {type: 'SET-TODOLISTS', todolists} as const
}

//thunk
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
  todolistsAPI.deleteTodolist(todolistId)
    .then((res) => {
      dispatch(removeTodolistAC(todolistId))
    })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  todolistsAPI.createTodolist(title)
    .then((res) => {
      dispatch(addTodolistAC(res.data.data.item))
    })
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
  todolistsAPI.updateTodolist(id, title)
    .then((res) => {
      dispatch(changeTodolistTitleAC(id, title))
    })
}
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
  todolistsAPI.getTodolists()
    .then((res) => {
      dispatch(setTodolistsAC(res.data))
    })
}

