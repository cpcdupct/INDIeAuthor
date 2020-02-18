indieauthor.widgets.GapQuestion = {
    widgetConfig: {
        widget: "GapQuestion",
        type: "specific-element",
        label: "Gap Question",
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
        return '<div class="widget widget-question" data-type="{{type}}" data-widget="{{widget}}" data-id="{{id}}"><div class="b1"><img src="' + this.icon + '" class="img-fluid drag-item" /></div><div class="b2" data-prev><span>{{translate "widgets.GapQuestion.prev"}}</span></div><div class="b3" data-toolbar> </div></div>';
    },
    getInputs: function (modelValues) {
        var templateValues = {
            instanceId: modelValues.id,
            answers: [],
            question: modelValues.data.question,
            preview: modelValues.data.question.replace('[blank]', '____')
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

        var tempalte = '<form id="f-{{instanceId}}"> <div class="form-group"> <label>{{translate "widgets.GapQuestion.form.questionText.label"}}</label> <textarea class="form-control" name="question" placeholder="{{translate "widgets.GapQuestion.form.questionText.placeholder"}}" required>{{question}}</textarea> <small class="form-text text-muted">{{translate "widgets.GapQuestion.form.questionText.help"}}</small> </div><div class="form-group"> <label>{{translate "widgets.GapQuestion.form.questionPreview.label"}}</label> <textarea class="form-control" placeholder="{{translate "widgets.GapQuestion.form.questionPreview.placeholder"}}" name="questionPreview" readonly>{{preview}}</textarea> <small class="form-text text-muted">{{translate "widgets.GapQuestion.form.questionPreview.help"}}</small> </div><div class="form-group"> <label>{{translate "widgets.GapQuestion.form.answers.label"}}</label>{{#each answers}}<div class="input-group input-answer"> <div class="input-group-prepend"> <div class="input-group-text"> <input type="radio" name="correctAnswer"{{#if correct}}checked="true"{{/if}} value="{{@index}}"> </div></div><input class="form-control" type="text" autocomplete="off" name="answer{{@index}}" value="{{text}}"/> </div>{{/each}}<small class="form-text text-muted">{{translate "widgets.GapQuestion.form.answers.help"}}</small> </div></form>';
        var rendered = indieauthor.renderTemplate(tempalte, templateValues);

        return {
            inputs: rendered,
            title: indieauthor.strings.widgets.GapQuestion.label
        };
    },
    settingsClosed: function (modelObject) {
        $("#f-" + modelObject.id + " [name=question]").off('keyup');

    },
    settingsOpened: function (modelObject) {
        $("#f-" + modelObject.id + " [name=question]").on('keyup', function () {
            var questionText = $("#f-" + modelObject.id + " [name=question]").val();
            $("#f-" + modelObject.id + " [name=questionPreview]").val(questionText.replace('[blank]', '____'));
        });
    },
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');
        element.innerHTML = modelObject.data.question ? modelObject.data.question : indieauthor.strings.widgets.GapQuestion.prev;
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
            errors.push("GapQuestion.question.empty");

        if (!this.extensions.validateQuestionBlankSpots(widgetInstance.data.question))
            errors.push("GapQuestion.question.onlyOneBlank");

        if (this.extensions.answersWithoutCorrect(widgetInstance.data.answers))
            errors.push("GapQuestion.answers.noCorrect");

        if (widgetInstance.data.answers.length < 2)
            errors.push("GapQuestion.answers.notEnoughAnswers");

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
            errors.push("GapQuestion.question.empty");

        if (!this.extensions.validateQuestionBlankSpots(formData.question))
            errors.push("GapQuestion.question.onlyOneBlank");

        if (this.extensions.answersWithoutCorrect(answers))
            errors.push("GapQuestion.answers.noCorrect");

        if (answers.length < 2)
            errors.push("GapQuestion.answers.notEnoughAnswers");

        return errors;
    },
    extensions: {
        validateQuestionBlankSpots: function (questionText) {
            if (!questionText || (questionText.length == 0))
                return false;

            var count = (questionText.match(/\[blank\]/g) || []).length;
            return (count == 1);
        },
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
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAvCAYAAAB30kORAAAACXBIWXMAAAsSAAALEgHS3X78AAACYUlEQVRoBe2ZT2gTQRSHfwmxYlqaLUSloGNRRBQEL7IgQtOL+OdgBVlEKCpCRLykl7rxpKfk1npRWBARFCV48JJDTk3sxVgQoRKhF+OehRqtPUjbkVkzaaKzZaXtzEbmg4XMy7DzzcvsbHZfBG0Q0zoGYBRqqQN45VYLX/0sWtLEtCYBZPYM7gQ7VPHmXQ1N8QtutfDeV4OY1l1iWrRUeUtV0/i+SE+PTVBiWgvEtIz1pBcevSgqF+Yw8ROjt5h4RuQbJaaVAmBcPDeseCmv0d/Xi1PDx1n7vOj7KP/AOoaJxDo+0VCZBkRLbzbbe7YZds5J2TmnYxcJtbTR38dudtMAPtk55yqPd8vyYJl+zLKOLlzTV9CF0kPQu4dEtLQs/jPpxhKWbzr4ufeGd6zYT71YGIj5OSxfnsLqzMdWe+VBCbSxhNjDtHJtoTR1v3QIc1afzQB/SLNfgM65Gxcp3gneVxht/Ah8AiYsmuBWIpSOHN2HCEl6Ge+Ik+Tfs/6HDG0Wvhdi7HkGSMTXAon471gI8L0QWbZ7PkyCzn1utTsmoRBfaZ7dyMnDoRBtR98RZaGlZaGlZaGlZaGlZaGlZRFtFmV4gSY0lF7Poje+Q5xpt1pg0uV7U0/wbTH4E8tW8rJYQW2+jv1kUDgK/2s6XpuvT58Zu21cv3QWRw4OKZFlSStVZj3pQwcIdiUHhP3a64jsdSqrJab4iz4V7E4OeMI+tcxyPpseaT0ENCuk10Q97ZxDVU1CRNDdw79yKhfPI6j0eAiE2Uq4j6DS+Wy6zGrVfHtUABt/JJ9Nqxp/gwD4BRpSrRtKNuT5AAAAAElFTkSuQmCC"
}