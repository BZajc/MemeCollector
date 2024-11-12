import { useState, useEffect } from "react";
import { GiCutDiamond } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { RiCopperCoinFill } from "react-icons/ri";

function WheelOfMeme() {
  const [showStartPopup, setShowStartPopup] = useState<boolean>(false);
  const [showExitPopup, setShowExitPopup] = useState<boolean>(false);
  const [showWheelOfMemeContent, setShowWheelOfMemeContent] =
    useState<boolean>(false);
  const navigate = useNavigate;

  // Display starting popup with small delay
  useEffect(() => {
    setTimeout(() => {
      setShowStartPopup(true);
    }, 1000);
  }, []);

  const handleCloseStartPopup = () => {
    setShowStartPopup(false);
    setShowWheelOfMemeContent(true);
  };

  const handleExitPopup = () => {
    setShowExitPopup(true);
  };

  return (
    <div className="wheel-of-meme">
      {/* Display start popup */}
      {showStartPopup && (
        <div className="wheel-of-meme__welcome-popup">
          <h2 className="wheel-of-meme__welcome-text">
            Welcome to Wheel of Meme! 🎉
          </h2>
          <p className="wheel-of-meme__welcome-subtext">
            Spin the wheel and win 🎉
          </p>

          <h3 className="wheel-of-meme__how-to-play-h3">How to play:</h3>
          <ul className="wheel-of-meme__rules-list">
            <li>
              <strong>Simplicity</strong>: This is a simplified version of the
              popular game show.
            </li>
            <li>
              <strong>Prize Value</strong>: The value of prizes depends on your
              Power Click.
            </li>
            <li>
              <strong>Spin the Wheel</strong>: Click button to spin a wheel. You
              need to spin at the beginning of each round.
            </li>
            <li>
              <strong>Landing on Memes</strong>: Tap the wheel and spin to see
              which meme you land on.
            </li>
            <li>
              <strong>Guess a Letter</strong>: Guess a letter that could be in
              the puzzle. To win, you need to guess the entire phrase correctly.
            </li>
            <li>
              <strong>Limited Spins</strong>: Each round is limited to 3 spins,
              but this can be increased during gameplay.
            </li>
            <li>
              <strong>Special Win</strong>: If you guess the hidden phrase and
              still have remaining rounds, you will receive a one-time spin on
              an upgraded wheel at the end, depending on the number of rounds
              left.
            </li>
          </ul>

          <button
            className="wheel-of-meme__enter"
            onClick={handleCloseStartPopup}
          >
            Enter <GiCutDiamond className="wheel-of-meme__enter-icon" />
          </button>
        </div>
      )}
      {/* Display exit popup */}
      {showExitPopup && <div className="wheel-of-meme__exit-popup"></div>}
      {/* Display content if start popup has been closed */}
      {showWheelOfMemeContent && (
        <>

        </>
      )}
    </div>
  );
}

export default WheelOfMeme;
