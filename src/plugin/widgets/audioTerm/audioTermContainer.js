indieauthor.widgets.AudioTermContainer = {
    widgetConfig: {
        widget: "AudioTermContainer",
        type: "specific-element-container",
        label: "Audio Term Container",
        allow: ["AudioTermItem"],
        category: "interactiveElements",
        toolbar: {
            edit: true
        }
    },
    createPaletteItem: function (params) {
        var item = {};
        item.content = indieauthor.renderTemplate('<div class="palette-item" data-category="{{category}}" data-type="{{type}}" data-widget="{{widget}}"> <img src="' + this.icon + '" class="img-fluid"/> <br/> <span> {{translate "widgets.AudioTermContainer.label"}} </span></div>', this.widgetConfig);
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
    template: function (options) {
        return '<div class="widget-audio-term-container" data-widget="{{widget}}" data-type="{{type}}" data-id="{{id}}"><div class="widget"><div class="b1"><img src="' + this.icon + '" class="img-fluid drag-item" /> </div><div class="b2" data-prev><span>{{translate "widgets.AudioTermContainer.label"}}</span></div><div class="b3" data-toolbar>  </div></div><div data-widget="{{widget}}" data-type="{{type}}" class="element-container dragula-container" data-content></div></div>';
    },
    getInputs: function (modelObject) {
        var templateValues = {
            instanceId: modelObject.id,
            instanceName: modelObject.params.name,
            help: modelObject.params.help
        }

        var inputTemplate = '<form id="f-{{instanceId}}"><div class="form-group"> <label for="instanceName">{{translate "common.name.label"}}</label> <input type="text" name="instanceName" class="form-control" value="{{instanceName}}" placeholder="{{translate "common.name.placeholder"}}" autocomplete="off" required/> <small class="form-text text-muted">{{translate "common.name.help"}}</small></div><div class="form-group"> <label for="help">{{translate "common.help.label"}}</label> <div class="input-group mb-3"> <input name="help" type="text" class="form-control" placeholder="{{translate "common.help.placeholder"}}" value="{{help}}"> <div class="input-group-append"> <button class="btn btn-indie" type="button" onclick="$(\'input[name=help]\').val(\'\')">{{translate "common.help.button"}}</button> </div></div><small class="form-text text-muted">{{translate "common.help.help"}}</small> </div></form>';
        var rendered = indieauthor.renderTemplate(inputTemplate, templateValues);

        return {
            inputs: rendered,
            title: indieauthor.strings.widgets.AudioTermContainer.label
        };
    },
    settingsClosed: function (modelObject) {},
    settingsOpened: function (modelObject) {},
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');
        element.querySelector("span").innerHTML = modelObject.params.name ? modelObject.params.name : indieauthor.strings.widgets.AudioTermContainer.label;
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
            keys.push("AudioTermContainer.data.empty");

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
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAvCAYAAAB30kORAAAACXBIWXMAAAsSAAALEgHS3X78AAACuUlEQVRogWNkQAJy5mEGDAwMAQwDCx4wMDBseHRy1QdcroA7Ws48rJ+BgaFARlKUAYQHCpw4d40B6vDARydXXcDpDDnzsAY587D/Ow+e+j/Q4OPnL/89Ysv+y5mHvZczDxPA5+j3c1dsHXAHwwDI4VYB2SCHF2BzL5OceZgDAwODQIi3/QAnZQTg4+FmcLM3BfH9sckzwRgghfQCv/hiGf54t+G1jR+Pe5hwygxiQFNH/z9yneH/5YdgNjGhSyygqaN/e7Ux/K1YilcNPs+ws7EKVLTPcqhon4VSilDd0ZSEKLpeAT4eUGW3n4GB4X5F+6wEmDgLukZQdP62rsFrOOvRFgZGXXmyHEYmAIX0/Ir2WQ86KtMOYIb0x2+EjUVTAwodaqVXAiCeYQiWHgoM2JIHKNqZK4Pw6kRPGixbq6juOnwAw9EM/FwMzJWBdHUEqQDT0RQCtk+LyTaAWL1UdzQyYN1WBY45fIAcT9LU0Yw2mnA2JTGADoZk24OmIY0LUBrqwyekof00nMDCSIuebsQAGI4GOTg8qwGvppXTGjAcTsijxAA+Xi4GLVUF0h0NAf9JtjA8q5FiR4MCYuW0eoLqcDiaEbswHkCMZYQAKKSJARiOhvgWf/LAlqbpmc6xhvRAZzRCYLRjSy8w6mh6gdEakVIwWiMSA0ZrRAJgtEakF2CCTspQJfdTE+w8dJqBm4sTq4lMj06uAjn6QOOEhQyfvnwdFA5es/Ugw7VbDxiU5CSxysPSdOG1Ww/2e8aWCyRHeBFVVtICgAJt58HTYEerK8sxiIkIYrUFeR4RNJwKmkt0gA30DQQQFxEEOxjHXOaBjso0R3jpAZ0hTcSmsqJ9Fum1DQ0BsaUH7plT+gKwO4h1dOEgcDAoJUxkINbRoCkD0Fw1rHgcAACy37GjMm2g7KcQMDAwAADM09jiVfIvDQAAAABJRU5ErkJggg=="
}