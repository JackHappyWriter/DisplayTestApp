window.widgetFuncs.attachClicks = function (btn, widget) {
    var w = window.EcalWidget;
    function show () {
        var p = {};
        function fillIn (p, src) {
            if (!src || src === undefined) return;
            for (let i in src) {
                p[i] = src[i];
            }
        }

        var attrMap = {
            'data-ecal-category': 'category',
            'data-ecal-email' : 'email',
            'data-ecal-calendar-reference': 'calendar_reference',
            /*
            'data-ecal-skip-schedule-selection': 'skip_schedule_selection',
            'data-ecal-calendar-ids': 'calendarIds',
            'data-ecal-subscriber-reference': 'subscriber_reference',
            'data-ecal-referring-page': 'referringPage',
            'data-ecal-state': 'state',
            */
            'autosubscribe' : 'autoSubscribe',            
        };
         
        var attrs = btn.getAttributeNames();

        for (let i = 0; i < attrs.length; i++) {
            var attr = attrs[i];
            var attrVal = btn.getAttribute(attr);
            /*
            if (attr === 'data-ecal-state') {
                try {
                    var newVal = JSON.parse(attrVal);
                    attrVal = newVal;
                } catch (e) {
                    console.log('cannot parse "data-ecal-state" incorrect json format');
                }
            }
            */

            var propName = attrMap[attr];
            if (propName) {
                p[propName] = attrVal;
            } else {
                p[attr] = attrVal;
            }
        }

        fillIn(p, window.EcalWidgetV1Params);

        if (attrs.length <= 0) {
            w.showWidget(widget, null);
        } else {
            w.showWidget(widget, p);
        }
    }

    window.EcalWidget.registerListener(btn, show);
    btn.addEventListener('click', show);
    btn.clickReady = true;
}

window.widgetFuncs.registerListener = function (btn, listener) {
    var w = window.EcalWidget;
    if (!w.listenersRegistry && !Array.isArray(w.listenersRegistry)) {
        w.listenersRegistry = [];
    }
    w.listenersRegistry.push({
        btn,
        listener,
    });
}

window.widgetFuncs.clearListeners = function () {
    var w = window.EcalWidget;
    if (Array.isArray(w.listenersRegistry)) {
        // console.log('clearListeners() -> ', w.listenersRegistry);
        for (var i = 0; i < w.listenersRegistry.length; i++) {
            const item = w.listenersRegistry[i];
            if (item.btn && item.listener) {
                item.btn.removeEventListener('click', item.listener);
            }
        }
        w.listenersRegistry = [];
    }
}