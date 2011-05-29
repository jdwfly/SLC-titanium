var win = Ti.UI.currentWindow;
win.orientationModes = [Ti.UI.PORTRAIT];
if (Ti.Platform.name === 'android') {
  win.backgroundColor = "#111111";
}

var tdata_maps = [
  {title: "Auditorium Seating", hasChild:true, test:'../pages/staticpage.js', staticpage: 'seating.html'},
  {title: "Campus", hasChild:true, test:'../pages/staticpage.js', staticpage: 'campus.html'},
  {title: "Revels Floor 1", hasChild:true, test:'../pages/staticpage.js', staticpage: 'revels1.html'},
  {title: "Revels Floor 2", hasChild:true, test:'../pages/staticpage.js', staticpage: 'revels2.html'},
  {title: "Revels Floor 3", hasChild:true, test:'../pages/staticpage.js', staticpage: 'revels3.html'}
];
var t_maps = Ti.UI.createTableView({data:tdata_maps, backgroundColor: 'transparent'});

// create table view event listener
t_maps.addEventListener('click', function(e)
{
	if (e.rowData.test)
	{
		var win = Ti.UI.createWindow({
			url:e.rowData.test,
			backgroundColor: "#ffffff",
			title:e.rowData.title,
			staticpage: e.rowData.staticpage 
		});
		Ti.UI.currentTab.open(win,{animated:true});
	}
});

win.add(t_maps);