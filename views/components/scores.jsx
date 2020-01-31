const React = require('react')
// const DefaultLayout = require('../layouts/defaultlayout')

class Scores extends React.Component {
  render () {
    const scorelist = this.props.scores.map((element) => {
      return(<li>{element.name} - {element.score}</li>)
    })
    return (
      <div>
        <div className="row">
        <h2 id='Scores'>Scores</h2>
        </div>
        <div>
          <ul>
            {scorelist}
          </ul>
        </div>
      </div>
    )
  }
}

module.exports = Scores
