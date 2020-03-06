indieauthor.strings = {
    palette: {
        simpleElements: "Elements",
        items: "items",
        layouts: "Layouts",
        containers: "Containers",
        interactiveElements: "Interactive elements",
        question: "Questions",
        exerciseElement: "Exercise elements"
    },
    common: {
        name: {
            label: "Name",
            placeholder: "Name of this current widget instance",
            help: "This will be name of this instance for learning analytics"
        },
        selectType: "Select a type from the following options"
    },
    widgets: {
        TextBlock: {
            label: "Text Block",
            prev: "Text not yet set ...",
            form: {
                label: "Text block",
                placeholder: "Introduce some text...",
                help: "In this text editor you can write the content of the block."
            }
        },
        Blockquote: {
            label: "Quote",
            prev: "Quote not yet set ...",
            form: {
                quote: {
                    label: "Quote text",
                    placeholder: "Example: 'The absence of evidence is not evidence of absence'",
                    help: "This text is the textual quote."
                },
                caption: {
                    label: "Quote caption",
                    placeholder: "Example: Carl Sagan",
                    help: "The quote caption appears below the quote, it is mainly used to indicate the author or authors of the quote."
                },
                source: {
                    label: "Quote source",
                    placeholder: "Example: Year 1990",
                    help: "Original source of the quote (Year, book, magazine ... etc)"
                },
                alignment: {
                    label: "Quote alignment",
                    help: "The quote can appear on the right or on the left",
                    values: {
                        left: "On the left",
                        right: "On the right"
                    }
                }
            }
        },
        SimpleImage: {
            label: "Image",
            prev: "Image not yet set ...",
            form: {
                image: {
                    label: "Image URL",
                    placeholder: "Insert your image URL here",
                    help: "This will be the image that appears in the element."
                },
                aspect: {
                    label: "Aspect of the image",
                    values: {
                        original: "Original dimensions",
                        fit: "Fit image dimensions to available space"
                    },
                    help: "The image could be shown with the original dimensions (when possible) or it could fit the width of the screen (scaling the image). If the dimensions are higher and wider than the screen can show, it will always selfadjust to the screen."
                },
                preview: "Preview"
            }
        },
        Image: {
            label: "Image text over",
            prev: "Image not yet set ...",
            form: {
                image: {
                    label: "Image URL",
                    placeholder: "Insert your image URL here",
                    help: "This will be the image that appears in the element."
                },
                caption: {
                    label: "Image caption",
                    placeholder: "Write some caption..",
                    help: "This will be the image caption"
                },
                preview: "Preview"
            }
        },
        LatexFormula: {
            label: "LaTeX formula",
            prev: "Formula not yet set ...",
            form: {
                caption: {
                    label: "Formula caption",
                    placeholder: "Example: Quadratic formula",
                    help: "This caption will appear below the formula as text."
                },
                formula: {
                    label: "LaTeX formula",
                    placeholder: "Example: \\text{Quadratic formula is }x = \\frac {-b \\pm \\sqrt {b^2 - 4ac}}{2a}",
                    help: "Use the text area to write the formula. Below this area will appear a preview of the formula if it is correct, or the text will appear in red if the formula is not correct."
                }
            }
        },
        ImageAndText: {
            label: "Image and text",
            prev: "Image and text no yet set ...",
            form: {
                image: {
                    label: "Image URL",
                    placeholder: "Insert your image URL here",
                    help: "This will be the image that appears in the element. You can choose one of your uploaded images or upload a new one."
                },
                text: {
                    label: "Text",
                    placeholder: "Write some text...",
                    help: "In this text editor you can write the content of the block"
                },
                preview: "Image preview",
                layout: {
                    label: "Orientation",
                    help: "The orientation of an Image and text block establishes where each of the elements in the block appears",
                    values: {
                        0: "Text on the right, image on the left",
                        1: "Text on the left, image on the right"
                    }
                }
            }
        },
        Video: {
            label: "Video",
            prev: "Video not yet set...",
            form: {
                url: {
                    label: "Video URL",
                    placeholder: "Example: https://www.youtube.com/watch?v=xcJtL7QggTI",
                    help: "Use the text input to enter the URL of your youtube video or indiemedia video"
                }
            }
        },
        InteractiveVideo: {
            label: "Interactive video",
            prev: "Interactive video not yet set...",
            form: {
                url: {
                    label: "Video URL",
                    placeholder: "Example: https://indieatuhor.upct.es/video/embed?v=b1a9820b0a0c4e8cba2c51d456c03074",
                    help: "Use the text input to introduce the URL of the interactive video created with the interactive video tool within the Indieauthor demo"
                }
            }
        },
        ColumnLayout: {
            label: "Layout",
            columnsLabel: "columns"
        },
        TabsContainer: {
            label: "Tabs menu",
            itemLabel: "Tabs"
        },
        TabContent: {
            label: "Tab",
            form: {
                name: {
                    label: "Tab name",
                    placeholder: "Example: Professional skills",
                    help: "This will be the tab name that will appear as tab tittle."
                }
            }
        },
        AcordionContainer: {
            label: "Acordion"
        },
        AcordionContent: {
            label: "Content group",
            form: {
                title: {
                    label: "Content title",
                    placeholder: "Example: Professional skills",
                    help: "Set the title of the content group. It will appear in the title of the drop-down menu."
                }
            }
        },
        DragdropContainer: {
            label: "Drag and drop"
        },
        DragdropItem: {
            label: "Term-defnition",
            prev: "Item not yet set ...",
            form: {
                term: {
                    label: "Término",
                    placeholder: "Example: Freedom of speech",
                    help: "The term appears to the left of the interactive element and will be the one that the student has to drag and drop on the definition."
                },
                definition: {
                    label: "Definition",
                    placeholder: "Example: All human beings have the right to express themselves without being harassed because of what they think",
                    help: "The definition appears to the right of the interactive element and the student must drag the term to the definition"
                }
            }
        },
        AnimationContainer: {
            label: "Animation",
            form: {
                width: {
                    label: "Animation width",
                    placeholder: "Example: 400",
                    help: "This will be the animation container width in pixels"
                },
                height: {
                    label: "Animation height",
                    placeholder: "Example: 200",
                    help: "This will be the animation container height in pixels"
                },
                image: {
                    label: "Image URL",
                    placeholder: "Insert your image URL here",
                    help: "This will be the complete picture of the animation."
                },
                prev: "Image preview"
            }
        },
        AnimationItem: {
            label: "Animation item",
            prev: "Animation item not yet set ...",
            form: {
                image: {
                    label: "Image URL",
                    placeholder: "Insert your image URL here",
                    help: "This will be the partial image of the animation."
                },
                prev: "Image preview"
            }
        },
        Test: {
            label: "Test",
            questionSelect: "Select a type of question you want to add to the test"
        },
        GapQuestion: {
            label: "Fill in the gap question",
            prev: "Gap question not yet set ...",
            form: {
                questionText: {
                    label: "Question text",
                    placeholder: "Question text with [blank] spot",
                    help: "You need to write the question text with the blank you want with the [blank] special keyword"
                },
                questionPreview: {
                    label: "Question preview",
                    placeholder: "Question text with ___ spot",
                    help: "This is how you would see the question in the content unit."
                },
                answers: {
                    label: "Possible answers",
                    help: "You must write at least 2 answers and mark which of them is correct."
                }
            }
        },
        SimpleQuestion: {
            label: "Simple question",
            prev: "Simple question not yet set ...",
            form: {
                questionText: {
                    label: "Question text",
                    placeholder: "Question text",
                    help: "This is the question text that will be shown to the user."
                },
                answers: {
                    label: "Possible answers",
                    help: "You must write at least 2 answers and mark which of them is correct."
                }
            }
        },
        TrueFalseQuestion: {
            label: "True or false question",
            prev: "True or false question not yet set ...",
            form: {
                questionText: {
                    label: "Question text",
                    placeholder: "Question text",
                    help: "This is the question text that will be shown to the user."
                },
                answer: {
                    label: "Correct answer",
                    true: "True",
                    false: "False",
                    help: "Select between true or false as a correct answer"
                }
            }
        },
        TrueFalseContainer: {
            label: "True or false",
            prev: "True or false not yet set...",
        },
        TrueFalseItem: {
            label: "True or false",
            prev: "True or false not yet set...",
            form: {
                questionText: {
                    label: "Question text",
                    placeholder: "Question text",
                    help: "This is the question text that will be shown to the user."
                },
                answer: {
                    label: "Correct answer",
                    true: "True",
                    false: "False",
                    help: "Select between true or false as a correct answer"
                }
            }
        },
        AudioTermContainer: {
            label: "Audio terms"
        },
        AudioTermItem: {
            label: "Audio Item",
            prev: "Audio term not yet set ...",
            form: {
                term: {
                    label: "Term",
                    placeholder: "Write here your term...",
                    help: "This will be the term placed on the left of the widget"
                },
                definition: {
                    label: "Definition",
                    placeholder: "Write here your definition...",
                    help: "This definition is the textual transcription of the audio"
                },
                audio: {
                    label: "Audio URL",
                    placeholder: "Put a valid URL here...",
                    help: "This URL is the source of the audio file"
                }
            }
        },
        CouplesContainer: {
            label: "Couples",
            prev: "Couples not yet set ..."
        },
        CouplesItem: {
            label: "Couples item",
            prev: "Couples not yet set ...",
            form: {
                image: {
                    label: "Image URL",
                    placeholder: "Insert your image URL here...",
                    help: "This is the image associated with the text. The user will have to form the couple with the text."
                },
                text: {
                    label: "Text",
                    placeholder: "Write some text...",
                    help: "This text is associated with the image. The user will have to form the couple with the image."
                },
                preview: "Image preview"
            }
        },
        ChooseOption: {
            label: "Choose Option",
            prev: "Options not yet set ...",
            form: {
                text: {
                    label: "Text",
                    placeholder: "Write your text here...",
                    help: "This text will appear on top of the image as a quesiton or a sentence."
                },
                image: {
                    label: "Image URL",
                    placeholder: "Click here to write the image URL",
                    help: "This will be the image that appears in the center of the widget."
                },
                preview: "Image preview",
                options: {
                    label: "Options",
                    placeholder: "Write an option",
                    help: "These 4 option will appear below the image. Only one of them should be correct."
                }
            }
        },
        ImageAndSoundContainer: {
            label: "Image and sound"
        },
        ImageAndSoundItem: {
            label: "Image and Sound item",
            prev: "Image and sound item not yet set ...",
            form: {
                audio: {
                    label: "Audio URL",
                    placeholder: "Put a valid URL here...",
                    help: "The audio file will be played when the user moves the mouse over the image."
                },
                image: {
                    label: "Image URL",
                    placeholder: "Insert your image URL here...",
                    help: "The image will appear first"
                },
                text: {
                    label: "Image text",
                    placeholder: "Write some text...",
                    help: "This text will appear over the image when the user moves the mouse over the image"
                },
                preview: "Image preview"
            }
        },
        SchemaContainer: {
            label: "Schema"
        },
        SchemaItem: {
            label: "Schema item",
            prev: "Schema item not yet set ...",
            form: {
                image: {
                    label: "Image URL",
                    placeholder: "Insert your image URL here",
                    help: "This will be the partial image of the schema."
                },
                prev: "Image preview"
            }
        },
        Modal: {
            label: "Modal window",
            form: {
                text: {
                    label: "Button text",
                    placeholder: "Write your text",
                    help: "This text will appear as the text of the button which has to be clicked in order to open the modal."
                }
            }

        }
    },
    sections: {
        moveUp: "Move section up",
        moveDown: "Move section down",
        edit: "Edit information",
        deleteSection: "Delete section",
        label: "Section",
        form: {
            name: {
                label: "Section name",
                placeholder: "Write a name",
                help: "This is the section name."
            },
            bookmark: {
                label: "Section bookmark",
                placeholder: "Write a bookmark",
                help: "This is the bookmark that will appear in the upper side of the unit as a section bookmark. It can have a maximum of 40 characters."
            },
            image: {
                label: "Background image",
                placeholder: "Write here some image URL",
                help: "This image will be shown as the background image of the heading. This will apply only if the type is set in BackgroundImage"
            },
            type: {
                label: "Background Type",
                bc: "Background color (default)",
                bi: "Background image",
                help: "If the type is set in 'Background color', a default color will appear under the title, whereas in 'Image', you will have to select a background image for the section header."
            },
            preview: "Background image preview"
        }
    },
    items: {
        edit: "Edit content",
        add: "Add content",
        delete: "Delete content"
    },
    buttons: {
        toggleCategories: "Show/Hide categories",
        viewImage: "View image"
    },
    errors: {
        common: {
            name: {
                invalid: "You must provide a name for this instance",
                notUniqueName: "The instance name must be unique in the whole content unit"
            }
        },
        section: {
            emptyData: "A section cannot be empty. You must add at least one element.",
            invalidImage: "A section must have a background image.",
            invalidName: "A section must have a name.",
            invalidBookmark: "A section must have a valid bookmark",
            typeImageNotSelected: "If type is Background Image, you need to set an image"
        },
        AcordionContainer: {
            data: {
                empty: "The accordion is empty. You must add content using the add button on the right."
            }
        },
        AcordionContent: {
            data: {
                empty: "The container is empty. You must add at least one element to the container."
            },
            title: {
                invalid: "The title of the container is not valid. You must set one."
            }
        },
        Blockquote: {
            quote: {
                invalid: "You have not written the content of the quote. You must, at least, write the content."
            }
        },
        ColumnLayout: {
            data: {
                empty: "All columns in the layout must contain at least one element by dragging it from the left palette."
            },
        },
        DragdropContainer: {
            data: {
                empty: "The element is empty. You must add at least one term-definition item using the add button on the right."
            }
        },
        DragpdropItem: {
            term: {
                invalid: "The term field is empty. You must write a term."
            },
            definition: {
                invalid: "The definition field is empty. You must write a definition."
            }
        },
        Image: {
            image: {
                invalid: "The URL set for the image is not valid. You must make sure to provide a valid URL in the image field."
            },
            text: {
                invalid: "The text is empty. You must write a text"
            }
        },
        ImageAndText: {
            image: {
                invalid: "The URL set for the image is not valid. You must make sure to provide a valid URL in the image field."
            },
            text: {
                invalid: "The text is empty. You must write or copy a text."
            }
        },
        LatexFormula: {
            formula: {
                invalid: "You must provide a formula in the LaTex format."
            },
            caption: {
                invalid: "You must provide a caption of the formula."
            }
        },
        AnimationContainer: {
            width: {
                invalid: "The animation width must be greater than 0."
            },
            height: {
                invalid: "The animation height must be greater than 0."
            },
            image: {
                invalid: "The URL set for the full image is not valid. You must make sure to provide a valid URL."
            },
            data: {
                empty: "The  animation is empty. You must add at least one item using the add button on the right."
            }
        },
        AnimationItem: {
            image: {
                invalid: "The URL set for the image is not valid. You must make sure to provide a valid URL in the image field."
            }
        },
        TabContent: {
            data: {
                empty: "The tab is empty. You must add at least one element to the tab."
            },
            name: {
                invalid: "The name of the tab is not valid. You must establish one."
            }
        },
        TabsContainer: {
            data: {
                empty: "The tab menu does not contain tabs. You must add at least one using the add button on the right."
            }
        },
        TextBlock: {
            text: {
                invalid: "The text is empty. You must write a small text."
            }
        },
        Video: {
            videourl: {
                invalid: "The URL set for the video is not valid. You must make sure to provide a valid youtube or indiemedia URL."
            }
        },
        InteractiveVideo: {
            videourl: {
                invalid: "The URL set for the video is not valid. You must make sure to provide a valid indieuathor URL."
            }
        },
        Test: {
            data: {
                empty: "The test is empty. You must add at least one question."
            }
        },
        GapQuestion: {
            question: {
                onlyOneBlank: "You must include only one blank spot in the question",
                empty: "The question text cannot be empty"
            },
            answers: {
                notEnoughAnswers: "You must write at least 2 possible answers",
                noCorrect: "You must select one correct answer"
            }
        },
        SimpleQuestion: {
            question: {
                empty: "The question text cannot be empty"
            },
            answers: {
                notEnoughAnswers: "You must write at least 2 possible answers",
                noCorrect: "You must select one correct answer"
            }
        },
        TrueFalseQuestion: {
            question: {
                empty: "The question text cannot be empty"
            }
        },
        TrueFalseContainer: {
            data: {
                empty: "You must add at least one true or false item"
            }
        },
        TrueFalseItem: {
            question: {
                empty: "The question text cannot be empty"
            }
        },
        AudioTermContainer: {
            data: {
                empty: "You must add at least one audio term-definition"
            }
        },
        AudioTermItem: {
            term: {
                invalid: "You must provide a term."
            },
            definition: {
                invalid: "You must provide a definition."
            },
            audio: {
                invalid: "You must provide a valid indiemedia audio URL"
            }
        },
        ImageAndSoundContainer: {
            columns: {
                invalid: "The number of columns must be 1,2 or 3"
            },
            data: {
                empty: "You must provide at least one Image and Sound item."
            }
        },
        ImageAndSoundItem: {
            audio: {
                invalid: "You must provide a valid indiemedia URL"
            },
            image: {
                invalid: "The URL set for the image is not valid. You must make sure to provide a valid URL in the image field."
            },
            text: {
                invalid: "The text is empty. You must write a small text."
            }
        },
        CouplesContainer: {
            data: {
                empty: "You must add at least one couple"
            }
        },
        CouplesItem: {
            image: {
                invalid: "The URL set for the image is not valid. You must make sure to provide a valid URL in the image field."
            },
            text: {
                invalid: "The text is empty. You must write a small text."
            }
        },
        ChooseOption: {
            text: {
                invalid: "The text is empty. You must write or copy a text."
            },
            image: {
                invalid: "The URL set for the image is not valid. You must make sure to provide a valid URL in the image field."
            },
            options: {
                noCorrect: "You must select one correct option",
                notEnougOptions: "You must write 4 options"
            }
        },
        SchemaContainer: {
            data: {
                empty: "The schema is empty. You must add at least one item using the add button on the right."
            }
        },
        SchemaItem: {

        },
        Modal: {
            data: {
                empty: "The modal is empty. You must add at least one simple element."
            },
            text: {
                invalid: "The text is empty. You must write a small text."
            }
        }
    },
    messages: {
        successMessage: "Ok",
        warningMessage: "Atention",
        errorMessage: "Error",
        contentErrors: "Ooops! There are errors in your content. Check the error messages and follow their instructions to fix them.",
        noErrors: "Good! There are no errors in your content.",
        changesSaved: "Changes saved successfully.",
        deletedSection: "Section removed successfully.",
        confirmClearContent: "You will delete the content completely. Make sure this is what you really want to do.",
        contentCleared: "Content deleted successfully.",
        emptyContent: "You have not added content yet.",
        noRedo: "Nothing to redo",
        noUndo: "Nothing to undo"
    },
    general: {
        areYouSure: "Are you sure?",
        delete: "Delete",
        confirm: "Confirm",
        cancel: "Cancel",
        true: "True",
        false: "False"
    }
}