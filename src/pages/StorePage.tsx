import {
  GiTwoCoins,
  GiCardAceClubs,
  GiCardRandom,
  GiCardboardBox,
} from "react-icons/gi";
import {
  TbCircleLetterC,
  TbCircleLetterB,
  TbCircleLetterA,
  TbCircleLetterS,
} from "react-icons/tb";
import cpreview from "../images/cards/c/c-hawk-tuah.webp";
import bpreview from "../images/cards/b/b-anthony-adams.webp";
import apreview from "../images/cards/a/a-this-is-fine.webp";
import spreview from "../images/cards/s/s-shrek-in-the-swamp.webp";
import StorePopup from "../components/StorePopup";
import { useState, useEffect, useRef } from "react";
import { cards, cardPacks, Card, CardPack } from "../data/cardsConfig";
import StoreDrawCards from "../components/StoreDrawCards";
import music from "../sounds/21-Christian-Salyer-Habib_s-Lucky-Ganesh-All-American-Market_1_.mp3";
import { getAuth } from "firebase/auth";
import { setDoc, doc, getDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { selectMoney, setMoney } from "../store/slices/clickerSlice";
import { useSelector, useDispatch } from "react-redux";
import { setAddCard } from "../store/slices/collectionSlice";

function Store() {
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [showDrawCards, setShowDrawCards] = useState<boolean>(false);
  const [drawnCards, setDrawnCards] = useState<Card[]>([]);
  const [volume, setVolume] = useState<number>(0);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const money = useSelector(selectMoney);
  const dispatch = useDispatch();

  const getImageForPack = (name: string) => {
    switch (name) {
      case "C TIER Pack":
        return cpreview;
      case "B TIER Pack":
        return bpreview;
      case "A TIER Pack":
        return apreview;
      case "S TIER Pack":
        return spreview;
      default:
        return "";
    }
  };

  const getIconForPack = (name: string) => {
    switch (name) {
      case "C TIER Pack":
        return <TbCircleLetterC />;
      case "B TIER Pack":
        return <TbCircleLetterB />;
      case "A TIER Pack":
        return <TbCircleLetterA />;
      case "S TIER Pack":
        return <TbCircleLetterS />;
      default:
        return null;
    }
  };

  const handleShowPopup = (index: number) => {
    setActiveCardIndex(index);
  };

  const handleClosePopup = () => {
    setActiveCardIndex(null);
  };

  function getRandomRarity(chances: {
    [key in Card["rarity"]]?: number;
  }): Card["rarity"] {
    const random = Math.random() * 100;
    let cumulative = 0;

    for (const [rarity, chance] of Object.entries(chances)) {
      cumulative += chance!;
      if (random < cumulative) return rarity as Card["rarity"];
    }
    return "C";
  }

  const handleConfirmSelection = () => {
    if (activeCardIndex !== null) {
      const selectedPack = cardPacks[activeCardIndex];

      if (money < selectedPack.price) {
        console.log("Insufficient funds to purchase this pack.");
        return;
      }

      drawCards(selectedPack);
    }

    setActiveCardIndex(null);
    setShowDrawCards(true);
  };

  function drawCards(pack: CardPack) {
    const selectedCards: Card[] = [];

    while (selectedCards.length < 5) {
      const rarity = getRandomRarity(pack.chances);
      const availableCards = cards.filter((card) => card.rarity === rarity);

      // Get random card
      const randomCard =
        availableCards[Math.floor(Math.random() * availableCards.length)];

      // Avoid duplicated cards in the drawn set
      if (!selectedCards.some((card) => card.id === randomCard.id)) {
        // Add dateAchieved here before pushing with formatted date
        selectedCards.push({
          ...randomCard,
          dateAchieved: new Date().toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        });
      }
    }

    setDrawnCards(selectedCards); // Update local state
    updateCardsInDB(selectedCards, pack.price); // Save to database

    dispatch(setAddCard(selectedCards)); // Dispatch array of cards with dateAchieved to Redux
  }

  const handleCloseDrawCards = () => {
    setShowDrawCards(false);
  };

  useEffect(() => {
    backgroundMusicRef.current = new Audio(music);
    backgroundMusicRef.current.loop = true;
    backgroundMusicRef.current.volume = volume;
    backgroundMusicRef.current.play();

    return () => {
      backgroundMusicRef.current?.pause();
      backgroundMusicRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = volume;
    }
  }, [volume]);

  const updateCardsInDB = async (cards: Card[], packPrice: number) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("No user is logged in.");
      return;
    }

    const newMoney = money - packPrice;
    dispatch(setMoney(newMoney));

    try {
      const userDocRef = doc(db, "users", user.uid);

      for (const card of cards) {
        const cardDocRef = doc(collection(userDocRef, "cards"), card.id);

        // Check if the card already exists in the subcollection
        const cardSnap = await getDoc(cardDocRef);

        if (!cardSnap.exists()) {
          // Add the card if it doesn't already exist with formatted date
          await setDoc(cardDocRef, {
            ...card,
            dateAchieved: new Date().toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          });
        }
      }

      // Update the money field in the main document
      await setDoc(userDocRef, { money: newMoney }, { merge: true });

      console.log("Cards and money successfully saved to database.");
    } catch (error) {
      console.error("Error saving cards and money to database:", error);
    }
  };

  return (
    <div className="store">
      <div className="store__wrapper">
        <h2 className="store__h2">GAME SHOP</h2>
        <div className="store__slider-box">
          <label htmlFor="volume-slider">Banger Volume:</label>
          <input
            id="volume-slider"
            className="store__volume-slider"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
        </div>
        <div className="store__section-container">
          <button className="store__section-standard">
            <GiCardRandom className="store__section-icon" /> Standard
          </button>
          <button className="store__section-collection">
            <GiCardboardBox className="store__section-icon" /> Collection
          </button>
          <button className="store__section-gift">
            <GiCardAceClubs className="store__section-icon" /> Free
          </button>
        </div>
        <h3 className="store__cards-sub-section-name">Classic Packs</h3>
        <div className="store__cards-container">
          {cardPacks.map((pack, index) => (
            <div key={index} className="store__card">
              <button
                className="store__card-preview-container"
                onClick={() => handleShowPopup(index)}
              >
                <img
                  src={getImageForPack(pack.name)}
                  alt={`${pack.name} preview`}
                  className="store__card-preview"
                />
                <div className="store__card-preview-overlay">
                  <p className="store__card-preview-overlay-text">
                    {pack.name}
                  </p>
                </div>
              </button>
              <div className="store__card-info-container">
                <div className="store__card-icon-box">
                  {getIconForPack(pack.name)}
                </div>
                <div className="store__card-info">
                  <div className="store__card-name">
                    <span style={{ color: "#51C7F6" }}>{pack.name}</span> Card
                    Pack
                  </div>
                  <div className="store__card-price">
                    price: {pack.price.toLocaleString("pl-PL")}{" "}
                    <GiTwoCoins className="store__card-price-icon" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {activeCardIndex !== null && (
          <StorePopup
            name={cardPacks[activeCardIndex].name}
            chances={cardPacks[activeCardIndex].chances}
            onClose={handleClosePopup}
            onConfirm={handleConfirmSelection}
            packPrice={cardPacks[activeCardIndex].price}
            money={money}
          />
        )}

        {showDrawCards && (
          <StoreDrawCards
            drawnCards={drawnCards}
            onClose={handleCloseDrawCards}
          />
        )}
      </div>
    </div>
  );
}

export default Store;
