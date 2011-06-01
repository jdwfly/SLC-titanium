var slc = {};
Ti.include('db.js');
Ti.include('ui.js');
Ti.include('main.js');
Ti.API.info('Welcome to SLC for '+Ti.Platform.osname);
/**
/////////////////////////////////////////////////////////
// OLD CODE BELOW
/////////////////////////////////////////////////////////
// Include the Titanium Cache
// https://github.com/guilhermechapiewski/titanium-cache
Ti.include('cache.js');

// Include the necessary database functions
Ti.include('db.js');

// TODO REMOVE BEFORE FINAL COMPILE
//Ti.App.Properties.setBool('SLCfirstRun', true);

function slcUpdateEvents() {
  slcdbSaveEvents(this.responseText);
}

if (Ti.Network.online) {
  Ti.API.info('Updating event data.');
  var events_xhr = Ti.Network.createHTTPClient();
  events_xhr.onload = slcUpdateEvents;
  events_xhr.open("POST", "http://www.lancasterbaptist.org/slc/json/events/");
  events_xhr.send();
} else if (Ti.App.Properties.getBool('SLCfirstRun', true)){
  Ti.API.info("Application first run. Loading Event information from local JSON");
  var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + "/data", "events.json");
  var loadedEvents = file.read().text;
  slcdbSaveEvents(loadedEvents);
  Ti.App.Properties.setBool('SLCfirstRun', false);
}

/** 
 * Create the main application namespace
 /
var slc = {
  mainTabGroup: Ti.UI.createTabGroup(),
  scheduleWin: Ti.UI.createWindow({  
      title: 'Schedule',
      backgroundColor: '#fff',
      url: 'main_windows/schedule.js'
  }),
  scheduleTab: Ti.UI.createTab({  
      icon: 'data/images/83-calendar.png',
      title: 'Schedule'
  }),
  mapsWin: Ti.UI.createWindow({  
      title: 'Maps',
      backgroundColor: '#fff',
      url: 'main_windows/maps.js'
  }),
  mapsTab: Ti.UI.createTab({  
      icon: 'data/images/103-map.png',
      title: 'Maps'
  }),
  newsWin: Ti.UI.createWindow({  
      title: '@slconference',
      backgroundColor: '#fff',
      url: 'main_windows/news.js'
  }),
  newsTab: Ti.UI.createTab({  
      icon: 'data/images/23-bird.png',
      title: 'News'
  }),
  speakersWin: Ti.UI.createWindow({  
      title: 'Speakers',
      backgroundColor: '#fff',
      url: 'main_windows/speakers.js'
  }),
  speakersTab: Ti.UI.createTab({  
      icon: 'data/images/112-group.png',
      title: 'Speakers'
  }),
  liveWin: Ti.UI.createWindow({  
      title: 'Live Stream',
      backgroundColor: '#fff',
      url: 'main_windows/livestream.js'
  }),
  liveTab: Ti.UI.createTab({  
      icon: 'data/images/69-display.png',
      title: 'Live'
  })
};

// Assign Windows
slc.scheduleTab.window = slc.scheduleWin;
slc.mapsTab.window = slc.mapsWin;
slc.newsTab.window = slc.newsWin;
slc.speakersTab.window = slc.speakersWin;
slc.liveTab.window = slc.liveWin;

// Add Tabs
slc.mainTabGroup.addTab(slc.scheduleTab);
slc.mainTabGroup.addTab(slc.mapsTab);
slc.mainTabGroup.addTab(slc.newsTab);
slc.mainTabGroup.addTab(slc.speakersTab);
if (Ti.Platform.name == "iPhone OS") {
  slc.mainTabGroup.addTab(slc.liveTab);
}
// Open the Tab Group
slc.mainTabGroup.open({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
*/