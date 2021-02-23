indieauthor.widgets.Image = {
    widgetConfig: {
        widget: "Image",
        type: "element",
        label: "Image",
        category: "interactiveElements",
        toolbar: {
            edit: true
        }
    },
    createPaletteItem: function () {
        var item = {};
        item.content = indieauthor.renderTemplate('<div class="palette-item" data-category="{{category}}" data-type="{{type}}" data-widget="{{widget}}">  <img src="' + this.icon + '" class="img-fluid"/> <br/> <span>{{translate "widgets.Image.label"}}</span> </div>', this.widgetConfig);
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
        return '<div class="widget widget-image" data-type="{{type}}" data-widget="{{widget}}" data-id="{{id}}"> \ <div class="b1"><img src="' + this.icon + '" class="img-fluid drag-item"/> </div>\ <div class="b2" data-prev><span>{{translate "widgets.Image.prev"}}</span></div>\ <div class="b3" data-toolbar> </div>\ </div>';
    },
    getInputs: function (modelValues) {
        var templateValues = {
            instanceId: modelValues.id,
            instanceName: modelValues.params.name
        }

        if (!indieauthor.utils.isEmpty(modelValues.data)) {
            templateValues.text = modelValues.data.text;
            templateValues.image = modelValues.data.image;
        }

        var inputTemplate = '<form id="f-{{instanceId}}"><div class="form-group"> <label for="instanceName">{{translate "common.name.label"}}</label> <input type="text" name="instanceName" class="form-control" value="{{instanceName}}" placeholder="{{translate "common.name.placeholder"}}" autocomplete="off" required/> <small class="form-text text-muted">{{translate "common.name.help"}}</small> </div><div class="form-group"><label for="image">{{translate "widgets.Image.form.image.label"}}</label><input type="url" class="form-control" name="image" required placeholder="{{translate "widgets.Image.form.image.placeholder"}}" value="{{image}}" autocomplete="off" /><small class="form-text text-muted">{{translate "widgets.Image.form.image.help"}}</small></div> {{#if image}} <div class="form-group"><p>{{translate "widgets.Image.form.preview"}}</p><img class="img-fluid" src="{{image}}"/></div>{{/if}}<div class="form-group"><label for="text">{{translate "widgets.Image.form.caption.label"}}</label><textarea class="form-control texteditor" name="text">{{text}}</textarea><small class="form-text text-muted">{{translate "widgets.Image.form.caption.help"}}</small></div></form>';
        var rendered = indieauthor.renderTemplate(inputTemplate, templateValues);

        return {
            inputs: rendered,
            title: indieauthor.strings.widgets.Image.label
        };
    },
    settingsClosed: function (modelObject) {},
    settingsOpened: function (modelObject) {
        indieauthor.widgetFunctions.initTextEditor(modelObject.data.text, this.widgetConfig.widget, indieauthor.strings.widgets.Image.form.caption.placeholder);
    },
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');
        element.innerHTML = (modelObject.data.text && modelObject.data.image && modelObject.params.name) ? modelObject.params.name : indieauthor.strings.widgets.Image.prev;
    },
    emptyData: function () {
        var object = {
            params: {
                name: ""
            },
            data: {
                text: "",
                image: ""
            }
        };

        return object;
    },
    updateModelFromForm: function (modelObject, formJson) {
        modelObject.data.text = formJson.text;
        modelObject.data.image = formJson.image;
        modelObject.params.name = formJson.instanceName;
    },
    validateModel: function (widgetInstance) {
        var keys = [];

        if (!indieauthor.utils.isIndieResource(widgetInstance.data.image))
            keys.push("Image.image.invalid");

        if (!widgetInstance.data.text || (widgetInstance.data.text.length == 0))
            keys.push("Image.text.invalid");

        if (indieauthor.widgetFunctions.isEmptyText(widgetInstance.data.text))
            keys.push("TextBlock.text.invalid");

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

        if (!indieauthor.utils.isIndieResource(formData.image))
            keys.push("Image.image.invalid");

        if (formData.instanceName.length == 0)
            keys.push("common.name.invalid");
        else if (!indieauthor.model.isUniqueName(formData.instanceName, instanceId))
            keys.push("common.name.notUniqueName");

        if (!formData.text || (formData.text.length == 0))
            keys.push("Image.text.invalid");

        if (indieauthor.widgetFunctions.isEmptyText(formData.text))
            keys.push("TextBlock.text.invalid");

        return keys;
    },
    icon: " data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAvCAYAAAB30kORAAAACXBIWXMAAAsSAAALEgHS3X78AAADXUlEQVRoge2ZXUgUURSAz467mau4K5oh1NgPJT1EQsRAZBpERQUZxEBWVC/Sz4u+xNpTELS+WQ8ZDERP/ehLQRYJgoYiWRiSUBCEOj6Jbbqpa+vO7sSZnG22vXd3dnZnRsMPFnZ+7pzv3jlz5u5eB2hgOb4aAOrBXsYB4IU41DlLs4hLsxzfBgBNmyo2AH7s4t3Hz7Asfloc6hyharAcf4vleLn77XvZboJz8/KxCzdkluNnWI73ppKeefjsle3CKii+v/46ijeRfBmW4+sAwHvmRK3NqfyX4qJCOFK7D7dPkY4z6hc8cSXhSeHDrChTnaxJ55r8dS6vzy/U+fxCQhVJKS2L3yHqfx7/4LaVeIuL8GXXCwBjPr9wSQ3tpAqPTkDk+B2AYCi+L9r+BlxPm8BxYJfVg44j/cjnF8ZbWxr7qCMtnb2bIKwQDIF0RbDAkcpFoKUHjjItFXC/PPDFBl+FLfBfVQ/H7koAj5vcwuPOOqezvVPUkXY+aCTvbz2fVUDpqqA84LHH/YavQa0ezMm94Hp9E6Lt3X8eSI8b8q4dzWqUUViVxe8YnDlXkztpBAWdOSpvWmHtPiPiljyIJGE9x2iYLq1HKlNxU6UzkcnkXNOkjdx2vW1ST5hGJ0BqILzOcxTcaFuqNL6ulXraNZw0cco2qK5rdA1Tj5OlcWKkmTCRZnxmCatgTBrxOt0zsNyzXxGIPekHGSeDNZUJzRzN94FpqAFY70q6HI6MLIpJbYwytvgDr0psnTTSsZ5PIE8Fyb2fCiodwo4lCY+KOZHVQ4K0nuD/ilstDNr0kD980x08Ll7usVwYtNKYFpmgpBAljcxmVf4ISDnLQwKxCASikmkCO10FGbdJKz0YnoOXoYBRp7QIpTsybpNWuspZAOAuNcPXMGml8fYZuYVmsvZfnlWsWmlclIGvkUX7bTSMLM1DoZv8LDHiUCdK93WEpiEkk2dVVjMY/gmTUhi2sRXEyGr1aJ6Uwr23Z0Xv4QIvbM7Lt0U2JEdhZGlBka7azkJ5WQnxPEUa1+tYjt8aiEXaOham69Q/+uxgY1kJHKzek3ItM16nl1dIL5NO8vkF2a5OkNBbPegrp9aieOiVbl4BwpgJ90CvNC4Z4Fq1Wh5tAOMfam1ptCt+lgDAb7cafqL8lCv0AAAAAElFTkSuQmCC"
}