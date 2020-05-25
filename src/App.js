import React from 'react';
import HexRow from './HexRow/HexRow'
import Buffer from './Buffer'
import Objective from './Objective/Objective'
import Particles from 'react-particles-js';
import config from './config'
import './App.scss';

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
      primaryObjectiveProgress: [],
      success: false,
      failure: false
    }
  }

  componentDidUpdate() {
    if (this.isComplete()) {
      console.log('Data Recieved')
    } else {
      console.log(this.state.primaryObjectiveProgress)
    }
  }

  reset() {
    this.setState(this.initialState())
  }

  generateBoard() {
    let hexValues = Array(config.rows).fill().map(() => this.randomHex())

    return Array(config.rows).fill().map(() =>
      Array(config.columns).fill().map(() =>
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
    let index = this.randomIndex()
    // use the same column index twice to guarantee the main objective
    // is achievable
    return [
      board[this.randomIndex()][index],
      board[this.randomIndex()][index]
    ]
  }

  hexClick(row, col) {
    const board = this.state.board.slice();
    const buffer = this.state.buffer.slice();
    const selection = board[row][col];
    const [highlightRow, highlightCol] = this.refreshHighlights(row, col)
    let primaryObjectiveProgress = this.updatePrimaryObjectiveProgress(selection)

    buffer.push(selection);
    board[row][col] = config.selectedChar;

    this.setState({
      board, highlightRow, highlightCol, buffer, primaryObjectiveProgress,
      success: primaryObjectiveProgress.length ===
        this.state.primaryObjective.length
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
          <Particles params={
            {
              particles: {
                number: {
                  value: 75,
                  density: {
                    enable: true
                  }
                },
                color: {
                  value: '#ffffff'
                },
                line_linked: {
                  color: '#3bc702',
                  width: 2
                }
              }
            }
          }/>
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

            <table className={'table onBoot ' + (this.state.success ? 'terminate' : '')}>
              <tbody>
                {
                  this.state.board.map((hexValues, i) => (
                    <HexRow
                      hexValues={hexValues}
                      key={i}
                      row={i}
                      onClick={
                        this.state.success ?
                          null :
                          (row, col) => this.hexClick(row, col)
                      }
                      highlightRow={this.state.highlightRow}
                      highlightCol={this.state.highlightCol}
                      >
                    </HexRow>
                  ))
                }
              </tbody>
            </table>
            {
              this.state.success &&
              <h1 className='successText glitch' data-text="ACCESS GRANTED">
                ACCESS GRANTED
              </h1>
            }

            {
              this.state.success &&
              <h3 className='reboot reboot-glitch' onClick={() => this.reset()}>
                Reboot
              </h3>
            }

            <Buffer
              buffer={this.state.buffer}
              size={6}
              className={(this.state.success ? 'terminate-buffer' : '')}
            >
            </Buffer>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
