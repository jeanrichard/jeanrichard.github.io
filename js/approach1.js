// @ts-check
import * as utils from './utils.js';

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
 * Active Section Approach 1 - Scroll event and active line
 *------------------------------------------------------------------------------------------------*/

// NOTE: See README.md for details.

/*
 * Begin global variables.
 */

/**
 * Distance from viewport-top to band-top, as a fraction of viewport-height.
 */
const ACTIVE_BAND_D_AS_VH_FRACTION = 0.4;

/**
 * Width of the band, as a fraction of viewport-height.
 */
const ACTIVE_BAND_W_AS_VH_FRACTION = 0.2;

/*
 * End global variables.
 * Begin helper functions.
 */

/**
 * Adds the active class to the section that straddles the active band (if any); removes the active
 * class from all other sections.
 */
function makeSectionActive() {
  // Get viewport-height.
  const vh = window.innerHeight;

  // Compute active band in viewport coordinates.
  const bandD = Math.ceil(ACTIVE_BAND_D_AS_VH_FRACTION * vh);
  const bandW = Math.ceil(ACTIVE_BAND_W_AS_VH_FRACTION * vh);
  const bandTop = bandD;
  const bandBottom = bandD + bandW;

  // Update the sections.

  // Get all sections.
  const sections = document.querySelectorAll('main > section');

  // This will be the ID of the active section (if any).
  let sectionId = null;

  for (const section of sections) {
    // Get bounding rectangle in viewport coordinates.
    const box = section.getBoundingClientRect();
    // Remember that the origin is the top-left corner of the viewport.
    const isActive = (box.top <= bandTop && bandBottom <= box.bottom);
    section.classList.toggle(utils.SECTION_ACTIVE_CLASS, isActive);
    if (isActive) sectionId = section.id;
  }

  // Highlight the menu link if needed.
  utils.makeMenuLinkActive(sectionId);
}

/**
 * Makes the button to scroll the page to the top visible if the user has scrolled down enough.
 */
function makeScrollToTopActive() {
  // Get the button to scroll the page to the top.
  const scrollToTopBtn = utils.getScrollToTopBtn();

  // Figure out if we are below the page fold.
  const fold = Math.ceil(utils.PAGE_FOLD_VH_FRACTION * window.innerHeight);
  const isBelowFold = (window.scrollY >= fold);
  // ... and make the button appear or disappear.
  scrollToTopBtn.style.display = (isBelowFold ? 'block' : 'none');
}

/*
 * End helper functions.
 * Begin event-handlers.
 */

/**
 * Checks which section is active when the page is scrolled up or down.
 * @param {Event} _event a 'scroll' event (not used).
 */
function handleScroll(_event) {
  makeSectionActive();
  makeScrollToTopActive();
}

/*
 * End event-handlers.
 * Begin main functions.
 */

/**
 * Enables approach 1 (see README.md for details).
 */
export function approachEnable() {
  document.addEventListener('scroll', handleScroll);

  // Get the button to scroll the page to the top.
  const scrollToTopBtn = utils.getScrollToTopBtn();
  scrollToTopBtn.addEventListener('click', utils.scrollToTop);

  // Check immediately.
  makeSectionActive();
  makeScrollToTopActive();
}

/**
 * Disables approach 1.
 */
export function approachDisable() {
  document.removeEventListener('scroll', handleScroll);

  // Get the button to scroll the page to the top.
  const scrollToTopBtn = utils.getScrollToTopBtn();
  scrollToTopBtn.removeEventListener('click', utils.scrollToTop);
}

/*
 * End main functions.
 */
