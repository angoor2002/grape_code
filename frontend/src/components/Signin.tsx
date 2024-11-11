import { getAuth,sendSignInLinkToEmail } from "firebase/auth"
import { auth } from "../App";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { app } from "../utils/firebase";
import { GoogleAuthProvider } from "firebase/auth";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";



const provider=new GoogleAuthProvider();
export const Signin=()=>{
    const auth=getAuth(app);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    async function onSignin() {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                if (!credential) {
                    return;
                }
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch(() => {
                alert("error while signing in");
            });
    }
    async function onSignupWithemail()
    {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("error while signing in :"+ errorMessage);
            // ..
        });
    }
    async function onLoginWithemail()
    {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("error while signing in :"+errorMessage);
            });
    }
    return <div>
        New account? Sign up: 
        <input type="text" placeholder="email" onChange={(e)=>{
            setEmail(e.target.value)
        }}></input>
        <input type="password" placeholder="password" onChange={(e)=>{
            setPassword(e.target.value)
        }}></input>
         <button onClick={()=>{
            onSignupWithemail()
        }}>
           sign-up with email and password
        </button>
        <br></br>
        Account exists? Log in: 
        <input type="text" placeholder="email" onChange={(e)=>{
            setEmail(e.target.value)
        }}></input>
        <input type="password" placeholder="password" onChange={(e)=>{
            setPassword(e.target.value)
        }}></input>
        <br></br>
        <button onClick={()=>{
            onLoginWithemail()
        }}>
           Log in
        </button>
        <br></br>
        <br></br>
        <button onClick={()=>{
            onSignin()
        }}>
           Sign in with Google 
        </button>
    </div>
}
