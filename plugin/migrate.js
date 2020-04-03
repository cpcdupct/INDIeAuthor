/**
 * Determines wether a model instances needs to be updated to the current model version supported by the library
 *  
 * @param {*} model Model instance
 * 
 * @returns {boolean} True if needed, false if not 
 */
indieauthor.migrate.migrationNeeded = function (model) {
    if (model.version < indieauthor.model.CURRENT_MODEL_VERSION) {
        if (indieauthor.model.VERSION_HISTORY.indexOf(model.version) > -1) {
            return true;
        } else {
            throw new Error("MODEL VERSION IS NOT INCLUDED IN VERSION HISTORY")
        }
    }

    return false;
}


/**
 *  Runs the migration from a model to the current model version 
 * 
 * @param {*} model 
 * 
 * @returns {Array} Array of migrated sections
 */
indieauthor.migrate.runMigration = function (model) {
    var indexOfModelVersion = indieauthor.model.VERSION_HISTORY.indexOf(model.version);
    var migratedSections = jQuery.extend([], model.sections);

    for (indexOfModelVersion; indexOfModelVersion < indieauthor.model.VERSION_HISTORY.length && (indexOfModelVersion + 1) < indieauthor.model.VERSION_HISTORY.length; indexOfModelVersion++) {
        var currentVersion = indieauthor.model.VERSION_HISTORY[indexOfModelVersion];
        var targetVersion = indieauthor.model.VERSION_HISTORY[indexOfModelVersion + 1];

        console.log("MIGRATION: Current version " + currentVersion);
        console.log("MIGRATION: Target version " + targetVersion);

        var migrationKey = "from" + currentVersion + "to" + targetVersion;
        migratedSections = this.migrations[migrationKey].run(migratedSections);
    }

    return migratedSections;
}

/**
 * Code for migrations 
 */
indieauthor.migrate.migrations = {
    /**
     * Add a bookmark in sections data
     */
    from1to2: {
        run: function (sections) {
            var migratedSections = [];

            for (var i = 0; i < sections.length; i++) {
                var section = sections[i];
                section.bookmark = "s";
                migratedSections.push(section);
            }

            return migratedSections;
        }
    },
    from2to3: {
        run: function (sections) {

            // Add aspect param to all SimpleImages and add the aspect parameter to params 
            var iamgesInstances = indieauthor.migrate.functions.getWidgetInstancesByWidgetType(sections, 'SimpleImage');
            for (var i = 0; i < iamgesInstances.length; i++) {
                var widgetInstance = iamgesInstances[i];
                widgetInstance.params.aspect = "original";
            }

            // Get all GapTest instances and change the type to Test
            var gapTestInstances = indieauthor.migrate.functions.getWidgetInstancesByWidgetType(sections, 'GapTest');
            for (var i = 0; i < gapTestInstances.length; i++) {
                var widgetInstance = gapTestInstances[i];
                widgetInstance.widget = "Test";
            }

            return sections;
        }
    },
    from3to4: {
        run: function (sections) {
            var widgetInstances = indieauthor.migrate.functions.getWidgetsToAddHelpParameter(sections);
            for (var i = 0; i < widgetInstances.length; i++) {
                var widgetInstance = widgetInstances[i];
                widgetInstance.params.help = "";
            }

            return sections;
        }
    }
}

indieauthor.migrate.functions = {
    /**
     * Retrieve all widgets instances by type in the sections param
     * 
     * @param {*} sections Sections of the model
     * @param {*} widgetType Type of the desired widget
     * 
     * @returns {Array} Array of widget instances
     */
    getWidgetInstancesByWidgetType: function (sections, widgetType) {
        var widgetInstances = [];

        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];
            var instancesInSection = indieauthor.migrate.functions.findInstancesByWidgetType(section, widgetType);
            widgetInstances = widgetInstances.concat(instancesInSection);
        }

        return widgetInstances;
    },
    /**
     * Find a widget instane by type in an array of elements or in its children
     * 
     * @param {*} element Elements widget instance
     * @param {*} widgetType Type of the widget to find
     * 
     * @returns {Array} Widgets instances of widgeType
     */
    findInstancesByWidgetType: function (element, widgetType) {
        var widgetInstances = [];

        if (element.widget == widgetType) {
            widgetInstances.push(element);
        }

        if (indieauthor.hasChildren(element.type)) {
            var childrenElements = element.type == 'layout' ? [].concat.apply([], element.data) : element.data;
            for (var i = 0; i < childrenElements.length; i++) {
                var child = childrenElements[i];
                var instancesInChildren = this.findInstancesByWidgetType(child, widgetType);
                widgetInstances = widgetInstances.concat(instancesInChildren);
            }
        }

        return widgetInstances;
    },
    /**
     * 
     * Gets the widgets to add the help parameter
     * 
     * @param {*} sections Array of sections
     */
    getWidgetsToAddHelpParameter: function (sections) {
        var widgetInstances = [];

        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];
            var instancesInSection = this.findHelpInstances(section);
            widgetInstances = widgetInstances.concat(instancesInSection);
        }

        return widgetInstances;
    },
    findHelpInstances: function (element) {
        var widgetInstances = [];

        if (this.isHelpWidget(element.widget)) {
            widgetInstances.push(element);
        }

        if (indieauthor.hasChildren(element.type)) {
            var childrenElements = element.type == 'layout' ? [].concat.apply([], element.data) : element.data;
            for (var i = 0; i < childrenElements.length; i++) {
                var child = childrenElements[i];
                var instancesInChildren = this.findHelpInstances(child);
                widgetInstances = widgetInstances.concat(instancesInChildren);
            }
        }

        return widgetInstances;
    },
    isHelpWidget: function (widget) {
        return (["AcordionContainer", "AnimationContainer", "AudioTermContainer", "ChooseOption", "CouplesContainer", "DragdropContainer", "Image", "ImageAndSoundContainer", "ImageAndText", "Modal", "SchemaContainer", "TabsContainer", "Test", "TrueFalseContainer"].indexOf(widget) >= 0);
    }
}