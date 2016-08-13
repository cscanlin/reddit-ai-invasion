function createBotCheckboxes() {
    $('#submittingBots').html(buildBotCheckboxListHTML('submittingBots', defaultOptions.submittingBots));
    $('#commentOnlyBots').html(buildBotCheckboxListHTML('commentOnlyBots', defaultOptions.commentOnlyBots));
};

function buildBotCheckboxListHTML(ListName, botDefaults) {
    botListHTML = '';
    $.each(botDefaults, function(botName, botActive) {
        var botCheckboxHTML = `
        <div class="bot-checkbox-with-label">
            <input type="checkbox" id="${botName}" bot-list="${ListName}">
            <span>${botName}</span>
        </div>
        `;
        botListHTML += botCheckboxHTML;
    });
    return '<div class="checkbox-container">' + botListHTML + '</div>';
};

// Saves options to chrome.storage.sync.
function saveOptions() {
  chrome.storage.sync.set({
      InsertIntoHomepage: $('#InsertIntoHomepage').prop('checked'),
      BotPostSorting: $('#BotPostSorting').val(),
      BotFuzzinessLimit: $('#BotFuzzinessLimit').val(),
      SubmissionOccurrenceProbability: $('#SubmissionOccurrenceProbability').val(),
      CommentOccurrenceProbability: $('#CommentOccurrenceProbability').val(),
      BotPostSearchLimit: $('#BotPostSearchLimit').val(),
      CustomUserName: $('#CustomUserName').val(),
      submittingBots: getUserBotOptions($('[bot-list="submittingBots"]')),
      commentOnlyBots: getUserBotOptions($('[bot-list="commentOnlyBots"]'))
  }, function() {
      var status = $('#status');
      status.text('Options saved.');
      setTimeout(function() {
        status.text('');
      }, 2000);
  });
}

function getUserBotOptions(botCheckboxes) {
    var botOptions = {};
    botCheckboxes.each(function(index, element) {
        botOptions[$(this).attr('id')] = $(this).prop('checked');
    });
    return botOptions;
};

function restoreOptions() {
  console.log(defaultOptions);
  if (!$('#BotPostSorting').val()) {
    resetDefaultOptions()
  }
  chrome.storage.sync.get(defaultOptions, function(items) {
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

function restoreUserBotOptions(botOptions) {
  $.each(botOptions, function(botName, botActive) {
      $('#' + botName).prop('checked', botActive);
  });
};

function resetDefaultOptions() {
    chrome.storage.sync.set(defaultOptions, function() {
        var status = $('#status');
        status.text('Options Reset to Default.');
        setTimeout(function() {
          status.text('');
        }, 2000);
    });
};

$(document).ready(function() {
    createBotCheckboxes();
    restoreOptions();
});
$('.expandContent').click(function(){
    $('[show-id="' + this.id +'"]').toggle();
});
$('#save').click(function(){
    saveOptions();
});
$('#reset-defaults').click(function(){
    resetDefaultOptions();
    restoreOptions();
});
