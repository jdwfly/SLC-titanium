// Helper function that converts seconds into a readable time string
function slcSecondsToTime(seconds) {
  var hours = parseInt(seconds / 3600);
  var minutes = (seconds % 3600) / 60;
  var meridiem = '';
  
  if (hours > 12) {
    hours = hours - 12;
    meridiem = 'pm';
  } else if (hours == 24) {
    hours = 12;
    meridiem = 'pm';
  } else if (hours == 0) {
    hours = 12;
    meridiem = 'am';
  } else {
    meridiem = 'am';
  }
  
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  
  time = hours + ':' + minutes + ' ' + meridiem;
  
  return time;
}

// Helper function to replace certain encoded characters
function html_decode(string) {
  string = string.replace(/&#039;/gi, "'");
  string = string.replace(/&amp;/gi, "&");
  return string;
}

// Helper function to convert time string to seconds from midnight
function convertSeconds(string) {  
  var meridiem = string.substr(string.length-2, string.length);
  var buffer = 0;
  if (string.charAt(1) == ":") {
    buffer = 1;
  }
  var hours = parseFloat(string.substr(0,2-buffer));
  // add 12 hours if pm
  if (meridiem == 'pm' && hours != 12) {
    hours += 12;
  }
  var minutes = parseFloat(string.substr(3-buffer, 2));
  var totalTime = hours + (minutes / 60);
  totalTime = totalTime * 3600;
  return totalTime;
}

// Helper function to give the textual representation of the day of the week
// BOO on you javascript for only giving me a number
// daynum = a date string formatted 2011-07-11
function slcDayofWeek(daynum) {
  var d = new Date();
  var e = daynum.split("-");
  d.setFullYear(parseInt(e[0]), (parseInt(e[1])-1), parseInt(e[2]));
  switch (d.getDay()) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
}