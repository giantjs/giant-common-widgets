/*global giant */
giant.postpone(giant, 'Flow', function (ns, className) {
    "use strict";

    var base = giant.List,
        self = base.extend(className);

    /**
     * Creates a Flow instance.
     * @name giant.Flow.create
     * @function
     * @returns {giant.Flow}
     */

    /**
     * The Flow allows to navigate between a set of stage widgets.
     * @class
     * @extends giant.List
     */
    giant.Flow = self
        .addMethods(/** @lends giant.Flow# */{
            /** @ignore */
            init: function () {
                base.init.call(this);

                /**
                 * Identifies current stage.
                 * Name of the stage widget that is currently in focus.
                 * @type {string}
                 */
                this.currentStageName = undefined;

                /**
                 * Collection of available stage widgets.
                 * @type {giant.WidgetCollection}
                 */
                this.stages = giant.WidgetCollection.create();
            },

            /**
             * Retrieves stage widget the flow is currently at.
             * @returns {giant.Widget}
             */
            getCurrentStage: function () {
                return this.stages.getItem(this.currentStageName);
            },

            /**
             * Adds a stage to the flow.
             * Adds various CSS classes to the specified stage widget.
             * @param {string} stageName
             * @param {giant.Widget} stageWidget
             * @returns {giant.Flow}
             */
            addStage: function (stageName, stageWidget) {
                this.stages.setItem(stageName, stageWidget
                    .addCssClass(stageName)
                    .addCssClass('flow-stage'));
                return this;
            },

            /**
             * Goes to the specified stage.
             * @param {string} stageName
             * @returns {giant.Flow}
             */
            goToStage: function (stageName) {
                var stages = this.stages,
                    currentStage = stages.getItem(this.currentStageName),
                    stageWidget = stages.getItem(stageName);

                $assertion.assert(!!stageWidget, "Invalid stage name");

                // applying new stage
                if (currentStage) {
                    currentStage.removeFromParent();
                }
                this.addItemWidget(stageWidget);

                // updating instance property
                this.currentStageName = stageName;

                return this;
            }
        });
});
