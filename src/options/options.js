// Saves options to chrome.storage.sync.
function save_options() {
  var InsertIntoHomepage = document.getElementById('InsertIntoHomepage').checked;
  var BotPostSorting = document.getElementById('BotPostSorting').value;
  var BotFuzzinessLimit = document.getElementById('BotFuzzinessLimit').value;
  var SubmissionOccurrenceProbability = document.getElementById('SubmissionOccurrenceProbability').value;
  var CommentOccurrenceProbability = document.getElementById('CommentOccurrenceProbability').value;
  var BotPostSearchLimit = document.getElementById('BotPostSearchLimit').value;
  var CustomUserName = document.getElementById('CustomUserName').value;
  chrome.storage.sync.set({
    InsertIntoHomepage: InsertIntoHomepage,
    BotPostSorting: BotPostSorting,
    BotFuzzinessLimit: BotFuzzinessLimit,
    SubmissionOccurrenceProbability: SubmissionOccurrenceProbability,
    CommentOccurrenceProbability: CommentOccurrenceProbability,
    BotPostSearchLimit: BotPostSearchLimit,
    CustomUserName: CustomUserName
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
    BotFuzzinessLimit: 50,
    SubmissionOccurrenceProbability: 50,
    CommentOccurrenceProbability: 50,
    BotPostSearchLimit: 50,
    CustomUserName: null
  }, function(items) {
    document.getElementById('InsertIntoHomepage').checked = items.InsertIntoHomepage;
    document.getElementById('BotPostSorting').value = items.BotPostSorting;
    document.getElementById('BotFuzzinessLimit').value = items.BotFuzzinessLimit;
    document.getElementById('SubmissionOccurrenceProbability').value = items.SubmissionOccurrenceProbability;
    document.getElementById('CommentOccurrenceProbability').value = items.CommentOccurrenceProbability;
    document.getElementById('BotPostSearchLimit').value = items.BotPostSearchLimit;
    document.getElementById('CustomUserName').value = items.CustomUserName;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
