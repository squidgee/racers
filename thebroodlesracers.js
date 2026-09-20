// thebroodles racers

const tmi = require('tmi.js');

const client = new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true
  },
  identity: {
    username: 'YOUR_BOT_NAME',
    password: 'oauth:OAUTH_CODE ' // you need to generate an oauth password for your bot account at a site such as https://twitchtokengenerator.com/
  },
  channels: ['CHANNEL_NAME']
});

channel = '#CHANNEL_NAME'
theUsernameToIgnore = 'YOUR_BOT_NAME' // this is the username of the bot account that is running this code, we ignore messages from it so it doesn't get stuck in a loop

client.connect();

// you're gonna need to install mysql with a database called mydb with a table called chatters with columns user and score. 
// user is a varchar(255) and score is an int. user is the primary key.
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost", // I've set these to default, when you set up your DB, you can change these to whatever you want.
  user: "root", 
  password: "password", 
  database: "mydb" 
});



//1 = ready, 2 = in progress, 0 = in cd
var heistOpen = 1
var heistRnd
var heistPlayers = []

var huntOpen = 0
var huntPlayers = []

//prizePool values equal percentages of winnings for 1st, 2nd, 3rd
var prizePool = [100,50,20]
//base cooldown for the hunt in minutes
var huntCool = 50
//maximum cooldown variance for the hunt in minutes
var huntRange = 8
//multiplier for hunt cd when failing to launch
var huntMulti = 1

var jail = []
//jailtime in ms
var jailtime = 60000

var noRub = 0

//hunt message arrays
huntFirst = [`They rode their chocobo to a smooth victory and take home`,`After dodging obstacles and passing rivals, they won the race and`,`They pushed their chocobo to its limits and claimed the top prize of `,`Their chocobo sprinted to the finish line, securing their win and`]
huntSecond = [`with a close finish and`,`took a detour but still managed to win`,`who took out another another racer for`,`who relied on their chocobo's agility to net`]
huntThird = [`barely making it to the podium after a thrilling race for`,`after overcoming challenges, their chocobo won them`,`who encountered a hurdle but recovered to take`,`who chose a "strategic" approach and goes home with`]
huntRIP = [`had to pull out of the race due to their chocobo's injury!`,`raced too hard and exhausted their chocobo!`,`had a terrible start and couldn't catch up.`,`decided to cheer on the sidelines instead of racing...?`]

