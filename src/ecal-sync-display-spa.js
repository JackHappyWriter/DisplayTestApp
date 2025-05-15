/*
 * EmbedEcalScripts enabled to only embed ecal once.
 */
const host = '//192.168.0.8:2090';
//const host = '//10.16.111.234:2090';
export function loadSyncDisplay (apikey) {
    if (!window.EcalWidget) {
      clearTimeout(window.loadSDTO);
      // debounce adding script on launch...
      window.loadSDTO = setTimeout(() => {
        const script = document.createElement('script');
        const src = `${host}/v2/ecal.widget.min.js?t=${Date.now()}}`;
        script.setAttribute('src', src);
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('data-ecal-apikey', apikey);
        script.setAttribute('data-ecal-spa', true);
        const head = document.getElementsByTagName('head')[0];
        head.appendChild(script);
      },200);
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
      const eCalButton = document.getElementsByClassName('ecal-sync-widget-button');
      if (window.EcalWidget && eCalButton.length > 0 && apikey) {
        debounceBoot(apikey);
        return;
      }
      // reboot ecal widget if isn't availble yet
      window.syncDisplayTO = setTimeout(rebootWidgets, 200);
    }
    window.syncDisplayTO = setTimeout(rebootWidgets, 200);
}

function debounceBoot(apikey) {
  clearTimeout(window.syncDisplayBootTO);
  window.syncDisplayBootTO = setTimeout(() => {
    window.EcalWidget('boot', { apiKey: apikey });
  }, 400);
}
