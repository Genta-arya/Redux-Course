import React, { useState, useEffect } from "react";
import "../../../../../style/Slot.css"
import "../../../../../style/Content.css"
import { FadeLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const SlotMachine = () => {
  const [slotItems, setSlotItems] = useState([
    "🍒",
    "🍊",
    "🍇",
    "🍋",
    "🍉",
    "🍓",
  ]);
  const [slots, setSlots] = useState([0, 0, 0]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState("");
  const [showWinnerAlert, setShowWinnerAlert] = useState(false);
  const [saldo, setSaldo] = useState(100000);
  const [selectedCost, setSelectedCost] = useState(1000);
  const [hadiah, setHadiah] = useState("");
  const [winPercentage, setWinPercentage] = useState(5); 

  useEffect(() => {
    document.title = `HKKS SHOP | PlayGame`;
  });


  const costFactors = {
    1000: 1,
    5000: 3,
    9000: 5,
  };

  useEffect(() => {
    if (isSpinning) {
      const biayaSpin = selectedCost;
      const faktor = costFactors[selectedCost]; 

      if (saldo >= biayaSpin) {
        const spinTimeout = setTimeout(() => {
          const shouldWin = Math.random() * 100 < winPercentage; 

          let newSlots;
          if (shouldWin) {
            const winningItemIndex = Math.floor(
              Math.random() * slotItems.length
            );
            newSlots = [winningItemIndex, winningItemIndex, winningItemIndex];
            const hadiahSpin = biayaSpin * faktor;
            setSaldo(saldo + hadiahSpin);
            setWinnerMessage("Selamat Anda Menang!");
            setHadiah(`Anda mendapatkan hadiah Rp. ${hadiahSpin} (x${faktor})`);
          } else {
            newSlots = [
              Math.floor(Math.random() * slotItems.length),
              Math.floor(Math.random() * slotItems.length),
              Math.floor(Math.random() * slotItems.length),
            ];
            setSaldo(saldo - biayaSpin);
            setWinnerMessage("Coba lagi.");
            setHadiah("");
          }

          setSlots(newSlots);
          setIsSpinning(false);
          setShowWinnerAlert(true);
        }, 2000);

        return () => clearTimeout(spinTimeout);
      } else {
        setIsSpinning(false);
        setWinnerMessage("Saldo tidak mencukupi.");
        setShowWinnerAlert(true);
      }
    }
  }, [isSpinning, slotItems, saldo, selectedCost, winPercentage]);

  const handleSpinClick = () => {
    if (!isSpinning) {
      setIsSpinning(true);
      setWinnerMessage("");
      setShowWinnerAlert(false);
      setHadiah("");
    }
  };

  const handleWinPercentageChange = (event) => {
    setWinPercentage(parseInt(event.target.value));
  };

  const handleCostChange = (event) => {
    setSelectedCost(parseInt(event.target.value));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="w-full sm:w-auto p-12 mx-4 bg-white rounded-3xl shadow-2xl">
        <Link to="/game" className="text-blue-600 text-lg absolute top-2 left-5 ">
          <FontAwesomeIcon
            icon={faArrowLeft}
            color="white"
            size="1x"
            className="bg-gray-600 rounded-full p-2 hover:scale-110 hover:z-10 drop-shadow-2xl shadow-2xl"
          />
      
        </Link>
        <h1 className=" flex flex-col text-3xl font-bold mb-4 bg-black hover:z-10 hover:scale-105 text-white justify-center items-center p-4 rounded-full border-b-8 border-gray-300">
          Simulasi Slot Machine Game
        </h1>
        <div className="flex  items-center justify-center gap-4 sm:gap-9 mb-6 sm:mb-10 border-2 border-black p-6 sm:p-10 shine">
          {slots.map((slot, index) => (
            <div
              key={index}
              className={`${
                isSpinning
                  ? "spin flex-none text-4xl sm:text-6xl"
                  : "flex-none text-4xl sm:text-6xl"
              } bg-gray-300 rounded-lg p-4 shadow-lg`}
            >
              {slotItems[slot]}
            </div>
          ))}
        </div>
        <div className="mb-4  flex  items-center justify-center">
          <label className="mr-2">Biaya Spin:</label>
          <select
            value={selectedCost}
            onChange={handleCostChange}
            className="mr-2"
          >
            {Object.keys(costFactors).map((cost) => (
              <option key={cost} value={cost}>
                Rp. {cost}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 flex  items-center justify-center">
          <label className="mr-2">Persentase Kemenangan:</label>
          <input
            type="range"
            min="1"
            max="100"
            value={winPercentage}
            onChange={handleWinPercentageChange}
            className="mr-2"
          />
          <p className="items-center justify-center flex">{winPercentage}%</p>
        </div>
        <div>
          <div className="flex flex-col   items-center justify-center">
            <button
              className="mb-4 flex  px-4 py-2 bg-black text-white rounded hover:bg-gray-700 focus:outline-none hover:scale-105 hover:z-50 bg-black text-white p-4 rounded-full border-b-8 border-gray-300 shadow-2xl"
              onClick={handleSpinClick}
              disabled={isSpinning}
            >
              {isSpinning ? (
                <div className="mt-2 sm:mt-4 mb-4 flex  items-center justify-center">
                  <FadeLoader
                    size={16}
                    color={"#ffffff"}
                    loading={isSpinning}
                    className="ml-2 sm:ml-4 mb-1 sm:mb-2 mr-1"
                  />
                </div>
              ) : (
                `Putar (Saldo: Rp. ${saldo.toLocaleString()})`
              )}
            </button>
          </div>
        </div>
        <div className="mt-4">
          {showWinnerAlert && (
            <div
              className={`${
                winnerMessage === "Coba lagi."
                  ? "bg-red-200 text-red-700"
                  : "bg-green-200 text-green-700"
              } p-4 rounded-lg`}
            >
              <p className="text-lg">{winnerMessage}</p>
              <p className="text-lg">{hadiah}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlotMachine;
