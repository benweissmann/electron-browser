const { ipcRenderer } = require('electron');

window.onresize = doLayout;
var isLoading = false;

onload = function() {
  var webview = document.querySelector('webview');
  doLayout();

  ipcRenderer.on('reload', () => {
    webview.reload();
  });

  ipcRenderer.on('toggleWebviewDevTools', () => {
    webview.getWebContents().toggleDevTools();
  });

  document.querySelector('#location-form').onsubmit = function(e) {
    e.preventDefault();
    navigateTo(document.querySelector('#location').value);
  };

  webview.addEventListener('did-start-loading', handleLoadStart);
  webview.addEventListener('did-get-redirect-request', handleLoadRedirect);
  webview.addEventListener('did-finish-load', handleLoadCommit);
};

function navigateTo(url) {
  document.querySelector('webview').src = url;
}

function doLayout() {
  var webview = document.querySelector('webview');
  var controls = document.querySelector('#controls');
  var controlsHeight = controls.offsetHeight;
  var windowWidth = document.documentElement.clientWidth;
  var windowHeight = document.documentElement.clientHeight;
  var webviewWidth = windowWidth;
  var webviewHeight = windowHeight - controlsHeight;

  webview.style.width = webviewWidth + 'px';
  webview.style.height = webviewHeight + 'px';
}


function handleLoadCommit() {
  var webview = document.querySelector('webview');
  document.querySelector('#location').value = webview.getURL();
}

function handleLoadStart(event) {
  if (!event.isTopLevel) {
    return;
  }

  document.querySelector('#location').value = event.url;
}

function handleLoadRedirect(event) {
  document.querySelector('#location').value = event.newUrl;
}
