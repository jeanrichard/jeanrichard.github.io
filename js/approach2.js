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
 * Active Section Approach 2 - Intersection Observer API
 *------------------------------------------------------------------------------------------------*/

// NOTE: See README.md for details.

/*
 * Begin global variables.
 */

/**
 * The fraction of the threshold's upper bound to use as the actual threshold for the observer.
 * (This is also potentially useful for floating-point error mitigation.)
 */
const FRACTION_OF_THRESHOLD_UPPER_BOUND = 0.90;

/**
 * The section observer.
 * @type {IntersectionObserver | null}
 */
let sectionObserver = null;

/**
 * Keeps track of which sections are "in" (see README.md for details).
 * @type {Map<string, boolean>};
 */
const isIntersecting = new Map();

/**
 * The page fold observer.
 * @type{IntersectionObserver | null}
 */
let foldObserver = null;

/*
 * End global variables.
 * Begin helper functions.
 */

/**
 * Computes the maximum visible fraction of each section and returns the minimum of those values.
 * @returns {number} as described above.
 */
function computeThresholdUpperBound() {
  // Get all sections.
  const sections = document.querySelectorAll('main > section');

  // Get the height of the viewport.
  const vh = window.innerHeight;

  let threshold = 1.0;
  for (const section of sections) {
    // Get the height of the section.
    const sh = section.getBoundingClientRect().height;

    // Compute the maximum visible fraction of the section as a value in [0, 1].
    const sMaxVisibleFraction = Math.min(vh / sh, 1.0);

    // Keep the minimum.
    threshold = Math.min(threshold, sMaxVisibleFraction);
  }

  return threshold;
}

/**
 * Computes the threshold.
 * @returns {number} as described above.
 */
function computeThreshold() {
  return computeThresholdUpperBound() * FRACTION_OF_THRESHOLD_UPPER_BOUND;
}

/**
 * Enables an observer that adds the active class to the 1st section with a visible fraction greater
 * than or equal to the threshold (if any), and removes it from all other sections.
 * @param {number} threshold as described above.
 * @returns {IntersectionObserver} the observer.
 */
function enableObserver(threshold) {
  // Get all sections.
  const sections = document.querySelectorAll('main > section');

  // This will be called whenever the visible fraction of one of the sections becomes (or no longer
  // is) greater than or equal to the threshold.
  const callback = (
    /**@type {IntersectionObserverEntry[]}*/ entries,
    /**@type {IntersectionObserver}*/ _observer
  ) => {
    // Keeps track of which sections are "in".
    entries.forEach(entry => {
      isIntersecting.set(entry.target.id, entry.isIntersecting);
    });

    // This will be the ID of the active section (if any).
    let sectionId = null;

    // Now simply add the active class to the first section that is "in" (if any).
    let found = false;
    for (const section of sections) {
      const isActive = isIntersecting.get(section.id) && !found;
      found = found || isActive;
      section.classList.toggle(utils.SECTION_ACTIVE_CLASS, isActive);
      if (isActive) sectionId = section.id;
    }

    // Highlight the menu link if needed.
    utils.makeMenuLinkActive(sectionId);
  };

  const options = {
    threshold: threshold
  };

  // Create the observer and observe all sections.
  const observer = new IntersectionObserver(callback, options);
  sections.forEach(section => observer.observe(section));

  return observer;
}

/*
 * End helper functions.
 * Begin event-handlers.
 */

/**
 * Updates the setup of approach 2 when the browser window is resized.
 * @param {Event} _event a 'resize' event (not used).
 */
function handleResize(_event) {
  // Disable the current section observer.
  // @ts-ignore: ... is possibly 'null'.
  sectionObserver.disconnect();

  // Compute the new threshold.
  const threshold = computeThreshold();
  // ... and enable the new section observer.
  sectionObserver = enableObserver(threshold);
}

/*
 * End event-handlers.
 * Begin main functions.
 */

/**
 * Enables approach 2 (see README.md for details).
 */
export function approachEnable() {
  const sections = document.querySelectorAll('main > section');
  sections.forEach(section => isIntersecting[section.id] = false);

  // Compute the threshold.
  const threshold = computeThreshold();
  // ... and enable the section observer.
  sectionObserver = enableObserver(threshold);

  // Start listening to 'resize' events.
  window.addEventListener("resize", handleResize);
}

/**
 * Disables approach 2.
 */
export function approachDisable() {
  // Stop listening to 'resize' events.
  window.removeEventListener('resize', handleResize);

  // Disable the current section observer.
  // @ts-ignore: ... is possibly 'null'.
  sectionObserver.disconnect();
  //... and make it collectable by the GC.
  sectionObserver = null;
}
