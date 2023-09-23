# udacity-fewd23-course1-project

This repository contains the code for Project 1 — _Personal Blog Website_ of the Udacity Nanodegree _Front End Web Developer_ (2023).

## Sources and assets

- Color palette: [Tech Grey and Orange Color Palette](https://www.color-hex.com/color-palette/1010810).

- [Font Awesome Free](https://fontawesome.com/) (free, see [License](https://github.com/FortAwesome/Font-Awesome/blob/6.x/LICENSE.txt) for details)  
  Use: Icons for social websites like LinkedIn, GitHub, etc.  
  Note: Self-hosted, see [Host Yourself - Web Fonts](https://fontawesome.com/docs/web/setup/host-yourself/webfonts).

- Fonts from [Google Fonts](https://fonts.google.com/) (free, see [FAQ](https://developers.google.com/fonts/faq) for details):

  - [Open Sans](https://fonts.google.com/specimen/Open+Sans)  
    Use: Main font

- SVG's from [Openclipart](https://openclipart.org/) (royalty-fee, see [Licensing](https://openclipart.org/share) for details):

  - [40-tooth gear with trapezium holes](https://publicdomainvectors.org/en/free-clipart/Fourthy-tooth-cogwheel/47016.html)  
    Author: [Kevin David Pointon](https://openclipart.org/artist/Firkin)  
    Use: Logo

- Images from [Pixabay](https://pixabay.com/) (royalty-free, see [License](https://pixabay.com/service/terms/) for details):

  - [Lake, Mountains, Trees](https://pixabay.com/photos/lake-mountains-trees-alps-alpine-5933622/)  
    Author: <a href="https://pixabay.com/users/nature_brothers-19732775/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5933622">Lian und Sander Baumann</a>  
    Use: Blog post illustration

  - [Mountains, Snow, Flowers](https://pixabay.com/photos/mountains-snow-flowers-valley-1516733/)  
    Author: <a href="https://pixabay.com/users/narya-194384/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1516733">Claudia Beyli</a>  
    Use: Blog post illustration

  - [Coffee, Pen, Notebook](https://pixabay.com/photos/coffee-pen-notebook-open-notebook-2306471/)  
    Author: <a href="https://pixabay.com/users/engin_akyurt-3656355/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2306471">Engin Akyurt</a>  
    Use: Blog post illustration

## Some additional references

- Semantic HTML:

  - [Semantic HTML: What It Is and How to Use It Correctly](https://www.semrush.com/blog/semantic-html5-guide/) ([Semrush Blog](https://www.semrush.com/blog/), Vlado Pavlik, December 2022)
  - [What Is Schema Markup & How to Implement Structured Data](https://www.semrush.com/blog/what-is-schema-beginner-s-guide-to-structured-data/) ([Semrush Blog](https://www.semrush.com/blog/), Luke Harsel, September 2022)
  - **Decision:** Stick to semantic HTML elements. Would be interesting to learn more about [Schema Markup](https://schema.org/docs/schemas.html) and [JSON-LD](https://json-ld.org/) at some point.

- GDPR:

  - [Setting Up Newsletters for GDPR Compliance](https://www.termsfeed.com/blog/gdpr-email-newsletters/) ([TermsFeed](https://www.termsfeed.com/), Legal Research Team, July 2023)
  - **Decision:** Use Single Opt-In for the mock Newsletter Subscription and add a mock Privacy Policy.

- Modular CSS:

  - Looks like there are entire competing methodologies to organize CSS files: [BEM](https://en.bem.info/) (see also https://getbem.com/), etc.
  - **Decision:** Use an ad-hoc approach.

## Tools

- [Visual Studio Code](https://code.visualstudio.com/).  
  Use: IDE.  
  **Extensions:**

  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)  
    Use: Linter/formatter for HTML and CSS files.

  - [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)  
    Use: Linter for CSS files.  
    **Plugins:**

    - [stylelint-config-idiomatic-order ](https://github.com/ream88/stylelint-config-idiomatic-order)  
      Use: Automatically reorder CSS properties according to [Principles of writing consistent, idiomatic CSS](https://github.com/necolas/idiomatic-css#declaration-order).

- Chrome extensions:

  - [axe DevTools - Web Accessibility Testing](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)  
    Use: Web Accessibility Testing

- Online tools:

  - [Favicon.io Converter](https://favicon.io/favicon-converter/)  
    Use: Generate favicon files from the logo

  - [Lorem Ipsum Generator](https://www.lipsum.com/feed/html)  
    Use: Generate mock text content

  - [PX to REM Converter](https://codebeautify.org/px-to-rem-converter)  
    Use: Convert between `px`, `rem` and `em`.

### How to run Stylelint with plugins

There is an official VS Code [Stylelint extension](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint), but I did not figure out how to install plugins.

I managed to get a working setup using the VS Code [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers):

1. Install docker and make it possible to manage it as non-root.
2. Create _.devcontainers.json_:
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

6. Run:

   ```bash
   # We do not want to touch './assets/fontawesome/**/*.css'.

   # Report violations:
   npx stylelint "./assets/styles/**/*.css"

   # Fix violations:
   npx stylelint --fix "./assets/styles/**/*.css"
   ```
