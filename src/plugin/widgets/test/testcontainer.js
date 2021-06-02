indieauthor.widgets.Test = {
    widgetConfig: {
        widget: "Test",
        type: "specific-element-container",
        label: "Test",
        allow: ["GapQuestion", "SimpleQuestion", "TrueFalseQuestion"],
        category: "exerciseElement",
        toolbar: {
            edit: true
        }
    },
    createPaletteItem: function (params) {
        var item = {};
        item.content = indieauthor.renderTemplate('<div class="palette-item" data-category="{{category}}" data-type="{{type}}" data-widget="{{widget}}">  <img src="' + this.icon + '" class="img-fluid"/> <br/> <span> {{translate label}}</span></div>', {
            category: this.widgetConfig.category,
            type: this.widgetConfig.type,
            widget: this.widgetConfig.widget,
            label: "widgets." + this.widgetConfig.widget + ".label"
        });
        item.numItems = 1;
        return item;
    },
    createElement: function (widgetInfo) {
        var element = indieauthor.renderTemplate(this.template(), {
            type: this.widgetConfig.type,
            widget: this.widgetConfig.widget,
            id: widgetInfo.id,
            prev: "widgets." + this.widgetConfig.widget + ".prev"
        });
        return element;
    },
    template: function () {
        return '<div class="widget-test" data-widget="{{widget}}" data-type="{{type}}" data-id="{{id}}"><div class="widget"><div class="b1"><img src="' + this.icon + '" class="img-fluid drag-item"/> </div><div class="b2" data-prev><span>{{translate "widgets.Test.label"}}</span></div><div class="b3" data-toolbar>  </div></div><div data-widget="{{widget}}" data-type="{{type}}" class="element-container dragula-container" data-content></div></div>';
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
            title: indieauthor.strings.widgets.Test.label
        };
    },
    settingsClosed: function (modelObject) {},
    settingsOpened: function (modelObject) {},
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');
        element.querySelector("span").innerHTML = modelObject.params.name ? modelObject.params.name : indieauthor.strings.widgets.Test;
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

        if (widgetInstance.data.length == 0)
            keys.push("Test.data.empty")

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
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAvCAYAAAB30kORAAAACXBIWXMAAAsSAAALEgHS3X78AAADpUlEQVRoge2ZX0hTURzHf5tZ5HRO0EKoqxQarIQoZJLknxdNDdKQGZVYmEbWgwPRLTLzxa1QZi8+TC0iAqcSPaRhL275kCZJUC7Qh+YIeigw/z7kn8XvbHep99y1cePeq/SFca9nh93P+fk9v9+55yhggxid/jgAFIO0cgPAC89Y708+igA0o9NbAaD2QGIC4EcqjU64wA9e4hnr/cCLwej09xid3jvkfOeVWnMLi94z5fVeRqefZXR6TTDo2e6eAcmBWSH4qeKbCF5L41UyOn0OAGhKi7IltvIfqaNVkJedjn+fo32vZG+wo5wUG4RHKSvSELUzob0fZwDmlsWh2aI9uyM1RrMtx2i2bcoivNAIu3LMACuZd+DXweuwerFddHiNOhqL3TAAfDGabVfYdjr03DKsFLaA1/Mj0LT+8j2smZ+LQ8sVRvoxRh2/2UXrwWeJtWcjEGG5vKlttahFMJEijeH8Lo8qAMBBhQ5H6yOfBUOHkQ2SgS/SirQkgNgoTrQjLp3m9N09/zR8SoGiDzI2CiIHb4OCiQ80Kc+ehAjTedEBaeK1B0Y78pOV+FvBJPgiLxP91dPEKjLTzqqIX799h6qGVkjKKIPMklvQ3tUvLlkQ8dqjrKaZgONbDF6tXX2kvfZaqTyh8ZUHQXFN23m/DlzTbigob4C+AQcHGgcnVNrUZGiqrRAGzepoCsnloE1JDkScNkCxRYVmX2y77YPkOjntDkR+q2ZG7aJDUyciQrc11sD8whLx8mvnOPkXtjXeEB2QJl574DtjxgltwBJ4LxcF9bTUeyB82pbFhTfS84tL8KjnFbydmAR1jAoqywplYxFe6Kr61k3pDCdj54M6yMviZhCxxVtc8IMZw95xl9zjIKxd/Rzof1Hecd6Es1kUdCLmZ6X7dnvwGqMC15Sb04ct70KEthMMrY7xrZ2xbGtTk8A1NUNyNq242DuaBEOzzwtVVGgs2zjy/gEnsYXvh1VgoCyWpJicvPbAipifnU6iDP5iI5ecHdTT6GU5ZIut+r8BKZa2LTRJvlIs5oNp6M04qKL2UnsoPWO9CO1obn9C1htyEKZaLGSHmEQqDZs9DK4p93BBeYOm8kIhydNSCIM25Bwn0EcOM7AvPo5KsfEcEbdT8Swxh93ok0L74+MIME9NcFhM1bmBPO0/Ib1K62k027yy8I1foWYP/pNTcUU4QoU2yAAYnfAQQoW2mKodeFbNpkcJhM/PtZiqpXq+QAHAb/c0MPPN6684AAAAAElFTkSuQmCC"
}