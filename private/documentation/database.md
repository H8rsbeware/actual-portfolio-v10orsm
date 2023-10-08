# DATABASE

### Setup
- My database is built on JSON in a noSQL format
- Contains projects object, which contains many identical, non-nested, objects.
- Its static, not being updated in code at anypoint, exclusively being read from to fill site content

### Contents
Each instance of project contains 4 attributes:
- name - Name of the project
- disc - A short discription of the project, including type, language, and idea
- img - A gif/image of the project in its complete/current form
- url - A link to where the source code can be found


### Use in code
2 scripts use this file, cards.js and projects.js


##### Cards.js
The cards script is responsible for the random cards on the home page, filling in the content of premade html cards.

It contains a card class, that acts as a data type holding the JSON parsed from the database.

It also contains 3 functions

- createCards - discussed more below, but self explaintory
- getRandomCards - gets 3 random cards from a list of `card` objects and returns them as an array
- displayRandomCards - uses jquery to access the html card templates and add the required information from the 3 random `card` objects



##### Projects.js
Within projects, the script is used to generate the list of cards from the file, with the key difference being the absence of any html in the `projects.html` file itself. While not the fastest approach, it allows me to change the content upon interaction, and only update the database to change the page. 

It also contains a class `card`, used for holding the json information in an object, but with an additional method called `buildTemplate` which creates the HTML for each card when called

It contains 2 main functions
- createCards - a repeated function that creates a list of cards (using the `card` class) from the file
- createList - gos through the `card` list and adds them to the page in rows of 3

