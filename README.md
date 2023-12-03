# Landing Page Project

This repository contains the code for Project 2 — [_Landing Page_](https://en.wikipedia.org/wiki/Landing_page) of the Udacity Nanodegree Front End Web Developer (2023).

**ⓘ Note:** This project is based on the starter project at https://github.com/udacity/cd0428-landing-page/. The instructions have been kept as-is in the section [Instructions](#instructions).

Content:

- [1. Instructions](#instructions)
- [2. Design notes](#design-notes)
  - [2.1. Highlight the active section](#active-section)
    - [2.1.1. Approach 1a — Scroll event and active line](#active-section-approach-1a)
    - [2.1.2. Approach 1b — Scroll event and active band](#active-section-approach-1b)
    - [2.1.3. Approach 2 — Intersection Observer API](#active-section-approach-2)
    - [2.1.4. Comparison of approaches](#active-section-comparison-of-approaches)
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

<a id="active-section"></a>

### 2.1. Highlight the active section

To highlight the active section (section in view), we would like to meet the following requirement(s):

- **R1:** By scrolling continuously from top to bottom, each section must be considered active _exactly once_. In other words, no section should be omitted (e.g., because it is the first one or the last one), or skipped over.

<a id="active-section-approach-1a"></a>

#### 2.1.1. Approach 1a — Scroll event and active line

##### Description

This is the approach suggested in the Development Strategy.

In this approach, we define an "active (horizontal) line" in the viewport. As the user scrolls down (or up), the section that straddles that line (if any) is considered active. The line can be described by the distance $d$ from viewport-top to the line. We can use absolute values (e.g., 100px) or relative values (e.g., 20% of viewport-height) for $d$.

In the following diagram, the page is represented by the tall black rectangle, the viewport by the red rectangle, and the sections by blue boxes. The "active line" is represented by the green horizontal line. In this scenario, the user is scrolling down. In case (b), the section straddles the "active line" and is thus considered active.

![A visual depiction of approach 1, where the active range is a line](./doc/approach-1-line.png)

##### Edge cases

As the following edge cases show, Approach 1a requires a little bit of help from the design in order to work in call cases. Case (a): There should be enough space at the top of the page, so that the first section is located below the active line when the page is scrolled all the way to the top. Case (b): There should be enough space at the bottom of the page, so that the last section is located above the active line when the page is scrolled all the way to the bottom.

![A visual depiction of possible edge cases with approach 1](./doc/approach-1-edge-cases.png)

<a id="active-section-approach-1b"></a>

#### 2.1.2. Approach 1b — Scroll event and active band

##### Description

In this approach, instead of a line, we define an "active (horizontal) band" in the viewport. As the user scrolls down (or up), the section that straddles that band (if any) is considered active. The band can be described by the distance $d$ from viewport-top to band-top, and the width $w$ of the band. We can use absolute values (e.g., 100px), relative values (e.g., 20% of viewport-height), or a mixture of both.

Compared to the line, the band provides a little "pause" between 2 active sections when scrolling (assuming that there is no space between consecutive sections).

In the following diagram, we use the same conventions as above for the page, the viewport, and the sections. The "active band" is represented by the green horizontal band. In this scenario, the user is scrolling down. In case (b), the section straddles the "active band" and is thus considered active.

![A visual depiction of approach 1, where the active range is a line](./doc/approach-1-band.png)

##### Edge cases

The 2 edge cases described above for the active line also apply here.

There is one more case we need to take care of: if we want all sections to be active at some point, the width $w$ of the band should not exceed the height of the shortest section. Here, since the CSS property `min-height: 80vh;` applies to all sections, we have a lower bound on the height of the shortest section. We can then use `window.innerHeight` as an approximation for `vh`, and make sure that $w$ is less than or equal to `0.8 * window.innerHeight`.

<a id="active-section-approach-2"></a>

#### 2.1.3. Approach 2 — Intersection Observer API

##### Description

Since 2019, Chrome, Firefox and Safari all support the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

In this approach, we use an observer to monitor the intersection(s) between the sections and the viewport. The observer takes a threshold $0 \leq t \leq 1$. For any given section, we can look at the "visible fraction" $f$ of that section i.e., the fraction of that section visible in the viewport. If $f \geq t$, the section is "in"; otherwise, $f < t$ and the section is "out". Whenever the status of one or more sections changes, the browser executes a callback, provided with the list of those sections impacted. That way, we can easily keep track of the state of all sections in the page. Finally, we define _the_ active section as the first section that is "in" (if any).

In the following diagram, we use the same conventions as above for the page, the viewport, and the sections. The part of a section that is visible in the viewport is colored using a darker shared of blue. In this example, we assume that $t = 60\%$.

![A visual depiction of approach 2](./doc/approach-2-overview.png)

##### Edge cases

As the following edge cases show, Approach 2 also requires a little bit of help from the design in order to work in all cases. Case (a): If we do not want the first section to be immediately active, there should be enough space at the top of the page, so that the visible fraction of the first section is initially ${} < t$. Case (b): If we want the last section to be active at some point, there should be enough space at the bottom of the page, so that the last section is the _only_ section with a visible fraction ${} \geq t$ at some point.

![A visual depiction of possible edge cases with approach 2](./doc/approach-2-edge-cases.png)

There is one more case we need to take care of: if the user reduces the width of the browser window to the minimum allowed, the reflow may increase the height of a section to the point that the visible fraction of that section can _no longer_ reach $t$. Case (a): In the original configuration, the visible fraction of the section can reach 100%. Case (b): the visible fraction of that same section cannot exceed 3/8.

![A visual depiction of an edge case caused by reducing the width of the browser window](./doc/approach-2-edge-case-resize.png)

We use the following approach to prevent this. On page load (`DOMContentLoaded` event), we compute the maximum visible fraction of each section and use the minimum of those values as the initial threshold $t$. Then, on resize (`resize` event), we re-compute the threshold $t$ (and re-create the observer).

<a id="active-section-comparison-of-approaches"></a>

#### 2.1.4. Comparison of approaches

Approach 1:

- Implementation: simple to implement.
- Need to handle: `scroll` event.
- Book-keeping: none required.
- Performance: good. Could easily scale to 100+ sections without the user noticing.

Approach 2:

- Implementation: more complicated to implement.
- Need to handle: observer callback and `resize` event (usually a much more rare occurrence than the `scroll` event).
- Book-keeping: some required (e.g., which sections are "in").
- Performance: good. Should outperform approach 1, since all visibility computations are "pushed" to the browser, and our code is called only when needed. Could in theory scale to an arbitrary number of sections.

If we had to choose, we would use Approach 1 for its combination of simplicity and good performance. A Landing Page, by its very nature, is probably unlikely to have more than 20 sections.

<a id="sources-and-assets"></a>

## 3. Sources and assets

We did not add additional assets to the starter project.

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
