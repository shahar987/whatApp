import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import { auth, provider } from "../../firebase";
import { useStateValue } from "../../Hooks/StateProvider";
import { actionTypes } from "../../Hooks/reducer";
import WhatsAppIcon from "../../../src/assets/images/whatsapp.png";

export const Login = () => {
  const [, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div>
      <div className="login__container">
        <img src={WhatsAppIcon} alt="" />
        <div className="login__text">
          <h1>Sign in to whatApp</h1>
        </div>
        <Button onClick={() => signIn()}>Sign In With Google</Button>
      </div>
    </div>
  );
};
