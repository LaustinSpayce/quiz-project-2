const React = require('react')
// const DefaultLayout = require('../layouts/defaultlayout')

class Scores extends React.Component {
  render () {

    return (
      <div>
        <div className="row">
        <h2 id='Scores'>Please Wait {this.props.name}</h2>
        </div>
      </div>
    )
  }
}

module.exports = Scores
