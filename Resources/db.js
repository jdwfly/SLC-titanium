var slcDB = Ti.Database.open('slcdb');

/**
 * This will save events into the database
 * events = JSON string of event data
 */
function slcdbSaveEvents(events) {
  slcDB.execute('DROP TABLE IF EXISTS events');
  slcDB.execute('CREATE TABLE IF NOT EXISTS events (nid INTEGER, title TEXT, eventtype TEXT, day TEXT, datefrom TEXT, dateto TEXT, speaker TEXT, room TEXT, track TEXT, weight TEXT)');
  // Remove all data first
  slcDB.execute('DELETE FROM events');
  
  var parseEvents = JSON.parse(events), i = 0;
  for (i in parseEvents.nodes) {
    slcDB.execute('INSERT INTO events (nid, title, eventtype, day, datefrom, dateto, speaker, room, track, weight) VALUES(?,?,?,?,?,?,?,?,?,?)', 
      parseEvents.nodes[i].node.nid,
      parseEvents.nodes[i].node.title,
      parseEvents.nodes[i].node.type,
      parseEvents.nodes[i].node.day,
      parseEvents.nodes[i].node.from,
      parseEvents.nodes[i].node.to,
      parseEvents.nodes[i].node.speaker,
      parseEvents.nodes[i].node.room,
      parseEvents.nodes[i].node.track,
      parseEvents.nodes[i].node.weight
    );
  }
  Ti.API.info('DB:LAST ROW INSERTED, lastInsertRowId = ' + slcDB.lastInsertRowId);
  Ti.App.Cache.put('dbupdated', 'bogus', 3600);
}

/**
 * This will sessions from a certain time and day.
 *  dateFrom = time value in seconds
 *  day      = date string formatted like 2011-07-11
 * Returns a result set of session events only.
 */
function slcdbGetSessions(dateFrom, day) {
  return slcDB.execute('SELECT DISTINCT * FROM events WHERE eventtype="Session" AND datefrom="'+dateFrom+'" AND day="'+day+'" ORDER BY weight ASC');
}

/**
 * This will get events for a particular day minus sessions.
 *  day = date string formatted like 2011-07-11
 */
function slcdbGetEvents(day) {
  return slcDB.execute('SELECT * FROM events WHERE eventtype<>"Session" AND day="'+day+'" ORDER BY datefrom ASC');
}

/**
 * This will get sessions by speaker
 * snid = Speaker Node ID
 */
function slcdbGetSessionsSpeaker(snid) {
  return slcDB.execute('SELECT * FROM events WHERE eventtype="Session" AND speaker="'+snid+'"');
}