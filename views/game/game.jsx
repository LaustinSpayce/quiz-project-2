const React = require('react')
const DefaultLayout = require('../layouts/defaultlayout')

class Game extends React.Component {
  render () {
    return (
      <DefaultLayout>
        <div id="DisplayContent">
        </div>
      </DefaultLayout>
    )
  }
}

module.exports = Game
