
function v1ToV2Bootstrap () {

    window.EcalWidget = function (a, p) {
        this.call = function (a, p) {
            if (a === 'destroy') {
                
            } else if (a === 'boot') {
                window.EcalWidget.init(p);
            }
        }
        this.call(a,p);
    };
  
    function loadScript (p) {
        var escr = document.createElement('script');
        escr.onload = function (e) {
            
        }
        window.EcalWidgetV1Params = p;
       
        var v1script = document.querySelector('script[src*="/button/v1/main.js"]');
        var codeHost = v1script.getAttribute('src'); 
        // console.log('codeHost() -> ', codeHost);
        codeHost = codeHost.split('/button/v1/main.js')[0];
        escr.setAttribute('src', `${codeHost}/v2/ecal.widget.min.js?t=${Date.now()}`);
        escr.setAttribute('data-ecal-apikey', p.apiKey);
        var head = document.getElementsByTagName('head')[0];
        // head.appendChild(escr);
        head.insertBefore(escr, v1script);
    }

    window.EcalWidget.init = function (p) {
        window.EcalWidget.legacyInitialized = true;
        window.EcalWidget.isFromV1 = true; 
        loadScript(p);
        return window.EcalWidget;
    }

    window.EcalWidget.showWhenReady = function () {
        // console.log('showWhenReady()..');
        function showWidget () {
            if (!window.EcalWidget) {
                setTimeout(showWidget, 50);
            } else {
                const btn = document.querySelector('.ecal-sync-widget-button');
                if (!btn || !btn.clickReady) {
                    setTimeout(showWidget,50);
                } else {
                    btn.click();
                }
            }
        }
        setTimeout(showWidget, 50);
    }

    window.EcalWidget.show = function (p) {
        function showNow () {
            if (!window.EcalWidget) {
                setTimeout(showNow, 50);
            } else {
                
                if (typeof window.EcalWidget.showWidget === 'function') {
                    if (p) {
                        window.EcalWidget.show(p);
                    } else {
                        window.EcalWidget.show();
                    }
                } else {
                    setTimeout(showNow,50);
                }
            }
        }
        setTimeout(showNow, 50);
    }

    function getLegacyActionableQueue () {
        var legacyEcal =  window.legacyEcalWidgetObject;
        var actionables = [];
        if (legacyEcal && legacyEcal.q && Array.isArray(legacyEcal.q)) {
            for (let i = 0; i < legacyEcal.q.length; i++) {
                var action = {
                    action: '',
                    params: [],
                };
              const args = legacyEcal.q[i];
               
              for (let j = 0; j < args.length; j++) {
                if (j === 0) {
                    action.action = args[j];
                } else {
                    action.params.push(args[j]);
                }
              }
              actionables.push(action);
            }
        }
        return actionables;
    }

    var actions = getLegacyActionableQueue();
    function execLegacyActions () {
        if (window.EcalWidget.legacyInitialized) {
            return;
        }
        if (actions.length > 0) {
            for (let i = 0; i < actions.length;i++) {
                var action = actions[i];
                window.EcalWidget(action.action, ...action.params);
            }
        }
    }
    execLegacyActions();
}
window.legacyEcalWidgetObject = window.EcalWidget;
v1ToV2Bootstrap();
