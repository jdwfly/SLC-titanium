Ti.include('../db.js');
Ti.include('../misc.js');

var win = Ti.UI.currentWindow;
win.backgroundColor = "#ffffff";
if (Ti.Platform.name === 'android') {
  win.backgroundColor = "#111111";
}
var server = "http://www.lancasterbaptist.org/slc/json/events/";
var today = new Date(win.date);
var tableView = {};

function slcUpdateEvents() {
  slcdbSaveEvents(this.responseText);
  showDay();
}

// Add in android menu for refreshing data
if (Ti.Platform.name == "android") {
  var activity = Ti.Android.currentActivity;
  activity.onCreateOptionsMenu = function(e) {
    var menu = e.menu;
    var menuItem = menu.add({title:"Refresh"});
    menuItem.addEventListener("click", function(e) {
      if (Ti.Network.online) {
        win.remove(tableView);
        var xhr = Titanium.Network.createHTTPClient();
        xhr.onload = function (e) {
          var events = this.responseText;
          slcdbSaveEvents(events);
          showDay();
        };
        xhr.open("POST", server);
        xhr.send();
      } else {
        alert("You must be online to refresh this page.");
      }
    });
  };
}

function showDay() {
  var myDateString = today.getFullYear() + "-" + ('0' + (today.getMonth() + 1)).slice(-2) + "-" + ('0' + today.getDate()).slice(-2);
  var events = slcdbGetEvents(myDateString);
  Ti.API.info('ROW COUNT = ' + events.getRowCount());
  data = [];
  while (events.isValidRow()) {
    var row = Ti.UI.createTableViewRow();
    row.header = slcSecondsToTime(events.fieldByName('datefrom')) + '-' + slcSecondsToTime(events.fieldByName('dateto'));
    row.selectionStyle = "none";
    var title = html_decode(events.fieldByName('title'));
    var content = Ti.UI.createLabel({
      text: title
    });
    if (events.fieldByName('eventtype') == "Workshop") {
      row.hasChild = true;
      row.selectionStyle = 1;
    }
    row.add(content);
    data.push(row);
    events.next();
  }
  tableView = Ti.UI.createTableView({
    data:data
  });
  
  if (Ti.Network.online) {
    var refresh = Ti.UI.createButton({
    	systemButton:Ti.UI.iPhone.SystemButton.REFRESH
    });
    refresh.addEventListener('click', function() {
      var events_xhr = Ti.Network.createHTTPClient();
      events_xhr.onload = slcUpdateEvents;
      events_xhr.open("POST", server);
      events_xhr.send();
    });
  }
  
  tableView.addEventListener('click', function(e) {
    // Any row that hasChild will get passed on to workshop.js
    if (e.rowData.hasChild) {
      var headerTimes = e.rowData.header.split("-");
      var fromTime = convertSeconds(headerTimes[0]);
      var toTime = convertSeconds(headerTimes[1]);
      var workshopWin = Ti.UI.createWindow({
        url: 'workshop.js',
        backgroundColor: "#ffffff",
        title: e.row.children[0].text,
        slcDate: today,
        slcFrom: fromTime,
        slcTo: toTime
      });
      Ti.UI.currentTab.open(workshopWin, {animated: true});
    }
  });
  
  win.rightNavButton = refresh;
  win.add(tableView);
}

function showDayPage() {
  if (Ti.App.Cache.get("dbupdated") == null) {
    if (Ti.Network.online) {
      // Data could be stale, if they are online lets get new data
      var xhr = Titanium.Network.createHTTPClient();
      xhr.onload = function (e) {
        var events = this.responseText;
        slcdbSaveEvents(events);
        showDay();
      };
      xhr.open("POST", server);
      xhr.send();
    } else {
      // Not online so we cannot get new data, just use current data
      showDay();
    }
  } else {
    // Data is not stale, use what we've got
    showDay();
  }
}

showDayPage();