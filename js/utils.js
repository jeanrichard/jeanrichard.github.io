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
 * Utilities
 *------------------------------------------------------------------------------------------------*/

/*
 * Begin global variables.
 */

export const SECTION_ACTIVE_CLASS = 'section--active';

/*
 * End global variables.
 * Begin helper functions.
 */

/**
 * Adds the active class to the menu link that points to the section with the given `sectionId` (if
 * any); removes the active class from all other menu links.
 * @param {string | null} sectionId as described above.
 */
export function makeMenuLinkActive(sectionId) {
  // Get all menu-links.
  const menuLinks = document.querySelectorAll('.navbar__menu .menu__link');

  for (const menuLink of menuLinks) {
    // @ts-ignore: ... is possibly 'null'.
    const menuLinkId = menuLink.getAttribute('href').slice(1);
    const isActive = (menuLinkId === sectionId);
    menuLink.classList.toggle('menu__link--active', isActive);
  }
}

/*
 * End helper functions.
 */
