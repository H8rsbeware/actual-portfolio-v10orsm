
//Scraps my account data (since ubiservices api is even more painful to work with)
module.exports = ()=>{
    //https promise handler
    const axios = require('axios');
    //node jquery equivilent 
    const cheerio = require('cheerio');
    //file path parser
    const path = require('path');
    //file system manager
    const fs = require('fs')

    const storePath = path.join(__dirname, "../../other")

    const getStats  = async ()=>{
        try{
            //Aquires sites html
            const {data} = await axios.get(
                'https://r6.tracker.network/profile/id/50b666ab-774a-4e52-925e-be189fb921e1/', {headers: { "Accept-Encoding": "gzip,deflate,compress" }}
            );
            //Loads to jquery equivelent 
            const $ = cheerio.load(data);
            
            //Return dictonary
            let stats = {
                "kills":"",
                "wins":"",
                "pWin":"",
                "kd":"",
                "mmr":""
            };

            //Work around for r6 tracker networks lack of IDs (i assume to stop this)
            let temp = [];

            //Class of stats in HTML DOM 
            const statContainters = $('div.trn-defstat.trn-defstat--large');
            //body.trn-site.trn-site--small-header > div.trn-site__container > div#profile.trn-profile > div.trn-scont.trn-scont--swap > div.trn-scont__content > div.trn-scont__content.trn-card > div.trn-card__content > div.trn-defstats.trn-defstats--width4 > 

            //For each sub element of any instance of the class
            statContainters.each((_index, element)=>{
                //Find the name and value of the stats
                let name = $(element).find('div.trn-defstat__name').text();
                let val = $(element).find('div.trn-defstat__value').text();
                //Removes the white space
                val = val.trim();
                //Gets rid of the bs, parsing out what i actually want
                if(name == "Wins")
                {
                    temp.push(["wins", val]);
                };
                if(name == "Win %")
                {
                    temp.push(["win %", val]);
                };
                if(name == "Kills")
                {
                    temp.push(["kills", val]);
                };
                if(name == "KD")
                {
                    temp.push(["KD", val]);
                };
            });

            let mmrTemp = []

            const mmr = $('div.trn-defstat__data').find('div.trn-defstat__value-stylized').each((__index, element) =>{
                val = $(element).text().trim();
                mmrTemp.push(val);
            })

            //Gets the bits from temp i actually want
            stats.wins  = temp[0][1];
            stats.pWin  = temp[1][1];
            stats.kills = temp[2][1];
            stats.kd    = temp[3][1];
            stats.mmr   = mmrTemp[0];
            //Creates a json object and returns
            const jsonStats = {"stats": [stats]}
            return jsonStats;

        }catch(err){
            throw err;
        };
    };

    /**
     * Writes stats to json file, to be used by other files.
     * @param {json} object 
     */
    function writeStats(object){
        //Json -> String
        json = JSON.stringify(object)
        //Writes to ../../public/other/stats.json
        fs.writeFile(path.join(storePath , "/stats.json"), json, 'utf-8', (err) => {
            if(err) throw err;
        })
    };


    getStats()
    //with the return from get stats, write it to the file. (throw wont let the execute.)
        .then((res) => {
            writeStats(res)
        });

};

