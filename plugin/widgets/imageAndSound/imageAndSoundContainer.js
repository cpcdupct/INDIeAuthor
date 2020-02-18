indieauthor.widgets.ImageAndSoundContainer = {
    widgetConfig: {
        widget: "ImageAndSoundContainer",
        type: "specific-element-container",
        label: "Image and Sound",
        allow: ["ImageAndSoundItem"],
        category: "interactiveElements",
        toolbar: {
            edit: true
        }
    },
    createPaletteItem: function (params) {
        var item = {};
        item.content = indieauthor.renderTemplate('<div class="palette-item" data-category="{{category}}" data-type="{{type}}" data-widget="{{widget}}">  <img src="' + this.icon + '" class="img-fluid"/> <br/> <span> {{translate "widgets.ImageAndSoundContainer.label"}}</span></div>', this.widgetConfig);
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
        return '<div class="widget-image-and-sound-container" data-widget="{{widget}}" data-type="{{type}}" data-id="{{id}}"><div class="widget"><div class="b1"><img src="' + this.icon + '" class="img-fluid drag-item" /> </div><div class="b2" data-prev><span>{{translate "widgets.ImageAndSoundContainer.label"}}</span></div><div class="b3" data-toolbar>  </div></div><div data-widget="{{widget}}" data-type="{{type}}" class="element-container dragula-container" data-content></div></div>';
    },
    getInputs: function (modelObject) {
        var templateValues = {
            instanceId: modelObject.id,
            instanceName: modelObject.params.name
        }

        var inputTemplate = '<form id="f-{{instanceId}}"><div class="form-group"> <label for="instanceName">{{translate "common.name.label"}}</label> <input type="text" name="instanceName" class="form-control" value="{{instanceName}}" placeholder="{{translate "common.name.placeholder"}}" autocomplete="off" required/> <small class="form-text text-muted">{{translate "common.name.help"}}</small></div></form>';
        var rendered = indieauthor.renderTemplate(inputTemplate, templateValues);

        return {
            inputs: rendered,
            title: indieauthor.strings.widgets.ImageAndSoundContainer.label
        };
    },
    settingsClosed: function (modelObject) {},
    settingsOpened: function (modelObject) {},
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');
        element.querySelector("span").innerHTML = modelObject.params.name ? modelObject.params.name : indieauthor.strings.widgets.ImageAndSoundContainer.label;
    },
    emptyData: function (options) {
        var object = {
            params: {
                name: ""
            },
            data: []
        };

        return object;
    },
    updateModelFromForm: function (modelObject, formJson) {
        modelObject.params.name = formJson.instanceName;
    },
    validateModel: function (widgetInstance) {
        var errors = [];

        if (widgetInstance.data.length == 0)
            errors.push("ImageAndSoundContainer.data.empty");


        if (!indieauthor.utils.hasNameInParams(widgetInstance))
            errors.push("common.name.invalid");
        else if (!indieauthor.model.isUniqueName(widgetInstance.params.name, widgetInstance.id))
            errors.push("common.name.notUniqueName");

        if (errors.length > 0)
            return {
                element: widgetInstance.id,
                keys: errors
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
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAvCAYAAAB30kORAAAACXBIWXMAAAsSAAALEgHS3X78AAADlUlEQVRoBe2Zb0gTYRjAnztn4TQ3wwohLikkJxWRxCIc6pfKDLKQFZRJfxhkXzaC3IqwPx/cl7AIDAZRfShSgvqQwvrinxloUkjGFvbFjaAPBjr/fSl38bzbXZu7neftdrfCHxzvu+3u3t/ePc9zt3spiIMxW/cCQANoyyQAvAmNdM+ksuClGbO1AwDsW0s2AW5aMfzJDzHxE6GR7rGUGozZeosxW1nvwAdWa8Jz8+yRpmssY7ZOM2arUUx6+vHLHs2FOVD8YMMVFLcL+dKM2VoDAMbG+mqNQ/kvhQX5cKh6P74+LvQ5zXVwx2zCIOJDZ5WpRP5JaV3aZwgvwu/LHtKuFqq+EnJaDqc8av26XKOz3YM5N+Z22fi6nbb0UqcXIm8/yjvYFxCVNhYW4MWuDwBmnO0eh9tlewpqhgfFFENu73XQvRCsYiuB9fpJbNYzI617ZEuQy3GfhdwvHRDxfY2GknyaQZGYFhCmz1gSYzw0Bb92OUiXPlYJdJWJhBU7Hlzt6UtBSWmUpSwmEgYEgx6o3duIGBteBF3vDaAMeoj4AsAOBYANTckfSynpBOEYtKUclsaDJFHZzyE5MyuIYjHN+gJJ71FVpmgnFiq0xUTCI8d1kvQ1l44MJUvHi1F7GPIlSMhgeASzIDz4meYS0KBPiOvIc59SQykoHfpJKgS2CMpGq8iCUkPwKFryOGHSHw/CklOZxFuOpJj+/mMK3g2OkjbpBJZy2YPjryEHSTNdd64VZucWoHBDPrx//TDh3huTC692IKPu8tVllUiSRmGuxdmuKEu8Qcf6PLsxj/TV+DMhKTwunD7KtxVlpUmfz84vwKmWO2TDfqaRJN1mb4bgcBdpUwn7JybJpoZ4WheXeGEONcQlSV+920m2eISEOTItvmIiouyrngH+9b2bLaLCHNFwCcKBfRWKCsNK0suFub7/W1BUONOISscLi72nNmvPPdTi/5NO9zl1pp5ziyZiV2eb7MTDUqeJNA5qv9SYkYHTYS0R1YKOLcpwCzRZg3dwFPL1ecIzHRrpRun+2/efqXIvLAVMfrxN2M6UCO7NJaLDPzHZV9fUaryY4kZfDXDSvAOjRHrnDgY2FxcJjhq/joiPU3EtsYZ70KcFW4qLiHCKctnvdtlq+ZIXWyE9L7Sns93DavUlhJBaPVKvnKoL8ZAq7cgCYYyEByBV2u2y9eNaNVceNQDHr3W7bNr980gLAPgDFU9nVbZypqMAAAAASUVORK5CYII="
}