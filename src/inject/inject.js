var fuzzinessLimit = .5
var SubmissionOccurrenceProbability = 100
var CommentOccurrenceProbability = 100

function getRandom(array) {
		return array[Math.floor(Math.random() * array.length)];
}

function getSubredditName() {
		var url = window.location.href
		if (url.split('/')[3] == 'r') {
				return url.split('/')[4];
		} else {
				return null;
		}
	}

function isComments() {
	if (window.location.href.split('/')[5] == 'comments') {
		return true;
	} else {
		return false;
	}
}

function getBotUser(fuzzinessLimit) {
		var fuzzyBotOptions = FuzzySet(submittingBots);
		var [matchFuzziness, botName] = fuzzyBotOptions.get(getSubredditName())[0];
		if (matchFuzziness > fuzzinessLimit) {
				return botName;
		} else {
				return null;
		}
}

function lowestST() {
		var mainST = document.getElementById("siteTable");
		var subSTs = mainST.getElementsByClassName("sitetable linklisting");
		if (subSTs.length > 0) {
				return subSTs[subSTs.length-1];
		} else {
				return mainST;
		};
};

function STListener(callback) {
    currentST = lowestST();
		if (probabilityCheck(SubmissionOccurrenceProbability)) {
				callback(currentST);
		};
    var STListener = setInterval(function () {
      	if (currentST != lowestST()) {
            currentST = lowestST();
						if (probabilityCheck(SubmissionOccurrenceProbability)) {
								callback(currentST);
						};
        };
    }, 1000);
};

function probabilityCheck(probability) {
	if (probability >= Math.floor(Math.random() * 101)) {
		return true;
	} else {
		return false;
	};
};

function getUserContentData(username, contentType) {
		var top100 = null;
		$.ajax({
			 url: "https://api.reddit.com/user/" + username + "/" + contentType,
			 data: {'sort': 'top', 'limit': 100},
			 type: 'get',
			 dataType: 'json',
			 async: false,
			 success: function(response) {
					 top100 = response.data.children;
			 }
		});
		var contentData = getRandom(top100).data

		if (contentType == 'comments') {
				return parseCommentData(contentData);
		} else if (contentType == 'submitted') {
				return parseSubmissionData(contentData);
		};
}

function parseCommentData(commentData) {
		var parsed_link_id = commentData.link_id.split('_')[1];
		commentData.link_id = parsed_link_id;
		commentData.body_html = $('<textarea />').html(commentData.body_html).text();
		return commentData;
}

function parseSubmissionData(submissionData) {
		// var parsed_link_id = commentData.link_id.split('_')[1];
		// commentData.link_id = parsed_link_id;
		// commentData.body_html = $('<textarea />').html(commentData.body_html).text();
		return submissionData;
}

function addComment(commentTemplate) {
		var botUsername = getBotUser(fuzzinessLimit);
		var botCommentData = getUserContentData(botUsername, 'comments');

		var renderedComment = Mustache.render(commentTemplate, botCommentData);
		var parentComments = $('.nestedlisting').children('.comment');
		var randomComment = getRandom(parentComments);
		randomComment.insertAdjacentHTML('afterend', renderedComment);
}

function addLink(submissionTemplate, insertST) {
		var botUsername = getBotUser(fuzzinessLimit)
		var botSubmissionData = getUserContentData(botUsername, 'submitted')
		console.log(botSubmissionData);

		var renderedLink = Mustache.render(submissionTemplate, botSubmissionData);
		var links = insertST.querySelectorAll('div.link:not(.stickied)')
		var randomLink = getRandom(links)
		randomLink.insertAdjacentHTML('afterend', renderedLink);
}

if (isComments()) {
		if (probabilityCheck(CommentOccurrenceProbability)) {
				addComment(commentTemplate)
		}
	} else {
		STListener(function (callbackArg) {
				addLink(submissionTemplate, callbackArg);
		});
}
