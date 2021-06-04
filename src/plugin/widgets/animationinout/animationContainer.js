indieauthor.widgets.AnimationContainer = {
    widgetConfig: {
        widget: "AnimationContainer",
        type: "specific-element-container",
        label: "Animation",
        allow: ["AnimationItem"],
        category: "interactiveElements",
        toolbar: {
            edit: true
        }
    },
    createPaletteItem: function (params) {
        var item = {};
        item.content = indieauthor.renderTemplate('<div class="palette-item" data-category="{{category}}" data-type="{{type}}" data-widget="{{widget}}"> <img src="' + this.icon + '" class="img-fluid"/> <br/> <span> {{translate "widgets.AnimationContainer.label"}} </span></div>', this.widgetConfig);
        item.numItems = 1;
        return item;
    },
    createElement: function (widgetInfo) {
        return indieauthor.renderTemplate(this.template(), {
            type: this.widgetConfig.type,
            widget: this.widgetConfig.widget,
            id: widgetInfo.id
        });
    },
    template: function (options) {
        return '<div class="widget-animation-container" data-widget="{{widget}}" data-type="{{type}}" data-id="{{id}}"><div class="widget"><div class="b1"><img src="' + this.icon + '" class="img-fluid drag-item" /> </div><div class="b2" data-prev><span>{{translate "widgets.AnimationContainer.label"}}</span></div><div class="b3" data-toolbar>  </div></div><div data-widget="{{widget}}" data-type="{{type}}" class="element-container dragula-container" data-content></div></div>';
    },
    getInputs: function (modelObject) {
        var template = '<form id="f-{{id}}"> <div class="form-group"> <label for="instanceName">{{translate "common.name.label"}}</label> <input type="text" name="instanceName" class="form-control" value="{{instanceName}}" placeholder="{{translate "common.name.placeholder"}}" autocomplete="off" required/> <small class="form-text text-muted">{{translate "common.name.help"}}</small></div><div class="form-group"> <label for="help">{{translate "common.help.label"}}</label> <div class="input-group mb-3"> <input name="help" type="text" class="form-control" placeholder="{{translate "common.help.placeholder"}}" value="{{help}}"> <div class="input-group-append"> <button class="btn btn-indie" type="button" onclick="$(\'input[name=help]\').val(\'\')">{{translate "common.help.button"}}</button> </div></div><small class="form-text text-muted">{{translate "common.help.help"}}</small> </div><div class="form-group"><label for="width">{{translate "widgets.AnimationContainer.form.width.label"}}</label><input type="number" name="width" class="form-control" value="{{width}}" placeholder="{{translate "widgets.AnimationContainer.form.width.placeholder"}}" required></input><small class="form-text text-muted">{{translate "widgets.AnimationContainer.form.width.help"}}.</small></div><div class="form-group"><label for="height">{{translate "widgets.AnimationContainer.form.height.label"}}</label><input type="number" name="height" class="form-control" value="{{height}}" placeholder="{{translate "widgets.AnimationContainer.form.height.placeholder"}}" required></input><small class="form-text text-muted">{{translate "widgets.AnimationContainer.form.height.help"}}.</small></div><div class="form-group"><label for="image">{{translate "widgets.AnimationContainer.form.image.label"}}</label><input type="url" class="form-control" name="image" required placeholder="{{translate "widgets.AnimationContainer.form.image.placeholder"}}" value="{{image}}" autocomplete="off"/><small class="form-text text-muted">{{translate "widgets.AnimationContainer.form.image.help"}}</small></div>{{#if image}}<div class="form-group"> <p>{{translate "widgets.AnimationContainer.form.prev"}}</p><img class="img-fluid" src="{{image}}"/> </div>{{/if}}</form>';

        var rendered = indieauthor.renderTemplate(template, {
            width: modelObject.params.width,
            height: modelObject.params.height,
            image: modelObject.params.image,
            id: modelObject.id,
            instanceName: modelObject.params.name,
            help: modelObject.params.help
        });

        return {
            inputs: rendered,
            title: indieauthor.strings.widgets.AnimationContainer.label
        };
    },
    settingsClosed: function (modelObject) {},
    settingsOpened: function (modelObject) {},
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');
        element.querySelector("span").innerHTML = modelObject.params.name ? modelObject.params.name : indieauthor.strings.widgets.AnimationContainer.label;
    },
    emptyData: function (options) {
        var object = {
            params: {
                name: this.widgetConfig.label + "-" + indieauthor.utils.generate_uuid(),
                width: 0,
                height: 0,
                image: "",
                help: ""
            },
            data: []
        };

        return object;
    },
    updateModelFromForm: function (modelObject, formJson) {
        modelObject.params.width = parseInt(formJson.width);
        modelObject.params.height = parseInt(formJson.height);
        modelObject.params.image = formJson.image;
        modelObject.params.name = formJson.instanceName;
        modelObject.params.help = formJson.help;
    },
    validateModel: function (widgetInstance) {
        var errors = [];

        if (!widgetInstance.params.width > 0) errors.push("AnimationContainer.width.invalid");
        if (!widgetInstance.params.height > 0) errors.push("AnimationContainer.height.invalid");
        if (!indieauthor.utils.isIndieResource(widgetInstance.params.image)) errors.push("AnimationContainer.image.invalid");
        if (widgetInstance.data.length == 0) errors.push("AnimationContainer.data.empty");

        if (!indieauthor.utils.hasNameInParams(widgetInstance))
            errors.push("common.name.invalid");
        else if (!indieauthor.model.isUniqueName(widgetInstance.params.name, widgetInstance.id))
            errors.push("common.name.notUniqueName");

        if (errors.length > 0)
            return {
                element: widgetInstance.id,
                keys: errors
            }

        return undefined;
    },
    validateForm: function (formData, instanceId) {
        var errors = [];

        if (formData.width <= 0) errors.push("AnimationContainer.width.invalid");
        if (formData.height <= 0) errors.push("AnimationContainer.height.invalid");
        if (!indieauthor.utils.isIndieResource(formData.image)) errors.push("AnimationContainer.image.invalid");

        if (formData.instanceName.length == 0)
            errors.push("common.name.invalid");
        else if (!indieauthor.model.isUniqueName(formData.instanceName, instanceId))
            errors.push("common.name.notUniqueName");

        return errors;
    },
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAvCAYAAAB30kORAAAACXBIWXMAAAsSAAALEgHS3X78AAAC3klEQVRoge2ZT2jTUBzHvw1z4rp1HXTKQNKhTFlhIIpk+Id1F/+DG8zMy5jiKEwv7UVbEWZP7a3z4qFMZAjiuh289LDTNr1sDkQYVJgHuyB4mLC/7iIa+YWmVvNS01qTdvQDgeS9l5dPwnu/l/eeDTnwgngMQA+sJQ3gpbSQWNezyErzghgD4D/Y0gw6rGL+bQoZ8V5pIfFOV4MXxIe8IMrTc29kq9nY2pYvDNyVeUFc4wXRmU967cmLpOXCKiR+qucOiftZvhwviF4Azr7LXRY35V846u0413WSrq+y8jn1hAqWE415fLiyMjVIVbrU7K3d4wxG4t5gJP5bFClraaejnga7GQAfg5H4DTW9UpoHfemn9NVRgW16EBUo3YpKjR41fybISyv4dvqBtuBzP7grJ5Tz1Ic0wrHxvBV7jrRixD+YvZ5KzmEyOZv3nonHI8VJY2OHWVBekoCM9ObWjvo3ZphPn1cLvse4tAE6j3uwMj+RLUgy/bfDCAxdg3+oj1kBpefmGblHj93RpsE3gzvbrkm2dfAmKf0djbSNd6Emeb9sBFkU1ab1iI1NKsf/piTSjoY6pXOyoA7naLDD0+Zm5hczHy2JtKetVTfGujv7FWGjMdgIu2RElL7g+3BcU5AbPp8dEa1G2zykVfx4/V6TbDvTnh0RrWaXDC5FMjo2pRvuKIJQh8yFOqZexClcurGOXVIvPQOFrkIkKEwWi3ZE7HCjdvNZwdXRYo9ZCz7VJQSzqEqbRVXaLKrSZsFlNmVKNr0vFdOvFmGv28esjZMWEiQ9Gx4dx+b217IQpoWd1HIah/gWZr46jAdSy+mZiwP3nLeuX1JmIlZAH216blGRPnqYx35XE9Midx+RllNpL9GrLvRZwQFXkyKsM3ecjYZ83dkfpswO6U1WyWAkLlv1EiyMRg/9nVNzUTyMSgfKQJhawiMYlY6GfLRG26uGRwug53dHQz6rnv+PAPgJZGTQLIzxpiAAAAAASUVORK5CYII="
}