/* Changes:

*/

// don't change me - required to not produce errors in console
version = 0.51;
racersInRace = [];
racerOutcomesLOSERS = [];
racerOutcomesWINNERS = [];
heistQueue = ['empty'];
raceStarted = 0;
racerCount = 0;
totalRacers = 0;
counter = 0;
heistStarted = 0;
testit = 0;
testwords = 0;
testoneracer = 0;
alreadyInRace = 0;
duhAnimation = '';
racerID = '';
nameofPlayer = '';
heisterID = '';
getEmoteTimeout = 8000;
firstPlace='';
indexOfEmote = '';
getEmoteAnim = '';
endRaceTest = 0;
// end of don't change me
debugon = false; // logs
debugonMSG = false;
debugwinlose = false;
/////////////////////////// Editables from here ////////////////////

CHANNEL = ['thebroodles','brdlbot']; // The channel to listen to chat
//CHANNEL = ['squidgeebusiness','brdlbot']; // The channel to listen to chat
raceOrganiser = 'brdlbot'; // this is the user that sends the messages about the race starting and ending - we monitor this to start and end the race etc
hiddenChannel = '#brdlbot'; // for admins to post emotes and stuff to screen
//raceOrganiser = 'squidgeebusiness'; // this is the user that sends the messages about the race starting and ending - we monitor this to start and end the race etc
//hiddenChannel = '#squidgeebusiness'; // for admins to post emotes and stuff to screen
adminUsers = ['squidgeebusiness','thebroodles', 'killerubberducky', 'elliotornitier', 'abbi', 'brdlbot']; // admin user can post twitch, 7tv and custom pictures
superUsers = ['','']; // super users can post twitch and 7tv emotes
racersCommandUsers = ['squidgeebusiness','thebroodles','salty__sal','killerubberducky','hamfuritcake','amigofunk','khaegar','morningcraft_','thechefpmt','peteswanson','thegreatjecht','awesomewaves','elliotornitier','dylwingo','steth427']; // these users can use !racers which posts an amount of racers in race on screen

// debug shit
racerOnMessageTest = false; // outputs a racer for every message in chat. Set to false to set to a limited amount of animations - needs work

(debugon) ? console.log('debug is on') : false;
(debugonMSG) ? console.log('debugMSG is on') : false;
// end of debug shit
console.log("version: "+version)

customImageSize = '100px';
customShowCommand = '!show';
customTestShowCommand = '!testshow';


// shit you can change
seasonalChanges = 'custom'; // Custom, standard (christmas needs sorting)
showWinnerName = false; // not working too good, pretty borked


// more shit you can change
//raceImageCustom = ['https://cdn.7tv.app/emote/6163464e18f0c6373068fdf3/4x','https://cdn.7tv.app/emote/616ea69ab6d21adaffbe8a68/4x','https://cdn.7tv.app/emote/6355845301cecbb4e5428b13/4x','https://cdn.7tv.app/emote/62004b0da1ff29b7a4ad0f6d/4x'];
raceImageCustom = ['https://cdn.7tv.app/emote/61db4fa057c70f633ebd64b0/4x','https://cdn.7tv.app/emote/648f490dbef4002c8df2bc4a/4x','https://cdn.7tv.app/emote/60aeeb53a564afa26ee82323/4x','https://cdn.7tv.app/emote/65466470d4c66f065550ad10/4x','https://cdn.7tv.app/emote/6469489358d599a0419faf0d/4x','https://cdn.7tv.app/emote/64c5937b1eeb05cd3b616737/4x','https://cdn.7tv.app/emote/6238a95e84b15be7f5e54252/4x','https://cdn.7tv.app/emote/6148ff063d8c2d23697ac6ed/4x','https://cdn.7tv.app/emote/6413ad7312ae2f4792c715c7/4x','https://cdn.7tv.app/emote/64387aa5e06ecb731b2375d2/4x','https://cdn.7tv.app/emote/6435d5fd7bd689356b665f81/4x','https://cdn.7tv.app/emote/646c55216989b9b0d46bd63c/4x'];
raceImage = 'https://cdn.7tv.app/emote/643d3c98f59feae94a925701/4x'; // the racer image must be an image jpg gif webp etc
raceImageSize = '100px'; // The size of the racer image on screen. This is modified by the animation
raceImageMulti = 'https://cdn.7tv.app/emote/64428f13a9f9fb7c5f27c47a/4x';

raceImageMultiSize = '300px'; // The size of the racer image on screen. This is modified by the animation
raceMessageTrigger = '!race'; // The message to add a racer
//raceTotalTime = 600000;

// triggers for race starting and finishing to check against
raceStartingMessage0 = 'The Chocobo Racing Championship are now open for registration! Prove your worth as the fastest chocobo racer and win broodlebits! The prize pool will only get bigger with each new competitor! Register now with !race';
raceStartingMessage1 = 'The Chocobo Racing Championship will close registration in 5 minutes! Type !race to sign up!';
raceStartingMessage2 = 'The Chocobo Racing Championship will close registration 1 minute! Type !race to sign up!';
raceFinishedMessage0 = 'Thank you to all racers! The race will return soon...';

// triggers for racers outcomes, who fell etc to check against
raceOutcomeMessage_CHEERSIDELINES = 'decided to cheer on the sidelines instead of racing...?'; // message.includes('raceOutcomeMessage_CHEERSIDELINES');
raceOutcomeMessage_EXHAUSTED = 'raced too hard and exhausted their chocobo!'; // message.includes('raceOutcomeMessage_EXHAUSTED');
raceOutcomeMessage_INJURY = "had to pull out of the race due to their chocobo's injury!"; // message.includes('raceOutcomeMessage_INJURY');
raceOutcomeMessage_BANANA = "threw a banana"; // message.includes('raceOutcomeMessage_BANANA');


