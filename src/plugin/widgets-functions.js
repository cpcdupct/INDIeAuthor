/** Needed functions for the widgets behaviour  */
indieauthor.widgetFunctions = {};

/**
 * Initialize the text editor (.texteditor)
 * 
 * @param {string} content Editor text content. Can be empty
 * @param {string} origin String that indicates the widget origin that requested the editor
 */
indieauthor.widgetFunctions.initTextEditor = function (content, origin, placeholder) {
    $('.texteditor').trumbowyg({
        btns: [
            ['viewHTML'],
            ['undo', 'redo'], // Only supported in Blink browsers
            ["Format"],
            ['strong', 'em', 'del'],
            ['link'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
            ['unorderedList', 'orderedList'],
            ['removeformat'],
            ['fullscreen']
        ],
        btnsDef: {
            Format: {
                dropdown: ['p', 'h1', 'h2', 'h3', 'h4'],
                ico: 'p'
            }
        },
        minimalLinks: true,
        removeformatPasted: true,
        tagsToRemove: ['script', 'link', 'style', 'img', 'applet', 'embed', 'noframes', 'iframe', 'noscript']
    });

    if (content) $('.texteditor').trumbowyg('html', content);
}

indieauthor.widgetFunctions.isEmptyText = function (text) {
    var emptyTextRegex = /^(<br>$)/;
    return emptyTextRegex.test(text);
}

/**
 * Parse the latex formula inside a dom element
 * 
 * @param {string} formula Latex formula
 * @param {Element} domElement DOM element where the formula will be displayed
 */
indieauthor.widgetFunctions.showFormula = function (formula, domElement) {
    katex.render(formula, domElement, {
        throwOnError: false
    });
}