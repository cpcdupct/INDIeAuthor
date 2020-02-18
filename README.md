# INDIeAuthor - v 1.3.0

![logoIndie](http://indie.upct.es/images/logos/indie_vertical_ColorOscuro_small.png)

### What is INDIe?
INDIe is an Erasmus + Project (2018-1-ES01-KA201-050924) in the field of school education, that falls within the category of “Strategic Partnerships supporting innovation”. It started on September 1st 2018 and will last three years up to August 31st 2021. It is coordinated by the Universidad Politécnica de Cartagena, Spain, through the Digital Content Creation Center (https://cpcd.upct.es), which mission is to empower teachers for an improved learning process.

The INDIE project aims at boosting the use of digital instructional contents for education in both primary and secondary schools by 1) providing a tool to help teachers to become authors of rich digital learning units 2) creating repositories on a regional level where authors publish their learning units and other teachers can become “consumers” of this material for their own classes.

The objective is to empower the teachers so that they can deliver high quality teaching and help them adopting new learning methodologies: flipped classroom, blended learning, adaptive learning, etc…, which are student centred and seek to ensure that learners are engaged and drive their individual learning experience. As an output of the project, a number of teachers/authors will have created digital contents, used them in class, and published them in the repository for others teachers to use, but, more importantly, the structure will be set up, at a regional level, for the regional authorities for education to promote a much wider use of the platform within the community of teachers and schools, by launching official calls for training and creating digital contents.

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
* Bootbox
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
INDIeAuthor has been created at **Digital Content Creation Center** (CPCD), in the Universidad Politécnica de Cartagena.

## License
Apache License 2.0