// tiggers for first second and third to check against
raceOutcomeMessage_FIRST = "In first place we have";
raceOutcomeMessage_SECOND = "In second place";
raceOutcomeMessage_THIRD = "And in third";

// second place has a detour that we can check against
raceOutcomeMessage_DETOUR = "took a detour but still managed to win";

// just an array of the winner and loser messages that occur
raceOutcomemessages_WINNERS = [raceOutcomeMessage_FIRST, raceOutcomeMessage_SECOND, raceOutcomeMessage_THIRD];
raceOutcomemessages_LOSERS = [raceOutcomeMessage_CHEERSIDELINES, raceOutcomeMessage_EXHAUSTED, raceOutcomeMessage_INJURY];

// heisters
heistImage = 'https://cdn.7tv.app/emote/64d50050507a9267faee3454/4x';
heistImageSize = '100px'; // The size of the racer image on screen. This is modified by the animation
heistMessageTrigger = '!heist'; // The message to add a racer
heistStartMessage0 = 'is getting a team together to perform a heist'; // the check message to start a heist
heistHasEnded = ['Everyone makes off with 10000','No broodlebits this time,','Maybe you can win his favour and try another','you KNOW the password is R69, L420, R69.','No broodlebits today','then you can try another !heist.',"ready for the next !heist.","and steals Zell's T-Board!","attempting another !heist soon.","with some energy drinks and snagged his Dr. P!"]
heistWords=['!heist','!hesit']; // trigger words for people who want to heist

/////////////////////// End of editables //////////////////////////

// Connect to twitch via tmi
	const client = new tmi.Client({
		connection: { reconnect: true},
		options: { debug: false },
		channels: CHANNEL

	});

	client.connect();

	client.on('connect', (channel) => {
		    console.log("I connected to the channel: " + channel);
	});
//

// START OF A FUCK LOAD OF FUNCTIONS POORLY PUT TOGETHER, BUT THEY DO THINGS WITHOUT REPEATING TOO MUCH SHIT
	// spit text on screen in a fun wavey pattern, floating from left to right
	function spitWords(duhwordDiv, duhwordID, duhSomething, duhnameIs, duhDELAY, duhletterDelay, duhTimeout, duhAnimation){
		theSomething = duhSomething.toString();
		theSomething = theSomething.replace(', ','');
		duhwordDiv = document.createElement('div');
		allStyles = 'position:absolute; width:1920px; height:1080px';
		duhwordDiv.style = allStyles;
		duhwordDiv.className = duhwordID;
		duhwordDiv.innerHTML = '<div class="'+duhAnimation+'" style="z-index: 999; position:fixed; box-sizing: border-box;">'+theSomething+'</div>';
		if (duhletterDelay !== "NULL"){
			setTimeout(function(){document.body.append(duhwordDiv);}, duhletterDelay);
		}else{
			document.body.append(duhwordDiv);
		}
		setTimeout(() => duhwordDiv.remove(), (duhTimeout));
	}

	// put a video on screen
	function spitaVideo(duhDiv, duhvidID, duhvideoLocation, duhVolume, timeOutVid, duhAnimation){
		var duhDiv = document.createElement('div');
		allStyles = 'position:absolute; width:1920px; height:1080px';
		duhDiv.style = allStyles;
		duhDiv.className = duhvidID;
		duhDiv.innerHTML = '<div class="'+duhAnimation+'" style="z-index: 1; position:fixed; box-sizing: border-box;"><video id="'+duhvidID+'" width="300px"; height="auto"; nocontrols><source src="'+duhvideoLocation+'" type="video/mp4"><canvas id="c2" width="300" height="auto"></canvas></div>';
		document.body.append(duhDiv);
		var vid = document.getElementById(duhvidID);
		vid.volume = Number(duhVolume);
		setTimeout(function(){document.getElementById(duhvidID).play();}, 300);
		setTimeout(() => duhDiv.remove(), (timeOutVid));
	}
	//

