/** Elements that are contained inside the main container */
indieauthor.model.sections = []; // MODEL SECTIONS 

/** Current model errors post-validation */
indieauthor.model.currentErrors = [];

// Current model version
indieauthor.model.CURRENT_MODEL_VERSION = 4;

// Version history
indieauthor.model.VERSION_HISTORY = [1, 2, 3, 4];

/**
 * Creates and pushes a section into the model
 * 
 * @returns section data
 */
indieauthor.model.createSection = function () {
    var sectionData = {
        id: indieauthor.utils.generate_uuid(),
        name: indieauthor.strings.sections.label + " " + (indieauthor.model.sections.length + 1),
        type: "section-container",
        widget: "Section",
        bookmark: "",
        image: "",
        bakcgroundType: 'BackgroundColour',
        data: []
    };

    indieauthor.model.sections.push(sectionData);
    return sectionData;
}

/**
 * Creates an object model with the info needed.
 * 
 * @param {String} elementType Element type
 * @param {String} widgetType Widget Type
 * @param {String} dataElementId String Element ID
 * @param {*} widgetInfo Widget info params
 * 
 * @returns {*} Model object created
 */
indieauthor.model.createObject = function (elementType, widget, dataElementId, widgetInfo) {
    var modelObject = {
        id: dataElementId,
        type: elementType,
        widget: widget
    }

    var widgetData = indieauthor.widgets[widget].emptyData(widgetInfo);

    if (widgetData.params) modelObject.params = widgetData.params;
    if (widgetData.data) modelObject.data = widgetData.data;

    return modelObject;
}

/**
 * Appends a model object into a container inside the global model.
 *  if no parent is passed, then it will be appended into the main container. 
 * Otherwise it will be appended into the parent container.
 *  
 * @param {*} modelObject Model object to be appended into a container. 
 * @param {string} inPositionElementId Id of the element from all the elements will be pushed
 * @param {string} parentContainerId Parent container ID.
 * @param {number} parentContainerIndex Parent container Index. Can be null or undefined
 * @param {string} inPositionElementId Position of the element that will be pushed down by the element
 */
indieauthor.model.appendObject = function (modelObject, inPositionElementId, parentContainerId, parentContainerIndex) {
    var parent = indieauthor.model.findObject(parentContainerId);
    if (parent.type == 'layout')
        indieauthor.model.pushOrAppendObject(parent.data[parentContainerIndex], modelObject, inPositionElementId);
    else
        indieauthor.model.pushOrAppendObject(parent.data, modelObject, inPositionElementId);
}

/**
 * Puts the modelObject into the array.
 * 
 * - If inPositionElementId is different than -1 then, the object will be put in the array in that position, pushing the other elements
 * - If inPositionElementId is -1, the model object will be pushed at the end of the array
 * 
 * @param {Array} array Array of elements 
 * @param {*} modelObject Model Object that will be put in the array
 * @param {string} inPositionElementId ID of the element from inferior elements will be pushed. Can be -1
 */
indieauthor.model.pushOrAppendObject = function (array, modelObject, inPositionElementId) {
    if (inPositionElementId == -1)
        array.push(modelObject);
    else {
        var inPositionIndex = indieauthor.utils.findIndexObjectInArray(array, 'id', inPositionElementId);
        array.splice(inPositionIndex, 0, modelObject);
    }
}

/**
 *  Updates the model object given a data from a form
 * 
 * @param {*} modelObject Model object
 * @param {*} formData Data from a form
 */
indieauthor.model.updateObject = function (modelObject, formData) {
    indieauthor.widgets[modelObject.widget].updateModelFromForm(modelObject, formData);
}

/**
 * Removes an element by its id within the whole model
 * 
 * @param {string} dataElementId Element id
 */
indieauthor.model.removeElement = function (dataElementId) {
    var elementsArray = indieauthor.model.sections;
    indieauthor.model.removeElementInModel(elementsArray, dataElementId);
}

