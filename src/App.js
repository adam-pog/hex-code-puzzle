import React from 'react';
import HexRow from './HexRow/HexRow'
import Buffer from './Buffer/Buffer'
import Objective from './Objective/Objective'
import Particles from 'react-particles-js';
import config from './config'
import Subroutines from './Subroutines/Subroutines'
import MediaQuery from 'react-responsive'
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
      subroutines: this.generateSubroutines(board),
      subroutinesProgress: [[], [], [], []],
      success: false,
      failure: false
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
    let availableIndices = Array(config.rows).fill().map((_, i) => (i))
    const column = this.randomIndex()
    const row1 = this.randomIndex()

    // make sure the same row is not selected to ensure the main objective is
    // achievable
    availableIndices = availableIndices.filter((n,_) => ( n !== row1 ))
    const row2 = availableIndices[
      Math.floor(Math.random() * availableIndices.length)
    ]

    // use the same column index twice to guarantee the main objective
    // is achievable
    return [
      board[row1][column],
      board[row2][column]
    ]
  }

  generateSubroutines(board) {
    return Array(4).fill().map(() => {
      let subroutineLength = Math.ceil(Math.random() * 3) + 1

      return Array(subroutineLength).fill().map(() => (
        board[this.randomIndex()][this.randomIndex()]
      ))
    })
  }

  hexClick(row, col) {
    const board = this.state.board.slice();
    const buffer = this.state.buffer.slice();
    const selection = board[row][col];
    const [highlightRow, highlightCol] = this.refreshHighlights(row, col)
    let primaryObjectiveProgress = this.calcObjectiveProgress(
      selection,
      this.state.primaryObjectiveProgress,
      this.state.primaryObjective
    )

    let success = primaryObjectiveProgress.length ===
      this.state.primaryObjective.length

    buffer.push(selection);
    board[row][col] = config.selectedChar;

    this.setState({
      board, highlightRow, highlightCol, buffer, primaryObjectiveProgress,
      success,
      failure: !success && buffer.length === config.bufferLength,
      subroutinesProgress: this.calcSubroutineProgress(selection)
    })
  }

  refreshHighlights(row, col) {
    if (this.state.highlightRow != null) {
      return [null, col]
    } else {
      return [row, null]
    }
  }


  calcObjectiveProgress(selection, progress, objective) {
    let primaryObjectiveProgress = progress.slice()
    const currentGoal = objective[primaryObjectiveProgress.length];

    if (selection === currentGoal) {
      primaryObjectiveProgress.push(selection)
    }
    else if(selection !== objective[0] && progress.length !== objective.length) {
      primaryObjectiveProgress = []
    }

    return primaryObjectiveProgress
  }

  calcSubroutineProgress(selection) {
    return this.state.subroutinesProgress.map((subroutine, i) => (
      this.calcObjectiveProgress(
        selection,
        subroutine,
        this.state.subroutines[i]
      )
    ))
  }

  randomIndex() {
    return Math.floor(Math.random() * config.rows)
  }

  terminate() {
    return this.state.success || this.state.failure
  }

  render() {
    return (
      <div className="App">
        <Particles params={
          {
            particles: {
              number: {
                value: 10,
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
        <div className='centralRow'>
          <div className='centralContainer'>
            <div className='objectiveRow'>
              <Objective
                objective={this.state.primaryObjective}
                progress={this.state.primaryObjectiveProgress}
                failed={this.state.failure}
                success={this.state.success}
              />

            <MediaQuery maxWidth={590} >
                <Subroutines
                  className='subroutineObjectives'
                  subroutines={this.state.subroutines}
                  subroutinesProgress={this.state.subroutinesProgress}
                  terminate={this.terminate()}
                />
              </MediaQuery>
            </div>

            <div className='centralColumn'>
              <div className="board">
                <table className={'table onBoot ' + (this.terminate() ? 'terminate' : '')}>
                  <tbody>
                    {
                      this.state.board.map((hexValues, i) => (
                        <HexRow
                          hexValues={hexValues}
                          key={i}
                          row={i}
                          onClick={
                            this.terminate() ?
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
                  <h1 className='successText glitch terminateText' data-text="ACCESS GRANTED">
                    ACCESS GRANTED
                  </h1>
                }

                {
                  this.state.failure &&
                  <h1 className='failureText glitch terminateText' data-text="ACCESS DENIED">
                    ACCESS DENIED
                  </h1>
                }

                {
                  this.terminate() &&
                  <h3 className='reboot' onClick={() => this.reset()}>
                    Reboot
                  </h3>
                }
              </div>

              <Buffer
                buffer={this.state.buffer}
                bufferLength={config.bufferLength}
                className={
                  'app-buffer ' + (this.terminate() ? 'terminate-buffer' : '')
                }
                />
            </div>
          </div>
          <MediaQuery minWidth={590} >
            <div className='objectiveColumn'>
              <Subroutines
                className='subroutineObjectives'
                subroutines={this.state.subroutines}
                subroutinesProgress={this.state.subroutinesProgress}
                terminate={this.terminate()}
                />
            </div>
          </MediaQuery>
        </div>
      </div>
    )
  }
}

export default App;
