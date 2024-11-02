import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { auth } from "./firebaseConfig";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import Lottie from "lottie-react";
import LoadingAnimation from "./Lottie/Loading Animation.json";
import ClickerCounter from "./components/ClickerCounter";
import Store from "./components/Store";
import Upgrades from "./components/Upgrades";
import { setMoney } from "./store/slices/clickerSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

function AppContent() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingFinishAnimation, setLoadingFinishAnimation] =
    useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Verify User
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoadingFinishAnimation(true);
      setLoading(false);
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  // If user exists in DB fetch for money
  useEffect(() => {
    const fetchUserMoney = async () => {
      if (user) {
        try {
          // Get a user in db
          const userDoc = doc(db, "users", user.uid);
          const userSnapshot = await getDoc(userDoc);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            if (userData && userData.money !== undefined) {
              dispatch(setMoney(userData.money));
              console.log("Money has been fetched from DB");
            }
          }
        } catch (err) {
          console.log("Money couldn't be fetched from db");
        }
      }
    };

    fetchUserMoney();
  }, [user, dispatch]);

  // Loading screen to avoid blinking effect
  if (loading) {
    const loadingText = "If you bought your WIFI after 90s this loading is completely useless but I am gonna leave it anyway because I don't want to waste it";
    return (
      <div
        className={`loading ${loadingFinishAnimation ? "loading__finish" : ""}`}
      >
        <Lottie
          className="loading__animation"
          animationData={LoadingAnimation}
          loop={true}
        />
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
    <>
      <Navigation />
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
        <Route path="/store" element={<Store />} />
        <Route path="/upgrades" element={<Upgrades />} />
      </Routes>
      <ClickerCounter />
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;
