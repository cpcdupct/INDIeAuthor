// TRANSFORM
indieauthor.transform.runTransformation = function (info, model, transformMode) {
    var sections = [];

    if (!transformMode) transformMode = "Preview";

    for (var i = 0; i < model.length; i++) {
        var editorSection = model[i];
        sections.push(indieauthor.transform.rules[editorSection.widget].do(editorSection));
    }

    var transformResult = indieauthor.transform.rootElement(sections, info, transformMode);
    return transformResult;
}

indieauthor.transform.rootElement = function (content, info, transformMode) {
    var rootTemplate = "ContentDefinition {{unitName}} { package upctforma.{{unitName}};  {{{types}}}  Unit '{{unitLabel}}' '{{unitAuthor}}' {{{mode}}} {{{language}}} { {{{unitContent}}} } }";
    var types = "types{TextType, VideoType, ImageType, GameType, IntType, Any,Tab{name: TextType,content: ContentGroup},DragAndDrop{name: ImageType,content: ImageType,solution: ImageType},DragAndDropTextual{term: TextType,definition: TextType},ContentGroup{list_of Any},TabList{list_of Tab},ImageList{list_of ImageType},DragAndDropList{list_of DragAndDrop},TextualDragAndDropList{list_of DragAndDropTextual},widget ImageTextOver{ImageType, TextType},widget ImageTextRight{ImageType, TextType},widget VerticalAccordion{TabList},widget HorizontalTabs{TabList},Animation{awidht: TextType,background: ImageType,images: ImageList,aheight: TextType},widget AnimationInOut{Animation},widget RectangleDragAndDrop{DragAndDropList},widget TextualDragAndDrop{TextualDragAndDropList},AudioTerm{URL : TextType, term: TextType, definition: TextType},AudioTermList{list_of AudioTerm},widget ContainerAudioTerm{AudioTermList}, ResponseList{list_of TextType},Test{question: TextType, response: ResponseList, correct: IntType},TestList{list_of Test},widget ContainerTest{TestList},ChooseOptionRecord{questionText: TextType,questionImage: ImageType,response1: TextType,response2: TextType,response3: TextType,response4: TextType,correct: IntType},widget ChooseOption{ChooseOptionRecord},ImageSoundRecord{contentText: TextType, contentImage: ImageType, sound: TextType},ImageSoundList{list_of ImageSoundRecord},widget ImageSound{ImageSoundList},CouplesRecord{contentText: TextType, contentImage: ImageType},CouplesList{list_of CouplesRecord},widget Couples{CouplesList},ListSchema{list_of ImageType},widget Schema{ListSchema}, ModalRecord{name:TextType,content:ContentGroup},widget ModalButton { ModalRecord }, TrueFalse { question: TextType, correct: TextType}, TrueFalseList { list_of TrueFalse }, widget ContainerTrueFalse { TrueFalseList }}";

    return indieauthor.renderTemplate(rootTemplate, {
        unitName: "UD",
        mode: transformMode,
        unitLabel: indieauthor.transform.prepareString(info.title),
        unitAuthor: indieauthor.transform.prepareString(info.user),
        language: info.language,
        unitContent: content,
        types: types
    })
}

// ELEMENTS
indieauthor.transform.rules = {};

indieauthor.transform.rules.Section = {
    do: function (element) {
        var template = "Section '{{{bookmark}}}' { image '{{{image}}}' title '{{{title}}}' type {{{type}}} {{{rows}}} } ";
        var rows = [];
        for (var i = 0; i < element.data.length; i++) {
            var content = element.data[i];
            var st = indieauthor.transform.rules[content.widget].do(content, element);
            rows.push(st);
        }

        var rendered = indieauthor.renderTemplate(template, {
            image: element.image,
            title: indieauthor.transform.prepareString(element.name),
            rows: rows,
            type: element.bakcgroundType ? element.bakcgroundType : "BackgroundColour",
            bookmark: indieauthor.transform.prepareString(element.bookmark)
        });

        return rendered;
    }
}

