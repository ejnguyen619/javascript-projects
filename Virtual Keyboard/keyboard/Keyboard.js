const Keyboard = {

    // ----------------------------------------------------
    // PROPERTIES
    // ----------------------------------------------------
    // HTML keyboard elements
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    // Handle keyboard events
    eventHandler: {
        oninput: null,
        onclose: null
    },

    // Current states of keyboard
    properties: {
        value: '',
        capsLock: false
    },
    // ----------------------------------------------------
    // FUNCTIONS
    // ----------------------------------------------------
    // Initialize keyboard
    init() {

    },

    // Create HTML for each key
    _createKeys() {

    },

    // Trigger oninput or onclose
    _triggerEvent(handlerName) {
        console.log('Event Triggered: Event Name: ' + handlerName);
    },

    _toggleCapsLock() {
        console.log('Caps Lock Toggled!');
    },

    open(initialValue, oninput, onclose) {

    },

    close() {

    }
};