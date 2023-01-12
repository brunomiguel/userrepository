// Based on https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
export default function () {
    if (typeof window.Event === 'function')
        return false; // Polyfill unneeded

    function Event(event, params) {
        params = params || {
            bubbles: false,
            cancelable: false,
            composed: false
        };

        var evt = document.createEvent('Event');
        evt.initEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    Event.prototype = window.Event.prototype;
    window.Event = Event; // Expose to window
}
