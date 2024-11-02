import { useSelector, useDispatch } from "react-redux";
import {
  setMoney,
  selectClickPower,
  selectMoney,
} from "../store/slices/clickerSlice";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import dogeCoin from "../images/dogecoin.svg";
import { useState } from "react";
import tapSound from "../sounds/tap.mp3";

interface Coin {
  id: number;
  top: string;
  left: string;
}

function ClickArea() {
  const dispatch = useDispatch();
  const clickPower = useSelector(selectClickPower);
  const money = useSelector(selectMoney);
  const auth = getAuth();
  const user = auth.currentUser;
  const [coins, setCoins] = useState<Coin[]>([]);

  // UPDATE MONEY WITH CLICK AND SAVE IT IN DATABASE
  const handleClickForMoney = async () => {
    const newMoney = money + clickPower;
    dispatch(setMoney(newMoney));

    if (user) {
      try {
        // Get a user in db
        const userDoc = doc(db, "users", user.uid);

        // Save new data in DB
        await setDoc(userDoc, { money: newMoney }, { merge: true });
      } catch (err) {
        console.error("Error while updating money in DB", err);
      }
    }

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
    </div>
  );
}

export default ClickArea;
