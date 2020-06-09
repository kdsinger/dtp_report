// This file was automatically generated from inline.
// Please don't edit this file by hand.

if (typeof Dashboard == 'undefined') { var Dashboard = {}; }
if (typeof Dashboard.Item == 'undefined') { Dashboard.Item = {}; }
if (typeof Dashboard.Item.Tutorial == 'undefined') { Dashboard.Item.Tutorial = {}; }
if (typeof Dashboard.Item.Tutorial.Templates == 'undefined') { Dashboard.Item.Tutorial.Templates = {}; }


Dashboard.Item.Tutorial.Templates.Static = function(opt_data, opt_ignored) {
  return '<div id="dynamic-content"/><div>Welcome to <span class="aui-lozenge aui-lozenge-success">' + soy.$$escapeHtml(opt_data.pluginName) + '</span> v' + soy.$$escapeHtml(opt_data.version) + '!</div>';
};


Dashboard.Item.Tutorial.Templates.IssueList = function(opt_data, opt_ignored) {
  var output = '<table class="aui"><thead><tr><th id="basic-fname">Issue key</th><th id="basic-lname">Issue ID</th></tr></thead><tbody>';
  var issueList10 = opt_data.issues;
  var issueListLen10 = issueList10.length;
  for (var issueIndex10 = 0; issueIndex10 < issueListLen10; issueIndex10++) {
    var issueData10 = issueList10[issueIndex10];
    output += '<tr><td headers="basic-fname">' + soy.$$escapeHtml(issueData10.key) + '</td><td headers="basic-lname">' + soy.$$escapeHtml(issueData10.id) + '</td></tr>';
  }
  output += '</tbody></table><div class="buttons-container"><div class="buttons"><input class="button submit" type="submit" value="Refresh"></div></div>';
  return output;
};


Dashboard.Item.Tutorial.Templates.Empty = function(opt_data, opt_ignored) {
  return 'No issues yet.<div class="buttons-container"><div class="buttons"><input class="button submit" type="submit" value="Refresh"></div></div>';
};


Dashboard.Item.Tutorial.Templates.Configuration = function(opt_data, opt_ignored) {
  return '<form class="aui"><div class="field-group"><label for="due-date-input">Due Date<span class="aui-icon icon-required">(required)</span></label><input class="text medium-field" type="text" id="due-date-input" name="due-date-input" placeholder="3d"><div class="description">Syntax: 3(d|w|m) </div></div><div class="buttons-container"><div class="buttons"><input class="button submit" type="submit" value="Save" id="comment-save-button"><a class="cancel" href="#">Cancel</a></div></div></form>';
};
