import { useSelector, useDispatch } from "react-redux";
import { setMoney, selectClickPower, selectMoney } from "../store/slices/clickerSlice";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

function ClickArea() {
  const dispatch = useDispatch();
  const clickPower = useSelector(selectClickPower);
  const money = useSelector(selectMoney)
  const auth = getAuth()
  const user = auth.currentUser


  // UPDATE MONEY WITH CLICK AND SAVE IT IN DATABASE
  const handleClickForMoney = async () => {
    const newMoney = money + clickPower
    dispatch(setMoney(newMoney));

    if (user) {
        try {
            // Get a user in db
            const userDoc = doc(db, "users", user.uid);

            // Save new data in DB
            await setDoc(userDoc, {money: newMoney}, {merge: true})
        } catch(err) {
            console.error("Error while updating money in DB", err)
        }
    }
  };

  return (
    <div className="click-area" onClick={handleClickForMoney}>
      ClickArea
    </div>
  );
}

export default ClickArea;