//heist message arrays
stiltzkin = [`Stiltzkin! Type !heist to join up!`,`It really was too easy, luckily you didn't have to hit him too hard, it was kind of amazing he actually fought back for a bit.`,`Somehow Stiltzkin was actually able to stop all of you on his own, how embarrassing. You can start a new !heist soon though to redeem yourself.`]
dragooShop = [`Dragoo's Armory in Lindblum! Type !heist to join up!`,`It was as easy as walking in and taking it. This Blurster Sword can definitely be sold to some weeb!`,`Somehow, you guys actually managed to get caught by Dragoo. He was more disappointed than mad. No broodlebits this time but you can start a new !heist soon.`]
bmvCemetery = [`the Black Mage Cemetery. Join up with !heist, but it's a bit messed up.`,`Well you succeeded. There wasn't really any issue, there's nothing here to stop you. But it's still pretty messed up.`,`Just as your team digs up the first grave, the Black Mage's eyes light up red and they all burst from their graves as zombies! Nope! No broodlebits today!`]
superSoft = [` the Super Soft! Type !heist to join up!`, `It was the perfect night for crime! You even managed to get some vintage Triple Triad cards while you were at it!`, `It was going really well until one of you knocked an open flame down and set everything on fire. No Super Soft. No broodlebits this time, but you can start a new !heist soon!`]
mageMasher = [`the Mage Masher! Type !heist to join up!`, `Wowee You actually just got a 3:21 MM without the wrist. Cinna even killed himself, it was beautiful.`, `Dude it's nearly been 5 minutes and Baku just killed Cinna. This is a reset. This is an easy pb, the game just needs to cooperate for once. Then you can start a new !heist.`]
theInvincible = [`the Invincible! Type !heist to join up!`, `A grand exit, cannons blazing, all the fireworks are worth firing to stop you from taking this ship.`, `While your team was able to find the Invincible quickly, carelessness has given your target enough time to react to your justice. Vowing to return and reclaim your ship in another !heist soon.`]
blackMateria = [`the Black Materia! Type !heist to join up!`, `Masterfully done! You smacked up Demon's Gate and high-tailed it out there without having to leave Cait Sith behind!`, `The Temple comes crashing in around you, trapping all of you as the FUZZ arrives! Back to reactor for another !heist later!`]
goldSaucer = [`the Gold Saucer! Type !heist to join up!`, `After succesfully wooing Dio on the Gondola ride, you snuck into his trophy room and stole the Keystone!`, `Dio saw through your disguise instantly! He's throwing you and your crew straight into Corel Prison! Maybe you can win his favour and try another !heist later.`]
materiaKeeper = [`Materia Keeper's Materia! Type !heist to join up!`, `The perfect 99 roll and masterful ATB management swiftly destroys Materia Keeper, revealing the Materia inside!`, `A Trine opener into Bio just never sticking grants you a swift and easy release from this mortal realm. Maybe the next run will have a better !heist.`]
shinraMansion = [`the Shinra Mansion! Type !heist to join up!`, `Your crew succesfully deciphers the puzzle in the mansion and cracks the safe! Inside the safe is some useless rusty keys and an Odin Materia..?`, `The puzzle proved too PERPLEXING and your team turns on itself! No matter what they tell you, you KNOW the password is R69, L420, R69. You'll have to convince them in the next !heist.`]
setoGrave = [`Seto's resting place! Type !heist to join up!`, `Bugenhagan had no idea! You snuck straight through the Caves of Gi and made off with the Seraph Comb!`, `Your team managed to make it into the Caves of Gi, but you all got caught in the Stinger webs! Barely scrambling free, you escape with your life, but no broodlebits! No worries, he isn't going anywhere and will be laying in wait for the next !heist...`]
zellRoom = [`Zell's house! Type !heist to join up!`, `While Momma Dincht was distracted in the other room, your team sneaks upstairs and steals Zell's T-Board!`, `Your team got suckered into Triple Triad with Momma Dincht and lost all your cards! The Zell card is overrated anyway. You can get some Power Wrists from another !heist soon.`]
drPepper = [`Badlands Chugs' Dr. Pepper! Type !heist to join up!`, `You succesfully baited Chugs away from the stash with some energy drinks and snagged his Dr. P!`, `Badlands Chugs was not falling for your trickery and throws you all into the Das Boot, ready for his next chug! Maybe when you come out the other side you can try another !heist...`]
myHouse = [`Broodles' house? Wait, don't !heist that please.`, `Well you actually did it. You stole Broodles' only working copy of FF8. He only had one of those.`, `You guys really thought you could rob THE Broodles? HAH. You're brave, I'll give you that. I do however FORBID you from attempting another !heist soon.`]
hamFruit = [`Hamfruitcake's Salty Sultanas! Type !heist to join up!`, `Your team stole the Sultanas from right under her nose! These will be perfect for making the perfect scones.`, `Hamfruitcake was not having any of it! She quite you sneaking around and tried to shake you down for your broodlebits! Luckily you escaped with what you had left, ready for the next !heist.`]
odineLab = [`Odine's Lab! Type !heist to join up!`, `While Odine was busy explaining some nonsense research project you stole an Odine Brand bangle! This might be good for silencing a Sorceress...?`, `Uh oh, Odine caught you sneaking in and has gotten you roped into some operation on Lunatic Pandora! You're going to have to take care of that first, then you can try another !heist.`]
heistArray = [stiltzkin,dragooShop,bmvCemetery,superSoft,mageMasher,blackMateria,goldSaucer,materiaKeeper,shinraMansion,setoGrave,zellRoom,drPepper,myHouse,hamFruit,odineLab]

//values used to increase user score per message
//1: maximum gain per post + 1
//2: bonus score for lucky roll
//3: bonus chance is value x:1
incRng(10,5000,100)

initHunt()

addRubbish("!rubbish")
gambleBits('!gamble ')
giveScore("!give ")
myScore('!broodlebits')
myScore('!score')
myScore('!bits')
leaderboard("!leaderboard")
leaderboard("!top")
stealBits('!steal ')
startHeist('!heist')
joinHeist('!heist')
startHeist('!hesit')
joinHeist('!hesit')
joinHunt('!race')
joinHunt('!pace')



function rubCD() {
  noRub = 1
  setTimeout(rubReady, 60000)
}

function rubReady() {
  noRub = 0
}

function initHunt() {
  if(huntOpen === 0) {
    rnd = (Math.floor(Math.random() * 5)+20)*90000
    setTimeout(openHunt, 10000)
  }
}

function openHunt() {
  client.say(channel, `The Chocobo Racing Championship are now open for registration! Prove your worth as the fastest chocobo racer and win broodlebits! The prize pool will only get bigger with each new competitor! Register now with !race`)
  huntOpen = 1
  setTimeout(function(){ client.say(channel,`The Chocobo Racing Championship will close registration in 5 minutes! Type !race to sign up!`); }, 300000)
  setTimeout(function(){ client.say(channel,`The Chocobo Racing Championship will close registration 1 minute! Type !race to sign up!`); }, 540000)
  setTimeout(resetHunt, 600000)
}

