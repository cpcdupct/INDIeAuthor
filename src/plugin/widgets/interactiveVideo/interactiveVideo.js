indieauthor.widgets.InteractiveVideo = {
    widgetConfig: {
        widget: "InteractiveVideo",
        type: "element",
        label: "Interactive Video",
        category: "interactiveElements",
        toolbar: {
            edit: true
        }
    },
    createPaletteItem: function () {
        var itemTemplate = '<div class="palette-item" data-category="{{category}}" data-type="{{type}}" data-widget="{{widget}}"> <img src="' + this.icon + '" class="img-fluid"/> <br/> <span> {{translate "widgets.InteractiveVideo.label"}}</span></div>';
        var item = {};
        item.content = indieauthor.renderTemplate(itemTemplate, this.widgetConfig);
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
        return '<div class="widget widget-interactive-video" data-type="{{type}}" data-widget="{{widget}}" data-id="{{id}}"> <div class="b1"><img src="' + this.icon + '" class="img-fluid drag-item"></div><div class="b2" data-prev><span>{{translate "widgets.InteractiveVideo.prev"}}</span></div><div class="b3" data-toolbar> </div></div';
    },
    getInputs: function (modelValues) {
        var inputTemplate = '<form id="f-{{instanceId}}"><div class="form-group"> <label for="instanceName">{{translate "common.name.label"}}</label> <input type="text" name="instanceName" class="form-control" value="{{instanceName}}" placeholder="{{translate "common.name.placeholder"}}" autocomplete="off" required/> <small class="form-text text-muted">{{translate "common.name.help"}}</small> </div><div class="form-group"><label for="text">{{translate "widgets.InteractiveVideo.form.url.label"}}</label><input type="url" class="form-control" name="videourl" placeholder="{{translate "widgets.InteractiveVideo.form.url.placeholder"}}" value="{{{videourl}}}" autocomplete="off" required></input><small class="form-text text-muted">{{translate "widgets.InteractiveVideo.form.url.help"}}</small></div></form>';

        var rendered = indieauthor.renderTemplate(inputTemplate, {
            instanceId: modelValues.id,
            videourl: modelValues.data.videourl,
            instanceName: modelValues.params.name
        });

        return {
            inputs: rendered,
            title: indieauthor.strings.widgets.InteractiveVideo.label
        };
    },
    settingsClosed: function (modelObject) {},
    settingsOpened: function (modelObject) {},
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');
        if (modelObject.params.name && modelObject.data.videourl)
            element.innerHTML = modelObject.params.name + ": " + modelObject.data.videourl;
        else
            element.innerHTML = indieauthor.strings.widgets.InteractiveVideo.prev;
    },
    emptyData: function () {
        var object = {
            params: {
                name: ""
            },
            data: {
                videourl: ""
            }
        };

        return object;
    },
    updateModelFromForm: function (modelObject, formJson) {
        modelObject.data.videourl = formJson.videourl;
        modelObject.params.name = formJson.instanceName;
    },
    validateModel: function (widgetInstance) {
        var keys = [];

        if (!indieauthor.utils.isInteractiveVideo(widgetInstance.data.videourl))
            keys.push("InteractiveVideo.videourl.invalid");

        if (!indieauthor.model.isUniqueName(widgetInstance.params.name, widgetInstance.id))
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

        if (!indieauthor.utils.isInteractiveVideo(formData.videourl))
            keys.push("InteractiveVideo.videourl.invalid");

        if (formData.instanceName.length == 0)
            keys.push("common.name.invalid");
        else if (!indieauthor.model.isUniqueName(formData.instanceName, instanceId))
            keys.push("common.name.notUniqueName");

        return keys;
    },
    icon: " data:image/png;base64,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"
}