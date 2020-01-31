const React = require('react')

class DefaultLayout extends React.Component {
  render () {
    return (
      <form action='./play' method='POST'>
        <hr/>
        <p><input className="form-control form-control-lg" type="text" placeholder="Please enter your name" name='name' required/></p>
        <input className="btn btn-primary" type="submit"/>
      </form>
    )
  }
}

module.exports = DefaultLayout
