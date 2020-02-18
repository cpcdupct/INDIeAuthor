indieauthor.widgets.SimpleQuestion = {
    widgetConfig: {
        widget: "SimpleQuestion",
        type: "specific-element",
        label: "Simple Question",
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
        return '<div class="widget widget-question" data-type="{{type}}" data-widget="{{widget}}" data-id="{{id}}"><div class="b1"><img src="' + this.icon + '" class="img-fluid drag-item" /></div><div class="b2" data-prev><span>{{translate "widgets.SimpleQuestion.prev"}}</span></div><div class="b3" data-toolbar> </div></div>';
    },
    getInputs: function (modelValues) {
        var templateValues = {
            instanceId: modelValues.id,
            answers: [],
            question: modelValues.data.question,
        }

        // Set the answer model
        for (var i = 0; i < this.extensions.maxAnswers; i++) {
            var answer = modelValues.data.answers[i];
            if (answer)
                templateValues.answers.push(answer)
            else
                templateValues.answers.push({
                    text: "",
                    correct: false
                })
        }

        var tempalte = '<form id="f-{{instanceId}}"> <div class="form-group"> <label>{{translate "widgets.SimpleQuestion.form.questionText.label"}}</label> <textarea class="form-control" name="question" placeholder="{{translate "widgets.SimpleQuestion.form.questionText.placeholder"}}" required>{{question}}</textarea> <small class="form-text text-muted">{{translate "widgets.SimpleQuestion.form.questionText.help"}}</small> </div><div class="form-group"> <label>{{translate "widgets.SimpleQuestion.form.answers.label"}}</label>{{#each answers}}<div class="input-group input-answer"> <div class="input-group-prepend"> <div class="input-group-text"> <input type="radio" name="correctAnswer"{{#if correct}}checked="true"{{/if}}value="{{@index}}"> </div></div><input class="form-control" type="text" autocomplete="off" name="answer{{@index}}" value="{{text}}"/> </div>{{/each}}<small class="form-text text-muted">{{translate "widgets.SimpleQuestion.form.answers.help"}}</small> </div></form>';
        var rendered = indieauthor.renderTemplate(tempalte, templateValues);

        return {
            inputs: rendered,
            title: indieauthor.strings.widgets.SimpleQuestion.label
        };
    },
    settingsClosed: function (modelObject) {},
    settingsOpened: function (modelObject) {},
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');
        element.innerHTML = modelObject.data.question ? modelObject.data.question : indieauthor.strings.widgets.SimpleQuestion.prev;
    },
    emptyData: function () {
        var object = {
            data: {
                question: "",
                answers: []
            }
        };

        return object;
    },
    updateModelFromForm: function (modelObject, formJson) {
        modelObject.data.answers = [];
        modelObject.data.question = formJson.question;

        for (var i = 0; i < this.extensions.maxAnswers; i++) {
            var answer = formJson["answer" + i];
            if (answer && (answer.length > 0)) {
                var answerObj = {};
                answerObj.text = answer;

                if (parseInt(formJson.correctAnswer) == i)
                    answerObj.correct = true;
                else
                    answerObj.correct = false;

                modelObject.data.answers.push(answerObj)
            }
        }
    },
    validateModel: function (widgetInstance) {
        var errors = [];

        if (widgetInstance.data.question.length == 0)
            errors.push("SimpleQuestion.question.empty");

        if (this.extensions.answersWithoutCorrect(widgetInstance.data.answers))
            errors.push("SimpleQuestion.answers.noCorrect");

        if (widgetInstance.data.answers.length < 2)
            errors.push("SimpleQuestion.answers.notEnoughAnswers");

        if (errors.length > 0) {
            return {
                element: widgetInstance.id,
                keys: errors
            }
        }

        return undefined;
    },
    validateForm: function (formData) {
        var answers = [];
        var errors = [];

        for (var i = 0; i < this.extensions.maxAnswers; i++) {
            var answer = formData["answer" + i];
            if (answer && (answer.length > 0)) {
                var answerObj = {};
                answerObj.text = answer;

                if (parseInt(formData.correctAnswer) == i)
                    answerObj.correct = true;
                else
                    answerObj.correct = false;

                answers.push(answerObj)
            }
        }

        if (formData.question.length == 0)
            errors.push("SimpleQuestion.question.empty");

        if (this.extensions.answersWithoutCorrect(answers))
            errors.push("SimpleQuestion.answers.noCorrect");

        if (answers.length < 2)
            errors.push("SimpleQuestion.answers.notEnoughAnswers");

        return errors;
    },
    extensions: {
        answersWithoutCorrect: function (answers) {
            for (var i = 0; i < answers.length; i++) {
                var answer = answers[i];
                if (answer.correct)
                    return false;
            }

            return true;
        },
        maxAnswers: 4
    },
    icon: " data:image/png;base64,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"
}