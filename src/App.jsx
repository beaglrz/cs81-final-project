import { useState } from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import cardImages from './data/cards';

function App() {
  const [moves, setMoves] = useState(0);
  const [flippedIds, setFlippedIds] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);

  // make 20 cards (10 pairs)
  const cards = [...cardImages, ...cardImages].map((card, index) => ({
    id: index + 1,
    pairId: card.name,
    img: card.img,
  }));

  function handleNewGame() {
    setMoves(0);
    setFlippedIds([]);
    setMatchedIds([]);
    alert('New game started!');
  }

  function handleCardClick(cardId) {
    if (flippedIds.includes(cardId) || matchedIds.includes(cardId)) return;
    if (flippedIds.length === 2) return;

    const newFlipped = [...flippedIds, cardId];
    setFlippedIds(newFlipped);
    setMoves((m) => m + 1);

    if (newFlipped.length === 2) {
      const firstCard = cards.find((c) => c.id === newFlipped[0]);
      const secondCard = cards.find((c) => c.id === newFlipped[1]);

      if (firstCard.pairId === secondCard.pairId) {
        setMatchedIds([...matchedIds, newFlipped[0], newFlipped[1]]);
        setFlippedIds([]);
      } else {
        setTimeout(() => {
          setFlippedIds([]);
        }, 1000);
      }
    }
  }

  return (
    <div className="app">
      <Header moves={moves} onNewGame={handleNewGame} />
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