// random number generator, set max number, randomly spits a number from 0 to the number you put in
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
// random number generator, between two numbers
function getRandomIntBetween(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

// the meat of this script - adds everything you seen on screen, the racers, the heisters, the everything - animations are in racers.html
function animateSomething(duhCommandis, duhimgDiv, duhimgID, duhimgLocation, himynameis, duhEndTime, duhAnimation, duhDelay, duhimgSize, xLoc, yLoc){
	counter++;
	duhimgDiv = document.createElement('div');
	duhimgDiv.style = 'position:absolute; width:1920px; height:1080px';
	duhimgDiv.className = duhimgID;
	

	if(duhCommandis == '!race'){
		if(duhimgSize == "-1"){
			duhimgDiv.innerHTML = '<div class="'+duhAnimation+'Flip" style="z-index: '+counter+'; position:fixed; box-sizing: border-box;"><img height="auto" style="transform: scaleX(-1);" width="'+raceImageSize+'" src="'+duhimgLocation+'"></div>';
		}else{
			duhimgDiv.innerHTML = '<div class="'+duhAnimation+'" style="z-index: '+counter+'; position:fixed; box-sizing: border-box;"><img height="auto" width="'+raceImageSize+'" src="'+duhimgLocation+'"></div>';
		}
		duhimgDiv.innerHTML = '<div class="'+duhAnimation+'" style="z-index: '+counter+'; position:fixed; box-sizing: border-box;"><img height="auto" style="transform: scaleX('+duhimgSize+');" width="'+raceImageSize+'" src="'+duhimgLocation+'"></div>';
	}else if(duhCommandis == 'chocoRace_START'){
		duhimgDiv.innerHTML = '<div class="'+duhAnimation+'" style="z-index: '+counter+'; position:fixed; box-sizing: border-box;"><img height="auto" width="'+raceImageMultiSize+'" src="'+duhimgLocation+'"></div>';
	}else if(duhCommandis == '!heist'){
		duhimgDiv.innerHTML = '<div style="animation: KF_heister 3s; padding-left: '+getRandomIntBetween(100, 1820)+'px;z-index: '+counter+'; position:fixed; box-sizing: border-box;"><img height="auto" width="'+heistImageSize+'" src="'+duhimgLocation+'"></div>';
	}else if(duhCommandis == 'twitchemote'){
		if(debugon){console.log("duhimgLocation: "+duhimgLocation);}
		duhimgDiv.innerHTML = '<div class="'+duhAnimation+'" style="z-index: '+counter+'; position:fixed; box-sizing: border-box;"><img height="auto" width="'+customImageSize+'" src="'+duhimgLocation+'"></div>';
	}else if(duhCommandis == 'custom'){
		if(duhAnimation == 'static'){animChosen='none'; setXY='top:'+yLoc+'%; left:'+xLoc+'%;'}else{animChosen = duhAnimation; setXY='';}
		if(debugon){console.log("duhimgLocation: "+duhimgLocation);}
		duhimgDiv.innerHTML = '<div class="'+animChosen+'" style="z-index: '+counter+'; position:fixed; box-sizing: border-box; '+setXY+';"><img height="auto" width="'+duhimgSize+'" src="'+duhimgLocation+'"></div>';
	}else if(duhCommandis == 'ezsend'){
		if(duhAnimation == 'static'){animChosen='none'; setXY='top:'+yLoc+'px; left:'+xLoc+'px;'}else{animChosen = duhAnimation; setXY='';}
		if(debugon){console.log("duhimgLocation: "+duhimgLocation);}
		duhimgDiv.innerHTML = '<div class="'+animChosen+'" style="z-index: '+counter+'; position:fixed; box-sizing: border-box; '+setXY+';"><img height="auto" width="'+duhimgSize+'" src="'+duhimgLocation+'"></div>';
	}else if(duhCommandis == '!racers'){
		duhimgDiv.innerHTML = '<div class="'+duhAnimation+'" style="z-index: '+counter+';"><svg><text x="50%" y="50%" dy=".15em" text-anchor="right">'+duhimgLocation+' racers!   </text></svg></div>';
		//animateSomething('!racers', 'racers', 'racers', racersInRace.length, nameofPlayer, 10000, 'racers', 200, '200'+'px', 0, 0);
	}else{
		duhimgDiv.innerHTML = '<div class="none" style="z-index: '+counter+'; position:fixed; box-sizing: border-box;"><img height="auto" width="'+customImageSize+'" src="'+duhimgLocation+'"></div>';
	}
	if(duhCommandis == '!heist'){
		setTimeout(() => document.body.append(duhimgDiv), (duhDelay));
		setTimeout(() => duhimgDiv.remove(), (2860));
	}else{
		setTimeout(() => document.body.append(duhimgDiv), (duhDelay));
		setTimeout(() => duhimgDiv.remove(), (duhEndTime+duhDelay));
	}

	if(debugon){
			console.log('animation: '+duhAnimation);
	}
} // end of function animateSomething

// this is a quick function to loop however many times you want to show the multi racer emote
function startRaceAnimationMulti(amountofRacers){
	for (j=0; j<amountofRacers; j++) {
		racerID = 'RACER_anonSTART'+[j];
		setTimeout(function() {
				animateSomething('chocoRace_START', racerID, racerID, raceImageMulti, 'anon', 20000, 'runLeft', 100);
		}, 1000  * j);
	}
}

// this ends the race by resetting all the things that start the race, including the array
function endtheRace(){
	if(debugon){
				console.log('raceStarted: '+raceStarted);
				console.log('racerCount: '+racerCount);
				console.log('counter: '+counter);
				console.log('racersInRace: '+racersInRace);
	}

		raceStarted = 0;
		racerCount = 0;
		counter = 0;
		racersInRace = [];

		if(debugon){
				console.log('raceStarted: '+raceStarted);
				console.log('racerCount: '+racerCount);
				console.log('counter: '+counter);
				console.log('racersInRace: '+racersInRace);
		}
}

// shows a heister
function addHeister(nameofPlayer, heisterID){
	//if(debugon){console.log('add heist loop');}
	if (heistStarted == 1 && heistQueue.length >= 2 && nameofPlayer != raceOrganiser){
			//call function to spit out a racer on screen
			animateSomething('!heist', heisterID, 'Heister_', heistImage, 'heister', 2860, 'heister', 100);
			// remove one of the entries from the queue of heisters
			if(debugon){console.log("heistQueue:");}
			if(debugon){console.log(heistQueue);}

			if (heistQueue.length != 1){
				heistQueue.pop();
				if(debugon){console.log('popping a heister');}
			}
		/*	if(debugon){
					console.log("Heister ID: "+heisterID);
					console.log("Image: "+heistImage);
					console.log("Player Name: "+nameofPlayer);
			}*/
	}
}

// this repeats the addheister function every 5720 seconds, which... hopefully is the correct math for the FPS of the heist gif so it loads correctly every time.
// when a user enters !heist into chat, that user is added to an array and the loop below will play IF there's a heister in the array
// if not, it does nothing and waits for the next one
setInterval(addHeister, 5720);

// this is step one for adding a racer - checking if standard or custom and setting the correct image, which then passes it off to the animateSomething function, setting custom if needed
function racerOutcomesCustom(whoAmI, chosenAnim, racePosition, chosenIMG, duhMessage, duhDELAY, duhFlip){
	if(debugon){console.log("Starting racerOutcomesCustom function...")}
	if(debugon){console.log('whoAmI: '+whoAmI)}
	if(debugon){console.log('chosenAnim: '+chosenAnim)}
	if(debugon){console.log('racePosition: '+racePosition)}
	if(debugon){console.log('chosenIMG: '+chosenIMG)}
	if(chosenIMG.includes(raceImage) && seasonalChanges == 'custom'){
		chosenIMG = raceImage;
		seasonalChanges = 'standard';
	}else if(seasonalChanges == 'standard'){

	}else{
		//chosenIMG = raceImageCustom[getRandomInt(raceImageCustom.length)];
		seasonalChanges = 'custom';
	}
	racerID = counter;
	switch (seasonalChanges) {
		case 'custom':
		if(debugon){console.log("---------------------custom animation spit -------------------");}
				animateSomething('!race', racerID, racerID, chosenIMG, whoAmI, 20000, chosenAnim+'Custom', duhDELAY, duhFlip);
		break;
		case 'standard':
		if(debugon){console.log("---------------------standard animation spit -------------------");}
				animateSomething('!race', racerID, racerID, chosenIMG, whoAmI, 20000, chosenAnim, duhDELAY, duhFlip);
		break;
	};
	seasonalChanges = 'custom';
}




// this twitch emote stripper rips emotes from the raw message from tmi. It finds the ID's as they're saved separately in the tmi output with their position in the message sent.
// I get lost in this function, but I have edited it to work in a way that suits what I need.
// It basically takes the ID's and replaces the plain text from the message with the html required to post the image of the emote. Giving you messageHTML
function getemoteOnly(message, emotes) {
	//console.log("start " + emotes);
	if (!emotes) return message;

	// store all emote keywords
	// ! you have to first scan through
	// the message string and replace later
	const stringReplacements = [];

	// iterate of emotes to access ids and positions
	Object.entries(emotes).forEach(([id, positions]) => {
		// use only the first position to find out the emote key word

		const position = positions[0];
		const [start, end] = position.split("-");
		const stringToReplace = message.substring(
			parseInt(start, 10),
			parseInt(end, 10) + 1

		);

		stringReplacements.push({
			stringToReplace: stringToReplace,
			replacement: `https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/dark/3.0`,
		});
	});
	//https://static-cdn.jtvnw.net/emoticons/v2/306765428/default/dark/1.0
	// generate HTML and replace all emote keywords with image elements
	const messageHTML = stringReplacements.reduce(
		(acc, { stringToReplace, replacement }) => {
			// obs browser doesn't seam to know about replaceAll
			return acc.split(stringToReplace).join(replacement);
		},
		message
	);

	return messageHTML;
} // stop getting funky

// updates an emote for a player in the racersInRace array
function updateEmoteForRacer(playerNameToCheck, newEmoteURL, flipEmote) {
		for (let i = 0; i < racersInRace.length; i++) {
			// Check if the first element (nameofPlayer) matches
			if (racersInRace[i][0] === playerNameToCheck) {
				// If it matches, update the fourth element (getEmotePositionURL)
				racersInRace[i][3] = newEmoteURL;
				if (flipEmote){
					racersInRace[i][6] = '-1';
				}else{
					racersInRace[i][6] = '1';
				}
				console.log(`Updated emote for ${playerNameToCheck} to ${newEmoteURL}. Flip: ${flipEmote}`);
				break;
			}
		}
}

// start of client.on message - runs through everything on every message, but only triggers on certain words from certain people
client.on('message', (channel, tags, message, self) => {

	//if (message == '!OhMyDog'){
	//	animateSomething('twitchemote', 'BR', 'BR', 'https://static-cdn.jtvnw.net/emoticons/v2/81103/default/dark/3.0', 'ohmydog', 8000, 'emoteTL', 100);
	//}

	if(debugonMSG){
			console.log('USERNAME: '+nameofPlayer);
			console.log('MESSAGE: '+message);
	}


	// just to simplify shit and prevent issues...
	nameofPlayer = tags.username;

	// grab emotes in messages
	htmlMessagePls = getemoteOnly(message, tags.emotes);
	matchesinStr = htmlMessagePls.match(/\<img.+?\>/g);
	if(debugonMSG){
			console.log('htmlMessagePls: '+htmlMessagePls);
	}

	/////////////////////////////////////////////////////////// ****** START OF RACE SCRIPTING ****** ///////////////////////////////////////////////////////////
	//race not started
	if (raceStarted == 0 && message == raceMessageTrigger){
		if(debugon){
				console.log("Race hasn't start yet: "+raceStarted);
		}
	}



	if (nameofPlayer != raceOrganiser){
		helpermessage = message;
		bypassMessage = message;
		message = message.toLowerCase();
	}else {
		bypassMessage = message;
	}




// get winners and losers and put them in their own arrays so we can call animations for them straight after we see the race ended message

		if(nameofPlayer == raceOrganiser && raceStarted == 1 || testit == 1){

				msgCheck = bypassMessage.split(' ');

						if(bypassMessage.includes(raceOutcomeMessage_FIRST)){
								racerName = msgCheck[5].replace('!','').toLowerCase();
								firstPlace = msgCheck[5].replace('!','').toLowerCase();

								for(i=0; i<racersInRace.length; i++){
									var index = racersInRace[i][0].indexOf(racerName);
									//console.log('INDEX: '+index);
									if (index == '0') {
										racersInRace[i][2]=1;
											if(debugwinlose){
												console.log('FIRST: '+racerName);
												console.log('FOUND: '+racersInRace[i]);
												console.log('POSITION SET: '+racersInRace[i][2]);
											}
									}
								}


						}else if(bypassMessage.includes(raceOutcomeMessage_SECOND)){
								racerName = msgCheck[3].replace('!','').toLowerCase();
								secondPlace = msgCheck[3].replace('!','').toLowerCase();
								if(bypassMessage.includes(raceOutcomeMessage_DETOUR)){
									setOutcomeMessage = raceOutcomeMessage_DETOUR;
								}else{
									setOutcomeMessage = '';
								}

								// In second place, this guy took a detour but still managed to win 40000 broodlebits!
								for(i=0; i<racersInRace.length; i++){
									index = racersInRace[i][0].indexOf(racerName);
									//console.log('INDEX: '+index);
									if (index == '0') {
											racersInRace[i][2]=2;
											racersInRace[i][4]=setOutcomeMessage;
											if(debugwinlose){
													console.log('SECOND: '+racerName);
													console.log('FOUND: '+racersInRace[i]);
													console.log('POSITION SET: '+racersInRace[i][2]);
											}
									}
								}

						}else if(bypassMessage.includes(raceOutcomeMessage_THIRD)){
								racerName = msgCheck[3].toLowerCase();
								thirdPlace = msgCheck[3].toLowerCase();

								for(i=0; i<racersInRace.length; i++){
									index = racersInRace[i][0].indexOf(racerName);
									//console.log('INDEX: '+index);
									if (index == '0') {
											racersInRace[i][2]=3;
											if(debugwinlose){
												console.log('THIRD: '+racerName);
												console.log('FOUND: '+racersInRace[i]);
												console.log('POSITION SET: '+racersInRace[i][2]);
												return;
											}
									}
								}

						}else{}
						// animate all the failed runners
			if (bypassMessage.includes(raceOutcomeMessage_CHEERSIDELINES) || bypassMessage.includes(raceOutcomeMessage_EXHAUSTED) || bypassMessage.includes(raceOutcomeMessage_INJURY) || bypassMessage.includes(raceOutcomeMessage_BANANA)){
				// Get the racer name. Most start with the name of the racer at the start of the message		
				racerName = msgCheck[0].replace('!','').toLowerCase();
				// CHEER
				if(bypassMessage.includes(raceOutcomeMessage_CHEERSIDELINES)){
					setOutcomeMessage = raceOutcomeMessage_CHEERSIDELINES;
					setOutcomeAnim = 101;
					if(debugwinlose){
						console.log(101);
					}
					// EXHAUSTED
				}else if(bypassMessage.includes(raceOutcomeMessage_EXHAUSTED)){
					setOutcomeMessage = raceOutcomeMessage_EXHAUSTED;
					setOutcomeAnim = 102;
					if(debugwinlose){
						console.log(102);
					}
					// INJURY
				}else if(bypassMessage.includes(raceOutcomeMessage_INJURY)){
					setOutcomeMessage = raceOutcomeMessage_INJURY;
					setOutcomeAnim = 103;
					if(debugwinlose){
							console.log(103);
					}
					// BANANA ATTACK
				}else if(bypassMessage.includes(raceOutcomeMessage_BANANA)){
					// get the name of the racer that had the banana thrown at them
					racerName = msgCheck[9].replace('!','').toLowerCase();
					setOutcomeMessage = raceOutcomeMessage_BANANA;
					setOutcomeAnim = 104;
					if(debugwinlose){
							console.log(104);
					}
				}else{
					setOutcomeMessage = 'idkwtfhappened. HELP!';
					setOutcomeAnim = 102;
				}
				if(debugon){console.log(racersInRace);}
				for(i=0; i<racersInRace.length; i++){
					index = racersInRace[i][0].indexOf(racerName);
					if (index == 0) {
							racersInRace[i][2]=setOutcomeAnim;
							racersInRace[i][4]=setOutcomeMessage;
							if(debugwinlose){
								console.log('LOSER: '+racerName);
								console.log('FOUND: '+racersInRace[i]);
								console.log('POSITION SET: '+racersInRace[i][2]);
							}
					}
				}
			}

		}
// end of finding the position of racers

// Is it a racer?
		if (message.includes(raceMessageTrigger) && nameofPlayer != raceOrganiser){
			racerCheck = '!race';
			if(debugon){
	        console.log('Message contained !race, truncating to !race to pass to next step: '+message);
	    }
		}

// check on how many racers are in the race
		if (raceStarted == 1 && racersCommandUsers.includes(nameofPlayer) && bypassMessage == '!racers'){
			animateSomething('!racers', 'racers', 'racers', racersInRace.length, nameofPlayer, 8000, 'racersinraceSTROKE', 0, '300'+'px', 0, 0);
			if(debugon){
	        console.log('!racers: '+message);
	    }
		}



	// START RACE --------------------------------------------------------------------------------
  if (nameofPlayer == raceOrganiser && message == raceStartingMessage0){
		racerOutcomesLOSERS = [];
		racerOutcomesWINNERS = [];
		raceStarted = 1;
		startRaceAnimationMulti(10);
    if(debugon){
        console.log("Race start: "+raceStarted);
        console.log(message);
    }
  }

  // when someone types !race - this is what starts putting the racers on screen
	// spit out a racer when the race is available to enter a racer into the race
	checkMessageisRace = bypassMessage.split(' ');
	getEmotePositionB = htmlMessagePls.split(' ');
  	if (raceStarted == 1 && checkMessageisRace[0] == raceMessageTrigger && nameofPlayer != raceOrganiser || checkMessageisRace[0] == raceMessageTrigger && testoneracer == 1 ){
		nameofPlayer = tags.username;
		racerN2S = racerCount.toString();
		racerID = 'RACER_'+racerN2S;
		getEmotePositionC = checkMessageisRace[0];
		flipIt = "1";
		if(checkMessageisRace[1] != null || checkMessageisRace[1] != undefined || checkMessageisRace[1] != ''  || checkMessageisRace[1] != ' '){
			getEmotePositionURL = getEmotePositionB[1];
			if(debugon){
				console.log('htmlMessagePls: '+htmlMessagePls);
			}
		}
		if(checkMessageisRace.length >= 3){
			if(checkMessageisRace[2] != null || checkMessageisRace[2] != undefined || checkMessageisRace[2] != ''  || checkMessageisRace[2] != ' '){
				getEmotePositionFlip = checkMessageisRace[2];
				if (getEmotePositionFlip.includes("flip")) {
					flipIt = "-1";
				} else {
					flipIt = "1";
				}
			}else{
				flipIt = "1";
			}
		}
		if(debugon){
			console.log('getEmotePositionB: '+getEmotePositionB);
			console.log('getEmotePositionC: '+getEmotePositionC);
			console.log('getEmotePositionURL: '+getEmotePositionURL);
		}
		for(i=0; i<racersInRace.length; i++){
			if (nameofPlayer.includes(racersInRace[i][0])){
				alreadyInRace=1;
			}
		}
		if(htmlMessagePls.includes('https://')){}else{
			if(matchesinStrNAME.includes(getEmotePositionURL)){
				indexOfEmote = matchesinStrNAME.indexOf(getEmotePositionURL);
				getEmotePositionURL = 'https://cdn.7tv.app/emote/' + matchesinStrIMG[indexOfEmote] +'/3x';
			}else{
				getEmotePositionURL = raceImage;
			}
		}

		if (alreadyInRace == 1){
      		if(debugon){console.log('Racer: '+nameofPlayer+' already exists in the race.');}
			// check if we need to update the emote for a player
			if (checkMessageisRace[0] == raceMessageTrigger && checkMessageisRace[1]){
				updateEmoteForRacer(nameofPlayer, getEmotePositionURL, flipIt);
			}
   		}else{
			
			// add to the racers array
			racersInRace.push([nameofPlayer,'runRight',99,getEmotePositionURL,'',100,flipIt]);
			
			//call function to spit out a new racer on screen

			animateSomething('!race', racerID, racerID, getEmotePositionURL, nameofPlayer, 20000, 'runLeft', 100);

			if(debugon){
				console.log("NEW Racer ID: "+racerID);
				console.log("NEW RACER Image: "+getEmotePositionURL);
				console.log("Player Name: "+nameofPlayer);
			}
    	}
		alreadyInRace=0;
  	}
  

	// END RACE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


	  if (nameofPlayer == raceOrganiser && message == raceFinishedMessage0 || endRaceTest == 1){
			setTimeout(function(){
		//	setTimeout(function(){}, 3000);
					if(debugon){console.log("racersInRace: "+racersInRace);}
					if(debugon){console.log("ENDING RACE - total racers: "+racersInRace.length);}

					disDELAY=300;
					// add racers that finished the race with no additional message
					for (i=0; i<racersInRace.length; i++) {
					if (racersInRace[i][6] == null || racersInRace[i][6] == undefined || racersInRace[i][6] == ''){
						flippa = "";
					}else {
						flippa = racersInRace[i][6];
					}
					// spit out a standard finishing racer
					switch (racersInRace[i][2]) {
						case 99:
								racerOutcomesCustom(racersInRace[i][0], 'runRight', 99, racersInRace[i][3], '', disDELAY, flippa);
								if(debugon){console.log("END OF RACE Adding normal racer: "+racersInRace[i][0]+"  i: "+i);}
								if(debugon){console.log("END OF RACE Added racer IMG: "+racersInRace[i][3]);}
						break;
					}
					disDELAY = disDELAY+700;
					//disDELAY = (disDELAY+600);
					//console.log("DELAY: "+disDELAY);
					}

					if(debugwinlose){console.log("---------------------START OF WINNERS racerOutcomesCustom-------------------");}
					// WINNERS // add racers that won racerOutcomesWINNERS place numbers are in racerOutcomesWINNERS[j][2]
					for (j=0; j<racersInRace.length; j++) {
						
						switch (racersInRace[j][2]) {
							case 1:
							if(debugwinlose){console.log("Adding winning racer #1 "+racersInRace[j][0]);}

							// spit out the winner
							racerOutcomesCustom(racersInRace[j][0], 'runRightWINNER_1', 1, racersInRace[j][3], '', 50, flippa);

							break;
							case 2:
								if(debugwinlose){console.log("Adding winning racer #2 "+racersInRace[j][0]);}
									// spit out a second place winner
								if(racersInRace[j][4].includes(raceOutcomeMessage_DETOUR)){

										if(debugwinlose){console.log("Adding winning racer #2 as  "+raceOutcomeMessage_DETOUR);}
										racerOutcomesCustom(racersInRace[j][0], 'runRightDetour', 2, racersInRace[j][3],'',50, flippa);
								}else{
										if(debugwinlose){console.log("Adding winning racer #2 DEFAULT");}
										racerOutcomesCustom(racersInRace[j][0], 'runRightWINNER_2', 2, racersInRace[j][3],'',50, flippa);

								}
							break;
							case 3:

								if(debugwinlose){console.log("Adding winning racer #3 "+racersInRace[j][0]);}
								racerOutcomesCustom(racersInRace[j][0], 'runRightWINNER_3', 3, racersInRace[j][3],'',50, flippa);

							break;
						};
					}
					if(debugwinlose){console.log("---------------------START OF LOSERS racerOutcomesCustom-------------------");}
					// LOSERS // raceOutcomeMessage_CHEERSIDELINES // raceOutcomeMessage_EXHAUSTED // raceOutcomeMessage_INJURY
					for (j=0; j<racersInRace.length; j++) {
						switch (racersInRace[j][2]) {
							case 101:

								if(debugwinlose){console.log("Adding fallenRacer racer raceOutcomeMessage_CHEERSIDELINES");}
								racerOutcomesCustom(racersInRace[j][0], 'runCheerSidelines', 101, racersInRace[j][3],'',50, flippa);

							break;
							case 102:

								if(debugwinlose){console.log("Adding loser racer raceOutcomeMessage_EXHAUSTED");}
								racerOutcomesCustom(racersInRace[j][0], 'runRightExhausted', 102, racersInRace[j][3],'',50, flippa);

							break;
							case 103:

								if(debugwinlose){console.log("Adding loser racer raceOutcomeMessage_INJURY");}
								racerOutcomesCustom(racersInRace[j][0], 'runRightInjury', 103, racersInRace[j][3],'',50, flippa);

							break;
							case 104:
								if(debugwinlose){console.log("Adding fallenRacer racer raceOutcomeMessage_BANANA");}
								racerOutcomesCustom(racersInRace[j][0], 'runRightBanana', 104, racersInRace[j][3],'',50, flippa);
								animateSomething('custom', 'custom', 'custom', 'https://cdn.7tv.app/emote/63f6b4d617478c0c59fc20a6/4x', nameofPlayer, 20000, 'bananapeel', 100, '30px', 0, 0);
								//animateSomething('custom', 'custom', 'custom', 'https://cdn.7tv.app/emote/63f6b4d617478c0c59fc20a6/4x', nameofPlayer, 20500, 'runRightBanana', 100, '100px', 0, 0);
								//raceOutcomeMessage_BANANA
							break;

						};

					}


				// this makes sure that the race is reset and that nobody can put any more racers on screen
				setTimeout(() => endtheRace(), (2000));

				if(debugon){
						console.log("Race finished: "+raceStarted);
						console.log("Racer count: "+racerCount);
				}
			}, 3000);
		}


		// END RACE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


	// 5 minutes of race remaining
	if (nameofPlayer == raceOrganiser && message == raceStartingMessage1){
		// 5 minute warning
		startRaceAnimationMulti(5);
		if(debugon){
				console.log("Race 5 minute warning!!");
		}
	}
///////////////////////////////////////////////// END OF RACE SCRIPTING ///////////////////////////////////////////////////////////////////






// START OF HEIST ---------------------------------------
if (message.includes('!heist') && nameofPlayer != raceOrganiser || message.includes('!hesit') && nameofPlayer != raceOrganiser){
	//message = '!heist';
	helpermessage = '!heist'
	if(debugon){
			console.log('Message contained !heist, truncating to !heist to pass to next step: '+message);
	}
}

// START THE HEIST
if (nameofPlayer == raceOrganiser && bypassMessage.includes(heistStartMessage0)){
	heistStarted = 1;
	nameofPlayer = tags.username;
	heisterID = 'Heister_';
	if (debugon){
			console.log("heist start: "+heistStarted);
			console.log(message);
	}
}

// puts a heister into the queue to display
if (heistStarted == 1 && message == heistMessageTrigger && nameofPlayer != raceOrganiser){
	heistQueue.push('!heist');
}

// end the heist
if (nameofPlayer == raceOrganiser){
	if (debugon){console.log(raceOrganiser + ': '+message);}
	for(i = 0; i < heistHasEnded.length; i++){
		if ( bypassMessage.includes(heistHasEnded[i]) ){
			heistStarted = 0;
			if (debugon){console.log(heistStarted);}
	}
	}
}

// shows a winner name, not really working properly yet
if(showWinnerName || testwords == 1){
	msgZero = '    '+firstPlace+'     ';
	msgZero = msgZero.split('');
	msgZero = msgZero.reverse();
	//if(racerOutcomesWINNERS[j][2] == 1){
			for (var o = 0; o < msgZero.length; o++) {
					var letterDelay = (o*150);
					var letterTimeout = 20000+(o*100);
					//(duhwordDiv, duhwordID, duhSomething, duhnameIs, duhDELAY, duhletterDelay, duhTimeout, duhAnimation)
					if(debugon){console.log("SPITTING LETTER: "+msgZero[o]);}
					spitWords(firstPlace+counter, firstPlace+counter, msgZero[o], firstPlace+counter, 1, Number(letterDelay), letterTimeout, 'wordsRightWINNER_1');
			}
	//}
}


	/////////////////// TESTING STARTS BELOW ////////////////////////

	// spit out a racer every chat message
	if (racerOnMessageTest){
		nameofPlayer = tags.username;
		racerN2S = racerCount.toString();
		racerID = 'RACER_'+racerN2S;
		racersInRace.push(nameofPlayer);
		animateSomething('!race', racerID, racerID, raceImage, nameofPlayer, 20000, 'runRight', 100);
		if(debugon){
		console.log("Racer ID: "+racerID);
		console.log("Image: "+raceImage);
		console.log("Player Name: "+nameofPlayer);
		}
  	}
	if(debugon){
		console.log(racersInRace);
	}


	// test racers to see what they look like 
	testracers = 0;
	racersInRaceTest = [];
	if (nameofPlayer == "squidgeebusiness" && message.includes('!testracers')){
		splitmessage = message.split(' ');
		splitmessagecount = splitmessage.length;
		chosenIMG = "https://cdn.7tv.app/emote/01GY7K9CE0000FB7ZAX5594NR1/3x";
		if(splitmessagecount == 2){
			chosenIMG = splitmessage[1];
		}else{
			chosenIMG = "https://cdn.7tv.app/emote/01GY7K9CE0000FB7ZAX5594NR1/3x";
		}
		if(splitmessagecount == 3){
			flip = "-1";
		}else{
			flip = "1";
		}
		// racers test all in one
		
			// RUN TO LEFT
			setTimeout(() => {
				racersInRaceTest.push(["testaddracer",'runRight',99,chosenIMG,'',100,flip]);
				animateSomething('!race', "testaddracer1", "testaddracer1",chosenIMG,"testaddracer1", 20000, 'runLeft', 100, flip, '30px', 0, 0);
			}, "1000");
			/*setTimeout(() => {
				racersInRaceTest.push(["testaddracer",'runRight',99,chosenIMG,'',100,flip]);
				animateSomething('!race', "testaddracer2", "testaddracer2",chosenIMG,"testaddracer2", 20000, 'runLeft', 100, flip, '30px', 0, 0);
			}, "2000");
			setTimeout(() => {
				racersInRaceTest.push(["testaddracer",'runRight',99,chosenIMG,'',100,flip]);
				animateSomething('!race', "testaddracer3", "testaddracer3",chosenIMG,"testaddracer3", 20000, 'runLeft', 100, flip, '30px', 0, 0);
			}, "3000");
			setTimeout(() => {
				racersInRaceTest.push(["testaddracer",'runRight',99,chosenIMG,'',100,flip]);
				animateSomething('!race', "testaddracer4", "testaddracer4",chosenIMG,"testaddracer4", 20000, 'runLeft', 100, flip, '30px', 0, 0);
			}, "4000");
			setTimeout(() => {
				racersInRaceTest.push(["testaddracer",'runRight',99,chosenIMG,'',100,flip]);
				animateSomething('!race', "testaddracer5", "testaddracer5",chosenIMG,"testaddracer5", 20000, 'runLeft', 100, flip, '30px', 0, 0);
			}, "5000");
			setTimeout(() => {
				racersInRaceTest.push(["testaddracer",'runRight',99,chosenIMG,'',100,flip]);
				animateSomething('!race', "testaddracer6", "testaddracer6",chosenIMG,"testaddracer6", 20000, 'runLeft', 100, flip, '30px', 0, 0);
			}, "6000");*/
		

			// RUN TO RIGHT
			setTimeout(() => {
				racersInRaceTest.push(["testaddracer",'runRight',99,chosenIMG,'',100,flip]);
				animateSomething('!race', "testaddracer1", "testaddracer1",chosenIMG,"testaddracer1", 20000, 'runRightWINNER_1', 100, flip,'30px', 0, 0);
			}, "100");
			setTimeout(() => {
				racersInRaceTest.push(["testaddracer",'runRight',99,chosenIMG,'',100,flip]);
				animateSomething('!race', "testaddracer2", "testaddracer2",chosenIMG,"testaddracer2", 20000, 'runRightWINNER_2', 100, flip, '30px', 0, 0);
			}, "100");
			setTimeout(() => {
				racersInRaceTest.push(["testaddracer",'runRight',99,chosenIMG,'',100,flip]);
				animateSomething('!race', "testaddracer3", "testaddracer3",chosenIMG,"testaddracer3", 20000, 'runRightWINNER_3', 100, flip, '30px', 0, 0);
			}, "100");
			setTimeout(() => {
				racersInRaceTest.push(["testaddracer",'runRight',99,chosenIMG,'',100,flip]);
				animateSomething('!race', "testaddracer4", "testaddracer4",chosenIMG,"testaddracer4", 20000, 'runCheerSidelines', 100, flip, '30px', 0, 0);
			}, "100");
			setTimeout(() => {
				racersInRaceTest.push(["testaddracer",'runRight',99,chosenIMG,'',100,flip]);
				animateSomething('!race', "testaddracer5", "testaddracer5",chosenIMG,"testaddracer5", 20000, 'runRightExhausted', 100, flip, '30px', 0, 0);
			}, "100");
			setTimeout(() => {
				racersInRaceTest.push(["testaddracer",'runRight',99,chosenIMG,'',100,flip]);
				animateSomething('!race', "testaddracer6", "testaddracer6",chosenIMG,"testaddracer6", 20000, 'runRightInjury', 100, flip, '30px', 0, 0);
			}, "100");
			setTimeout(() => {
				animateSomething('custom', 'custom', 'custom', 'https://cdn.7tv.app/emote/63f6b4d617478c0c59fc20a6/4x', nameofPlayer, 20000, 'bananapeel', 100, '30px', 0, 0);
				racersInRaceTest.push(["testaddracer",'runRight',99,chosenIMG,'',100,flip]);
				animateSomething('!race', "testaddracer7", "testaddracer7",chosenIMG,"testaddracer7", 20000, 'runRightBanana', 100, "-1", '30px', 0, 0);
			}, "100");

		


		/* // test banana peel and racer in console
		flip = "-1"
		animateSomething('custom', 'custom', 'custom', 'https://cdn.7tv.app/emote/63f6b4d617478c0c59fc20a6/4x', nameofPlayer, 20000, 'bananapeel', 100, '30px', 0, 0);
		animateSomething('!race', "testaddracer7", "testaddracer7","https://cdn.7tv.app/emote/01GY7K9CE0000FB7ZAX5594NR1/3x","testaddracer7", 20000, 'runRightBanana', 100, "-1");
		*/


		// customised version, sort later, too much faffing
		/*if (splitmessage[0] == "!testaddracer"){
				if (splitmessage.length == 1){
					chosenIMG = "https://cdn.7tv.app/emote/63f6b4d617478c0c59fc20a6/4x";
				}else if (splitmessage.length == 2){
					chosenIMG = splitmessage[1];
				}else if (splitmessage.length == 3){
					chosenIMG = splitmessage[1];
					flip = "flip";
				}
				// add to the racers array
				racersInRaceTest.push(["testaddracer",'runRight',99,getEmotePositionURL,'',100,flipIt]);
				animateSomething('!race', "testaddracer", "testaddracer",chosenIMG,"testaddracer", 20000, 'runLeft', 100, flip);
			

			//animateSomething('!race', racerID, racerID, getEmotePositionURL, nameofPlayer, 20000, 'runLeft', 100);
			//animateSomething('!race', racerID, racerID, chosenIMG, whoAmI, 20000, chosenAnim+'Custom', duhDELAY, duhFlip);
		}*/

		// reset testracers to 0
		testracers = 0;

	}

});

//spitaVideo('video','video','./ivegotagun.mp4', 0.02, 3000);


animateSomething('custom', 'custom', 'custom', 'https://cdn.7tv.app/emote/622f82622cbc7e45d4cac28f/4x', nameofPlayer, 2, 'runRightCustom', 100, '100px', 0, 91);


