import { BsCurrencyDollar, BsSortAlphaDown } from "react-icons/bs";
import {
  GiPayMoney,
  GiClick,
  GiSandsOfTime,
  GiDiceSixFacesTwo,
  GiCrossedBones
} from "react-icons/gi";
import { upgrades } from "../data/upgradesConfig";
import { selectMoney } from "../store/slices/clickerSlice";
import { useSelector } from "react-redux";

function Upgrades() {
  const money = useSelector(selectMoney);
  // Helper function to render a section based on upgrade type
  const renderUpgradesSection = (
    type: string,
    title: string,
    Icon: React.ElementType
  ) => (
    <>
      <h3 className="upgrades__improvements-section-name">{title}</h3>
      <div className="upgrades__improvements-section">
        {upgrades
          .filter((upgrade) => upgrade.type === type)
          .map((upgrade) => (
            <div
              key={upgrade.id}
              className={`upgrades__improvement-container ${
                money < upgrade.price ? "upgrades__improvement-unavailable" : ""
              }`}
            >
              <div className="upgrades__improvement-icon">
                <Icon />
              </div>
              <div className="upgrades__improvement-info-box">
                <div className="upgrades__improvement-name-and-price-box">
                  <h5 className="upgrades__improvement-name">{upgrade.name}</h5>
                  <p className="upgrades__improvement-price">
                    Price: {upgrade.price.toLocaleString("pl-PL")}
                  </p>
                </div>
                <div className="upgrades__improvement-description">
                  {(() => {
                    switch (type) {
                      case "click":
                        return `Improve your click power by ${upgrade.value}x`;
                      case "idle":
                        return `Improve your idle power by ${upgrade.value}x /s of your Click Power`;
                      case "double click":
                        return `Improve your double click chance up to ${upgrade.value}%`;
                        case "critical click chance":
                          return `Improve your critical click chance up to ${upgrade.value}%`
                      default:
                        return "";
                    }
                  })()}
                </div>
              </div>
              <button
                className="upgrades__improvement-buy"
                disabled={money < upgrade.price}
              >
                <GiPayMoney />
              </button>
            </div>
          ))}
      </div>
    </>
  );

  // Helper to get improvement types
  const improvementTypes = Array.from(
    new Set(upgrades.map((upgrade) => upgrade.type))
  );

  return (
    <div className="upgrades">
      <div className="upgrades__wrapper">
        <h2 className="upgrades__h2">UPGRADES</h2>
        <div className="upgrades__section-container">
          <p className="upgrades__filter-text">Filter by</p>
          <div className="upgrades__search-type">
            <button className="upgrades__search-type-button">All</button>
            {improvementTypes.map((type) => (
              <button key={type} className="upgrades__search-type-button">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
          <div className="upgrades__filter-buttons">
            <button className="upgrades__filter-button">
              <BsCurrencyDollar />
            </button>
            <button className="upgrades__filter-button">
              <BsSortAlphaDown />
            </button>
          </div>

          {/* Render upgrades sections */}
          {renderUpgradesSection("click", "Click Power", GiClick)}
          {renderUpgradesSection("idle", "Idle Power", GiSandsOfTime)}
          {renderUpgradesSection("double click","Double Click",GiDiceSixFacesTwo)}
          {renderUpgradesSection("critical click chance","Critical Click Chance",GiCrossedBones)}
        </div>
      </div>
    </div>
  );
}

export default Upgrades;
