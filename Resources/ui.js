(function() {
  var UI;
  UI = function() {
    this.isAndroid = false;
    if (Ti.Platform.name === 'android') {
      this.isAndroid = true;
    }
    return this;
  };
  UI.prototype.createScheduleWindow = function() {
    var activity, scheduleData, scheduleTableView, win;
    win = Ti.UI.createWindow({
      title: 'Schedule',
      backgroundColor: '#fff',
      orientationModes: [Ti.UI.PORTRAIT]
    });
    if (this.isAndroid) {
      win.backgroundColor = '#111111';
    }
    if (this.isAndroid) {
      activity = Ti.Android.currentActivity;
      activity.onCreateOptionsMenu = function(e) {
        var menu, menuItem;
        menu = e.menu;
        menuItem = menu.add({
          title: 'Refresh'
        });
        return menuItem.addEventListener('click', function(e) {
          var xhr;
          if (Ti.Network.online) {
            xhr = Ti.Network.createHTTPClient();
            xhr.onload = slcUpdateEvents;
            xhr.open("POST", server);
            return xhr.send();
          } else {
            return alert("You must be online to refresh the data.");
          }
        });
      };
    }
    scheduleData = [
      {
        title: "Registration",
        hasChild: true,
        test: '../pages/staticpage.js',
        staticpage: 'registration.html'
      }, {
        title: "Saturday, July 9",
        hasChild: true,
        test: '../pages/day.js',
        date: 'July 9, 2011'
      }, {
        title: "Sunday, July 10",
        hasChild: true,
        test: '../pages/day.js',
        date: 'July 10, 2011'
      }, {
        title: "Monday, July 11",
        hasChild: true,
        test: '../pages/day.js',
        date: 'July 11, 2011'
      }, {
        title: "Tuesday, July 12",
        hasChild: true,
        test: '../pages/day.js',
        date: 'July 12, 2011'
      }, {
        title: "Wednesday, July 13",
        hasChild: true,
        test: '../pages/day.js',
        date: 'July 13, 2011'
      }, {
        title: "Thursday, July 14",
        hasChild: true,
        test: '../pages/day.js',
        date: 'July 14, 2011'
      }, {
        title: "Friday, July 15",
        hasChild: true,
        test: '../pages/day.js',
        date: 'July 15, 2011'
      }
    ];
    scheduleTableView = Ti.UI.createTableView({
      data: scheduleData
    });
    scheduleTableView.addEventListener('click', function(e) {
      var scheduleFirstWin;
      if (e.rowData.test) {
        scheduleFirstWin = Ti.UI.createWindow({
          url: e.rowData.test,
          title: e.rowData.title,
          staticpage: e.rowData.staticpage,
          date: e.rowData.date
        });
        return Ti.UI.currentTab.open(scheduleFirstWin, {
          animated: true
        });
      }
    });
    win.add(scheduleTableView);
    return win;
  };
  UI.prototype.createApplicationTabGroup = function() {
    var liveTab, liveWin, mapsTab, mapsWin, newsTab, newsWin, scheduleTab, scheduleWin, speakersTab, speakersWin, tabgroup;
    tabgroup = Ti.UI.createTabGroup();
    scheduleWin = this.createScheduleWindow();
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
