# INDIeAuthor - v 1.4.0

![logoIndie](http://indie.upct.es/images/logos/indie_vertical_ColorOscuro_small.png)

### What is INDIe?
INDIe is an Erasmus + Project (2018-1-ES01-KA201-050924) in the field of school education, that falls within the category of “Strategic Partnerships supporting innovation”. It started on September 1st 2018 and will last three years, up to August 31st, 2021. It is coordinated by the Universidad Politécnica de Cartagena, Spain, through the Digital Content Creation Center (https://cpcd.upct.es), whose mission is to empower teachers for an improved learning process.

The INDIE project aims to boots the use of digital instructional contents for education in both primary and secondary schools by 1) providing a tool to help teachers become authors of rich digital learning units 2) creating repositories on a regional level where authors can publish their learning units and other teachers can become “consumers” of this material for their own classes.

The objective is to empower teachers so that they can deliver high-quality teaching and help them adopt new learning methodologies: flipped classroom, blended learning, adaptive learning, among others. These methodologies are student centred and seek to ensure that learners are engaged and can control their individual learning experience. As an output of the project, a number of teachers/authors will have created digital contents, used them in class, and published them in the repository for others teachers to use. More importantly, the structure will be set up at a regional level to enable regional education authorities to promote a much wider use of the platform within the community of teachers and schools, by launching official calls for training and by creating digital contents.

# The library
INDIeauthor is a Javascript-based graphical user interface for creating content units within [INDIe Project](https://indie.upct.es/).

## Dependencies
INDIeAuthor has well-known dependencies to work:
* JQuery
* Popper
* Bootstrap
* Toastr
* Handlebars
* Trumbowyg
* Katex and auto-render
* Modernizr
* Stickybits
* bootprompt
* Dragula

## Usage
In the **index.html** file there is an example of how to use the library in a web page.

The library must be initialized when the page loads:

```html
<script type="text/javascript">
    /** Entry point */
    (function () {
        stickybits('.bd-navbar');
        
        var domPalette = document.getElementById('palette');
        var domContainer = document.getElementById('main-container');
        
        indieauthor.init(domPalette, domContainer, function ({

        });

    })();
</script>
```

## Creators and contributors
INDIeAuthor has been created at the **Digital Content Creation Center** (CPCD), in the Universidad Politécnica de Cartagena.

## License
Apache License 2.0

#### The European Commission support for the production of this publication does not constitute an endorsement of the contents which reflects the views only of the authors, and the Commission cannot be held responsible for any use which may be made of the information contained therein.
