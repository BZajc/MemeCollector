import { app } from "../firebaseConfig";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import AuthRegister from "../components/AuthRegister";
import AuthLogin from "../components/AuthLogin";
import { useSelector } from "react-redux";
import { selectSetShowRegistration } from "../store/slices/authSlice";
import MemeCollectorLogo from "../images/MemeCollectorLogo.png"

function AuthPage() {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider(); // Allow to login via Google
  const showRegistration = useSelector(selectSetShowRegistration);

  // Handle Login via Google
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Logged In:", result.user);
      })
      .catch((err) => {
        console.error("Login Error", err);
      });
  };

  return (
    <div className="auth-page">
      <img className="auth-page__logo" src={MemeCollectorLogo} alt="app logo"/>
      <h2>Welcome in Meme Collector</h2>
      {!showRegistration ? (
        <AuthRegister />
      ) : (
        <>
          <AuthLogin />
          <button onClick={handleGoogleLogin}>Log In using Google</button>
        </>
      )}
    </div>
  );
}

export default AuthPage;
