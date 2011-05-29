Ti.include('../db.js');
Ti.include('../misc.js');

var slc = {};
var win = Ti.UI.currentWindow;
var server = "http://www.lancasterbaptist.org/slc/json/events/";
win.orientationModes = [Ti.UI.PORTRAIT];
if (Ti.Platform.name === 'android') {
  win.backgroundColor = "#111111";
}

function slcUpdateEvents() {
  slcdbSaveEvents(this.responseText);
}

// Add in android menu for refreshing data
if (Ti.Platform.name == "android") {
  var activity = Ti.Android.currentActivity;
  activity.onCreateOptionsMenu = function(e) {
    var menu = e.menu;
    var menuItem = menu.add({title:"Refresh"});
    menuItem.addEventListener("click", function(e) {
      if (Ti.Network.online) {
        var events_xhr = Ti.Network.createHTTPClient();
        events_xhr.onload = slcUpdateEvents;
        events_xhr.open("POST", server);
        events_xhr.send();
      } else {
        alert("You must be online to refresh this page.");
      }
    });
  };
}

slc.scheduleData = [
  {title: "Registration", hasChild:true, test:'../pages/staticpage.js', staticpage:'registration.html'},
  {title: "Saturday, July 9", hasChild:true, test:'../pages/day.js', date:'July 9, 2011'},
  {title: "Sunday, July 10", hasChild:true, test:'../pages/day.js', date:'July 10, 2011'},
  {title: "Monday, July 11", hasChild:true, test:'../pages/day.js', date:'July 11, 2011'},
  {title: "Tuesday, July 12", hasChild:true, test:'../pages/day.js', date:'July 12, 2011'},
  {title: "Wednesday, July 13", hasChild:true, test:'../pages/day.js', date:'July 13, 2011'},
  {title: "Thursday, July 14", hasChild:true, test:'../pages/day.js', date:'July 14, 2011'},
  {title: "Friday, July 15", hasChild:true, test:'../pages/day.js', date:'July 15, 2011'}];
slc.scheduleTableView = Ti.UI.createTableView({data:slc.scheduleData});

// create table view event listener
slc.scheduleTableView.addEventListener('click', function(e)
{
	if (e.rowData.test) {
		slc.scheduleFirstWin = Ti.UI.createWindow({
			url:e.rowData.test,
			title:e.rowData.title,
			staticpage: e.rowData.staticpage,
			date: e.rowData.date
		});
		Ti.UI.currentTab.open(slc.scheduleFirstWin,{animated:true});
	}
});

Ti.UI.currentWindow.add(slc.scheduleTableView);