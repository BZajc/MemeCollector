import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { store } from "./store/store";
import { auth } from "./firebaseConfig";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { Provider } from "react-redux";
import Lottie from "lottie-react";
import LoadingAnimation from "./Lottie/Loading Animation.json";

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingFinishAnimation, setLoadingFinishAnimation] =
    useState<boolean>(false);

  useEffect(() => {
    // Verify User
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoadingFinishAnimation(true);
      // Timer to let loading animation finish smoothly


      // Move setLoading to setTimeout@@@@@@@@@@@@@@@@@@@@
      // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      setLoading(false);
      // setTimeout(() => {
      // }, 2000);




    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, [user]);

  //   Display loading screen instead of blinking form if user is being logged in
  if (loading) {
    const loadingText = "App is being loaded. Please wait.";
    return (
      <div
        className={`loading ${loadingFinishAnimation ? "loading__finish" : ""}`}
      >
        <Lottie
          className="loading__animation"
          animationData={LoadingAnimation}
          loop={true}
        />

        {/* Split paragraph to single letters to animate them */}
        <p className="loading__text">
          {loadingText.split("").map((char, index) => (
            <span
              key={index}
              className={`loading__letter ${
                char === " " ? "loading__space" : ""
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>
      </div>
    );
  }

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* If user isn't logged in redirect to /auth */}
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/auth" />}
          />
          {/* If user is logged redirect to home page */}
          <Route
            path="/auth"
            element={!user ? <AuthPage /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