function joinHunt(command) {
  client.on('message', (channel, user, message, self) => {
    if(self) return;
    var name = user["display-name"]
    racerCheckSplit=message.split(' ');
    if(racerCheckSplit[0] == command && name != theUsernameToIgnore){
      if(huntOpen === 1) {
        if(huntPlayers.indexOf(user["display-name"]) !== -1) {
          client.say(channel, `@` + user["display-name"] + ` You are already registered in The Chocobo Racing Championship.`)
        }
        else {
          huntPlayers.push(user["display-name"])
        }
      }
      else {
        client.say(channel, `@` + user["display-name"] + ` The Chocobo Racing Championship is not currently accepting entrants.`)
      }
    }
  })
}

async function resetHunt() {
  shuffledPlayers = (async () => await shuffle(huntPlayers))()
  .then(function(shuffledPlayers) {
    if(shuffledPlayers.length <= 2) {
      huntMulti += 1;
      client.say(channel, `Unfortunately, there weren't enough players registered in the The Chocobo Racing Championship. Another race will begin again soon...`)
    }
    else {
      first = (((Math.pow(shuffledPlayers.length, 2)*5000)/100)*prizePool[0])*huntMulti;
      second = (((Math.pow(shuffledPlayers.length, 2)*5000)/100)*prizePool[1])*huntMulti;
      third = (((Math.pow(shuffledPlayers.length, 2)*5000)/100)*prizePool[2])*huntMulti;
      client.say(channel, 'In first place we have ' + shuffledPlayers[0] + `! ` + huntFirst[Math.floor(Math.random()*4)] + ' ' + first + ' broodlebits!')
      addScore(shuffledPlayers[0],first)
      client.say(channel, 'In second place, ' + shuffledPlayers[1] + ` ` + huntSecond[Math.floor(Math.random()*4)]  + ' ' + second + ' broodlebits!')
      addScore(shuffledPlayers[1],second)
      client.say(channel, 'And in third, ' + shuffledPlayers[2] + ` ` + huntThird[Math.floor(Math.random()*4)] + ' ' + third + ' broodlebits!')
      addScore(shuffledPlayers[2],third)
      if(shuffledPlayers[3]) {
        client.say(channel, shuffledPlayers[3] + ' ' + huntRIP[Math.floor(Math.random()*4)])
      }
      if(shuffledPlayers[4]) {
        client.say(channel, shuffledPlayers[4] + ' ' + huntRIP[Math.floor(Math.random()*4)])
      }
      client.say(channel, `Thank you to all racers! The race will return soon...`)
    }
    huntMulti = 1
    huntOpen = 2
    shuffledPlayers = []
    huntPlayers = []
    rnd = ((huntCool*60000) + Math.floor(Math.random() * (huntRange*60000))) * huntMulti
    setTimeout(openHunt, 900000)
  })
}

function resetHeist() {
  var winNames = ''
  var lossNames = ''
  result = Math.floor(Math.random() * 10)+1
  if(result <= 6) {
    for (var i = 0; i < heistPlayers.length; i++) {
      if(Math.floor(Math.random() * 4) === 1){
        prison(heistPlayers[i])
        lossNames += heistPlayers[i] + ', '
      }
      else {
        winNames += heistPlayers[i] + ', '
        addScore(heistPlayers[i], 10000)
      }
    }
    if(lossNames === '') {
    client.say(channel,heistArray[heistRnd][1] + ' Everyone makes off with 10000 broodlebits!')
    }
    else {
      client.say(channel,heistArray[heistRnd][1] + ' Everyone makes off with 10000 broodlebits! Except for ' + lossNames + 'who got  POLICE BUSTED! POLICE')
    }
  }
  else {
    client.say(channel, heistArray[heistRnd][2])
  }
  heistOpen = 0
  heistPlayers = []
  setTimeout(function(){heistOpen = 1}, 180000)
}

function joinHeist(command) {
  client.on('message', (channel, user, message, self) => {
    if(self) return;
    if(message.toLowerCase() === command) {
      if(heistOpen===2) {
        if(jail.indexOf(user["display-name"]) >= 0) {
          client.say(channel, `@` + user["display-name"] + ` PEPOLICE You can't join a !heist in jail! PEPOLICE`)
          return
        }
        if(heistPlayers.indexOf(user["display-name"]) !== -1) {
          client.say(channel, `@` + user["display-name"] + ` You are already in the heist.`)
        } 
        else {
          heistPlayers.push(user["display-name"])
        }
      }
    }
  })
}