/**
 * Recursive function that deletes an element given an id from an element array, csondiering nested containers having elements inside
 *
 * @param {*} elementsArray Array of elements for the search
 * @param {*} dataElementId Element id
 * 
 * @returns {boolean} true if the element has been deleted, false otherwise
 */
indieauthor.model.removeElementInModel = function (elementsArray, dataElementId) {
    for (var i = 0; i < elementsArray.length; i++) {
        var element = elementsArray[i];

        if (element.id == dataElementId) {
            elementsArray.splice(i, 1);
            return true;
        } else {
            if (element.type == 'layout') {
                for (var j = 0; j < element.data.length; j++) {
                    var elementsSubArray = element.data[j];
                    if (indieauthor.model.removeElementInModel(elementsSubArray, dataElementId)) return true;
                }
            } else if (element.type == 'specific-container' || element.type == 'simple-container' || element.type == 'specific-element-container' || element.type == 'element-container' || element.type == 'section-container') {
                if (indieauthor.model.removeElementInModel(element.data, dataElementId)) return true;
            }
        }
    }

    return false;
}

/**
 * Finds an object in the model given an ID
 * 
 * @param {string} dataElementId String Element ID
 * 
 * @returns {*} element found or undefined
 */
indieauthor.model.findObject = function (dataElementId) {
    var elementsArray = indieauthor.model.sections;
    var elementSearch;

    for (var i = 0; i < elementsArray.length; i++) {
        var element = elementsArray[i];
        elementSearch = indieauthor.model.findElementOrSubelementInModel(element, dataElementId);

        if (elementSearch)
            break;
    }

    return elementSearch;
}

/**
 * Recursive function to find an element by its id in the elements array, considering nested containers having elements inside
 * 
 * @param {Element} element Element in the search
 * @param {string} dataElementId Element id
 * 
 * @returns {*} element found or undefined
 */
indieauthor.model.findElementOrSubelementInModel = function (element, dataElementId) {
    if (element.id == dataElementId) {
        return element;
    } else if (indieauthor.hasChildren(element.type)) {
        var elementsArray = element.type == 'layout' ? [].concat.apply([], element.data) : element.data;
        var result;
        for (var i = 0; result == undefined && i < elementsArray.length; i++) {
            result = indieauthor.model.findElementOrSubelementInModel(elementsArray[i], dataElementId);
        }

        return result;
    }

    return undefined;
}

/**
 * Find the parent of an object given its dataElementId
 * 
 * @param {*} dataElementId ID of the element to find its parent
 */
indieauthor.model.findParentOfObject = function (dataElementId) {

    var findParent = function (parent, elementArray, elementId) {
        for (var i = 0; i < elementArray.length; i++) {
            var element = elementArray[i];

            if (element.id == elementId) {
                return parent;
            } else if (indieauthor.hasChildren(element.type)) {
                if (element.type == 'layout') {
                    var elementsArray = [].concat.apply([], element.data);
                    for (var j = 0; j < elementsArray.length; j++) {
                        var subElement = elementsArray[j];
                        if (subElement.id == elementId)
                            return element;
                    }
                } else {
                    var subParent = findParent(element, element.data, elementId);
                    if (subParent != undefined)
                        return subParent;
                }
            }
        }

        return undefined;
    }

    for (var i = 0; i < indieauthor.model.sections.length; i++) {
        var section = indieauthor.model.sections[i];

        var parent = findParent(section, section.data, dataElementId);
        if (parent != undefined)
            return parent;

    }

    return undefined;
}


/**
 * Move an element to a new position within its container
 * 
 * @param {string} elementId ID of the element to be moved
 * @param {number} newPosition New element position within the container
 * @param {string} containerId ID of the container containing the element
 * @param {number} containerIndex Index of the array container. Optional (only for layouts)
 */
indieauthor.model.moveElementWithinContainer = function (elementId, newPosition, containerId, containerIndex) {
    var container = indieauthor.model.findObject(containerId);
    var elementsArray = containerIndex ? container.data[containerIndex] : container.data;
    var currentPosition = indieauthor.utils.findIndexObjectInArray(elementsArray, 'id', elementId);
    indieauthor.utils.array_move(elementsArray, currentPosition, newPosition);
}


