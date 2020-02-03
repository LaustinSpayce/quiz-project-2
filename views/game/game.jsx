const React = require('react')
const DefaultLayout = require('../layouts/defaultlayout')

class Game extends React.Component {
  render () {

    let bossTools = <div></div>

    if (this.props.boss) {
      bossTools = (<div id="debuggingTools">
        <button className="btn btn-primary" id="advanceGameState">Advance to next game state</button>
        <button className="btn btn-danger" id="resetGame">Reset The Game</button>
      </div>)
    }
    return (
      <DefaultLayout>
        <div id="displayContent">
        </div>
        <hr />
        {bossTools}
        <script src='/quizscript.js' />
      </DefaultLayout>
    )
  }
}

module.exports = Game
