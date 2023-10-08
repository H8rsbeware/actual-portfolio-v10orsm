class blog_card{
    constructor(image, title, date, description, link){
        this.image = image;
        this.title = title;
        this.date = date;
        this.description = description;
        this.link = this.check_link_text(link);
    };

    check_link_text(button){
        try{
            var text = button.text; 
            var link = button.link;
            return button;
        }
        catch{
            console.error("link isnt contained within blog command");
            return({text: button, link: "#"});
        }
        
    }

    card_build() {
        return card = (`    
        <div class="blogPreview">
            <div class="blogPrevTitle">
                ${this.date} | ${this.title}
            </div>
            <hr>
            <div class="blogPrevSynapse">
                ${this.description} <a class="blogPrevSynapseLink src="${this.link.link}">${this.link.text}</a>
            </div>
        </div>
        <br>
        `);
    }
}

function create_blog_cards(){
    var image_url = "https://placeholder.pics/svg/800/DEDEDE/555555/project%20card";
    var description = "A short blog description that talks about some shitty take i made 2 years ago, if you want to see more "
    return new blog_card(image_url, "A blog article", "11 Sept", description, {text:"click here", link:"#"})
}

function main(){
    var cards = (`<div style="padding-top:8px">`);
    for(var x = 0; x < 5; x++){
        card = create_blog_cards().card_build();
        cards += card;
    }
    cards += `</div>`
    $(`#BlogColumn`).html(cards);
}
main();