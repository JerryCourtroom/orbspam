/*
    Orb Spam (JavaScript Game)
    Creation Date: 6.13.25
    Author: JerryCourtroom
*/

//Note: Always use script tag to link index.html with script.js!
var tabTitle = document.getElementById("tabTitle");
var home = document.getElementById("home");
var numOfOrbsElement = document.getElementById("numOfOrbsElement");
var firstOrbMessage = document.getElementById("firstOrbMessage");
var strangeOrbMessage = document.getElementById("strangeOrbMessage");
var investigateFirstOrbButton = document.getElementById("investigateFirstOrb");
var investigateOrbCooldownMessage = document.getElementById("investigateOrbCooldownMessage");
var investigateOrbCooldownTimer = setTimeout(investigateOrbCooldownControl, 1000);
var numOfOrbs = 0;
var orbsPerClick = 1;
var firstOrbMilestone = 100;
var investigateOrbCooldown = 10;
var reachedFirstOrbMilestone = false;
var obtainedFirstOrb = false;
var investigateOrbCooldownFinished = false;

//displays first orb congratulation message to user only once
//user obtains strange orb on the 100th orb collected
function getOrb() {

    numOfOrbs += 1;
    numOfOrbsElement.innerHTML = "Orbs: " + numOfOrbs;
    if (!obtainedFirstOrb) {
        firstOrbMessage.innerHTML = "You found an orb!";
        firstOrbMessage.style.display = "block";
        numOfOrbsElement.style.display = "block";
        setTimeout(hideFirstOrbMessage, 1000);
        obtainedFirstOrb = true;
    }
    if (numOfOrbs == firstOrbMilestone) {
        reachedFirstOrbMilestone = true;
    }
    if (reachedFirstOrbMilestone) {
        foundStrangeOrb();
    }

}

//hides first orb message 1 second after displaying
function hideFirstOrbMessage() {

    firstOrbMessage.style.display = "none";

}

//displays strange orb message and first orb investigation button
function foundStrangeOrb() {

    strangeOrbMessage.innerHTML = "You found a strange orb. Investigate?";
    strangeOrbMessage.style.display = "block";
    investigateFirstOrbButton.style.display = "block";

}

//first orb investigation costs 99 orbs and investigation cooldown starts
//after investigation, user finds vision orb
function investigateFirstOrb() {

    numOfOrbs -= 99;
    numOfOrbsElement.innerHTML = "Orbs: " + numOfOrbs;
    for (var i = 0; i < 10; i++) {
        investigateOrbCooldownTimer;
    }
    investigateOrbCooldownFinished = true;
    if (investigateOrbCooldownFinished) {
        investigateOrbCooldownMessage.innerHTML = "The investigation is finished. You found a vision orb!";
    }

}

//first orb investigation time takes 10 seconds
function investigateOrbCooldownControl() {

    investigateOrbCooldownMessage.innerHTML = "The investigation costed 99 orbs. Time until finished: " + investigateOrbCooldown;
    investigateOrbCooldownMessage.style.display = "block";
    investigateOrbCooldown -= 1;

}

//save and load feature (refresh doesn't restart game)
function saveGame() {

    localStorage.setItem("numOfOrbs", numOfOrbs);
    localStorage.setItem("orbsPerClick", orbsPerClick);
    localStorage.setItem("investigateOrbCooldown", investigateOrbCooldown);
    localStorage.setItem("reachedFirstOrbMilestone", reachedFirstOrbMilestone);
    localStorage.setItem("obtainedFirstOrb", obtainedFirstOrb);
    localStorage.setItem("investigateOrbCooldownFinished", investigateOrbCooldownFinished);

    requestAnimationFrame(saveGame);

}

function loadGame() {

    numOfOrbs = Number(localStorage.getItem("numOfOrbs"));
    orbsPerClick = Number(localStorage.getItem("orbsPerClick"));
    reachedFirstOrbMilestone = (localStorage.getItem("reachedFirstOrbMilestone") === "true");
    obtainedFirstOrb = (localStorage.getItem("obtainedFirstOrb") === "true");
    if (obtainedFirstOrb) {
        numOfOrbsElement.innerHTML = "Orbs: " + numOfOrbs;
        numOfOrbsElement.style.display = "block";
    }
    if (reachedFirstOrbMilestone) {
        strangeOrbMessage.innerHTML = "You found a strange orb. Investigate?";
        strangeOrbMessage.style.display = "block";
        investigateFirstOrbButton.style.display = "block";
    }

}

//prevents localStorage from breaking when new user plays
if (localStorage.getItem("numOfOrbs") == null) {
    saveGame();
    loadGame();
} else {
    loadGame();
    saveGame();
}