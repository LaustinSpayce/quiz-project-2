module.exports = (db) => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  const displayQuestion = (request, response) => {
    const questionID = request.params.id
    db.question.getQuestion(questionID, (error, question) => {
      if (error) {
        console.log('Error!')
        console.log(error)
      }

      const data = {
        question: question.question,
        answer_1: question.answer_1,
        answer_2: question.answer_2,
        answer_3: question.answer_3,
        answer_4: question.answer_4
      }

      response.render('question/question', data)
    })
  }

  const submitAnswer = (request, response) => {
    const answerID = request.body.answerID
    console.log('answer submitted', answerID)
    const data = {
      cucumber: 'bacon',
      rice: 'mango'
    }
    const myData = JSON.stringify(data)
    console.log(myData)
    response.send(myData)
  }

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    displayQuestion: displayQuestion,
    submitAnswer: submitAnswer
  }
}