indieauthor.transform.rules.TextBlock = {
    do: function (element, parent) {
        var template = parent.type == 'section-container' ? this.templateWithParent() : this.templateWithoutParent();
        return indieauthor.renderTemplate(template, {
            text: indieauthor.transform.prepareString(element.data.text)
        });
    },
    templateWithoutParent: function () {
        return "Text { html '{{{text}}}' } "
    },
    templateWithParent: function () {
        return "row {column { width '12' Text { html '{{{text}}}' } } } "
    }
}

indieauthor.transform.rules.LatexFormula = {
    do: function (element, parent) {
        var template = parent.type == 'section-container' ? this.templateWithParent() : this.templateWithoutParent();

        // FIX \ must be translated into \\
        var formula = indieauthor.transform.prepareFormula(element.data.formula);

        return indieauthor.renderTemplate(template, {
            caption: indieauthor.transform.prepareString(element.data.caption),
            formula: formula
        });
    },
    templateWithParent: function () {
        return "row { column { width '12' " + this.templateWithoutParent() + " } } "
    },
    templateWithoutParent: function () {
        return "Text { html '{{{caption}}} $${{{formula}}}$$ '} "
    }
}

indieauthor.transform.rules.Blockquote = {
    do: function (element, parent) {
        var template = parent.type == 'section-container' ? this.templateWithParent() : this.templateWithoutParent();
        return indieauthor.renderTemplate(template, {
            alignment: element.data.alignment,
            quote: indieauthor.transform.prepareString(element.data.quote),
            caption: indieauthor.transform.prepareString(element.data.caption),
            source: indieauthor.transform.prepareString(element.data.source)
        });
    },
    templateWithParent: function () {
        return "row {column { width '12' " + this.templateWithoutParent() + " } } "
    },
    templateWithoutParent: function () {
        return 'Text { html \'<blockquote {{#ifeq alignment "right"}}class="blockquote-reverse"{{/ifeq}}><p>{{{quote}}}</p><footer>{{{caption}}} <cite title="{{{source}}}">{{{source}}}</cite></footer></blockquote>\' } ';
    }
}

indieauthor.transform.rules.Image = {
    do: function (element, parent) {
        var template;

        if (parent.type == 'section-container')
            template = this.templateWithParent();
        else
            template = this.templateWithoutParent();

        return indieauthor.renderTemplate(template, {
            imageurl: element.data.image,
            caption: indieauthor.transform.prepareString(element.data.text),
            name: indieauthor.transform.prepareString(element.params.name),
            help: indieauthor.transform.prepareString(element.params.help)
        });
    },
    templateWithoutParent: function () {
        return "Widget '{{{name}}}': ImageTextOver { help '{{{help}}}', Image { url '{{{imageurl}}}', Original }, Text { html '<p>{{{caption}}}</p>' } } "
    },
    templateWithParent: function () {
        return "row { column { width '12' " + this.templateWithoutParent() + " } } "
    }
}

indieauthor.transform.rules.SimpleImage = {
    do: function (element, parent) {
        var template;

        if (parent.type == 'section-container')
            template = this.templateWithParent(element.data);
        else
            template = this.templateWithoutParent(element.data);

        return indieauthor.renderTemplate(template, {
            imageurl: element.data.image,
            name: indieauthor.transform.prepareString(element.params.name),
            aspect: element.params.aspect
        });
    },
    templateWithoutParent: function () {
        return " Image { url '{{{imageurl}}}', {{#ifeq aspect 'original'}} Original {{/ifeq}} {{#ifeq aspect 'fit'}} Fit {{/ifeq}} } ";
    },
    templateWithParent: function () {
        return "row { column { width '12' " + this.templateWithoutParent() + " } } "
    }
}

