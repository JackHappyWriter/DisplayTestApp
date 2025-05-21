function construct () {
 
    var funcs = window.widgetFuncs;
    for (let i in funcs) {
        window.EcalWidget[i] = funcs[i];
    }
}
construct();