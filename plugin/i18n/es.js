indieauthor.strings = {
    palette: {
        simpleElements: "Elementos",
        items: "ítems",
        layouts: "Disposiciones",
        containers: "Contenedores",
        interactiveElements: "Elementos interactivos"
    },
    widgets: {
        TextBlock: {
            label: "Bloque de texto",
            prev: "Texto no establecido todavía...",
            form: {
                label: "En este editor de texto puedes escribir el contenido del bloque.",
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
        Image: {
            label: "Imagen",
            prev: "Imagen no establecida todavía...",
            form: {
                image: {
                    label: "URL de la imagen",
                    placeholder: "Haz click aquí para seleccionar la imagen",
                    help: "Esta será la imagen que aparezca en el elemento. Puedes escoger una de tus imagenes subidas o bien subir una nueva."
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
        SchemaContainer: {
            label: "Esquema",
            form: {
                size: {
                    label: "Tamaño del esquema",
                    placeholder: "Ejemplo: 400",
                    help: "Este será el tamaño en píxels del contenedor del esquema"
                },
                image: {
                    label: "URL de la imagen",
                    placeholder: "Haz click aquí para seleccionar la imagen",
                    help: "Esta será la imagen completa del esquema."
                },
                prev: "Vista previa de la imagen"
            }
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
                text: {
                    label: "Texto clicable",
                    placeholder: "Ejemplo: Principios",
                    help: "Este texto se situará dentro del cuadrito que el alumno deberá pulsar para que aparezca la imagen parcial."
                },
                prev: "Vista previa de la imagen"
            }
        }
    },
    sections: {
        moveUp: "Desplazar sección hacia arriba",
        moveDown: "Desplazar sección hacia abajo",
        edit: "Editar información",
        deleteSection: "Eliminar sección",
        label: "Sección"
    },
    items: {
        edit: "Editar contenido",
        add: "Añadir contenido",
        delete: "Eliminar elemento"
    },
    buttons: {
        toggleCategories: "Mostrar/Ocultar categorías"
    },
    errors: {
        section: {
            emptyData: "Una sección no puede estar vacía. Debes añadir al menos un elemento."
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
        SchemaContainer: {
            size: {
                invalid: "Debes escribir el tamaño."
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
    },
    general: {
        areYouSure: "¿Estás seguro?",
        delete: "Eliminar",
        confirm: "Confirmar",
        cancel: "Cancelar"
    }
}