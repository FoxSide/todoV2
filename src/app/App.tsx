import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializeAppTC, RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Login} from "../features/Login/Login";
import {Routes, Route, Navigate} from "react-router-dom";
import {CircularProgress} from '@mui/material'
import {logoutTC} from "../features/Login/authReducer";

type PropsType = {
  demo?: boolean
}

function App({demo = false}: PropsType) {
  const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
  const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  if (!isInitialized) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }


  const logoutHandler = () => {
    dispatch(logoutTC())
  };

  return (
    <div className="App">
      <ErrorSnackbar/>
      <AppBar position="static">
        <Toolbar className='toolbar'>
          <Typography variant="h4" style={{color: '#0288d1'}}>
            Todolists
          </Typography>
          {isLoggedIn && <Button color="error" variant='contained' onClick={logoutHandler}>Logout</Button>}
        </Toolbar>
        <div style={{height: '2px', background: 'linear-gradient(90deg, rgba(52,50,50,1) 0%, rgba(25,23,23,1) 100%)'}}>
          {status === 'loading' && <LinearProgress color={"warning"}/>}
        </div>
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path="/" element={<TodolistsList demo={demo}/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
          <Route path="*" element={<Navigate to='/404'/>}/>
        </Routes>
      </Container>
    </div>
  )
}

export default App
