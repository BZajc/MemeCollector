import AuthRegister from "../components/AuthRegister";
import AuthLogin from "../components/AuthLogin";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectShowRegistration, selectSwapFormAnimation, setSwapFormAnimation} from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
import MemeCollectorLogo from "../images/MemeCollectorLogo.png";
import AuthAdditional from "../components/AuthAdditional";

function AuthPage() {
  const showRegistration = useSelector(selectShowRegistration);
  const swapFormAnimation = useSelector(selectSwapFormAnimation)
  const dispatch = useDispatch()

  // Reset changing form animation
  useEffect(() => {
    if(swapFormAnimation) {
      setTimeout(() => {
        dispatch(setSwapFormAnimation(false))
      }, 500);
    }
  })

  return (
    <div className='auth-page'>
      <div className={`auth-page__container ${swapFormAnimation ? "auth-page__form-change" : ""}`}>
        <img
          className="auth-page__logo"
          src={MemeCollectorLogo}
          alt="app logo"
        />
        <h2 className="auth-page__welcome">Welcome in Meme Collector</h2>
        {!showRegistration ? (
          <AuthRegister />
        ) : (
          <>
            <AuthLogin />
          </>
        )}
      </div>
      <AuthAdditional />
    </div>
  );
}

export default AuthPage;
