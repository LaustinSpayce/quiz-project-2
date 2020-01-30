const React = require('react')

class DefaultLayout extends React.Component {
  render () {
    return (
      <form action='' method='POST'>
        <input className="form-control form-control-lg" type="text" placeholder="Please enter your name" required>
      </form>
    )
  }
}

module.exports = DefaultLayout
