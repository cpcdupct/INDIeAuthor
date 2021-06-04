indieauthor.widgets.AcordionContainer = {
    widgetConfig: {
        widget: "AcordionContainer",
        type: "specific-container",
        label: "Acordion",
        allow: ["AcordionContent"],
        category: "containers",
        toolbar: {
            edit: true
        }
    },
    createPaletteItem: function () {
        var item = {};
        item.content = indieauthor.renderTemplate('<div class="palette-item" data-category="{{category}}" data-type="{{type}}" data-widget="{{widget}}"> <img src="' + this.icon + '" class="img-fluid"/> <br/> <span> {{translate "widgets.AcordionContainer.label"}} </span></div>', this.widgetConfig);
        item.numItems = 1;
        return item;
    },
    createElement: function (widgetInfo) {
        var element = indieauthor.renderTemplate(this.template(), {
            type: this.widgetConfig.type,
            widget: this.widgetConfig.widget,
            id: widgetInfo.id
        });

        return element;
    },
    template: function () {
        return '<div class="widget-base widget-acordeon-container" data-widget="{{widget}}" data-type="{{type}}" data-id="{{id}}"><div class="widget"><div class="b1"><img src="' + this.icon + '" class="img-fluid drag-item"/></div><div class="b2" data-prev><span>{{translate "widgets.AcordionContainer.label"}}</span></div><div class="b3" data-toolbar>  </div></div><div data-widget="{{widget}}" data-type="{{type}}" class="nested-container dragula-container" data-content></div></div>';
    },
    getInputs: function (modelObject) {
        var templateValues = {
            instanceId: modelObject.id,
            instanceName: modelObject.params.name,
            help: modelObject.params.help
        }

        var inputTemplate = '<form id="f-{{instanceId}}"> <div class="form-group"> <label for="instanceName">{{translate "common.name.label"}}</label> <input type="text" name="instanceName" class="form-control" value="{{instanceName}}" placeholder="{{translate "common.name.placeholder"}}" autocomplete="off" required/> <small class="form-text text-muted">{{translate "common.help.help"}}</small> </div><div class="form-group"> <label for="help">{{translate "common.help.label"}}</label> <div class="input-group mb-3"> <input name="help" type="text" class="form-control" placeholder="{{translate "common.help.placeholder"}}" value="{{help}}"> <div class="input-group-append"> <button class="btn btn-indie" type="button" onclick="$(\'input[name=help]\').val(\'\')">{{translate "common.help.button"}}</button> </div></div><small class="form-text text-muted">{{translate "common.help.help"}}</small> </div></form>';
        var rendered = indieauthor.renderTemplate(inputTemplate, templateValues);

        return {
            inputs: rendered,
            title: indieauthor.strings.widgets.AcordionContainer.label
        };
    },
    settingsClosed: function (modelObject) { },
    settingsOpened: function (modelObject) { },
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');
        element.querySelector("span").innerHTML = modelObject.params.name ? modelObject.params.name : indieauthor.strings.widgets.AcordionContainer.label;
    },
    emptyData: function (options) {
        var object = {
            params: {
                name: this.widgetConfig.label + "-" + indieauthor.utils.generate_uuid(),
                help: ""
            },
            data: []
        };

        return object;
    },
    updateModelFromForm: function (modelObject, formJson) {
        modelObject.params.name = formJson.instanceName;
        modelObject.params.help = formJson.help;
    },
    validateModel: function (widgetInstance) {
        var keys = [];

        if (widgetInstance.data.length == 0)
            keys.push("AcordionContainer.data.empty");

        if (!indieauthor.utils.hasNameInParams(widgetInstance))
            keys.push("common.name.invalid");
        else if (!indieauthor.model.isUniqueName(widgetInstance.params.name, widgetInstance.id))
            keys.push("common.name.notUniqueName");

        if (keys.length > 0) {
            return {
                element: widgetInstance.id,
                keys: keys
            }
        }

        return undefined;
    },
    validateForm: function (formData, instanceId) {
        var keys = [];

        if (formData.instanceName.length == 0)
            keys.push("common.name.invalid");
        else if (!indieauthor.model.isUniqueName(formData.instanceName, instanceId))
            keys.push("common.name.notUniqueName");

        return keys;
    },
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAvCAYAAAB30kORAAAACXBIWXMAAAsSAAALEgHS3X78AAAC6klEQVRoBe2ZX2hSURzHv2rrjzp1sIpFXEcxIvtDDOL2ZzT3srX20ILt0kMroiFUL0qRWg8VPSi9rF72YEX1EJVF9dACIZi2l2wwerJYL+ZrwWZpL23e+Jkuo6v3er16bfiBC8q9556Ph3N+5/j7aVAAw3K7AAxCXeIAXiSiwfliFkvSDMuNAXBubFsLutTi7UwMOfEjiWjwfVENhuWuMCzHhyLveLVJfk/xB0cu8AzLzTEsZyklPXfn0YTqwnlIfN/gWRJ3CvlqGZazA7AMDXSrPJX/YDIa0Nu9m74fFrqvzX+gB+sJcwkfbV2ZSqQhrTSrVjZZPL6A3eML/BVFVkjph098BRJfFJfSdG0ted9iMtJmNwlg3uMLuPxexz1IkV44HUDmwZSCqgWY9Wh6dRGaHVaxJ2mk73p8gbjf6wiLSpOwzn8MujN9ygonf+Dn/kvIvJyBTlw6zwkAYUlzWruTqVTxX8x6aKxlHxfa8b9GD0kLcdH3HJquj8r2nEwjM/UBOpHFKIQkaXo56KoTGptLrWhI14qGdK0QDXnuDQt4ZslURce0CDxcncH2MtuJSpOwa3QYezpt8u2KcO7aOF4388pLEyRcDWm5qYrlOadNzQaM3X6CvZ3bFO04mUoj9ukz+n7/6y4LUWlbhzWb9cllfhTH1tGuvDTJ3rp+Hr0Hyh8RMfqPu7PvL3e9SJrT1cqJmIx6We2W50KksETxtBqZVJoawwP2stuJSj8ev4ynExG5XiUhYTk5REkj7RwdUtq3IhqnvFrRkK4V2lxRpmrbtFxCb6Zh0K8RbK1NRIMkHb564z6+pdJ1IUwhNjYbxyamTfB+PuS5YrPxyf4Rt+XU0UOyDjFKQIMWikxnpbdsZrCutUXwrYV1REqnUi3Rnk/0qcH61pascJEdOOz3OnqWNpdchfSk0JMeX4BX60cIITV6FK+c1pash1RpVx0I00y4CanSVDKgWnU+PKoA9d/j9zrU6r9CAPwCoOzP8QlLHz4AAAAASUVORK5CYII="
}