
window.widgetFuncs.shouldHideButton = function (widget) {
    if (widget.status === '403' && widget.statusLong === 'The API Key does not exist in the system') {
        return true;
    } else if (widget.errors && widget.errors.id === 'Invalid value for Button ID') {
        return true;
    } else if (!widget.isPublished) {
        return true;
    }
    return false;
}

window.widgetFuncs.renderButton = function (widget, btnElement) {
    var w = window.EcalWidget;
    var btn = btnElement; // w.getButton(widget.id);

    var btnObj = document.querySelectorAll('[data-ecal-widget-id="'+widget.id+'"]')[0];
    // console.log('renderButton() - widget: ', widget);

    if (btnObj && w.shouldHideButton(widget)) {
        btnObj.style = 'display: none !important';
        return;
    }

    // console.log('renderButton(): widget -> ', widget);
    // * make it object or display as is...
    var btnSkin = document.createElement('div');
    btnSkin.setAttribute('data-ecal-sync-widget-child-ref','');

    var obj = document.createElement('object');
    obj.setAttribute('style', 'cursor: pointer; pointer-events: none;');
    obj.setAttribute('data', widget.button_image);
    if (widget.button_image.indexOf('.svg') !== -1) {
        btnSkin.setAttribute('style', `width: ${widget.button_width}px`);
    }

    btnSkin.appendChild(obj);

    // check if button skin will be injected or not
    var nostyling = btn.getAttribute('data-ecal-no-styling');
    // if null inject skin, if '' or true don't inject
    if (nostyling === null || nostyling.toLowerCase() === 'false') {
        // console.log(' will INJECT BUTTON SKIN');
        // inject button skin..
        while (btn.hasChildNodes()) {
            btn.removeChild(btn.firstChild);
        }
        btn.appendChild(btnSkin);
    }
    w.attachClicks(btn, widget);
}

window.widgetFuncs.renderButtons = function () {
    var w = window.EcalWidget;
    w.clearListeners();
    var btnElements = w.buttonElements;
    // console.log("renderBUttons() widgetsMap:  ", w.widgetsMap);
    for (var i = 0; i < btnElements.length; i++) {
        var btn = btnElements[i];
        var id = btn.getAttribute('data-ecal-widget-id') || btn.getAttribute('data-id');
        var widget = w.getWidgetById(id);
        w.renderButton(widget, btn);
    }
}

window.widgetFuncs.getWidgetById = function  (widgetId) {
    var w = window.EcalWidget;
    return w.widgetsMap[widgetId];
}
