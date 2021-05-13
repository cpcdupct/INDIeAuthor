indieauthor.widgets.LatexFormula = {
    widgetConfig: {
        widget: "LatexFormula",
        type: "element",
        label: "Latex formula",
        category: "simpleElements",
        toolbar: {
            edit: true
        }
    },
    createPaletteItem: function () {
        var item = {};
        item.content = indieauthor.renderTemplate('<div class="palette-item" data-category="{{category}}" data-type="{{type}}" data-widget="{{widget}}"> <img src="' + this.icon + '" class="img-fluid"/> <br/> <span>{{translate "widgets.LatexFormula.label"}}</span> </div>', this.widgetConfig);
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
        return '<div class="widget widget-latexformula" data-type="{{type}}" data-widget="{{widget}}" data-id="{{id}}"> \ <div class="b1"> <img src="' + this.icon + '" class="img-fluid drag-item" /> </div>\ <div class="b2" data-prev><span>{{translate "widgets.LatexFormula.prev"}}</span></div>\ <div class="b3" data-toolbar> </div>\ </div>';
    },
    getInputs: function (modelValues) {
        var templateValues = {
            instanceId: modelValues.id
        }

        if (modelValues) {
            templateValues.formula = modelValues.data.formula;
            templateValues.caption = modelValues.data.caption;
        }

        var inputTemplate = '<form id="f-{{instanceId}}"><div class="form-group"><label for="formula">{{translate "widgets.LatexFormula.form.caption.label"}}</label><input type="text" class="form-control" name="caption" placeholder="{{translate "widgets.LatexFormula.form.caption.placeholder"}}" value="{{caption}}" autocomplete="off" required></input><small class="form-text text-muted">{{translate "widgets.LatexFormula.form.caption.help"}}</small></div><div class="form-group"><label for="formula">{{translate "widgets.LatexFormula.form.formula.label"}}</label><textarea cols="3" data-content="formula" class="form-control formula" name="formula" placeholder="{{translate "widgets.LatexFormula.form.formula.placeholder"}}" required>{{formula}}</textarea><small class="form-text text-muted">{{translate "widgets.LatexFormula.form.formula.help"}}</small><div class="formula-preview" data-content="formula-preview"></div></div></form>';
        var rendered = indieauthor.renderTemplate(inputTemplate, templateValues);

        return {
            inputs: rendered,
            title: 'Latex Formula'
        };
    },
    settingsClosed: function (modelObject) {},
    settingsOpened: function (modelObject) {
        var formulaInput = document.querySelector('[data-content="formula"]');
        var formulaPreview = document.querySelector('[data-content="formula-preview"]');
        var timeout = null;

        if (!indieauthor.utils.isEmpty(modelObject.data))
            indieauthor.widgetFunctions.showFormula(modelObject.data.formula, formulaPreview);

        formulaInput.onkeyup = function (e) {
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                indieauthor.widgetFunctions.showFormula(formulaInput.value, formulaPreview);
            }, 500);
        };
    },
    preview: function (modelObject) {
        var domPreview = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');

        if (modelObject.data.caption && modelObject.data.formula)
            domPreview.innerHTML = indieauthor.renderTemplate('<span>{{caption}} : {{formula}} </span>', modelObject.data);
        else
            domPreview.innerHTML = indieauthor.strings.widgets.LatexFormula.prev;

    },
    emptyData: function () {
        var object = {
            data: {
                formula: "",
                caption: ""
            }
        };

        return object;
    },
    updateModelFromForm: function (modelObject, formJson) {
        modelObject.data.formula = formJson.formula;
        modelObject.data.caption = formJson.caption;
    },
    validateModel: function (widgetInstance) {
        var errors = [];

        if (widgetInstance.data.formula.length == 0) errors.push("LatexFormula.formula.invalid");
        if (widgetInstance.data.caption.length == 0) errors.push("LatexFormula.caption.invalid");

        if (errors.length > 0)
            return {
                element: widgetInstance.id,
                keys: errors
            }

        return undefined;
    },
    validateForm: function (formData) {
        var errors = [];

        if (formData.formula.length == 0) errors.push("LatexFormula.formula.invalid");
        if (formData.caption.length == 0) errors.push("LatexFormula.caption.invalid");

        return errors;
    },
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAvCAYAAAB30kORAAAACXBIWXMAAAsSAAALEgHS3X78AAAEGElEQVRoge2ZXWjTUBTHT9NuYie2g6oIEkURP0ARRAri3HzROQU3kaLOISIWP17ci6Y+KcjaN+fL1KKouIEMUR+sWBDcnIJzTMTBFJ+6+SIoaP3ogzaNnNPcLJ1pe5vGpsL+ENK0N7m/e/I/56a5DtBJ9AfWAUAr2KsEANyfHO7/mo9Cgxb9gQsAcHLRwnmAm1168WocVPC2yeH+13kxRH/grOgPKPHBl4rdSn7/oTR3nFJEf+CL6A94C0F/uXY7ZjswE4JvbD2B4CeNeAXRH2gCAO+eHY02W3lKc+fUwdbGDXi8y+h3gX3AhtUkTwEeoapIOTUDbbVm1dZ4pXC0SQpHc6qIy2w/ytgE/G7pAkim/gmwPE8G76q5ONk9AYCvUjjaGQkFb0A50HL4HgE71iwGh9dtKTAp9REAfrEjjPR1KRxNRELBAdPQmaG3AB431Dw/bxmnXs6rdwDuP57+9UEAGDDlabQGRlloWGUlJ4+WgNlEzAy9o71jU8WhSeYjjSc3rLSah0vmoFU/YxLaoZKhlcnPtAlr7QGGHGjOektRttHPoIdO7+/mOiHzLAtt2s/JFCjP3mqbmclJg8a6m3kwWvSEciMt98Th975umpxo3xMv+Ro5npal3oIj1/xcZn3GfHDFzpjOCw1aaG8goEIjLxrlZArSO7poY3cNr8m+Qzs4Q20EjG0zbybAsUY0D+2KHKAyJofvUkeG0MXqs8cNIPrIavRsgrbreUTHysSnnMGmpV66Y8LO9eahsUNnaDd9lI9FDRvzzITO49u0AWK05b6hbEftm7U2GHH8zXUpWDIwTPc0dogTBiWl2pkmzPqxiaJ+xvNZGy1HMCDqYFDpo9FsgDzmng7/mlxcl49kLzwtKTPMzxweRN+C6mc6Pt6sAWLOUELHRrPenx4cDv31aIqRwqjgxdHfTvS6ekuBs9RhG4fo06AxyZnQw8Ja3cDF0l8MGU7j7NZRVNTkY37mKXc0ceiSWR9NHAwNim2izxpoBHapEZalPs3P9IDE4UNWOaYs8cjSv2V5H5jwlmJU0ctptZrwTN1UGVT/U3VA8GTK1MxXMjTKGWmnPZsoeGoqizKrwZSEFke7IDTaoebhGfI47osloT7KrIJQqbM42kX/2CKok/PhCNvWfruV+6XHDbUfrpgGNNLMG6ZKaQa6UvpvoXFRhi3QVI3iT0egzj3bGHpyuB+hB85134RvP35WBfOd2CCMv0/AUnGh4e+sTneOv0882d5x2nt4bwusXr6kopBMGLT44AhBr1gmwnxfvWE7/Toivk7FtcQm9qLPDi3w1RNwnrXMgUgouEWbEdUV0kNGLaVwVLFrEEbirR75V04rK+Lghe6sAmB0wkXghcYlA1yrZuXRBmH/WyKhoF39lykA+APNg7K3Lx9XeQAAAABJRU5ErkJggg=="
}