const React = require('react')
// const DefaultLayout = require('../layouts/defaultlayout')

class Scores extends React.Component {
  render () {
    const scorelist = this.props.scores.map((element) => {
      return(<tr><th scope='row'>{element.name}</th><td>{element.score}</td></tr>)
    })
    return (
      <div>
        <div className="row">
        <h1 id='Scores'>Scores</h1>
        </div>
        <div>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Score</th>
              </tr>
            </thead>
            <tbody>
            {scorelist}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

module.exports = Scores
