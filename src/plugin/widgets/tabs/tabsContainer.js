indieauthor.widgets.TabsContainer = {
    widgetConfig: {
        widget: "TabsContainer",
        type: "specific-container",
        label: "Tabs menu",
        allow: ["TabContent"],
        category: "containers",
        toolbar: {
            edit: true
        }
    },
    createPaletteItem: function () {
        var item = {};
        item.content = indieauthor.renderTemplate('<div class="palette-item" data-category="{{category}}" data-type="{{type}}" data-widget="{{widget}}"> <img src="' + this.icon + '" class="img-fluid"/> <br/> <span> {{translate "widgets.TabsContainer.label"}} </span></div>', this.widgetConfig);
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
        return '<div class="widget-tabs-container widget-base" data-widget="{{widget}}" data-type="{{type}}" data-id="{{id}}"><div class="widget"><div class="b1"><img src="' + this.icon + '" class="img-fluid drag-item"/> </div><div class="b2" data-prev><span>{{translate "widgets.TabsContainer.label"}}</span></div><div class="b3" data-toolbar> </div></div><div data-widget="{{widget}}" data-type="{{type}}" class="nested-container dragula-container" data-content></div></div>';
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
            title: indieauthor.strings.widgets.TabsContainer.label
        };
    },
    settingsClosed: function (modelObject) {},
    settingsOpened: function (modelObject) {},
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');
        element.querySelector("span").innerHTML = modelObject.params.name ? modelObject.params.name : indieauthor.strings.widgets.TabsContainer.label;
    },
    emptyData: function (widget) {
        var object = {
            params: {
                name: "",
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
            keys.push("TabsContainer.data.empty");

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
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAvCAYAAAB30kORAAAACXBIWXMAAAsSAAALEgHS3X78AAAC5klEQVRoge2ZTWgTQRiG302qYpOmKaRKQadVEbVQEaWuiNr0oMQq2IqsQmzFCjnUS3rR5FR7MblVLxWCv6BFowcVC+bUVD0Yg0EoRMxB0pyVNrZGUdKViU2tOrv5abKbwj6wkDAzO8/+5N3sfBwWQXhhB4BOqEscwONEyD8tZbEgTXhhCIBzXUM96KYWryNRzIt3JUL+d5IahBcuEV4QA+NvRLVJzsyKtu4LIuGFKcILZjnpqRv3R1UXzkLF93aep+JOlq+O8IIVgPnEkTaVb+U/mIwGHGprpd+Psdp12Q+0YyVRK+OjqyjTPNGkS82qlSvMLo/P6vL4/kqRqlzzzOfmf5hqqtG8uQlp112IEwnJ8XqvHTMbLIjGJpntcs8Fs8lIH3ZjAKZdHl+/1+24nVOaCp/sG5Rs/9jTi/S9l9D32Zjt4sQkfnZcxs2Bgxi6/pDZZ8/OZjwYHpDTyPgDuOXy+OJetyOY80zLkkxBt70RencXW/rVe8w9e7ukKf7hDIDgcvshNkFLDwWRvae3hhMYWd/CbDPVGJAefg7d0V3SOyC/U6HnyQe0Su3nuwFi4hM4Ysn7qGWljU8j2D35GVwjI5JS38DZ90PvPi45nopUjThhuhYAn+KYfeYCEaDXBpRKmqKzH5BMh3ygV0LuavwwdRe+z6JtVESTVgpNWik0aaXQpJVCk1YKTVopcksnv5ZPJZkqapjsX1OuhSA9HMhsZaO2euFloSTSeu9p+TeTUkDqC3prySlN4fZtK690EWjpoRTLVpoWZSQXGtUi8CIMQ/VqtnQi5KfSwcErd/BltoyZXACPRscRjcWxkTQwB2XToz8ai48d7r5oPneqI7OEqwb0pAXGwxnpLZsI1ljqmBaL64h0OZXWEq3ZhT41WGupywhLrFkHvW5H+0JOz1dIz7J6ujw+Ua2DYJFvekhXTpUl45GvdH8FCNM74SrylaYlA1qrzsajCtD5271uh1rzLxEAvwBy0swa2Lf+uwAAAABJRU5ErkJggg=="
}