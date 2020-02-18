indieauthor.widgets.SimpleImage = {
    widgetConfig: {
        widget: "SimpleImage",
        type: "element",
        category: "simpleElements",
        toolbar: {
            edit: true
        }
    },
    createPaletteItem: function () {
        var item = {};
        item.content = indieauthor.renderTemplate('<div class="palette-item" data-category="{{category}}" data-type="{{type}}" data-widget="{{widget}}">  <img src="' + this.icon + '" class="img-fluid"/> <br/> <span>{{translate "widgets.SimpleImage.label"}}</span> </div>', this.widgetConfig);
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
        return '<div class="widget widget-simple-image" data-type="{{type}}" data-widget="{{widget}}" data-id="{{id}}"> \ <div class="b1"><img src="' + this.icon + '" class="img-fluid drag-item"/> </div>\ <div class="b2" data-prev><span>{{translate "widgets.SimpleImage.prev"}}</span></div>\ <div class="b3" data-toolbar> </div>\ </div>';
    },
    getInputs: function (modelObject) {
        var templateValues = {
            instanceId: modelObject.id,
            instanceName: modelObject.params.name,
            image: modelObject.data.image
        }

        var inputTemplate = '<form id="f-{{instanceId}}"> <div class="form-group"> <label for="instanceName">{{translate "common.name.label"}}</label> <input type="text" name="instanceName" class="form-control" value="{{instanceName}}" placeholder="{{translate "common.name.placeholder"}}" autocomplete="off" required/> <small class="form-text text-muted">{{translate "common.name.help"}}</small> </div><div class="form-group"> <label for="type">{{translate "widgets.SimpleImage.form.aspect.label"}}</label> <select name="aspect" class="form-control" required> <option value="original">{{translate "widgets.SimpleImage.form.aspect.values.original"}}</option> <option value="fit">{{translate "widgets.SimpleImage.form.aspect.values.fit"}}</option> </select> <small class="form-text text-muted">{{translate "widgets.SimpleImage.form.aspect.help"}}</small> </div><div class="form-group"><label for="image">{{translate "widgets.SimpleImage.form.image.label"}}</label><input type="url" class="form-control" name="image" required placeholder="{{translate "widgets.SimpleImage.form.image.placeholder"}}" value="{{image}}" autocomplete="off"/><small class="form-text text-muted">{{translate "widgets.SimpleImage.form.image.help"}}</small></div>{{#if image}}<div class="form-group"> <p>{{translate "widgets.SimpleImage.form.preview"}}</p><img class="img-fluid" src="{{image}}"/> </div>{{/if}}</form>';
        var rendered = indieauthor.renderTemplate(inputTemplate, templateValues);

        return {
            inputs: rendered,
            title: indieauthor.strings.widgets.SimpleImage.label
        };
    },
    settingsClosed: function (modelObject) {},
    settingsOpened: function (modelObject) {
        $("#modal-settings [name='aspect']").val(modelObject.params.aspect);
    },
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');
        if (modelObject.params.name && modelObject.data.image)
            element.innerHTML = modelObject.params.name + ": " + modelObject.data.image;
        else
            element.innerHTML = indieauthor.strings.widgets.SimpleImage.prev;
    },
    emptyData: function (options) {
        var object = {
            params: {
                name: "",
                aspect: "original"
            },
            data: {
                image: ""
            }
        };

        return object;
    },
    updateModelFromForm: function (modelObject, formJson) {
        modelObject.data.image = formJson.image;
        modelObject.params.name = formJson.instanceName;
        modelObject.params.aspect = formJson.aspect;
    },
    validateModel: function (widgetInstance) {
        var keys = [];

        if (!indieauthor.utils.isURL(widgetInstance.data.image))
            keys.push("SimpleImage.image.invalid");

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

        if (!indieauthor.utils.isURL(formData.image))
            keys.push("SimpleImage.image.invalid");

        if (formData.instanceName.length == 0)
            keys.push("common.name.invalid");
        else if (!indieauthor.model.isUniqueName(formData.instanceName, instanceId))
            keys.push("common.name.notUniqueName");

        return keys;
    },
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAvCAYAAAB30kORAAAACXBIWXMAAAsSAAALEgHS3X78AAAC80lEQVRoBe2ZS2gTURSG/0wTrWltUqjWgoy1XUgXiiAyIGrrRkVFK8iAL6yb4GOTbmTqyk1NdtVNhQFxU1GyUBdVLC5a0YURKoWCWdoG3Ck1VgLSJCNn7MQ0uTedvO4EyQ8DM/cx58vJufee5LiQI1lR9wIYhLNaAPAiHo384FFkoWVFHQMQ3N61BXQ5pQ+fPmMV/Gw8GpnjYsiKekdWVGPq7UfDaSWWfxnHL98yZEVdkhXVXwx66eHTl44DWyLwA4M3CTzI4pVkRR0A4D93st/hUP6nttYWHO3fT89nWP2SdUMD60m+IjxSXZHaVAO62tq4wePXQvqAFtLX7CJFoY34N6RDz7MXPYuUv62VDrtpAF+0kD5kmXZzgecXsXLiLpBIZtvS46/heRKE62CfaKeTpx9pIX0hPBKY4Xo6df7eGmBTiSRS13QBjFxdAS88yMu8UKB2433MAV5T3fivdg/X7h2Az8ue4fNWHNOVflNcT7sfBNjt4UsVGUxd180Fnnn8rux3cHcP6dQ+eF7dRnp86u+C9HnRdONYRV4mYAuW7sm4dPFQ9aBJBOiu0vaWC5zbVg64kIXIArbTx1PNoe1AlQpeU+hSYEoZWzPocr52u3OKJ0zzi0hdYBznVTJe7lwuNB3X5n46OVuQOFVq1NY7Jme5/WxoSoxyEiZWxlcrYEtkk6dC6ETSBMyftB54NYHXUwF0SpvgfkoeuEhg5EPbMZ4PLhoYucc45Rh2jVvgrj2ycGCsgdYmSppo/lAoslhqqcZfCKLUgBalBrQoNaBFSVotyiDaYtQV2JvNGbR4NzH7pHg0QtAzo50p/GwSzsbUM38GsWYDPXIXs986xodjzcb06Z4V/9B3CX2/nYmaZckwPUzQu3plbO1oZ44zoaleJyvqzq8eY2x0W3oASHeLBrbU2dGOw71y0VpmNmFarZBeZQ3SQnpdBbzdOOBXTsVqrhTo4ToApki4D7vQVDKgWrW1PTogsn8kPBJwyn6FAvAHxnVfJg4KZGkAAAAASUVORK5CYII=",
}