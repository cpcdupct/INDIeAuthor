/** Array of applied commands */
indieauthor.undoredo.commandArray = [];

/** Index of the last applied command. Iterates over commandArray */
indieauthor.undoredo.currentIndex = -1;

/** Command limit */
indieauthor.undoredo.COMMANDS_LIMIT = 10;

/**
 * Redo last applied command
 */
indieauthor.undoredo.redo = function () {
    // If commands are empty, no action to be redone
    // If index is at the last position, no action to be redone
    if (this.commandArray.length == 0 || this.currentIndex == (this.commandArray.length - 1)) {
        indieauthor.utils.notifyWarning(indieauthor.strings.messages.warningMessage, indieauthor.strings.messages.noRedo);
        return;
    }

    // Moves the index to the next command and apply the command
    indieauthor.undoredo.currentIndex++;

    // Gets the command and run the action
    var command = this.commandArray[this.currentIndex];
    this.actions[command.type].do(command.modelId, command.data);
}

/**
 * Undo last applied command
 */
indieauthor.undoredo.undo = function () {
    // If commands are empty, no action to be undo
    // If currentIndex is out of the array, no action to be undo
    if (this.commandArray.length == 0 || this.currentIndex == -1) {
        indieauthor.utils.notifyWarning(indieauthor.strings.messages.warningMessage, indieauthor.strings.messages.noUndo);
        return;
    }

    // Runs the opposite command of the last command done  
    var command = this.commandArray[this.currentIndex];
    this.actions[command.type].undo(command.modelId, command.data);

    // Moves the index to the previous command done
    indieauthor.undoredo.currentIndex--;
}

/**
 * Pushes a command into the commandArray
 * 
 * @param {*} commandType Command type
 * @param {*} commandModelId Model ID over which the command is applied
 * @param {*} commandData Command data
 */
indieauthor.undoredo.pushCommand = function (commandType, commandModelId, commandData) {
    // Command data
    var command = {
        type: commandType,
        modelId: commandModelId,
        data: commandData
    };

    // Clear the rest of commands if a new command is applied in the middle of the array 
    if (this.currentIndex < (this.commandArray.length - 1)) {
        var itemsToBDeleted = this.commandArray.length - (this.currentIndex + 1);
        this.commandArray.splice(this.currentIndex + 1, itemsToBDeleted);
    }

    // Pushes command and updates the length
    this.commandArray.push(command);

    // When the limit has been reached, the first item will be deleted to make room for new commands
    if (this.commandArray.length >= this.COMMANDS_LIMIT) this.commandArray.shift();

    this.currentIndex = this.commandArray.length - 1;
}

indieauthor.undoredo.clearCommandArray = function () {
    this.commandArray = [];
}

indieauthor.undoredo.functions = {
    /**
     * Remove an element 
     * 
     * @param {string} modelId Model ID
     */
    removeElement: function (id) {
        indieauthor.deleteToolTipError(document.querySelector("[data-id='" + id + "']").querySelector('[data-prev]'));
        indieauthor.model.removeElement(id);
        $(document.querySelector("[data-id='" + id + "']").parentNode).remove();
    },
    removeSection: function (id) {
        indieauthor.deleteToolTipError(document.getElementById("sec-" + id).querySelector('[data-prev]'));
        indieauthor.model.removeElement(id);
        $(document.getElementById("sec-" + id).parentNode).remove();
    },
    /**
     * Add an element
     * 
     * @param {string} modelId Model ID 
     * @param {*} data Element Data
     */
    addElement: function (view, element, parentType, parentContainerId, parentContainerIndex, inPositionElementId) {
        view = indieauthor.undoredo.utils.clearElement(view);

        var parentContainer = document.querySelector("[data-id='" + parentContainerId + "']");
        var parentElement = indieauthor.model.findObject(parentContainerId);

        var target;

        if (parentElement.type == 'layout')
            target = parentContainer.querySelector('[data-index="' + parentContainerIndex + '"');
        else
            target = (parentElement.type == 'specific-container' || parentElement.type == 'simple-container' || parentElement.type == 'specific-element-container') ? parentContainer.querySelector('[data-content]') : parentContainer.querySelector('[data-role="container"]');

        if (inPositionElementId != -1) {
            var targetItem = $(target).find('.container-item [data-id="' + inPositionElementId + '"]');
            var closestItemContent = $(targetItem).parent();
            $(closestItemContent).before(view);
        } else {
            $(target).append(view);
        }

        if (parentType == 'layout')
            indieauthor.model.appendObject(element, inPositionElementId, parentContainerId, parentContainerIndex);
        else
            indieauthor.model.appendObject(element, inPositionElementId, parentContainerId);

        this.regeneratePreview(element);

    },
    addSection: function (view, element, position) {
        view = indieauthor.undoredo.utils.clearElement(view);

        if (position == indieauthor.model.sections.length) {
            $(indieauthor.container).append(indieauthor.undoredo.utils.clearElement(view));
            indieauthor.model.sections.push(element);
        } else {
            $(view).insertBefore(indieauthor.container.children[position]);
            indieauthor.model.sections.splice(position, 0, element);
        }
    },
    moveElement: function (containerType, containerId, containerIndex, initialPosition, finalPosition) {
        var parentContainer = indieauthor.model.findObject(containerId);

        if (containerType == 'layout') {
            var initialModel = parentContainer.data[containerIndex][initialPosition];
            var finalModel = parentContainer.data[containerIndex][finalPosition];
            // Model move
            indieauthor.utils.array_move(parentContainer.data[containerIndex], initialPosition, finalPosition);
        } else {
            var initialModel = parentContainer.data[initialPosition];
            var finalModel = parentContainer.data[finalPosition];
            // Model move
            indieauthor.utils.array_move(parentContainer.data, initialPosition, finalPosition);
        }

        var initialElement = indieauthor.findElementByDataId(initialModel.id).parentNode;
        var finalElement = indieauthor.findElementByDataId(finalModel.id).parentNode;

        // View move
        var action = initialPosition < finalPosition ? 'after' : 'before';
        indieauthor.undoredo.utils.move(initialElement, finalElement, action);
    },
    swapSections: function (sectionOriginId, direction) {
        var positionQuery = (direction == 1) ? $(document.getElementById("sec-" + sectionOriginId).parentNode).prev() : $(document.getElementById("sec-" + sectionOriginId).parentNode).next();

        if (positionQuery.length == 1) {
            var targetOrigin = indieauthor.polyfill.getData(positionQuery[0].firstElementChild, 'id');
            indieauthor.utils.swap(document.getElementById("sec-" + sectionOriginId).parentNode, document.getElementById("sec-" + targetOrigin).parentNode);
            indieauthor.model.swap(sectionOriginId, targetOrigin);
        }
    },
    regeneratePreview: function (element) {
        indieauthor.widgets[element.widget].preview(element);

        if (indieauthor.hasChildren(element.type)) {
            var elementsArray = element.type == 'layout' ? [].concat.apply([], element.data) : element.data;
            for (var i = 0; i < elementsArray.length; i++) {
                this.regeneratePreview(elementsArray[i]);
            }
        }
    }
}

