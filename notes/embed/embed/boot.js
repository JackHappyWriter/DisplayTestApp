function boot (apikey) {
    window.EcalWidget.apikey = apikey;
    const w = window.EcalWidget;
    w.attachListeners();
    w.attachWidget();
    w.createMessageActions();
}

window.widgetFuncs.boot = boot;

window.widgetFuncs.continueBoot = function () {
    const w = window.EcalWidget;
    function delayBoot () {
        w.initAppWidget();
        w.initButtons();
        w.loadButtons();
    }
    setTimeout(delayBoot, 300);
}
