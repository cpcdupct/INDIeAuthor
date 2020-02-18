indieauthor.widgets.SchemaItem = {
    widgetConfig: {
        widget: "SchemaItem",
        type: "specific-element",
        label: "Schema Item",
        category: "interactiveElements",
        toolbar: {
            edit: true
        }
    },
    createPaletteItem: function (params) {},
    createElement: function (widgetInfo) {
        return indieauthor.renderTemplate(this.template(), {
            type: this.widgetConfig.type,
            widget: this.widgetConfig.widget,
            id: widgetInfo.id
        });
    },
    template: function (options) {
        return '<div class="widget widget-schema-item" data-type="{{type}}" data-widget="{{widget}}" data-id="{{id}}"><div class="b1"><img src="' + this.icon + '" class="img-fluid drag-item"/></div><div class="b2" data-prev><span>{{translate "widgets.SchemaItem.prev"}}</span></div><div class="b3" data-toolbar> </div></div>';
    },
    getInputs: function (modelValues) {
        var templateValues = {
            instanceId: modelValues.id
        }

        if (!indieauthor.utils.isEmpty(modelValues.data)) {
            templateValues.image = modelValues.data.image;
        }

        var inputTemplate = '<form id="f-{{instanceId}}"><div class="form-group"><label for="image">{{translate "widgets.SchemaItem.form.image.label"}}</label><input type="text" class="form-control" name="image" required placeholder="{{translate "widgets.SchemaItem.form.image.placeholder"}}" value="{{image}}" autocomplete="off" /><small class="form-text text-muted">{{translate "widgets.SchemaItem.form.image.help"}}</small></div>{{#if image}} <div class="form-group"><p>{{translate "widgets.SchemaItem.form.prev"}}</p><img class="img-fluid" src="{{image}}"/></div>{{/if}}</form>';
        var rendered = indieauthor.renderTemplate(inputTemplate, templateValues);

        return {
            inputs: rendered,
            title: indieauthor.strings.widgets.SchemaItem.label
        };
    },
    settingsClosed: function (modelObject) {},
    settingsOpened: function (modelObject) {},
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');
        element.innerHTML = modelObject.data.image ? modelObject.data.image : indieauthor.strings.widgets.SchemaItem.prev;
    },
    emptyData: function (options) {
        var object = {
            data: {
                image: ""
            }
        };

        return object;
    },
    updateModelFromForm: function (modelObject, formJson) {
        modelObject.data.image = formJson.image;
    },
    validateModel: function (widgetInstance) {
        var errors = [];

        if (!indieauthor.utils.isURL(widgetInstance.data.image)) errors.push("SchemaItem.image.invalid");

        if (errors.length > 0)
            return {
                element: widgetInstance.id,
                keys: errors
            }

        return undefined;
    },
    validateForm: function (formData) {
        var errors = [];

        if (!indieauthor.utils.isURL(formData.image)) errors.push("SchemaItem.image.invalid");

        return errors;
    },
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAvCAYAAAB30kORAAAACXBIWXMAAAsSAAALEgHS3X78AAACZ0lEQVRoBWNkQAJy5mEGDAwMAQwDCx4wMDBseHRy1QdcroA7Ws48rJ+BgaFARlKUAYQHCpw4d40B6vDARydXXcDpDDnzsAY587D/Ow+e+j/Q4OPnL/89Ysv+y5mHvZczDxPA5+j3c1dsHXAHwwDI4VYB2SCHF2BzL5OceZgDAwODQIi3/QAnZQTg4+FmcLM3BfH9sckzwRgghYMJ8ONxD9OgcimRYNTR1AbsbKwCFe2zHCraZ6GUIoPa0QJ8PKDKbj8DA8P9ivZZCTDxoZI8QCE9HxTqDEMwTcczUNvRoCo4PKuRmkaiAwWG0dKDjmDU0fQCQ9LRLKQo/rf0MMO/ZYdxyqt+/spQ9fw1wx/vNtyG8HMxsExPA9PkApIc/SdzFl55XgYGBk2Q515ex6vur+5OBubKQLIdPZqm6QWGv6MZdeWpYimjrhxF+knKiKxHWxj+H8Gdya7eesiwZusBhvrCeNyGyIkyMMqJkORIdECSo0GA0UYTp9wXrv8M189w4lVDDTCaEekFRh1NL0BVR4MGLkO9HWjudKo7mh7Da6PJg15g1NH0AqOOphdggk7KwCZoBg3Yeeg0AzcXJ/aQfnRyFcjRBxonLGT49OXroHDzmq0HGa7desCgJCeJVR7WNC28duvBfs/YcoHkCC8GLVUFujoSBkCBtvPgabCj1ZXlGMREBLGqQ55HBA2nguYSHWADfQMBxEUEwQ7GMZd5oKMyzRHeCYDOkCZiU1nRPuv/QHkCGyC29MA9c0pfAHYHsY4uHAQOBqWEiQzEOrqjMu0AaK4aVjwOAADZ79hRmTZQ9lMIGBgYAGcFnkaUo+5mAAAAAElFTkSuQmCC"
}