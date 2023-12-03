// @ts-check
import { appendSection, removeSection } from './mock-data.js';
import * as approach1 from './approach1.js';
import * as approach2 from './approach2.js';

/**
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 */

/*------------------------------------------------------------------------------------------------
 * Collapsible sections
 *------------------------------------------------------------------------------------------------*/

/*
 * Start helper functions.
 */

/**
 * Enables a collapsible section (used when appending a new section).
 * @param section {HTMLElement} the section.
 */
function enableCollapsibleSection(section) {
  /** @type {HTMLButtonElement} */
  // @ts-ignore: Type 'HTMLButtonElement | null' is not assignable ... .
  const btn = section.querySelector('.collapsible__btn');
  btn.addEventListener('click', handleCollapsibleClick);
}

/**
 * Disables a collapsible section (used when removing an existing section).
 * @param section {HTMLElement} the section.
 */
function disableCollapsibleSection(section) {
  /** @type {HTMLButtonElement} */
  // @ts-ignore: Type 'HTMLButtonElement | null' is not assignable ... .
  const btn = section.querySelector('.collapsible');
  btn.removeEventListener('click', handleCollapsibleClick);
}

/*
 * End helper functions.
 * Begin events.
 */

/**
 * Expand or collapse a section.
 * @param {Event} event a 'click' event.
 */
function handleCollapsibleClick(event) {
  /** @type {HTMLElement} */
  // @ts-ignore: Type 'EventTarget | null' is not assignable ... .
  const target = event.target;

  // Ensure the user really clicked on one of the buttons.
  if (target.nodeType === Node.ELEMENT_NODE && target.nodeName === 'BUTTON') {
    /** @type {HTMLElement} */
    // @ts-ignore: Type 'EventTarget | null' is not assignable ... .
    const btn = event.target;
    /** @type {HTMLElement} */
    // @ts-ignore: Type 'HTMLElement | null' is not assignable ... .
    const coll = btn.parentElement;
    /** @type {HTMLElement} */
    // @ts-ignore: Type 'HTMLElement | null' is not assignable ... .
    const content = coll.nextElementSibling;
    const isExpanded = coll.classList.toggle('collapsible--expanded');
    if (isExpanded) {
      content.style.maxHeight = "100%";
      btn.setAttribute('aria-expanded', 'true');
      content.setAttribute('aria-hidden', 'false');
    } else {
      content.style.maxHeight = "0";
      btn.setAttribute('aria-expanded', 'false');
      content.setAttribute('aria-hidden', 'true');
    }
  }
}

/**
 * End events.
 */

/*------------------------------------------------------------------------------------------------
 * Settings widget
 *------------------------------------------------------------------------------------------------*/

/*
 * Begin global variables.
 */

/**
 * The current approach, either "approach-1" or "approach-2".
 * @type {string}
 */
let curApproach = 'approach-1';

/*
 * End global variables.
 * Begin helper functions.
 */

/**
 * Changes the approach used to highlight the active section and to detect if we are below the page
 * fold.
 *
 * The `force` parameter controls what to do when the new approach is the same as the current
 * approach. Passing `false` will do nothing; passing `true` will force the function to disable and
 * re-enable the current approach.
 *
 * @param {string} newApproach the name of the new approach.
 * @param {boolean} force as described above.
 */
function changeApproach(newApproach, force) {
  if (newApproach !== curApproach || force) {
    switch (curApproach) {
      case 'approach-1': approach1.approachDisable(); break;
      case 'approach-2': approach2.approachDisable(); break;
    }
    switch (newApproach) {
      case 'approach-1': approach1.approachEnable(); break;
      case 'approach-2': approach2.approachEnable(); break;
    }
    curApproach = newApproach;
  }
}

/*
 * End helper functions.
 * Begin event-handlers.
 */

/**
 * Changes the approach according to user input.
 * @param {Event} event a 'change' event (not used).
 */
function handleApproachChoicesChange(event) {
  /** @type {HTMLElement} */
  // @ts-ignore: Type 'EventTarget | null' is not assignable ... .
  const target = event.target;

  // Ensure the user really clicked one of the radio buttons.
  if (target.nodeType === Node.ELEMENT_NODE && target.nodeName === 'INPUT') {
    const newApproach = target.getAttribute('value');
    // @ts-ignore: Argument of type 'string | null' is not assignable ... .
    changeApproach(newApproach, /*force=*/false);
  }
}

/*
 * End event-handlers.
 * Begin main functions.
 */

function setupSettingsWidget() {
  // Section widget: we directly add listeners.

  // Handle click on button to append section.
  const appendSectionButton = document.getElementById('section-append');
  // @ts-ignore: ... is possibly 'null'.
  appendSectionButton.addEventListener('click', _ => {
    const section = appendSection();
    if (section !== null) {
      // Enable the (new) collapsible section.
      enableCollapsibleSection(section);
      // Rebuild the navigation bar.
      buildNav();
      // Set up active section detection, etc. based on the selected approach.
      changeApproach(curApproach, /*force=*/true);
    }
  });

  // Handle click on button to remove section.
  const removeSectionButton = document.getElementById('section-remove');
  // @ts-ignore: ... is possibly 'null'.
  removeSectionButton.addEventListener('click', _ => {
    const section = removeSection();
    if (section !== null) {
      // Disable the (old) collapsible section.
      disableCollapsibleSection(section);
      // Rebuild the navigation bar.
      buildNav();
      // Set up active section detection, etc. based on the selected approach.
      changeApproach(curApproach, /*force=*/true);
    }
  });

  // Approach widget: we use event delegation.

  const approachChoices = document.getElementById('approach-widget__choices');
  // @ts-ignore: ... is possibly 'null'.
  approachChoices.addEventListener('change', handleApproachChoicesChange);

  // Find out the current approach.
  /** @type {Element} */
  // @ts-ignore: ... is possibly 'null'.
  const defaultChoice = document.querySelector(
    '#approach-widget__choices input[type="radio"]:checked');
  const newApproach = defaultChoice.getAttribute('value');
  // @ts-ignore: ... is possibly 'null'.
  changeApproach(newApproach, /*force=*/true);
}

