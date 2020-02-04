### Overview

Stu's Trivia Night is a quiz-taking app meant to be taken by multiple people at the same time, ideally in a classroom setting.

## Gameplay

The quiz-master creates a game, other players can join the game with the link provided. After joining the game and inputting names, the quiz-master can select to progress through the questions.

10 questions are coded in and can support more. At the end of the 10 questions, a table of the participants score is displayed. And their answer history is also displayed.

## Technologies Used

node, express, cookies, react, AJAX requests.

Basically I wanted an app that would update the questions displayed to the players without needing to reload the page. Using a technique of 'long polling' with AJAX requests on a setInterval allowed the 'game-display' to be updated with the questions and scores while people are taking the quiz.

There can be issues if the server takes a long time to respond, or users click throught the questions very quickly (as the polling is only once a second)
