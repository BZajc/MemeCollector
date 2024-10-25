import ClickArea from "../components/ClickArea";
import NewsBar from "../components/NewsBar";
import {cards, cardPacks} from "../data/cardsConfig"

function HomePage() {
  console.log(cards, cardPacks);
  return (
    <div className="main">
        <ClickArea />
        <NewsBar />
    </div>
  );
}

export default HomePage;