indieauthor.transform.rules.ImageAndText = {
    do: function (element, parent) {
        var template = parent.type == 'section-container' ? this.templateWithParent() : this.templateWithoutParent();
        return indieauthor.renderTemplate(template, {
            text: indieauthor.transform.prepareString(element.data.text),
            image: element.data.image,
            name: indieauthor.transform.prepareString(element.params.name),
            help: indieauthor.transform.prepareString(element.params.help)
        });
    },
    templateWithParent: function () {
        return "row { column { width '12' " + this.templateWithoutParent() + " } } ";
    },
    templateWithoutParent: function () {
        return "Widget '{{{name}}}': ImageTextRight { help '{{{help}}}', Image { url '{{{image}}}', Original}, Text { html '{{{text}}}' } }";
    }
}

indieauthor.transform.rules.Video = {
    do: function (element, parent) {
        var template = parent.type == 'section-container' ? this.templateWithParent() : this.templateWithoutParent();
        var videourl = "";

        if (indieauthor.utils.isYoutubeVideoURL(element.data.videourl)) {
            var youtubeId = indieauthor.transform.getYoutubeId(element.data.videourl);
            var startTime = indieauthor.transform.getYoutubeStartTime(element.data.videourl);
            videourl = "https://www.youtube.com/embed/" + youtubeId + "?start=" + startTime;
        } else if (indieauthor.utils.isIndieResource(element.data.videourl)) {
            videourl = element.data.videourl;
        }

        return indieauthor.renderTemplate(template, {
            videourl: videourl,
            name: indieauthor.transform.prepareString(element.params.name)
        });
    },
    templateWithParent: function () {
        return "row {column { width '12' Video { id '{{{videourl}}}', title '{{{name}}}', type Normal } } } ";
    },
    templateWithoutParent: function () {
        return "Video { id '{{{videourl}}}', title '{{{name}}}' , type Normal} ";
    }
}

indieauthor.transform.rules.InteractiveVideo = {
    do: function (element, parent) {
        var template = parent.type == 'section-container' ? this.templateWithParent() : this.templateWithoutParent();
        var videourl = "";

        return indieauthor.renderTemplate(template, {
            videourl: element.data.videourl,
            name: indieauthor.transform.prepareString(element.params.name)
        });
    },
    templateWithParent: function () {
        return "row {column { width '12' Video { id '{{{videourl}}}', title '{{{name}}}', type Interactive } } } ";
    },
    templateWithoutParent: function () {
        return "Video { id '{{{videourl}}}', title '{{{name}}}', type Interactive } ";
    }
}

// LAYOUT AND CONTAINERS
indieauthor.transform.rules.ColumnLayout = {
    do: function (element) {
        var template = "row { {{{columns}}} } ";
        var columnSize = 12 / element.params.columns;
        var columns = [];

        for (var i = 0; i < element.params.columns; i++) {
            var subArray = element.data[i];
            var columnContent = "column { width '{{{columnSize}}}' {{{elements}}} }";
            var elements = [];

            for (var j = 0; j < subArray.length; j++) {
                var subElement = subArray[j];
                elements.push(indieauthor.transform.rules[subElement.widget].do(subElement, element));
            }

            columns.push(indieauthor.renderTemplate(columnContent, {
                columnSize: columnSize,
                elements: elements
            }));
        }

        return indieauthor.renderTemplate(template, {
            columns: columns
        });
    }
}

indieauthor.transform.rules.TabsContainer = {
    do: function (element) {
        var template = "row { column { width '12' Widget '{{{name}}}' : HorizontalTabs { help '{{{help}}}', [ {{{tabs}}} ]} } } ";
        var tabsContent = [];
        for (var i = 0; i < element.data.length; i++) {
            var tabContainer = element.data[i];
            tabsContent.push(indieauthor.transform.rules[tabContainer.widget].do(tabContainer));
        }

        return indieauthor.renderTemplate(template, {
            tabs: tabsContent,
            name: indieauthor.transform.prepareString(element.params.name),
            help: indieauthor.transform.prepareString(element.params.help)
        });
    }
}

