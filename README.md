This is a browser tic-tac-toe game that allows the user to sign-up, sign-in, change password, sign-out, and play the game. The game is setup so that two players on one computer can take turns making moves, alternating x's and o's. Game information and login information is stored in an API.

I started this project with wireframes and user stories to set goals for the game. Then I created the game logic with javascript. Once the game worked, I added sign-up, sign-in, change-password, and sing-out functionality using the API provided to me by General Assembly. Then I set up functionality that posted an empty game object to the API when a new game started. Each move patches the game data with the index of the clicked square, its contents ('x' or 'o'), and a boolean for whether the game is over. When a game is finished a function indexes all the games posted to the api and displays the number of games played below the tic-tac-toe board.

I ran into a few problems with patching the API after each move because the ajax requests were happening asynchronously. To solve this, I used .then after the API functions to determine what I wanted to happen after the success of the API request. I utilized stack overflow to learn about many css features such as making elements fade away after a set amount of time. I used this for the repsonse messages that occur after the success or failure of changing the password. I also utilized the bootstrap documentation regarding the use of modals for the change password button.

On future iterations I would like to stylize the page more and add AI to play against. I would also modify the game logic to reflect the api game data. I would use an array with indexes that correspond to the squares of the gameboard. Then I could use the function that checks for a win to check who won any game retrieved from the api data. That way I could display more statics rather than simply the number of games played.

I stylized the project using google fonts and bootstrap. Bootstrap was used to create a modal for the change-password button and for the grid layout of the gameboard.

Technologies used:
html
css
javascript
Bootstrap
jquery
ajax
json

User stories:
"As a hiring mangaer for a tech company, I want to see a user-friendly, visually appealing, and functional game."
"As an avid gamer, I want to be able to play against a difficult opponent."
"As a mobile phone user, I want to be able to play the game on my phone."
"As a child, I want to be able to know what to do."
"As a senior citizen, I want to be able to see what I'm doing."
"As a mother of 12 boys and 9 girls, I want to be engrossed in an experience that will make me forget about the unbearable responsibility of raising my children."

Wireframes:
https://imgur.com/gallery/di1X1rX
https://imgur.com/gallery/XtS8QDl
