import { useState } from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import cardImages from './data/cards';

function App() {
  const [moves, setMoves] = useState(0);
  const [flippedIds, setFlippedIds] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const [cards, setCards] = useState(() =>
    [...cardImages, ...cardImages]
      .map((card, index) => ({
        id: index + 1,
        pairId: card.name,
        img: card.img,
      }))
      .sort(() => Math.random() - 0.5)
  );

    const totalPairs = cardImages.length;

    const didWin = matchedIds.length === totalPairs * 2;

  function handleNewGame() {
    setMoves(0);
    setFlippedIds([]);
    setMatchedIds([]);
    setDisabled(false);

    setCards(
      [...cardImages, ...cardImages]
        .map((card, index) => ({
          id: index + 1,
          pairId: card.name,
          img: card.img,
        }))
        .sort(() => Math.random() - 0.5)
    );
  }

  function handleCardClick(cardId) {
    if (disabled) return;
    if (flippedIds.includes(cardId) || matchedIds.includes(cardId)) return;
    if (flippedIds.length === 2) return;

    const newFlipped = [...flippedIds, cardId];
    setFlippedIds(newFlipped);
    setMoves((m) => m + 1);

    if (newFlipped.length === 2) {
      setDisabled(true);

      const firstCard = cards.find((c) => c.id === newFlipped[0]);
      const secondCard = cards.find((c) => c.id === newFlipped[1]);

      if (firstCard.pairId === secondCard.pairId) {
        setMatchedIds((prev) => [...prev, newFlipped[0], newFlipped[1]]);
        setFlippedIds([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlippedIds([]);
          setDisabled(false);
        }, 1000);
      }
    }
  }

  return (
    <div className="app">
      <Header moves={moves} onNewGame={handleNewGame} />

      {didWin && (
        <p
          style={{
            textAlign: 'center',
            marginTop: '14px',
            fontWeight: 'bold',
            fontSize: '18px',
            color: '#ff69b4'
          }}
        >
          🎉 You matched all the Hello Kitty friends! 🎀
        </p>
      )}

      <GameBoard
        cards={cards}
        flippedIds={flippedIds}
        matchedIds={matchedIds}
        onCardClick={handleCardClick}      
      />
    </div>
  );
}

export default App;