// don't change me - required to not produce errors in console
version = 3;
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
// end of don't change me
debugon = false; // logs
debugonMSG = false;
debugwinlose = false;
/////////////////////////// Editables from here ////////////////////

CHANNEL = ['thebroodles','thebotdles']; // The channel to listen to chat
raceOrganiser = 'thebotdles'; // this is the user that sends the messages about the race starting and ending - we monitor this to start and end the race etc
hiddenChannel = '#thebotdles'; // for admins to post emotes and stuff to screen
adminUsers = ['squidgepls','thebroodles']; // admin user can post twitch, 7tv and custom pictures
superUsers = ['','']; // super users can post twitch and 7tv emotes
racersCommandUsers = ['squidgepls','thebroodles','salty__sal','killerubberducky','hamfuritcake','amigofunk','khaegar','morningcraft_','thechefpmt','peteswanson','thegreatjecht','awesomewaves','elliotornitier','dylwingo','steth427']; // these users can use !racers which posts an amount of racers in race on screen

// debug shit
racerOnMessageTest = false; // outputs a racer for every message in chat. Set to false to set to a limited amount of animations - needs work

(debugon) ? console.log('debug is on') : false;
(debugonMSG) ? console.log('debugMSG is on') : false;
// end of debug shit


customImageSize = '100px';
customShowCommand = '!show';
customTestShowCommand = '!testshow';


// shit you can change
seasonalChanges = 'custom'; // Custom, standard (christmas needs sorting)
showWinnerName = false; // not working too good, pretty borked


