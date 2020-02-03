const React = require('react')
const DefaultLayout = require('./layouts/defaultlayout')

class CreateNewGame extends React.Component {
  render () {
    return (
      <DefaultLayout>
      <div>
        <div className="row">
          <form method='POST' action='/game/' >
            <div className='form-group'>
              <label htmlFor='name'>Game Name</label>
              <input type='text' className='form-control' id='name' name='name' required/>
            </div>
            <div className='form-group'>
              <label htmlFor='noOfQuestions'>No. of Questions</label>
              <input type='number' className='form-control' id='noOfQuestions' name='noOfQuestions' defaultValue="10" required/>
            </div>
              <input type='submit' className='btn btn-primary' id='submit' name='submit'/>
          </form>
        </div>
      </div>
    </DefaultLayout>
    )
  }
}

module.exports = CreateNewGame
