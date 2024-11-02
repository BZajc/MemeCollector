import Lottie from "lottie-react";
import CashAnimation from "../Lottie/Cash Animation.json";
import { selectMoney } from "../store/slices/clickerSlice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function ClickerCounter() {
  const money = useSelector(selectMoney);
  const displayMoney = Math.floor(money).toLocaleString('pl-PL');
  const location = useLocation();

  // Hide counter at /auth path
  if (location.pathname === "/auth") {
    return null;
  }
  return (
    <div className="clicker-counter">
      {displayMoney}{" "}
      <Lottie
        className="clicker-counter__cash-animation"
        animationData={CashAnimation}
        loop={true}
      />
    </div>
  );
}

export default ClickerCounter;
