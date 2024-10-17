import { useState } from "react";
import { app } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch} from "react-redux";
import { setShowRegistration, setRotateFormAnimation} from "../store/slices/authSlice";
import { FirebaseError } from "firebase/app";

function AuthRegister() {
  const auth = getAuth(app);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();

  // Handle email and password Registration
  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        dispatch(setShowRegistration(false));
        setErrorMessage(null);
      })
      .catch((err: FirebaseError) => {
        let message = "Something went wrong";

        switch (err.code) {
          case "auth/email-already-in-use":
            message = "This email is already in use. Please use a different email.";
            break;
          case "auth/invalid-email":
            message = "The email address is not valid. Please enter a valid email.";
            break;
          case "auth/weak-password":
            message = "The password is too weak. Please use at least 6 characters.";
            break;
          case "auth/missing-password":
            message = "The password is missing. Please use at least 6 characters."
            break
          case "auth/missing-email":
            message = "The email is missing. Please use correct one."
            break
          case "auth/operation-not-allowed":
            message = "Account creation is currently disabled. Please try again later.";
            break;
          default:
            message = err.message;
        }

        setErrorMessage(message); // Ustaw wiadomość o błędzie w stanie
      });
  };

  // Change from register to log in form
  const handleChangeForm = () => {
    dispatch(setShowRegistration(true));
    dispatch(setRotateFormAnimation(true))
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className="auth-register">
      <h3 className="auth-register__form-type">Register</h3>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="auth-register__input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="auth-register__input"
      />
      {errorMessage && (
        <p className="auth-register__error">{errorMessage}</p>
      )}
      <button type="submit" onClick={handleRegister} className="auth-register__confirm-button">Create an Account</button>
      <p className="auth-register__change-form-text">
        Have account already? <button onClick={handleChangeForm} className="auth-register__change-form-button">Log In Here</button>
      </p>
    </form>
  );
}

export default AuthRegister;
