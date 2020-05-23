import React from 'react';
import HexRow from './HexRow'
import './App.css';

class App extends React.Component {
  state = {
    board: this.generate_board()
  }

  generate_board() {
    let hexValues = Array(5).fill().map(() => this.randomHex())

    return Array(5).fill().map((_,i) =>
      Array(5).fill().map((_,j) =>
        hexValues[Math.floor(Math.random() * 5)]
      )
    )
  }

  randomHex() {
    return Math.floor(Math.random() * 256)
      .toString(16)
      .toUpperCase()
      .padStart(2,'0')
  }

  hexClick(value) {
    console.log(value)
  }

  render() {
    console.log('rendered')
    console.log(this.state.board)
    return (
      <div className="App">
        {
          this.state.board.map((row, i) => (
            <HexRow
              row={row}
              key={i}
              index={i}
              onClick={(value) => this.hexClick(value)}
            >
            </HexRow>
          ))
        }
      </div>
    )
  }
}

export default App;
