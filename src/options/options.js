$('.expandContent').click(function(){
    $("[show-id='" + this.id +"']").slideToggle('fast');
});

function createBotCheckboxes() {
  $("#CommentAndSubmitBots").html(buildBotCheckboxListHTML(bots.defaultSubmittingBots));
  $("#CommentOnlyBots").html(buildBotCheckboxListHTML(bots.defaultCommentOnlyBots));
}

function buildBotCheckboxListHTML(botDeaults) {
    botListHTML = '';
    $.each(botDeaults, function(botName, botActive) {
        var botCheckboxHTML = `
        <div class="bot-checkbox-with-label">
              <span>${botName}:</span>
              <input type="checkbox" id="${botName}">
        </div>
        `;
        botListHTML += botCheckboxHTML
    });
    return '<div class="checkbox-container">' + botListHTML + '</div>'
}

function getUserBotOptions(botDeaults) {
    var botOptions = {}
    $.each(botDeaults, function(botName, botActive) {
        botOptions[botName] = $('#' + botName).prop('checked');
    });
    return botOptions
}

function restoreUserBotOptions(botOptions) {
  $.each(botOptions, function(botName, botActive) {
      $('#' + botName).prop('checked', botActive)
  });
}

// Saves options to chrome.storage.sync.
function save_options() {
  var InsertIntoHomepage = $('#InsertIntoHomepage').prop('checked');
  var BotPostSorting = $('#BotPostSorting').val();
  var BotFuzzinessLimit = $('#BotFuzzinessLimit').val();
  var SubmissionOccurrenceProbability = $('#SubmissionOccurrenceProbability').val();
  var CommentOccurrenceProbability = $('#CommentOccurrenceProbability').val();
  var BotPostSearchLimit = $('#BotPostSearchLimit').val();
  var CustomUserName = $('#CustomUserName').val();
  if (CustomUserName == '') {
      CustomUserName = null
  }
  var submittingBots = getUserBotOptions(bots.defaultSubmittingBots)
  var commentOnlyBots = getUserBotOptions(bots.defaultCommentOnlyBots)
  chrome.storage.sync.set({
    InsertIntoHomepage: InsertIntoHomepage,
    BotPostSorting: BotPostSorting,
    BotFuzzinessLimit: BotFuzzinessLimit,
    SubmissionOccurrenceProbability: SubmissionOccurrenceProbability,
    CommentOccurrenceProbability: CommentOccurrenceProbability,
    BotPostSearchLimit: BotPostSearchLimit,
    CustomUserName: CustomUserName,
    submittingBots: submittingBots,
    commentOnlyBots: commentOnlyBots
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    InsertIntoHomepage: true,
    BotPostSorting: 'top',
    BotFuzzinessLimit: 75,
    SubmissionOccurrenceProbability: 75,
    CommentOccurrenceProbability: 75,
    BotPostSearchLimit: 75,
    CustomUserName: null,
    submittingBots: bots.defaultSubmittingBots,
    commentOnlyBots: bots.defaultCommentOnlyBots
  }, function(items) {
    $('#InsertIntoHomepage').prop('checked', items.InsertIntoHomepage)
    $('#BotPostSorting').val(items.BotPostSorting);
    $('#BotFuzzinessLimit').val(items.BotFuzzinessLimit);
    $('#SubmissionOccurrenceProbability').val(items.SubmissionOccurrenceProbability);
    $('#CommentOccurrenceProbability').val(items.CommentOccurrenceProbability);
    $('#BotPostSearchLimit').val(items.BotPostSearchLimit);
    $('#CustomUserName').val(items.CustomUserName);
    restoreUserBotOptions(items.submittingBots);
    restoreUserBotOptions(items.commentOnlyBots);
  });
}

$( document ).ready(function() {
    createBotCheckboxes();
    restore_options();
});
$('#save').click(function(){
    save_options();
});
