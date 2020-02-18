indieauthor.widgets.CouplesContainer = {
    widgetConfig: {
        widget: "CouplesContainer",
        type: "specific-element-container",
        label: "Couples",
        allow: ["CouplesItem"],
        category: "interactiveElements",
        toolbar: {
            edit: true
        }
    },
    createPaletteItem: function (params) {
        var item = {};
        item.content = indieauthor.renderTemplate('<div class="palette-item" data-category="{{category}}" data-type="{{type}}" data-widget="{{widget}}"> <img src="' + this.icon + '" class="img-fluid"/> <br/> <span> {{translate "widgets.CouplesContainer.label"}} </span></div>', this.widgetConfig);
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
        return '<div class="widget-couples-container" data-widget="{{widget}}" data-type="{{type}}" data-id="{{id}}"><div class="widget"><div class="b1"><img src="' + this.icon + '" class="img-fluid drag-item" /> </div><div class="b2" data-prev><span>{{translate "widgets.CouplesContainer.label"}}</span></div><div class="b3" data-toolbar>  </div></div><div data-widget="{{widget}}" data-type="{{type}}" class="element-container dragula-container" data-content></div></div>';
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
            title: indieauthor.strings.widgets.CouplesContainer.label
        };
    },
    settingsClosed: function (modelObject) {},
    settingsOpened: function (modelObject) {},
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');
        element.querySelector("span").innerHTML = modelObject.params.name ? modelObject.params.name : indieauthor.strings.widgets.CouplesContainer.label;
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

        if (widgetInstance.data.length == 0) errors.push("CouplesContainer.data.empty");

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
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAvCAYAAAB30kORAAAACXBIWXMAAAsSAAALEgHS3X78AAAD80lEQVRoge2ZbUhTURjH/7tmkZYusCKIOymiNIooYhWZ9sVeFvSCzSgjwhKyL0pR24feX7bC0CAKlr1BQWlkHzKwPqSZlEkSSAvqyzaCPhTk+yf1xnPalsO7c8+dc9fCP4zdu3vuOb9z9pznec45JgyTbLUvA7ANxsoH4GmgtaYzGkUYWrbaKwGUzZ0zE/QxSu/avQiCbw+01nyMiiFb7adlq11paHqvGK2unl5l495jimy1/5KtdjMP+teth/WGA4dE4Gu2HSbwMjVeSbba8wCYC2y5BpvyX6VNS0V+7kq636r2XApdUMHxpHQOjzSuSAU1AR1vTZmcbHa4PHkOlyfCi0ziteP96sOth8/x7fsPLk7a9FTstOUif93KPz909WPQ9QRKR0CzGybbCiTtyQHSU0Y8M6dNo2D3CkCnw+UpdztL7mpCF5aeRXHhZuy05XEbpk4dPFaBlrprLDAR8OD1Bk1gpubP7CupdAOvFI30HYfL43M7Sxq50N09fSg7UCDUdm19I4MnaO4Ip6dAWmqB0tkPpcP/57eufqE2AOwDwIeOt0xyBpJbLoRNYWB3FYaefdDTSiYSPRGlLSsibFfDJKJKc6QtqwpHTxuUEvgZee//ySkdXZrQ/nePhCoqLD2jWYZMYdBVBylnEbPpAcf9sYGOt5hncY2u0n8yInJHmoJGVfVjrFqeza2EXB0l76HFg2mJHPa/QlIJLDFDP7p+kkXEt9WfuJVQ525ePhqGTnLuYN+6ImK8oLMXZOLKiVJdFTKlpyDJXaT/PUH9fzZNUt6I2aZpiSXCNinZ6u7RDs+xLKS50AO2ixgSnFAEndxynl2/eN2GI+duIHuBRfM971c/bl46qjnZh4sLLQoMNun87F8xrc1CbX0TTpXtg8i6k7wTeR490GNi05QdjuXeSUwRkbI1k2VmZHqZQOmGHpFeHvJg6EHziHKUXwd3i7h62/4Jq5cv1sWg2zxohCPSS52BIR7SPdJkEhH3UdJLWqIJTa5q/b3QD93hZyZBI0zAsaaXo1FME5FsWM2OQyLPIerGunr7uLtJauJC03JIdFUt5WQxH42gaRw8XoHK6lrN9yjZosQsftDuopgSHxrhjpe3db8nqoltsURpAjpRkoKHMkIhN5FqeN2G1JSpqi1KgdYagm48U3UP3b194wL4cX0TvF98mCfPUX0ecnnl3i++V5v2HjcX79rM1oZGiAatoamNQS+cL2NWxgxViuHniLSdSmeJeaGNPiM0O2MGA46Sjze6nSXrw8EleEK6X62kw+VRjOqEmkS9R/ST08SKcYhCl48DYLKEqxCFpiMDOqsOuUcDRO2vdztLjGp/lALwG87iVPccTNroAAAAAElFTkSuQmCC"
}