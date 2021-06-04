indieauthor.widgets.TrueFalseContainer = {
    widgetConfig: {
        widget: "TrueFalseContainer",
        type: "specific-element-container",
        label: "True false",
        allow: ["TrueFalseItem"],
        category: "interactiveElement",
        toolbar: {
            edit: true
        }
    },
    createPaletteItem: function (params) {
        var item = {};
        item.content = indieauthor.renderTemplate('<div class="palette-item" data-category="{{category}}" data-type="{{type}}" data-widget="{{widget}}"> <img src="' + this.icon + '" class="img-fluid"/> <br/> <span> {{translate "widgets.TrueFalseContainer.label"}} </span></div>', this.widgetConfig);
        item.numItems = 1;
        return item;
    },
    createElement: function (widgetInfo) {
        return indieauthor.renderTemplate(this.template(), {
            type: this.widgetConfig.type,
            widget: this.widgetConfig.widget,
            id: widgetInfo.id
        });
    },
    template: function (options) {
        return '<div class="widget-true-false" data-widget="{{widget}}" data-type="{{type}}" data-id="{{id}}"><div class="widget"><div class="b1"><img src="' + this.icon + '" class="img-fluid drag-item" /> </div><div class="b2" data-prev><span>{{translate "widgets.TrueFalseContainer.label"}}</span></div><div class="b3" data-toolbar>  </div></div><div data-widget="{{widget}}" data-type="{{type}}" class="element-container dragula-container" data-content></div></div>';
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
            title: indieauthor.strings.widgets.TrueFalseContainer.label
        };
    },
    settingsClosed: function (modelObject) {},
    settingsOpened: function (modelObject) {},
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');
        element.querySelector("span").innerHTML = modelObject.params.name ? modelObject.params.name : indieauthor.strings.widgets.TrueFalseContainer.label;
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

        if (widgetInstance.data.length == 0) keys.push(" TrueFalseContainer.data.empty");

        if (!indieauthor.utils.hasNameInParams(widgetInstance))
            keys.push("common.name.invalid");
        else if (!indieauthor.model.isUniqueName(widgetInstance.params.name, widgetInstance.id))
            keys.push("common.name.notUniqueName");

        if (keys.length > 0)
            return {
                element: widgetInstance.id,
                keys: keys
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
    icon: " data:image/png;base64,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"
}