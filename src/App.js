import React from 'react';
import HexRow from './HexRow'
import Buffer from './Buffer'
import './App.css';

class App extends React.Component {
  state = this.initialState()

  initialState() {
    return {
      board: this.generate_board(),
      highlightRow: 0,
      highlightCol: null,
      buffer: []
    }
  }

  reset() {
    this.setState(this.initialState())
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
    const buffer = this.state.buffer.slice();
    let highlightRow = this.state.highlightRow;
    let highlightCol = this.state.highlightCol;

    buffer.push(board[row][col]);
    board[row][col] = null;

    if (this.state.highlightRow != null) {
      highlightRow = null;
      highlightCol = col;
    } else {
      highlightRow = row;
      highlightCol = null;
    }

    if (buffer.length === 7) {
      this.reset();
    } else {
      this.setState({
        board,
        highlightRow,
        highlightCol,
        buffer
      })
    }
  }

  render() {
    return (
      <div className="App">
        <table>
          <tbody>
            {
              this.state.board.map((hexValues, i) => (
                <HexRow
                  hexValues={hexValues}
                  key={i}
                  row={i}
                  onClick={(row, col) => this.hexClick(row, col)}
                  highlightRow={this.state.highlightRow}
                  highlightCol={this.state.highlightCol}
                  >
                </HexRow>
              ))
            }
          </tbody>
        </table>
        <Buffer
          buffer={this.state.buffer}
          size={6}
        >
        </Buffer>
      </div>
    )
  }
}

export default App;
