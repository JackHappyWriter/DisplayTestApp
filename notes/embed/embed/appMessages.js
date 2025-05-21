/*
 * Similar to Current Uniwidget, 
 * App built in react will be used to make the request to API through window.postMessage;
 */

function appMessageListener (event) {
    /* process app messages */
    var w = window.EcalWidget;
    var f = w.messageActions[event.data.action];
    if (f && typeof f === 'function') {
        f(event.data.data);
    }
}

window.widgetFuncs.attachListeners = function () {
    window.addEventListener('message', appMessageListener);
}

window.widgetFuncs.postMessage = function (data) {
    var w = window.EcalWidget;
    for (var i = 0; i < w.widgets.length; i++) {
        var widget = w.widgets[i];
        if (widget && widget.contentWindow) {
            widget.contentWindow.postMessage(data, '*');
        }
    }
}

window.widgetFuncs.initAppWidget = function () {
    var w = window.EcalWidget;
    w.postMessage({
        action: 'initWidget',
        data: {
            host: w.host,
            apikey: w.apikey,
        },
    });
}