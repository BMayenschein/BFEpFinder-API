const Episode = require('../models/Episode')

module.exports = {
    findEpisodes: async (req,res)=>{
        if (req.body.transcript == "") {
            return
        }

        try {
        let searchTerm = req.body.transcript
        // const episodes = await Episode.find(
        //     {"transcript.text": new RegExp(searchTerm, "i")})

        const episodes = await Episode.find(
            { transcript: { $elemMatch: { text: new RegExp(searchTerm, "i")}}}
        )
        
        let searchResults = []
        episodes.forEach(ep => {
            let allText = ep.transcript;
            const foundAt = allText.filter(x => x.text.includes(searchTerm))
            if (foundAt.length == 0) {
                return
            }
            let startAt = Math.trunc(foundAt[0].start);
            if (startAt > 5) {
                startAt = startAt - 5;
            }
            searchResults.push({'title': ep.title, 'video_id': ep.video_id, 'startAt': startAt})
        })

        res.send(searchResults)
        }
        catch(err) {
            console.log(err)
        }
    },

    test: (req,res) => {
        console.log('testing');
        res.send('it worked')
    }
}