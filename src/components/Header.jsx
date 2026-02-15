function Header({ moves, onNewGame }) {
  return (
    <header className="header">
      <h1>Hello Kitty Memory Match 🎀</h1>

      <div className="header-controls">
        <p>Moves: {moves}</p>
        <button onClick={onNewGame}>New Game</button>
      </div>
    </header>
  );
}

export default Header;