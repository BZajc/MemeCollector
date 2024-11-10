import { useSelector, useDispatch } from "react-redux";
import {
  setMoney,
  selectClickPower,
  selectMoney,
  selectDoubleClickChance,
  selectCriticalClickChance,
  selectCriticalClickMultiplier,
} from "../store/slices/clickerSlice";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import dogeCoin from "../images/dogecoin.svg";
import { useState, useRef } from "react";
import tapSound from "../sounds/tap.mp3";

interface Coin {
  id: number;
  top: string;
  left: string;
}

function ClickArea() {
  const dispatch = useDispatch();
  const clickPower = useSelector(selectClickPower);
  const doubleClickChance = useSelector(selectDoubleClickChance);
  const criticalClickChance = useSelector(selectCriticalClickChance);
  const criticalClickMultiplier = useSelector(selectCriticalClickMultiplier);
  const money = useSelector(selectMoney);
  const auth = getAuth();
  const user = auth.currentUser;
  const [coins, setCoins] = useState<Coin[]>([]);
  const [displayedMoney, setDisplayedMoney] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState<{ top: string; left: string } | null>(null);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  // Handle money click event with upgrades
  const handleClickForMoney = async (event: React.MouseEvent) => {
    let earnedMoney = clickPower;

    // Apply double click chance
    if (Math.random() < doubleClickChance / 100) {
      earnedMoney *= 2;
    }

    // Apply critical click chance and multiplier
    if (Math.random() < criticalClickChance / 100) {
      earnedMoney *= criticalClickMultiplier;
    }

    const newMoney = money + earnedMoney;
    dispatch(setMoney(newMoney));

    if (user) {
      try {
        const userDoc = doc(db, "users", user.uid);
        await setDoc(userDoc, { money: newMoney }, { merge: true });
      } catch (err) {
        console.error("Error while updating money in DB", err);
      }
    }

    // Clear previous timeout to reset timer
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    // Display earned money at the mouse position
    setDisplayedMoney(earnedMoney);
    setMousePosition({ top: `${event.clientY - 20}px`, left: `${event.clientX}px` });

    // Set new timeout to clear displayed money after 1 second
    timeoutIdRef.current = setTimeout(() => {
      setDisplayedMoney(null);
      setMousePosition(null);
    }, 1000);

    const newCoin = { id: Date.now(), ...getRandomCoinPosition() };
    setCoins((prevCoins) => [...prevCoins, newCoin]);

    // Play tap sound on each click
    const sound = new Audio(tapSound);
    sound.play();

    // Remove coin after 1s
    setTimeout(() => {
      setCoins((prevCoins) =>
        prevCoins.filter((coin) => coin.id !== newCoin.id)
      );
    }, 1000);
  };

  // Get random position of coin to display
  const getRandomCoinPosition = () => {
    const top = Math.floor(Math.random() * 80) + "%";
    const left = Math.floor(Math.random() * 80) + "%";
    return { top, left };
  };

  return (
    <div className="click-area" onClick={handleClickForMoney}>
      {coins.map((coin) => (
        <img
          key={coin.id}
          src={dogeCoin}
          alt="DogeCoin"
          className="click-area__coin"
          style={{
            top: coin.top,
            left: coin.left,
          }}
        />
      ))}
      
      {/* Display the earned money above the cursor */}
      {displayedMoney !== null && mousePosition && (
        <div
          className="click-area__money-per-click"
          style={{
            top: mousePosition.top,
            left: mousePosition.left,
          }}
        >
          +{displayedMoney.toFixed(0)}$
        </div>
      )}
    </div>
  );
}

export default ClickArea;
