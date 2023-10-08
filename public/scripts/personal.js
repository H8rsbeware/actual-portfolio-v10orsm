

async function parseStats(jsonPath){

    let stats = {
        "kills":"",
        "wins":"",
        "pWin":"",
        "kd":"",
        "mmr":""
    };

    let res = await fetch(jsonPath);
    let resJson = await res.json();

    stats.kills = resJson.stats[0].kills;
    stats.wins = resJson.stats[0].wins;
    stats.pWin = resJson.stats[0].pWin;
    stats.kd = resJson.stats[0].kd;
    stats.mmr = resJson.stats[0].mmr;

    return stats;
}

function fillStats(stats){
    for (const [key, value] of Object.entries(stats)) {
        $(`#${key}`).html(value)    
    }
}


async function main(){
    fillStats(await parseStats('../other/stats.json'))
}

main()