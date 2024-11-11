import { cards, Card } from "../data/cardsConfig";
import placeholder from "../images/MemeCollectorLogo.png";
import { selectCards } from "../store/slices/collectionSlice";
import { useSelector } from "react-redux";

function Collections() {
    const allCards = useSelector(selectCards);

    // Group cards by tiers
    const tiers = [
        { name: "C Tier Cards", rarity: "C" },
        { name: "B Tier Cards", rarity: "B" },
        { name: "A Tier Cards", rarity: "A" },
        { name: "S Tier Cards", rarity: "S" },
    ];

    // Function to render cards within a section
    const renderCollectionCards = (tierCards: Card[]) => {
        return tierCards.map((card) => {
            // Find if the card is owned by the user
            const ownedCard = allCards.find((owned) => owned.id === card.id);
            
            return (
                <div key={card.id} className="collections__card">
                    <img
                        src={ownedCard ? ownedCard.image : placeholder}
                        alt={ownedCard ? ownedCard.name : "Placeholder"}
                        className="collections__card-image"
                    />
                    <div className="collections__card-tier">{card.rarity} Tier</div>
                    <div className="collections__card-name">{ownedCard ? ownedCard.name : ""}</div>
                    <div className="collections__card-date">
                        {ownedCard ? `Achieved on: ${ownedCard.dateAchieved}` : "Not yet achieved"}
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="collections">
            <div className="collections__wrapper">
                <h2 className="collections__h2">COLLECTIONS</h2>

                {tiers.map((tier) => (
                    <div key={tier.rarity} className="collections__section-wrapper">
                        <h3 className="collections__section-name">{tier.name}</h3>
                        <div className="collections__section">
                            {/* Render all cards in the game, but show real cards only if owned */}
                            {renderCollectionCards(cards.filter((card) => card.rarity === tier.rarity))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Collections;
