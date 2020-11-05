import React,{useEffect, createContext, useReducer, useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Switch, Route, useHistory, match, useParams } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import FeedPage from './pages/FeedPage';
import AddPostPage from './pages/AddPostPage';
import PostPage from './pages/PostPage'
import {reducer, initialState} from './reducers/userReducer'
import UserProfile from './pages/UserProfile';
import PlacePostPage from './pages/PlacePostPage';

export const UserContext = createContext()

const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }
    // else{
    //   if(!history.location.pathname.startsWith('/reset')||!history.location.pathname.startsWith('/:userName'))
    //        history.push('/logIn')
    // }
  },[])
  return(
    <Switch>
      <Route exact path="/" >
        <HomePage />
      </Route>
      <Route path="/logIn">
        <SignInPage />
      </Route>
      <Route path="/signUp">
        <SignUpPage />
      </Route>
      {/* <Route exact path="/profile/:userName">
        <ProfilePage />
      </Route> */}
      <Route path="/add">
        <AddPostPage/>
      </Route>
      <Route exact path="/feed">
        <FeedPage />
      </Route>
      <Route exact path="/:userName/:postId">
        <PostPage />
      </Route>
      <Route exact path="/:userName">
        <UserProfile />
      </Route>
      <Route exact path="/search/place/:placeName">
        <PlacePostPage />
      </Route>
      
      
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Routing />
        
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;