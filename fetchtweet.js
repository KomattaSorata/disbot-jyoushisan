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

    const since_tid_sorata = fs.readFileSync('./src/mkgen_source/since_id_sorata.txt', 'UTF-8');

    const params_sorata = {screen_name: 'komattasorata', count:200, exclude_replies: true, include_rts: false, since_id: since_tid_sorata};
    client.get('statuses/user_timeline', params_sorata, function(error, tweets, response) {
    if (!error) {
        fs.writeFile('./since_id_sorata.txt', tweets[0].id, (err) => {
            if(err) throw err; 
        });
        tweets.map(resp => {
            let text = resp.text;
            var handled = text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
            fs.appendFile('./src/mkgen_source/sorata.txt', `${handled} \r\n`, (err) => {
                if (err) throw err;
            });
        });
    }
    });

    const since_tid_josh = fs.readFileSync('./src/mkgen_source/since_id_josh.txt', 'UTF-8');

    const params_josh = {screen_name: 'joshanska', count:200, exclude_replies: true, include_rts: false, since_id: since_tid_josh};
    client.get('statuses/user_timeline', params_josh, function(error, tweets, response) {
    if (!error) {
        fs.writeFile('./since_id_josh.txt', tweets[0].id, (err) => {
            if(err) throw err; 
        });
        tweets.map(resp => {
            let text = resp.text;
            var handled = text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
            fs.appendFile('./src/mkgen_source/josh.txt', `${handled} \r\n`, (err) => {
                if (err) throw err;
            });
        });
    }
    });
}