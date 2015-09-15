/*global giant, Event, jQuery */
giant.postpone(giant, 'HotKeyWatcher', function () {
    "use strict";

    var base = giant.Base,
        self = base.extend();

    /**
     * Static class that watches key events globally and broadcasts widget events in response.
     * Listen to giant.EVENT_HOT_KEY_DOWN in any widget to get notified of
     * global key events. (Eg. for navigating within a custom control.)
     * In case you want to suppress hotkey events originating from eg. Input widgets,
     * query the original events and look at the target that received the keydown.
     * @class
     * @extends giant.Base
     */
    giant.HotKeyWatcher = self
        .addMethods(/** @lends giant.HotKeyWatcher# */{
            /**
             * @param {jQuery.Event} event
             * @ignore
             */
            onKeyDown: function (event) {
                var rootWidget = giant.Widget.rootWidget,
                    keyboardEvent = event.originalEvent,
                    originWidget = keyboardEvent instanceof Event &&
                        keyboardEvent.toWidget() ||
                        rootWidget;

                rootWidget
                    .spawnEvent(giant.EVENT_HOT_KEY_DOWN)
                    .setPayloadItems({
                        charCode    : event.which,
                        originWidget: originWidget
                    })
                    .broadcastSync();
            }
        });
});

(function () {
    "use strict";

    /**
     * Signals that a hot key was pressed.
     * @constant
     */
    giant.EVENT_HOT_KEY_DOWN = 'giant.HotKeyWatcher.hotKeyDown';
}());

(function (/**jQuery*/$) {
    "use strict";

    if (document) {
        $(document).on('keydown', function (event) {
            giant.HotKeyWatcher.onKeyDown(event);
        });
    }
}(jQuery));