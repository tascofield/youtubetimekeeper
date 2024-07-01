// console.log('hello from injected.js')
function getCurrentTime() {
  const videoElement = document.querySelector('video');
  if (document.querySelector("div.ad-showing") != null) {return null}
  if (window.location.href.match("watch") == null) {return null}
  if (videoElement) {
    return videoElement.currentTime;
  }
  return null;
}

// Function to send data back to the content script
function sendToContentScript(data) {
  window.postMessage({ type: 'FROM_PAGE', ...data }, '*');
}

function setTimeUpdater() {
	const video = window.document.querySelector("video")
	if (video != null) {
		video.ontimeupdate = () => sendToContentScript({currentTime: getCurrentTime()})
	}
}

function onObserveUrlChange(callback) {
	window.addEventListener("yt-navigate-finish",callback)
}

onObserveUrlChange(() => { 
	// console.log("detected load, resetting time updater")
	setTimeUpdater()
})

setTimeUpdater()