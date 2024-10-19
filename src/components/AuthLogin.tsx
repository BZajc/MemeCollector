import { useState } from "react";
import { app } from "../firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { setShowRegistration, setSwapFormAnimation } from "../store/slices/authSlice";
import logingoogle from "../images/logingoogle.png"
import { useNavigate } from "react-router-dom";

function AuthLogin() {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider(); // Allow to login via Google

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // Handle email and password Login
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log("Logged In", result);
        dispatch(setShowRegistration(false));
        navigate('/')
      })
      .catch((err) => {
        console.error("Something went wrong", err);
        setShowError(true)
      });
  };

  // Change from log in to register form
  const handleChangeForm = () => {
    dispatch(setShowRegistration(false));
    dispatch(setSwapFormAnimation(true))
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // Handle Login via Google
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        navigate('/')
      })
      .catch((err) => {
        console.error("Login Error", err);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="auth-login">
      <h3 className="auth-login__form-type">Log In</h3>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="auth-login__input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="auth-login__input"
      />
      {showError ? <p className={`auth-login__error ${showError}`}>Wrong Email or Password</p> : ""}
      <button
        type="submit"
        onClick={handleLogin}
        className="auth-login__confirm-button"
      >
        Log In
      </button>
      <p className="auth-login__change-form-text">
        Don't have an account yet?{" "}
        <button
          onClick={handleChangeForm}
          className="auth-login__change-form-button"
        >
          Create Here
        </button>
      </p>
      <p className="auth-login__or-text">OR</p>
      <p className="auth-login__or-subtext">Use other methods</p>
      <button onClick={handleGoogleLogin} className="auth-login__google">
        <img src={logingoogle} alt="google icon" />
      </button>
    </form>
  );
}

export default AuthLogin;
