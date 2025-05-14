/* eslint-disable no-sequences */
/* eslint-disable no-useless-concat */
/* eslint-disable no-unused-expressions */
/*
 * EmbedEcalScripts enabled to only embed ecal once.
 */
export function embedEcalScripts () {
    if (!window.EcalWidget) {
        // local with stage data
        !function(e,t,n,c,i,a,s){i=i||'EcalWidget',e.EcalWidgetObject=i,e[i]=e[i]||function(){(e[i].q=e[i].q||[]).push(arguments)},a=t.createElement(n),s=t.getElementsByTagName(n)[0],e[i].u=c,a.async=1,a.src=c,s.parentNode.insertBefore(a,s)}(window,document,'script', '//10.16.111.234:2090/button/v1/main.js' + '?t=' + Date.now());
        
        // stage env
        // !function(e,t,n,c,i,a,s){i=i||'EcalWidget',e.EcalWidgetObject=i,e[i]=e[i]||function(){(e[i].q=e[i].q||[]).push(arguments)},a=t.createElement(n),s=t.getElementsByTagName(n)[0],e[i].u=c,a.async=1,a.src=c,s.parentNode.insertBefore(a,s)}(window,document,'script', '//staging-sync.ecal.com/button/v1/main.js' + '?t=' + Date.now());
       
        // test environment
        // !function(e,t,n,c,i,a,s){i=i||'EcalWidget',e.EcalWidgetObject=i,e[i]=e[i]||function(){(e[i].q=e[i].q||[]).push(arguments)},a=t.createElement(n),s=t.getElementsByTagName(n)[0],e[i].u=c,a.async=1,a.src=c,s.parentNode.insertBefore(a,s)}(window,document,'script', '//testing-sync.ecal.com/button/v1/main.js' + '?t=' + Date.now());
       
        // prod environment
        // !function(e,t,n,c,i,a,s){i=i||'EcalWidget',e.EcalWidgetObject=i,e[i]=e[i]||function(){(e[i].q=e[i].q||[]).push(arguments)},a=t.createElement(n),s=t.getElementsByTagName(n)[0],e[i].u=c,a.async=1,a.src=c,s.parentNode.insertBefore(a,s)}(window,document,'script', '//sync.ecal.com/button/v1/main.js' + '?t=' + Date.now());
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