indieauthor.strings = {
    palette: {
        simpleElements: "Elementos",
        items: "ítems",
        layouts: "Disposiciones",
        containers: "Contenedores",
        interactiveElements: "Elementos interactivos",
        question: "Preguntas",
        exerciseElement: "Ejercicios"
    },
    common: {
        name: {
            label: "Nombre",
            placeholder: "Nombre de la instancia del widget",
            help: "Este será el nombre de la instancia del widget para las analíticas de aprendizaje"
        },
        selectType: "Selecciona un tipo de las siguientes opciones"
    },
    widgets: {
        TextBlock: {
            label: "Bloque de texto",
            prev: "Texto no establecido todavía...",
            form: {
                label: "En este editor de texto puedes escribir el contenido del bloque.",
                placeholder: "Introduce un texto...",
                help: "Debes escribir obligatoriamente un texto."
            }
        },
        Blockquote: {
            label: "Cita",
            prev: "Cita no establecida todavía...",
            form: {
                quote: {
                    label: "Texto de la cita",
                    placeholder: "Ejemplo: 'La ausencia de evidencia no es una evidencia de la ausencia.'",
                    help: "Este texto es la cita textual"
                },
                caption: {
                    label: "Subtítulo de la cita",
                    placeholder: "Ejemplo: Carl Sagan",
                    help: "El subtítulo de la cita aparece debajo de la cita. Se utiliza principalmente para indicar el autor o los autores de la cita"
                },
                source: {
                    label: "Orígen de la cita",
                    placeholder: "Ejemplo: Año 1990",
                    help: "Fuente original de la cita (Año, libro, revista...etc)"
                },
                alignment: {
                    label: "Alineación de la cita",
                    help: "La cita puede aparecer alineada a la derecha o a la izquierda",
                    values: {
                        left: "A la izquierda",
                        right: "A la derecha"
                    }
                }
            }
        },
        SimpleImage: {
            label: "Imagen",
            prev: "Imagen no establecida todavía ...",
            form: {
                image: {
                    label: "URL de la imagen",
                    placeholder: "Introduce la URL de la imagen aquí",
                    help: "Esta será la imagen que aparecerá en el elemento."
                },
                aspect: {
                    label: "Aspecto de la imagen",
                    values: {
                        original: "Dimensiones originales",
                        fit: "Ajusta las dimensiones originales al espacio disponible"
                    },
                    help: "La imagen se puede mostrar con las dimensiones originales (cuando sea posible) o puede ajustarse al ancho de la pantalla (escalar la imagen). Si las dimensiones son más altas y más anchas de lo que puede mostrar la pantalla, siempre se ajustará automáticamente a la pantalla"
                },
                preview: "Vista previa"
            }
        },
        Image: {
            label: "Imagen con texto encima",
            prev: "Imagen con texto encima no establecidos todavía...",
            form: {
                image: {
                    label: "URL de la imagen",
                    placeholder: "Haz click aquí para seleccionar la imagen",
                    help: "Esta será la imagen que aparecerá en el elemento."
                },
                caption: {
                    label: "Leyenda de la imagen",
                    help: "Si estableces un texto, éste será la leyenda de la imagen"
                },
                preview: "Vista previa"
            }
        },
        LatexFormula: {
            label: "Fórmula LaTeX",
            prev: "Fórmula no establecida todavía...",
            form: {
                caption: {
                    label: "Leyenda de la fórmula",
                    placeholder: "Ejemplo: Fórmula cuadrática",
                    help: "Esta leyenda aparecerá bajo la fórmula y como bloque de texto"
                },
                formula: {
                    label: "Fórmula en formato LaTex",
                    placeholder: "Ejemplo: \\text{La Fórmula Cuadrática es }x = \\frac {-b \\pm \\sqrt {b^2 - 4ac}}{2a}",
                    help: "Usa el área de texto para escribir la fórmula. Debajo de este área aparecerá un previo de la fórmula en caso de que sea correcta o el texto en rojo si la fórmula no es correcta"
                }
            }
        },
        ImageAndText: {
            label: "Imagen y texto",
            prev: "Imagen y texto no establecidos todavía...",
            form: {
                image: {
                    label: "URL de la imagen",
                    placeholder: "Haz click aquí para seleccionar la imagen",
                    help: "Esta será la imagen que aparezca en el elemento. Puedes escoger una de tus imagenes subidas o bien subir una nueva."
                },
                text: {
                    label: "En este editor de texto puedes escribir el contenido del bloque.",
                    help: "Debes escribir obligatoriamente un texto."
                },
                preview: "Vista previa de la imagen",
                layout: {
                    label: "Orientación",
                    help: "La orientación de un bloque de imagen y texto establece dónde aparece cada uno de los elementos en el bloque.",
                    values: {
                        0: "Texto a la derecha, imagen a la izquierda",
                        1: "Texto a la izquierda, imagen a la derecha"
                    }
                }
            }
        },
        Video: {
            label: "Vídeo",
            prev: "Vídeo no establecido todavía...",
            form: {
                url: {
                    label: "URL del vídeo",
                    placeholder: "Ejempplo: https://example.com/video.mp4",
                    help: "Usa la entrada de texto para introducir la URL de tu vídeo (youtube, vimeo...)"
                }
            }
        },
        InteractiveVideo: {
            label: "Vídeo interactivo",
            prev: "Vídeo interactivo no establecido todavía",
            form: {
                url: {
                    label: "URL del vídeo",
                    placeholder: "Ejemplo: https://indieopen.upct.es/video/embed?v=b1a9820b0a0c4e8cba2c51d456c03074",
                    help: "Use el ingreso de texto para introducir la URL del video interactivo creado con la herramienta de video interactivo."
                }
            }
        },
        ColumnLayout: {
            label: "Disposición",
            columnsLabel: "columnas"
        },
        TabsContainer: {
            label: "Menú de pestañas",
            itemLabel: "Pestañas"
        },
        TabContent: {
            label: "Pestaña",
            form: {
                name: {
                    label: "Nombre de la pestaña",
                    placeholder: "Ejempplo: Habilidades profesionales",
                    help: "Este será el nombre que aparezca en el título de la pestaña."
                }
            }
        },
        AcordionContainer: {
            label: "Menú acordeón"
        },
        AcordionContent: {
            label: "Grupo de contenido",
            form: {
                title: {
                    label: "Título del contenido",
                    placeholder: "Ejempplo: Habilidades profesionales",
                    help: "Establece el título del grupo de contenido. Aparecerá en el título del menú despelgable."
                }
            }
        },
        DragdropContainer: {
            label: "Arrastrar y soltar"
        },
        DragdropItem: {
            label: "Término-definición",
            prev: "Ítem no establecido...",
            form: {
                term: {
                    label: "Término",
                    placeholder: "Ejemplo: Libertad de expresión",
                    help: "El término aparece a la izquierda del elemento interactivo y será el que tenga que arrastrar el alumno y soltarlo en la definición."
                },
                definition: {
                    label: "Definición",
                    placeholder: "Ejemplo: Todos los seres humanos tienen derecho de expresarse sin ser hostigados debido a lo que opinan",
                    help: "La definición aparece a la derecha del elemento interactivo y el alumno deberá arrastrar el término a la definición"
                }
            }
        },
        AnimationContainer: {
            label: "Animación",
            form: {
                width: {
                    label: "Anchura de la animación",
                    placeholder: "Ejemplo: 400",
                    help: "Esta será la anchura del contenedor de la animación en píxeles"
                },
                height: {
                    label: "Altura de la animación",
                    placeholder: "Ejemplo: 200",
                    help: "Esta será la altura del contenedor de la animación en píxeles"
                },
                image: {
                    label: "URL de la imagen",
                    placeholder: "Haz click aquí para seleccionar la imagen",
                    help: "Esta será la imagen que aparezca en el elemento. Puedes escoger una de tus imagenes subidas o bien subir una nueva."
                },
                prev: "Vista previa de la imagen preview"
            }
        },
        AnimationItem: {
            label: "Item de la animación.",
            prev: "Item de la animación no establecido todavía...",
            form: {
                image: {
                    label: "URL de la imagen",
                    placeholder: "Haz click aquí para seleccionar la imagen",
                    help: "Esta será la imagen del item de la animación."
                },
                prev: "Vista previa"
            }
        },
        Test: {
            label: "Tipo Test",
            questionSelect: "Selecciona un tipo de pregunta que quieras añadir al test"
        },
        GapQuestion: {
            label: "Pregunta de rellenar el hueco",
            prev: "Pregunta de rellenar el hueco no establecida todavía  ...",
            form: {
                questionText: {
                    label: "Texto de la pregunta",
                    placeholder: "Texto de la pregunta con el elemento [blank] en blanco",
                    help: "Debe escribir el texto de la pregunta con el espacio en blanco que desea con la palabra clave especial [blank]."
                },
                questionPreview: {
                    label: "Vista previa del texto de la pregunta.",
                    placeholder: "Texto de la pregunta con el hueco ___ en blanco.",
                    help: "Así es como se verá la pregunta en la unidad de contenido."
                },
                answers: {
                    label: "Posibles respuestas",
                    help: "Debes escribir al menos 2 respuestas y marcar cuál de ellas es la correcta."
                }
            }
        },
        SimpleQuestion: {
            label: "Pregunta simple",
            prev: "Pregunta simple no establecida todavía ...",
            form: {
                questionText: {
                    label: "Texto de la pregunta",
                    placeholder: "Texto de la pregunta simple...",
                    help: "Este es el texto de la pregunta se mostrará en la unidad de contenido."
                },
                answers: {
                    label: "Posibles respuestas",
                    help: "Debes escribir al menos 2 respuestas y marcar cuál de ellas es la correcta."
                }
            }
        },
        TrueFalseQuestion: {
            label: "Pregunta de verdadero o falso",
            prev: "Pregunta de verdadero o falso nbo establecida todavía ...",
            form: {
                questionText: {
                    label: "Texto de la pregunta text",
                    placeholder: "Texto de la pregunta...",
                    help: "Este es el texto de la pregunta se mostrará en la unidad de contenido."
                },
                answer: {
                    label: "Respuesta correcta",
                    true: "Verdadero",
                    false: "Falso",
                    help: "Selecciona entre verdaero o falso como respuesta correcta"
                }
            }
        },
        TrueFalseContainer: {
            label: "Verdadero/falso",
            prev: "Verdadero/falso no establecido todavía ...",
        },
        TrueFalseItem: {
            label: "Item verdadero/falso",
            prev: "Item verdadero/falso no establecido todavía ...",
            form: {
                questionText: {
                    label: "Texto del ítem",
                    placeholder: "Texto del ítem...",
                    help: "Este es el texto del ítem."
                },
                answer: {
                    label: "Respuesta correcta",
                    true: "Verdadero",
                    false: "Falso",
                    help: "Selecciona entre verdaero o falso como respuesta correcta"
                }
            }
        },
        AudioTermContainer: {
            label: "Audio-términos"
        },
        AudioTermItem: {
            label: "Audio-término",
            prev: "Audio-término no establecido todavía ...",
            form: {
                term: {
                    label: "Término",
                    placeholder: "Escribe aquí tu término...",
                    help: "Este será el término colocado a la izquierda del widget"
                },
                definition: {
                    label: "Definición",
                    placeholder: "Escribe la definición ...",
                    help: "Esta definición debe ser la transcripción textual del audio."
                },
                audio: {
                    label: "URL del fichero de audio",
                    placeholder: "Introduce una URL válida ...",
                    help: "Se debe introducir la URL del audio que se desea reproducir en la unidad de contenido."
                }
            }
        },
        CouplesContainer: {
            label: "Parejas",
            prev: "Parejas no establecidas todavía ..."
        },
        CouplesItem: {
            label: "Pareja",
            prev: "Pareja no establecida not yet set ...",
            form: {
                image: {
                    label: "URL de la imagen",
                    placeholder: "Introduce la URL de la imagen aquí ...",
                    help: "Esta imagen estará asociada con el texto que se introduzca como pareja en este formulario."
                },
                text: {
                    label: "Texto",
                    placeholder: "Escribe un texto...",
                    help: "Este texto estará asociado con la imagen que se introduzca como pareja en este formulario."
                },
                preview: "Vista previa de la imagen"
            }
        },
        ChooseOption: {
            label: "Escoger una opción",
            prev: "Escoger una opción no establecido ...",
            form: {
                text: {
                    label: "Texto",
                    placeholder: "Escribe el texto aquí...",
                    help: "Este texto aparecerá por encima de la imagen en forma de texto o pregunta."
                },
                image: {
                    label: "URL de la imagen",
                    placeholder: "Introduce la URL de la imagen...",
                    help: "La imagen saldrá en la parte superior del widget, por encima de las opciones."
                },
                preview: "Vista previa de la imagen",
                options: {
                    label: "Opciones",
                    placeholder: "Escribe una opción",
                    help: "Estas 4 opciones aparecerán debajo de la imagen. Solo una puede ser correcta."
                }
            }
        },
        ImageAndSoundContainer: {
            label: "Imagen y sonido"
        },
        ImageAndSoundItem: {
            label: "Ítem de imagen y sonido",
            prev: "Ítem de imagen y sonido no establecido todavía ...",
            form: {
                audio: {
                    label: "URL del fichero de audio",
                    placeholder: "Escribe una URL válida ...",
                    help: "El fichero de audio se reproducirá cuando se haga click en la imagen."
                },
                image: {
                    label: "URL de la imagen",
                    placeholder: "Introduce la URL de la imagen...",
                    help: "La imagen aparecerá primer"
                },
                text: {
                    label: "Texto de la imagen",
                    placeholder: "Escribe un texto...",
                    help: "El texto aparecerá por encima de la imagen cuando se pase el ratón por encima."
                },
                preview: "Vista previa de la imagen"
            }
        },
        SchemaContainer: {
            label: "Esquema"
        },
        SchemaItem: {
            label: "Ítem de esquema",
            prev: "Ítem de esuqema no establecido todavía...",
            form: {
                image: {
                    label: "URL de la imagen",
                    placeholder: "Haz click aquí para seleccionar la imagen",
                    help: "Esta será la imagen parcial del esquema."
                },
                prev: "Vista previa de la imagen"
            }
        },
        Modal: {
            label: "Ventana modal",
            form: {
                text: {
                    label: "Texto del botón",
                    placeholder: "Escribe el texto...",
                    help: "Este texto aparecerá como texto del botón, el cual debe ser accionado para abrir la ventana modal."
                }
            }

        }
    },
    sections: {
        moveUp: "Desplazar sección hacia arriba",
        moveDown: "Desplazar sección hacia abajo",
        edit: "Editar información",
        deleteSection: "Eliminar sección",
        label: "Sección",
        form: {
            name: {
                label: "Nombre de la sección",
                placeholder: "Escribe un nombre ...",
                help: "Este es el nombre que tendrá la sección en el contenido."
            },
            bookmark: {
                label: "Marcador de la sección",
                placeholder: "Escribe un marcador ...",
                help: "Este marcador aparecerá en la parte superior de la unidad como marcador de sección. Debe tener un máximo de 40 caracteres."
            },
            image: {
                label: "URL de la imagen de fondo",
                placeholder: "Introduce la URL de la imagen ...",
                help: ""
            },
            type: {
                label: "Tipo de fondo",
                bc: "Color de fondo (por defecto)",
                bi: "Imagen de fondo",
                help: "Si el tipo se establece a 'color de fondo', el color por defecto aparecerá por detrás del título mientras que en 'Imagen de fondo' debes establecer una imagen de fondo para la sección de cabecera."
            },
            preview: "Vista previa de la imagen de fondo"
        }
    },
    items: {
        edit: "Editar contenido",
        add: "Añadir contenido",
        delete: "Eliminar elemento"
    },
    buttons: {
        toggleCategories: "Mostrar/Ocultar categorías",
        viewImage: "Ver imagen"
    },
    errors: {
        common: {
            name: {
                invalid: "Debes proporcionar un nombre para esta instancia.",
                notUniqueName: "El nombre de la instancia debe ser único en todo el contenido."
            }
        },
        section: {
            emptyData: "Una sección no puede estar vacía. Debes añadir al menos un elemento.",
            invalidImage: "La sección debe tener una imagen de fondo.",
            invalidName: "La sección debe tener un nombre.",
            invalidBookmark: "La sección debe tener un marcador válido.",
            typeImageNotSelected: "Si el tipo seleccionado es  Imagen de fondo, debes establecer la imagen."
        },
        AcordionContainer: {
            data: {
                empty: "El acordeón está vacío. Debes añadir contenido usando el botón de añadir a la derecha."
            }
        },
        AcordoinContent: {
            data: {
                empty: "El contenedor está vacío. Debes añadir al menos un elemento al contenedor."
            },
            title: {
                invalid: "El título del contenedor no es válido. Debes establecer uno."
            }
        },
        Blockquote: {
            quote: {
                invalid: "No has escrito el contenido de la cita. Debes, al menos, escribir el contenido."
            }
        },
        ColumnLayout: {
            data: {
                empty: "Todas las columnas de la disposición deben contener al menos un elemento arrastrándolo desde la paleta de la izquierda."
            },
        },
        DragdropContainer: {
            data: {
                empty: "El elemento está vacío. Debes añadir al menos un ítem término-definición usando el botón de añadir a la derecha."
            }
        },
        DragpdropItem: {
            term: {
                invalid: "El campo término está vacío. Debes escribir un término."
            },
            definition: {
                invalid: "El campo definición está vacío. Debes escribir una definición."
            }
        },
        Image: {
            image: {
                invalid: "La URL establecida para la imagen no es válida. Debes asegurarte de proporcionar una URL válida en el campo imagen."
            },
            text: {
                invalid: "El texto está vacío. debes escribir un texto"
            }
        },
        ImageAndText: {
            image: {
                invalid: "La URL establecida para la imagen no es válida. Debes asegurarte de proporcionar una URL válida en el campo imagen."
            },
            text: {
                invalid: "El texto está vacío. Debes redactar o copiar un texto."
            }
        },
        LatexFormula: {
            formula: {
                invalid: "Debes proporcionar una fórmula en el formato LaTex."
            },
            caption: {
                invalid: "Debes proporcionar una leyenda de la fórmula."
            }
        },
        AnimationContainer: {
            width: {
                invalid: "El ancho de la animación debe ser mayor que 0."
            },
            height: {
                invalid: "El alto de la animación debe ser mayor que  0."
            },
            image: {
                invalid: "La URL establecida para la imagen no es válida. Debes asegurarte de proporcionar una URL válida en el campo imagen."
            },
            data: {
                empty: "La animación está vacía. Debes añadir al menos un ítem usando el botón de añadir."
            }
        },
        AnimationItem: {
            image: {
                invalid: "La URL establecida para la imagen no es válida. Debes asegurarte de proporcionar una URL válida en el campo imagen."
            }
        },
        TabContent: {
            data: {
                empty: "La pestaña está vacía. You must add at least one element to the tab."
            },
            name: {
                invalid: "El nombre de la pestaña no es válido. Debes estalecer uno."
            }
        },
        TabsContainer: {
            data: {
                empty: "El menú de pestañas no contiene pestañas. Debes añadir al menos una."
            }
        },
        TextBlock: {
            text: {
                invalid: "The text is empty. You must write a small text."
            }
        },
        SchemaContainer: {
            width: {
                invalid: "Eñ  must be greater than 0."
            },
            height: {
                invalid: "The animation height must be greater than 0."
            },
            image: {
                invalid: "La URL establecida para la imagen completa no es válida. Debes asegurarte de proporcionar una URL válida."
            },
            data: {
                empty: "El esquema está vacío. Debes añadir al menos un ítem usando el botón de añadir de la derecha."
            }
        },
        SchemaItem: {
            image: {
                invalid: "La URL establecida para la imagen no es válida. Debes asegurarte de proporcionar una URL válida en el campo imagen."
            },
            text: {
                invalid: "El texto está vacío. Debes escribir un pequeño texto."
            }
        },
        TabContent: {
            data: {
                empty: "La pestaña está vacía. Debes añadir al menos un elemento a la pestaña."
            },
            name: {
                invalid: "El nombre de la pestaña no es válido. Debes establecer uno."
            }
        },
        TabsContainer: {
            data: {
                empty: "El menú de pestañas no contiene pestañas. Debes añadir al menos una usando el botón de añadir a la derecha."
            }
        },
        TextBlock: {
            text: {
                invalid: "El texto está vacío. Debes escribir un pequeño texto."
            }
        },
        Video: {
            videourl: {
                invalid: "La URL establecida para el vídeo no es válida. Debes asegurarte de proporcionar una URL válida."
            }
        }
    },
    messages: {
        successMessage: "Ok",
        warningMessage: "Atención",
        errorMessage: "Error",
        contentErrors: "¡Ups! Hay errores en tu contenido. Revisa los mensajes de error y sigue sus indicaciones para arreglarlos.",
        noErrors: "¡Bien! No hay errores. Puedes proceder a guardar el contenido.",
        changesSaved: "Cambios guardados correctamente.",
        deletedSection: "Sección eliminada correctamente",
        confirmClearContent: "Vas a eliminar el contenido por completo. Asegúrate de que es lo que realmente deseas hacer.",
        contentCleared: "Contenido eliminado correctamente.",
        emptyContent: "No has añadido contenido.",
        noRedo: "Nada que rehacer",
        noUndo: "Nada que deshacer"
    },
    general: {
        areYouSure: "¿Estás seguro?",
        delete: "Eliminar",
        confirm: "Confirmar",
        cancel: "Cancelar",
        true: "Verdadero",
        false: "Falso"
    }
}