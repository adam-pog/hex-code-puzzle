import React from 'react';
import HexRow from './HexRow'
import Buffer from './Buffer'
import Objective from './Objective'
import './App.css';

class App extends React.Component {
  state = this.initialState()

  initialState() {
    const board = this.generateBoard();
    const primary = this.generatePrimaryObjective(board);

    return {
      board: board,
      highlightRow: 0,
      highlightCol: null,
      buffer: [],
      primaryObjective: primary,
      primaryObjectiveProgress: []
    }
  }

  componentDidUpdate() {
    if (this.state.primaryObjectiveProgress.length === this.state.primaryObjective.length) {
      console.log('Data retrieved')
    } else {
      console.log(this.state.primaryObjectiveProgress)
    }
  }

  reset() {
    this.setState(this.initialState())
  }

  generateBoard() {
    let hexValues = Array(5).fill().map(() => this.randomHex())

    return Array(5).fill().map(() =>
      Array(5).fill().map(() =>
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

  generatePrimaryObjective(board) {
    let row1 = Math.floor(Math.random() * 5)
    let col1 = Math.floor(Math.random() * 5)
    let row2 = Math.floor(Math.random() * 5)
    let col2 = Math.floor(Math.random() * 5)

    return [board[row1][col1], board[row2][col2]]
  }

  hexClick(row, col) {
    const board = this.state.board.slice();
    const buffer = this.state.buffer.slice();
    const selection = board[row][col];
    const [highlightRow, highlightCol] = this.refreshHighlights(row, col)
    let primaryObjectiveProgress = this.updatePrimaryObjectiveProgress(selection)

    buffer.push(selection);
    board[row][col] = null;

    if (buffer.length === 7) {
      this.reset();
    } else {
      this.setState({
        board,
        highlightRow,
        highlightCol,
        buffer,
        primaryObjectiveProgress
      })
    }
  }

  refreshHighlights(row, col) {
    if (this.state.highlightRow != null) {
      return [null, col]
    } else {
      return [row, null]
    }
  }


  updatePrimaryObjectiveProgress(selection) {
    let primaryObjectiveProgress = this.state.primaryObjectiveProgress.slice()
    const currentGoal = primaryObjectiveProgress.slice(-1)

    if (primaryObjectiveProgress.length === this.state.primaryObjective.length) {
      return primaryObjectiveProgress
    }
    else if (selection === this.currentPrimaryObjectiveGoal()) {
      primaryObjectiveProgress.push(selection)
    }
    else if(selection !== this.state.primaryObjective[0]) {
      primaryObjectiveProgress = []
    }

    return primaryObjectiveProgress
  }

  currentPrimaryObjectiveGoal() {
    return this.state.primaryObjective[this.state.primaryObjectiveProgress.length];
  }

  render() {
    return (
      <div className="App">
        <div className='primaryObjective'>
          <Objective
            objective={this.state.primaryObjective}
            progress={this.state.primaryObjectiveProgress}
            >
          </Objective>
        </div>

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
