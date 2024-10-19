import { useSelector, useDispatch } from "react-redux";
import { setMoney, selectClickPower, selectMoney } from "../store/slices/clickerSlice";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";

function ClickArea() {
  const dispatch = useDispatch();
  const clickPower = useSelector(selectClickPower);
  const money = useSelector(selectMoney)
  const auth = getAuth()
  const user = auth.currentUser

  // GET USER MONEY FROM DATABASE 
  useEffect(() => {
    const fetchUserMoney = async () => {
        if (user) {
            try {
                // Get a user in db
                const userDoc = doc(db, "users", user.uid);
                const userSnapshot = await getDoc(userDoc)

                if (userSnapshot.exists()) {
                    const userData = userSnapshot.data()
                    if(userData && userData.money !== undefined) {
                        dispatch(setMoney(userData.money))
                        console.log("Money has been fetched from DB");
                        
                    }
                }
            }catch(err) {
                console.log("Money couldn't be fetched from db");
            }
        }
    }

    fetchUserMoney()
  },[user, dispatch])


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
            console.log("Money has been updated in DB");
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
