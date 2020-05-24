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
    if (this.isComplete()) {
      alert('Data Recieved')
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
        hexValues[this.randomIndex()]
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
    return [
      board[this.randomIndex()][this.randomIndex()],
      board[this.randomIndex()][this.randomIndex()]
    ]
  }

  hexClick(row, col) {
    const board = this.state.board.slice();
    const buffer = this.state.buffer.slice();
    const selection = board[row][col];
    const [highlightRow, highlightCol] = this.refreshHighlights(row, col)
    let primaryObjectiveProgress = this.updatePrimaryObjectiveProgress(selection)

    buffer.push(selection);
    board[row][col] = null;

    this.setState({
      board, highlightRow, highlightCol, buffer, primaryObjectiveProgress
    })
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
    const currentGoal = this.state.primaryObjective[
      this.state.primaryObjectiveProgress.length
    ];

    if (selection === currentGoal) {
      primaryObjectiveProgress.push(selection)
    }
    else if(selection !== this.state.primaryObjective[0]) {
      primaryObjectiveProgress = []
    }

    return primaryObjectiveProgress
  }

  randomIndex() {
    return Math.floor(Math.random() * 5)
  }

  isComplete() {
    return this.state.primaryObjectiveProgress.length ===
      this.state.primaryObjective.length
  }

  render() {
    return (
      <div>
        <div className='background'>
          <video autoPlay muted loop className='video'>
            <source src="background_hd.mp4" type="video/mp4"/>
          </video>
        </div>
        <div className="App">
          <div className="board">
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
        </div>
      </div>
    )
  }
}

export default App;
