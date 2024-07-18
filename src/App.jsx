import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import './App.css'
import authService from './appwrite/auth';
import {login, logout} from './store/authSlice'
import { Footer, Header } from './components';

function App() {

  // console.log(conf.appwriteUrl);


  //env files are generally loaded only once, so if there is asome change in the env file then we have to close the project and start it again

  
  //We create a loading state because, we are fetching data from a server(appwrite,mongoDB etc) and it takes time to recieve the data. SO it is better to create a loading state and then we can do conditional rendering based on that loading state.

  const [loading, setLoading] = useState(true);

  const dispatch =  useDispatch()

  useEffect(()=>{

    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else {
        dispatch(logout())
      }
    })
    .catch((error) => {
      console.log("Error checking user:", error);
     
    })
    .finally(()=>{
      setLoading(false)
    })
  })


  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between">
      <div className="w-full block">
        <Header/>

        <main>
        <h1>TODO</h1>
        </main>

        <Footer />
      </div>
    </div>
  ) : (null)
}

export default App
