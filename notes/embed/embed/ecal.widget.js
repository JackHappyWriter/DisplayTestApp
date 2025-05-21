function ecalWidgetBootstrap () {
    /* update version whenever we updated something related to the embed scripts functionality */
    var version = '2.009'; 
    /*
    var hosts = {
        local: 'https://localhost:2090/',
        test: 'https://ecal-test-uniwidget-v2-ui.s3.us-east-1.amazonaws.com',
        stage: 'https://ecal-stage-uniwidget-v2-ui.s3.us-east-1.amazonaws.com',
        prod: '',
    };
    */
    var script = document.querySelector("script[data-ecal-apikey]");
    var apiKey = script.getAttribute('data-ecal-apikey');
    var bootSrc = script.getAttribute('src');
    var ecalAlias = script.getAttribute('data-ecal-alias');
    var scriptOnLoad = script.getAttribute('data-ecal-script-onload');
    var autoBoot = script.getAttribute('data-ecal-autoboot');
    autoBoot = (autoBoot && autoBoot.toLowerCase() === 'false') ? false : true;

    var spa = script.getAttribute('data-ecal-spa') ? true : false;
    bootSrc = bootSrc.split('/v2/ecal.widget')[0];
    window.EcalWidgetAPIKey = apiKey;
    // console.log(`BootSource ${bootSrc} Apikey: ${apiKey}`);
   
    function initialized () {
        window.EcalWidget.host = bootSrc;
        // console.log('Ecal Widget Host: ',  window.EcalWidget.host);
        window[ecalAlias] =  window.EcalWidget;
        if (scriptOnLoad && typeof window[scriptOnLoad] === 'function') {
            window[scriptOnLoad](window.EcalWidget, { apiKey: apiKey });
        }
        if (!autoBoot) return;
        console.log('initialized after script load...');
        window.EcalWidget.boot(apiKey);
    }

    function loadScript () {
        var escr = document.createElement('script');
        escr.onload = function (e) {
            initialized();
        }
        var src = `${bootSrc}/v2/widget.min.js?v=${version}`;
        escr.setAttribute('src', src);
        escr.setAttribute('type', 'text/javascript');
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(escr);
    }

    function loadCSS () {
        // <link rel="stylesheet" href="styles.css"></link>

        var linkcss = document.createElement('link');
        linkcss.onload = function (e) {
            loadScript(); 
        }
        linkcss.setAttribute('rel', 'stylesheet');
        linkcss.setAttribute('href', `${bootSrc}/v2/widget.min.css`);
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(linkcss);
    }

    if (!spa) {
        loadCSS();
    } else {
        // debounce script loading on Single Page Apps like, React, NextJs, Vue and Angular..
        clearTimeout(window.syncDisplayEmbedTO);
        window.syncDisplayEmbedTO = setTimeout(() => {
            loadCSS();
        }, 1000); // prevent page from embedding the script
    }
    
}
ecalWidgetBootstrap();