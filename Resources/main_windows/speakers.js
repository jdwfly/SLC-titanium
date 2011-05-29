server = "http://www.lancasterbaptist.org/slc/json/speakers";
var speakers = "";
var win = Ti.UI.currentWindow;
var tableView = {};
win.orientationModes = [Ti.UI.PORTRAIT];
if (Ti.Platform.name === 'android') {
  win.backgroundColor = "#111111";
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
        xhr.onload = showSpeakers;
        xhr.open("POST", server);
        xhr.send();
      } else {
        alert("You must be online to refresh this page.");
      }
    });
  };
}

function showSpeakers() {
  if (speakers == "") {
    speakers = this.responseText;
  }
  Titanium.API.info("Response = " + speakers);
  parseView = JSON.parse(speakers);
  
  var i=0;
  var table = [];
  var index = [];
  var curhead = '';
  var firstLetter = '';
  for (i in parseView.nodes) {
    firstLetter = parseView.nodes[i].node.lname.substr(0,1);
    if (curhead == firstLetter) {
      table.push({
        title:parseView.nodes[i].node.name,
        nid: parseView.nodes[i].node.nid,
        bio: parseView.nodes[i].node.bio,
        fname: parseView.nodes[i].node.fname,
        lname: parseView.nodes[i].node.lname,
        slcLocation: parseView.nodes[i].node.location,
        sessions: parseView.nodes[i].node.sessions,
        hasChild: true
      });
    } else {
      index.push({title:firstLetter, index:(table.length)});
      table.push({
        title:parseView.nodes[i].node.name,
        nid: parseView.nodes[i].node.nid,
        bio: parseView.nodes[i].node.bio,
        sessions: parseView.nodes[i].node.sessions,
        fname: parseView.nodes[i].node.fname,
        lname: parseView.nodes[i].node.lname,
        slcLocation: parseView.nodes[i].node.location,
        hasChild: true,
        header: firstLetter
      });
    }
    curhead = firstLetter;
  }
  var search = Titanium.UI.createSearchBar();
  tableView = Titanium.UI.createTableView({
    data:table,
    search:search,
    index:index,
    backgroundColor: "#ffffff"
  });
  if (Ti.Platform.name === 'android') {
    tableView.backgroundColor = "#111111";
  }
  
  var refresh = Titanium.UI.createButton({
  	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
  });
  refresh.addEventListener('click', function(e) {
    if (Ti.Network.online) {
      Ti.App.Cache.del("speakers");
      showSpeakerPage();
    }
  });
  
  // Event Listener for Table view
  tableView.addEventListener('click', function(e) {
    if (e.rowData.nid) {
      var win = null;
      win = Titanium.UI.createWindow({
        url: '../pages/ind_speaker.js',
        title: e.rowData.title
      });
      // Pass the variables
      win.nid = e.rowData.nid;
      win.bio = e.rowData.bio;
      win.name = e.rowData.title;
      win.sessions = e.rowData.sessions;
      win.fname = e.rowData.fname;
      win.lname = e.rowData.lname;
      win.slcLocation = e.rowData.slcLocation;
      Titanium.UI.currentTab.open(win, {animated: true});
    }
  });
  
  Ti.App.Cache.put('speakers', speakers);
  win.rightNavButton = refresh;
  win.add(tableView);
}


function showSpeakerPage() {
  Ti.App.Cache.del("speakers");
  var cached_data = Ti.App.Cache.get('speakers');

  if (cached_data == null) {
    if (Ti.Network.online) {
      // Pull new data from site
      var xhr = Titanium.Network.createHTTPClient();
      xhr.onload = showSpeakers;
      xhr.open("POST", server);
      xhr.send();
    } else {
      // No network connectivity, fallback to local JSON file
      Ti.API.info("Loading from JSON file");
      var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + "/data", "speakers.json");
      speakers = file.read().text;
      showSpeakers();
    }
  } else {
    speakers = cached_data;
    showSpeakers();
  }
}

showSpeakerPage();