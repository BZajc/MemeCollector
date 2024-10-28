interface StorePopupProps {
  name: string;
  onConfirm: () => void;
  chances: { [key: string]: number };
  onClose: () => void;
}

function StorePopup({ name, chances, onClose, onConfirm }: StorePopupProps) {
  // Format "chances" to string
  const formattedChances = Object.entries(chances)
    .map(([rarity, chance]) => `${chance}% ${rarity} Tier`)
    .join(", ");

  return (
    <div className="store-popup">
      <div className="store-popup__container">
        <h3 className="store-popup__h3">
          Are you sure you want to buy {name}?
        </h3>
        <p className="store-popup__sub-heading">
          Chances for cards from this pack are: {formattedChances}
        </p>
        <div className="store-popup__buttons">
          <button className="store-popup__button" onClick={onConfirm}>Yes, give me memes 😼</button>
          <button className="store-popup__button" onClick={onClose}>
            No, I don't want it 💩
          </button>
        </div>
      </div>
    </div>
  );
}

export default StorePopup;