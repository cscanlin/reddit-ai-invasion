var submissionTemplate = `
<div class=" thing id-{{name}} even link " data-author="{{author}}" data-domain="{{domain}}" data-fullname="{{name}}" data-rank="64" data-type="link" data-url="{{url}}" id="thing_{{name}}" onclick="click_thing(this)">
  <p class="parent"></p>
  <span class="rank">
    64
  </span>
  <div class="midcol unvoted">
    <div aria-label="upvote" class="arrow up login-required access-required" data-event-action="upvote" role="button" tabindex="0"></div>
    <div class="score dislikes">
     {{score}}
    </div>
    <div class="score unvoted">
     {{score}}
    </div>
    <div class="score likes">
     {{score}}
    </div>
    <div aria-label="downvote" class="arrow down login-required access-required" data-event-action="downvote" role="button" tabindex="0"></div>
  </div>
  <a class="thumbnail {{thumbnail}} may-blank loggedin " href="{{url}}">
    {{{thumbnailTag}}}
  </a>
  <div class="entry unvoted lcTagged">
    <p class="title">
      <a class="title may-blank loggedin srTagged imgScanned" href="{{url}}" name="img64" tabindex="1" type="IMAGE">
        {{title}}
      </a>
      <span class="domain">(<a href="/domain/{{domain}}/">{{domain}}</a>)</span>
    </p>
    <p class="tagline">
      submitted
      <time class="live-timestamp" datetime="2016-02-15T08:58:32+00:00" title="Mon Feb 15 08:58:32 2016 UTC">
        8 hours ago
      </time>
      by
      <a class="author may-blank userTagged" href="https://www.reddit.com/user/{{author}}">
        {{author}}
      </a>
      <span class="RESUserTag">
        <a class="userTagLink RESUserTagImage" username="temioo" title="set a tag" href="javascript:void 0"></a>
      </span>
      <a class="voteWeight" href="#" style="display: none;">
        [vw]
      </a>
      <span class="userattrs"></span>
      {{{to_subreddit}}}
    </p>
    <ul class="flat-list buttons">
      <li class="first">
        <a class="bylink comments may-blank" data-event-action="comments" href="https://www.reddit.com{{permalink}}" rel="nofollow">
          {{num_comments}} comments
        </a>
      </li>
      <li class="share">
        <a class="post-sharing-button" href="javascript: void 0;">
          share
        </a>
      </li>
      <li class="link-save-button save-button">
        <a href="#">
         save
        </a>
      </li>
      <li>
        <form action="/post/hide" class="state-button hide-button" method="post">
          <input name="executed" type="hidden" value="hidden">
            <span>
              <a action="hide" href="#">
                hide
              </a>
            </span>
          </input>
        </form>
      </li>
      <li class="report-button">
        <a class="reportbtn access-required" data-event-action="report" href="javascript:void(0)">
          report
        </a>
      </li>
      <li>
        <span class="redditSingleClick" thiscomments="https://www.reddit.com{{permalink}}" thislink="{{url}}">
          [l+c]
        </span>
      </li>
    </ul>
    <div class="reportform report-{{name}}"></div>
    <div class="expando expando-uninitialized" style="display: none">
      <span class="error">
        loading...
      </span>
    </div>
  </div>
  <div class="child"></div>
  <div class="clearleft"></div>
</div>
`
