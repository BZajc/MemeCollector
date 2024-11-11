interface StorePopupProps {
  name: string;
  onConfirm: () => void;
  chances: { [key: string]: number };
  onClose: () => void;
  packPrice: number;
  money: number;
}

function StorePopup({
  name,
  chances,
  onClose,
  onConfirm,
  packPrice,
  money,
}: StorePopupProps) {
  // Format "chances" to string
  const formattedChances = Object.entries(chances)
    .map(([rarity, chance]) => `${chance}% ${rarity} Tier`)
    .join(", ");

  return (
    <div className="store-popup" onClick={onClose}>
      <div
        className="store-popup__container"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="store-popup__h3">
          Are you sure you want to buy {name}?
        </h3>
        <p className="store-popup__sub-heading">
          Chances for cards from this pack are: {formattedChances}
        </p>
        <div className="store-popup__buttons">
          {packPrice < money && (
            <>
              <button className="store-popup__button" onClick={onConfirm}>
                Yes, give me memes 😼
              </button>
              <button className="store-popup__button" onClick={onClose}>
                No, I don't want it 💩
              </button>
            </>
          )}
          {packPrice > money && (
            <button className="store-popup__button store-popup__insufficient-funds" onClick={onClose}>
              Insufficient funds 🛑
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default StorePopup;