indieauthor.transform.rules.TabContent = {
    do: function (element) {
        var template = "{ name: Text { html '<p>{{{name}}}</p>' }, content: [{{{elements}}}] } ";
        var elements = [];
        for (var i = 0; i < element.data.length; i++) {
            var tabElement = element.data[i];
            elements.push(indieauthor.transform.rules[tabElement.widget].do(tabElement, element));
        }

        return indieauthor.renderTemplate(template, {
            name: indieauthor.transform.prepareString(element.params.name),
            elements: elements
        })
    }
}

indieauthor.transform.rules.AcordionContainer = {
    do: function (element) {
        var template = "row { column { width '12' Widget '{{{name}}}' : VerticalAccordion { help '{{{help}}}', [ {{{tabs}}} ]} } } ";
        var tabsContent = [];
        for (var i = 0; i < element.data.length; i++) {
            var acordionContent = element.data[i];
            tabsContent.push(indieauthor.transform.rules[acordionContent.widget].do(acordionContent));
        }

        return indieauthor.renderTemplate(template, {
            tabs: tabsContent,
            name: indieauthor.transform.prepareString(element.params.name),
            help: indieauthor.transform.prepareString(element.params.help)
        });
    }
}

indieauthor.transform.rules.AcordionContent = {
    do: function (element) {
        var template = "{ name: Text { html '{{{title}}}'} , content: [{{{elements}}}] } ";
        var elements = [];
        for (var i = 0; i < element.data.length; i++) {
            var acordionElement = element.data[i];
            elements.push(indieauthor.transform.rules[acordionElement.widget].do(acordionElement, element));
        }

        return indieauthor.renderTemplate(template, {
            title: indieauthor.transform.prepareString(element.params.title),
            elements: elements
        })
    }
}

indieauthor.transform.rules.AnimationContainer = {
    do: function (element, parent) {
        var template = parent.type == 'section-container' ? this.templateWithParent() : this.templateWithoutParent();
        var imageList = [];

        for (var i = 0; i < element.data.length; i++) {
            var imageElement = element.data[i];
            var st = this.getAnimationItem(imageElement);
            imageList.push(st);
        }

        return indieauthor.renderTemplate(template, {
            width: element.params.width,
            height: element.params.height,
            completeImage: element.params.image,
            images: imageList,
            name: indieauthor.transform.prepareString(element.params.name),
            help: indieauthor.transform.prepareString(element.params.help)
        });
    },
    templateWithParent: function () {
        return "row { column { width '12' " + this.templateWithoutParent() + " } } "
    },
    templateWithoutParent: function () {
        return "Widget '{{{name}}}': AnimationInOut { help '{{{help}}}', { awidth: Text{ html '{{{width}}}'},  background: Image { url '{{{completeImage}}}', Original }, imagelist: [ {{{images}}} ], aheight: Text { html '{{{height}}}'} } }";
    },
    getAnimationItem: function (item) {
        var template = "Image { url '{{{image}}}', Original } ";

        return indieauthor.renderTemplate(template, {
            image: item.data.image
        })
    }
}

indieauthor.transform.rules.DragdropContainer = {
    do: function (element, parent) {
        var template = parent.type == 'section-container' ? this.templateWithParent() : this.templateWithoutParent();
        var terms = [];

        for (var i = 0; i < element.data.length; i++) {
            var termDef = element.data[i];
            var content = this.getDragDropItem(termDef);
            terms.push(content);
        }

        return indieauthor.renderTemplate(template, {
            terms: terms,
            name: element.params.name,
            help: indieauthor.transform.prepareString(element.params.help)
        });
    },
    templateWithParent: function () {
        return "row { column { width '12' " + this.templateWithoutParent() + " } } "
    },
    templateWithoutParent: function () {
        return "Widget '{{{name}}}': TextualDragAndDrop { help '{{{help}}}', [ {{{terms}}} ] }";
    },
    getDragDropItem: function (item) {
        return indieauthor.renderTemplate("{ term: Text { html '{{{term}}}' }, definition: Text { html '{{{definition}}}' } }", {
            term: indieauthor.transform.prepareString(item.data.term),
            definition: indieauthor.transform.prepareString(item.data.definition)
        });
    }
}

