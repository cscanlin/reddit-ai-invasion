function getRandom(array) {
		return array[Math.floor(Math.random() * array.length)];
}

function getSubredditName() {
		var url = window.location.href
		if (url.split('/')[3] == 'r') {
				subredditWithPageMarker = url.split('/')[4];
				return subredditWithPageMarker.split('#')[0];
		} else {
				return 'root';
		}
	}

function isComments() {
		if (window.location.href.split('/')[5] == 'comments') {
				return true;
		} else {
				return false;
		}
}

function getBotUser(contentType) {
		var botSet = config.submittingBots;
		if (contentType == 'comments') {
				botSet = botSet.concat(config.commentOnlyBots)
		}
		if (getSubredditName() != 'root') {
				var [matchFuzziness, botName] = FuzzySet(botSet).get(getSubredditName() + '_SS')[0];
				if (matchFuzziness > config.BotFuzzinessLimit) {
						return botName;
				} else {
						return null;
				}
		} else if (config.InsertIntoHomepage) {
				return getRandom(botSet);
		}
}

function lowestST() {
		var mainST = $('#siteTable');
		var subSTs = mainST.find('.sitetable .linklisting');
		if (subSTs.length > 0) {
				return subSTs.eq(0);
		} else {
				return mainST.eq(0);
		};
};

function STListener(callback) {
    currentST = lowestST();
		if (probabilityCheck(config.SubmissionOccurrenceProbability)) {
				callback(currentST);
		};
    var STListener = setInterval(function () {
      	if (currentST.attr('id') != lowestST().attr('id')) {
            currentST = lowestST();
						if (probabilityCheck(config.SubmissionOccurrenceProbability)) {
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

function getUserContentData(contentType, username) {
		return $.ajax({
				url: "https://api.reddit.com/user/" + username + "/" + contentType,
				data: {'sort': config.BotPostSorting, 'limit': config.BotPostLimit},
				type: 'get',
				dataType: 'json',
		});
};

function parseData(contentType, response) {
		Data = getRandom(response.data.children).data;
		var baseSubreddit = Data.author.slice(0, -3)
		if (config.CustomUserName) {
				Data.author = config.CustomUserName
		}
		if (contentType == 'comments') {
				Data.link_id = Data.link_id.split('_')[1];
				Data.body_html = $('<textarea />').html(Data.body_html).text();

		} else if (contentType = 'submitted') {

				if (getSubredditName() == 'root') {
					 Data.to_subreddit = ' to <a href="https://www.reddit.com/r/' + baseSubreddit + '/" class="subreddit hover may-blank">/r/' + baseSubreddit + '</a>'
				}

				if (!Data.is_self) {
						Data.thumbnailTag = '<img alt="" height="70" src="'+ Data.thumbnail +'" width="70"/>'
				} else {
						Data.thumbnailTag = null
				}

				if (Data.domain == 'self.SubredditSimulator') {
						Data.domain = 'reddit.com'
				}
		}
		return Data
}

function injectContent(contentType, template, currentContent) {
		var botUsername = getBotUser(contentType);
		getUserContentData(contentType, botUsername).then(function (response) {
				var botContentData = parseData(contentType, response);
				var botContentRendered = Mustache.render(template, botContentData);
				var randomCurrent = getRandom(currentContent);
				randomCurrent.insertAdjacentHTML('afterend', botContentRendered);
		})
}

if (isComments()) {
		if (probabilityCheck(config.CommentOccurrenceProbability)) {
				var currentComments = $('.nestedlisting').find('.comment');
				injectContent('comments', commentTemplate, currentComments);
		}
	} else {
				STListener(function (callbackArg) {
						var currentLinks = callbackArg.find('div.link').not(".stickied");
						injectContent('submitted', submissionTemplate, currentLinks);
				});
}
