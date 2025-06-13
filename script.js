var tabTitle = document.getElementById("tabTitle");
var home = document.getElementById("home");
var numOfOrbsElement = document.getElementById("numOfOrbsElement");
var firstOrbMessage = document.getElementById("firstOrbMessage");
var strangeOrbMessage = document.getElementById("strangeOrbMessage");
var investigateFirstOrbButton = document.getElementById("investigateFirstOrb");
var investigateOrbCooldownMessage = document.getElementById("investigateOrbCooldownMessage");
var numOfOrbs = 0;
var firstOrbMilestone = 100;
var reachedFirstOrbMilestone = false;
var orbsPerClick = 1;
var obtainedFirstOrb = false;
var investigateOrbCooldown = 10;
var investigateOrbCooldownFinished = false;
var timeUp = 0;

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

function hideFirstOrbMessage() {

    firstOrbMessage.style.display = "none";

}

function foundStrangeOrb() {

    strangeOrbMessage.innerHTML = "You found a strange orb. Investigate?";
    strangeOrbMessage.style.display = "block";
    investigateFirstOrbButton.style.display = "block";

}

function investigateFirstOrb() {

    numOfOrbs -= 99;
    numOfOrbsElement.innerHTML = "Orbs: " + numOfOrbs;
    investigateOrbCooldownMessage.style.display = "block";
    while (investigateOrbCooldown != timeUp) {
        setInterval(investigateOrbCooldownControl, 10000);
    }
    investigateOrbCooldownFinished = true;
    if (investigateOrbCooldownFinished) {
        investigateOrbCooldownMessage.innerHTML = "The investigation is finished. You found a vision orb!";
    }

}

function investigateOrbCooldownControl() {

    investigateOrbCooldownMessage.innerHTML = "The investigation costed 99 orbs. Time until finished: " + investigateOrbCooldown;
    investigateOrbCooldown -= 1;

}

function saveGame() {

    localStorage.setItem("numOfOrbs", numOfOrbs);
    localStorage.setItem("orbsPerClick", orbsPerClick);
    localStorage.setItem("reachedFirstOrbMilestone", reachedFirstOrbMilestone);
    localStorage.setItem("obtainedFirstOrb", obtainedFirstOrb);

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

if (localStorage.getItem("numOfOrbs") == null) {
    saveGame();
    loadGame();
} else {
    loadGame();
    saveGame();
}