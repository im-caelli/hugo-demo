# Lesson Listings

SSG page for filterable item listings

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

- Structure
- Content

I've set this up in a way that separates them as much as possible to mitigate things breaking and make it easier to update. Structure is the functionality and base structure and styling is set, but you can edit them and there will be instances where you may need to make changes. Content pertains to the individual pieces of content that you should be able to manage (add/edit/remove) with minimal interaction with the structure, especially once the functionality and look and feel has been established.

### Structure

#### Overview

-  Functionality
   -  You can find the js that enables alot of the filtering functionality in `main.js`
   -  You shouldn't need to touch this much
-  Styles
   -  You can add your style overrides in `_overrides.scss`
   -  This is loaded on top of the base so you can change things without breaking anything
-  Layouts
   -  The defaults has been made more generic. Content specific mark up has been separated and gets progmatically called
   -  The only markup that you would need to interact with in relation to content updates is the navigation (categories, tag suggestion)
   -  Each curriculum (section) would need its specific navigation matching the section name. Ie. the `/arts` page will render `navigation/arts.html` which contains the art categories and tags

#### Updating the Styles

- You can google any css resource to help you achieve a specific look and simply dump any styles you want in `_overrides.scss`
- You can use `.layout-<section name>` as a selector if you want variance between each "curriculum"


#### Updating Navigation

- The html templates for the navigation is located in `layouts > partials > navigation` folder. 
- The template's name should match the section it will appear in. The navigation template for the `/arts` listing is `arts.html`
  - If you create a new section called `science` under `content`, you would need to create a `science.html` file under the `layouts > partials > navigation` folder


### Content



### Deployment