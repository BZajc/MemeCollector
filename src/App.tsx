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

function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Verify User
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Set user if logged in
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, [user]);

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
