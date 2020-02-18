indieauthor.widgets.DragdropContainer = {
    widgetConfig: {
        widget: "DragdropContainer",
        type: "specific-element-container",
        label: "Drag And Drop ",
        allow: ["DragdropItem"],
        category: "interactiveElements",
        toolbar: {
            edit: true
        }
    },
    createPaletteItem: function () {
        var item = {};
        item.content = indieauthor.renderTemplate('<div class="palette-item" data-category="{{category}}" data-type="{{type}}" data-widget="{{widget}}"> <img src="' + this.icon + '" class="img-fluid"/>  <br/> <span> {{translate "widgets.DragdropContainer.label"}} </span></div>', this.widgetConfig);
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
        return '<div class="widget-dragdrop-container" data-widget="{{widget}}" data-type="{{type}}" data-id="{{id}}"><div class="widget"><div class="b1"> <img src="' + this.icon + '" class="img-fluid drag-item"/></div><div class="b2" data-prev><span>{{translate "widgets.DragdropContainer.label"}}</span></div><div class="b3" data-toolbar></div></div><div data-widget="{{widget}}" data-type="{{type}}" class="element-container dragula-container" data-content></div></div>';
    },
    getInputs: function (modelObject) {
        var templateValues = {
            instanceId: modelObject.id,
            instanceName: modelObject.params.name
        }

        var inputTemplate = '<form id="f-{{instanceId}}"><div class="form-group"> <label for="instanceName">{{translate "common.name.label"}}</label> <input type="text" name="instanceName" class="form-control" value="{{instanceName}}" placeholder="{{translate "common.name.placeholder"}}" autocomplete="off" required/> <small class="form-text text-muted">{{translate "common.name.help"}}</small> </div></form>';
        var rendered = indieauthor.renderTemplate(inputTemplate, templateValues);

        return {
            inputs: rendered,
            title: indieauthor.strings.widgets.DragdropContainer.label
        };
    },
    settingsClosed: function (modelObject) {},
    settingsOpened: function (modelObject) {},
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');
        element.querySelector("span").innerHTML = modelObject.params.name ? modelObject.params.name : indieauthor.strings.widgets.DragdropContainer.label;
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
        var keys = [];

        if (widgetInstance.data.length == 0)
            keys.push("DragdropContainer.data.empty");

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
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAvCAYAAAB30kORAAAACXBIWXMAAAsSAAALEgHS3X78AAADhklEQVRoBe2Zb0gTcRjHv95m4Z90giZSnVKIf6CIIhaVqBFlFqQSs0ipCAZZLxSiNoPKXrRVLzIEy0WERJAS1huDQaBmLzIhIklNXzSvlwr+943o4rnt5s7dztPm3YR94WD3/H5397nnvvc8435R8BNrNO0FUAJt5QLwgetpnQhG4YNmjaYnAKq3p6WANq309Xs/vOClXE/rj6AYrNF0jzWa3M6ub26tNTk94y6qvOlmjaZx1mgyyEGPv3zbrjmwIAI/VHKNwKuleBnWaCoAYDh7Kl9jKy8pIT4Ox/MP0P4ZqXFG+EETw0mJMjxMWJEqVAQ61Nq8KdpgsTkKLDaHqIqENbQhIZ6aXQeAPxab45IQ3yj2oEy/oqxjA3r6IjYgdAY2avXQh+pE/cMuTE3PBcQP7ssN1SV8CoB2941gvvgBMCkG0D8zg7mQFxS4vOo+cjPTl8VH8OLhjZCDB2aaYCcDM+bmxoKehDJMwC2Nd0Xx8qq6peO/DGCxe1AWhpISxSavAXqdRMALtjZ56LxsIJygKYs8lIyidqevcBaPAqETYz3bMouQ1/kYjS1T1qdBXH8/jHLUiQbI0wlbPPP5x64gi2uCprvd9LdJDMyNYeGqA/OHb0P/3IyoIzmiePzEHDKaq1GTLL4hAs7NzAgJqCy0lChL+vZaLDQ6MX++HjqqImwK71FdVRH01lLsAPhNDa3K07qqE2D2sJ6SSPv2Cj6mtlYFTZnms2st473NVwNu1LevlhRBC951T8wh+mOt7y1nTu/3eX32cQUGU2NEx6nmaQHQX4s/R8Dk5SC6vVYUF7w+/qgNv2qa0HB0m2hcvY7IjWKxeyAgLFdDfx/LRoOrT74jUkflRmVh+GsosJl6HfFN94odkbeet5zKSb2OyHfDMvlJrLLPcdIdUUoyj41eOPKvvx3g9bQgyqBOQRbXBM13xKnXqzoJVYiWxjva/Z9eq9ajtAVT5GONWopAq6UItFpivIsywgJN2Mj5uRdxsTGSOAzX00rQnXX1zZiamQ0L5nftXegfcmEnmyY5LjSXmv4hV8fJyluGK+eKVW0U/qKkObt6eeisXSy2JidJzvNfR6TPqbSWWCB86NNCqclJPHCQtcxOu9Vc6Gvj3hXSy1IzLTaHW6ubkJLS6hF85VRd8RxKoWvCAJic8BRKoe1WcyetVQvlUQPR9QvtVrNW1/9PAfgHtKkr/F25PusAAAAASUVORK5CYII="
}