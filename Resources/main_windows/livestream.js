Ti.include('../misc.js');

var win = Ti.UI.currentWindow;
win.orientationModes = [Ti.UI.PORTRAIT];
win.backgroundColor = "#313131";
var server = "http://www.lancasterbaptist.org/slc/json/livestream";
var lsEvents = "";

var liveImage = Ti.UI.createImageView({
  image: "../data/images/livestream.jpg",
  top: 20,
  width: 142,
  height: 104
});
win.add(liveImage);

var liveButton = Ti.UI.createButton({
  title: "Watch Live",
  font: {fontWeight: "bold"},
  width: 200,
  height: 40,
  top: 140,
  backgroundImage: "../data/images/watchlive.jpg"  
});
liveButton.addEventListener('click', function(e) {
  if (Ti.Network.online) {
    livePlayerWin = Ti.UI.createWindow({
      url:'../pages/liveplayer.js'
    });
    Ti.UI.currentTab.open(livePlayerWin, {animated:true});
  } else {
    // Show message stating they need to be online.
    var alertDialog = Ti.UI.createAlertDialog({
      title: "",
      message: "You must be online in order to access our live stream events.",
      buttonNames: ['OK']
    });
    alertDialog.show();
  }
});

function showLivestreamEvents() {
  Titanium.API.info("Response = " + this.responseText);
  if (lsEvents == "") {
    lsEvents = this.responseText;
  }
  e = JSON.parse(lsEvents);
  
  var i=0, data = [];
  for (i in e.nodes) {
    var row = Ti.UI.createTableViewRow({height:'auto', selectionStyle: "none"});
    content = Ti.UI.createView({
      height: 'auto',
      width: 'auto',
      layout: 'vertical',
      bottom: 0,
      left: 10,
      right: 10
    });
    
    sessionFirst = Ti.UI.createLabel({
      text: html_decode(e.nodes[i].node.title),
      font: {fontSize: '14', fontWeight: 'bold'},
      color: "#b0b0b0",
      height: 'auto',
      width: 'auto'
    });
    content.add(sessionFirst);
    
    sessionSecond = Ti.UI.createLabel({
      text: (e.nodes[i].node.day + " @ " + e.nodes[i].node.datefrom),
      font: {fontSize: '12'},
      color: "#b0b0b0",
      height: 'auto',
      width: 'auto'
    });
    content.add(sessionSecond);
    
    row.add(content);
    
    var paddingRow = Ti.UI.createTableViewRow({
      height: 10,
      selectionStyle: "none"
    });
        
    data.push(row);
    data.push(paddingRow);
  }
  var lsTitle = Ti.UI.createLabel({
    text: 'Upcoming Live Stream Events',
    color: "#b0b0b0",
    font: {fontFamily:"Georgia", fontSize: 16, fontWeight: 'bold'},
    width: 'auto',
    top: 35
  });
  win.add(lsTitle);
  
  var tableView = Ti.UI.createTableView({
    data:data,
    height: 150,
    bottom: 0,
    backgroundColor: "#313131",
    separatorColor: "#313131"
  });
  win.add(tableView);
  Ti.App.Cache.put('livestream', lsEvents);
}

win.addEventListener('focus', function(e) {
  // Create table view of live stream events
  var cached_data = Ti.App.Cache.get('livestream');
  if (cached_data == null) {
    if (Ti.Network.online) {
      // Pull new data from site
      var xhr = Ti.Network.createHTTPClient();
      xhr.onload = showLivestreamEvents;
      xhr.open("POST", server);
      xhr.send();
    }
    // don't do anything if there is no network connectivity
  } else {
    lsEvents = cached_data;
    showLivestreamEvents();
  }
});

if (Ti.Network.online) {
  var refresh = Ti.UI.createButton({
  	systemButton:Ti.UI.iPhone.SystemButton.REFRESH
  });
  refresh.addEventListener('click', function() {
    var xhr = Ti.Network.createHTTPClient();
    xhr.onload = showLivestreamEvents;
    xhr.open("POST", server);
    xhr.send();
  });
  win.rightNavButton = refresh;
}

win.add(liveButton);