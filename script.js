/*
    Orb Spam (JavaScript Game)
    Creation Date: 6.13.25
    Author: JerryCourtroom
*/

//Note: Always use script tag to link index.html with script.js!
//Note: Defining variable with setInterval() creates interval object and assigns interval id to variable!
var tabTitle = document.getElementById("tabTitle");
var home = document.getElementById("home");
var numOfOrbsElement = document.getElementById("numOfOrbsElement");
var firstOrbMessage = document.getElementById("firstOrbMessage");
var strangeOrbMessage = document.getElementById("strangeOrbMessage");
var investigateFirstOrbButton = document.getElementById("investigateFirstOrbButton");
var alreadyInvestigatedOrbMessage = document.getElementById("alreadyInvestigatedOrbMessage");
var investigateOrbCooldownMessage = document.getElementById("investigateOrbCooldownMessage");
var ongoingFirstOrbInvestigationMessage = document.getElementById("ongoingFirstOrbInvestigationMessage");
var investigateOrbCooldownIntervalId;
var numOfOrbs = 0;
var orbsPerClick = 1;
var firstOrbMilestone = 100;
var investigateOrbCooldown = 10;
var investigatedFirstOrb = false;
var reachedFirstOrbMilestone = false;
var obtainedFirstOrb = false;
var investigateOrbCooldownStarted = false;
var investigateOrbCooldownFinished = false;

//displays first orb congratulation message to user only once
//user obtains strange orb after collecting 100 orbs
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

    if (!investigatedFirstOrb) {
        numOfOrbs -= 99;
        numOfOrbsElement.innerHTML = "Orbs: " + numOfOrbs;
        investigateOrbCooldownStarted = true;
        showInvestigateOrbCooldownMessage();
        investigateOrbCooldownIntervalId = setInterval(investigateOrbCooldownControl, 1000);
        investigatedFirstOrb = true;
    } else {
        alreadyInvestigatedOrbMessage.innerHTML = "You've already investigated this orb.";
        alreadyInvestigatedOrbMessage.style.display = "block";
        setTimeout(hideAlreadyInvestigatedOrbMessage, 1000);
    }
}

//if the user has already investigated an orb, block them from investigating again
function hideAlreadyInvestigatedOrbMessage() {

    alreadyInvestigatedOrbMessage.style.display = "none";

}

//shows first orb investigation messages
function showInvestigateOrbCooldownMessage() {

    investigateOrbCooldownMessage.innerHTML = "The investigation costed 99 orbs. Time until finished: " + investigateOrbCooldown;
    investigateOrbCooldownMessage.style.display = "block";
    ongoingFirstOrbInvestigationMessage.innerHTML = "Ongoing first orb investigation...";
    ongoingFirstOrbInvestigationMessage.style.display = "block";

}

//first orb investigation setInterval() from pressing investigate orb button decreases cooldown number every second while checking if the cooldown ends
function checkOrbInvestigationTime() {

    if (investigateOrbCooldown >= 0) {
        ongoingFirstOrbInvestigationMessage.innerHTML = "Ongoing first orb investigation...";
        ongoingFirstOrbInvestigationMessage.style.display = "block";
        requestAnimationFrame(checkOrbInvestigationTime);
    } else {
        clearInterval(investigateOrbCooldownIntervalId);
        investigateOrbCooldownFinished = true;
        ongoingFirstOrbInvestigationMessage.style.display = "none";
        investigateOrbCooldownMessage.innerHTML = "The investigation is finished. You found a vision orb!";
    }

}

//first orb investigation time takes 10 seconds
function investigateOrbCooldownControl() {

    investigateOrbCooldown -= 1;
    investigateOrbCooldownMessage.innerHTML = "The investigation costed 99 orbs. Time until finished: " + investigateOrbCooldown;
    checkOrbInvestigationTime();

}

//save and load feature (refresh doesn't restart game)
function saveGame() {

    localStorage.setItem("numOfOrbs", numOfOrbs);
    localStorage.setItem("orbsPerClick", orbsPerClick);
    localStorage.setItem("investigateOrbCooldown", investigateOrbCooldown);
    localStorage.setItem("investigateOrbCooldownIntervalId", investigateOrbCooldownIntervalId);
    localStorage.setItem("reachedFirstOrbMilestone", reachedFirstOrbMilestone);
    localStorage.setItem("obtainedFirstOrb", obtainedFirstOrb);
    localStorage.setItem("investigatedFirstOrb", investigatedFirstOrb);
    localStorage.setItem("investigateOrbCooldownStarted", investigateOrbCooldownStarted);
    localStorage.setItem("investigateOrbCooldownFinished", investigateOrbCooldownFinished);

    requestAnimationFrame(saveGame);

}

function loadGame() {

    numOfOrbs = Number(localStorage.getItem("numOfOrbs"));
    orbsPerClick = Number(localStorage.getItem("orbsPerClick"));
    investigateOrbCooldown = Number(localStorage.getItem("investigateOrbCooldown"));
    investigateOrbCooldownIntervalId = Number(localStorage.getItem("investigateOrbCooldownIntervalId"));
    reachedFirstOrbMilestone = (localStorage.getItem("reachedFirstOrbMilestone") === "true");
    obtainedFirstOrb = (localStorage.getItem("obtainedFirstOrb") === "true");
    investigatedFirstOrb = (localStorage.getItem("investigatedFirstOrb") === "true");
    investigateOrbCooldownStarted = (localStorage.getItem("investigateOrbCooldownStarted") === "true");
    investigateOrbCooldownFinished = (localStorage.getItem("investigateOrbCooldownFinished") === "true");
    if (obtainedFirstOrb) {
        numOfOrbsElement.innerHTML = "Orbs: " + numOfOrbs;
        numOfOrbsElement.style.display = "block";
    }
    if (reachedFirstOrbMilestone) {
        strangeOrbMessage.innerHTML = "You found a strange orb. Investigate?";
        strangeOrbMessage.style.display = "block";
        investigateFirstOrbButton.style.display = "block";
        if (investigateOrbCooldownStarted) {
            strangeOrbMessage.style.display = "none";
            investigateOrbCooldownMessage.innerHTML = "The investigation costed 99 orbs. Time until finished: " + investigateOrbCooldown;
            investigateOrbCooldownMessage.style.display = "block";
            setInterval(investigateOrbCooldownControl, 1000);
            ongoingFirstOrbInvestigationMessage.innerHTML = "Ongoing first orb investigation...";
            ongoingFirstOrbInvestigationMessage.style.display = "block";
            if (investigateOrbCooldownFinished) {
                clearInterval(investigateOrbCooldownIntervalId);
                ongoingFirstOrbInvestigationMessage.style.display = "none";
                investigateOrbCooldownMessage.innerHTML = "The investigation is finished. You found a vision orb!";
            }
        }
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