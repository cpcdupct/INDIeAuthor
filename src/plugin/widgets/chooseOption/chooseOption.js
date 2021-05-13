indieauthor.widgets.ChooseOption = {
    widgetConfig: {
        widget: "ChooseOption",
        type: "element",
        label: "Choose option",
        category: "interactiveElements",
        toolbar: {
            edit: true
        }
    },
    createPaletteItem: function (params) {
        var item = {};
        item.content = indieauthor.renderTemplate('<div class="palette-item" data-category="{{category}}" data-type="{{type}}" data-widget="{{widget}}">  <img src="' + this.icon + '" class="img-fluid"/> <br/> <span> {{translate "widgets.ChooseOption.label"}}</span></div>', this.widgetConfig);
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
    template: function (options) {
        return '<div class="widget widget-choose-option" data-type="{{type}}" data-widget="{{widget}}" data-id="{{id}}"><div class="b1"> <img src="' + this.icon + '" class="img-fluid drag-item" /> </div><div class="b2" data-prev><span>{{translate "widgets.ChooseOption.prev"}} </span></div><div class="b3" data-toolbar> </div></div>';
    },
    getInputs: function (modelValues) {
        var templateValues = {
            instanceId: modelValues.id,
            text: modelValues.data.text,
            image: modelValues.data.image,
            options: modelValues.data.options,
            instanceName: modelValues.params.name,
            help: modelValues.params.help
        };

        var template = '<form id="f-{{instanceId}}"><div class="form-group"> <label for="instanceName">{{translate "common.name.label"}}</label> <input type="text" name="instanceName" class="form-control" value="{{instanceName}}" placeholder="{{translate "common.name.placeholder"}}" autocomplete="off" required/> <small class="form-text text-muted">{{translate "common.name.help"}}</small> </div><div class="form-group"> <label for="help">{{translate "common.help.label"}}</label> <div class="input-group mb-3"> <input name="help" type="text" class="form-control" placeholder="{{translate "common.help.placeholder"}}" value="{{help}}"> <div class="input-group-append"> <button class="btn btn-indie" type="button" onclick="$(\'input[name=help]\').val(\'\')">{{translate "common.help.button"}}</button> </div></div><small class="form-text text-muted">{{translate "common.help.help"}}</small> </div><div class="form-group"> <label>{{translate "widgets.ChooseOption.form.text.label"}}</label> <textarea class="form-control" name="text" placeholder="{{translate "widgets.ChooseOption.form.text.placeholder"}}" required>{{text}}</textarea> <small class="form-text text-muted">{{translate "widgets.ChooseOption.form.text.help"}}</small> </div><div class="form-group"><label for="image">{{translate "widgets.ChooseOption.form.image.label"}}</label><input type="url" class="form-control" name="image" required autocomplete="off" placeholder="{{translate "widgets.ChooseOption.form.image.placeholder"}}" value="{{image}}"/><small class="form-text text-muted">{{translate "widgets.ChooseOption.form.image.help"}}</small></div>{{#if image}}<div class="form-group"> <p>{{translate "widgets.ChooseOption.form.preview"}}</p><img class="img-fluid" src="{{image}}"/> </div>{{/if}}<div class="form-group"> <label>{{translate "widgets.ChooseOption.form.options.label"}}</label>{{#each options}}<div class="input-group input-answer"> <div class="input-group-prepend"> <div class="input-group-text"> <input type="radio" name="correct"{{#if correct}}checked="true"{{/if}}value="{{@index}}"> </div></div><input class="form-control" type="text" name="option{{@index}}" autocomplete="off" placeholder="{{translate "widgets.ChooseOption.form.options.placeholder"}}" value="{{text}}" autocomplete="off"/> </div>{{/each}}<small class="form-text text-muted">{{translate "widgets.ChooseOption.form.options.help"}}</small> </div></form>';
        var rendered = indieauthor.renderTemplate(template, templateValues);

        return {
            inputs: rendered,
            title: indieauthor.strings.widgets.ChooseOption.label
        };
    },
    settingsClosed: function (modelObject) {},
    settingsOpened: function (modelObject) {},
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');
        if (modelObject.params.name && modelObject.data.text)
            element.innerHTML = modelObject.params.name + " | " + modelObject.data.text;
        else
            element.innerHTML = indieauthor.strings.widgets.ChooseOption.prev;
    },
    emptyData: function (options) {
        var object = {
            params: {
                name: "",
                help: ""
            },
            data: {
                text: "",
                image: "",
                options: [{
                        text: "",
                        correct: false
                    },
                    {
                        text: "",
                        correct: false
                    },
                    {
                        text: "",
                        correct: false
                    },
                    {
                        text: "",
                        correct: false
                    }
                ]
            }
        };

        return object;
    },
    updateModelFromForm: function (modelObject, formData) {
        var options = [];
        for (var i = 0; i < this.extensions.optionsNumber; i++) {
            var option = formData["option" + i];
            if (option && (option.length > 0)) {
                var optionObj = {};
                optionObj.text = option;

                if (parseInt(formData.correct) == i)
                    optionObj.correct = true;
                else
                    optionObj.correct = false;

                options.push(optionObj)
            }
        }

        modelObject.data.options = options;
        modelObject.data.image = formData.image;
        modelObject.data.text = formData.text;
        modelObject.params.name = formData.instanceName;
        modelObject.params.help = formData.help;
    },
    validateModel: function (widgetInstance) {
        var errors = [];

        if (widgetInstance.data.text.length == 0)
            errors.push("ChooseOption.text.invalid");

        if (!indieauthor.utils.isIndieResource(widgetInstance.data.image))
            errors.push("ChooseOption.image.invalid");

        if (this.extensions.optionsWithoutCorrect(widgetInstance.data.options))
            errors.push("ChooseOption.options.noCorrect");

        if (widgetInstance.data.options.length != this.extensions.optionsNumber)
            errors.push("ChooseOption.options.notEnougOptions");

        if (!indieauthor.utils.hasNameInParams(widgetInstance))
            errors.push("common.name.invalid");
        else if (!indieauthor.model.isUniqueName(widgetInstance.params.name, widgetInstance.id))
            errors.push("common.name.notUniqueName");

        if (errors.length > 0) {
            return {
                element: widgetInstance.id,
                keys: errors
            }
        }

        return undefined;

    },
    validateForm: function (formData, instanceId) {
        var errors = [];
        var options = [];

        for (var i = 0; i < this.extensions.optionsNumber; i++) {
            var option = formData["option" + i];
            if (option && (option.length > 0)) {
                var optionObj = {};
                optionObj.text = option;

                if (parseInt(formData.correct) == i)
                    optionObj.correct = true;
                else
                    optionObj.correct = false;

                options.push(optionObj)
            }
        }

        if (formData.text.length == 0)
            errors.push("ChooseOption.text.invalid");

        if (!indieauthor.utils.isIndieResource(formData.image))
            errors.push("ChooseOption.image.invalid");

        if (this.extensions.optionsWithoutCorrect(options))
            errors.push("ChooseOption.options.noCorrect");

        if (options.length != this.extensions.optionsNumber)
            errors.push("ChooseOption.options.notEnougOptions");

        if (formData.instanceName.length == 0)
            errors.push("common.name.invalid");
        else if (!indieauthor.model.isUniqueName(formData.instanceName, instanceId))
            errors.push("common.name.notUniqueName");

        return errors;
    },
    extensions: {
        optionsNumber: 4,
        optionsWithoutCorrect: function (options) {
            for (var i = 0; i < options.length; i++) {
                var option = options[i];
                if (option.correct)
                    return false;
            }

            return true;
        },
    },
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAvCAYAAAB30kORAAAACXBIWXMAAAsSAAALEgHS3X78AAADPUlEQVRoBe2ZT0gUURzHvy5atOq6ghZCTVJUJARRyERF6kVyDTKQ0YtFBgvZZZcidwkz67BbINalYKM/dgizDl0s7OJulzJDAmsOdlmXoIOB/710mPgNO2YwM/ue7uzYsh9YnMU3bz4783u/35v38rAKQZQOAmiCvcQBvE6MDs4aWaxIC6LUB8C3vaIc9LGLj+MykuJnEqODXww1BFG6IYiSMhz7pNjN3MKicrLtqiKI0owgSm4z6ZlHA0O2C2uQ+NGmSyTu0/N1CKJUC8Dd3Fhjcyj/xVVUiPqaavp+Wu//Du2AGm4kSkx8HBvKlJGcdLrZvKnAHQhFagOhyD9ZJN/sOvL3OHr6+rXcmXaoHtCA6/ad0+3a7SqiYjcCYDYQivjDQe9TU+n5xSW0dNxUj9tbPaYDY618GP+GxwNvsKOiHO0tHrNe6E4/CYQi8XDQGzWUlienML+whId3rqD+RLUld9qHZjSc7cRwbCyVtAY9kmjKmLY6FbqKnDzNK5HLHhkkJ50pUkpT6rOS+cVl7t4NU96RQ1VwFRfi8q0HaG6ULcvT8mQc3X794mKEaUV8cf+6Kk0FwAqoIlLhYszRK5hKV+2pxNtnty0RXg//5UA0vdOYW4YyMcXWU4kTeQd2qoc0eGkawIKr2Kk+0bRJ/z52DUriF3NnBV/7kCeUqTPDV0Mx5vN6uzrA87pnGh48wiqJafXPj5/TXKfxts++mM5/7oMykWDriWL6+H71kPLuu9hnZon21gbmtkgl7Th1GKAPJzSweAcXD9kXHj13+9UyywKV/N6ui+pLA2WOl0NRZgkKJ54nYyrNW77lFo86ZyFhnpdhin8e6eybmlbtZf/1FB7aEjHPeUjOKHkwDY+1TpZoHcNoLSMd5F63MkVOOlM4kpsyli0yrpXh92ModG7RPduRGB0k6ShVP6vfvFmhikqVeJdQoXuGlvL88mR8pKGt032h1WPpZMcMumm0GEnS+3YL2FpWqtt69T4iLafSXmKtttBnB9vKSlVhg73MaDjorVspLskd0vN6LQOhiGLXj9CDNXsY75xmFtWDVdq/AYQpEu6BVZq2DGivWkuPNkDXrwsHvXZdf50A+AOSff+MuTdefAAAAABJRU5ErkJggg=="
}