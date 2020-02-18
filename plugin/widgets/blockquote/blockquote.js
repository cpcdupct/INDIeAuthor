indieauthor.widgets.Blockquote = {
    widgetConfig: {
        widget: "Blockquote",
        type: "element",
        label: "Blockquote",
        category: "simpleElements",
        toolbar: {
            edit: true
        }
    },
    createPaletteItem: function () {
        var itemTemplate = '<div class="palette-item" data-category="{{category}}" data-type="{{type}}" data-widget="{{widget}}"> <img src="' + this.icon + '" class="img-fluid"/>  <br/> <span> {{translate label}}</span></div>';
        var item = {};
        item.content = indieauthor.renderTemplate(itemTemplate, {
            category: this.widgetConfig.category,
            type: this.widgetConfig.type,
            widget: this.widgetConfig.widget,
            label: "widgets.Blockquote.label"
        });

        item.numItems = 1;
        return item;
    },
    createElement: function (widgetInfo) {
        var element = indieauthor.renderTemplate(this.template(), {
            type: this.widgetConfig.type,
            widget: this.widgetConfig.widget,
            id: widgetInfo.id,
            prev: "widgets.Blockquote.prev"
        });
        return element;
    },
    template: function () {
        return '<div class="widget widget-blockquote" data-type="{{type}}" data-widget="{{widget}}" data-id="{{id}}"> <div class="b1"><img src="' + this.icon + '" class="img-fluid drag-item"/></div><div class="b2" data-prev><span>{{translate prev}}</span></div><div class="b3" data-toolbar> </div></div';
    },
    getInputs: function (modelValues) {
        var inputTemplate = '<form id="f-{{instanceId}}"><div class="form-group"><label for="quote">{{translate "widgets.Blockquote.form.quote.label"}}</label><textarea rows="3" class="form-control" name="quote" placeholder="{{translate "widgets.Blockquote.form.quote.placeholder"}}" required>{{quote}}</textarea><small class="form-text text-muted">{{translate "widgets.Blockquote.form.quote.help"}}</small></div><div class="form-group"><label for="caption">{{translate "widgets.Blockquote.form.caption.label"}}</label><input type="text" class="form-control" name="caption" value="{{caption}}" placeholder="{{translate "widgets.Blockquote.form.caption.placeholder"}}" autocomplete="off"></input><small class="form-text text-muted">{{translate "widgets.Blockquote.form.quote.help"}}</small></div><div class="form-group"><label for="source">{{translate "widgets.Blockquote.form.source.label"}}</label><input type="text" class="form-control" name="source" value="{{source}}" placeholder="{{translate "widgets.Blockquote.form.source.placeholder"}}" autocomplete="off"></input><small class="form-text text-muted">{{translate "widgets.Blockquote.form.source.help"}}</small></div><div class="form-group"><label for="alignment">{{translate "widgets.Blockquote.form.alignment.label"}}</label><select class="form-control" name="alignment"><option value="left" {{#ifeq alignment "left"}}selected{{/ifeq}}>{{translate "widgets.Blockquote.form.alignment.values.left"}}</option><option value="right" {{#ifeq alignment "right"}}selected{{/ifeq}}>{{translate "widgets.Blockquote.form.alignment.values.right"}}</option></select><small class="form-text text-muted">{{translate "widgets.Blockquote.form.alignment.help"}}</small></div></form>';

        var rendered = indieauthor.renderTemplate(inputTemplate, {
            instanceId: modelValues.id,
            caption: modelValues.data.caption,
            quote: modelValues.data.quote,
            alignment: modelValues.data.alignment,
            source: modelValues.data.source
        });

        return {
            inputs: rendered,
            title: indieauthor.strings.widgets.Blockquote.label
        };

    },
    settingsClosed: function (modelObject) {},
    settingsOpened: function (modelObject) {

    },
    preview: function (modelObject) {
        var element = document.querySelector('[data-id="' + modelObject.id + '"]').querySelector('[data-prev]');
        element.innerHTML = modelObject.data.quote ? modelObject.data.quote : indieauthor.strings.widgets.Blockquote.prev;
    },
    emptyData: function () {
        var object = {
            data: {
                quote: "",
                caption: "",
                alignment: "",
                source: ""
            }
        };

        return object;
    },
    updateModelFromForm: function (modelObject, formJson) {
        modelObject.data.quote = formJson.quote;
        modelObject.data.caption = formJson.caption;
        modelObject.data.alignment = formJson.alignment;
        modelObject.data.source = formJson.source;
    },
    validateModel: function (widgetInstance) {
        if (widgetInstance.data.quote.length == 0)
            return {
                element: widgetInstance.id,
                keys: ["Blockquote.quote.invalid"]
            };

        return undefined;
    },
    validateForm: function (formData) {
        if (formData.quote.length == 0)
            return ["Blockquote.quote.invalid"];

        return [];
    },
    icon: " data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAwCAYAAABuZUjcAAAACXBIWXMAAAsSAAALEgHS3X78AAADIUlEQVRoBe2ZX0hTURzHv/snoTYTLB+qmwRFGZYVsiD/TAgV6cEeWpGNJGLVXtKXcFAvQW0vMXrxYfTHFwktwqAkn1RWkEEgFBr2so2gB3tw/tmD5m78bt65/57dde5m7AOXnXvO714+99yzcznnh62KJtpbMFm6AdwCUJXj5xkG0BOYHPKlCoiICybLMwBdVy+2o7WxTjXDeH78nMOTwRFMz/rmATQHJoemUgYLJotZMFnE0YlPYj4QXFwS26y3RcFkGUvlrF3/vdLSVIeWHPZ0NMbSEjy8e5NqqEOTDltZvOrIgVwP61iqN3zSim85mMXF9zMQv/iTtq31jar+3GziwRB+3/BA9P9KaCLp8ICXg1p69CxBawNeaPbthPbsycQ25ysYnndzE2w0HXPv6ThD8/kjl8M2Ltcz9TjJhb0zWDFasbL3+kY9DZFgCKvtD6Q2HkOmyKCvBdABYKzX6enKSJzkNi3Hx/HBnZl4/rCj1+kxM4trhIpNy/FxvGH6cxq+upPWazsbUNTZkJPX8f9/gPKNgrjabFlxplmFViV08OLUiWo+4i/fTsD9+AU3cf/HwYyvYRKnHum5dl6JEzeYxZW8Tp4UZhW1KYirDTfx1dN3/q6YjFapLBN+8zlSTwedK4GbePSOQGw5EBcXe85KYagkUFa8UZOqHN+WAUwfICUYPtwHAnPSfoy2szFyB529FdqjAsLeb1jrewedwhUUtx6X159iMCTJxrTVH5Z2xnT2NsU9zn2M612Xk8ppaoSEB8rovll6pYV6VlOfPEJHD5QFhVlFbSLiwaXlvBLbbMUli7+mVc5CHsmTT5FBj10V5UnbZfH+hcXl+Qv2e1zXlqw8HRyRloo1h/anvCQ6XUjbuZQyrK0+WAVjqbL5NVumv/uxsLgsSacQb6Z98sh0uJ5PPE6pw+lZnzk6Uthd2VS2vcScpRMTlLSqrChHSfG2tHEJ83hgcoh2/cej6y45PZRyUEWcAUrcMk+Hw/IFOcbnctimmMVdDhvlYHpyLE0dd04+0aSPjaXX6aFkaVcm1/wjSLrf5bDlw1vPAgB/AO1fcZ9mjVkZAAAAAElFTkSuQmCC"
}