indieauthor.widgets.TextBlock = {
    widgetConfig: {
        widget: "TextBlock",
        type: "element",
        label: "Text Block",
        category: "simpleElements",
        toolbar: {
            edit: true
        }
    },
    createPaletteItem: function () {
        var item = {};
        item.content = indieauthor.renderTemplate('<div class="palette-item" data-category="{{category}}" data-type="{{type}}" data-widget="{{widget}}"> <img  src="' + this.icon + '" class="img-fluid" /> <br/> <span> {{translate label}}</span></div>', {
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
        return '<div class="widget widget-textblock" data-type="{{type}}" data-widget="{{widget}}" data-id="{{id}}"><div class="b1" ><img src="' + this.icon + '" class="img-fluid drag-item"></div><div class="b2" data-prev><span>{{translate prev}}</span></div><div class="b3" data-toolbar></div></div>';
    },
    getInputs: function (modelValues) {
        var templateValues = {
            instanceId: modelValues.id,
            label: "widgets." + this.widgetConfig.widget + ".form.label",
            help: "widgets." + this.widgetConfig.widget + ".form.help"
        }

        var inputTemplate = '<form id="f-{{instanceId}}"><div class="form-group"><label for="textblockText">{{translate label}}</label><textarea rows="10" class="form-control texteditor" name="textblockText"></textarea><small class="form-text text-muted">{{translate help}}</small></div></form>';
        var rendered = indieauthor.renderTemplate(inputTemplate, templateValues);

        return {
            inputs: rendered,
            title: indieauthor.strings.widgets.TextBlock.label
        };
    },
    settingsClosed: function (modelObject) {

    },
    settingsOpened: function (modelObject) {
        indieauthor.widgetFunctions.initTextEditor(modelObject.data.text, this.widgetConfig.widget, indieauthor.strings.widgets.TextBlock.form.placeholder);
    },
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');
        element.innerHTML = modelObject.data.text.length > 0 ? modelObject.data.text : indieauthor.strings.widgets.TextBlock.prev;
    },
    emptyData: function () {
        var object = {
            data: {
                text: ""
            }
        }

        return object;
    },
    updateModelFromForm: function (modelObject, formJson) {
        modelObject.data.text = formJson.textblockText;
    },
    validateModel: function (widgetInstance) {
        if (widgetInstance.data.text.length == 0)
            return {
                element: widgetInstance.id,
                keys: ["TextBlock.text.invalid"]
            };

        if (indieauthor.widgetFunctions.isEmptyText(widgetInstance.data.text))
            return {
                element: widgetInstance.id,
                keys: ["TextBlock.text.invalid"]
            };

        return undefined;
    },
    validateForm: function (formData) {
        if (formData.textblockText.length == 0)
            return ["TextBlock.text.invalid"];

        if (indieauthor.widgetFunctions.isEmptyText(formData.textblockText))
            return ["TextBlock.text.invalid"];

        return [];
    },
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAwCAYAAABuZUjcAAAACXBIWXMAAAsSAAALEgHS3X78AAACPElEQVRogWMYqoAR2d1y5mEFDAwM+QwMDAoD7J8NDAwMhY9OrnqASwHc4XLmYfMZGBgSkiK8GNztTOnmQnTw5PlrhrkrtzFcu/XgAwMDg+Ojk6su4FQsZx7mIGce9n/nwVP/BwP4+PnLf4/Ysv9y5mH7cbmZCUrHu9mbMrgNYEgjAz4ebobe2kyQCChAsSZbmMMVtFUHOlmjAi2Ee/A6fMiBUYfTG7AQY9/f9vUMf9vX0cxpbJ8W45SzM9fvlwlwAZXnEzsq0w7AxIlyOKOcCAOTrSaVnEkaYGNlMWBgYADhgIr2WYkdlWkLiHY4U7QtGA8C0M/AwAB2+FBL4wIV7bMcGEZLlQEAow6nNxj05TguMOjLcVxgqJXjcDCaOekNRh1ObzBajuMDoKKUZWsVFZyLAHQpxxl15cjWiwuMluP0BqMOpzcYdTi9wajD6Q1GHU5vMPQd/vHL14F1CRoAzQXhAzCHb1yz9SDDp0HkeJB72FhZGMREBLHKwxy+4NPnrx/Cs5oI+pQeYN7KbQz9c1Yz6Goo4bQNeboQNJQLmjI00FJTYODj4RoQR1+7/ZDh0+evYEfjcLgjaJwc3qyFzicagqYOr9164ICsUk5a3J6fl9sBmynUBqBJK3ERQQZuLg68JmO0xx+dXAUa9T+ALBbVPgs040wXhxMBQBO3RBeHG2AaBhg86KhMu0C0wzsq00BzMIUD7GhQwAXCOIz41aKCivZZoMnSBNq6DysAOXpBR2XaYIh1CgADAwMAv3EUkQX/fccAAAAASUVORK5CYII=",
}