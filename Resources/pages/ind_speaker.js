Ti.include("../db.js");
Ti.include("../misc.js");

// Renders Individual speaker pages.

var win = Ti.UI.currentWindow;
win.backgroundColor = "#313131";
var sdata = [];

var headerRow = Ti.UI.createTableViewRow({
  height: 120,
  borderWidth: 0,
  layout: "vertical",
  borderColor: "#313131",
  selectionStyle: "none"
});

// Create the speaker image
var fname = win.fname.toLowerCase();
var lname = win.lname.replace(" ", "-");
lname = lname.toLowerCase();
var speakerFileName = fname + "-" + lname;
speakerFileName = speakerFileName.replace(/\./gi, "");


if (Ti.Filesystem.getFile("data/speakerimages/", speakerFileName + ".jpg").exists()) {
  var imageFilePath = "../data/speakerimages/" + speakerFileName + ".jpg";
} else {
  var imageFilePath = "../data/speakerimages/default.jpg";
}

speakerFileName = speakerFileName.replace(".", "");
var speakerImage = Ti.UI.createImageView({
  image:imageFilePath,
  top:20,
  left:20,
  width:80,
  height:90,
  borderWidth: 5,
  borderColor: "#c6c6c6"
});

headerRow.add(speakerImage);

// Add the name of the speaker
var speakerTitle = Ti.UI.createLabel({
  text: win.name,
  top: -65,
  left: 115,
  width: "auto",
  height: "auto",
  color: "#a1b1c4",
  font: {fontWeight: "bold", fontSize: 18, fontFamily: "Georgia"}
});

var speakerLocation = Ti.UI.createLabel({
  text: win.slcLocation,
  top: 0,
  left: 115,
  width: "auto",
  height: "auto",
  color: "#a1b1c4",
  font: {fontSize: 14, fontFamily: "Georgia"}
});

headerRow.add(speakerTitle);
headerRow.add(speakerLocation);

sdata.push(headerRow);

// Add a bio is the speaker has one
var bio = win.bio;
if (bio != null) {
  var bioRow = Ti.UI.createTableViewRow({
    height: "auto",
    selectionStyle: "none"
  });
  var bioLabel = Ti.UI.createLabel({
    text: bio,
    top: 0,
    left: 20,
    right: 20,
    height: "auto",
    color: "#7f7f7f"
  });
  bioRow.add(bioLabel);
  sdata.push(bioRow);
}

// Now add the sessions if the speaker has any
var sessions = slcdbGetSessionsSpeaker(win.name);
Ti.API.info("Total sessions for "+win.name+": "+sessions.rowCount);
if (sessions.rowCount > 0) {
  var sessionHeader = Ti.UI.createTableViewRow({selectionStyle: "none"});
  var sessionHeaderTitle = Ti.UI.createLabel({
    text: "Workshop Sessions",
    font: {fontSize:14, fontFamily: "Georgia", fontWeight: "bold"},
    color: "#a1b1c4",
    left: 20,
    right: 20
  });
  sessionHeader.add(sessionHeaderTitle);
  sdata.push(sessionHeader);
  while (sessions.isValidRow()) {
    var sessionRow = Ti.UI.createTableViewRow({
      height: "auto",
      layout: "vertical",
      selectionStyle: "none"
    });
    var sessionTitle = Ti.UI.createLabel({
      text: html_decode(sessions.fieldByName('title')),
      top: 0,
      left: 20,
      font: {fontSize:14},
      width: 275,
      height: "auto",
      color: "#b0b0b0"
    });
    var dayofweek = slcDayofWeek(sessions.fieldByName('day'));
    var sessionTime = slcSecondsToTime(sessions.fieldByName('datefrom'));
    var sessionExtra = Ti.UI.createLabel({
      text: dayofweek + " | " + sessionTime + " | " + sessions.fieldByName('room'),
      width: "auto",
      height: "auto",
      font: {fontSize: 12},
      color: "#7c7c7c",
      top: 0,
      left: 20
    });
    
    sessionRow.add(sessionTitle);
    sessionRow.add(sessionExtra);
    sdata.push(sessionRow);
    
    var paddingRow = Ti.UI.createTableViewRow({
      height: 10,
      selectionStyle: "none"
    });
    sdata.push(paddingRow);
    sessions.next();
  }
}

var speakerTable = Ti.UI.createTableView({
  data: sdata,
  backgroundColor: "#313131",
  separatorColor: "#313131"
});

win.add(speakerTable);