indieauthor.transform.rules.AudioTermContainer = {
    do: function (element, parent) {
        var rootTemplate = parent.type == 'section-container' ? this.templateWithParent() : this.templateWithoutParent();
        var terms = [];
        var items = element.data;

        for (var i = 0; i < items.length; i++) {
            var audioTermItem = items[i];
            terms.push(this.getAudioItemContent(audioTermItem));
        }

        return indieauthor.renderTemplate(rootTemplate, {
            terms: terms,
            name: indieauthor.transform.prepareString(element.params.name),
            help: indieauthor.transform.prepareString(element.params.help)
        });
    },
    templateWithParent: function () {
        return "row { column { width '12' " + this.templateWithoutParent() + " } } "
    },
    templateWithoutParent: function () {
        return "Widget '{{{name}}}': ContainerAudioTerm { help '{{{help}}}', [{{{terms}}}] }";
    },
    getAudioItemContent: function (element) {
        var template = "{ URL: Text { html '{{{audio}}}' }, term: Text { html '{{{term}}}' }, definition: Text { html '{{{definition}}}' }  }";

        return indieauthor.renderTemplate(template, {
            audio: element.data.audio,
            term: indieauthor.transform.prepareString(element.data.term),
            definition: indieauthor.transform.prepareString(element.data.definition)
        });
    }
}

indieauthor.transform.rules.Test = {
    do: function (element, parent) {
        var rootTemplate = parent.type == 'section-container' ? this.templateWithParent() : this.templateWithoutParent();
        var terms = [];
        var items = element.data;

        for (var i = 0; i < items.length; i++) {
            var questionItem = items[i];
            terms.push(this.questions[questionItem.widget].getQuestionContent(questionItem.data));
        }

        return indieauthor.renderTemplate(rootTemplate, {
            terms: terms,
            name: indieauthor.transform.prepareString(element.params.name),
            help: indieauthor.transform.prepareString(element.params.help)
        });
    },
    templateWithParent: function () {
        return "row { column { width '12' " + this.templateWithoutParent() + " } } "
    },
    templateWithoutParent: function () {
        return "Widget '{{{name}}}': ContainerTest { help '{{{help}}}', [{{{terms}}}] }";
    },
    questions: {
        GapQuestion: {
            getQuestionContent: function (question) {
                var tempalte = "{ question: Text { html '{{{question}}}' }, response: [{{{answers}}}], correct: Int{ {{{correct}}} } }";
                var answers = [];
                var correct = 1;

                for (var i = 0; i < question.answers.length; i++) {
                    var answer = question.answers[i];
                    answers.push(indieauthor.renderTemplate("Text { html '{{{text}}}' }", {
                        text: indieauthor.transform.prepareString(answer.text)
                    }));
                    if (answer.correct)
                        correct = (i + 1);
                }

                return indieauthor.renderTemplate(tempalte, {
                    question: indieauthor.transform.prepareString(question.question),
                    answers: answers,
                    correct: correct
                });
            }
        },
        SimpleQuestion: {
            getQuestionContent: function (question) {
                // same as GapQuestion
                return indieauthor.transform.rules.Test.questions.GapQuestion.getQuestionContent(question);
            }
        },
        TrueFalseQuestion: {
            getQuestionContent: function (question) {
                var tempalte = "{ question: Text { html '{{{question}}}' }, response: [{{{answers}}}], correct: Int{ {{{correct}}} } }";
                var answers = [];
                var correct = question.answer ? 1 : 2; // true 1, false 2

                var trueAnswer = "Text { html '" + indieauthor.strings.general.true + "' }";
                var falseAnswer = "Text { html '" + indieauthor.strings.general.false + "' }";

                answers.push(trueAnswer);
                answers.push(falseAnswer);

                return indieauthor.renderTemplate(tempalte, {
                    question: indieauthor.transform.prepareString(question.question),
                    answers: answers,
                    correct: correct
                });
            }
        }
    }
}

