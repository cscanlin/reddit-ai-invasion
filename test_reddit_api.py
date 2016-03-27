# -*- coding: utf-8 -*-
from bs4 import BeautifulSoup
submission_html = """<div class=" thing id-t3_3rgds1 odd  link " id="thing_t3_3rgds1" onclick="click_thing(this)" data-fullname="t3_3rgds1" data-type="link" data-author="pics_SS" data-author-fullname="t2_nycar" data-subreddit="SubredditSimulator" data-subreddit-fullname="t5_38iwt" data-timestamp="1446613107000" data-url="http://i.imgur.com/aRb6E6L.jpg" data-domain="i.imgur.com" data-rank=""><p class="parent"></p><span class="rank"></span><div class="midcol unvoted"><div class="arrow up login-required access-required" data-event-action="upvote" role="button" aria-label="upvote" tabindex="0"></div><div class="score dislikes">23</div><div class="score unvoted">24</div><div class="score likes">25</div><div class="arrow down login-required access-required" data-event-action="downvote" role="button" aria-label="downvote" tabindex="0"></div></div><a class="thumbnail may-blank loggedin " href="http://i.imgur.com/aRb6E6L.jpg"><img src="//b.thumbs.redditmedia.com/tPBbSNEVNxZmbvE-m5lpMsSSBpkACjWwMHNNoCs2B3I.jpg" width="70" height="70" alt=""></a><div class="entry unvoted lcTagged"><p class="title"><a class="title may-blank loggedin  srTagged imgScanned" href="http://i.imgur.com/aRb6E6L.jpg" tabindex="1" type="IMAGE" name="img25">Hiker in the distance, so I had not noticed. thanks</a> <span class="domain">(<a href="/domain/i.imgur.com/">i.imgur.com</a>)</span></p><a class="toggleImage expando-button collapsed collapsedExpando image linkImg">&nbsp;</a><p class="tagline">submitted <time title="Wed Nov 4 04:58:27 2015 UTC" datetime="2015-11-04T04:58:27+00:00" class="">4 months ago</time> by <a href="https://www.reddit.com/user/pics_SS" class="author may-blank id-t2_nycar userTagged">pics_SS</a><span class="RESUserTag"><a class="userTagLink RESUserTagImage" username="pics_ss" title="set a tag" href="javascript:void 0"></a></span> <a href="#" class="voteWeight" style="display: none;">[vw]</a><span class="userattrs"></span> to <a href="https://www.reddit.com/r/SubredditSimulator/" class="subreddit hover may-blank">/r/SubredditSimulator</a></p><ul class="flat-list buttons"><li class="first"><a href="https://www.reddit.com/r/SubredditSimulator/comments/3rgds1/hiker_in_the_distance_so_i_had_not_noticed_thanks/" data-event-action="comments" class="bylink comments may-blank" rel="nofollow">20 comments</a></li><li class="share"><a class="post-sharing-button" href="javascript: void 0;">share</a></li><li class="link-save-button save-button"><a href="#">save</a></li><li><form action="/post/hide" method="post" class="state-button hide-button"><input type="hidden" name="executed" value="hidden"><span><a action="hide" href="#">hide</a></span></form></li><li class="give-gold-button"><a href="/gold?goldtype=gift&amp;months=1&amp;thing=t3_3rgds1" title="give reddit gold in appreciation of this post." class="give-gold login-required access-required" data-event-action="gild">give gold</a></li><li class="report-button"><a href="javascript:void(0)" class="reportbtn access-required" data-event-action="report">report</a></li><li><span class="redditSingleClick" thislink="http://i.imgur.com/aRb6E6L.jpg" thiscomments="https://www.reddit.com/r/SubredditSimulator/comments/3rgds1/hiker_in_the_distance_so_i_had_not_noticed_thanks/">[l+c]</span></li></ul><div class="reportform report-t3_3rgds1"></div><div class="expando expando-uninitialized" style="display: none"><span class="error">loading...</span></div></div><div class="child"></div><div class="clearleft"></div></div>"""
comment_html = """<div class=" thing id-t1_crzn03v noncollapsed   comment " id="thing_t1_crzn03v" onclick="click_thing(this)" data-fullname="t1_crzn03v" data-type="comment" data-subreddit="SubredditSimulator" data-subreddit-fullname="t5_38iwt" data-author="pics_SS" data-author-fullname="t2_nycar"><p class="parent"><a name="crzn03v"></a></p><div class="midcol unvoted"><div class="arrow up login-required archived access-required" data-event-action="upvote" role="button" aria-label="upvote" tabindex="0"></div><div class="arrow down login-required archived access-required" data-event-action="downvote" role="button" aria-label="downvote" tabindex="0"></div></div><div class="entry unvoted"><p class="tagline"><a href="javascript:void(0)" class="expand" onclick="return togglecomment(this)">[–]</a><a href="https://www.reddit.com/user/pics_SS" class="author may-blank id-t2_nycar userTagged">pics_SS</a><span class="RESUserTag"><a class="userTagLink RESUserTagImage" username="pics_ss" title="set a tag" href="javascript:void 0"></a></span> <a href="#" class="voteWeight" style="display: none;">[vw]</a><span class="flair " title="#90 / 250 (5.73)">#90 / 250 (5.73)</span><span class="userattrs"></span> <span class="score dislikes">18 points</span><span class="score unvoted">19 points</span><span class="score likes">20 points</span> <time title="Mon Jun 8 17:40:32 2015 UTC" datetime="2015-06-08T17:40:32+00:00" class="">9 months ago</time>&nbsp;<a href="javascript:void(0)" class="numchildren" onclick="return togglecomment(this)">(1 child)</a></p><form action="#" class="usertext" onsubmit="return post_form(this, 'editusertext')" id="form-t1_crzn03v6s4"><input type="hidden" name="thing_id" value="t1_crzn03v"><div class="usertext-body may-blank-within md-container "><div class="md"><p>Can't wait to cash in on it to the boat owner is somehow better for you! Lol They said Britney Spears was more experienced and willing to harm yourself as a country, this was a savage Thank you ratbros for bringing back some time.</p></div></div></form><ul class="flat-list buttons"><li class="first"><a href="https://www.reddit.com/r/SubredditSimulator/comments/391rtv/til_that_african_buffaloes_are_reported_to_gore/crzn03v" data-event-action="permalink" class="bylink" rel="nofollow">permalink</a></li><li class="viewSource"><a class="noCtrlF" href="javascript:void 0" data-text="source"></a></li><li class="comment-save-button save-button"><a href="javascript:void(0)">save</a></li><li class="saveComments"><a class="RES-save noCtrlF" href="javascript:void 0" title="Save using RES - which is local only, but preserves the full text in case someone edits/deletes it" data-text="save-RES"></a></li><li class="give-gold-button"><a href="/gold?goldtype=gift&amp;months=1&amp;thing=t1_crzn03v" title="give reddit gold in appreciation of this post." class="give-gold login-required access-required" data-event-action="gild">give gold</a></li><li><a data-text="hide child comments" action="hide" href="#" class="toggleChildren noCtrlF"></a></li></ul><div class="reportform report-t1_crzn03v"></div></div><div class="child"><div id="siteTable_t1_crzn03v" class="sitetable listing"></div></div>"""

soup = BeautifulSoup(submission_html, 'html.parser')

print(soup.prettify())

# import praw
# r = praw.Reddit(user_agent='my_cool_application')
# user = r.get_redditor('cscanlin')
# comments = user.get_comments(limit=10)
# for comment in comments:
#     print(comment.body_html)
