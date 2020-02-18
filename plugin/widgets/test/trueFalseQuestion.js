indieauthor.widgets.TrueFalseQuestion = {
    widgetConfig: {
        widget: "TrueFalseQuestion",
        type: "specific-element",
        label: "True or false question",
        category: "exerciseElement",
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
        return '<div class="widget widget-question" data-type="{{type}}" data-widget="{{widget}}" data-id="{{id}}"><div class="b1"><img src="' + this.icon + '" class="img-fluid drag-item" /></div><div class="b2" data-prev><span>{{translate "widgets.TrueFalseQuestion.prev"}}</span></div><div class="b3" data-toolbar> </div></div>';
    },
    getInputs: function (modelValues) {
        var templateValues = {
            instanceId: modelValues.id,
            question: modelValues.data.question,
        }

        var tempalte = '<form id="f-{{instanceId}}"> <div class="form-group"> <label>{{translate "widgets.TrueFalseQuestion.form.questionText.label"}}</label> <textarea class="form-control" name="question" placeholder="{{translate "widgets.TrueFalseQuestion.form.questionText.placeholder"}}" required>{{question}}</textarea> <small class="form-text text-muted">{{translate "widgets.TrueFalseQuestion.form.questionText.help"}}</small> </div><div class="form-group"> <label>{{translate "widgets.TrueFalseQuestion.form.answer.label"}}</label> <select name="correctAnswer" class="form-control" required> <option value="true">{{translate "widgets.TrueFalseQuestion.form.answer.true"}}</option> <option value="false">{{translate "widgets.TrueFalseQuestion.form.answer.false"}}</option> </select> <small class="form-text text-muted">{{translate "widgets.TrueFalseQuestion.form.answer.help"}}</small> </div></form>';
        var rendered = indieauthor.renderTemplate(tempalte, templateValues);

        return {
            inputs: rendered,
            title: indieauthor.strings.widgets.TrueFalseQuestion.label
        };
    },
    settingsClosed: function (modelObject) {},
    settingsOpened: function (modelObject) {
        $("#modal-settings [name='correctAnswer']").val(indieauthor.utils.booleanToString(modelObject.data.answer));
    },
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');
        element.innerHTML = modelObject.data.question ? modelObject.data.question : indieauthor.strings.widgets.TrueFalseQuestion.prev;
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
            errors.push("TrueFalseQuestion.question.empty");

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
            errors.push("TrueFalseQuestion.question.empty");

        return errors;
    },
    extensions: {},
    icon: " data:image/png;base64,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"
}