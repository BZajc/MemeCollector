import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMoney } from "../store/slices/clickerSlice";
import { setRemovePurchasedImprovement } from "../store/slices/upgradesSlice";
import { setCriticalClickMultiplier, setCriticalClickChance, setDoubleClickChance, setClickPower } from "../store/slices/clickerSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { upgrades } from "../data/upgradesConfig";

function UserDataLoader() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          const data = docSnap.data();

          // Update purchased upgrades in Redux
          if (data.purchasedUpgrades) {
            dispatch(setRemovePurchasedImprovement(data.purchasedUpgrades));

            // Apply effects for each purchased upgrade
            data.purchasedUpgrades.forEach((upgradeId: string) => {
              const purchasedUpgrade = upgrades.find(u => u.id === upgradeId);
              if (purchasedUpgrade) {
                switch (purchasedUpgrade.type) {
                  case "click power":
                    dispatch(setClickPower(purchasedUpgrade.value || 0));
                    break;
                  case "double click":
                    dispatch(setDoubleClickChance(purchasedUpgrade.value || 0));
                    break;
                  case "critical click chance":
                    dispatch(setCriticalClickChance(purchasedUpgrade.value || 0));
                    break;
                  case "critical click power":
                    dispatch(setCriticalClickMultiplier(purchasedUpgrade.value || 0));
                    break;
                  default:
                    break;
                }
              }
            });
          }

          // Set user money in Redux
          if (data.money) {
            dispatch(setMoney(data.money));
          }
        }
      }
    };

    fetchUserData();
  }, [dispatch, user]);

  return null;
}

export default UserDataLoader;
