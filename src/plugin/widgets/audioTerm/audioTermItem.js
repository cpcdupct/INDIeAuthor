indieauthor.widgets.AudioTermItem = {
    widgetConfig: {
        widget: "AudioTermItem",
        type: "specific-element",
        label: "Audio Term Item",
        category: "interactiveElements",
        toolbar: {
            edit: true
        }
    },
    createPaletteItem: function (params) {},
    createElement: function (widgetInfo) {
        var element = indieauthor.renderTemplate(this.template(), {
            type: this.widgetConfig.type,
            widget: this.widgetConfig.widget,
            id: widgetInfo.id
        });

        return element;
    },
    template: function (options) {
        return '<div class="widget widget-audio-term-item" data-type="{{type}}" data-widget="{{widget}}" data-id="{{id}}"><div class="b1"><img src="' + this.icon + '" class="img-fluid drag-item"/></i></div><div class="b2" data-prev><span>{{translate "widgets.AudioTermItem.prev"}}</span></div><div class="b3" data-toolbar> </div></div>';
    },
    getInputs: function (modelObject) {
        var templateValues = {
            instanceId: modelObject.id,
            term: modelObject.data.term,
            definition: modelObject.data.definition,
            audio: modelObject.data.audio
        }

        var template = '<form id="f-{{instanceId}}"><div class="form-group"><label>{{translate "widgets.AudioTermItem.form.term.label"}}</label><input type="text" class="form-control" name="term" value="{{term}}" placeholder="{{translate "widgets.AudioTermItem.form.term.placeholder"}}" autocomplete="off" required/><small class="form-text text-muted">{{translate "widgets.AudioTermItem.form.term.help"}}</small></div><div class="form-group"><label>{{translate "widgets.AudioTermItem.form.definition.label"}}</label><textarea class="form-control" name="definition" placeholder="{{translate "widgets.AudioTermItem.form.definition.placeholder"}}" required>{{definition}}</textarea><small class="form-text text-muted">{{translate "widgets.AudioTermItem.form.definition.help"}}</small></div><div class="form-group"><label>{{translate "widgets.AudioTermItem.form.audio.label"}}</label><input type="url" class="form-control" name="audio" placeholder="{{translate "widgets.AudioTermItem.form.audio.placeholder"}}" value="{{audio}}" autocomplete="off" required/><small class="form-text text-muted">{{translate "widgets.AudioTermItem.form.audio.help"}}</small></div></form>';
        var rendered = indieauthor.renderTemplate(template, templateValues);

        return {
            inputs: rendered,
            title: indieauthor.strings.widgets.AudioTermItem.label
        };
    },
    settingsClosed: function (modelObject) {},
    settingsOpened: function (modelObject) {},
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');
        if (modelObject.data.term && modelObject.data.definition && modelObject.data.audio)
            element.innerHTML = modelObject.data.term + " -> " + modelObject.data.definition + " | (" + modelObject.data.audio + ")";
        else
            element.innerHTML = indieauthor.strings.widgets.AudioTermItem.prev;
    },
    emptyData: function (options) {
        var object = {
            data: {
                term: "",
                definition: "",
                audio: ""
            }
        };

        return object;
    },
    updateModelFromForm: function (modelObject, formJson) {
        modelObject.data.term = formJson.term;
        modelObject.data.definition = formJson.definition;
        modelObject.data.audio = formJson.audio;
    },
    validateModel: function (widgetInstance) {
        var errors = [];

        if (widgetInstance.data.term.length == 0)
            errors.push("AudioTermItem.term.invalid");

        if (widgetInstance.data.definition.length == 0)
            errors.push("AudioTermItem.definition.invalid");

        if (!indieauthor.utils.isIndieResource(widgetInstance.data.audio))
            errors.push("AudioTermItem.audio.invalid");

        if (errors.length > 0) {
            return {
                element: widgetInstance.id,
                keys: errors
            }
        }

        return undefined;
    },
    validateForm: function (formData) {
        var errors = [];

        if (formData.term.length == 0)
            errors.push("AudioTermItem.term.invalid");

        if (formData.definition.length == 0)
            errors.push("AudioTermItem.definition.invalid");

        if (!indieauthor.utils.isIndieResource(formData.audio))
            errors.push("AudioTermItem.audio.invalid");

        return errors;
    },
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAvCAYAAAB30kORAAAACXBIWXMAAAsSAAALEgHS3X78AAACk0lEQVRoge2Zz2vTYBjHv83mxG1sGUxlIK9DEZ0w8CIBsay7+GsHJ0gQdKgIPWyX7aKpJ72Y3tSLh4KI+AMpol566Gmtu1gHIgwq7GLtPzA3p6e1kTcsXUqTNE2yvAnkA4U0ed++n/fJ07dv88SggwjiKQDTYEsFwKdqKfvbzKIhTQTxMYD5QyP7QV+s+PKtjG3xK9VS9rupBhHEB0QQlXzxq8Ka9T+byoWZuwoRxDUiiLyV9NrzdznmwhpU/Mz0HBWfN/LliCAmAPBXpyYYp/IOA/19ODdxmr6/bHSd0w5owyAxaOHDBcrUJpG01+zt2cNLciYhyZmmVSTQ0vxAP/2xWwTwU5Izt7TzYUkPGukXNOoIYU7fRAilR8FKuiZ/RP3NkuP+jKQ/oP42BNJuo6tnV6W3ph6hJr1Wj82i62QynkvrJepLP6CsVNu035mM3Ql0t5xZ/4fas7xlp67Z88Bgr6kEFx8Ddz3ednCnfVuklZVfamcruPgJxM6ONVpo0XEi6gRP0oPeXjerQae0pofJbbdqExsnvgnDSDo2fhg9G686+pCu9A0vndri+epBv0hOI2+3b2t6uKQ7d9+xqN2+nkvr0aeZWRQ7nSR2W7ppIAdyZjDZMLnJe/gZ6aZBXUY9+jfuF5G0X0TSfhFJ+0VopWlRRivQBIb852X09e4zlq6WslS68PDJS2xs/g2E8/tcEeXVCo6QEcPr2t5jobxaWbw4c4+/c+0STh4b9VVSgwYtX1xWpY8fJTgwPGTYTl9HpI9TaS0xoT3oY8HB4SFV2KSWWUinkpONXd52hfS2UUtJziisJmGE3dXDvHLqL6qHXemFAAjTTHgKu9LpVLJAa9Xa8sgAOv5kOpVkNb5LAPwHyz3KdqgqcKEAAAAASUVORK5CYII="
}