# Project Post Mortem

#### Approach and Process

1. What in my process and approach to this project would I do differently next time?
  - Better planning! I felt like I jumped in too quickly with something too complicated and no firm idea on how it would all be strung together.
  - Particularly, having too many tables for questions <-> players <-> answers <-> games, which were not needed to keep the app simple.

1. What in my process and approach to this project went well that I would repeat next time?
  - Testing very early, deploying on Heroku let me work out some bugs that would be a real pain to deal with at a late stage.
  - Using 'dummy functions' - if I needed an extra step in a process, but not written a function for it yet, can just have a dummy function that returns my expected result as a stop-gap and get on with what's important for the app.

--

#### Code and Code Design

1. What in my code and program design in the project would I do differently next time?
  - Not start off with overcomplicated 3 models, 3 controllers etc. Keep it simple with 1 (as I boiled down to)
  - Remove code that is redundant, I should refactor a fair amount of it to remove functions I never use.
  ```
        const startQuestionTimer = () => {
          console.log('Question stops receiving answers in ' + ROUND_TIMER)
        }
        // Never had a question timer implemented!
        ```

1. What in my code and program design in the project went well? Is there anything I would do the same next time?
  - After a while, keeping all my functions down to "do 1 thing" helped a lot, can keep passing callbacks through each step. EG get player scores:
  ```
        const getScores = (gameID, callback) => {
          const queryString = 'SELECT * FROM player WHERE game_id = $1;'
          const queryValues = [gameID]
          dbPoolInstance.query(queryString, queryValues, (error, queryResult) => {
            if (error) {
              callback(error, null)
            } else {
              if (queryResult.rows.length > 0) {
                callback(null, queryResult.rows)
              } else {
                callback(null, null)
              }
            }
          })
        }
        ```

  For each, please include code examples.
  1. Code snippet up to 20 lines.
  2. Code design documents or architecture drawings / diagrams.

#### WDI Unit 2 Post Mortem
1. What habits did I use during this unit that helped me?
  - Trying to keep things DRY, MVC
2. What habits did I have during this unit that I can improve on?
  - Organisation, preparation before coding/pseudocode
3. How is the overall level of the course during this unit? (instruction, course materials, etc.)
  - Feels OK
