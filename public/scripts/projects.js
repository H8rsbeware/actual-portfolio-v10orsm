
// Used as a custom datatype corrosponding to attributes in projects.json.
// Extended with a method to format info into html cards
class card{
    constructor(projectName, tags, text, image, url){
        this.name = projectName
        this.tags = tags
        this.text = text
        this.image = image
        this.url = url
    }
    buildTemplate(rowSize){


        var cardCon = (`
        <div class="card col-${rowSize}">
            <image src="${this.image}" class="card-img-top" alt="${this.name}">
            <div class="card-body">
                <h3 class="title-shadow">${this.name}<h3>
                <p class="card-tags">${this.tags}<p>
                <hr>
                <p class="card-text">${this.text}<p>
            </div>
        </div>
        
        `);
        return cardCon;
    }
}

// EXACT COPY OF CARDS.JS REPEAR CARDS - STOPS XSS
/**
 * Creates a list of cards from a json projects file
 * @param {string} json File path for json
 * 
 * @returns {card[]} list of all projects
 */
async function createCards(json){
    //Gets json file
    let response = await fetch(json);
    //Gets as json
    let rJson = await response.json();
    //Finds amount of projects
    let rJsonL = rJson.projects.length;
    
    let cards = new Array();
    //For every project, it creates a card data type and pushes it to the array
    for(let i = 0; i < rJsonL; i++){
        cards.push(new card(rJson.projects[i].name,rJson.projects[i].tags,rJson.projects[i].disc,rJson.projects[i].img, ""));
    }
    //Returns that array of cards
    return cards;

}


function screenToColumn(){
    let width = window.innerWidth;
    console.log(width)
    
    if(width > 2000){ return [4,2] };
    if(width > 1400){ return [3,3] };
    if(width > 900){ return [2,5]};
    if(width <= 900){ return [1,8] };
    console.log("defaulted");
    return [3,3];
}



/**
 * Builds rows of html cards from the parsed json data
 * @param {card[]} cardList 
 */
async function createHTML(cardList){
    //Start of container div
    let container = `<div class="projectcards row container-fluid">`;
    let cs = cardList;
    //Counter for column per row checks
    var i = 0;

    var screenReturn = screenToColumn();
    var columnPerRows = screenReturn[0];
    var columnWidth = screenReturn[1];
    // console.log(columnPerRows, columnWidth)

    //For each card in card list
    cs.forEach((c)=>{
        //if counter is evenly divisible by 3 (3 cards per row)
        if(i% columnPerRows == 0){
            //end current row and start a new one
            container += `</div>`;
            container += `<div class="projectcards row container-fluid">`;
        }
        //calls card method to get html format
        let temp = c.buildTemplate(columnWidth);
        //console.log(temp)
        //adds it to the rest of the html
        container += temp;
        i++;
    })
    //Adds that to the projects section in projects.html
    $("#project").html(container);
}


var prevScreenResult;

//var cards 
async function main(){
    //cards = await createCards("../other/projects.json")
    createHTML(await createCards("../other/projects.json"));
}

main();

$(window).on('resize', ()=>{
    buf = screenToColumn()
    if (buf != prevScreenResult){
        prevScreenResult = buf
        main()
    }
})