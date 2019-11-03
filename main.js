const mibunshou = require('./env_conf.js');
const Discord = require("discord.js");
const client = new Discord.Client();
const kuromoji = require('kuromoji');
const builder = kuromoji.builder({
  dicPath: 'node_modules/kuromoji/dict'
});
const eggtri = require('./src/egg_tri.js');
const eggres = require('./src/egg_res.js');
const mkgen_tri = require('./src/mkgen_tri.js');
const mkgen_dir = require('./src/mkgen_dir.js');
const fs = require('fs');

client.on('ready', () => {
    console.log('上司さん、只今出勤します。')
});

client.on('message', msg => {
    var x = mkgen_tri.indexOf(msg.content);
    if(x === -1){
        return;
    } else {
        var target_mat = mkgen_dir[x];
        class Markov {
            constructor(n) {
              this.data = {};
            }
          
            add(words) {
              for(var i = 0; i <= words.length; i++) {
                var now = words[i];
                if(now === undefined) { now = null };
                var prev = words[i - 1];
                if(prev === undefined) { prev = null };
          
                if(this.data[prev] === undefined) {
                  this.data[prev] = [];
                }
                this.data[prev].push(now);
              }
            }
          
            sample(word) {
              var words = this.data[word];
              if(words === undefined) { words = []; }
          
              return words[Math.floor(Math.random() * words.length)];
            }
          
            make() {
              var sentence = [];
              var word = this.sample(null);
              while(word) {
                sentence.push(word);
                word = this.sample(word);
              }
              return sentence.join('');
            }
          }
          
          var markov = new Markov();
          
          builder.build(function(err, tokenizer) {
            if(err) { throw err; }
          
            fs.readFile(target_mat, 'utf8', function(err, data) {
              if(err) { throw err; }
          
              var lines = data.split("\n"); 
              lines.forEach(function(line) {
                var tokens = tokenizer.tokenize(line);
          
                var words = tokens.map(function(token) {
                  return token.surface_form;
                });
          
                markov.add(words);
              });
              
              const gennerated_text = markov.make();
              msg.reply(gennerated_text);
              fs.appendFile('./src/gen_log_all.txt', `${gennerated_text} \r\n`, function(err){
                if(err) { throw err; }
              })
            });
          });
    }
});

client.on('message', msg => {
    var x = eggtri.indexOf(msg.content);
    if(x === -1){
      return;
    } else {
      msg.channel.send(eggres[x]);
    }
  });
  
client.login(mibunshou.discord_token);