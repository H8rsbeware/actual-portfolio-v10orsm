const moon_icon = `<i class="fa-solid fa-moon"></i>`;
const sun_icon  = `<i class="fa-solid fa-sun "></i>`;



var swap_flag = false;

function toggle_theme(){

    if(swap_flag == true){
        $("#theme-toggle").html = moon_icon;
    }else{
        $("#theme-toggle").html = sun_icon;
    }
    swap_flag = !swap_flag;
}


$(document).on('click', '#theme-toggle', () => {
   toggle_theme();
})