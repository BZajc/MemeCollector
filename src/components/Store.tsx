import {
  GiTwoCoins,
  GiBuyCard,
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
function Store() {
  const cards = [
    {
      name: "C TIER",
      image: cpreview,
      alt: "C Tier card preview",
      description: "Bunch of crap memes for everyone",
      icon: <TbCircleLetterC />,
      price: 100,
    },
    {
      name: "B TIER",
      image: bpreview,
      alt: "B Tier card preview",
      description:
        "The B Tier Pack offers accessible memes at an accessible price",
      icon: <TbCircleLetterB />,
      price: 2500,
    },
    {
      name: "A TIER",
      image: apreview,
      alt: "A Tier card preview",
      description:
        "The A Tier Pack includes cool memes",
      icon: <TbCircleLetterA />,
      price: 15000,
    },
    {
      name: "S TIER",
      image: spreview,
      alt: "S Tier card preview",
      description:
        "The S Tier Pack contains memes you'd show at the Christmas dinner table",
      icon: <TbCircleLetterS />,
      price: 100000,
    },
  ];

  return (
    <div className="store">
      <div className="store__wrapper">
        <h2 className="store__h2">GAME SHOP</h2>
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
        <h3 className="store__cards-sub-section-name">Default</h3>
        <div className="store__cards-container">
          {/* Render Cards */}
          {cards.map((card, index) => (
            <div key={index} className="store__card">
              <button className="store__card-preview-container">
                <img
                  src={card.image}
                  alt={card.alt}
                  className="store__card-preview"
                />
                <div className="store__card-preview-overlay">
                  <p className="store__card-preview-overlay-text">{card.name}</p>
                </div>
              </button>
              <div className="store__card-info-container">
                <div className="store__card-icon-box">{card.icon}</div>
                <div className="store__card-info">
                  <div className="store__card-name">
                    <span style={{ color: "#51C7F6" }}>{card.name}</span> Card
                    Pack
                  </div>
                  <div className="store__card-description">
                    {card.description}
                  </div>
                  <div className="store__card-price">
                    price: {card.price}{" "}
                    <GiTwoCoins className="store__card-price-icon" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <h3 className="store__cards-sub-section-name">Another Sub Section</h3>
      </div>
    </div>
  );
}

export default Store;
