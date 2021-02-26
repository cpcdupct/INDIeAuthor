/** Set of function utils for indieauthor plugin */
indieauthor.utils = {};

indieauthor.utils.generate_uuid = (function () {
    var s4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };

    return function () {
        return s4() + s4() + s4();
    };
})();


indieauthor.utils.contains = function (a, b) {
    return a.contains ?
        a != b && a.contains(b) :
        !!(a.compareDocumentPosition(b) & 16);
}


/**
 * Converts the values from a form into a json object 
 * 
 * @param {Element} form Form element
 * @returns {*} JSON containing the values
 */
indieauthor.utils.toJSON = function (form) {
    var obj = {};
    var elements = form.querySelectorAll("input, select, textarea");
    for (var i = 0; i < elements.length; ++i) {
        var element = elements[i];
        var name = element.name;
        var value = element.value;
        var type = element.type;

        if (type == 'radio') {
            if (element.checked && name)
                obj[name] = value;
        } else {
            if (name) obj[name] = value;
        }
    }

    return obj;
}

/**
 * Notify success with toastr
 */
indieauthor.utils.notifiySuccess = function (title, message) {
    toastr.success(message, title, {
        timeOut: 5000,
        positionClass: "toast-bottom-right"
    });
}

indieauthor.utils.notifyError = function (title, message) {
    toastr.error(message, title, {
        timeOut: 5000,
        positionClass: "toast-bottom-right"
    });
}

indieauthor.utils.notifyWarning = function (title, message) {
    toastr.warning(message, title, {
        timeOut: 5000,
        positionClass: "toast-bottom-right"
    });
}


/**
 * Checks if the string is contained in the strings array
 * 
 * @param {string} string String to be checked
 * @param {Array<string>} arrayStrings Array of strings where the string should be
 * 
 * @returns {boolean} false if it is not contained, true if it is contained
 */
indieauthor.utils.stringIsInArray = function (string, arrayStrings) {
    return (arrayStrings.indexOf(string) > -1);
}

/**
 * Clears all data-* attributes from an element
 * 
 * @param {*} element DOM element
 */
indieauthor.utils.clearDataAttributes = function (element) {
    $.each($(element).data(), function (i) {
        $(element).removeAttr("data-" + i);
    });
}

/**
 * Check wether a json object is empty
 * 
 * @param {*} obj JSON OBject
 * @returns {boolean} true if empty, false if not empty 
 */
indieauthor.utils.isEmpty = function (obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
}

/**
 * Parse a string into a boolean
 * 
 * @param {string} string String representation of the boolean 
 * @returns {boolean} Boolean representation of the string
 */
indieauthor.utils.parseBoolean = function (string) {
    var bool;
    bool = (function () {
        switch (false) {
            case string.toLowerCase() !== 'true':
                return true;
            case string.toLowerCase() !== 'false':
                return false;
        }
    })();

    if (typeof bool === "boolean") {
        return bool;
    }

    return void 0;
};

indieauthor.utils.booleanToString = function (bool) {
    if (bool === true) {
        return "true"
    } else if (bool === false) {
        return "false";
    }
}

/**
 * Find an object by key and value and returns its index in the array
 * 
 * @param {Array<string>} array Array of objects
 * @param {string} key Object Key
 * @param {string} value Object Value
 * 
 * @returns {number} index of element if found, else -1
 */
indieauthor.utils.findIndexObjectInArray = function (array, key, value) {
    for (var i = 0; i < array.length; i++) {
        var element = array[i];
        if (element[key] == value)
            return i;
    }

    return -1;
}

/**
 * Find an object by key and value and returns the element
 * 
 * @param {Array<string>} array Array of objects
 * @param {string} key Object Key
 * @param {string} value Object Value
 * 
 * @returns {number} the element if found, else undefined
 */
indieauthor.utils.findObjectInArray = function (array, key, value) {
    var index = indieauthor.utils.findIndexObjectInArray(array, key, value);
    if (index != -1)
        return array[index];
    return undefined;
}

/**
 * Moves the element in old_index position to a new_index position in the array
 * 
 * @param {Array} arr Arra of objects
 * @param {number} old_index Current index of the element
 * @param {number} new_index New Index of the element
 */
indieauthor.utils.array_move = function (arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
}


indieauthor.utils.swap = function (elementOrigin, elementTarget) {
    hasNameInParams = $(elementOrigin);
    div2 = $(elementTarget);

    tdiv1 = div1.clone();
    tdiv2 = div2.clone();

    if (!div2.is(':empty')) {
        div1.replaceWith(tdiv2);
        div2.replaceWith(tdiv1);
    }
}

indieauthor.utils.isURL = function (st) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    return regex.test(st);
}

indieauthor.utils.isYoutubeVideoURL = function (url) {
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

    if (url.match(p)) {
        return url.match(p)[1];
    }

    return false;
}

indieauthor.utils.isUrlWithinDomains = function (url, allowedDomains) {
    if (!indieauthor.utils.isURL(url))
        return false;

    for (var i = 0; i < allowedDomains.length; i++) {
        var allowedDomain = allowedDomains[i];
        if (url.startsWith(allowedDomain))
            return true;
    }

    return false;
}

indieauthor.utils.isIndieResource = function (url) {
    return indieauthor.utils.isUrlWithinDomains(url, ["https://indiemedia.upct.es", "http://indieopen.upct.es", "https://multimediarepository.blob.core.windows.net"]);
}

indieauthor.utils.isOnlyOneWord = function (string) {
    if (!string) return false;

    string = string.trim();
    var splited = string.split(" ");

    return (splited.length == 1);
}

indieauthor.utils.getNumber = function (number) {
    return number;
}

indieauthor.utils.hasNameInParams = function (widgetInstance) {
    return (widgetInstance.params && (widgetInstance.params.name && (widgetInstance.params.name.length > 0)))
}

indieauthor.utils.isInteractiveVideo = function (url) {
    return indieauthor.utils.isUrlWithinDomains(url, ["https://indieopen.upct.es", "https://backendcpcd-servicio-gateway.azuremicroservices.io"]);
}

indieauthor.utils.getAllUrlParams = function (url) {
    var queryString = url.split('?')[1];

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // set parameter name and value (use 'true' if empty)
            var paramName = a[0];
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

            // (optional) keep case consistent
            paramName = paramName.toLowerCase();
            if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

            // if the paramName ends with square brackets, e.g. colors[] or colors[2]
            if (paramName.match(/\[(\d+)?\]$/)) {

                // create key if it doesn't exist
                var key = paramName.replace(/\[(\d+)?\]/, '');
                if (!obj[key]) obj[key] = [];

                // if it's an indexed array e.g. colors[2]
                if (paramName.match(/\[\d+\]$/)) {
                    // get the index value and add the entry at the appropriate position
                    var index = /\[(\d+)\]/.exec(paramName)[1];
                    obj[key][index] = paramValue;
                } else {
                    // otherwise add the value to the end of the array
                    obj[key].push(paramValue);
                }
            } else {
                // we're dealing with a string
                if (!obj[paramName]) {
                    // if it doesn't exist, create property
                    obj[paramName] = paramValue;
                } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                    // if property does exist and it's a string, convert it to an array
                    obj[paramName] = [obj[paramName]];
                    obj[paramName].push(paramValue);
                } else {
                    // otherwise add the property
                    obj[paramName].push(paramValue);
                }
            }
        }
    }

    return obj;
}