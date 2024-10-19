import ClickerCounter from "../components/ClickerCounter";
import Navigation from "../components/Navigation";
import ClickArea from "../components/ClickArea";

function HomePage() {

  return (
    <div className="main">
        <Navigation />
        <ClickArea />
        <ClickerCounter />
    </div>
  );
}

export default HomePage;
