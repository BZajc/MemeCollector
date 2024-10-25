interface StorePopupProps {
  name: string;
  description: string;
  chance: string;
  onClose: () => void;
}

function StorePopup({ name, description, chance, onClose }: StorePopupProps) {
  return (
    <div className="store-popup">
      <div className="store-popup__container">
        <h3 className="store-popup__h3">
          Are you sure you want to buy {name}?
        </h3>
        <p className="store-popup__sub-heading">
          This card pack contains {description}
        </p>
        <p className="store-popup__sub-heading">
          Chances for cards from this pack are: {chance}
        </p>
        <div className="store-popup__buttons">
          <button className="store-popup__button">Yes, give me memes 😼</button>
          <button className="store-popup__button" onClick={onClose}>
            No, I don't want it 💩
          </button>
        </div>
      </div>
    </div>
  );
}

export default StorePopup;