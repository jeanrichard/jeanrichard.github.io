# Landing Page Project

This repository contains the code for Project 2 — [_Landing Page_](https://en.wikipedia.org/wiki/Landing_page) of the Udacity Nanodegree Front End Web Developer (2023).

**ⓘ Note:** This project is based on the starter project at https://github.com/udacity/cd0428-landing-page/. The instructions have been kept as-is in the section [Instructions](#instructions).

Content:

- [1. Instructions](#instructions)
- [2. Design notes](#design-notes)
- [3. Sources and assets](#sources-and-assets)
- [4. Additional references](#additional-references)
- [5. Tools used](#tools-used)

<a id="instructions"></a>

## 1. Instructions

The starter project has some HTML and CSS styling to display a static version of the Landing Page project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality.

For specific, detailed instructions, look at the project instructions in the Udacity Classroom.

<a id="design-notes"></a>

## 2. Design notes

TODO

<a id="sources-and-assets"></a>

## 3. Sources and assets

TODO

<a id="additional-references"></a>

## 4. Additional references

TODO

<a id="tools-used"></a>

## 5. Tools used

- [Visual Studio Code](https://code.visualstudio.com/).
  Use: IDE.
  **Extensions:**

  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
    Use: Linter for JavaSCript.

  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    Use: Linter/formatter for JavaScript, HTML and CSS files.

  - [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
    Use: Linter for CSS files.
    **Plugins:**

    - [stylelint-config-idiomatic-order ](https://github.com/ream88/stylelint-config-idiomatic-order)
      Use: Automatically reorder CSS properties according to [Principles of writing consistent, idiomatic CSS](https://github.com/necolas/idiomatic-css#declaration-order).

- Chrome extensions:

  - [axe DevTools - Web Accessibility Testing](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)
    Use: Web Accessibility Testing

- Online tools:

  - [Lorem Ipsum Generator](https://www.lipsum.com/feed/html)
    Use: Generate mock text content

  - [PX to REM Converter](https://codebeautify.org/px-to-rem-converter)
    Use: Convert between `px`, `rem` and `em`.

**ⓘ Note:** Visual Studio Code come with language support for JavaScript and TypeScript. We put `// @ts-check` at the top of all JavaScript files to benefit from the power of the TypeScript compiler. See [_JS Projects Utilizing TypeScript_](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html).

### How to run Stylelint with plugins

There is an official VS Code [Stylelint extension](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint), but we did not figure out how to install plugins.

We managed to get a working setup using the VS Code [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers):

1. Install Docker and make it possible to manage it as non-root.
2. Create _.devcontainer.json_:

   ```json
   {
     "image": "mcr.microsoft.com/devcontainers/javascript-node:20"
   }
   ```

3. Use the Command Palette: `Dev Containers: Reopen in Container`.
4. Open a terminal inside the container.
5. Install Stylelint and the plugin:

   ```bash
   npm init
   # ... omitted ...

   npm init stylelint
   # ... omitted ...

   npm install --save-dev stylelint-config-idiomatic-order
   # ... omitted ...
   ```

6. Create _.stylelintrc.json_:

   ```json
   {
     "extends": ["stylelint-config-idiomatic-order"]
   }
   ```

7. Run:

   ```bash
   # Report violations:
   npx stylelint "./css/*.css"

   # Fix violations:
   npx stylelint --fix "./css/*.css"
   ```

**ⓘ Note:** StyleLint does not understand [BEM](https://bem.info/) out⁻of-the-box. We added the following comment near the top in _styles.css_:

```css
/* stylelint-disable selector-class-pattern, selector-id-pattern */
```

It looks like there is a [stylelint-selector-bem-pattern](https://github.com/simonsmith/stylelint-selector-bem-pattern) plugin but we did not try it.
