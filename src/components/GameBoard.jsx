function GameBoard({ cards, flippedIds, matchedIds, onCardClick }) {
  return (
    <main className="board">
      {cards.map((card) => {
        const isFlipped =
          flippedIds.includes(card.id) || matchedIds.includes(card.id);

        return (
          <div
            key={card.id}
            className="card-slot"
            onClick={() => onCardClick(card.id)}
          >
            <div className="card-face">
              {isFlipped ? (
                <img src={card.img} alt="Hello Kitty card" className="card-image" />
              ) : (
                '🎀'
              )}
            </div>
          </div>
        );
      })}
    </main>
  );
}

export default GameBoard;