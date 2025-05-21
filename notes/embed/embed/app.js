/*
 * Render the ReactJS app in an iframe..
 * updates its styles from hidden to an overlay.
 */

window.widgetFuncs.init = function (p) {
    // console.log('window.EcalWidget.init()');
    window.EcalWidgetV1Params = p;
    window.EcalWidget.boot(p.apiKey);
    return window.EcalWidget;
}

window.widgetFuncs.call = function (action, p) {
    if (action === 'boot') {
        window.EcalWidget.boot(p.apiKey);
    }
}

window.widgetFuncs.attachWidget = function () {
    var w = window.EcalWidget;
    if (window.EcalWidget.appFrame) {
        w.continueBoot();
        return; // return when appFrame is already available...
    }
    var body = document.body;
    var appFrame = document.createElement('iframe');
    appFrame.src = w.host;
    // appFrame.style = 'display: flex; width: 100px; height px;';
    appFrame.style = 'display: none !important;';
    appFrame.onload = function () {
        w.continueBoot();
        // will auto show when show is invoke before the creation of iframe...
        if (window.ECALShowNotified) {

            setTimeout(() => {
                w.show(window.ECALShowParams);
            }, 500);
        }
    }
    
    w.appFrame = appFrame;
    w.widgets.push(appFrame); // used to listen to the frames.
    body.appendChild(appFrame);
};


/*
 *
 * show widget with scheme:
 * {
 *      email:                 'user@example.com',
        category:              ['path/to/category1','path/to/category2'],
        calendarIds:           ['4d6449d86c212173490001bf'],
        calendar_reference:    ['19374'],
        mobileNumber:          '61403123456',
        shareUrl:              'http://example.com/',
        referringPage:         'PurchaseConfirmationPage',
        autoSubscribe:         true,

        widgetSettings: widget data,
 * }
 */
window.widgetFuncs.show = function (params) {
    console.log('EcalWidget.show(): ', params);
    window.ECALShowNotified = true;
    window.ECALShowParams = params;
    var w = window.EcalWidget;
    var v1Params = window.EcalWidgetV1Params;

    if (!params || Object.keys(params).length <= 0) {
        console.log('.show() -> loading emtpy or null usiving v1Params..: ', v1Params);
        // get from data from widget params
        var id = v1Params.widgetId;
        w.postMessage({
            action: 'launchWidget',
            data: {
                widgetId: id,
                pageParams: v1Params,
            },
        });
    } else {
        var widget = params.widgetSettings;
        if (!widget) {
            widget = v1Params;
        };

        delete params.widgetSettings;
        let wid = widget.id;

        if (!wid) {
            wid = params.widgetId;
        }
        if (v1Params.widgetId) {
            wid = v1Params.widgetId;
        }
        
        console.log('EcalWidget.show(): Processing ID ', wid);

        var pageParams = {
            ...v1Params,
            ...params,
        };

        console.log('pageParams:  v1Params: ', v1Params);
        console.log('pageParams: ', pageParams);

        w.postMessage({
            action: 'launchWidget',
            data: {
                widgetId: wid,
                pageParams,
            },
        });
    }

    w.showWidgetFrame();
}

window.widgetFuncs.showWidget = function (widget, params) {
    var w = window.EcalWidget;
    /* this is to update the appFrame styles to make it visible */
    // console.log('Show Widget() ', widget);
    w.postMessage({
        action: 'showWidget',
        data: {
            widget: widget,
            pageParams: params,
        },
    });
    w.showWidgetFrame();
}

window.widgetFuncs.showWidgetFrame = function (widget) {
    var w = window.EcalWidget;
    var appFrame =w.appFrame;
    appFrame.className = 'ecal-widget-frame';
    appFrame.style = '';
}

window.widgetFuncs.hideWidget = function () {
    /* this is to update the appFrame styles to make it visible */
    var appFrame = window.EcalWidget.appFrame;
    appFrame.className = '';
    appFrame.style = 'display: none !important; width: 0px; height: 0px; background-color: transparent;';
}

window.widgetFuncs.launchWidget = function (widgetId, params) {
    var w = window.EcalWidget;
    w.postMessage({
        action: 'launchWidget',
        data: {
            widgetId: widgetId,
            pageParams: params,
        },
    });
    w.showWidgetFrame();
}

window.widgetFuncs.launchWidgetWithAPIKey = function (widgetId, apikey, params) {
    var w = window.EcalWidget;
    window.EcalWidget.apikey = apikey;
    w.postMessage({
        action: 'launchWidget',
        data: {
            widgetId: widgetId,
            pageParams: params,
            apikey: apikey,
        },
    });
    w.showWidgetFrame();
}

window.widgetFuncs.showWhenReady = function () {
    function showWidget () {
        if (Array.isArray(window.EcalWidget.listenersRegistry)) {
            if (window.EcalWidget.listenersRegistry.length > 0) {
                const btn = document.querySelector('.ecal-sync-widget-button');
                if (btn) {
                    btn.click();
                    return;
                }
            } 
        } 
        setTimeout(showWidget, 50);
    }
    setTimeout(showWidget, 50);
}
