import { BsCurrencyDollar } from "react-icons/bs";
import {
  GiPayMoney,
  GiClick,
  GiSandsOfTime,
  GiDiceSixFacesTwo,
  GiCrossedBones,
  GiChessQueen,
  GiMoneyStack,
} from "react-icons/gi";
import { upgrades } from "../data/upgradesConfig";
import { selectMoney } from "../store/slices/clickerSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFilterByAffordable,
  setFilterByAffordable,
  selectFilterByCheapest,
  setFilterByCheapest,
  selectFilterBySelectedTypes,
  setToggleSelectedTypes,
  setSelectAllTypes,
} from "../store/slices/upgradesSlice";
import { useEffect, useCallback } from "react";

function Upgrades() {
  const money = useSelector(selectMoney);
  const dispatch = useDispatch();
  const filterByAffordable = useSelector(selectFilterByAffordable);
  const filterByCheapest = useSelector(selectFilterByCheapest);
  const filterBySelectedTypes = useSelector(selectFilterBySelectedTypes);

  // Helper function to render a section based on upgrade type
  const renderUpgradesSection = (
    type: string,
    title: string,
    Icon: React.ElementType
  ) => {
    // Check if theres any type selected to filter
    if (!filterBySelectedTypes.includes(type)) return null;
    // Find only affordable improvements if filter is active
    const filteredUpgrades = upgrades
      .filter((upgrade) => upgrade.type === type)
      .filter((upgrade) => !filterByAffordable || money >= upgrade.price);

    // Find the cheapest improvement if filter is active
    const displayedUpgrades = filterByCheapest
      ? [
          filteredUpgrades.reduce(
            (minUpgrade, upgrade) =>
              upgrade && upgrade.price < minUpgrade.price
                ? upgrade
                : minUpgrade,
            filteredUpgrades[0]
          ),
        ].filter(Boolean) // Making sure that upgrade is not undefined
      : filteredUpgrades;

    return (
      <>
        <h3 className="upgrades__improvements-section-name">{title}</h3>
        <div className="upgrades__improvements-section">
          {/* Check if there are any available improvements to display */}
          {displayedUpgrades.length > 0 ? (
            displayedUpgrades.map((upgrade) => (
              <div
                key={upgrade.id}
                className={`upgrades__improvement-container ${
                  money < upgrade.price
                    ? "upgrades__improvement-unavailable"
                    : ""
                }`}
              >
                <div className="upgrades__improvement-icon">
                  <Icon />
                </div>
                <div className="upgrades__improvement-info-box">
                  <div className="upgrades__improvement-name-and-price-box">
                    <h5 className="upgrades__improvement-name">
                      {upgrade.name}
                    </h5>
                    <p className="upgrades__improvement-price">
                      Price: {upgrade.price.toLocaleString("pl-PL")}
                    </p>
                  </div>
                  <div className="upgrades__improvement-description">
                    {(() => {
                      switch (type) {
                        case "click power":
                          return `Improve your click power by ${upgrade.value}x`;
                        case "idle":
                          return `Improve your idle power by ${upgrade.value}x /s of your Click Power`;
                        case "double click":
                          return `Improve your double click chance up to ${upgrade.value}%`;
                        case "critical click chance":
                          return `Improve your critical click chance up to ${upgrade.value}%`;
                        case "special":
                          return `Enhance "gameplay" by adding a new way to earn money`;
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
            ))
          ) : (
            <p className="upgrades__no-improvements">
              No available improvements to display.
            </p>
          )}
        </div>
      </>
    );
  };

  // Helper to get improvement types
  const improvementTypes = Array.from(
    new Set(upgrades.map((upgrade) => upgrade.type))
  );

  // Toggle filters
  const toggleFilterByAffordable = () => {
    dispatch(setFilterByAffordable(!filterByAffordable));
  };

  const toggleFilterByCheapest = () => {
    dispatch(setFilterByCheapest(!filterByCheapest));
  };

  const toggleTypeSelection = (type: string) => {
    dispatch(setToggleSelectedTypes(type));
  };

// Memoize selectAllImprovementTypes to avoid recreating it on each render
const selectAllImprovementTypes = useCallback(() => {
  dispatch(setSelectAllTypes(improvementTypes));
}, [dispatch, improvementTypes]);

  // If none of the types to filter aren't selected select all of them
  useEffect(() => {
    if (filterBySelectedTypes.length === 0) {
      selectAllImprovementTypes();
    }
  }, [filterBySelectedTypes, selectAllImprovementTypes]);

  return (
    <div className="upgrades">
      <div className="upgrades__wrapper">
        <h2 className="upgrades__h2">UPGRADES</h2>
        <div className="upgrades__section-container">
          <p className="upgrades__filter-text">Filter by</p>
          {/* Filter Buttons */}
          <div className="upgrades__filter-buttons">
            {/* Show only affordable improvements */}
            <div className="upgrades__filter-buttons-box">
              <button
                className={`upgrades__filter-button ${
                  filterByAffordable ? "upgrades__filter-button-active" : ""
                }`}
                onClick={toggleFilterByAffordable}
              >
                <BsCurrencyDollar />
              </button>
              <p className="upgrades__filter-button-text">Affordable</p>
            </div>
            {/* Show only the cheapest ones */}
            <div className="upgrades__filter-buttons-box">
              <button
                className={`upgrades__filter-button ${
                  filterByCheapest ? "upgrades__filter-button-active" : ""
                }`}
                onClick={toggleFilterByCheapest}
              >
                <GiMoneyStack />
              </button>
              <p className="upgrades__filter-button-text">Cheapest</p>
            </div>
          </div>
          <div className="upgrades__search-type">
            <button
              className={`upgrades__search-type-button ${
                filterBySelectedTypes.length === improvementTypes.length
                  ? "upgrades__search-type-button-active"
                  : ""
              }`}
              onClick={selectAllImprovementTypes}
            >
              All
            </button>
            {improvementTypes.map((type) => (
              <button
                key={type}
                className={`upgrades__search-type-button ${
                  filterBySelectedTypes.includes(type)
                    ? "upgrades__search-type-button-active"
                    : ""
                }`}
                onClick={() => toggleTypeSelection(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* Render upgrades sections */}
          {renderUpgradesSection("click power", "Click Power", GiClick)}
          {renderUpgradesSection("idle", "Idle Power", GiSandsOfTime)}
          {renderUpgradesSection(
            "double click",
            "Double Click",
            GiDiceSixFacesTwo
          )}
          {renderUpgradesSection(
            "critical click chance",
            "Critical Click Chance",
            GiCrossedBones
          )}
          {renderUpgradesSection(
            "critical click power",
            "Critical Click Power",
            GiCrossedBones
          )}
          {renderUpgradesSection("special", "Special", GiChessQueen)}
        </div>
      </div>
    </div>
  );
}

export default Upgrades;
