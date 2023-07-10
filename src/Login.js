import { Button } from '@material-ui/core';
import React from 'react'
import "./Login.css";
import {auth, provider} from "./firebase"
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
import  WhatsAppIcon  from '../src/assets/images/whatsapp.png';

function Login() {
    const[{user}, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) =>{
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
        })
        .catch((error) => alert(error.message))
    }
  return (
    <div>
        <div className="login__container">
            <img src={WhatsAppIcon} alt="" />
            <div className="login__text">
                <h1>Sign in to whatApp</h1>
            </div>
            <Button  onClick={()=>signIn()}>
                Sign In With Google
            </Button>
        </div>
    </div>
  )
}

export default Login