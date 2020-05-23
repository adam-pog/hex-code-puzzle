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

  hexClick(row, col) {
    const board = this.state.board.slice();
    board[row][col] = '\u2022'

    this.setState({
      board: board
    })
  }

  render() {
    return (
      <div className="App">
        {
          this.state.board.map((hexValues, i) => (
            <HexRow
              hexValues={hexValues}
              key={i}
              row={i}
              onClick={(row, col) => this.hexClick(row, col)}
            >
            </HexRow>
          ))
        }
      </div>
    )
  }
}

export default App;