/*
 * End main functions.
 */

/*------------------------------------------------------------------------------------------------
 * Auto-hiding scrollbars
 *------------------------------------------------------------------------------------------------*/

/*
 * Begin global variables.
 */

const SCROLLBAR_TIMEOUT_MS = 2500;

/**
 * The current approach, either "approach-1" or "approach-2".
 * @type {number | undefined | NodeJS.Timeout}
 */
let hideScrollbarsTimeoutId = undefined;

/*
 * End global variables.
 * Begin helper functions and event handlers.
 */

/**
 * Adds a class to show the scrollbars and schedule a callback to remove it in
 * `SCROLLBAR_TIMEOUT_MS` ms (unless this function is called in the meantime).
 * @param {Event} _event a 'scroll' or 'mousemove' event (not used).
 */
function showScrollbars(_event) {
  // Cancel the current callback to hide the scrollbars (if any).
  clearTimeout(hideScrollbarsTimeoutId);

  // Schedule a new callback to hide the scrollbars.
  /** @type {HTMLElement} */
  // @ts-ignore: Type 'HTMLHtmlElement | null' is not assignable ... .
  const html = document.querySelector('html');
  html.classList.add('scrollable-content--active');
  hideScrollbarsTimeoutId = setTimeout(() => {
    html.classList.remove('scrollable-content--active');
  }, SCROLLBAR_TIMEOUT_MS);
}

/*
 * End helper functions and event handlers.
 */

/*------------------------------------------------------------------------------------------------
 * Main part
 *------------------------------------------------------------------------------------------------*/

/*
 * Begin event-handlers.
 */

/**
 * Scrolls to the section clicked by the user in the navigation bar.
 * We use event delegation.
 * @param {Event} event the event generated by the user.
 */
function scrollToSection(event) {
  /** @type {HTMLElement} */
  // @ts-ignore: ... is possibly 'null'.
  const target = event.target;

  // Ensure the user really clicked on one of the links.
  if (target.nodeType === Node.ELEMENT_NODE && target.nodeName === 'A') {
    // We want to scroll, not jump.
    event.preventDefault();

    // Retrieve the ID of the target section.
    // @ts-ignore: ... is possibly 'null'.
    const targetSectionId = target.getAttribute('href')

    // Retrieve the target section.
    // We can use `getElementById` but need to drop the leading '#',
    /** @type {HTMLElement} */
    // @ts-ignore: ... is possibly 'null'.
    const targetSection = document.getElementById(targetSectionId.slice(1));

    // Scroll.
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
}

/*
 * End event-handlers.
 * Begin main functions.
 */

/**
 * Builds the navigation bar.
 */
function buildNav() {
  // Get all sections.
  const sections = document.querySelectorAll('main > section');

  // Create a fragment to hold the menu items.
  const itemsFragment = document.createDocumentFragment();
  for (const section of sections) {
    const sectionDataNav = section.getAttribute('data-nav')
    const li = document.createElement('li');
    li.innerHTML = `<a href="#${section.id}" class="menu__link">${sectionDataNav}</a>`;
    itemsFragment.appendChild(li);
  }

  // Insert the menu items.
  const navbarList = document.querySelector('#navbar__list');
  // @ts-ignore: ... is possibly 'null'.
  navbarList.replaceChildren(itemsFragment);
}

/**
 * Sets up navigation-bar, highlighting the active section, etc.
 */
function doSetup() {
  // Navigation bar.

  // Build the navigation bar.
  buildNav();

  // Handle click on navigation entry.
  /** @type {HTMLElement} */
  // @ts-ignore: ... is possibly 'null'.
  const navBarList = document.querySelector('#navbar__list');
  navBarList.addEventListener('click', event => scrollToSection(event));

  // Settings widget.

  // Set up the settings widget.
  setupSettingsWidget();

  // Collapsible sections.

  /**@type {HTMLCollectionOf<HTMLElement>}*/
  // @ts-ignore: Type 'HTMLCollectionOf<Element>' is not assignable ... .
  const sections = document.querySelectorAll('main > section');
  for (const section of sections) {
    enableCollapsibleSection(section);
  }

  // Auto-hiding scrollbars.

  // We want to show scrollbars while scrolling.
  document.addEventListener('scroll', showScrollbars);
  // ... and while moving the mouse.
  document.addEventListener('mousemove', showScrollbars);
}

/**
 * End main functions.
 * Begin events.
 */

document.addEventListener('DOMContentLoaded', _ => doSetup());

/*
 * End events.
 */
