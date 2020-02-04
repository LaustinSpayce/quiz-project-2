const React = require('react')
const DefaultLayout = require('../layouts/defaultlayout')

class Game extends React.Component {
  render () {

    let bossTools = <div></div>

    if (this.props.boss) {
      bossTools = (<div id="debuggingTools" className='row'>
      <div className='col-md-6'>
        <button className="btn btn-primary" id="advanceGameState" width='100%'>Advance to next game state</button>
      </div>
      <div className='col-md-6'>
        <button className="btn btn-danger" id="resetGame" width='100%'>Reset The Game</button>
        </div>
      </div>)
    }
    return (
      <DefaultLayout>
        <div id="displayContent">
        </div>
        <hr />
        {bossTools}
        Tell your friends to join the game at {this.props.ipAddress}
        <script src='/quizscript.js' />
      </DefaultLayout>
    )
  }
}

module.exports = Game
