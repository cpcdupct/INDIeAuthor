indieauthor.widgets.ImageAndText = {
    widgetConfig: {
        widget: "ImageAndText",
        type: "element",
        label: "Image and Text",
        category: "interactiveElements",
        toolbar: {
            edit: true
        }
    },
    createPaletteItem: function () {
        var item = {};
        item.content = indieauthor.renderTemplate('<div class="palette-item" data-category="{{category}}" data-type="{{type}}" data-widget="{{widget}}">  <img src="' + this.icon + '" class="img-fluid"/> <br/> <span> {{translate "widgets.ImageAndText.label"}}</span></div>', this.widgetConfig);
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
        return '<div class="widget widget-imageandtext" data-type="{{type}}" data-widget="{{widget}}" data-id="{{id}}"><div class="b1"> <img src="' + this.icon + '" class="img-fluid drag-item" /> </div><div class="b2" data-prev><span>{{translate "widgets.ImageAndText.prev"}}</span></div><div class="b3" data-toolbar> </div></div>';
    },
    getInputs: function (modelValues) {
        var templateValues = {
            instanceId: modelValues.id,
            image: modelValues.data.image,
            instanceName: modelValues.params.name
        }

        var inputTemplate = '<form id="f-{{instanceId}}"><div class="form-group"> <label for="instanceName">{{translate "common.name.label"}}</label> <input type="text" name="instanceName" class="form-control" value="{{instanceName}}" placeholder="{{translate "common.name.placeholder"}}" autocomplete="off" required/> <small class="form-text text-muted">{{translate "common.name.help"}}</small> </div><div class="form-group"><label for="image">{{translate "widgets.ImageAndText.form.image.label"}}</label><input type="url" class="form-control" name="image" required placeholder="{{translate "widgets.ImageAndText.form.image.placeholder"}}" value="{{image}}" autocomplete="off" /><small class="form-text text-muted">{{translate "widgets.ImageAndText.form.image.help"}}</small></div>{{#if image}} <div class="form-group"><p>{{translate "widgets.ImageAndText.form.preview"}}</p><img class="img-fluid" src="{{image}}"/></div>{{/if}}<div class="form-group"><label for="textblockText">{{translate "widgets.ImageAndText.form.text.label"}}</label><textarea rows="10" class="form-control texteditor" name="textblockText" required></textarea><small class="form-text text-muted">{{translate "widgets.ImageAndText.form.text.help"}}</small></div></form>';
        var rendered = indieauthor.renderTemplate(inputTemplate, templateValues);

        return {
            inputs: rendered,
            title: indieauthor.strings.widgets.ImageAndText.label
        };
    },
    settingsClosed: function (modelObject) {},
    settingsOpened: function (modelObject) {
        indieauthor.widgetFunctions.initTextEditor(modelObject.data.text, this.widgetConfig.widget, indieauthor.strings.widgets.ImageAndText.form.text.placeholder);
    },
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');
        element.innerHTML = modelObject.params.name ? modelObject.params.name : indieauthor.strings.widgets.ImageAndText.prev;
    },
    emptyData: function (options) {
        var object = {
            params: {
                name: ""
            },
            data: {
                text: "",
                image: "",
                layout: 0
            }
        };

        return object;
    },
    updateModelFromForm: function (modelObject, formJson) {
        modelObject.data.text = formJson.textblockText;
        modelObject.data.image = formJson.image;
        modelObject.params.name = formJson.instanceName;
    },
    validateModel: function (widgetInstance) {
        var errors = [];

        if (widgetInstance.data.text.length == 0) errors.push("ImageAndText.text.invalid");
        if (indieauthor.widgetFunctions.isEmptyText(widgetInstance.data.text)) errors.push("ImageAndText.text.invalid");
        if (!indieauthor.utils.isURL(widgetInstance.data.image)) errors.push("ImageAndText.image.invalid");

        if (!indieauthor.utils.hasNameInParams(widgetInstance))
            errors.push("common.name.invalid");
        else if (!indieauthor.model.isUniqueName(widgetInstance.params.name, widgetInstance.id))
            errors.push("common.name.notUniqueName");

        if (errors.length > 0) {
            return {
                element: widgetInstance.id,
                keys: errors
            }
        }

        return undefined;
    },
    validateForm: function (formData, instanceId) {
        var errors = [];

        if (formData.textblockText.length == 0) errors.push("ImageAndText.text.invalid");
        if (indieauthor.widgetFunctions.isEmptyText(formData.textblockText)) errors.push("TextBlock.text.invalid");
        if (!indieauthor.utils.isURL(formData.image)) errors.push("ImageAndText.image.invalid");

        if (formData.instanceName.length == 0)
            errors.push("common.name.invalid");
        else if (!indieauthor.model.isUniqueName(formData.instanceName, instanceId))
            errors.push("common.name.notUniqueName");

        return errors;
    },
    icon: "data:image/png;base64,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"
}