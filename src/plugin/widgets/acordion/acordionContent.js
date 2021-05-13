indieauthor.widgets.AcordionContent = {
    widgetConfig: {
        widget: "AcordionContent",
        type: "element-container",
        label: "Acordion content",
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
        return '<div class="widget-acordion-content" data-widget="{{widget}}" data-type="{{type}}" data-id="{{id}}"> <div class="widget"><div class="b1"><img src="' + this.icon + '" class="img-fluid drag-item"/></div><div class="b2" data-prev><span>{{translate "widgets.AcordionContent.label"}}</span></div><div class="b3" data-toolbar></div></div><div data-role="container" data-widget="{{widget}}" data-type="{{type}}" class="element-container dragula-container"></div></div>';
    },
    getInputs: function (modelObject) {
        var templateValues = {
            instanceId: modelObject.id
        }

        if (!indieauthor.utils.isEmpty(modelObject.params))
            templateValues.title = modelObject.params.title;

        var inputTemplate = '<form id="f-{{instanceId}}"><div class="form-group"><label for="title">{{translate "widgets.AcordionContent.form.title.label"}}</label><input type="text" class="form-control" name="title" required placeholder="{{translate "widgets.AcordionContent.form.title.placeholder"}}" value="{{title}}" autocomplete="off"/><small class="form-text text-muted">{{translate "widgets.AcordionContent.form.title.help"}}</small></div></form>';
        var rendered = indieauthor.renderTemplate(inputTemplate, templateValues);

        return {
            inputs: rendered,
            title: indieauthor.strings.widgets.AcordionContent.label
        };
    },
    settingsClosed: function (modelObject) {},
    settingsOpened: function (modelObject) {},
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');
        if (modelObject.params.title)
            element.innerHTML = indieauthor.strings.widgets.AcordionContent.label + ": " + modelObject.params.title;
        else
            element.innerHTML = indieauthor.strings.widgets.AcordionContent.label;
    },
    emptyData: function (options) {
        var object = {
            params: {
                title: ""
            },
            data: []
        };

        return object;
    },
    updateModelFromForm: function (modelObject, formJson) {
        modelObject.params.title = formJson.title;
    },
    validateModel: function (widgetInstance) {
        var errors = [];

        if (widgetInstance.params.title.length == 0) errors.push("AcordionContent.title.invalid");
        if (widgetInstance.data.length == 0) errors.push("AcordionContent.data.empty");

        if (errors.length > 0)
            return {
                element: widgetInstance.id,
                keys: errors
            };

        return undefined;
    },
    validateForm: function (formData) {
        if (formData.title.length == 0)
            return ["AcordionContent.title.invalid"]

        return [];
    },
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAvCAYAAAB30kORAAAACXBIWXMAAAsSAAALEgHS3X78AAACOklEQVRoBWNkQAJy5mEGDAwMAQwDCx4wMDBseHRy1QdcroA7Ws48rJ+BgaFARlKUAYQHCpw4d40B6vDARydXXcDpDDnzsAY587D/Ow+e+j/Q4OPnL/89Ysv+y5mHvZczDxPA5+j3c1dsHXAHwwDI4VYB2SCHF2BzL5OceZgDAwODQIi3/QAnZQTg4+FmcLM3BfH9sckzwRgghYMJ8ONxD9OgcimRYNTR1AbsbKwCFe2zHCraZ6GUIoPa0QJ8PKDKbj8DA8P9ivZZCTDxoZI8QCE9HxTqDEMwTcczDEFHK4AIFkKq/l9+yPBvyznaOIGfi4E5y51kbQQd/durjYGRn4uBUZ76jah/h6+DaVIdTtDRDB+/MbAsL2BgtNEk23G4wB/vNrD5pILhW7n8/0B6aNDSXMLJAxSNURPIMpwo4GNMspbRtge9wKij6QVGHU0vMOpoeoHh6WhGXXmaOoBRV45kPQSrcdajLeS6h2ZgNE3TC4w6ml5g1NH0AqOOphdggk7KwCZoBg3Yeeg0AzcXJ/aQfnRyFcjRBxonLGT49OXroHDzmq0HGa7desCgJCeJVR5WjRdeu/Vgv2dsuUByhBeDlqoCXR0JA6BA23nwNNjR6spyDGIigljVIc8jgoZTQXOJDrCBvoEA4iKCYAfjmMs80FGZ5ghvMEFnSBOxqaxon/V/oDyBDRBbeuCeOaUvALuDWEcXDgIHg1LCRAZiHd1RmXYANFcNKx4HAIDsd+yoTBso+ykEDAwMANU8kbtxWoUnAAAAAElFTkSuQmCC"
}