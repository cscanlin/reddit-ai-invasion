var commentTemplate = `
<div class=" thing id-{{name}} noncollapsed comment " data-author="{{author}}" data-fullname="{{name}}" data-subreddit="SubredditSimulator" data-subreddit-fullname="{{subreddit_id}}" data-type="comment" id="thing_{{name}}" onclick="click_thing(this)">
  <p class="parent">
    <a name="{{id}}"></a>
  </p>
  <div class="midcol unvoted">
    <div aria-label="upvote" class="arrow up login-required archived access-required" data-event-action="upvote" role="button" tabindex="0"></div>
    <div aria-label="downvote" class="arrow down login-required archived access-required" data-event-action="downvote" role="button" tabindex="0"></div>
  </div>
  <div class="entry unvoted">
    <p class="tagline">
      <a class="expand" href="javascript:void(0)" onclick="return togglecomment(this)">
        [–]
      </a>
      <a class="author may-blank userTagged" href="https://www.reddit.com/user/{{author}}">
        {{author}}
      </a>
      <span class="RESUserTag">
        <a class="userTagLink RESUserTagImage" href="javascript:void 0" title="set a tag" username="pics_ss"></a>
      </span>
      <a class="voteWeight" href="#" style="display: none;">
        [vw]
      </a>
      <span class="userattrs"></span>
      <span class="score dislikes">
        {{score}} points
      </span>
      <span class="score unvoted">
        {{score}} points
      </span>
      <span class="score likes">
        {{score}} points
      </span>
      <time class="" datetime="2015-06-08T17:40:32+00:00" title="Mon Jun 8 17:40:32 2015 UTC">
        8 hours ago
      </time>
      <a class="numchildren" href="javascript:void(0)" onclick="return togglecomment(this)">
        (1 child)
      </a>
    </p>
    <form action="#" class="usertext" id="form-{{name}}6s4" onsubmit="return post_form(this, 'editusertext')">
      <input name="thing_id" type="hidden" value="{{name}}">
        <div class="usertext-body may-blank-within md-container ">
          {{{body_html}}}
        </div>
      </input>
    </form>
    <ul class="flat-list buttons">
      <li class="first">
        <a class="bylink" data-event-action="permalink" href="https://www.reddit.com/r/SubredditSimulator/comments/{{link_id}}/{{id}}" rel="nofollow">
          permalink
        </a>
      </li>
      <li class="viewSource">
        <a class="noCtrlF" data-text="source" href="javascript:void 0"></a>
      </li>
      <li class="comment-save-button save-button">
        <a href="javascript:void(0)">
          save
        </a>
      </li>
      <li class="saveComments">
        <a class="RES-save noCtrlF" data-text="save-RES" href="javascript:void 0" title="Save using RES - which is local only, but preserves the full text in case someone edits/deletes it"></a>
      </li>
      <li class="give-gold-button">
        <a class="give-gold login-required access-required" data-event-action="gild" href="/gold?goldtype=gift&amp;months=1&amp;thing={{name}}" title="give reddit gold in appreciation of this post.">
          give gold
        </a>
      </li>
    </ul>
    <div class="reportform report-{{name}}"></div>
  </div>
  <div class="child">
    <div class="sitetable listing" id="siteTable_{{name}}"></div>
  </div>
</div>
`
