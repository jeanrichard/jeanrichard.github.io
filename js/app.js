// @ts-check

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
 * Main part
 *------------------------------------------------------------------------------------------------*/

/*
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

}

/**
 * Begin events.
 */

document.addEventListener('DOMContentLoaded', _ => doSetup());

/*
 * End events.
 */
