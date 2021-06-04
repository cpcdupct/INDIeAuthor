indieauthor.widgets.CouplesItem = {
    widgetConfig: {
        widget: "CouplesItem",
        type: "specific-element",
        label: "Couples Item",
        category: "interactiveElements",
        toolbar: {
            edit: true
        }
    },
    createPaletteItem: function (params) { },
    createElement: function (widgetInfo) {
        return indieauthor.renderTemplate(this.template(), {
            type: this.widgetConfig.type,
            widget: this.widgetConfig.widget,
            id: widgetInfo.id
        });
    },
    template: function (options) {
        return '<div class="widget widget-couple-item" data-type="{{type}}" data-widget="{{widget}}" data-id="{{id}}"><div class="b1"><img src="' + this.icon + '" class="img-fluid drag-item"/></div><div class="b2" data-prev><span>{{translate "widgets.CouplesItem.prev"}}</span></div><div class="b3" data-toolbar> </div></div>';
    },
    getInputs: function (modelObject) {
        var templateValues = {
            instanceId: modelObject.id,
            image: modelObject.data.image,
            text: modelObject.data.text,
            alt: modelObject.data.alt
        }

        var template = '<form id="f-{{instanceId}}"> <div class="form-group"> <label for="image">{{translate "widgets.CouplesItem.form.image.label"}}</label> <input type="url" class="form-control" name="image" required placeholder="{{translate "widgets.CouplesItem.form.image.placeholder"}}" value="{{image}}" autocomplete="off"/> <small class="form-text text-muted">{{translate "widgets.CouplesItem.form.image.help"}}</small></div><div class="form-group"><label for="alt">{{translate "common.alt.label"}}</label><input type="text" class="form-control" name="alt" required autocomplete="off" placeholder="{{translate "common.alt.placeholder"}}" value="{{alt}}"/><small class="form-text text-muted">{{translate "common.alt.help"}}</small></div>{{#if image}}<p>{{translate "widgets.CouplesItem.form.preview"}}</p><img class="img-fluid" src="{{image}}"/>{{/if}}<div class="form-group"> <label for="textblockText">{{translate "widgets.CouplesItem.form.text.label"}}</label> <input type="text" class="form-control" name="text" placeholder="{{translate "widgets.CouplesItem.form.text.placeholder"}}" required autocomplete="off" value="{{text}}"/> <small class="form-text text-muted">{{translate "widgets.CouplesItem.form.text.help"}}</small> </div></form>';
        var rendered = indieauthor.renderTemplate(template, templateValues);

        return {
            inputs: rendered,
            title: indieauthor.strings.widgets.CouplesItem.label
        };
    },
    settingsClosed: function (modelObject) { },
    settingsOpened: function (modelObject) { },
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');
        if (modelObject.data.image && modelObject.data.text)
            element.innerHTML = indieauthor.renderTemplate('<div class="sub1"><span><i>{{image}}</i></span></div><div class="sub2"><p>{{text}}</p></div>', modelObject.data);
        else
            element.innerHTML = indieauthor.strings.widgets.CouplesItem.prev;

        var preview = indieauthor.renderTemplate('<div class="sub1"><span><i>{{image}}</i></span></div><div class="sub2"><p>{{text}}</p></div>', modelObject.data);
        element.innerHTML = preview;
    },
    emptyData: function (options) {
        var object = {
            data: {
                image: "",
                text: "",
                alt: ""
            }
        };

        return object
    },
    updateModelFromForm: function (modelObject, formJson) {
        modelObject.data.text = formJson.text;
        modelObject.data.image = formJson.image;
        modelObject.data.alt = formJson.alt;
    },
    validateModel: function (widgetInstance) {
        var errors = [];

        if (widgetInstance.data.text.length == 0) errors.push("CouplesItem.text.invalid");

        if (!indieauthor.utils.isIndieResource(widgetInstance.data.image)) errors.push("CouplesItem.image.invalid");

        if (indieauthor.utils.isStringEmptyOrWhitespace(widgetInstance.data.alt))
            errors.push("common.alt.invalid")

        if (errors.length > 0)
            return {
                element: widgetInstance.id,
                keys: errors
            }

        return undefined;
    },
    validateForm: function (formData) {
        var errors = [];

        if (formData.text.length == 0) errors.push("CouplesItem.text.invalid");

        if (!indieauthor.utils.isIndieResource(formData.image)) errors.push("CouplesItem.image.invalid");

        if (indieauthor.utils.isStringEmptyOrWhitespace(formData.alt))
            errors.push("common.alt.invalid")

        return errors;
    },
    icon: "data:image/png;base64,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"
}