function startHeist(command) {
  client.on('message', (channel, user, message, self) => {
    if(self) return;
    if(message.toLowerCase() === command) {
      if(heistOpen === 1) {
        heistRnd = Math.floor(Math.random() * heistArray.length)
        client.say(channel, user["display-name"] + ' is getting a team together to perform a heist on ' + heistArray[heistRnd][0])
        heistOpen=2
        setTimeout(resetHeist, 90000)
      }
      else if (heistOpen === 0) {
        client.say(channel, `You can't start a new !heist just yet, it's still too POLICE HOT POLICE out there!`)
      }
    }
  })
}

async function stealBits(command) {
  client.on('message', (channel, user, message, self) => {
    if(self) return;
    if(message.startsWith(command)){
      if(jail.indexOf(user["display-name"]) >= 0) {
        client.say(channel, `@` + user["display-name"] + ` PEPOLICE You're in jail! PEPOLICE`)
        return
      }
      var name = user["display-name"];
      var theft = message.split(" ")
      var victim = theft[1]
      var value = parseInt(theft[2])
      if(victim.toLowerCase() === `reseaunance` || victim.toLowerCase() === `thebroodles`) { // added thebroodles in so you can't steal from him :)
        client.say(channel, `nah`)
      }
      else{
        if(value<=0) {
          client.say(channel, `It doesn't work like that. WeirdChamp`)
        }
        else {
          userScore = (async () => await findScore(name))()
          .then(function(userScore) {
            if(userScore >= value) {
              victScore = (async () => await findScore(victim))()
              .then(function(victScore) {
                if(victScore >= value) {
                  rnd = Math.floor(Math.random() * 5)
                  if(rnd >= 2) {
                    client.say(channel, name + ' just stole ' + value + ' broodlebits from ' + victim + '! MoneyDance robHaw MoneyDance' )
                    addScore(name,value)
                    takeScore(victim,value)
                  }
                  else {
                    var rndLoss = Math.floor(Math.random() * 6)+1
                    loss = Math.ceil(value/rndLoss)
                    client.say(channel, name + ' just got POLICE BUSTED POLICE and lost ' + loss + ' trying to steal from ' + victim + '!')
                    prison(name)
                    takeScore(name,loss)
                  }
                }
                else {
                  client.say(channel, `Target can't be found or doesn't have enough broodlebits!`)
                }
              })
            }
            else {
              client.say(channel, `You don't have enough broodlebits!`)
            }
          })
        }
      }
    }
  })
}

async function gambleBits(command) {
  client.on('message', (channel, user, message, self) => {
    if(self) return;
    if(message.startsWith(command)){
      var name = user["display-name"];
      var wager = message.split(" ")
      wagerCheck = wager[1].toString()
      wager = parseInt(wager[1])
      if(wagerCheck === 'all') {
        rnd = Math.floor(Math.random() * 100)+1
        if (rnd >= 51) {
          userScore = (async () => await findScore(name))()
          .then(function(userScore) {
            addScore(name,userScore)
            userScore = userScore + userScore
            client.say(channel, name + ' just gambled everything and won ' + userScore + ' broodlebits! TSCool')
          })
        }
        else {
          userScore = (async () => await findScore(name))()
          .then(function(userScore) {
            client.say(channel,'ThisIsFine ' + name + ' just gambled ' + userScore + ' broodlebits and lost! ThisIsFine')
            updateScore(name,0)
          })
        }
      }
      else if (isNaN(wager)){
        client.say(channel, 'You must gamble a number or all!')
      }
      else if (wager <=0) {
        client.say(channel, `Don't be cheeky.`)
      }
      else{
        userScore = (async () => await findScore(name))()
        .then(function(userScore) {
          if(wager<=userScore) {
            rnd = Math.floor(Math.random() * 100)+1
            if (rnd >= 51) {
              addScore(name,wager)
              client.say(channel, name + ' gambled ' + wager + ' broodlebits and won! OOOO')
            }
            else {
              userScore = userScore - wager
              takeScore(name,wager)
              client.say(channel, name + ' gambled ' + wager + ' broodlebits and lost! steinAA')
            }
          }
          else {
            client.say(channel, `You don't have enough broodlebits! WeirdChamp`)
          }
        })
      }
    }
  })
}

