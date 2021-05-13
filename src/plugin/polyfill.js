/** Polyfill functions for browser compatibility */
indieauthor.polyfill = {};

/** Current browser capabilities */
indieauthor.polyfill.allowed = {
    dataset: false
}

/**
 * Sets the browser in order to run polyfill functions
 */
indieauthor.polyfill.setBrowserCapabilities = function () {
    indieauthor.polyfill.allowed.dataset = Modernizr.dataset;
}

/**
 * Gets the data-* value of an element 
 * 
 * @param {Element} element DOM element
 * @param {string} dataName Name of the data attribute
 * 
 * @returns {*} data-* value
 */
indieauthor.polyfill.getData = function (element, dataName) {
    if (!indieauthor.polyfill.allowed.dataset) return element.getAttribute("data-" + dataName);

    return element.dataset[dataName];
}


/**
 * Sets  the data-* attribute of an element with some value
 * 
 * @param {Element} element DOM element
 * @param {string} dataName Name of the data attribute
 * @param {*} dataValue Value of the data to be set
 */
indieauthor.polyfill.setData = function (element, dataName, dataValue) {
    if (!indieauthor.polyfill.allowed.dataset) element.setAttribute("data-" + dataName, dataValue);
    else element.dataset[dataName] = dataValue;
}

/**
 * Removes the data-* attribute of an element
 * 
 * @param {*} element DOM Element 
 * @param {*} dataName Name of the data attribute 
 */
indieauthor.polyfill.deleteData = function (element, dataName) {
    if (!indieauthor.polyfill.allowed.dataset) element.removeAttribute("data-" + dataName);
    else delete element.dataset[dataName];
}

// Polyfill for number
Number.isInteger = Number.isInteger || function (value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};