// more shit you can change
//raceImageCustom = ['https://cdn.7tv.app/emote/6163464e18f0c6373068fdf3/4x.webp','https://cdn.7tv.app/emote/616ea69ab6d21adaffbe8a68/4x.webp','https://cdn.7tv.app/emote/6355845301cecbb4e5428b13/4x.webp','https://cdn.7tv.app/emote/62004b0da1ff29b7a4ad0f6d/4x.webp'];
raceImageCustom = ['https://cdn.7tv.app/emote/61db4fa057c70f633ebd64b0/4x.webp','https://cdn.7tv.app/emote/648f490dbef4002c8df2bc4a/4x.webp','https://cdn.7tv.app/emote/60aeeb53a564afa26ee82323/4x.webp','https://cdn.7tv.app/emote/65466470d4c66f065550ad10/4x.webp','https://cdn.7tv.app/emote/6469489358d599a0419faf0d/4x.webp','https://cdn.7tv.app/emote/64c5937b1eeb05cd3b616737/4x.webp','https://cdn.7tv.app/emote/6238a95e84b15be7f5e54252/4x.webp','https://cdn.7tv.app/emote/6148ff063d8c2d23697ac6ed/4x.webp','https://cdn.7tv.app/emote/6413ad7312ae2f4792c715c7/4x.webp','https://cdn.7tv.app/emote/64387aa5e06ecb731b2375d2/4x.webp','https://cdn.7tv.app/emote/6435d5fd7bd689356b665f81/4x.webp','https://cdn.7tv.app/emote/646c55216989b9b0d46bd63c/4x.webp'];
raceImage = 'https://cdn.7tv.app/emote/643d3c98f59feae94a925701/4x.webp'; // the racer image must be an image jpg gif webp etc
raceImageSize = '100px'; // The size of the racer image on screen. This is modified by the animation
raceImageMulti = 'https://cdn.7tv.app/emote/64428f13a9f9fb7c5f27c47a/4x.webp';

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
heistImage = 'https://cdn.7tv.app/emote/64d50050507a9267faee3454/4x.webp';
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
		duhimgDiv.innerHTML = '<div class="'+duhAnimation+'" style="z-index: '+counter+'; position:fixed; box-sizing: border-box;"><img height="auto" width="'+raceImageSize+'" src="'+duhimgLocation+'"></div>';
	}else if(duhCommandis == 'chocoRace_START'){
		duhimgDiv.innerHTML = '<div class="'+duhAnimation+'" style="z-index: '+counter+'; position:fixed; box-sizing: border-box;"><img height="auto" width="'+raceImageMultiSize+'" src="'+duhimgLocation+'"></div>';
	}else if(duhCommandis == '!heist'){
		duhimgDiv.innerHTML = '<div style="animation: KF_heister 3s; padding-left: '+getRandomIntBetween(100, 1820)+'px;z-index: '+counter+'; position:fixed; box-sizing: border-box;"><img height="auto" width="'+heistImageSize+'" src="'+duhimgLocation+'"></div>';
	}else if(duhCommandis == 'twitchemote'){
		if(debugon){console.log("duhimgLocation: "+duhimgLocation);}
		duhimgDiv.innerHTML = '<div class="'+duhAnimation+'" style="z-index: '+counter+'; position:fixed; box-sizing: border-box;"><img height="auto" width="'+customImageSize+'" src="'+duhimgLocation+'"></div>';
	}else if(duhCommandis == 'customOnScreen'){
		if(duhAnimation == 'static'){animChosen='none'; setXY='top:'+yLoc+'%; left:'+xLoc+'%;'}else{animChosen = duhAnimation; setXY='';}
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
function racerOutcomesCustom(whoAmI, chosenAnim, racePosition, chosenIMG, duhMessage, duhDELAY){
	if(debugon){console.log("Starting racerOutcomesCustom function...")}
	if(debugon){console.log('whoAmI: '+whoAmI)}
	if(debugon){console.log('chosenAnim: '+chosenAnim)}
	if(debugon){console.log('racePosition: '+racePosition)}
	if(debugon){console.log('chosenIMG: '+chosenIMG)}
	if(chosenIMG.includes(raceImage) && seasonalChanges == 'custom'){
		chosenIMG = raceImage;
		seasonalChanges = 'standard'
	}else if(seasonalChanges == 'standard'){

	}else{
		//chosenIMG = raceImageCustom[getRandomInt(raceImageCustom.length)];
		seasonalChanges = 'custom'
	}
	racerID = counter;
	switch (seasonalChanges) {
		case 'custom':
		if(debugon){console.log("---------------------custom animation spit -------------------");}
				animateSomething('!race', racerID, racerID, chosenIMG, whoAmI, 20000, chosenAnim+'Custom', duhDELAY);
		break;
		case 'standard':
		if(debugon){console.log("---------------------standard animation spit -------------------");}
				animateSomething('!race', racerID, racerID, chosenIMG, whoAmI, 20000, chosenAnim, duhDELAY);
		break;
	};
	seasonalChanges = 'custom'
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




	// post stuff on screen! <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
	if(superUsers.includes(nameofPlayer)  || adminUsers.includes(nameofPlayer)){

	if (channel == hiddenChannel){

			//reloads the web page
			if(message == '!reloadracers'){
				if(debugon){console.log('RELOADING');}
				location.reload();
			}
			// display gamba if seen
			if (message == '!gamba'){
				animateSomething('customOnScreen', 'custom', 'custom', 'https://cdn.7tv.app/emote/652b059124565c1d0e386928/4x.webp', nameofPlayer, 120000, 'static', 100, '100px', 0, 0);
				animateSomething('customOnScreen', 'custom', 'custom', 'https://cdn.7tv.app/emote/652b059124565c1d0e386928/4x.webp', nameofPlayer, 120000, 'static', 100, '100px', 95, 91);
				animateSomething('customOnScreen', 'custom', 'custom', 'https://cdn.7tv.app/emote/652b059124565c1d0e386928/4x.webp', nameofPlayer, 120000, 'static', 100, '100px', 95, 0);
				animateSomething('customOnScreen', 'custom', 'custom', 'https://cdn.7tv.app/emote/652b059124565c1d0e386928/4x.webp', nameofPlayer, 120000, 'static', 100, '100px', 0, 91);
				animateSomething('customOnScreen', 'custom', 'custom', './gamba.png', nameofPlayer, 120000, 'gamba', 100, '500px', 0, 0);
			}

			if(debugon){console.log('superuser/admin detected');}
			getEmotePosition = htmlMessagePls.split(' ');
			if(getEmotePosition.length == 2 || getEmotePosition.length  == 3){
				getEmotePositionLC = getEmotePosition[1];
				getEmotePositionURL = getEmotePosition[0];
				getEmoteTimeout = Number(getEmotePosition[2]);

				// if 7tv, change to 7tv emote finder
				if(matchesinStrNAME.includes(getEmotePositionURL)){
					indexOfEmote = matchesinStrNAME.indexOf(getEmotePositionURL);
					getEmotePositionURL = 'https://cdn.7tv.app/emote/' + matchesinStrIMG[indexOfEmote] +'/3x.webp';
				}else{}

				if(getEmoteTimeout > 1){
					defaultETO = getEmoteTimeout*1000;
				}else{
					defaultETO = 8000;
					if(debugon){console.log('default 8 seconds');}
				}

				// set up custom on screen images
				if(getEmotePosition[0].includes('https://') || indexOfEmote != null){
						if (getEmotePositionLC == 'tl' || getEmotePositionLC == 'tr' || getEmotePositionLC == 'bl' || getEmotePositionLC == 'br' || getEmotePositionLC == 'tm' || getEmotePositionLC == 'bm' || getEmotePositionLC == 't1' || getEmotePositionLC == 'b1'){
							if(debugon){console.log('emote poistion LC: '+getEmotePositionLC);}

								switch (getEmotePositionLC){
									case 'tl':
									//duhCommandis, duhimgDiv, duhimgID, duhimgLocation, himynameis, duhEndTime, duhAnimation, duhDelay, duhIMGLoc, duhimgSize
										animateSomething('twitchemote', 'TL', 'TL', getEmotePositionURL, nameofPlayer, defaultETO, 'emoteTL', 100);
										if(debugon){console.log('emote  anim  tl');}
									break;
									case 'tr':
										animateSomething('twitchemote', 'TR', 'TR', getEmotePositionURL, nameofPlayer, defaultETO, 'emoteTR', 100);
										if(debugon){console.log('emote  anim  tr');}
									break;
									case 'br':
										animateSomething('twitchemote', 'BR', 'BR', getEmotePositionURL, nameofPlayer, defaultETO, 'emoteBR', 100);
										if(debugon){console.log('emote  anim  br');}
									break;
									case 'bl':
										animateSomething('twitchemote', 'BL', 'BL', getEmotePositionURL, nameofPlayer, defaultETO, 'emoteBL', 100);
										if(debugon){console.log('emote  anim  bl');}
									break;
									case 'tm':
										animateSomething('twitchemote', 'TM', 'TM', getEmotePositionURL, nameofPlayer, defaultETO, 'emoteTM', 100);
										if(debugon){console.log('emote  anim  tm');}
									break;
									case 'bm':
										animateSomething('twitchemote', 'BM', 'BM', getEmotePositionURL, nameofPlayer, defaultETO, 'emoteBM', 100);
										if(debugon){console.log('emote  anim  bm');}
									break;
									case 't1':
										animateSomething('twitchemote', 'T1', 'T1', getEmotePositionURL, nameofPlayer, defaultETO, 'emoteT1', 100);
										if(debugon){console.log('emote  anim  tm');}
									break;
									case 'b1':
										animateSomething('twitchemote', 'B1', 'B1', getEmotePositionURL, nameofPlayer, defaultETO, 'emoteB1', 100);
										if(debugon){console.log('emote  anim  bm');}
									break;

								}

						}
				}
			}
			indexOfEmote = null;

			// admin only commands
			if(message.includes("!losingmymind")){
				timeOutCHECK = message.split(' ');
				if(timeOutCHECK.length == 2){
					timeOutVidCHECK = timeOutCHECK[1];
					timeOutVidCHECK = (timeOutVidCHECK*1000);
					if(timeOutVidCHECK >= 25000){
						timeOutVidCHECK = 25000;
					}
				}else{
					timeOutVidCHECK = 20000;
				}
				spitaVideo('aVideo','aVideoID','./im_losing_my_mind.mp4', 0.8, timeOutVidCHECK, 'videoTL');
			}

			if(message.includes("!gun")){
				spitaVideo('aVideo','aVideoID','./ivegotagun.webm', 0.4, 2700, 'videoBR');
			}

		}


		// post anything if an admin
		if(adminUsers.includes(nameofPlayer)){
			if(debugon){console.log('adminUser detected');}
			getEmotePosition = message.split(' ');


			if(getEmotePosition.length >= 3){

				getEmoteY = getEmotePosition[6];
				getEmoteX = getEmotePosition[5];
				getEmoteSize = getEmotePosition[4];
				getEmoteTimeout = Number(getEmotePosition[3]);
				getEmotePositionLC = getEmotePosition[2];
				getEmotePositionURL = getEmotePosition[1];
				getEmotePositionC = getEmotePosition[0];
				getEmoteAnim=getEmotePositionLC;
				if(debugon){console.log(getEmotePosition);}
			}

			if(getEmoteTimeout > 1){
				defaultETO = getEmoteTimeout*1000;
			}else{
				defaultETO = 8000;
			}



			if(getEmotePosition.length >= 3){
				if(getEmotePositionC == customShowCommand || getEmotePositionC == customTestShowCommand && debugon){
					//if (getEmotePositionLC == 'tl' || getEmotePositionLC == 'tr' || getEmotePositionLC == 'bl' || getEmotePositionLC == 'br' || getEmotePositionLC == 'tm' || getEmotePositionLC == 'bm' || getEmotePositionLC == 't1' || getEmotePositionLC == 'b1' || getEmotePositionLC == 'custom' || getEmotePositionLC == 'rinoainspace'){
						if(debugon){console.log('emote poistion LC: '+getEmotePositionLC);}

							switch (getEmotePositionLC){
								case 'tl':
									animateSomething('twitchemote', 'TL', 'TL', getEmotePositionURL, nameofPlayer, defaultETO, 'emoteTL', 100, getEmoteSize+'px', getEmoteX, getEmoteY);
									if(debugon){console.log('emote  anim  tl emotesize:'+getEmoteSize);}
								break;
								case 'tr':
									animateSomething('twitchemote', 'TR', 'TR', getEmotePositionURL, nameofPlayer, defaultETO, 'emoteTR', 100, getEmoteSize+'px', getEmoteX, getEmoteY);
									if(debugon){console.log('emote  anim  tr emotesize:'+getEmoteSize);}
								break;
								case 'br':
									animateSomething('twitchemote', 'BR', 'BR', getEmotePositionURL, nameofPlayer, defaultETO, 'emoteBR', 100, getEmoteSize+'px', getEmoteX, getEmoteY);
									if(debugon){console.log('emote  anim  br emotesize:'+getEmoteSize);}
								break;
								case 'bl':
									animateSomething('twitchemote', 'BL', 'BL', getEmotePositionURL, nameofPlayer, defaultETO, 'emoteBL', 100, getEmoteSize+'px', getEmoteX, getEmoteY);
									if(debugon){console.log('emote  anim  bl emotesize:'+getEmoteSize);}
								break;
								case 'tm':
									animateSomething('twitchemote', 'TM', 'TM', getEmotePositionURL, nameofPlayer, defaultETO, 'emoteTM', 100, getEmoteSize+'px', getEmoteX, getEmoteY);
									if(debugon){console.log('emote  anim  tm emotesize:'+getEmoteSize);}
								break;
								case 'bm':
									animateSomething('twitchemote', 'BM', 'BM', getEmotePositionURL, nameofPlayer, defaultETO, 'emoteBM', 100, getEmoteSize+'px', getEmoteX, getEmoteY);
									if(debugon){console.log('emote  anim  bm emotesize:'+getEmoteSize);}
								break;
								case 't1':
									animateSomething('twitchemote', 'T1', 'T1', getEmotePositionURL, nameofPlayer, defaultETO, 'emoteT1', 100, getEmoteSize+'px', getEmoteX, getEmoteY);
									if(debugon){console.log('emote  anim  tm emotesize:'+getEmoteSize);}
								break;
								case 'b1':
									animateSomething('twitchemote', 'B1', 'B1', getEmotePositionURL, nameofPlayer, defaultETO, 'emoteB1', 100, getEmoteSize+'px', getEmoteX, getEmoteY);
									if(debugon){console.log('emote  anim  bm emotesize:'+getEmoteSize);}
								break;
								case 'custom':
									if(getEmotePosition.length == 7){
										animateSomething('customOnScreen', 'custom', 'custom', getEmotePositionURL, nameofPlayer, defaultETO, 'static', 100, getEmoteSize+'px', getEmoteX, getEmoteY);
										if(debugon){console.log('emote  custom:'+getEmotePositionURL);}
									}
								break;

							}
							if(getEmotePosition.length == 5 && getEmotePositionLC != 'custom'){
												animateSomething('customOnScreen', 'custom', 'custom', getEmotePositionURL, nameofPlayer, defaultETO, getEmoteAnim, 100, getEmoteSize+'px', 0, 0);
												if(debugon){console.log('emote  custom:'+getEmotePositionURL);}
												getEmoteAnim = '';
							}


					//}
				}
			}
		}

	} // end of the hidden channel emote lookup
// end of post stuff on screen!<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<




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
// get winners and losers and put them in their own arrays so we can call animations for them later
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

								// In second place, thisguy took a detour but still managed to win 40000 broodlebits!
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

			if(bypassMessage.includes(raceOutcomeMessage_CHEERSIDELINES) || bypassMessage.includes(raceOutcomeMessage_EXHAUSTED) || bypassMessage.includes(raceOutcomeMessage_INJURY)){
									racerName = msgCheck[0].replace('!','').toLowerCase();

									if(bypassMessage.includes(raceOutcomeMessage_CHEERSIDELINES)){
										setOutcomeMessage = raceOutcomeMessage_CHEERSIDELINES;
										setOutcomeAnim = 101;
										if(debugwinlose){
											console.log(101);
										}
									}else if(bypassMessage.includes(raceOutcomeMessage_EXHAUSTED)){
										setOutcomeMessage = raceOutcomeMessage_EXHAUSTED;
										setOutcomeAnim = 102;
										if(debugwinlose){
											console.log(102);
										}
									}else if(bypassMessage.includes(raceOutcomeMessage_INJURY)){
										setOutcomeMessage = raceOutcomeMessage_INJURY;
										setOutcomeAnim = 103;if(debugwinlose){
											if(debugwinlose){
												console.log(103);
											}
										}
									}else{
										setOutcomeMessage = 'idkwtfhappened HELP';
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
			message = '!race';
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


	// spit out a racer when the race is available to enter a racer into the race
	checkMessageisRace = bypassMessage.split(' ');
	getEmotePositionB = htmlMessagePls.split(' ');
  if (raceStarted == 1 && checkMessageisRace[0] == raceMessageTrigger && nameofPlayer != raceOrganiser || checkMessageisRace[0] == raceMessageTrigger && testoneracer == 1 ){
		for(i=0; i<racersInRace.length; i++){
			if (nameofPlayer.includes(racersInRace[i][0])){
				alreadyInRace=1;
			}
		}
		if (alreadyInRace == 1){
      if(debugon){console.log('Racer: '+nameofPlayer+' already exists in the race.');}
    }else{
			nameofPlayer = tags.username;
			racerN2S = racerCount.toString();
			racerID = 'RACER_'+racerN2S;

			getEmotePositionURL = getEmotePositionB[1];
			getEmotePositionC = getEmotePositionB[0];

			if(htmlMessagePls.includes('https://')){}else{
				if(matchesinStrNAME.includes(getEmotePositionURL)){
					indexOfEmote = matchesinStrNAME.indexOf(getEmotePositionURL);
					getEmotePositionURL = 'https://cdn.7tv.app/emote/' + matchesinStrIMG[indexOfEmote] +'/3x.webp';
				}else{
					getEmotePositionURL = raceImage;
				}
			}
			racersInRace.push([nameofPlayer,'runRight',99,getEmotePositionURL,'',100]);
			//call function to spit out a racer on screen

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


	  if (nameofPlayer == raceOrganiser && message == raceFinishedMessage0 || testit == 1){
			setTimeout(function(){
		//	setTimeout(function(){}, 3000);
					if(debugon){console.log("racersInRace: "+racersInRace);}
					if(debugon){console.log("ENDING RACE - total racers: "+racersInRace.length);}

					disDELAY=300;
					// add racers that finished the race with no additional message
					for (i=0; i<racersInRace.length; i++) {
								// spit out a standard finishing racer
								switch (racersInRace[i][2]) {
									case 99:
											racerOutcomesCustom(racersInRace[i][0], 'runRight', 99, racersInRace[i][3],'',disDELAY);
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
							racerOutcomesCustom(racersInRace[j][0], 'runRightWINNER_1', 1, racersInRace[j][3],'',50);

							break;
							case 2:
								if(debugwinlose){console.log("Adding winning racer #2 "+racersInRace[j][0]);}
									// spit out a second place winner
								if(racersInRace[j][4].includes(raceOutcomeMessage_DETOUR)){

										if(debugwinlose){console.log("Adding winning racer #2 as  "+raceOutcomeMessage_DETOUR);}
										racerOutcomesCustom(racersInRace[j][0], 'runRightDetour', 2, racersInRace[j][3],'',50);
								}else{
										if(debugwinlose){console.log("Adding winning racer #2 DEFAULT");}
										racerOutcomesCustom(racersInRace[j][0], 'runRightWINNER_2', 2, racersInRace[j][3],'',50);

								}
							break;
							case 3:

								if(debugwinlose){console.log("Adding winning racer #3 "+racersInRace[j][0]);}
								racerOutcomesCustom(racersInRace[j][0], 'runRightWINNER_3', 3, racersInRace[j][3],'',50);

							break;
						};
					}
					if(debugwinlose){console.log("---------------------START OF LOSERS racerOutcomesCustom-------------------");}
					// LOSERS // raceOutcomeMessage_CHEERSIDELINES // raceOutcomeMessage_EXHAUSTED // raceOutcomeMessage_INJURY
					for (j=0; j<racersInRace.length; j++) {
						switch (racersInRace[j][2]) {
							case 101:

								if(debugwinlose){console.log("Adding fallenRacer racer raceOutcomeMessage_CHEERSIDELINES");}
								racerOutcomesCustom(racersInRace[j][0], 'runCheerSidlines', 101, racersInRace[j][3],'',50);

							break;
							case 102:

								if(debugwinlose){console.log("Adding loser racer raceOutcomeMessage_EXHAUSTED");}
								racerOutcomesCustom(racersInRace[j][0], 'runRightExhausted', 102, racersInRace[j][3],'',50);

							break;
							case 103:

								if(debugwinlose){console.log("Adding loser racer raceOutcomeMessage_INJURY");}
								racerOutcomesCustom(racersInRace[j][0], 'runRightInjury', 103, racersInRace[j][3],'',50);

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
		testit = 0;

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
	message = '!heist';
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
});

//spitaVideo('video','video','./ivegotagun.mp4', 0.02, 3000);

matchesinStrIMG = [
    "6040a8bccf6746000db10348",
    "60ae2440aee2aa553892c5f5",
    "60ae65b29627f9aff4fd8bef",
    "60aec2196cfcffe15f4e4f93",
    "60aee9d5361b0164e60d02c2",
    "60afbe0599923bbe7fe9bae1",
    "60f60bbde57bec02167a7a97",
    "60f9195d15758a7f9a487acf",
    "60f9197ae57bec0216aaa1c3",
    "6161fe69f7b7a929341230f8",
    "6192f45217e4d50afc0db0bc",
    "620d291221b4d5de1446ccd7",
    "60c077182cd9f8855750a045",
    "6128323ce95a42acda56ee8e",
    "60ae8d9ff39a7552b658b60d",
    "60e857ca401af27eed2f6a4e",
    "60aebc35e04200b3d12fbc40",
    "60ae8e7098f42914701ed1c9",
    "60ae63c49627f9aff4dd2d2a",
    "621a55bc7f7ec26e095e024e",
    "60d6e5b693acf4cdf0ecebd8",
    "61715defffc7244d797cac50",
    "61620172c1ff9a17cc394ef9",
    "61b698c6d3f1830abc23dd44",
    "618302fe8d50b5f26ee7b9bc",
    "6128e290543b8a5dea5a3fc6",
    "60afcb1812f90fadd6e9dea5",
    "61b8a8467f325a4eb6e859ea",
    "60afb45412f90fadd65fb1a8",
    "60be7f41ae67b5b98b425a70",
    "631f025d881bc7c4f481ac34",
    "6337ad657427a4d3e7542be2",
    "6338a580d149695f4ca3114e",
    "60ae89d4f39a7552b629270e",
    "60ae958e229664e8667aea38",
    "603cb5e1c20d020014423c68",
    "613937fcf7977b64f644c0d2",
    "60df59d350830d688a9777ad",
    "61b1bb6affa9aba101bd83d5",
    "62162fc778f6e57762f9bbf2",
    "616839d9e7db9b760346a2da",
    "609ee21a326f0aaa859f534f",
    "6040aa2dcf6746000db1034d",
    "60af0d7984a2b8e65590787e",
    "6361353568b10891cf0c11bb",
    "6105de63a32b8c587a52a21f",
    "618865078d50b5f26ee84398",
    "61c0b92aca95dd3275b8bca5",
    "60b419bbcee8616bdeec9a85",
    "60aecb385174a619dbc175be",
    "632b50cec7950e03fc6ee844",
    "60cde0a12b0e577603bc124d",
    "614f531d20eaf897465a5d48",
    "611e8a8b95ab6c6c0e2f96f1",
    "6352cdc8b420a30c77ee0e31",
    "61e438ea77175547b4257e8b",
    "62e45f5e207292bf0e3df06e",
    "615710f7dc267a3441812656",
    "63812707b88c4be9814dad3c",
    "63813eb1abbb5b51a3aa5d75",
    "60b34274ae6bde0243f01192",
    "61759e905ff09767de2a2b76",
    "63265a6cb2e31c945a542314",
    "60ba145c31abfff37bd0d280",
    "63a3be1f90a72100283a6417",
    "636065c6b894df4ff0825041",
    "63aec0fd21cb0cf135fe3a76",
    "638767f24cc489ef45239272",
    "611523959bf574f1fded6d72",
    "60b28a0f74fa85b952ee7afc",
    "6063d9f8f4dc10001426b946",
    "61b5bfef523b4785d7c20537",
    "60b06197aecc11e86c17c012",
    "61340e6ff1ff750fb9b4f550",
    "6129bd94fd97806f9d734979",
    "618c174cb1eb03daac7d2a92",
    "6306c45e170b2d3c2cfc5f2f",
    "62e083ab03ee088f39ab3424",
    "6327bd4eec8b9a4484b36bd5",
    "624bd1ad04157e256e71be7b",
    "609eec6ab55466cf074f6c78",
    "60dbea82e3e5887a4a95e1db",
    "60411e5bcf6746000db10353",
    "60baca0a3285d8b0b8a051c9",
    "60538d8e9d9e96000d244f90",
    "62f1f34b1de84f086742bbf4",
    "61b42fd475e70d5ab2954813",
    "603cb8be73d7a5001441f9ad",
    "60af514e98efcb4f69c39af3",
    "60ae8908ea50f43c9eddb8f1",
    "60b756ea1b94ba7313c8ecd5",
    "60a76ac5ac0862284604c1b5",
    "60b3e0697f6c762023cb4dbe",
    "632b4ff9c7950e03fc6ee825",
    "60ae547a0e35477634e854ba",
    "610a6d9249dcebc8a3924e20",
    "60b89962f09ea88072c322e6",
    "634da33e7cb0ea10c19633dd",
    "60b02b39b3e1671e27817ff5",
    "60b0d286726e10b664ec6082",
    "60b53588efac5fc71868caca",
    "61ad26dc15b3ff4a5bb99b43",
    "60b1d76561df920001eadaaf",
    "60b0c44b7ec2882b3ddde51b",
    "60d3fe8a8090e67e365d9cf6",
    "60ca86d0f411fca3bb1a5a72",
    "61eabcc01a1b2a6e7324a8ae",
    "60afc6e512f90fadd6cda2ca",
    "6212972221b4d5de14471451",
    "60c7bc7cc6eb5762767a73ab",
    "60bce7379274c892089a02ee",
    "636dc33631856e9c6734e2db",
    "6042521e77137b000de9e6ae",
    "62374a3a5adeefc2383fddf2",
    "61e67ed73441abfa431d23de",
    "6126d58f735a5b1785121bd9",
    "63272ad31e9f2f8cdb34114b",
    "60d15f98cb23a983f0aa379c",
    "636531e48ed289fb207f21e1",
    "60b298b8bc491a606373df0c",
    "624c1d4f19cc1e81db884235",
    "60eafa31f9e2199b785cace7",
    "60aea112f6a2c3b332e50ac4",
    "60b8dc551b94ba73139efcaa",
    "60ca42ed9fd6791bfcb704d4",
    "61db6c7582d5237d67962ae8",
    "60b5634fd0ebfffaa42c11f0",
    "60b9120a06e1b089740e1b97",
    "60d174a626215e098873e43e",
    "60ffc47377fe844726ddcca6",
    "60af4eba84a2b8e655e1a1cb",
    "6129955ea1c4f9adca3fe6be",
    "6116879e47935f36575c7af7",
    "61bcec90fba91c72ead72832",
    "610d89f23f3e99ddb46261ff",
    "61c574951cc80462ef2d12dd",
    "62935d2cf75a73adfdc29b10",
    "62523dbbbab59cfd1b8b889d",
    "6266abe652691b69d9c62470",
    "618c570bb1eb03daac7d332f",
    "6145e8b10969108b671957ec",
    "635449e3c3f9e36929378e9e",
    "60aed217c9cf495e5be86812",
    "60aeaf8b98f4291470c8e64b",
    "630083e98efed587408a963f",
    "6127caf3f4c3058a13f36708",
    "60b14a737a157a7f3360fb32",
    "612695557606e65e4f68b1ab",
    "60ae4c510e354776346de9f7",
    "60ca23af2ba45e98f05ba95f",
    "619fffbbffa9aba101bb1bfc",
    "60af990d566c3e1fc9d26c93",
    "61ecd864cc9507d24fd4c921",
    "61070777e1f0b0767ef789d7",
    "60ae4bb30e35477634610fda",
    "60ae4bc55d3fdae583d93f34",
    "60b10835f12983cd1da8eae3",
    "60b4fd124eb0019aa6ed4ec7",
    "60afbab3199b90afe4b56399",
    "60420e5a77137b000de9e676",
    "603eace1115b55000d7282db",
    "60afc1ad99923bbe7f017491",
    "603cac391cd55c0014d989be",
    "60b929f61b94ba73138e6386",
    "60aeb21b6cfcffe15fde678b",
    "60b12ef78149943f87aaaed9",
    "6249532d489aff3c6b0a8784",
    "603cc27e2c7b4500143b46c3",
    "60db33899a9fbb6acd26b151",
    "60af769d2c36aae19e32ec9d",
    "60b97dcd1299371678b20d40",
    "61ce4200f644a864b441cb2e",
    "60420ac577137b000de9e66f",
    "60aeeb53a564afa26ee82323",
    "60aeed117e8706b57214d2b2",
    "62b789f0765d72b656d72c46",
    "60b76f325d373afbd666d5db",
    "60b39a8108605b0ad35b2388",
    "60afc2eaa3648f409a82e80b",
    "60af9e3b52a13d1adb78e15e",
    "6072a16fdcae02001b44e614",
    "60b13fb04cf6f63c4624283e",
    "60afa6a812f90fadd60a6b84",
    "61fc72e7690425de3c63cdf2",
    "613536b462812a22eea45738",
    "60b0da7051b8e4c671e129a2",
    "60b12f078149943f87aada70",
    "61d252cf752f555bcde954f4",
    "60b02787b254a5e16bf4074e",
    "6356c2c94a67775e8d99c84f",
    "60d458d2205cf63c7ef472f5",
    "6286c27d63c9f9d7aaa3920e",
    "62effc57fdc408d6e79c4371",
    "63f80596f8070da4e44be6fd",
    "63f807fa0588a70e9a8d967f",
    "63f8096d48d607ec9b989cbe",
    "63f9283717478c0c59fc5c8c",
    "63f92ad0f8070da4e44c01f6",
    "60cfa89c7dbacc0b7d5c3c6d",
    "63faa32149184efad4d92505",
    "62671b227d99707cc88b7e69",
    "63a8d3d9c05f5803112d8218",
    "60b20f102641b8fa98e353d7",
    "62c02c2cc2b63d1e2f3d8782",
    "6268904f4f54759b7184fa72",
    "60ccfd5ec86334d9238be85a",
    "61d33fec88ca5a6bf6751900",
    "61dfd1e86e676399a0ff66cf",
    "60ae44b70e35477634263baa",
    "640deffefb5ce8e048c2c440",
    "640df7f0c08f1a0f223c9f29",
    "60ae3bbcaee2aa55381e1544",
    "612ec9a82c57c451cc05586e",
    "61e66081095be332e347e5a4",
    "60fa3c894c5d42dbbca559e4",
    "611cb0c5f20f644c3fadb992",
    "61efd805c14a21709861694e",
    "60eb498ccebc4f6e1f0a078d",
    "6370471e8526355f55536068",
    "641086d2c65189debe0f5ad6",
    "64108783a1db99f27d318b7b",
    "60845a505e01df61570a6f1d",
    "60ae21d3259ac5a73eaa4b93",
    "60f7584b15758a7f9a8fd0a9",
    "60ae46005d3fdae5839807be",
    "621640fc78f6e57762f9bc88",
    "60a487509485e7cf2f5a6fa7",
    "60af418198efcb4f69410b17",
    "60ae4eee5d3fdae58314148d",
    "60ef0681f56d067b54cc121b",
    "63b32164e3d4e60c9b8659ef",
    "60aeddffb38361ea914c86f9",
    "60b00d1f0d3a78a196f803e3",
    "6275a1fda6b8dd31aca7aea1",
    "636f7affa346a636425e14e6",
    "62292186043b2a353ec8a53f",
    "60b7ef8a55c320f0e87437fc",
    "61404db4962a609048645e2b",
    "60b3ef57b109253798b0363e",
    "60c96e6ce183948162ecf30b",
    "60eefddf2c24e9e0e6ec9141",
    "629f7ed33cfb54ec859bb216",
    "60ba5b527955f57f43179793",
    "63f3f37b0fd141cefb0855c8",
    "63f2a32404e4a9fd8ee11043",
    "61433e7d962a60904864b0dc",
    "63e8c48697d8b53b818fc4ac",
    "639ae69c6364fad576b0ea0d",
    "640ea8dfdc8b8abcd9e0227b",
    "62994ca54b77f2f753fb827e",
    "63eeda7a1471b8a35936a81d",
    "63ee827e1471b8a359369da8",
    "636ae3175281879f7bd532c4",
    "62e5e3c105e2ed080d60820e",
    "62b05c37454b0130fba34074",
    "629c38bd773ae14f4c321efa",
    "620de7fc21b4d5de1446d7d2",
    "631dfbaa5a703c4a98db4b3f",
    "63c7ac73fc866ebbc80ae7d9",
    "60bc8bb7824feec0de8f94cc",
    "60e6ca5b840f3a570150272d",
    "638932927b2a3dcf8908041f",
    "60cbce945348df16a12ef149",
    "6414f590220f8400b8784280",
    "61a9c14015b3ff4a5bb92c93",
    "63dcb6afaa8f036a3bec2f2e",
    "6410fb59f99ff93d226047f7",
    "63b3da0fea4ff639df12720e",
    "60ae7316f7c927fad14e6ca2",
    "60b231dafdd2d7d7bd7d5d9d",
    "60e5a8daa69fc8d27f33f36a",
    "64121289e4e1bc1ce51b6a58",
    "60af957299923bbe7ff61a37",
    "634d8e17b7b4df3fe1a65d6c",
    "619c5fd0eecae7a725bc85c2",
    "610c3869af4c21f757f04279",
    "624a0c4ffba06b9273b2eaec",
    "60b27a4a6fa46cea3c8772ab",
    "6101e17eea16b1136943bd36",
    "630db7e07b84e74996da9552",
    "64199d8f717cf669038c0bdb",
    "63e60a5442fca6a33f09999c",
    "64096927200ebb849852b6b8",
    "641b94effdd6b1a122189bd2",
    "641ba2302632d8d9a76e56f3",
    "60af0552361b0164e65cdea0",
    "613e53bd0969108b67189a7e",
    "614133d50969108b6718e37f",
    "63dff7951d40a5212f9a8796",
    "64206049d9a6d7994925dbe8",
    "63a64dcb840c3390c8e4038d",
    "641ad31acb534572d623341c",
    "63db7a0a04caf075b3546b74",
    "6301fdaff7723932b45c08b1",
    "60fbc20c4653f5d6c1afa451",
    "60e38766e2a51883fc499dd5",
    "63882e9d346422503a288b5e",
    "63dc32f4a039b6522cdd4202",
    "63defe90efb47752e7c37d8a",
    "63b72a5dc57736fec02f9363",
    "63cb2423dedb49b24383cf6f",
    "61ce7a7209aa5c2957261afb",
    "61a7ba93e9684edbbc37cffc",
    "61f0fbecc14a2170986194e7",
    "620a16a4b015a89311a7e2d8",
    "6385c499edf329ec0cf3e5ed",
    "60af0476a564afa26e5a5f7b",
    "6106495162ceea408a681afd",
    "633e1cceb3723828343b54e1",
    "6435d5fd7bd689356b665f81",
    "62b4a06e20f29b83b4e37b05",
    "6318b75d4f3e0f1fc59f30c2",
    "60c669d73d216f27825d7332",
    "60b2b63c019c994a3a93f66c",
    "632b4e0c5820e449ae4d290b",
    "62004a7ec1817e22b70aeada",
    "634edc456901e36f253a7d0d",
    "62716e12f29e0ff8201bade9",
    "640d3945acdceb8629bac367",
    "6150c69843b2d9da0d329847",
    "62eef5eb86641731d4d38a96",
    "643d3c98f59feae94a925701",
    "628f6a3fa055952fdc3b9e15",
    "63c0a132a9d1c43d235a6411",
    "626b8ebb7f2636d24f9d2562",
    "60b1dbb1fdd2d7d7bdf6e0c3",
    "60560bceba9052000d450655",
    "64428f13a9f9fb7c5f27c47a",
    "62d10915f8e7b0a5993a7090",
    "6435d7b6872aced0e7d7b865",
    "63f02bd78e2c12d52f843ce9",
    "6404af5985fbda46564f38c4",
    "63d2df40cd611db1717b420f",
    "636ff14356c8c85a263c0037",
    "63f4346b0fd141cefb085cae",
    "63da116254caa117064ebcd3",
    "628ef1b5a055952fdc3b97eb",
    "644365c4ea20769d28992b90",
    "62cafd8c004dd4ed9b4c55dd",
    "6444cf7e661895a026776797",
    "62685bf17d99707cc88b91b0",
    "644ebcd35b04659488dcba98",
    "63c987e4756fc5b80dce2ac0",
    "6435d78b461ddfc91d981025",
    "63d193c9814f64e4b4840b7d",
    "6292b500f75a73adfdc29316",
    "6255dc78c2be2d716f88cf4f",
    "62263229b825598c205cde24",
    "61a6fa6815b3ff4a5bb89b5e",
    "64079c0767f0badff747a15d",
    "60ae2e3db2ecb01505c6f69d",
    "61c0ef403040822c38adb398",
    "646f7435361980b8f0056ee0",
    "646f73a56989b9b0d46c694c",
    "6143a5bd962a60904864bec5",
    "647558d661d5da625fd8b341",
    "610771cb0701b782945e5f3d",
    "648a8d737a4f1ddae9b3a8cd",
    "64a959126d4c4af9e2e486f9",
    "64ac210232cac9e8d5d1a4ce",
    "61be2073804fba4ebdc7cc3a",
    "644994ec5d618f7d39221063",
    "6141062d0969108b6718de66",
    "634029deb3723828343b7da4",
    "60f9cac74c5d42dbbcf809ca",
    "61f5a7454f8c353cf9fbde43",
    "60a95f109d598ea72fad13bd",
    "60bec401d1ee93078eff765b",
    "603ea1c1284626000d068884",
    "622be791cb65b2eb65c05453",
    "603eaaa9115b55000d7282d8",
    "63f53bd5f2915b442ca852b6",
    "60df66a650830d688a1e6f88",
    "636d4dbc6e1556edb463e0a6",
    "60b04002ad7fb4b50bb07974",
    "60bf85105b60d5b73f716cdd",
    "60e8604577b18d5dd3f3bed2",
    "62a615c11f73502be928ec5f",
    "64419b76db37f913eeddceba",
    "6143ebfb962a60904864c7cb",
    "64d4f479f33f4a0a09314416",
    "64d50050507a9267faee3454",
    "64d76b5fce66789fe380131d",
    "64d9f32d28901aea7c368eb1",
    "64d647e288bdc777fb1b5db9",
    "64d8f4712a79a5cd648bd0af",
    "60b1419cd6ed68b73f728eb7",
    "6175d52effc7244d797d15bf",
    "64e28ec0962e89af7f7f0409",
    "60abf171870d317bef23d399",
    "639c768c1b2469342e123fee",
    "612804437c13f3176fcc3bb3",
    "6143ec367b14fdf700b93294",
    "63b77cae9d5b1683fdd05d21",
    "638953f33d2d08bfadd8fc12",
    "60b8992ef09ea88072c27374",
    "64fa59479524349b3b8b1bef",
    "6108a4bd569a3002abab0043",
    "60e5bd3ebb6f082cf9cc983d",
    "642b7201031dd9afa10c5b3f",
    "6346e1b78cb0dce8e422b05a",
    "6209228eb015a89311a7d899",
    "615710a2dc267a344181264c",
    "63befa0f23e3c08ccb765d80",
    "613a7c3ed39af29b8b6e82f2",
    "60b355e82c1f0251fe0843cb",
    "60b75ba655c320f0e86936c9",
    "613fa148962a609048644900",
    "60b3319e2c1f0251fe58dcda",
    "60d431e38090e67e368eb5df",
    "62004b0da1ff29b7a4ad0f6d",
    "60d206010256ae65b763a1fd",
    "60ff28fe3fb9660f473eb3a9",
    "64a4f7166b69e1b647fd7610",
    "6379c15d209145aa688bdb38",
    "61b09f70e9684edbbc399e2e",
    "62ccbda5d94af3fa53a0654b",
    "6306e02ab7e5a120600a3d3e",
    "61c116b76a7bb904818ffa65",
    "61558f5a6251d7e000db24fc",
    "646b6fec6989b9b0d46ba14a",
    "63cac54eec685e58d172a73d",
    "652b059124565c1d0e386928",
    "652b09a977aac7d817e9cd4a",
    "61b2867615b3ff4a5bba3c95",
    "63be1891a02b5c2d1f55b49f",
    "63c56fc3dedcfdd2e2b5d85a",
    "652ada25f9e9ea445229a6bc",
    "64674a7358d599a0419f49d7",
    "63a3087be323a72ad0c9415f",
    "60aeabbef39a7552b6b2cf19",
    "60dfd3536a1ba0df21931b15",
    "61a00d3cffa9aba101bb1dac",
    "64ca8f409365352345de8d49",
    "6120591750b2c0a24705f1b9",
    "61794172e0801fb987881f10",
    "6100b8ce979b8461475fcb0d",
    "63403b21b3723828343b8076",
    "618e89e2d34608492cc2ed9b",
    "61e61ae73441abfa431d1854",
    "650dfb6258b80a4d09f0fae6",
    "60aea05e4b1ea4526df62906",
    "63779741da38f5d7f3d6d3db",
    "60b034f2b254a5e16b21a370",
    "646e9c776989b9b0d46c4949",
    "63c51e5ed98b878bc84c4766",
    "60fdfd6925bb6dd0b0fecd1d",
    "60ae4f0a5d3fdae583146082",
    "623c29a61aeb248de8494e7c",
    "64c0ace7a5d8bb8469765144",
		"61a2dde815b3ff4a5bb80da2",
		"60a9cfe96daf811370b0b640"
];
matchesinStrNAME = [
    "pepeJAM",
    "NOTED",
    "NOOOO",
    "Prayge",
    "WICKED",
    "POGGIES",
    "Pacepal",
    "PeepoPacePal",
    "peepoPacePalLeave",
    "1stCycle",
    "PacePalConfused",
    "NOsteal",
    "Catge",
    "donkSailing",
    "Bedge",
    "Wokege",
    "donkJam",
    "pepeJAMJAM",
    "DrumTime",
    "AYAYA",
    "FeelsWeakMan",
    "AnkhaPls",
    "donkCult",
    "HIDEOKOJIMA",
    "HUHH",
    "Wat",
    "DESKCHAN",
    "pepeLost",
    "monkaHmm",
    "SNIFFA",
    "TetraHYPE",
    "TetraNOOOO",
    "WiseTree",
    "widepeepoHappy",
    "GIGACHAD",
    "dinkDonk",
    "xdd",
    "DIDSOMEONESAYCOCK",
    "OMG",
    "LICKA",
    "catPunchU",
    "peepoS",
    "PianoTime",
    "SaxTime",
    "VEGAN",
    "Chatting",
    "wherez",
    "Sippin",
    "Backseating",
    "meow",
    ":3",
    "monkE",
    "ChugU",
    "badlandsEcks",
    "POGGERS",
    "CUM",
    "SAVED",
    "WoweeStudy",
    "Thonking",
    "TheOtherWay",
    "ppL",
    "SpamJam",
    "spamDance",
    "Ratge",
    "ffx2-hypello-dance",
    "WideJigglin",
    "AMOKING",
    "peepoShy",
    "DIESOFCRINGE",
    "BorpaBeLickinDaBUSSERS",
    "GoodTake",
    "PepoG",
    "ItalianHands",
    "PepegaPhone",
    "PeepoChef",
    "SadgeOfACliff",
    "pogMike",
    "CRINGE",
    "cocojuicingUP",
    "Kissahomie",
    "spilledGlue",
    "RIPBOZO",
    "Binoculars",
    "FLASHBANG",
    "PawgChamp",
    "Jigglin",
    "AYOOO",
    "arnoldHalt",
    "cowJAM",
    "Tastyge",
    "doggoArrive",
    "StopStreaming",
    "COPIUM",
    "HYDRATE",
    "TwitchTV",
    "lol",
    "dogeDance",
    "peepoCheer",
    "CATBEDOINGTHELAUNDRY",
    "borpaLick",
    "OHNYOCATJUSTDIEDPEEPOSAD",
    "monkaMath",
    "DuckHowdy",
    "monkaEXTREME",
    "Pepegaphone",
    "whitepeopleHappy",
    "NOW",
    "apuBand",
    "pojjies",
    "DogLookingSussyAndCute",
    "DONUT",
    "fricc",
    "FuckingYourMom",
    "koklick",
    "StareArrive",
    "cumJAM",
    "hardstuck",
    "monkeySpin",
    "Rupert",
    "ThisChat",
    "WideAmongUsGaySex",
    "GIRLDETECTED",
    "billyAwake",
    "BeanPls",
    "ANYGIFTERS",
    "BARKBARLBAKRBARKGRRRR",
    "WEEBSDETECTED",
    "FishJam",
    "yoshiBonk",
    "peepoArrivePointLOL",
    "Blessahomie",
    "NOHORNY",
    "catShh",
    "peepoyeet",
    "duckDance",
    "IMGONNALOSEIT",
    "MeAndTheBoysWatchingMorbius",
    "Joel",
    "GAME",
    "Wankge",
    "Aware",
    "Awoken",
    "Clap",
    "COCKA",
    "Coffee",
    "CUMDETECTED",
    "Clueless",
    "Corpa",
    "GuitarTime",
    "Libido",
    "Looking",
    "MLADY",
    "Madoora",
    "MorshuPls",
    "NODDERS",
    "NOPERS",
    "POGCRAZY",
    "POGPLANT",
    "POLICE",
    "PepeHands",
    "Pepega",
    "PepegaCredit",
    "Sadge",
    "SkeletonPls",
    "Smartge",
    "SpeedL",
    "TRASH",
    "WeirdChamping",
    "Wheel",
    "YEP",
    "catDisco",
    "chickPls",
    "gachiRoll",
    "monkaSTEER",
    "monkaX",
    "moogleH",
    "nutTasty",
    "OcarinaTime",
    "peepoArrive",
    "peepoRun",
    "pepeD",
    "pepeP",
    "pepeSmoke",
    "pepeStepBro",
    "CloudJam",
    "BANGER",
    "SpeedR",
    "Grampge",
    "DANKHACKERMANS",
    "jol",
    "Blyatge",
    "SKIP",
    "Goldge",
    "STEPPYSTEPPIES",
    "CHICKENYEET",
    "COCKLAUNCH",
    "grandmaSTARE",
    "PayRespect",
    "lebronJAM",
    "jolSlow",
    "DGNOPERS",
    "LETHIMCOOK",
    "Brows",
    "hmmMeeting",
    "ok",
    "OhayoTruck-Kun",
    "COCK",
    "SICKOS",
    "AlienCapoeira",
    "HYPERJOL",
    "microjol",
    "pepeSenora",
    "peepoFiesta",
    "kok",
    "Yump",
    "HYPERYump",
    "WideYump",
    "BigYump",
    "peepoTorrent",
    "fook",
    "foko",
    "borpaSpin",
    "BorpaU",
    "CHUGLEPSY",
    "AlienAbduction",
    "gooseJAM",
    "KEKW",
    "monkaGIGA",
    "TeaTime",
    "Toxic",
    "mmHmm",
    "monakS",
    "ratJAM",
    "antmanE",
    "PETTHEGIBLE",
    "Fight",
    "ThisIsFine",
    "HeHeHe",
    "peepoBOOM",
    "peepoCoffeeShake",
    "peepoComfy",
    "peepoLeave",
    "OOOO",
    "LamiaBruh",
    "lamiablahaj",
    "Milk",
    "barreljol",
    "veryCat",
    "joldanse200",
    "Joeler",
    "Joeler2",
    "WideJoelerJam",
    "JoelbutmywindowsXPiscrashing",
    "EvilJoel",
    "JUSSY",
    "JoelSlowest",
    "MiniJoel",
    "DapperJoel",
    "JoelBusiness",
    "stopbeingMean",
    "peepoCheering",
    "worming",
    "GNARLY",
    "SadgeIntoSpace",
    "Tuckahomie",
    "JoelTeachingHisSonJolHowToSpinWhileWideBorisPassesByButMyWindowsXPKeepsCrashing",
    "JoelBiden",
    "COCKING",
    "catJAM",
    "peepoFlute",
    "peepoPooRocket",
    "peepoRocket",
    "PEPELEPSY",
    "peepoShyButPeepoHasToFeedHisFamily",
    "MarioBANhammer",
    "peepoAmigo",
    "SMILERS",
    "BOOMIES",
    "KEKWLeave",
    "classic",
    "Cidff9",
    "peppinoSip",
    "MENUING",
    "Food",
    "Dancing",
    "Smoge",
    "greenman",
    "Troll",
    "BassTime",
    "CUMMM",
    "tidusPopoff",
    "WhatAreYouBuying",
    "FFXAuron",
    "Bleggs",
    "duckPls",
    "duckPlsHYPER",
    "tuckk",
    "eatt",
    "gigl",
    "nolook",
    "untuckk",
    "bomberPls",
    "peepofakelove",
    "CHOMPER",
    "WankgeArrive",
    "Cards",
    "BoneZone",
    "BOMBERMAN",
    "britishpeoplehappy",
    "bw3monkasteer",
    "RESETTING",
    "youDied",
    "Poorge",
    "CatAHomie",
    "NICECOCK",
    "wow",
    "PUKERS",
    "peepoSitOnMyFace",
    "nice",
    "hehe",
    "SLORPGLORPIN",
    "!race",
    "clapped",
    "DeathTogether",
    "LifeTogether",
    "goosePls",
    "ElNoSabe",
    "chocoRace",
    "IDIDNTHEARNOBELL",
    "MC_coffee",
    "plunk",
    "plenk",
    "plonk",
    "plink",
    "pleep",
    "crunch",
    "BirdgeArrive",
    "CornMonkaSteer",
    "CountryBoys",
    "JohnJAM",
    "GL",
    "squiffy",
    "TifaFeet",
    "westoopid",
    "OverSlept",
    "MMMMArriveThenOOOO",
    "Psyduck",
    "Nuggetahomie",
    "slapahomie",
    "DAMN",
    "ViolinTime",
    "CelloTime",
    "tifarrr",
    "aerwoff",
    "YAMERO",
    "corndog",
    "PantsGrab",
    "YEEHAAAAAAW",
    "zellSUCC",
    "laniPLZ",
    "lmao",
    "ralvWiked",
    "peepoFeet",
    "NAHHH",
    "catClap",
    "Streaming",
    "Madge",
    "Kissabooba",
    "HandsUp",
    "rockJAM",
    "Pog",
    "SkillIssue",
    "Sludge",
    "SmokeTime",
    "peepoJail",
    "maaaaan",
    "apeJAM",
    "finishHim",
    "Birdgecute",
    "lookUp",
    "!steal",
    "!heist",
    "elevator-manip",
    "bdewdSus",
    "fishahomie",
    "CUMMMV2",
    "PogTasty",
    "GAMBA",
    "slorpCALYPSO",
    "modCheck",
    "HesAComin",
    "CATBOOBS",
    "lookDown",
    "SCATTER",
    "Suffering",
    "KoolDoge",
    "mcLeave",
    "AAAA",
    "KermiePls",
    "YEECLAW",
    "NotLookingAtBooba",
    "lookingR",
    "WoweeG",
    "WHOLETHIMCOOK",
    "CosmicBrain",
    "peepoDetective",
    "Smadge",
    "pepoJS",
    "peepoBox",
    "Deadge",
    "Boorpa",
    "RapThis",
    "peepoSax",
    "plinkVibe",
    "wideDvaAss",
    "gloverD",
    "STREAMERSGIVINGTHEWORSTFUCKINGTAKESINEXISTENCE",
    "SCAMMED",
    "egirlkiss",
    "OMEGAHOLE",
    "BOOBAPEEKING",
    "cryJAM",
    "!gamble",
    "steinAA",
    "Mage",
    "lookUpS",
    "lookBoth",
    "CornBop",
    "CAUGHT",
    "Sure",
    "POOTERS",
    "TOOMUCHBOOBA",
    "boobaHeart",
    "owoBOOBA",
    "boobaCheck",
    "BOOBA",
    "POOPA",
    "GAMEPLAY",
    "ABUGA",
    "Aerith1Head",
    "ABOBA",
    "MODS",
    "catErm",
    "CLEAN",
    "BangBangBang",
    "Rotisserie",
    "peepoSnow",
    "catJam",
    "angy",
    "MeAndTheBoysWatchingFF9SpaceScene",
		"spinofdog",
		"donowall"
];
animateSomething('customOnScreen', 'custom', 'custom', 'https://cdn.7tv.app/emote/622f82622cbc7e45d4cac28f/4x.webp', nameofPlayer, 2, 'static', 100, '100px', 0, 91);
