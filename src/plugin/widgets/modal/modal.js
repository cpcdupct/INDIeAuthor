indieauthor.widgets.Modal = {
    widgetConfig: {
        widget: "Modal",
        type: "simple-container",
        allow: ["element"],
        label: "Modal",
        category: "containers",
        toolbar: {
            edit: true
        }
    },
    createPaletteItem: function () {
        var item = {};
        item.content = indieauthor.renderTemplate('<div class="palette-item" data-category="{{category}}" data-type="{{type}}" data-widget="{{widget}}"> <img src="' + this.icon + '" class="img-fluid"/> <br/> <span> {{translate "widgets.Modal.label"}} </span></div>', this.widgetConfig);
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
        return '<div class="widget-schema-container" data-widget="{{widget}}" data-type="{{type}}" data-id="{{id}}"><div class="widget"><div class="b1"><img src="' + this.icon + '" class="img-fluid drag-item" /> </div><div class="b2" data-prev><span>{{translate "widgets.Modal.label"}}</span></div><div class="b3" data-toolbar>  </div></div><div data-widget="{{widget}}" data-type="{{type}}" class="element-container dragula-container" data-content></div></div>';
    },
    getInputs: function (modelObject) {
        var templateValues = {
            instanceId: modelObject.id,
            instanceName: modelObject.params.name,
            text: modelObject.params.text,
            help: modelObject.params.help
        }

        var inputTemplate = '<form id="f-{{instanceId}}"> <div class="form-group"> <label for="instanceName">{{translate "common.name.label"}}</label> <input type="text" name="instanceName" class="form-control" value="{{instanceName}}" placeholder="{{translate "common.name.placeholder"}}" autocomplete="off" required/> <small class="form-text text-muted">{{translate "common.name.help"}}</small></div><div class="form-group"> <label for="help">{{translate "common.help.label"}}</label> <div class="input-group mb-3"> <input name="help" type="text" class="form-control" placeholder="{{translate "common.help.placeholder"}}" value="{{help}}"> <div class="input-group-append"> <button class="btn btn-indie" type="button" onclick="$(\'input[name=help]\').val(\'\')">{{translate "common.help.button"}}</button> </div></div><small class="form-text text-muted">{{translate "common.help.help"}}</small> </div><div class="form-group"> <label for="text">{{translate "widgets.Modal.form.text.label"}}</label> <input type="text" name="text" class="form-control" value="{{text}}" placeholder="{{translate "widgets.Modal.form.text.placeholder"}}" autocomplete="off" required/> <small class="form-text text-muted">{{translate "widgets.Modal.form.text.help"}}</small></div></form>';
        var rendered = indieauthor.renderTemplate(inputTemplate, templateValues);

        return {
            inputs: rendered,
            title: indieauthor.strings.widgets.SchemaContainer.label
        };
    },
    settingsClosed: function (modelObject) {

    },
    settingsOpened: function (modelObject) {

    },
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');
        element.querySelector("span").innerHTML = modelObject.params.name ? modelObject.params.name : indieauthor.strings.widgets.Modal.label;
    },
    emptyData: function (options) {
        var object = {
            params: {
                name: this.widgetConfig.label + "-" + indieauthor.utils.generate_uuid(),
                text: "",
                help: ""
            },
            data: []
        };

        return object;
    },
    updateModelFromForm: function (modelObject, formJson) {
        modelObject.params.name = formJson.instanceName;
        modelObject.params.text = formJson.text;
        modelObject.params.help = formJson.help;
    },
    validateModel: function (widgetInstance) {
        var keys = [];

        if (widgetInstance.data.length == 0)
            keys.push("Modal.data.empty");

        if (widgetInstance.params.text.length == 0)
            keys.push("Modal.text.invalid");

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

        if (formData.text.length == 0)
            keys.push("Modal.text.invalid");

        if (formData.instanceName.length == 0)
            keys.push("common.name.invalid");
        else if (!indieauthor.model.isUniqueName(formData.instanceName, instanceId))
            keys.push("common.name.notUniqueName");

        return keys;
    },
    icon: "data:image/png;base64,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"
};