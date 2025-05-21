window.widgetFuncs.createMessageActions = function () {
    var w = window.EcalWidget;

    function buttonsLoaded (data) {
        w.widgetsList = data.widgetsList;
        w.widgetsMap = {};
        for (var i = 0; i < w.widgetsList.length; i++) {
            
            var widget = w.widgetsList[i];
            // console.log('Widgets Map() - widget: ', widget);
            w.widgetsMap[widget.id] = widget;
        }
        // debounce button so that it won't be rendered multiple times to prevent attaching click events
        clearTimeout(w.buttonRenderTO);
        w.buttonRenderTO = setTimeout(() => {
            w.renderButtons();
        }, 500);  
    }

    function widgetLoaded (data) {
        if (!w.widgetsList) {
            w.widgetList = [];
        };
        w.widgetList.push(data.widget);
    }

    function closeWidget (data) {
        w.hideWidget();
    }

    function openDeviceCalendar (data) {
        console.log('appMessageActions.openDeviceCalendar():  data: ', data);
        // console.log('openDeviceCalendar():  window.parent: ', window.parent);
        if (data.options && data.options.flags) {
            w.openCalendarVialink(data.calendarURL);
        } else {
            window.location.assign(data.calendarURL);
        }

        if (window.parent) {
            // dispatch messge to the containing iframe..
            console.log('appMessageActions.openCalendarVialink() dispatch SyncDisplayXConnectOpenCalendar with ', data.calendarURL);
            const message = {
                action: 'SyncDisplayXConnectOpenCalendar',
                data: {
                    calendarURL: data.calendarURL,
                },
            };
            window.parent.postMessage(message, '*');
        }
    }

    function locationAssign (data) {
        window.location.assign(data.url);
    }
    
    var actions = {
        buttonsLoaded: buttonsLoaded,
        closeWidget: closeWidget,
        openDeviceCalendar,
        locationAssign,
        widgetLoaded,
    };
    w.messageActions = actions;
};

window.widgetFuncs.openCalendarVialink = function (calendarURL) {
    // attempt to open calendar vialink on through button embed
    console.log('EcalWidget.openCalendarVialink() ->: ', calendarURL);
    const a = document.createElement('a');
    a.style = 'display: none';
    a.href = calendarURL;
    a.innerHTML = 'open calendar';
    document.body.appendChild(a);
    a.target = '_top';
    // a.click();
    setTimeout(() => {
        a.dispatchEvent(new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: false
        }));
        document.body.removeChild(a);
    }, 50); 
}
