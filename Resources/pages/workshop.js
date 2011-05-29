// Include the necessary database functions
Ti.include('../db.js');
Ti.include('../misc.js');

var win = Ti.UI.currentWindow;
win.backgroundColor = "#ffffff";
if (Ti.Platform.name === 'android') {
  win.backgroundColor = "#111111";
}
var server = "http://www.lancasterbaptist.org/slc/json/events/";
var today = win.slcDate;

function showSessions() {
  var myDateString = today.getFullYear() + "-" + ('0' + (today.getMonth() + 1)).slice(-2) + "-" + ('0' + today.getDate()).slice(-2);
  //var slcFrom = slcSecondsToTime(win.slcFrom);
  var sessions = slcdbGetSessions(win.slcFrom, myDateString);
  Titanium.API.info('ROW COUNT = ' + sessions.getRowCount());
  data = [];
  while (sessions.isValidRow()) {
    var row = Ti.UI.createTableViewRow({height:'auto', selectionStyle: "none"});
    content = Ti.UI.createView({
      height: 'auto',
      layout: 'vertical',
      left: 10,
      top: 10,
      bottom: 10,
      right: 10
    });
    
    contentTitle = Ti.UI.createLabel({
      text: html_decode(sessions.fieldByName('title')),
      font: {fontWeight: 'bold', fontSize:14},
      height: 'auto',
      width: 'auto',
      left: 0
    });
    content.add(contentTitle);
    
    contentSpeaker = Ti.UI.createLabel({
      text: sessions.fieldByName('speaker'),
      font: {fontWeight: 'normal', fontSize:12, fontStyle:"italics"},
      height: 'auto',
      top: 2,
      left: 0
    });
    content.add(contentSpeaker);
    
    contentRoom = Ti.UI.createLabel({
      text: sessions.fieldByName('room'),
      font: {fontWeight: 'normal', fontSize:12},
      height: 'auto',
      top: 2,
      left: 0
    });
    content.add(contentRoom);
    
    row.add(content);
    
    trackLabel = Ti.UI.createLabel({
      text: html_decode(sessions.fieldByName('track')),
      font: {fontWeight: 'normal', fontSize:12},
      height: 'auto',
      width: 'auto',
      bottom: 5,
      right: 10
    });
    
    row.add(trackLabel);
    
    data.push(row);
    sessions.next();
  }
  sessions.close();
  var tableView = Titanium.UI.createTableView({
    data:data
  });
  win.add(tableView);
}

function showWorkshopPage() {  
  if (Ti.App.Cache.get("dbupdated") == null) {
    // Data could be stale, if they are online lets get new data
    if (Ti.Network.online) {
      var xhr = Titanium.Network.createHTTPClient();
      xhr.onload = function (e) {
        var events = this.responseText;
        slcdbSaveEvents(events);
        showSessions();
      };
      xhr.open("POST", server);
      xhr.send();
    } else {
      // Not online so we cannot get new data, just use current data
      showSessions();
    }
  } else {
    // Data is not stale, use what we've got
    showSessions();
  }
}

showWorkshopPage();