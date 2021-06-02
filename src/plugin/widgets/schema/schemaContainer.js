indieauthor.widgets.SchemaContainer = {
    widgetConfig: {
        widget: "SchemaContainer",
        type: "specific-element-container",
        label: "Schema",
        allow: ["SchemaItem"],
        category: "interactiveElements",
        toolbar: {
            edit: true
        }
    },
    createPaletteItem: function (params) {
        var item = {};
        item.content = indieauthor.renderTemplate('<div class="palette-item" data-category="{{category}}" data-type="{{type}}" data-widget="{{widget}}"> <img src="' + this.icon + '" class="img-fluid"/> <br/> <span> {{translate "widgets.SchemaContainer.label"}} </span></div>', this.widgetConfig);
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
        return '<div class="widget-schema-container" data-widget="{{widget}}" data-type="{{type}}" data-id="{{id}}"><div class="widget"><div class="b1"><img src="' + this.icon + '" class="img-fluid drag-item" /> </div><div class="b2" data-prev><span>{{translate "widgets.SchemaContainer.label"}}</span></div><div class="b3" data-toolbar>  </div></div><div data-widget="{{widget}}" data-type="{{type}}" class="element-container dragula-container" data-content></div></div>';
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
            title: indieauthor.strings.widgets.SchemaContainer.label
        };
    },
    settingsClosed: function (modelObject) {},
    settingsOpened: function (modelObject) {},
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');
        element.querySelector("span").innerHTML = modelObject.params.name ? modelObject.params.name : indieauthor.strings.widgets.SchemaContainer.label;
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

        if (widgetInstance.data.length == 0) keys.push(" SchemaContainer.data.empty");

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
    icon: " data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAvCAYAAAB30kORAAAACXBIWXMAAAsSAAALEgHS3X78AAAC30lEQVRogWNkQAJy5mEGDAwMAQwDCx4wMDBseHRy1QdcroA7Ws48rJ+BgaFARlKUAYQHCpw4d40B6vDARydXXcDpDDnzsAY587D/Ow+e+j/Q4OPnL/89Ysv+y5mHvZczDxPA5+j3c1dsHXAHwwDI4VYB2SCHF2BzL5OceZgDAwODQIi3/QAnZQTg4+FmcLM3BfH9sckzwRgghYMJ8ONxD9OgcimRYEg6moVSAz59+cpw7dZDnPKUFKHsbKwCFe2zQHnuQkdlGrzcptjRxc3TGXYdPI1T3sJIi2HltHqyzBbg4wFVdvsZGBg+VLTPKuyoTFvAQI3k8enzV0qNIAaAyuv50FAfcmk6noEaySPU2wGFD6qGQUkCBiyNtCm1AhkoMFDD0aBKCblikrcIJzsNEwtGy2l6gZFVueCrVKBtYhRAzXY6WY5es/UgQ3HzNJzy4VmNWMWTIrwY6gviybESBZCVPFZvPUCWZdduPSBLHzoYzYj0AmQ5mtxabkAzYkFKCEpVjQxAmRBXjYhLD6mA7CIPnwOo5ThcYDQj0guQljw+fmP4276O4f/lRziVLHnIyvDHuw2nPKOuHANTlgcDo5wI2V4kydF/Mmcx/NtyFq8acwZGhn+Hr+NWcPg62NMsW6tIsRoFkJY8Pn4j2yJkgNdTRIDRjEgvQJqjKcg8yIDJx5gi/SRlRJbpaQx/deUpS9v8XAzM0bbk6yenRmTOcqfIQmqA0YxILzBkHQ3uA2HrjA4k2HnoNAM3Fyd2Rz86uQrk6AONExaCe9iDAYA6zqD+pJKcJFbXwEqPwmu3Huz3jC0XSI7wYtBSVRgQp4MCbefB02BHqyvLMYiJCGJVhzyPCBpOBc0lOsAG+gYCiIsIgh2Mo2t2oKMyzRFeTkNnSBOxqaxon/V/oDyBDRBbeuCeOaUvALuDWEcXDgIHg1LCRAZiHd1RmQYaUgqEFY8DAED2O3ZUpg2U/RQCBgYGAKY1zxwwyX/HAAAAAElFTkSuQmCC"
}