indieauthor.transform.rules.ChooseOption = {
    do: function (element, parent) {
        var template = parent.type == 'section-container' ? this.templateWithParent() : this.templateWithoutParent();

        var correctIndex = 1;
        for (var i = 0; i < element.data.options.length; i++) {
            var subElement = element.data.options[i];
            if (subElement.correct) correctIndex = (i + 1);
        }

        return indieauthor.renderTemplate(template, {
            text: indieauthor.transform.prepareString(element.data.text),
            image: element.data.image,
            answers: element.data.options,
            correct: correctIndex,
            name: indieauthor.transform.prepareString(element.params.name),
            help: indieauthor.transform.prepareString(element.params.help)
        });
    },
    templateWithParent: function () {
        return "row { column { width '12' " + this.templateWithoutParent() + " } } "
    },
    templateWithoutParent: function () {
        return "Widget '{{{name}}}': ChooseOption { help '{{{help}}}', { questionText: Text{html '{{{text}}}' }, questionImage: Image { url '{{{image}}}', Original },{{#each answers}} response{{inc @index}}: Text{html '{{text}}' },{{/each}} correct: Int{ {{{correct}}} } } }";
    }
}

indieauthor.transform.rules.ImageAndSoundContainer = {
    do: function (element, parent) {
        var template = parent.type == 'section-container' ? this.templateWithParent() : this.templateWithoutParent();
        var items = [];

        for (var i = 0; i < element.data.length; i++) {
            var imageSoundItem = element.data[i];
            items.push(this.getImageAndSoundItem(imageSoundItem));
        }

        return indieauthor.renderTemplate(template, {
            items: items,
            name: indieauthor.transform.prepareString(element.params.name),
            help: indieauthor.transform.prepareString(element.params.help)
        })
    },
    templateWithParent: function () {
        return "row { column { width '12' " + this.templateWithoutParent() + " } } "
    },
    templateWithoutParent: function () {
        return "Widget '{{{name}}}': ImageSound { help '{{{help}}}', [ {{{items}}} ] }"
    },
    getImageAndSoundItem: function (item) {
        var template = "{ sound: Text { html '{{{audio}}}' }, contentImage: Image { url '{{{image}}}', Original }, contentText: Text { html '{{{text}}}'} }";
        return indieauthor.renderTemplate(template, {
            audio: item.data.audio,
            image: item.data.image,
            text: indieauthor.transform.prepareString(item.data.text)
        });
    }
};

indieauthor.transform.rules.SchemaContainer = {
    do: function (element, parent) {
        var template = parent.type == 'section-container' ? this.templateWithParent() : this.templateWithoutParent();
        var images = [];

        for (var i = 0; i < element.data.length; i++) {
            var item = element.data[i];
            images.push(this.getSchemaItem(item));
        }

        return indieauthor.renderTemplate(template, {
            images: images,
            name: indieauthor.transform.prepareString(element.params.name),
            help: indieauthor.transform.prepareString(element.params.help)
        });
    },
    templateWithParent: function () {
        return "row { column { width '12' " + this.templateWithoutParent() + " } } ";
    },
    templateWithoutParent: function () {
        return "Widget '{{{name}}}': Schema { help '{{{help}}}', [ {{{images}}} ] }"
    },
    getSchemaItem: function (item) {
        var template = "Image { url '{{{image}}}', Original }";
        return indieauthor.renderTemplate(template, {
            image: item.data.image
        });
    }
}

