const React = require('react')
// const DefaultLayout = require('../layouts/defaultlayout')

class Scores extends React.Component {
  render () {
    const scorelist = this.props.scores.map((element) => {
      let tableclass = ""
      if (element.name === this.props.playerName) {
        tableclass = 'table-info'
      }
      return(<tr className={tableclass}><th scope='row'>{element.name}</th><td>{element.score}</td></tr>)
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
