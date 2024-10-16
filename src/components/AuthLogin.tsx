import { useState } from "react";
import { app } from "../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setShowRegistration } from "../store/slices/authSlice";

function AuthLogin() {
  const auth = getAuth(app);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();

  // Handle email and password Login
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log("Logged In", result);
        dispatch(setShowRegistration(false));
      })
      .catch((err) => {
        console.error("Something went wrong", err);
      });
  };

  // Change from log in to register form
  const handleChangeForm = () => {
    dispatch(setShowRegistration(false));
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
      <button type="submit" onClick={handleLogin}>Log In</button>
      <p>
        Don't have an account yet? <button onClick={handleChangeForm}>Create One Here</button>
      </p>
    </form>
  );
}

export default AuthLogin;
