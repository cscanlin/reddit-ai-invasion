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

function STCheck(callback) {
    currentST = lowestST();
		if (probabilityCheck(SubmissionOccurrenceProbability)) {
			callback(currentST);
		};
		callback(currentST)
    var STCheck = setInterval(function () {
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

function ChangeSubmissionHTML(insertST) {
		links = insertST.querySelectorAll('div.link:not(.stickied)')
		randomLink = getRandom(links)
		newHTML = '<div class=" thing id-t3_4by3vp even  link " id="thing_t3_4by3vp" onclick="click_thing(this)" data-fullname="t3_4by3vp" data-type="link" data-author="all-top-today_SS" data-author-fullname="t2_nycxd" data-subreddit="SubredditSimulator" data-subreddit-fullname="t5_38iwt" data-timestamp="1458935895000" data-url="http://i.imgur.com/2QlYrhI.jpg" data-domain="i.imgur.com" data-rank="8"><p class="parent"></p><span class="rank">8</span><div class="midcol unvoted"><div class="arrow up login-required access-required" data-event-action="upvote" role="button" aria-label="upvote" tabindex="0"></div><div class="score dislikes">35</div><div class="score unvoted">36</div><div class="score likes">37</div><div class="arrow down login-required access-required" data-event-action="downvote" role="button" aria-label="downvote" tabindex="0"></div></div><a class="thumbnail may-blank loggedin " href="http://i.imgur.com/2QlYrhI.jpg"><img src="//a.thumbs.redditmedia.com/n0Ns_FWR_RkIF6nkWEHhity6QdI_3-a26hHiJs_5gZ8.jpg" width="70" height="70" alt=""></a><div class="entry unvoted lcTagged"><p class="title"><a class="title may-blank loggedin  srTagged imgScanned" href="http://i.imgur.com/2QlYrhI.jpg" tabindex="1" type="IMAGE" name="img10">This is the best meme for this leek so they can find them</a> <span class="domain">(<a href="/domain/i.imgur.com/">i.imgur.com</a>)</span></p><a class="toggleImage expando-button collapsed collapsedExpando image linkImg">&nbsp;</a><p class="tagline">submitted <time title="Fri Mar 25 19:58:15 2016 UTC" datetime="2016-03-25T19:58:15+00:00" class="live-timestamp">13 hours ago</time> by <a href="https://www.reddit.com/user/all-top-today_SS" class="author may-blank id-t2_nycxd userTagged">all-top-today_SS</a><span class="RESUserTag"><a class="userTagLink RESUserTagImage" username="all-top-today_ss" title="set a tag" href="javascript:void 0"></a></span> <a href="#" class="voteWeight" style="display: none;">[vw]</a><span class="userattrs"></span></p><ul class="flat-list buttons"><li class="first"><a href="https://www.reddit.com/r/SubredditSimulator/comments/4by3vp/this_is_the_best_meme_for_this_leek_so_they_can/" data-event-action="comments" class="bylink comments may-blank" rel="nofollow">21 comments</a></li><li class="share"><a class="post-sharing-button" href="javascript: void 0;">share</a></li><li class="link-save-button save-button"><a href="#">save</a></li><li><form action="/post/hide" method="post" class="state-button hide-button"><input type="hidden" name="executed" value="hidden"><span><a action="hide" href="#">hide</a></span></form></li><li class="report-button"><a href="javascript:void(0)" class="reportbtn access-required" data-event-action="report">report</a></li><li><span class="redditSingleClick" thislink="http://i.imgur.com/2QlYrhI.jpg" thiscomments="https://www.reddit.com/r/SubredditSimulator/comments/4by3vp/this_is_the_best_meme_for_this_leek_so_they_can/">[l+c]</span></li></ul><div class="reportform report-t3_4by3vp"></div><div class="expando expando-uninitialized" style="display: none"><span class="error">loading...</span></div></div><div class="child"></div><div class="clearleft"></div></div>'
		$(randomLink).replaceWith(newHTML);
}

function AddLink() {
		var botUsername = getBotUser(fuzzinessLimit)
		STCheck(function (callbackArg) {
	  		ChangeSubmissionHTML(callbackArg);
		});
}

function getCommentData(username) {
		var top100Comments = null;
		$.ajax({
			 url: "https://api.reddit.com/user/" + username + "/comments",
			 data: {'sort': 'top', 'limit': 100},
			 type: 'get',
			 dataType: 'json',
			 async: false,
			 success: function(response) {
					 top100Comments = response.data.children;
			 }
		});
		return parseCommentData(top100Comments);
}

function parseCommentData(top100Comments) {
		var commentData = getRandom(top100Comments).data;
		var parsed_link_id = commentData.link_id.split('_')[1];
		commentData.link_id = parsed_link_id;
		commentData.body_html = $('<textarea />').html(commentData.body_html).text();
		return commentData;
}

function AddComment(commentTemplate) {
		var botUsername = getBotUser(fuzzinessLimit);
		var botCommentData = getCommentData(botUsername);

		var renderedComment = Mustache.render(commentTemplate, botCommentData);
		var parentComments = $('.nestedlisting').children('.comment');
		var randomComment = getRandom(parentComments);
		randomComment.insertAdjacentHTML('afterend', renderedComment);
}

if (isComments()) {
	if (probabilityCheck(CommentOccurrenceProbability)) {
		AddComment(commentTemplate)
	}
} else {
		AddLink()
}
