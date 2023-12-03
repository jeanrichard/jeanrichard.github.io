// @ts-check
import { appendSection, removeSection } from './mock-data.js';
// import * as approach1 from './approach1.js';
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
 * Settings widget
 *------------------------------------------------------------------------------------------------*/

/*
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
      // Rebuild the navigation bar.
      buildNav();
    }
  });

  // Handle click on button to remove section.
  const removeSectionButton = document.getElementById('section-remove');
  // @ts-ignore: ... is possibly 'null'.
  removeSectionButton.addEventListener('click', _ => {
    const section = removeSection();
    if (section !== null) {
      // Rebuild the navigation bar.
      buildNav();
    }
  });
}

/*
 * End main functions.
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

  // Enable approach 1.
  // approach1.approachEnable();
  approach2.approachEnable();
}

/**
 * End main functions.
 * Begin events.
 */

document.addEventListener('DOMContentLoaded', _ => doSetup());

/*
 * End events.
 */
