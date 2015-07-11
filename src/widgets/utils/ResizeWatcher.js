/*global giant, giant, giant, giant, giant, jQuery, giant */
giant.postpone(giant, 'ResizeWatcher', function (ns, className, /**jQuery*/$) {
    "use strict";

    var base = giant.Base,
        self = base.extend(),
        $window = window && $(window);

    /**
     * Creates a ResizeWatcher instance, or pulls up an existing one from registry.
     * @name giant.ResizeWatcher.create
     * @function
     * @returns {giant.ResizeWatcher}
     */

    /**
     * Singleton that watches window resize events and broadcasts debounced (100ms) widget events in response.
     * Listen to giant.ResizeWatcher.EVENT_WINDOW_RESIZE_DEBOUNCED in any widget to get
     * notified of changes to window size.
     * @class
     * @extends giant.Base
     */
    giant.ResizeWatcher = self
        .setInstanceMapper(function () {
            return 'singleton';
        })
        .addConstants(/** @lends giant.ResizeWatcher */{
            /** @constant */
            EVENT_WINDOW_RESIZE_DEBOUNCED: 'window-resize-debounced',

            /**
             * Delay in ms to wait between the last window resize event and
             * triggering the widget resize event.
             * @constant
             */
            RESIZE_DEBOUNCE_DELAY: 100
        })
        .addMethods(/** @lends giant.ResizeWatcher# */{
            /** @ignore */
            init: function () {
                this.elevateMethod('onDebouncedWindowResize');

                /**
                 * Stores current window width.
                 * @type {number}
                 */
                this.curentWidth = undefined;

                /**
                 * Stores current window height.
                 * @type {number}
                 */
                this.curentHeight = undefined;

                /**
                 * Debouncer instance for debouncing window resize events, which may come in rapid succession.
                 * @type {giant.Debouncer}
                 */
                this.windowResizeDebouncer = this.onDebouncedWindowResize.toDebouncer();

                // setting initial dimensions
                this.updateDimensions();
            },

            /**
             * Updates window dimensions, and triggers widget event about resizing.
             * @returns {giant.ResizeWatcher}
             */
            updateDimensions: function () {
                var currentWidth = $window.width(),
                    currentHeight = $window.height(),
                    wasWindowResized = false,
                    rootWidget = giant.Widget.rootWidget;

                if (currentWidth !== this.currentWidth || currentHeight !== this.currentHeight) {
                    wasWindowResized = true;
                }

                this.currentWidth = currentWidth;
                this.currentHeight = currentHeight;

                if (wasWindowResized && rootWidget) {
                    rootWidget.broadcastSync(this.EVENT_WINDOW_RESIZE_DEBOUNCED);
                }

                return this;
            },

            /**
             * @param {jQuery.Event} event
             * @ignore
             */
            onWindowResize: function (event) {
                this.windowResizeDebouncer.runDebounced(this.RESIZE_DEBOUNCE_DELAY, event);
            },

            /**
             * @param {jQuery.Event} event
             * @ignore
             */
            onDebouncedWindowResize: function (event) {
                var rootWidget = giant.Widget.rootWidget,
                    link = giant.pushOriginalEvent(event);

                if (rootWidget) {
                    this.updateDimensions();
                }

                link.unLink();
            }
        });
}, jQuery);

(function (/**jQuery*/$) {
    "use strict";

    if (window) {
        $(window).on('resize', function (event) {
            giant.ResizeWatcher.create()
                .onWindowResize(event);
        });

        $(function () {
            giant.ResizeWatcher.create()
                .updateDimensions();
        });
    }
}(jQuery));