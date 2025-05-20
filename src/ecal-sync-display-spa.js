/*
 * EmbedEcalScripts enabled to only embed ecal once.
 */

// const host = '//192.168.0.8:2090'; // home local
// const host = '//10.16.111.234:2090';  // forums local
const host = '//testing-sync.ecal.com'; // test env
// const host = '//staging-sync.ecal.com'; // stage env
// const host = '//sync.ecal.com'; // prod env

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
        script.setAttribute('data-ecal-autoboot', false);
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
    function bootSyncDisplay () {
      const ecalBtns = document.getElementsByClassName('ecal-sync-widget-button');
      if (window.EcalWidget && ecalBtns.length > 0 && apikey) {
        window.EcalWidget('boot', { apiKey: apikey });
        return;
      }
      window.syncDisplayTO = setTimeout(bootSyncDisplay, 500);
    }
    window.syncDisplayTO = setTimeout(bootSyncDisplay, 500);
}
