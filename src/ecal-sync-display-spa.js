/*
 * EmbedEcalScripts enabled to only embed ecal once.
 */
export function loadSyncDisplay (apikey) {
    if (!window.EcalWidget) {
        const script = document.createElement('script');
        const src = `//10.16.111.234:2090/v2/ecal.widget.min.js?t=${Date.now()}}`;
        script.setAttribute('src', src);
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('data-ecal-apikey', apikey);
        const head = document.getElementsByTagName('head')[0];
        head.appendChild(script);
    }
}

/*
* place this script on NextJS / ReactJS component that will render the sync button(s)
* call this function before the button is rendered.
*/
export function renderSyncDisplay (apikey) {
    loadSyncDisplay(apikey);
    clearTimeout(window.syncDisplayTO);
    function rebootWidgets () {
      clearTimeout(window.syncDisplayTO);
      const eCalButton = document.getElementsByClassName('ecal-sync-widget-button');
      console.log('rebootWidgets(): ');
      if (window.EcalWidget && eCalButton.length > 0 && apikey) {
        debounceBoot(apikey);
        return;
      }
      // reboot ecal widget if isn't availble yet
      window.syncDisplayTO = setTimeout(rebootWidgets, 500);
    }
    window.syncDisplayTO = setTimeout(rebootWidgets, 500);
}

function debounceBoot(apikey) {
  console.log('DEBOUNCE');
  clearTimeout(window.bootSyncDisplayTo);
  window.bootSyncDisplayTo = setTimeout(() => {
    window.EcalWidget('boot', { apiKey: apikey });
  }, 1000);
}
