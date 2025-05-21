
function v1ToV2Bootstrap () {
    window.EcalWidget = function (a, p) {
        this.call = function (a, p) {
            if (a === 'destroy') {
                
            } else if ('boot') {
                window.EcalWidget.init(p);
            }
        }
        this.call(a,p);
    };
  
    function loadScript (p) {
        console.log('loadScript() -> ', p);
        var escr = document.createElement('script');
        escr.onload = function (e) {
             
        }
        window.EcalWidgetV1Params = p;
       
        var v1script = document.querySelector('script[src*="/js/eCal.js"]');
        var codeHost = v1script.getAttribute('src'); 
        console.log('codeHost() -> ', codeHost);
        codeHost = codeHost.split('/js/eCal.js')[0];
        escr.setAttribute('src', `${codeHost}/v2/ecal.widget.js?t=${Date.now()}`);
        escr.setAttribute('data-ecal-apikey', p.apiKey);
        var head = document.getElementsByTagName('head')[0];
        // head.appendChild(escr);
        head.insertBefore(escr, v1script);
    }

    window.EcalWidget.init = function (p) {
        console.log(' window.EcalWidget.init init():', p);
        window.EcalWidget.isFromV1 = true; 
        loadScript(p);
        return window.EcalWidget;
    }

    window.EcalWidget.showWhenReady = function () {
        console.log('showWhenReady()..');
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

    window.EcalWidget.init({
        apiKey: window.eCalapiKey,
    });
}
v1ToV2Bootstrap();