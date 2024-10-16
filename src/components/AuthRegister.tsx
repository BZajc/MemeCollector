import { useState } from "react";
import { app } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setShowRegistration } from "../store/slices/authSlice";

function AuthRegister() {
  const auth = getAuth(app);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();

  // Handle email and password Registration
  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log("Account Created", result);
        dispatch(setShowRegistration(false));
      })
      .catch((err) => {
        console.error("Something went wrong", err);
      });
  };

  // Change from register to log in form
  const handleChangeForm = () => {
    dispatch(setShowRegistration(true));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" onClick={handleRegister}>Create an Account</button>
      <p>
        Got Account Already? <button onClick={handleChangeForm}>Log In Here</button>
      </p>
    </form>
  );
}

export default AuthRegister;
