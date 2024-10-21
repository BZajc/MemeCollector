import { useEffect, useState, useRef } from "react";

function NewsBar() {

    // Hey don't read this cringe thank you
    const news = [
        "Maybe the code isn't the cleanest, but it's fine.",
        "Shrek announces his candidacy for President of the Swamp, facing little competition.",
        "You won't make Pepe happy by playing this crap.",
        "Kawasaki is from France.",
        "New Pepe Coin is gaining popularity.",
        "I highly doubt this app will help me get a job.",
        "Grumpy Cat's spirit returns to judge your poor life choices.",
        "Pepe the Frog opens a therapy center for internet-sad frogs.",
        "Overly Attached Girlfriend gets a restraining order against 'too attached' fans.",
        "Distracted Boyfriend admits he's distracted.",
        "Bad Luck Brian finally gets some luck - got hit by an ambulance.",
        "Dat Boi cannot ride a skateboard.",
        "It's coming. Get ready. loser.com.",
        "Pepe and Peppa named their kid Peppe.",
        "Baby, don't hurt me.",
        "Most of the news is generated by GPT - that's why they're cringe (at least that's what I'm going to say).",
        "Popular opinion among feminists: We don't understand the expanding brain meme.",
        "There are 7 million people alive.",
        "This app is boring, and the lack of gameplay doesn't change my mind.",
        "Is this a... nope, still cringe news.",
        "Ludacrisscrossapplesauce.",
        "Angry Patrick meme is S Tier.",
        `Elon Musk plans to open a new factory in third-world countries in search of new astronauts. Says: "The lighter the load, the lower the costs."`,
        "Wow, the lack of comments in the code is so intuitive, so wow.",
        "Let my manager speak to you.",
        "React is a terrible idea for creating a game.",
        "Grzegorz Brzęczyszczykiewicz",
        "Kur*a Bober"
      ];

  const shuffleArray = (array: string[]) => {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  };

  const [shuffledNews, setShuffledNews] = useState<string[]>([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState<number>(0);
  const textWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Shuffle the news when component mounts
    setShuffledNews(shuffleArray(news));
  }, []);

  // News Bar Animation
  useEffect(() => {
    if (shuffledNews.length === 0) return; // Make sure there are news items to show

    let animationFrameId: number;
    const moveElement = () => {
      if (!textWrapperRef.current) return;

      const textWrapper = textWrapperRef.current;
      const areaWidth = textWrapper.parentElement?.offsetWidth || 0;
      let position = areaWidth; // Start from the right edge of news-bar__text-area

      const animate = () => {
        position -= 1.5; // Speed of the text
        textWrapper.style.transform = `translateX(${position}px)`;

        // If the text has moved out of the viewport change to the next news item
        if (position < -textWrapper.offsetWidth) {
          position = areaWidth; // Reset the position to the right side
          setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % shuffledNews.length); // Go to the next news item
        } else {
          // Continue animation if element hasn't moved out yet
          animationFrameId = requestAnimationFrame(animate);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    };

    moveElement();

    return () => cancelAnimationFrame(animationFrameId);
  }, [currentNewsIndex, shuffledNews]); // Re-run the animation whenever currentNewsIndex or shuffledNews changes

  return (
    <div className="news-bar">
      <div className="news-bar__text-area">
        {shuffledNews.length > 0 && (
          <div ref={textWrapperRef} className="news-bar__text-wrapper">
            <p className="news-bar__text">{shuffledNews[currentNewsIndex].toUpperCase()}</p>
          </div>
        )}
      </div>
      <div className="news-bar__logo">MEME24</div>
    </div>
  );
}

export default NewsBar;