async function giveScore(command) {
  client.on('message', (channel, user, message, self) => {
    if(self) return;
    if(message.startsWith(command)){
      var name = user["display-name"];
      var rcp = message.split(" ")
      var value = rcp[2]
      var rcp = rcp[1]
      var value = parseInt(value)
      var validation = (async () => await findScore(rcp))()
      .then(function(validation) {
        if(!Number.isNaN(validation)) {
          if(value>0) {
            userScore = (async () => await findScore(name))()
            .then(function(userScore) {
              rcpScore = (async () => await findScore(rcp))()
              .then(function(rcpScore) {
                if(value<=userScore) {
                  addScore(rcp,value)
                  takeScore(name,value)
                  client.say(channel, name + ' just gave ' + rcp + ' ' + value + ' broodlebits! ')
                }
                //catch low funds
                else{
                  client.say(channel, `You don't have enough broodlebits! weirdChamp`)
                }
             })
            })
          }
          //catch 0 or less
          else{
            client.say(channel, `Don't be cheeky`)
          }
        }
        else {
          client.say(channel, rcp + ` can not be found.`)
        }
      })
      
    }
  })
}

function takeScore(user,score) {
  var sql = "UPDATE chatters SET score = score-'" + score + "' WHERE user = '" + user + "'"
  con.query(sql, function (err, result) {
  })
}

function addScore(user,score) {
  var sql = "UPDATE chatters SET score = score+'" + score + "' WHERE user = '" + user + "'"
  con.query(sql, function (err, result) {
  })
}

function updateScore(user,score) {
  var sql = "UPDATE chatters SET score='" + score + "'WHERE user = '" + user + "'"
  con.query(sql, function (err, result) {
  })
}

function scoreGain (name,rng) {
  var sql = "INSERT INTO chatters (user, score) VALUES ('" + name + "', 1) ON DUPLICATE KEY UPDATE score=score+'" + rng + "'"
  con.query(sql, function (err) {
  if (err) throw err;
  })
}

function incRng(rnd,lucky,chance) {
  client.on('message', (channel, user, message, self) => {
    var name = user["display-name"]
    if(name != theUsernameToIgnore) {
      if(self) return;
      var rng = Math.floor(Math.random() * rnd)+1
      var bonus = Math.floor(Math.random() * chance)
      if (bonus == chance-1) {
        rng = rng + lucky
        client.say(channel, name + " is feeling lucky!")
      }
      scoreGain(name, rng)
    }
  })
}

async function findScore(user) {
  return new Promise(resolve => {
    setTimeout(() => {
      var sql = "SELECT score FROM chatters WHERE user = '" + user + "'"
      con.query(sql, function (err, result) {
        if (err) throw err;
        var score = JSON.stringify(result)
        score = score.replace(/\D/g,'')
        score = score.replace(/\","score":/g, ': ')
        score = score.replace(/\},/g, ', ')
        score = score.replace(/\}\]/g, '')
        score = parseInt(score)
        resolve(score);
      }, 1000);
    });
  })
}

async function myScore(command) {
  (async() => {client.on('message', (channel, user, message, self) => {
  if(self) return;
  if(message.toLowerCase() === command) {
    var user = user["display-name"];
    score = (async () => await findScore(user))()
    .then(function(score) {
     client.say(channel, user + " has " + score + " broodlebits!");
    })
  }
  })
  })();
}

function leaderboard(command) {
  client.on('message', (channel, tags, message, self) => {
  if(self) return;
  if(message.toLowerCase() === command) {
    var sql = "SELECT * FROM chatters ORDER BY score DESC LIMIT 5"
    con.connect(function(err, result) {
      con.query(sql, function (err, result) {
        var response = JSON.stringify(result)
        var response = response.replace(/\[\{"user":"/g, '')
        var response = response.replace(/\{"user":"/g, '')
        var response = response.replace(/\","score":/g, ': ')
        var response = response.replace(/\},/g, ', ')
        var response = response.replace(/\}\]/g, '')
        client.say(channel, response)
      })
    })
  }
  })
}

function prison(name) {
  if(jail.indexOf(name) !== -1) {
  }
  else {
    jail.push(name)
    setTimeout(function(){
      index = jail.indexOf(name)
      jail.splice(index, 1)
    }, jailtime)
  }
}
function addRubbish(command) {
  client.on('message', (channel, user, message, self) => {
    if(self) return;
    if(message.toLowerCase() === command){
      if(noRub === 0) {
        var sql = "UPDATE rubbish SET count = count + 1"
        con.query(sql, function (err, result) {})
        con.query("SELECT count FROM rubbish", function (err, result) {
          var data = JSON.stringify(result[0].count)
          client.say(channel, "Picked up some rubbish! Chat has picked up " + data + " bits of rubbish! TRASH")
          rubCD()
        })
      }
    }
  })
}