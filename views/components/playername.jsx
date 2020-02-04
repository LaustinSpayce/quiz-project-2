const React = require('react')

class DefaultLayout extends React.Component {
  render () {

    const actionURL = '/game/' + this.props.gameID + '/play'
    return (
      <form action={actionURL} method='POST' className='w-100'>
        <hr/>
        <p><input className="form-control form-control-lg" type="text" placeholder="Please enter your name" name='name' required/></p>
        <input className="btn btn-primary" type="submit"/>
      </form>
    )
  }
}

module.exports = DefaultLayout
