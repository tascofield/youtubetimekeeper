//console.log("hello from timekeep.js")

// Function to inject the script
function injectScript(file_path) {
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file_path);
  document.body.appendChild(script);
}

// Get the URL for the injected script
let injectedScriptUrl = browser.runtime.getURL('timekeeper_injected.js');

// Inject the script
injectScript(injectedScriptUrl);

function changeURL(newURL) {
  window.history.replaceState({}, '', newURL);
}

// Listen for messages from the injected script
window.addEventListener('message', function(event) {
  	if (event.data.type && event.data.type == 'FROM_PAGE') {
		let currentTime = event.data.currentTime
		if (currentTime != null) {
			let currentURL = new URL(window.location.href);
			if (currentURL.searchParams.has("v")) {
				currentURL.searchParams.set('t', Math.floor(currentTime));
				if (currentTime == 0) {
					currentURL.searchParams.delete('t')
				}
				changeURL(currentURL.toString());
			}
		}
  	}
});