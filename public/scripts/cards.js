let cardStore

// Custom data structure, corosponds to projects.json
class card{
    constructor(projectName, tags, text, image, url){
        this.name = projectName
        this.tags = tags
        this.text = text
        this.image = image
        this.url = url
    }
}

/**
 * Creates a list of cards from a json projects file
 * @param {string} json File path for json
 * 
 * @returns {card[]} list of all projects
 */
async function createCards(json){
    //Gets json file
    let response = await fetch(json)
    //Gets as json
    let rJson = await response.json();
    //Finds amount of projects
    let rJsonL = rJson.projects.length
    
    let cards = new Array()
    //For every project, it creates a card data type and pushes it to the array
    for(let i = 0; i < rJsonL; i++){
        cards.push(new card(rJson.projects[i].name,rJson.projects[i].tags,rJson.projects[i].disc,rJson.projects[i].img, ""))
    }
    //Returns that array of cards
    return cards

}


/**
 * Returns card[3] randomly from an array of card()
 * @param {card[]} cards Full list of cards
 * 
 * @return {card[3]} Random card information
 */
function getRandomCards(cards){
    //New list for cards is made to remove items
    let cardlist = cards
    //Selected list is defined for return value
    let selected = []
    //3 times select a random card, added it to selected, and remove it from the list copy
    for(let i = 0; i < 3; i++){
        x = Math.floor(Math.random() * cardlist.length)
        selected.push(cardlist[x])
        cardlist.splice(x, 1)
    }
    return(selected)
    
    
}
/**
 * Displays inputed card data onto the page
 * 
 * @param {card[3]} l  List of 3 cards to be displayed
 */
function displayRandomCards(l){
    //For 3 cards (kinda a second check to make sure only 3 are done, certainly could do by length on l)
    for(let i = 0; i < 3; i++){
        //HTML ids follow pattern "c{card number from 0-2}{i for image, h for header/name, p for paragraph/text}"
        //first the card number of concatinated as c
        let c = `c${i}`
        //that cards info is stored as info
        let info = l[i]
        //the html is accessed through jquery to set the attributes
        $(`#${c}i`).attr("src", info.image)
        $(`#${c}h`).html(info.name)
        $(`#${c}t`).html(info.tags)
        $(`#${c}p`).html(info.text)
    }
}



async function getCard(number){
    try{
        return cardStore[number]
    }
    catch{
        console.error("OUT OF RANGE")
    }
}



async function main(){
    cardStore =  createCards("../other/projects.json")
    displayRandomCards(getRandomCards(await createCards("../other/projects.json")))
}



main()

//Event listener for randomise button on index.html
$("#rand").click(main)