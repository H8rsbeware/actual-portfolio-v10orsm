## Optimisation

#### Lighthouse
Lighthouse is a chromium extension made by google which, when run on a site, returns a variety of useful statistics:

- Performance
    - **first contentful paint** - time when to load the first text or image
    - **speed index** - time taken to populate the page
    - **largest contentful paint** - time when the largest image or text is loaded
    - **time to interactive** - time taken for the page to become fully interactive
    - **total blocking time** - total time between **first contentful paint** and **time to interactive**
    - **cumulative layout shift** - movement of visual elements within the viewport
- Accessibility - the ability for all users to access and understand content, providing a robust experience for any with disabilities, googles guideline can be found [here](https://web.dev/accessible/)
- Best practices - Ensuring security, functionality, and consistency. For example:
    - using https
    - no errors 
    - images served correctly
    - avoid locational data and requesting notification permission
    - avoid libraries with vunerabilities
- SEO (search engine optimisation)
    - allow for crawling and indexing
    - correct page metadata
    - inclusion of alt, title, and viewport elements
    - font is legible
- PWA - googles progressive web app certificate.

Each page requires a different report, these were run on the 23/12/2022 ([PRIVATE commit : 616ef2a](https://github.falmouth.ac.uk/Games-Academy-Student-Work-22-23/web230-os259357/commit/616ef2acf9dfb9f06bb598a612bc14dc6f0e6a4c)), and the full results can be found in the Lighthouse reports directory, within this one. 

Here are the key issues highlighted by lighthouse (if location isnt specified, its multiple):

- [Performance] Unused CSS and Javascript across pages that dont need it, like fontawesome on pages with no icon, and jquery on pages with DOM modification.
- [Performance] Image elements without defined widths and heights 
- [Performance] Long initial server response times steming from the server.js file doing too much
- [Performance] Long wait times for bootstrap and fontawesome (cant really be helped.)

- [Performance] In projects.html, most content is generated through JS, leading it to have to lowest score at 87/100, although theres some improvements to be had by fixing perfomance issues mentioned above.

- [Accessiblity] Missing link text, hidden to screen readers

- [Practices] Errors logged in contacts.html : `failed to find form.js` as i forgot to remove it from the html file when I deleted it, and `refused to execute form.js cause mime type 'text/html' is not executable`.

- [SEO] Missing some metatags
- [SEO] Link not crawlable in about.html
- [SEO] Link missing discriptive text in about.html, index.html, and contact.html

Fixes included
- removing form.js reference from contacts.html which was causing console errors
`<script src="form.js"></script>` -> Commented out
- removing unused references to third parties from appropriate files mostly font awesome, which was present on all pages
`<script src="https://kit.fontawesome.com/272018ad02.js" crossorigin="anonymous"></script>` -> Commented out on some pages.
- Missing link text was caused by unused link with no text in the nav bar on all sites
`<a class="navbar-brand" href="#"></a>` -> Commented out
- adding more discriptive visible text to the links in projects, caused by a link attatched to the word "here"
`<a class="title" href="./projects.html">here</a>` -> `<a class="title" href="./projects.html">at my project page</a>`

- adding more meta tags to all files
```html
    <!-- ADDED META TAGS -->
    <meta name="description" content="Software development ...">
    <meta name="keywords" content="Software, Web development, Portfolio, ...">
    <meta name="author" content="Oakley S">
```
- Links not crawlable in about, index, and contacts.html are caused by an anchor tag being used as a button, which is standard in bootstrap
`<a type="button" id="drop-btn" class="...">See Journey <br><i class="icon"></i></a>` -> `<span ...>See Journey<i ...></i></span>`

What I cant/dont need to fix
- Image element width and height are defined in css, although when the images are filled in from placeholders, I may fix this too
- Wait times for third parties, unfortunately bootstrap is required for the majority of content on my page to be functional, so having it load later doesnt actually make the site usable faster. Fontawesome has a short load time
- The server.js file is as light as possible for functionality, and has no other files accessing it. Therefore reducing its wait time is not really plausible.



**comments can be found where changes have been made**


#### Improvements

- Index
    - Perfomance : 94 -> 95
    - Accessibility : 97 -> 100
    - Best Practices : 100 -> 100
    - SEO : 83 -> 100

- About
    - Perfomance : 91 -> 91
    - Accessibility : 96 -> 100
    - Best Practices : 100 -> 100
    - SEO : 73 -> 100

- Portfolio
    - Perfomance : 95 -> 95
    - Accessibility : 97 -> 97
    - Best Practices : 100 -> 100
    - SEO : 91 -> 100

- Projects
    - Perfomance : 87 -> 92  
    - Accessibility : 97 -> 100
    - Best Practices : 100 -> 100
    - SEO : 92 -> 100

- Contacts
    - Perfomance : 91 -> 97
    - Accessibility : 97 -> 100
    - Best Practices : 92 -> 100
    - SEO : 91 -> 100



#### Other issues I found

###### Projects.js

While searching through the code for potential performance issues, I realised that Id made a poor decision. This script is responsible for all project cards html, generating it, and displaying it. One part of this, is querying the screen size and then parsing the amount of cards per row to make it "responsive", the smaller the screen, the fewer cards per row.

```javascript
function screenToColumn(){
    //gets width of the window
    let width = window.innerWidth;
    console.log(width)
    //returns a tuple [number of cards per row, bootstrap column width (max 12)]
    if(width > 2000){ return [4,2] }
    if(width > 1400){ return [3,3] }
    if(width > 900){ return [2,5]}
    if(width <= 900){ return [1,8] }
    //If for some reason things go wrong, it defaults.
    console.log("defaulted")
    return [3,3]
}

...

$(window).on('resize', ()=>{
    //complete list rebuild
    main()
})
```

The problem was, this required an event listener, and at some point I decided it would call the `main()` function (regenerating all the cards and redrawing them) everytime the width value changed. I then realised that the logic could be reduced, just checking the `screenToColumn()` function each time it was updated, and if the values changed, then calling the `main()` function.

``` javascript
var prevScreenResult;

$(window).on('resize', ()=>{
    buf = screenToColumn();
    if (buf != prevScreenResult){
        prevScreenResult = buf;
        main();
    };
})
```

For simplicity, i held a buffer, and then checked the buffer against the new value, if there's a change, then the heavier weight `main` function is called.