const React = require('react')
const DefaultLayout = require('./layouts/defaultlayout')

class GamesIndex extends React.Component {
  render () {
    const gameCards = this.props.games.map(game => {
      const joinURL = '/game/' + game.id + '/play'
      return (
        <div className='card mb-3'>
          <div className='card-body'>
            <h5 className='card-title'>{game.name}</h5>
            <p><strong>Number of questions:</strong> {game.number_of_questions}</p>
            <a href={joinURL} className="btn btn-primary">Join this game</a>
          </div>
        </div>
      )
    })

    let optionalMessage = <div></div>
    console.log('the message:')
    console.log(this.props.message)

    if (this.props.message) {
      optionalMessage =  (
        <div className='alert alert-success' role='alert'>
          <h4>Success!</h4>
          <p>{this.props.message}</p>
        </div> )
      }

    return (
      <DefaultLayout>
        {optionalMessage}
        <div className='text-center'>
        <h3>Welcome to Stu's Pub Quiz</h3>
        <h4>Please choose a game below</h4>
        <a className='btn btn-primary' href='/game/new'>Create New Game</a>
        <hr />
        </div>
        {gameCards}
      </DefaultLayout>
    )
  }
}

module.exports = GamesIndex
