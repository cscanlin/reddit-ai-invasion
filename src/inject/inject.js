function getSubredditName() {
		var url = window.location.href
		if (url.split('/')[3] == 'r') {
				return url.split('/')[4]
		} else {
				return null
		}
	}

function getBotUser(subredditName, fuzzinessLimit) {
		var fuzzyBotOptions = FuzzySet(submittingBots);
		var [matchFuzziness, botName] = fuzzyBotOptions.get(subredditName)[0];
		if (matchFuzziness > fuzzinessLimit) {
				return botName
		} else {
				return null
		}
}

function lowestST() {
	var mainST = document.getElementById("siteTable");
	var subSTs = mainST.getElementsByClassName("sitetable linklisting");
	if (subSTs.length > 0) {
			return subSTs[subSTs.length-1]
	} else {
			return mainST
	}
}

function STCheck(callback) {
    currentST = lowestST()
    var STCheck = setInterval(function () {
        if (currentST != lowestST()) {
            clearInterval(STCheck);
            callback('done');
        }
    }, 1000);
}

// document.body.insertAdjacentHTML( 'afterbegin', '<div></div>');
var fuzzinessLimit = .5
var occurrenceProbability = 10
function main() {
		var subredditName = getSubredditName()
		var botUsername = getBotUser(subredditName, fuzzinessLimit)
		STCheck(function (callbackArg) {
	  		console.log(callbackArg);
		});
}
main()
