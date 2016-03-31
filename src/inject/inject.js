function getRandom(array) {
		return array[Math.floor(Math.random() * array.length)];
};

function getSubredditName() {
		var url = window.location.href;
		if (url.split('/')[3] == 'r') {
				subredditWithPageMarker = url.split('/')[4];
				return subredditWithPageMarker.split('#')[0];
		} else {
				return 'root';
		};
};

function pageType() {
		var splitURL = window.location.href.split('/')
		if (splitURL[5] == 'comments') {
				return 'comments';
		} else if (splitURL[3] == 'user') {
				return 'user';
		} else {
				return 'submitted';
		};
};

function getBotUser(contentType) {
		var activeSubmittingBots = getActiveBots(userConfig.submittingBots);
		if (contentType == 'comments') {
				activeBotSet = activeSubmittingBots.concat(getActiveBots(userConfig.commentOnlyBots));
		} else {
				activeBotSet = activeSubmittingBots
		};
		if (getSubredditName() != 'root') {
				var [matchFuzziness, botName] = FuzzySet(activeBotSet).get(getSubredditName() + '_SS')[0];
				// console.log(matchFuzziness, botName);
				if (matchFuzziness > userConfig.BotFuzzinessLimit/100) {
						return botName;
				} else {
						return null;
				};
		} else if (userConfig.InsertIntoHomepage && getSubredditName() == 'root') {
				return getRandom(activeBotSet);
		} else {
				return null;
		};
};

function getActiveBots(botOptions) {
		var activeBots = [];
		$.each(botOptions, function (botName, botActive) {
				if (botActive) {
					activeBots.push(botName);
				};
		});
		return activeBots;
};

function lowestST() {
		var mainST = $('#siteTable');
		var subSTs = mainST.find('.sitetable, .linklisting');
		if (subSTs.length > 0) {
				return subSTs.last();
		} else {
				return mainST.eq(0);
		};
};

function STListener(callback) {
    currentST = lowestST();
		if (probabilityCheck(userConfig.SubmissionOccurrenceProbability)) {
				callback(currentST);
		};
    var STListener = setInterval(function () {
      	if (currentST.attr('id') != lowestST().attr('id')) {
						currentST = lowestST();
						if (probabilityCheck(userConfig.SubmissionOccurrenceProbability)) {
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
				data: {'sort': userConfig.BotPostSorting, 'limit': userConfig.BotPostSearchLimit},
				type: 'get',
				dataType: 'json',
		});
};

function parseData(contentType, response) {
		Data = getRandom(response.data.children).data;
		var baseSubreddit = Data.author.slice(0, -3);
		if (userConfig.CustomUserName) {
				Data.author = userConfig.CustomUserName;
		}
		if (contentType == 'comments') {
				Data.link_id = Data.link_id.split('_')[1];
				Data.body_html = $('<textarea />').html(Data.body_html).text();
		} else if (contentType = 'submitted') {

				if (getSubredditName() == 'root') {
					 Data.to_subreddit = ' to <a href="https://www.reddit.com/r/' + baseSubreddit + '/" class="subreddit hover may-blank">/r/' + baseSubreddit + '</a>';
				};

				if (!Data.is_self) {
						Data.thumbnailTag = '<img alt="" height="70" src="'+ Data.thumbnail +'" width="70"/>';
				} else {
						Data.thumbnailTag = null;
				};

				if (Data.domain == 'self.SubredditSimulator') {
						if (getSubredditName() == 'root') {
								Data.domain = 'reddit.com';
						} else {
								Data.domain = 'self.' + getSubredditName();
						};
				};
		};
		return Data;
};

function injectContent(contentType, template, currentContent) {
		var botUsername = getBotUser(contentType);
		if (!botUsername) {
				console.log('No bot found for ' + pageType() + ' on subreddit ' + getSubredditName() + '. Bot Fuzziness Limit was ' + userConfig.BotFuzzinessLimit);
				return;
		};
		getUserContentData(contentType, botUsername).then(function (response) {
				var botContentData = parseData(contentType, response);
				var botContentRendered = Mustache.render(template, botContentData);
				var randomCurrent = getRandom(currentContent);
				randomCurrent.insertAdjacentHTML('afterend', botContentRendered);
				console.log('Message inserted successfully:');
				console.log(botContentData);
		});
};

chrome.storage.sync.get(null, function(userConfig) {
		window.userConfig = userConfig
		if (pageType() == 'comments') {
				if (probabilityCheck(userConfig.CommentOccurrenceProbability)) {
						var currentComments = $('.nestedlisting').find('.comment');
						injectContent('comments', commentTemplate, currentComments);
				};
		} else if (pageType() == 'submitted') {
				STListener(function (callbackArg) {
						var currentLinks = callbackArg.find('div.link').not(".stickied");
						injectContent('submitted', submissionTemplate, currentLinks);
				});
		};
});