/**
 * Move an element into a target container given its new position in the target container
 * 
 * @param {string} elementId ID of the element to be moved
 * @param {number} inPositionElementId New element position in the new container
 * @param {string} targetContainerId ID of the new container for the element 
 * @param {number} targetContainerIndex Index of the array container.
 */
indieauthor.model.moveElementFromContainerToAnother = function (elementId, inPositionElementId, targetContainerId, targetContainerIndex) {
    var originalObject = indieauthor.model.findObject(elementId);
    var copyOfObject = jQuery.extend({}, originalObject)
    indieauthor.model.removeElement(originalObject.id);
    indieauthor.model.appendObject(copyOfObject, inPositionElementId, targetContainerId, targetContainerIndex);
}

/**
 * Swaps sections in the editor and in the model.
 * 
 * @param {string} originId ID of the section to be swapped.
 * @param {string} targetId ID of the section to be swwaped with the origin.
 */
indieauthor.model.swap = function (originId, targetId) {
    var secArray = indieauthor.model.sections;
    var old_index = indieauthor.utils.findIndexObjectInArray(secArray, 'id', originId);
    var new_index = indieauthor.utils.findIndexObjectInArray(secArray, 'id', targetId);
    indieauthor.utils.array_move(secArray, old_index, new_index);
}

/**
 * Validates the current model and return the errors
 * 
 * @returns {Array} errors
 */
indieauthor.model.validate = function () {
    var errors = [];

    for (var i = 0; i < indieauthor.model.sections.length; i++) {
        var section = indieauthor.model.sections[i];
        var sectionKeys = [];

        if (section.data.length == 0)
            sectionKeys.push("section.emptyData");

        if (section.bakcgroundType && (section.bakcgroundType == 'BackgroundImage' && !indieauthor.utils.isURL(section.image)))
            sectionKeys.push("section.invalidImage");

        if (!section.name || (section.name.length <= 0))
            sectionKeys.push("section.invalidName");

        if (section.bookmark.length == 0 || section.bookmark.length > 40)
            sectionKeys.push("section.invalidBookmark");

        if (sectionKeys.length > 0) {
            errors.push({
                element: section.id,
                keys: sectionKeys
            });
        }

        for (var j = 0; j < section.data.length; j++) {
            indieauthor.model.validateElement(section.data[j], errors);
        }
    }

    // Save the errors   
    indieauthor.model.currentErrors = errors;
    return errors;
}

/**
 * Validates a single model element and return the errors
 * 
 * @param {*} element Model element
 * @param {Array} errors Errors array. Acumulative

 */
indieauthor.model.validateElement = function (element, errors) {
    var currentElementValidation = indieauthor.widgets[element.widget].validateModel(element);
    if (currentElementValidation) errors.push(currentElementValidation);

    if (indieauthor.hasChildren(element.type)) {
        var elementsArray = element.type == 'layout' ? [].concat.apply([], element.data) : element.data;
        for (var i = 0; i < elementsArray.length; i++) {
            var element = elementsArray[i];
            indieauthor.model.validateElement(element, errors)
        }
    }
}

indieauthor.model.isUniqueName = function (name, currentElementId) {
    var sections = indieauthor.model.sections;

    var recursiveIsUnique = function (element, name, currentElementId) {

        if (element.params && (element.params.name && (element.params.name == name && element.id != currentElementId))) {
            return false;
        } else if (element.type != 'element' || element.type != 'specific-element') {
            var elementsArray = element.type == 'layout' ? [].concat.apply([], element.data) : element.data;
            var keepsUnique = true;
            for (var i = 0; keepsUnique && i < elementsArray.length; i++) {
                keepsUnique = recursiveIsUnique(elementsArray[i], name, currentElementId);
            }

            return keepsUnique;
        }

        return true;
    }

    var isUnique = true;

    for (var i = 0; i < sections.length && isUnique; i++) {
        isUnique = recursiveIsUnique(sections[i], name, currentElementId);
    }

    return isUnique;
}