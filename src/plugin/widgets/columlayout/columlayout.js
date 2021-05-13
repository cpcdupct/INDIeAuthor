indieauthor.widgets.ColumnLayout = {
    widgetConfig: {
        widget: "ColumnLayout",
        type: "layout",
        allow: ["element", "specific-element-container"],
        columns: [2, 3, 4],
        category: "layouts",
        toolbar: {
            edit: false
        }
    },
    createPaletteItem: function () {
        var item = {};
        var items = '';
        for (var i = 0; i < this.widgetConfig.columns.length; i++) {
            var columns = this.widgetConfig.columns[i];
            items += indieauthor.renderTemplate('<div class="palette-item" data-category="{{category}}" data-type="{{type}}" data-widget="{{widget}}" data-columns="{{columns}}"> <img src="' + this.icon["c" + columns] + '" class="img-fluid"></i> <br/> <span>{{columns}} {{translate "widgets.ColumnLayout.columnsLabel"}} </span></div>', {
                widget: this.widgetConfig.widget,
                type: this.widgetConfig.type,
                columns: columns,
                category: this.widgetConfig.category
            });
        }

        item.content = items
        item.numItems = this.widgetConfig.columns.length;

        return item;
    },
    createElement: function (widgetInfo) {
        var content = indieauthor.renderTemplate(this.template(widgetInfo), {
            type: this.widgetConfig.type,
            widget: this.widgetConfig.widget,
            id: widgetInfo.id
        });

        return content;
    },
    template: function (widgetInfo) {
        var container = "";
        for (var i = 0; i < widgetInfo.columns; i++) {
            container += '<div class="col-' + (12 / widgetInfo.columns) + '"><div data-role="container" data-widget="' + this.widgetConfig.widget + '" data-type="' + this.widgetConfig.type + '" data-index="' + i + '" class="element-container dragula-container"></div></div>';
        }
        var colTemplate = '<div class="widget-base widget-column-layout" data-type="{{type}}" data-widget="{{widget}}" data-id="{{id}}"><div class="widget"><div class="b1"><img src="' + this.icon["c" + widgetInfo.columns] + '" class="img-fluid drag-item"></div><div class="b2" data-prev><span>{{translate "widgets.ColumnLayout.label"}}</span></div><div class="b3" data-toolbar></div></div><div class="row">' + container + '</div></div>';
        return colTemplate;
    },
    getInputs: function (modelObject) {},
    settingsClosed: function (modelObject) {},
    settingsOpened: function (modelObject) {},
    preview: function (modelObject) {},
    emptyData: function (widget) {
        var object = {
            params: {
                columns: widget.columns
            },
            data: []
        };

        for (var i = 0; i < object.params.columns; i++)
            object.data.push([]);

        return object;
    },
    updateModelFromForm: function (formJson) {},
    validateModel: function (widgetInstance) {
        for (var i = 0; i < widgetInstance.data.length; i++) {
            if (widgetInstance.data[i].length == 0)
                return {
                    element: widgetInstance.id,
                    keys: ["ColumnLayout.data.empty"]
                };
        }

        return undefined;
    },
    validateForm: function (formData) {
        return [];
    },
    icon: {
        c2: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAvCAYAAAB30kORAAAACXBIWXMAAAsSAAALEgHS3X78AAACMElEQVRoBe2ZQUgUURjH/06mlGIjbIkgDykk6tRFBgJxvUTWIQUZhJAMYS9d9GK7nuw0eyuvCxERRSxRXfawJ3fbi6sQnVbw0rLnwDQ7uhPf4KjBzJvRHd6bhfeDBzM73/fmN4/HN8t8HTgFM8w7AKYglzqAr41q/refxbE0M8yXABaHBq+Chiw2vtdwJD7dqOZ/+Goww1xlhmkXy5u2bPb+HNj355ZtZpi7zDB1nvTu648F6cIuJH536hmJL3r5aswwkwD0mYfjkrfyCX29Pbg3Pkrnj7yua+4BBcaJKxwfLVamIVHSUdPddVFPW7lk2sr9V0ViLa339dLLbh3Az7SVm3d/b5ftQSv9hladTjqDopvvK2h+qHBjOgsrkef68ARAKVDabvxCs7J9lokjyfVhGGFW+kJm2hnnoZVcHqrkiUJJi6ItpQOrx6H1BYfWZ25M1/67yHN5BEp3sAS0sVtnnrjVXB6B0trjMWech1ZyuU6RzygAJS0KJS0KVaejzOWh6rQolLQolLQolLQo2laamjJugyY2FL9toefyJW/pRjVP0qUXr95i/+BvLJw/Fcqo7dRxnQ16Xndf40u1nfr65NxzfWH2AW6PDAuVdKFFK5a3HOmbNxiuJfo94073EelzKvUSk+6HPhkMJPodYZ9eZimbSU0c/2E66pA+9YpMWzlb1kN4EbZ6+HdOxeJ4hJVeioEw7YQ1hJXOZlIl6lW75VECdP+JbCYl6/4tAuAfoamvJZHAyOIAAAAASUVORK5CYII=",
        c3: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAvCAYAAAB30kORAAAACXBIWXMAAAsSAAALEgHS3X78AAACl0lEQVRoge2Zz2vTYBjHv03nxG60HbTKQF6HIjqh4EUCYll3Ed0ObiJB1KIi7OJlu2jrSS+2N/VaEBERpHjw0kNPa9WDdSCC0MEu1v4Dc3N68Ffkicnc5HlnkkmSQT5QaNpv3/eTt8mTkCeCNQhVOwxgAv7SAfCs26p+lFmsSgtVuwNgevdgGvTyi1dv2jDFJ7ut6luphlC1m0LV9Hrzte43S59W9BP5a7pQtUWhasmNpBfvP6n5LmxB4kcnrpL4NOerCFXLAUieGR/x+VD+Q7y/D8dHjtD2Ke57xXpDwSCR2MBHCZSpTULp/8323m3JQqmSK5Qq66pIoKWT8X662M0CeF8oVS5Zn2+Vw4NW+gGtOm30cAn93Qf8KDxmf62cy0I5n3WVJb6P32azkYxAtHzhX/IXATRYaSx9wc8X8/zgx4bdZwFp1uZfPgTZStNkvcuPbI3iJEs4ycoIS55XhNJesSWl+Tr9ch7fxvh6Gi2eRrQ46SpLfI3n2aySHUZP7YZ7aSRixiAcEZFynzXl2GxG2BKWSkcye2zvtZOsMaGDrIzwRPSKUNorpHd5dMvJItLrq4KTrFlOWRIx46S2g/R+2naddpAlZNnN12mRNibkBz/oPmvuCAdX0x1J0wB/r5AMJ9nf0vazMsLq4RWhtFeE0l4RSnuFYjZlrAZNYKg/n0NfbAe/0t1WlaQbt+4+xPLK50A4P6010V7oYK8YZL+3LuMz7YXO7Mn89eSVs2M4tH/IU0kLWrR6c86QPrBPYGdqgM2t7SPS41TqJeasB31+sCs1YAhLepmNcnFqdPWGyeyQXuaShVJF92snOOxWD3nn1FsMD7vSMwEQpiPhHuxKl4tTDepVW+XRB2j+0XJxyq/5NwmAX7rmz3PWi3K4AAAAAElFTkSuQmCC",
        c4: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAvCAYAAAB30kORAAAACXBIWXMAAAsSAAALEgHS3X78AAADB0lEQVRoBe2ZQWjTUBjHv7bbxG60HVRlIHEoohMKXiQglnUX0e3gBhKEWlSEXrxsF2096cX2pl4LIqIdUkS9VOhprfVgHYgw6GQXa64Kc3PuoLaRL/R176XJW1YliZAfFPL6T9Lfe0m+PPo8QCGI0nEAmAZ7aQDAS7lW+GZk0ZEWROkuAMzuH9kD+LGLt+/r0BafkWuFD4YagijdEkRJKVXeKXaz9n1DOZO4rgiitCqIUognvfrgadF2YQKKn5y+huKzer5eQZRiABA6PzVu8628RWBoEE6Pn8D2Ob3cSzZwRycR5Ph4HWVqElf6X7NroD+UyuRiqUyOqSKOlg4FhvBltwAAn1KZ3GXy/f9ye+BIP8RRx0Yfb8/fU3eYti8bB0/kgLqtLH2GZirP5H3Fm53tVr4Krflqp+2JCODLXuy0m6knoCzJhrkBlwCgzJVuVZdZ6bXNrcbaZldOo8hfmVx7SVGYlxswCtuN9MD6Y8PMc2qMm/vSM+rHCPqq7BS35FmFK20V3AexmXnB9jAeBY8QVrfV6pCvMjn94ClvlqFV/dhp43F4PAGPxXMY5Ty2kX7OSkePArSlQf7SldPSKEzn3ugYKz1fZUueJu9Zuv8VW5bIi4Vsa3MaFFA7SQj62Q5m42zd1+Q9S2MtNiTo5+bqbUSuil5ODcBOcauHVbjSVsF9EH8GEkwbqwV5+LAO/5pkp670BAprvLbk0ZMknPZqS57ZSRRXGk/EQJeloL87p1BfFlSO82UmjwjMZdbmPUvzeo4li5erdZrzsjAx4Tc+d89H2ogrbRWutFW40lbhSluFt70oQxZoHEPp9SIM+nfrj7RcK6B0+fa9R7C+8cMRzs+KFaivNOCgMKKbk7nHXH2lsXA2cSN09cIkHDs8aqkkAQetVFlUpY8cEmBveFh3P3odEf9OxbXEGPmjzw72hYdVYYO1zHI2nZzozPLaK6RX9PZMZXKKXZ3Qw2z1MF45tRbVw6z0nAOE8U64D2als+lkGdeqSXm0Afz9iWw6adfv/yUA8AcZbfJgqCxy0gAAAABJRU5ErkJggg=="
    }
}