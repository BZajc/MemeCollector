import { Card } from "../data/cardsConfig";

interface StoreDrawCardsProps {
    drawnCards: Card[];
}

function StoreDrawCards({drawnCards}: StoreDrawCardsProps) {
    return (
        <div className="store-draw">
            <h3 className="store-draw__h3">Check what memes you got:</h3>
            <div className="store-draw__cards">
                {drawnCards.map((card) => (
                    <div key={card.id} className="store-draw__card">
                        <img src={card.image} alt={card.name}  className="store-draw__image"/>
                        <p className="store-draw__name">{card.name} - {card.rarity} Tier</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StoreDrawCards;