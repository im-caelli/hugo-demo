# Lesson Listings

SSG page for filterable item listings

- [Lesson Listings](#lesson-listings)
  - [Project](#project)
    - [Tools](#tools)
    - [Cheatsheet](#cheatsheet)
    - [Scaffolding](#scaffolding)
  - [Updating the Site](#updating-the-site)
    - [Content](#content)
    - [Structure](#structure)
      - [Updating the Styles](#updating-the-styles)
      - [Creating / Updating the Navigation](#creating--updating-the-navigation)
    - [Deployment](#deployment)


## Project

This project uses hugo to generate a static site. Git will be used to manage the code and deploy the site.

### Tools

- Hugo
  - https://gohugo.io/getting-started/quick-start/
  - https://gohugo.io/installation/
  - https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
  - https://gohugo.io/getting-started/quick-start/#commands
- Git
  - You can use git commands in the terminal
  - The desktop app is more user friendly: https://desktop.github.com/download/
- A code editor of your choice

### Cheatsheet

- `hugo server` - Start a server
  - `hugo` - Build the site
  - `hugo mod clean --all` - Clear Cache
  
### Scaffolding

Folder structure and items marked with (*) are relevant directories and files for updates. 

```
root
├── archetypes (Contains front matter definitions for the content type)
├── assets
│   ├── js (Contains js functiality)
│   │   └── main.js 
│   └── sass (Contains js styles)
│       ├── _overrides.scss *
│       └── main.scss
├── content (Contains content)
|   └── curriculum *
|       └──  lesson.md *
├── layouts (Contains templates for markup)
│   └── _default 
│   └── partials
│       └── navigation 
|           └── curriculum.html *     
├── static (Contains static resources)
    └── images *
```

## Updating the Site

Static sites / end presentation is the combination of combine both, but there's two separate things to keep in mind when trying to update the site.

- Content
- Structure

I've set this up in a way that separates them as much as possible to mitigate things breaking and make it easier to update. Structure is the functionality and base structure and styling is set, but you can edit them and there will be instances where you may need to make changes. Content pertains to the individual pieces of content that you should be able to manage (add/edit/remove) with minimal interaction with the structure, especially once the functionality and look and feel has been established.

### Content

- Content directory is where the content is
- Top level folders within the content directory is called a **section**
  - This should represent your **"curriculum"**
  - These folders would contain the files representing each **"lesson"**
  - You can further orgranize folder categories within it, but all the lessons will show up in the singular section listing only. 
    - There are no further paginations. ie The path `/arts/painting/` doesn't exist
    - But I added the functionality to filter the list with url parameters as well
      - `/arts/?category=painting` will filter the page on load
- The file name could be named anything with an `.md` extentions
- Each content file should have the following:

**Example content:**

```
+++
draft = false
title = 'Lesson 4 - Drawing'
link = "#"
image = "/images/icon.png"
type = "arts"
category = ["drawing"]
tags = ["charcoal"]
+++
```

- Draft: `true` or `false`
  - `false` by default
  - Determines if it's 'published' or not. If set to true, item will not show up.
- Title: `'string'`
  - Determines the title of the item
- Link:  `url`
  - Link to where it's suppsoe to go
- Image: `url`
  - Relative path to the images in the `static/images` folder
- Type: `string`
  - String for the section/curriculum
  - Should match the section/ folder name
- Category: `array`
  - String for the category
  - Lower case
- Tags: `array`
  - String for the tags
  - Lower case
  - Multiple tags must be comma delimited. Example `["charcoal", "pencil"]`
  
### Structure

-  Functionality
   -  You can find the js that enables alot of the filtering functionality in `main.js`
   -  You shouldn't need to touch this much
-  Styles
   -  You can add your style overrides in `_overrides.scss`
   -  This is loaded on top of the base so you can change things without breaking anything
-  Layouts
   -  The defaults has been made more generic. Content specific mark up has been separated and gets progmatically called
   -  You can make edits as necessary to achieve look and feel, but the only markup that you would need to interact with in relation to content updates is the navigation (categories, tag suggestion)
   -  Each curriculum (section) would need its specific navigation matching the section name. Ie. the `/arts` page will render `navigation/arts.html` which contains the art categories and tags

#### Updating the Styles

- You can google any css resource to help you achieve a specific look and simply dump any styles you want in `_overrides.scss`
- You can use `.layout-<section name>` as a selector if you want variance between each "curriculum"

#### Creating / Updating the Navigation

- The html templates for the navigation is located in `layouts > partials > navigation` folder 
- The template's name should match the section it will appear in. The navigation template for the `/arts` listing is `arts.html`
  - If you create a new section called `science` under `content`, you would need to create a `science.html` file under the `layouts > partials > navigation` folder
- You can refer/copy existing templates and modify it
  
**Example of the navigation:**

```html
 <!-- 
    Category Navigation 
    * filterCategory('<category>') determines what suggested words appear in the secondary navigation
    * data-filter="<.category>" determines the category to filter the lessons
-->
<ul class="nav nav-pills justify-content-center lesson-nav lesson-nav-category button-group" data-filter-group="category">
    <li class="nav-item filter-category"><a href="javascript:void(0)" class="nav-link button reset" onclick="filterCategory('all')" data-filter="*">All</a></li>
    <li class="nav-item filter-category"><a href="javascript:void(0)" class="nav-link button" onclick="filterCategory('painting')" data-filter=".painting">Painting</a></li>
    <li class="nav-item filter-category"><a href="javascript:void(0)" class="nav-link button" onclick="filterCategory('drawing')" data-filter=".drawing">Drawing</a></li>
    <li class="nav-item filter-category"><a href="javascript:void(0)" class="nav-link button" onclick="filterCategory('tactile')" data-filter=".tactile">Tactile</a></li>
</ul>

<!-- 
    Tag Navigation 
    * filter-tag-<category> is what associates the navigation item with the category navigation
    * Where <category> would match the value set for filterCategory('<category>')
    * data-filter="<.tag>"
-->
<ul class="nav nav-pills justify-content-center lesson-nav lesson-nav-tags button-group" data-filter-group="tags">
    <li class="nav-item filter-tag-painting hide"><a href="javascript:void(0)" class="nav-link button" data-filter=".acrylic">Acrylics</a></li>
    <li class="nav-item filter-tag-painting hide"><a href="javascript:void(0)" class="nav-link button" data-filter=".watercolor">Watercolor</a></li>
    <li class="nav-item filter-tag-drawing hide"><a href="javascript:void(0)" class="nav-link button" data-filter=".marker">Marker</a></li>
    <li class="nav-item filter-tag-drawing hide"><a href="javascript:void(0)" class="nav-link button" data-filter=".pencil">Pencil</a></li>
    <li class="nav-item filter-tag-tactile hide"><a href="javascript:void(0)" class="nav-link button" data-filter=".clay">Clay</a></li>
</ul>
```

- A navigation template includes two lists (represented by a `<ul>` tag): one for category, one for tags
- You can add an list item by duplicating an entire `<li>` line and modifying it. For Example:
  - For **categories**, you would need to modify:
    1. `onclick="filterCategory('tactile')"` where `tactile` is the category specified. This determines which tags in the tag navigation to show.
    1. `data-filter=".tactile"` where `tactile` is the category specified. This determines the lessons to filter. The `.` is important.
    2. The word `Tactile` in between the `<a>` represents the title displayed on the button
  - For **tags**, you would need to modify:
    1. `filter-tag-tactile` where `-tactile` is the category specified. It needs to match the string in #1 of the category example above. This determines if it gets displayed when the tactile category is active.
    2. `data-filter=".clay"` where `clay` is the tag specified. This determines the lessons to filter. The `.` is important
    3. The word `Clay` in between the `<a>` represents the title displayed on the button
- The categories / tags should match what is specified in the content file.

### Deployment

- The deployment will be handled with Github workflows / action
- It will build the site automatically each time there is a push made against the main branch.
- For content updates, you can make changes directly on GitHub
- For structural changes where you need to develop locally, you would need to use git to push/pull changes
  - The public and resource folders are no longer tracked