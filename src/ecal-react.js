/* eslint-disable no-sequences */
/* eslint-disable no-useless-concat */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/*
 * EmbedEcalScripts enabled to only embed ecal once.
 */

// const host = '//192.168.0.8:2090'; // home local
const host = '//10.16.111.234:2090';  // forums local
// const host = '//testing-sync.ecal.com'; // test env
// const host = '//staging-sync.ecal.com'; // stage env
// const host = '//sync.ecal.com'; // prod env

export function embedEcalScripts () {
    if (!window.EcalWidget) {
        // local with stage data
        !function(e,t,n,c,i,a,s){i=i||'EcalWidget',e.EcalWidgetObject=i,e[i]=e[i]||function(){(e[i].q=e[i].q||[]).push(arguments)},a=t.createElement(n),s=t.getElementsByTagName(n)[0],e[i].u=c,a.async=1,a.src=c,s.parentNode.insertBefore(a,s)}(window,document,'script', `${host}/button/v1/main.js` + '?t=' + Date.now());
        // setTimeout(removeScript, 400);
    }
}

/*
* place this script on NextJS / ReactJS component that will render the sync button(s)
* call this function before the button is rendered.
*/
export function renderEcalSyncButtons (apikey) {
    embedEcalScripts();
    clearTimeout(window.ecalSyncRenderTimeout);

    function rebootWidgets () {
      const eCalButton = document.getElementsByClassName('ecal-sync-widget-button');
      console.log('rebootWidgets(): ');
      if (window.EcalWidget && eCalButton.length > 0 && apikey) {
        console.log('rebootWidgets()  window.EcalWidget');
        window.EcalWidget('destroy');
        console.log('booting ecal widget', window.EcalWidget);
        window.EcalWidget('boot', { apiKey: apikey });
        return;
      }
      console.log('will attempt to boot');
      // reboot ecal widget if isn't availble yet
      window.renderEcalSyncTO = setTimeout(rebootWidgets, 500);
    }
    window.ecalSyncRenderTimeout = setTimeout(rebootWidgets, 500);
    
}

export function removeScript () {
  var v1script = document.querySelector('script[src*="/button/v1/main.js"]');
  if (v1script) {
    v1script.parentElement.removeChild(v1script);
  }
};