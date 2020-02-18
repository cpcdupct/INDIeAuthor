indieauthor.widgets.AnimationItem = {
    widgetConfig: {
        widget: "AnimationItem",
        type: "specific-element",
        label: "Animation Item",
        category: "interactiveElements",
        toolbar: {
            edit: true
        }
    },
    createPaletteItem: function (params) {},
    createElement: function (widgetInfo) {
        var element = indieauthor.renderTemplate(this.template(), {
            type: this.widgetConfig.type,
            widget: this.widgetConfig.widget,
            id: widgetInfo.id
        });
        return element;
    },
    template: function (options) {
        return '<div class="widget widget-animation-item" data-type="{{type}}" data-widget="{{widget}}" data-id="{{id}}"><div class="b1"><img src="' + this.icon + '" class="img-fluid drag-item"/></div><div class="b2" data-prev><span>{{translate "widgets.AnimationItem.prev"}}</span></div><div class="b3" data-toolbar> </div></div>';
    },
    getInputs: function (modelValues) {
        var templateValues = {
            instanceId: modelValues.id
        }

        if (!indieauthor.utils.isEmpty(modelValues.data)) {
            templateValues.image = modelValues.data.image;
        }

        var inputTemplate = '<form id="f-{{instanceId}}"><div class="form-group"><label for="image">{{translate "widgets.AnimationItem.form.image.label"}}</label><input type="text" class="form-control" name="image" required placeholder="{{translate "widgets.AnimationItem.form.image.placeholder"}}" value="{{image}}" autocomplete="off" /><small class="form-text text-muted">{{translate "widgets.AnimationItem.form.image.help"}}</small></div>{{#if image}} <div class="form-group"><p>{{translate "widgets.AnimationItem.form.prev"}}</p><img class="img-fluid" src="{{image}}"/></div>{{/if}}</form>';
        var rendered = indieauthor.renderTemplate(inputTemplate, templateValues);

        return {
            inputs: rendered,
            title: indieauthor.strings.widgets.AnimationItem.label
        };
    },
    settingsClosed: function (modelObject) {},
    settingsOpened: function (modelObject) {},
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');
        element.innerHTML = modelObject.data.image ? indieauthor.renderTemplate('<div class="sub1"><span><i>{{image}}</i></span></div><div class="sub2"><p>{{text}}</p></div>', modelObject.data) : indieauthor.strings.widgets.AnimationItem.prev;
    },
    emptyData: function () {
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

        if (!indieauthor.utils.isURL(widgetInstance.data.image)) errors.push("AnimationItem.image.invalid");

        if (errors.length > 0)
            return {
                element: widgetInstance.id,
                keys: errors
            }

        return undefined;
    },
    validateForm: function (formData) {
        var errors = [];

        if (!indieauthor.utils.isURL(formData.image)) errors.push("AnimationItem.image.invalid");

        return errors;
    },
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAvCAYAAAB30kORAAAACXBIWXMAAAsSAAALEgHS3X78AAACeElEQVRogWNkQAJy5mEGDAwMAQwDCx4wMDBseHRy1QdcroA7Ws48rJ+BgaFARlKUAYQHCpw4d40B6vDARydXXcDpDDnzsAY587D/Ow+e+j/Q4OPnL/89Ysv+y5mHvZczDxPA5+j3c1dsHXAHwwDI4VYB2SCHF2BzL5OceZgDAwODQIi3/QAnZQTg4+FmcLM3BfH9sckzwRgghYMJ8ONxD9OgcimRYNTR1AbsbKwCFe2zHCraZ6GUIoPa0QJ8PKDKbj8DA8P9ivZZCTDxoZI8QCE9HxTqDEMwTcczDEFHKzCMlh50BEPS0SzYBP9ffsjA8PEbqiA/FwOjrjydnIUfYHX034qlDP8OX0cRY7LVZGDZWgXnh2c1wtq+OMHKafUMFkZacGl5i3CS1OMCWB1NDNBSU0BRBfIAHy83g5YqIjb4eLlQ1KA7CF0PunqqO7q+IB6FDwpFkOWg0MIF0OWI0YMNDJ+MyJTpzsBoo4kixqgrRy83EQTYHe1jzMAAwiSCT1++EcycNHM0ueDarQfgUmXIOJrUzAQDxJYYyIBqjiamfKUWGG170AuMOppeYNTR9AKjjqYXGHU0vcCoo+kFmKCTMnRpB5MCdh46zcDNxYlVB9Ojk6tAjj7QOGEhw6cvXweFg9dsPQhumyvJSWKVhzVNC6/derDfM7ZcIDnCi0FLVQGrYloDUKDtPHga7Gh1ZTkGMRFBrDYizyOChlNBc4kOsIG+gQDiIoJgB+OYyzzQUZnmCO8EQGdIE7GprGif9X+gPIENEFt64J45pS8Au4NYRxcOAgeDUsJEBmId3VGZdgA0Vw0rHgcAgOx37KhMGyj7KQQMDAwAoOKne2Zj77sAAAAASUVORK5CYII="
}