/**
 * Runs dependencies initialization or plugin needed functions to be run in document ready
 * 
 * @param {element} container DOM element for the main container
 */
indieauthor.plugins.preparePlugins = function () {
    // HANDLEBARS functions
    // Function for comparing values
    Handlebars.registerHelper('ifeq', function (a, b, options) {
        if (a == b) {
            return options.fn(this);
        }
    });

    Handlebars.registerHelper("inc", function (value, options) {
        return parseInt(value) + 1;
    });

    // Function for translating strings in templates
    Handlebars.registerHelper('translate', function (jsonPathQuery) {
        var translation = jsonpath.query(indieauthor.strings, "$." + jsonPathQuery);
        return new Handlebars.SafeString(translation);
    });
}

indieauthor.plugins.dependencies = function (container) {
    // Tooltips
    $("body").tooltip({
        trigger: 'hover',
        selector: "[data-toggle='tooltip']",
    });

    // Needed in order to hide after click in delete button
    $(document).on('click', "#" + container.id + " .btn", function () {
        $("[data-toggle='tooltip']").tooltip('hide');
    })
}