indieauthor.widgets.TabContent = {
    widgetConfig: {
        widget: "TabContent",
        type: "element-container",
        label: "Tab content",
        allow: ["element", "layout", "specific-element-container"],
        category: "containers",
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
        return '<div class="widget-tab-content" data-widget="{{widget}}" data-type="{{type}}" data-id="{{id}}"> <div class="widget"> <div class="b1"><img src="' + this.icon + '" class="img-fluid drag-item"/></div><div class="b2" data-prev><span>{{translate "widgets.TabContent.label"}}</span></div><div class="b3" data-toolbar></div></div><div data-role="container" data-widget="{{widget}}" data-type="{{type}}" class="element-container dragula-container"></div></div>';
    },
    getInputs: function (modelObject) {
        var templateValues = {
            instanceId: modelObject.id
        }

        if (!indieauthor.utils.isEmpty(modelObject.params)) templateValues.name = modelObject.params.name;

        var inputTemplate = '<form id="f-{{instanceId}}"><div class="form-group"><label for="name">{{translate "widgets.TabContent.form.name.label"}}</label><input type="text" class="form-control" name="name" required placeholder="{{translate "widgets.TabContent.form.name.placeholder"}}" value="{{name}}" autocomplete="off" /><small class="form-text text-muted">{{translate "widgets.TabContent.form.name.help"}}</small></div></form>';
        var rendered = indieauthor.renderTemplate(inputTemplate, templateValues);

        return {
            inputs: rendered,
            title: indieauthor.strings.widgets.TabContent.label
        };
    },
    settingsClosed: function (modelObject) {},
    settingsOpened: function (modelObject) {},
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');
        element.innerHTML = indieauthor.strings.widgets.TabContent.label + ": " + (modelObject.params.name ? modelObject.params.name : "");
    },
    emptyData: function () {
        var object = {
            params: {
                name: ""
            },
            data: []
        };

        return object;
    },
    updateModelFromForm: function (modelObject, formJson) {
        modelObject.params.name = formJson.name;
    },
    validateModel: function (widgetInstance) {
        var errors = [];

        if (!indieauthor.utils.hasNameInParams(widgetInstance)) errors.push("TabContent.name.invalid");
        if (widgetInstance.data.length == 0) errors.push("TabContent.data.empty");

        if (errors.length > 0)
            return {
                element: widgetInstance.id,
                keys: errors
            }

        return undefined;
    },
    validateForm: function (formData) {
        if (formData.name.length == 0)
            return ["TabContent.name.invalid"]

        return [];
    },
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAvCAYAAAB30kORAAAACXBIWXMAAAsSAAALEgHS3X78AAACrUlEQVRoBe2ZT2jTUBzHv0mnYjfaDjplIK9DEf/ARBAJiHXdRXQKbiJBrEWG0IuX9qLtTS82N+elQkFUcEOKBw8OzGmt9WAdiiB0sFPtVWGrzh3UNvKypU5J0rTpkg7ygUDLey/vk5eXX/Lej8EGCMcfBTAOeykDeFEpZpe1LBrShOPvAYjtGRwAPezi7YcS1sUnKsXsR00NwvG3CcdLYv6dZDfV7yvSmchNiXD8EuF4n5700sNns7YLK1DxE+M3qHhMzZclHB8C4Lt0bsTmqfwXT18vTo8cp/8vqJWzyg9asZvw6viwXWVqEEe60+zYvs2XSGVCiVTmnyjSY7afWuIppE8VzXKXEAYzHGjr3D5PH33ZzQFYTqQycSEZfQyzI11Li6hNF8CcPKR6wOvGr7G7Zrpo+AN4REcdpke6ugr2SACu5IRqsfRmAfWX70118R/XAOS22oM4BCd6WIjunK5PFyBVvmqW19KvwJ4/pn0Csva1+PvKlG4EYcNBMMRv+Kr1pWcKkD5/ARNQ/1R1hYNwJS9qtqciPTMx1B+I8kOp2kdhAWzwINApacijcEozOhiB3gm9u/HTE2n9nG3b2IgjbRWOtFU40lbhSFuFI20VjrRVNJeu/tg8lepqW810P02ZYbK24k6L7Wo1x+tuLBY6Iu0SruqvTDoBGWhp1dJUmiLvX3QZTvSwii0rTZMySoKmaxBfz6PXvVNdulLMUuncnakn+LayiTG5BZ7P5lFaLGMvGVRtpESPeGmxPHc2cst3/fIYDu8fskWWDpqYn5elD+wj2OXvV623MY9It1NpLjGkbPTZwW5/vyyskcvMCcnoaCNOr2dIJ9VqJlIZya6LUMNo9NDOnFqL7GFUOt4FwnQm3IdRaSEZzdFctRIebYD2Pyoko3b1bxIAfwCqj7mPjyjv0wAAAABJRU5ErkJggg=="
}