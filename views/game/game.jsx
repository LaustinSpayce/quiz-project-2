const React = require('react')
const DefaultLayout = require('../layouts/defaultlayout')

class Game extends React.Component {
  render () {
    return (
      <DefaultLayout>
        <div id="displayContent">
        </div>
        <script src='/quizscript.js' />
      </DefaultLayout>
    )
  }
}

module.exports = Game
