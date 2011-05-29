var win = Ti.UI.currentWindow;
win.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT];

var player = Ti.Media.createVideoPlayer({
  url: "http://lancaster-apple-live.adaptive.level3.net/apple/cwie-lbc/lbc/lbc_iphone.m3u8",
  mediaControlStyle: Ti.Media.VIDEO_CONTROL_DEFAULT,
  scalingMode:Titanium.Media.VIDEO_SCALING_ASPECT_FIT
});

win.add(player);
player.play();
//player.fullscreen = true;

win.addEventListener('close', function() {
	player.stop();
	Ti.UI.orientation = Ti.UI.PORTRAIT;
});

win.addEventListener('blur', function() {
  player.stop();
  Ti.UI.orientation = Ti.UI.PORTRAIT;
});