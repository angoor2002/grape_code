// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import { Landing } from './components/Landing';
import { initializeApp } from "firebase/app";
import { Signin } from './components/Signin';
// import { app } from './utils/firebase';
import { getAuth, onAuthStateChanged,signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { useSetRecoilState,useRecoilState, RecoilRoot } from 'recoil';
import { userAtom } from './store/atoms/user';
import { Topbar } from './components/Topbar';
import {Judge} from './components/Judge'
import{Judge_test} from './components/Judge_test'
// const analytics = getAnalytics(app);
const firebaseConfig = {
  apiKey: "AIzaSyDEPGA_dVbBTbCInRdU49nlukH1Hj96XI8",
  authDomain: "idex-51f40.firebaseapp.com",
  projectId: "idex-51f40",
  storageBucket: "idex-51f40.firebasestorage.app",
  messagingSenderId: "1034569405186",
  appId: "1:1034569405186:web:98aec40e32aa729b56681b",
  measurementId: "G-9TH005L9NQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
function StoreApp()
{
  const [user,setUser]=useRecoilState(userAtom)
  useEffect(()=>{
    // signOut(auth).catch(console.error);
    onAuthStateChanged(auth,function(user){
      if(user && user.email){
        console.log('User: ',user)
        setUser({
          loading:false,
          user:{
            email:user.email
          }
        })
      }
      else{ 
        console.log('No logged in user');
        setUser({
          loading: false,
          user: null
        })
        }
      })
    },[])
    if(user.loading){
      return <div>Loading...</div>
    }
    if(!user.user){
      return<div><Signin/></div>
    }
  return (
    <>
      {/* <Landing/> */}
      You are logged in as {user.user.email}
      <Topbar />
      {/* <Judge/> */}
      <Judge_test/>
    </>
  )
}
function App() {
  return <RecoilRoot>
    <StoreApp/>
  </RecoilRoot>
  
}



export default App
