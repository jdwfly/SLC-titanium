(function() {
  var UI;
  UI = function() {};
  UI.prototype.createApplicationTabGroup = function() {
    var liveTab, liveWin, mapsTab, mapsWin, newsTab, newsWin, scheduleTab, scheduleWin, speakersTab, speakersWin, tabgroup;
    tabgroup = Ti.UI.createTabGroup();
    scheduleWin = Ti.UI.createWindow({
      title: 'Schedule',
      backgroundColor: '#fff',
      url: 'main_windows/schedule.js'
    });
    scheduleTab = Ti.UI.createTab({
      icon: 'data/images/83-calendar.png',
      title: 'Schedule',
      window: scheduleWin
    });
    mapsWin = Ti.UI.createWindow({
      title: 'Maps',
      backgroundColor: '#fff',
      url: 'main_windows/maps.js'
    });
    mapsTab = Ti.UI.createTab({
      icon: 'data/images/103-map.png',
      title: 'Maps',
      window: mapsWin
    });
    newsWin = Ti.UI.createWindow({
      title: '@slconference',
      backgroundColor: '#fff',
      url: 'main_windows/news.js'
    });
    newsTab = Ti.UI.createTab({
      icon: 'data/images/23-bird.png',
      title: 'News',
      window: newsWin
    });
    speakersWin = Ti.UI.createWindow({
      title: 'Speakers',
      backgroundColor: '#fff',
      url: 'main_windows/speakers.js'
    });
    speakersTab = Ti.UI.createTab({
      icon: 'data/images/112-group.png',
      title: 'Speakers',
      window: speakersWin
    });
    liveWin = Ti.UI.createWindow({
      title: 'Live Stream',
      backgroundColor: '#fff',
      url: 'main_windows/livestream.js'
    });
    liveTab = Ti.UI.createTab({
      icon: 'data/images/69-display.png',
      title: 'Live',
      window: liveWin
    });
    tabgroup.addTab(scheduleTab);
    tabgroup.addTab(mapsTab);
    tabgroup.addTab(newsTab);
    tabgroup.addTab(speakersTab);
    tabgroup.addTab(liveTab);
    return tabgroup;
  };
  slc.ui = new UI();
}).call(this);
