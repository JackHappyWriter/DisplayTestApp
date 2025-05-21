/*
 * SyncDisplay-XConnect will only be added to the clients who host SyncDisplay from ecal.com pages
 */
(() => {
    function openCalendar (calendarURL) {
        // console.log('syncdisplay-xconnect.openCalendar() URL: ', calendarURL);
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

    window.addEventListener('message', (e) => {
        if (e.data.action === 'SyncDisplayXConnectOpenCalendar') {
            openCalendar(e.data?.data?.calendarURL);
        }
    });
})();
