# All User Inferface stuff goes here
class UI
  constructor: () ->
    @isAndroid = if Ti.Platform.name is 'android' then true else false
    @tabs = Ti.UI.createTabGroup()
  
  createScheduleWindow : ()->
    win = Ti.UI.createWindow({
      title: 'Schedule',
      backgroundColor: '#fff',
      orientationModes: [Ti.UI.PORTRAIT]
    })
    win.backgroundColor = '#111111' if @isAndroid
    if @isAndroid
      activity = Ti.Android.currentActivity
      activity.onCreateOptionsMenu = (e) ->
        menu = e.menu
        menuItem = menu.add({title: 'Refresh'})
        menuItem.addEventListener('click', (e) ->
          if Ti.Network.online
            xhr = Ti.Network.createHTTPClient()
            xhr.onload = slcUpdateEvents
            xhr.open("POST", server)
            xhr.send()
          else
            alert("You must be online to refresh the data.")
          )
    
    scheduleData = [
      {title: "Registration", hasChild:true, test:'../pages/staticpage.js', staticpage:'registration.html'},
      {title: "Saturday, July 9", hasChild:true, test:'../pages/day.js', date:'July 9, 2011'},
      {title: "Sunday, July 10", hasChild:true, test:'../pages/day.js', date:'July 10, 2011'},
      {title: "Monday, July 11", hasChild:true, test:'../pages/day.js', date:'July 11, 2011'},
      {title: "Tuesday, July 12", hasChild:true, test:'../pages/day.js', date:'July 12, 2011'},
      {title: "Wednesday, July 13", hasChild:true, test:'../pages/day.js', date:'July 13, 2011'},
      {title: "Thursday, July 14", hasChild:true, test:'../pages/day.js', date:'July 14, 2011'},
      {title: "Friday, July 15", hasChild:true, test:'../pages/day.js', date:'July 15, 2011'}]
    scheduleTableView = Ti.UI.createTableView({data:scheduleData})

    scheduleTableView.addEventListener('click', (e)->
    	if e.rowData.test?
    		scheduleFirstWin = Ti.UI.createWindow({
    			url:e.rowData.test,
    			title:e.rowData.title,
    			staticpage: e.rowData.staticpage,
    			date: e.rowData.date
    		})
    		Ti.UI.currentTab.open(scheduleFirstWin,{animated:true});
    )

    win.add(scheduleTableView);    
    return win
  
  
  createIndividualMapWindow : (e) ->
    if e.rowData.staticpage?
      winMap = Ti.UI.createWindow({
        title: e.rowData.title
      })
      webView = Ti.UI.createWebView({
        url: 'pages/' + e.rowData.staticpage
        scalesPageToFit: true
      })
      @tabs.activeTab.open(winMap, {animated:true})
      winMap.add(webView)
    return true
  
  createMapsWindow : ()->
    self = this
    win = Ti.UI.createWindow({
      title: 'Maps',
      backgroundColor: '#fff',
      orientationModes: [Ti.UI.PORTRAIT]
    })
    win.backgroundColor = '#111111' if @isAndroid
    tdata_maps = [
      {title: "Auditorium Seating", hasChild:true, test:'../pages/staticpage.js', staticpage: 'seating.html'},
      {title: "Campus", hasChild:true, test:'../pages/staticpage.js', staticpage: 'campus.html'},
      {title: "Revels Floor 1", hasChild:true, test:'../pages/staticpage.js', staticpage: 'revels1.html'},
      {title: "Revels Floor 2", hasChild:true, test:'../pages/staticpage.js', staticpage: 'revels2.html'},
      {title: "Revels Floor 3", hasChild:true, test:'../pages/staticpage.js', staticpage: 'revels3.html'}
    ]
    t_maps = Ti.UI.createTableView({data:tdata_maps})

    # create table view event listener
    t_maps.addEventListener('click', (e) ->
      self.createIndividualMapWindow(e)
    )
    
    win.add(t_maps);
    return win
  
  createApplicationTabGroup : ()->
    scheduleWin = @createScheduleWindow()
    scheduleTab = Ti.UI.createTab({
      icon: 'data/images/83-calendar.png',
      title: 'Schedule',
      window: scheduleWin
    })
    
    mapsWin = @createMapsWindow()
    mapsTab = Ti.UI.createTab({  
      icon: 'data/images/103-map.png',
      title: 'Maps',
      window: mapsWin
    })
    
    newsWin = Ti.UI.createWindow({  
      title: '@slconference',
      backgroundColor: '#fff',
      url: 'main_windows/news.js'
    })
    
    newsTab = Ti.UI.createTab({  
      icon: 'data/images/23-bird.png',
      title: 'News',
      window: newsWin
    })
    
    speakersWin = Ti.UI.createWindow({  
      title: 'Speakers',
      backgroundColor: '#fff',
      url: 'main_windows/speakers.js'
    })
    
    speakersTab = Ti.UI.createTab({  
      icon: 'data/images/112-group.png',
      title: 'Speakers',
      window: speakersWin
    })
    
    liveWin = Ti.UI.createWindow({  
      title: 'Live Stream',
      backgroundColor: '#fff',
      url: 'main_windows/livestream.js'
    })
    
    liveTab = Ti.UI.createTab({  
      icon: 'data/images/69-display.png',
      title: 'Live',
      window: liveWin
    })
    
    @tabs.addTab(scheduleTab)
    @tabs.addTab(mapsTab)
    @tabs.addTab(newsTab)
    @tabs.addTab(speakersTab)
    @tabs.addTab(liveTab)
    return @tabs
  
slc.ui = new UI