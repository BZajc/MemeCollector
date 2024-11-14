// React
import { useEffect, useState } from "react";

// React Router
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { setMoney } from "./store/slices/clickerSlice";

// Firebase
import { auth } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Pages
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";

// Components
import Navigation from "./components/Navigation";
import ClickerCounter from "./components/ClickerCounter";
import Store from "./components/Store";
import Upgrades from "./components/Upgrades";
import UserDataLoader from "./components/UserDataLoader";
import Collections from "./components/Collections";

// Lottie Animations
import Lottie from "lottie-react";
import LoadingAnimation from "./Lottie/Loading Animation.json";


function AppContent() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingFinishAnimation, setLoadingFinishAnimation] = useState<boolean>(false);
  const dispatch = useDispatch();
  const location = useLocation(); // Hook to access the current location

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
          const userDoc = doc(db, "users", user.uid);
          const userSnapshot = await getDoc(userDoc);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            if (userData && userData.money !== undefined) {
              dispatch(setMoney(userData.money));
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
    const loadingText = "This loading is totally useless";
    return (
      <div
        className={`loading ${loadingFinishAnimation ? "loading__finish" : ""}`}
        style={{ padding: "1rem" }}
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
              className={`loading__letter ${char === " " ? "loading__space" : ""}`}
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
      {/* Load UserDataLoader to fetch user upgrades, money, and cards */}
      {user && <UserDataLoader />}
      <Routes>
        {/* Allow access to "/info" even if not logged in */}
        <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" />} />
        <Route path="/store" element={user ? <Store /> : <Navigate to="/auth" />} />
        <Route path="/upgrades" element={user ? <Upgrades /> : <Navigate to="/auth" />} />
        <Route path="/collections" element={user ? <Collections /> : <Navigate to="/auth" />} />
        <Route path="/info" element={<InfoPage />} />

        {/* Redirect all other routes to /auth if not logged in */}
        <Route path="*" element={<Navigate to={user ? "/" : "/auth"} />} />
      </Routes>

      {/* Render Navigation and ClickerCounter only if user is logged in and not on /info */}
      {user && location.pathname !== "/info" && (
        <>
          <Navigation />
          <ClickerCounter />
        </>
      )}
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
