import {
  BsFillHouseFill,
  BsCartFill,
  BsGrid3X3GapFill,
  BsFillPatchQuestionFill,
  BsDoorClosedFill,
  BsDoorOpenFill,
  BsArrowsExpandVertical,
  BsArrowsCollapseVertical,
  BsFillRocketTakeoffFill,
} from "react-icons/bs";
import {
  setExpandedNav,
  selectExpandedNav,
} from "../store/slices/navigationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebaseConfig";
import { useState } from "react";
import logo from "../images/MemeCollectorLogo.png";
import { useLocation } from "react-router-dom";
import { resetCards } from "../store/slices/collectionSlice";
import { resetClickerState } from "../store/slices/clickerSlice";

function Navigation() {
  const dispatch = useDispatch();
  const expandedNav = useSelector(selectExpandedNav);
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [showLogOutOptions, setShowLogOutOptions] = useState<boolean>(false);
  const location = useLocation();

  // Hide navigation at /auth path
  if(location.pathname === "/auth") {
    return null;
  }

  const handleExpandedNav = () => {
    dispatch(setExpandedNav(!expandedNav));
  };

  const handleNavBtnClick = (navigateTo: string) => {
    dispatch(setExpandedNav(false));
    navigate(navigateTo);
  };

  const handleLogout = () => {
    setShowLogOutOptions(!showLogOutOptions);
  };

  const handleLogoutOptions = (option: boolean) => {
    switch (option) {
      case true:
        signOut(auth)
          .then(() => {
            // user has been logged out successfully
            setShowLogOutOptions(false);
            // Reset all data so the next user logged won't copy progress from the previous one
            dispatch(resetCards())
            dispatch(resetClickerState())
          })
          .catch((err) => {
            console.log("Something went wrong when logging out", err);
          });
        break;
      case false:
        setShowLogOutOptions(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className={`main__nav ${expandedNav ? "main__nav--expanded" : ""}`}>
      <img className="main__logo" src={logo} alt="Meme Collector Logo" />
      <button className="main__nav-btn" onClick={() => handleNavBtnClick("/")}>
        <BsFillHouseFill className="main__nav-btn-icon" />
        <p className="main__nav-btn-text">MAIN</p>
      </button>
      <button
        className="main__nav-btn"
        onClick={() => handleNavBtnClick("/store")}
      >
        <BsCartFill className="main__nav-btn-icon" />
        <p className="main__nav-btn-text">STORE</p>
      </button>
      <button
        className="main__nav-btn"
        onClick={() => handleNavBtnClick("/upgrades")}
      >
        <BsFillRocketTakeoffFill className="main__nav-btn-icon" />
        <p className="main__nav-btn-text">UPGRADES</p>
      </button>
      <button
        className="main__nav-btn"
        onClick={() => handleNavBtnClick("/collections")}
      >
        <BsGrid3X3GapFill className="main__nav-btn-icon" />
        <p className="main__nav-btn-text">COLLECTIONS</p>
      </button>
      <button
        className="main__nav-btn"
        onClick={() => handleNavBtnClick("/info")}
      >
        <BsFillPatchQuestionFill className="main__nav-btn-icon" />
        <p className="main__nav-btn-text">INFO</p>
      </button>
      <button
        className="main__nav-btn main__nav-btn--logout"
        onClick={handleLogout}
      >
        <BsDoorClosedFill className="main__nav-btn-icon main__nav-btn-icon--normal" />
        <BsDoorOpenFill className="main__nav-btn-icon main__nav-btn-icon--hover" />
        <p className="main__nav-btn-text">LOG OUT</p>
      </button>

      {/* LOG OUT */}

      {showLogOutOptions && (
        <div className="main__log-out">
          <p className="main__log-out-text">
            Are you sure you want to log out?
          </p>
          <div className="main__log-out-btn-box">
            <button
              className="main__log-out-button main__log-out-button--yep"
              onClick={() => handleLogoutOptions(true)}
            >
              Yep
            </button>
            <button
              className="main__log-out-button main__log-out-button--nope"
              onClick={() => handleLogoutOptions(false)}
            >
              Nope
            </button>
          </div>
        </div>
      )}

      <button
        className="main__nav-btn main__nav-btn--expanded"
        onClick={handleExpandedNav}
      >
        {expandedNav ? (
          <>
            <BsArrowsExpandVertical className="main__nav-btn-icon" />
            <p className="main__nav-btn-text">Expanded</p>
          </>
        ) : (
          <>
            <BsArrowsCollapseVertical className="main__nav-btn-icon" />
            <p className="main__nav-btn-text">Collapsed</p>
          </>
        )}
      </button>
    </div>
  );
}

export default Navigation;
