let modInfo = {
	name: "The SoliTree",
	id: "cardgamesucks",
	author: "pixelperfect12",
	pointsName: "card progression",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "Forge+ Update",
}

let changelog = `<h1>Changelog:</h1><br>
	nope i'm not using this`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (!hasUpgrade('f', 12)) {
		if (hasUpgrade('c', 21)) gain = gain.plus(3)
		if (hasUpgrade('c', 22)) gain = gain.plus(3)
		if (hasUpgrade('c', 23)) gain = gain.plus(3)
		if (hasUpgrade('c', 24)) gain = gain.plus(3)
	} else {
		if (hasUpgrade('c', 21)) gain = gain.plus(6)
		if (hasUpgrade('c', 22)) gain = gain.plus(6)
		if (hasUpgrade('c', 23)) gain = gain.plus(6)
		if (hasUpgrade('c', 24)) gain = gain.plus(6)

	}
	if (!hasUpgrade('f', 11)) {
		if (hasUpgrade('c', 11)) gain = gain.times(2)
		if (hasUpgrade('c', 12)) gain = gain.times(2)
		if (hasUpgrade('c', 13)) gain = gain.times(2)
		if (hasUpgrade('c', 14)) gain = gain.times(2)
	} else {
		if (hasUpgrade('c', 11)) gain = gain.times(4)
		if (hasUpgrade('c', 12)) gain = gain.times(4)
		if (hasUpgrade('c', 13)) gain = gain.times(4)
		if (hasUpgrade('c', 14)) gain = gain.times(4)
	}
	if (hasUpgrade('c', 31)) gain = gain.times(upgradeEffect('c', 31))
	if (hasUpgrade('c', 32)) gain = gain.times(upgradeEffect('c', 32))
	if (hasUpgrade('c', 33)) gain = gain.times(upgradeEffect('c', 33))
	if (hasUpgrade('c', 34)) gain = gain.times(upgradeEffect('c', 34))
	if (hasUpgrade('c', 61)) gain = gain.times(upgradeEffect('c', 61))
	if (hasUpgrade('c', 62)) gain = gain.times(upgradeEffect('c', 62))
	gain = gain.times(new Decimal(2).pow(getBuyableAmount('f', 22)))
	gain = gain.times(buyableEffect('f', 31).plus(1))
	return gain     
}
function ironAmount() {
    let iron = new Decimal(1)
	if (hasUpgrade('f', 31)) iron = iron.plus(upgradeEffect('f', 31)) 
	if (hasUpgrade('f', 32)) iron = iron.plus(upgradeEffect('f', 32)) 
	if (hasUpgrade('f', 33)) iron = iron.plus(upgradeEffect('f', 33)) 
    return iron
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	CopperLimit: new Decimal(10),
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
	CopperLimit = new Decimal(0)
	points = new Decimal(0)
}