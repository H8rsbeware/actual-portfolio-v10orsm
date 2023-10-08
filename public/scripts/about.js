/**
 * DROP DOWN SCRIPT FOR ABOUT.HTML
 */



var swap = true;


//Event listener for drop down
$(document).on('click', '#drop-btn', () => {
    toggle();
})

//Toggles between visible + displayed and hidden + not displayed
function toggle(){
    if(swap){
        $('.Adropdown').css({"visibility": "hidden", "display" : "none"});
        //Changes to be downward icon and show text
        $('#drop-btn').html('See Journey <br><i class="fa-solid fa-chevron-down chevron"></i>');
        swap = false;
        
    }else{
        $('.Adropdown').css({"visibility": "visible", "display" : "block"});
        //Changes the icon to be up right and hide text
        $('#drop-btn').html('Hide Journey <br><i class="fa-solid fa-chevron-up chevron"></i>');
        $('.dropbox').height("auto")
        swap = true;
    }
}

toggle();
