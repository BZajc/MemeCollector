import Lottie from "lottie-react";
import CashAnimation from '../Lottie/Cash Animation.json'
import { selectMoney } from "../store/slices/clickerSlice";
import { useSelector } from "react-redux";

function ClickerCounter() {
    const money = useSelector(selectMoney)
    const displayMoney = Math.floor(money)

    return (
        <div className="clicker-counter">{displayMoney} <Lottie className="clicker-counter__cash-animation" animationData={CashAnimation} loop={true}/></div>
    );
};

export default ClickerCounter;