indieauthor.undoredo.actions = {
    add: {
        do: function (modelId, data) {
            indieauthor.undoredo.functions.addElement(data.view, data.element, data.parentType, data.parentContainerId, data.parentContainerIndex, data.inPositionElementId);
        },
        undo: function (modelId, data) {
            indieauthor.undoredo.functions.removeElement(modelId);
        },
    },
    addSection: {
        do: function (modelId, data) {
            indieauthor.undoredo.functions.addSection(data.view, data.element, data.position);
        },
        undo: function (modelId, data) {
            indieauthor.undoredo.functions.removeSection(modelId);
        }
    },
    removeSection: {
        do: function (modelId, data) {
            indieauthor.undoredo.functions.removeSection(modelId);
        },
        undo: function (modelId, data) {
            indieauthor.undoredo.functions.addSection(data.view, data.element, data.position);
        }
    },
    remove: {
        do: function (modelId, data) {
            indieauthor.undoredo.functions.removeElement(modelId);
        },
        undo: function (modelId, data) {
            indieauthor.undoredo.functions.addElement(data.view, data.element, data.parentType, data.parentContainerId, data.parentContainerIndex, data.inPositionElementId);
        }
    },
    move: {
        do: function (modelId, data) {
            indieauthor.undoredo.functions.moveElement(data.containerType, data.containerId, data.containerIndex, data.initialPosition, data.finalPosition);
        },
        undo: function (modelId, data) {
            indieauthor.undoredo.functions.moveElement(data.containerType, data.containerId, data.containerIndex, data.finalPosition, data.initialPosition);
        }
    },
    swapSection: {
        do: function (data) {
            indieauthor.undoredo.functions.swapSections(data.sectionOriginId, data.direction);
        },
        undo: function (data) {
            var oppositeDirection = (data.direction == 1) ? 0 : 1;
            indieauthor.undoredo.functions.swapSections(data.sectionOriginId, oppositeDirection);
        }
    },
    moveContainer: {
        do: function (modelId, data) {
            // Remove element from current location
            indieauthor.undoredo.functions.removeElement(modelId, data.element);

            // Add element to the targe location   
            var targetParent = indieauthor.model.findObject(data.target.id);
            var inPosition;
            var elementsArray = (targetParent.type == 'layout') ? elementsArray = targetParent.data[data.target.index] : elementsArray = targetParent.data;

            if (data.target.position == -1 || elementsArray.length == 0)
                inPosition = -1;
            else if (data.target.position < elementsArray.length)
                inPosition = elementsArray[data.target.position].id;
            else
                inPosition = elementsArray[elementsArray.length - 1].id;

            indieauthor.undoredo.functions.addElement(data.view, data.element, undefined, data.target.type, data.target.id, data.target.index, inPosition);
        },
        undo: function (modelId, data) {
            // Remove element from current location
            indieauthor.undoredo.functions.removeElement(modelId, data.element);

            // Add element to the original location  
            var sourceParent = indieauthor.model.findObject(data.source.id);
            var inPosition;
            var elementsArray = (sourceParent.type == 'layout') ? elementsArray = sourceParent.data[data.source.index] : elementsArray = sourceParent.data;

            if (data.source.position == -1 || elementsArray.length == 0)
                inPosition = -1;
            else if (data.source.position < elementsArray.length)
                inPosition = elementsArray[data.source.position].id;
            else
                inPosition = elementsArray[elementsArray.length - 1].id;

            indieauthor.undoredo.functions.addElement(data.view, data.element, undefined, data.source.type, data.source.id, data.source.index, inPosition);
        }
    }
}

indieauthor.undoredo.utils = {
    clearElement: function (elementString) {
        return elementString.replace('gu-transit', '');
    },
    move: function (e1, e2, mode) {
        if (mode == 'before') {
            $(e1).insertBefore(e2);
        } else if (mode == 'after') {
            $(e1).insertAfter(e2);
        }
    }
}