indieauthor.transform.rules.CouplesContainer = {
    do: function (element, parent) {
        var template = parent.type == 'section-container' ? this.templateWithParent() : this.templateWithoutParent();
        var couples = [];

        for (var i = 0; i < element.data.length; i++) {
            var coupleItem = element.data[i];
            couples.push(this.getCoupleItem(coupleItem));
        }

        return indieauthor.renderTemplate(template, {
            couples: couples,
            name: indieauthor.transform.prepareString(element.params.name),
            help: indieauthor.transform.prepareString(element.params.help)
        })
    },
    templateWithParent: function () {
        return "row { column { width '12' " + this.templateWithoutParent() + " } } ";
    },
    templateWithoutParent: function () {
        return "Widget '{{{name}}}': Couples { help '{{{help}}}', [ {{{couples}}} ] }"
    },
    getCoupleItem: function (item) {
        var templateItem = "{ contentText: Text { html '{{{text}}}' }, contentImage: Image { url '{{{image}}}', Original } }";

        return indieauthor.renderTemplate(templateItem, {
            text: indieauthor.transform.prepareString(item.data.text),
            image: item.data.image
        })
    }
}

indieauthor.transform.rules.Modal = {
    do: function (element, parent) {
        var template = parent.type == 'section-container' ? this.templateWithParent() : this.templateWithoutParent();
        var items = [];

        for (var i = 0; i < element.data.length; i++) {
            var modalElement = element.data[i];
            items.push(indieauthor.transform.rules[modalElement.widget].do(modalElement, element));
        }

        return indieauthor.renderTemplate(template, {
            items: items,
            name: indieauthor.transform.prepareString(element.params.name),
            text: indieauthor.transform.prepareString(element.params.text),
            help: indieauthor.transform.prepareString(element.params.help)
        })
    },
    templateWithParent: function () {
        return "row { column { width '12' " + this.templateWithoutParent() + " } } ";
    },
    templateWithoutParent: function () {
        return "Widget '{{{name}}}': ModalButton { help '{{{help}}}', { name: Text { html '{{{text}}}' }, content: [{{{items}}}] } }"
    }
}

indieauthor.transform.rules.TrueFalseContainer = {
    do: function (element, parent) {
        var template = parent.type == 'section-container' ? this.templateWithParent() : this.templateWithoutParent();
        var trueFalseItems = [];

        for (var i = 0; i < element.data.length; i++) {
            var trueFalseItem = element.data[i];

            trueFalseItems.push(this.getTrueFalseItem(trueFalseItem));
        }

        return indieauthor.renderTemplate(template, {
            items: trueFalseItems,
            name: indieauthor.transform.prepareString(element.params.name),
            help: indieauthor.transform.prepareString(element.params.help)
        })
    },
    getTrueFalseItem: function (element) {
        var templateItem = "{ question: Text { html '{{{question}}}' }, correct: Text { html '{{{correct}}}' } }";

        return indieauthor.renderTemplate(templateItem, {
            question: indieauthor.transform.prepareString(element.data.question),
            correct: element.data.answer ? "True" : "False"
        })
    },
    templateWithParent: function () {
        return "row { column { width '12' " + this.templateWithoutParent() + " } } ";
    },
    templateWithoutParent: function () {
        return "Widget '{{{name}}}': ContainerTrueFalse { help '{{{help}}}',  [ {{{items}}} ] }"
    }
}

/**
 * Prepares a TEX formula string compatible with the DSL grammar
 * 
 * @param {string}
 *            formula TEX Formula
 * 
 * @returns {string} formula prepared
 */
indieauthor.transform.prepareFormula = function (formula) {
    formula = formula.replace(/\\/g, "\\\\");
    return formula;
}

/**
 * Prepares a literal string compatible with the DSL grammar
 * 
 * @param {string}
 *            literalString Literal String
 * 
 * @returns {string} string prepared
 */
indieauthor.transform.prepareString = function (literalString) {
    literalString = literalString.replace(/\\/g, "\\\\"); // double
    literalString = literalString.replace(/'/g, "\\'"); // remove simple
    literalString = literalString.replace(/\s+/g, " ");
    literalString = literalString.trim();
    return literalString;
}

indieauthor.transform.getYoutubeId = function (url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}

indieauthor.transform.getYoutubeStartTime = function (url) {
    var parameters = indieauthor.utils.getAllUrlParams(url);
    if (parameters.t) return parseInt(parameters.t);
    else if (parameters.start) return parseInt(parameters.start);
    else return 0;
}