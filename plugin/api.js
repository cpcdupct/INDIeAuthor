/**
 * If the editor content is valid, obtains the current model and returns its sections in an onSuccess function. 
 * 
 * @param {Function} onSuccess Function to be runned when a success event is thrown. It will be called with the sections as an array parameter
 * @param {Function} onError Function to be runned when an error event is thrown. It will be called with a message in a string
 */
indieauthor.api.getEditorContent = function (onSuccess, onError) {
    if (indieauthor.api.validateContent(false)) {
        var sections = indieauthor.model.sections;
        var version = indieauthor.model.CURRENT_MODEL_VERSION;
        onSuccess(sections, version);
    } else {
        onError(indieauthor.strings.messages.contentErrors);
    }
}

/**
 * Validates the current editor model and shows errors associated with it
 * 
 * @param {boolean} print true if errors must be shown in the GUI, false if you only want to validate the content 
 * @returns true if valid, false if not valid
 */
indieauthor.api.validateContent = function (print) {
    // Get previous errors
    var currentErrors = indieauthor.model.currentErrors;
    // Get new ones
    var newErrors = indieauthor.model.validate();
    // Paint errors in the view
    indieauthor.showErrors(currentErrors, newErrors);

    // If no errors then save the content
    if (indieauthor.model.sections.length == 0) {
        if (print) indieauthor.utils.notifyError(indieauthor.strings.messages.errorMessage, indieauthor.strings.messages.emptyContent);
        return false;
    } else if (newErrors.length == 0) {
        if (print) indieauthor.utils.notifiySuccess(indieauthor.strings.messages.successMessage, indieauthor.strings.messages.noErrors);
        return true;
    } else {
        if (print) indieauthor.utils.notifyError(indieauthor.strings.messages.errorMessage, indieauthor.strings.messages.contentErrors);
        return false;
    }
}

/**
 * Clears the content of the editor
 */
indieauthor.api.clearContent = function () {
    bootprompt.confirm({
        title: indieauthor.strings.general.areYouSure,
        message: indieauthor.strings.messages.confirmClearContent,
        buttons: {
            confirm: {
                label: indieauthor.strings.general.delete,
                className: 'btn-danger'
            },
            cancel: {
                label: indieauthor.strings.general.cancel,
                className: 'btn-indie'
            }
        },
        callback: function (result) {
            if (result) {
                $(indieauthor.container).children().fadeOut(500, function () {
                    $(indieauthor.container).empty();
                    indieauthor.utils.notifiySuccess(indieauthor.strings.messages.successMessage, indieauthor.strings.messages.contentCleared);
                    indieauthor.model.sections = [];
                });
            }
        },
        closeButton: false,
    });
}

/**
 * Loads a model instance into the current plugin instance and draws it in the main container
 * 
 * @param {*} model Model to be loaded in the plugin
 * @param {Function} onLoaded Function to run when the load has been successfully completed
 * @param {Function} onError Function to run hwen the load has not been successfully completeed
 */
indieauthor.api.loadModelIntoPlugin = function (model, onLoaded, onError) {
    try {
        var sections = [];

        $(indieauthor.container).toggle(1000, function () {
            $(indieauthor.container).empty();
            indieauthor.model.sections = sections;

            for (var i = 0; i < indieauthor.model.sections.length; i++) {
                var element = indieauthor.model.sections[i];
                indieauthor.loadElement(indieauthor.container, element, true);
            }

            $(indieauthor.container).toggle(1000, function () {
                onLoaded();
            });
        })
    } catch (err) {
        $(indieauthor.container).empty();
        indieauthor.model.sections = [];
        onError(err);
    }

}

indieauthor.api.undo = function () {
    indieauthor.undoredo.undo();
}

indieauthor.api.redo = function () {
    indieauthor.undoredo.redo();
}