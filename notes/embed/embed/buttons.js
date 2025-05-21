/*
 * get all the available ECAL buttons in the page
 */

window.widgetFuncs.initButtons = function () {
    var w = window.EcalWidget;
    var buttons = document.querySelectorAll("[class*='ecal-sync-widget-button'], [class*='ecalApi'], [data-ecal-widget-id]");

    function hasExactClass(className) {
        const classNames = className.split(' ');
        return classNames.includes('ecal-sync-widget-button');
    }

    /* 
     * Will filter the buttons to only to accept specific "ecal-sync-widget-button" that's retrieved from
     * [class*='ecal-sync-widget-button']
     * will not include others like
     * ecal-sync-widget-button__icon, ecal-sync-widget-button-icon ecal-sync-widget-button__text
     */

    function filterButtons () {
        var filtered = [];
        for (var i = 0; i < buttons.length; i++) {
            var btn = buttons[i];
            if (btn.className.includes('ecal-sync-widget-button')) {
                if (hasExactClass(btn.className)) {
                    filtered.push(btn);
                }
            } else {
                filtered.push(btn);
            }
        }
        return filtered;
    }

    buttons = filterButtons();

    // to handle OLDEST ECAL LEGACY
    var id_attr = 'data-ecal-widget-id';
    var isLegacy = document.querySelector('script[src*="js/eCal.js"]') || window.eCalapiKey;
    // console.log('initButtons() -> ', buttons);
    if (isLegacy) {
        // buttons = document.querySelectorAll("[class*='ecalApi']");
        id_attr = 'data-id';
    }

    window.EcalWidget.buttonElements = buttons;
    window.EcalWidget.buttons = [];
    for (var i = 0; i < buttons.length; i++) {
        var btn = buttons[i];
        var widgetId = btn.getAttribute(id_attr);
        w.buttons.push(widgetId);
    }
};

window.widgetFuncs.getButton = function (widgetId) {
    var btn = document.querySelector(`[data-ecal-widget-id*='${widgetId}']`);
    return btn;
}

window.widgetFuncs.loadButtons = function () {
    var w = window.EcalWidget;
    w.postMessage({
        action: 'loadButtons',
        data: {
            buttons: w.buttons,
        },
    });
}
