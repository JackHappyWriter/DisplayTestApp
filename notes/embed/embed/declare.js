
/*
 *
 *  Embed Codes should be able to handle multiple calls to EcalWidget as functions 
 *  window.EcalWidget('destroy');
    window.EcalWidget('boot', {
        apiKey: ''
    });
 *
 */ 
 
if (!window.EcalWidget || window.EcalWidget.isFromV1) {
    window.EcalWidget = function (a, p) {
        this.call = function (a, p) {
            if (a === 'boot') {
                window.EcalWidget.init(p);
            } else if (a === 'destroy') {
                // handle destroy...
            }
        }
        this.call(a,p);
    };
    window.EcalWidget.widgets = [];
    window.EcalWidget.buttonElementsListeners = {};
    window.widgetFuncs = {};
}
