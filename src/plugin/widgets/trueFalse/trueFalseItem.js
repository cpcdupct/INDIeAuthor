indieauthor.widgets.TrueFalseItem = {
    widgetConfig: {
        widget: "TrueFalseItem",
        type: "specific-element",
        label: "True or false question",
        category: "interactiveElement",
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
        return '<div class="widget widget-true-false-item" data-type="{{type}}" data-widget="{{widget}}" data-id="{{id}}"><div class="b1"><img src="' + this.icon + '" class="img-fluid drag-item" /></div><div class="b2" data-prev><span>{{translate "widgets.TrueFalseItem.prev"}}</span></div><div class="b3" data-toolbar> </div></div>';
    },
    getInputs: function (modelValues) {
        var templateValues = {
            instanceId: modelValues.id,
            question: modelValues.data.question,
        }

        var tempalte = '<form id="f-{{instanceId}}"> <div class="form-group"> <label>{{translate "widgets.TrueFalseItem.form.questionText.label"}}</label> <textarea class="form-control" name="question" placeholder="{{translate "widgets.TrueFalseItem.form.questionText.placeholder"}}" required>{{question}}</textarea> <small class="form-text text-muted">{{translate "widgets.TrueFalseItem.form.questionText.help"}}</small> </div><div class="form-group"> <label>{{translate "widgets.TrueFalseItem.form.answer.label"}}</label> <select name="correctAnswer" class="form-control" required> <option value="true">{{translate "widgets.TrueFalseItem.form.answer.true"}}</option> <option value="false">{{translate "widgets.TrueFalseItem.form.answer.false"}}</option> </select> <small class="form-text text-muted">{{translate "widgets.TrueFalseItem.form.answer.help"}}</small> </div></form>';
        var rendered = indieauthor.renderTemplate(tempalte, templateValues);

        return {
            inputs: rendered,
            title: indieauthor.strings.widgets.TrueFalseItem.label
        };
    },
    settingsClosed: function (modelObject) {},
    settingsOpened: function (modelObject) {
        $("#modal-settings [name='correctAnswer']").val(indieauthor.utils.booleanToString(modelObject.data.answer));
    },
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');
        element.innerHTML = modelObject.data.question ? modelObject.data.question : indieauthor.strings.widgets.TrueFalseItem.prev;
    },
    emptyData: function () {
        var object = {
            data: {
                question: "",
                answer: true
            }
        };

        return object;
    },
    updateModelFromForm: function (modelObject, formJson) {
        modelObject.data.answer = indieauthor.utils.parseBoolean(formJson.correctAnswer);
        modelObject.data.question = formJson.question;
    },
    validateModel: function (widgetInstance) {
        var errors = [];

        if (widgetInstance.data.question.length == 0)
            errors.push("TrueFalseItem.question.empty");

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

        if (formData.question.length == 0)
            errors.push("TrueFalseItem.question.empty");

        return errors;
    },
    extensions: {},
    icon: " data:image/png;base64,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"
}