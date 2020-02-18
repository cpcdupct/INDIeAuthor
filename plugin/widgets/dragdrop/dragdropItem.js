indieauthor.widgets.DragdropItem = {
    widgetConfig: {
        widget: "DragdropItem",
        type: "specific-element",
        label: "Drag And Drop Item ",
        category: "interactiveElements",
        toolbar: {
            edit: true
        }
    },
    createPaletteItem: function () {},
    createElement: function (widgetInfo) {
        var element = indieauthor.renderTemplate(this.template(), {
            type: this.widgetConfig.type,
            widget: this.widgetConfig.widget,
            id: widgetInfo.id
        });
        return element;
    },
    template: function () {
        return '<div class="widget-base widget widget-dragdrop-item" data-type="{{type}}" data-widget="{{widget}}" data-id="{{id}}"><div class="b1"><img class="img-fluid drag-item" src="' + this.icon + '" /></div><div class="b2" data-prev><span>{{translate "widgets.DragdropItem.prev"}}</span></div><div class="b3" data-toolbar> </div></div>';
    },
    getInputs: function (modelObject) {
        var templateValues = {
            instanceId: modelObject.id
        }

        if (!indieauthor.utils.isEmpty(modelObject.data)) {
            templateValues.term = modelObject.data.term;
            templateValues.definition = modelObject.data.definition;
        }

        var inputTemplate = '<form id="f-{{instanceId}}"><div class="form-group"><label for="term">{{translate "widgets.DragdropItem.form.term.label"}}</label><input type="text" class="form-control" name="term" required placeholder="{{translate "widgets.DragdropItem.form.term.placeholder"}}" value="{{term}}" autocomplete="off" /><small class="form-text text-muted">{{translate "widgets.DragdropItem.form.term.help"}}</small></div><div class="form-group"><label for="definition">{{translate "widgets.DragdropItem.form.definition.label"}}</label><textarea rows="4" class="form-control" name="definition"  placeholder="{{translate "widgets.DragdropItem.form.definition.placeholder"}}" required>{{definition}}</textarea><small class="form-text text-muted">{{translate "widgets.DragdropItem.form.definition.help"}}</small></div></form>';
        var rendered = indieauthor.renderTemplate(inputTemplate, templateValues);

        return {
            inputs: rendered,
            title: indieauthor.strings.widgets.DragdropItem.label
        };
    },
    settingsClosed: function (modelObject) {},
    settingsOpened: function (modelObject) {},
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');

        if (modelObject.data.term && modelObject.data.definition)
            element.innerHTML = "<p><b>" + modelObject.data.term + "</b>" + "<span> -> " + modelObject.data.definition + "</span></p>";
        else
            element.innerHTML = indieauthor.strings.widgets.DragdropItem.prev;
    },
    emptyData: function (options) {
        var object = {
            data: {
                term: "",
                definition: ""
            }
        };

        return object;
    },
    updateModelFromForm: function (modelObject, formJson) {
        modelObject.data.term = formJson.term;
        modelObject.data.definition = formJson.definition;
    },
    validateModel: function (widgetInstance) {
        var errors = [];

        if (widgetInstance.data.term.length == 0) errors.push("DragpdropItem.term.invalid");
        if (widgetInstance.data.term.definition == 0) errors.push("DragpdropItem.definition.invalid");

        if (errors.length > 0)
            return {
                element: widgetInstance.id,
                keys: errors
            };

        return undefined;
    },
    validateForm: function (formData) {
        var errors = [];

        if (formData.term.length == 0) errors.push("DragpdropItem.term.invalid");
        if (formData.term.definition == 0) errors.push("DragpdropItem.definition.invalid");

        return errors;
    },
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAvCAYAAAB30kORAAAACXBIWXMAAAsSAAALEgHS3X78AAACrUlEQVRoge2ZT2jTUBzHv02noq21g04pSDoU/6wgiCIZoq47KG4TXGXGwRjzH7146S7a3PRie3OCp6KIB4fUgV6K9LTWKloHxYsd1IMllx0czq2rF7GRV5a62pcYsSYp5AOB9JeX9z55fby8l58N62A5/iCAYRhLCcBzMZf4qmRRl2Y5/g6A8E5vF8hhFG/zBayJB8Vc4r2iBsvxN1mOl1KZd5LRLJdXpdPj1yWW45dYjnerSS89eJI0XFiGiB8dvkbEwzRfhuX4AAD3yFCfwUP5Fy6nA6f6jpDfZ2nXGfmEFDQT21R8GFOZasSSbjWbNm5wR6LxQCQab5hFTC3tdjnJy24WwKdINH5RjrfL8CA9/ZD0OtpwTE+gDaW7Yc0eOmJJ60VbSnfQgtKr+aaY7ViPakVT92eo8cujAy1fjDVJE+Hvg7ebCtqFc7ALQWolZLfxNJnG+aFAQ5zEeg/5a0crofY0DUn8TP0HCM6iiJOME+GrIw3xN/kP9fPq4yyq01nVNuyxMdgO+P7ool06O48f4iL1mrdcQXDhi/r94iKqWfpDy9iXv2ly0SzNjJ1QHB4f8wXcmnqEF2pCQlDx/r+lWZrtAnPmMPDbUzPH9ytW7d/rw0q5Al/vhYa4a6vjv+zsm6RtrAcd09T9pCJkq/b62b2WyylhvVz0wpLWC0taLyxpvbCk9cKS1ou2lSZJGTlBYxpSL+fg2LKZLi3mEkQ6TRbxK6sVUzjPJDMoFEvYxXqp1+X19GShWJodGL/hvjI6CP+ebl0lZUinpTJzNel9u1ls93RSy63PI5LPqSSXGJA/9BnBDk9nTVhhx5OOCaH++s5lLUN6iVYyEo1LRj0EDa2zh3LmVF9qHlqlJ00gTEbCXWiVjgmhNMlVy9OjAZD2+2NCyKj2/xEAPwGP2L6VdBBYHQAAAABJRU5ErkJggg=="
}