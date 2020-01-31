const React = require('react')
// const DefaultLayout = require('../layouts/defaultlayout')

class Scores extends React.Component {
  render () {
    const scorelist = this.props.scores.map((element) => {
      <li>{element.name} - {element.score}</li>
    })
    return (
      <div>
        <div className="row">
        <h2 id='Scores'>Scores</h2>
        <ul>
          {scorelist}
        </ul>
        </div>
      </div>
    )
  }
}

module.exports = Scores
