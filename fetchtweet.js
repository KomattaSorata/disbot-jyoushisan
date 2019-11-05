module.exports = () => {
    const Twitter = require('twitter');
    const fs = require('fs');
    const mibunshou = require('./env_conf.js');
    const client = new Twitter({
        consumer_key: mibunshou.tw_conkey,
        consumer_secret: mibunshou.tw_conkeysecret,
        access_token_key: mibunshou.tw_acctoken,
        access_token_secret: mibunshou.tw_acctokensecret
    });
    const params = {screen_name: 'komattasorata', count:200, exclude_replies: true, include_rts: false};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        let rescount = tweets.length;
        let i;
        for(i = 0; i < rescount; i++){
            let text = tweets[i].text;
            var handled = text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
            fs.writeFile('./src/mkgen_source/sorata.txt', `${handled} \r\n`, (err) => {
                if (err) throw err;
            });
        }
    });
    const params_josh = {screen_name: 'joshanska', count:200, exclude_replies: true, include_rts: false};
    client.get('statuses/user_timeline', params_josh, function(error, tweets, response) {
        let rescount = tweets.length;
        let i;
        for(i = 0; i < rescount; i++){
            let text = tweets[i].text;
            var handled = text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
            fs.writeFile('./src/mkgen_source/josh.txt', `${handled} \r\n`, (err) => {
                if (err) throw err;
            });
        }
    });
};