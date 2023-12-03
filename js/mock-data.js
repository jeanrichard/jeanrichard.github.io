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
 * Appending & removing sections
 *------------------------------------------------------------------------------------------------*/

/*
 * Begin global variables.
 */

/**
 * 16 sections with mock content.
 *
 * Note: Sections 1-4 have already been transferred to 'index.html' manually.
 */
const MOCK_SECTIONS = [
  {
    'id': 'section1',
    'dataNav': 'Section 1',
    'title': 'Section 1',
    'paragraphs': [
      'Praesent rutrum lacus eget sem laoreet, sit amet aliquam elit porta. Sed vel tortor quis dolor vestibulum convallis. Vivamus at massa ligula. Nunc lectus massa, elementum vel vulputate in, vehicula quis ex. Suspendisse vitae magna efficitur, porta turpis eu, volutpat turpis. Donec iaculis id diam eget imperdiet. Quisque faucibus ultrices mi, feugiat imperdiet justo consectetur eu. Suspendisse molestie enim eget risus mattis sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam gravida molestie lectus, id placerat felis cursus quis. Nullam feugiat pulvinar nunc id consequat. Maecenas efficitur orci vitae tellus tincidunt placerat. Aenean eros.',
      'In nec diam ac dolor finibus consequat. In mattis fringilla orci, vel posuere tortor pharetra vel. Nunc ut mauris a diam pretium vestibulum. Aenean lobortis elementum libero, at vestibulum dui semper vel. Nullam ullamcorper tempus varius. Sed pellentesque eleifend convallis. Morbi suscipit eu proin.',
    ]
  },
  {
    'id': 'section2',
    'dataNav': 'Section 2',
    'title': 'Section 2',
    'paragraphs': [
      'Sed tincidunt blandit mi, ac interdum velit dignissim a. Donec euismod neque quis diam fermentum, et lobortis ante dignissim. Donec fringilla auctor turpis, ut viverra turpis dictum quis. Sed imperdiet varius mollis. Vivamus iaculis risus a elit fermentum, ac sodales eros finibus. Donec sed rhoncus ante, at euismod libero. Nunc non ex pulvinar, aliquam velit eget, gravida mauris. Ut est elit, faucibus vitae justo ac, hendrerit lacinia mi. Vestibulum laoreet, tellus ut euismod molestie, nulla metus sodales odio, id auctor tellus dui eu mi. Donec ac ex est. Duis quis arcu nec velit faucibus ultricies quis a lacus. Etiam porta turpis eu risus dapibus, eu interdum dui cursus. Fusce ultricies ut.',
      'Donec tempor leo erat, vitae ornare mauris maximus vitae. In rhoncus lorem eu condimentum scelerisque. Morbi fringilla augue in mauris dignissim cursus. Integer a lacus faucibus, elementum felis eu, sodales mi. Nullam rutrum sagittis risus, vel ornare neque vehicula eu. Praesent eu libero a aliquam.',
    ]
  },
  {
    'id': 'section3',
    'dataNav': 'Section 3',
    'title': 'Section 3',
    'paragraphs': [
      'Praesent imperdiet ac ex id posuere. Quisque consequat id sapien eu blandit. Nullam tellus risus, vehicula non elit a, consectetur bibendum dui. Morbi ac est at lacus scelerisque posuere id vel nunc. Sed eu odio mi. Vivamus suscipit urna sed arcu semper scelerisque. Duis blandit velit vulputate metus viverra vehicula. Cras placerat justo quis aliquet porta. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisi sapien, dictum vitae varius eu, pharetra nec tellus. Donec eros sem, iaculis ut pretium vel, hendrerit id nulla. Proin rutrum lobortis mi eu blandit. Etiam lacinia, velit at tristique pulvinar, lorem ante maximus mauris, eget mollis nulla eros non enim. Vivamus cras amet.',
      'Phasellus egestas elit quis convallis vehicula. Morbi vel luctus lectus, a fringilla ex. Etiam in tellus quis ipsum commodo lobortis. Etiam vulputate, justo quis porttitor dapibus, elit lorem dictum dolor, vel suscipit libero mi in leo. Integer commodo vehicula dolor. Nunc faucibus augue a orci non.',
    ]
  },
  {
    'id': 'section4',
    'dataNav': 'Section 4',
    'title': 'Section 4',
    'paragraphs': [
      'Quisque molestie urna et consectetur pretium. Duis vel quam consectetur lacus placerat tristique et at lacus. Duis tincidunt egestas elit id pharetra. Aenean dui nunc, dapibus sed ornare non, ornare et eros. Maecenas ornare nunc tellus, in scelerisque elit dapibus ac. Duis hendrerit, elit ut tincidunt viverra, sem libero efficitur nulla, sit amet rutrum justo urna nec turpis. Duis lobortis sit amet turpis non ornare. Nullam ligula nulla, eleifend at tortor id, elementum imperdiet nunc. Morbi hendrerit, turpis eu commodo commodo, sem quam hendrerit neque, et dapibus orci justo eu odio. Nunc quam ex, convallis non placerat vel, gravida id urna. Interdum et malesuada fames ac ante ipsum turpis.',
      'Curabitur cursus gravida urna. Duis ultrices pretium lobortis. Praesent vehicula dolor eget pretium eleifend. Nam eget diam a felis hendrerit mattis sed eu odio. Fusce fringilla ante et nisl rutrum, sed laoreet urna feugiat. Cras accumsan faucibus fermentum. Donec vel ipsum varius felis turpis duis.',
    ]
  },
  {
    'id': 'section5',
    'dataNav': 'Section 5',
    'title': 'Section 5',
    'paragraphs': [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum nulla ac velit aliquam, ac pretium ante consequat. Morbi auctor ipsum eget velit accumsan gravida. Quisque sapien ipsum, varius vitae ullamcorper eu, hendrerit id turpis. Pellentesque tincidunt porta magna, id sollicitudin turpis pulvinar at. Donec mattis consequat sem, sit amet vulputate urna viverra id. Maecenas nec vehicula risus. Mauris sed tempor magna, nec ullamcorper metus. Proin vel dui interdum, aliquet ante in, efficitur nulla. Nunc leo diam, mollis quis orci vitae, tempus auctor purus. Mauris facilisis rhoncus justo in varius. Donec quis turpis blandit, tempor nibh vel, dapibus nisi. Mauris condimentum id.',
      'Maecenas convallis consectetur nulla. Vestibulum aliquam ex turpis, vel maximus libero aliquet non. Duis convallis rutrum mi in porttitor. Mauris volutpat sed dolor nec fringilla. Vestibulum sit amet tincidunt orci. Phasellus at laoreet sem. Nam varius risus ut risus vestibulum, vel finibus dui vel.',
    ]
  },
  {
    'id': 'section6',
    'dataNav': 'Section 6',
    'title': 'Section 6',
    'paragraphs': [
      'Sed odio nisi, facilisis nec mi ut, feugiat luctus turpis. Aliquam tristique, tortor eu bibendum imperdiet, metus tellus euismod sem, in euismod sem magna eget nibh. Aliquam erat volutpat. Suspendisse viverra nisi metus, quis vulputate arcu mollis id. Vestibulum at tortor ac magna consectetur vulputate. Nullam elementum, lacus ac facilisis hendrerit, arcu nisi posuere ipsum, eu tempus neque est ac orci. Aliquam nisl diam, sollicitudin quis lectus sit amet, fringilla dapibus enim. Quisque consectetur nec lorem eget laoreet. Aliquam tincidunt scelerisque mauris, sit amet maximus elit semper vel. Nunc luctus lectus sed odio cursus aliquam. Vestibulum sollicitudin ultrices feugiat. Nullam metus.',
      'Curabitur non pellentesque ligula. Pellentesque quam velit, tincidunt posuere varius vel, posuere sed ex. Phasellus egestas interdum accumsan. Ut elementum massa eu justo auctor, a congue est pellentesque. Maecenas et tempor nulla. Donec urna neque, posuere at volutpat vitae, pretium sit amet nulla.',
    ]
  },
  {
    'id': 'section7',
    'dataNav': 'Section 7',
    'title': 'Section 7',
    'paragraphs': [
      'Suspendisse iaculis tempor nisi, id faucibus magna feugiat vel. Maecenas feugiat augue sed eros cursus, eu ullamcorper augue consequat. Duis varius suscipit sapien, sed lacinia nulla rhoncus convallis. Cras lacinia tristique felis vel tristique. Aenean fermentum nulla dignissim tempus consequat. Proin mollis, risus in consequat dictum, massa dolor iaculis diam, vitae faucibus lectus sapien id lorem. Praesent nunc mauris, malesuada eget tortor a, finibus hendrerit erat. Nulla efficitur, nulla a iaculis ultrices, augue sem pharetra tellus, ac imperdiet lorem libero et est. Integer eu maximus lacus, at sodales elit. Etiam ultrices sapien eget massa accumsan, at gravida justo rutrum. Nulla quis.',
      'Vivamus vitae sodales urna. Nulla facilisi. Donec quis tortor ut ante viverra fringilla. Nunc dui felis, tempor nec sapien sed, elementum gravida nibh. Integer accumsan turpis quis odio auctor efficitur. Curabitur ultrices augue eget consequat condimentum. Nunc luctus, risus ac dapibus finibus eget.',
    ]
  },
  {
    'id': 'section8',
    'dataNav': 'Section 8',
    'title': 'Section 8',
    'paragraphs': [
      'Vivamus pellentesque, dolor quis scelerisque egestas, felis ex condimentum nibh, quis laoreet magna nulla at velit. Suspendisse in ex at urna pretium scelerisque eget id risus. Sed a consectetur nisi. Duis interdum ornare iaculis. Mauris laoreet nibh nec lectus suscipit suscipit. Curabitur et quam suscipit, ullamcorper ligula at, laoreet mauris. Morbi iaculis pretium massa, non rutrum libero porttitor non. Proin sed mi eget tellus elementum auctor in id lacus. Vestibulum efficitur accumsan libero ut pellentesque. Phasellus vitae eleifend massa. Sed porttitor faucibus bibendum. Vivamus dui est, consectetur at lacinia a, euismod ut ligula. Ut vitae nulla non metus aliquet dignissim nec ut dui.',
      'Nullam nec sem efficitur, pulvinar lectus in, vulputate tortor. Mauris mi diam, facilisis eu facilisis et, finibus vitae augue. Aliquam eu porta nisl. Aliquam eget interdum lacus, nec ullamcorper enim. Nullam efficitur, augue et facilisis vestibulum, risus leo blandit orci, vitae aliquam nibh justo.',
    ]
  },
  {
    'id': 'section9',
    'dataNav': 'Section 9',
    'title': 'Section 9',
    'paragraphs': [
      'Suspendisse libero leo, eleifend quis tellus ut, accumsan condimentum risus. Donec est neque, volutpat eget metus a, fringilla rutrum nibh. Sed egestas non justo at semper. Aliquam metus est, feugiat ut diam in, placerat tempus odio. Fusce interdum et ex vel venenatis. Aliquam ut pellentesque quam. Integer nulla odio, eleifend id euismod sed, rutrum a erat. Vivamus eu sapien eu leo luctus convallis ut ut mi. Morbi pharetra sapien at mollis pretium. Duis eu odio varius, dapibus tortor at, molestie felis. Aenean tempor vulputate dui, sit amet lacinia mauris tincidunt ut. Cras sit amet enim non turpis feugiat laoreet eget ac nisi. Vestibulum egestas magna ipsum. Phasellus congue eu lectus duis.',
      'Fusce ullamcorper porttitor erat, sit amet porttitor purus iaculis id. Proin ultrices, erat id pulvinar porttitor, orci leo varius ipsum, vel ornare ligula lectus et odio. Donec lobortis lectus ut diam fringilla, nec bibendum lectus lobortis. Praesent interdum augue quis fermentum feugiat cras amet.',
    ]
  },
  {
    'id': 'section10',
    'dataNav': 'Section 10',
    'title': 'Section 10',
    'paragraphs': [
      'Cras augue tortor, dapibus et augue varius, aliquam maximus enim. Morbi tincidunt, lacus eu elementum volutpat, nibh nisi imperdiet mi, at rhoncus nisl massa ut diam. Maecenas pharetra tellus convallis dolor placerat convallis. Ut feugiat urna non iaculis posuere. Sed nec mi ut lorem porta tristique. Quisque id erat maximus, sodales neque in, volutpat mauris. Vivamus vel scelerisque ante. Vivamus tincidunt urna vel velit feugiat, ut ultrices ipsum dapibus. Ut ac mi fermentum, viverra diam ac, mattis justo. Nam eget massa tincidunt orci imperdiet varius. Mauris dapibus ex ut turpis feugiat elementum. Mauris id risus eu nunc lacinia pretium sit amet ut eros. Mauris vel massa massa. Integer at.',
      'Donec rutrum augue ut ipsum ornare rutrum. Fusce volutpat id elit sed facilisis. Donec tincidunt elit id varius aliquam. Ut ante nulla, tempus eu nisl a, luctus euismod tellus. Vivamus a nisi nec est finibus feugiat. Duis elementum metus laoreet diam ultrices dignissim. Nulla sit amet urna ante sit.',
    ]
  },
  {
    'id': 'section11',
    'dataNav': 'Section 11',
    'title': 'Section 11',
    'paragraphs': [
      'Duis viverra dolor vitae enim sagittis, a vehicula nisl convallis. Etiam venenatis interdum iaculis. Cras porttitor, leo in tincidunt imperdiet, nibh sapien pulvinar ipsum, eget rutrum justo sapien et sem. Donec tristique, magna at iaculis mattis, ex elit vulputate enim, non dignissim felis felis id dui. Proin ac efficitur ipsum. Morbi consequat sapien tristique tellus dapibus interdum. Proin commodo, erat sit amet rhoncus blandit, nulla est faucibus mauris, a rhoncus magna ex eget leo. Nulla porttitor fermentum gravida. Proin hendrerit sit amet massa et eleifend. Vestibulum vulputate condimentum ante. Morbi pellentesque auctor ullamcorper. Nullam quam lacus, finibus ac sem ac, facilisis et.',
      'Nulla ut leo consectetur, finibus nulla ac, porta diam. Vivamus varius eros sit amet nulla feugiat, eu tincidunt lorem blandit. In libero leo, imperdiet non risus non, accumsan pharetra metus. Maecenas id dolor pretium, fermentum nisl et, vestibulum nisi. Aliquam ut lorem dui. Sed imperdiet posuere.',
    ]
  },
  {
    'id': 'section12',
    'dataNav': 'Section 12',
    'title': 'Section 12',
    'paragraphs': [
      'Pellentesque vitae libero et lorem placerat lacinia. Phasellus magna nibh, molestie nec sollicitudin id, imperdiet iaculis massa. Sed suscipit blandit justo condimentum tincidunt. Suspendisse quam dolor, ornare in quam vel, suscipit eleifend libero. Fusce consequat erat in nibh lobortis aliquam. Phasellus non condimentum quam. Integer vel enim vitae est pharetra fringilla id vel nunc. Etiam lacinia sapien ac metus pellentesque blandit nec ut justo. Maecenas tempus, lectus in commodo auctor, lectus augue commodo tortor, at pharetra libero ante lobortis felis. Vivamus sollicitudin luctus velit. Suspendisse quis magna sit amet enim congue porttitor. Sed augue nulla, condimentum ut augue eu vel.',
      'Pellentesque venenatis mauris ut luctus consequat. Praesent tempus, purus non facilisis pellentesque, nulla massa tempus justo, a varius nisl mi nec metus. Aenean tempus et ipsum nec porttitor. Nulla facilisi. Ut nunc justo, vestibulum sed ante sed, sollicitudin ornare sem. Aliquam erat turpis duis.',
    ]
  },
  {
    'id': 'section13',
    'dataNav': 'Section 13',
    'title': 'Section 13',
    'paragraphs': [
      'Phasellus accumsan, mauris ut semper porta, justo lacus mattis risus, id placerat magna massa sed quam. Aliquam imperdiet urna eget pretium laoreet. Vivamus purus felis, tincidunt ut ultrices vel, ultrices et massa. Ut lectus arcu, ornare in luctus sit amet, tristique dapibus massa. Sed at faucibus diam. Pellentesque et lorem pharetra, tristique felis a, fringilla nulla. Donec scelerisque ante tortor, non ultricies odio egestas ac. Mauris in nisl porta, tempor lectus at, egestas mi. Pellentesque bibendum dolor et libero aliquam tempus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quam diam, accumsan non lacinia ut, rutrum nec nibh. Donec laoreet sodales velit id orci aliquam.',
      'Cras posuere vestibulum ligula, vitae dictum nisl aliquam vel. Etiam purus neque, vehicula auctor tellus non, imperdiet hendrerit felis. Duis sit amet rhoncus est, et varius orci. Donec non ipsum ex. Aliquam erat volutpat. Praesent auctor nunc quam, a ullamcorper felis vulputate ut. Morbi eget nunc.',
    ]
  },
  {
    'id': 'section14',
    'dataNav': 'Section 14',
    'title': 'Section 14',
    'paragraphs': [
      'Ut accumsan dapibus congue. Proin viverra vel magna vel rhoncus. Aenean ipsum velit, rhoncus sed nisl eu, vestibulum condimentum urna. Aenean pharetra luctus velit nec suscipit. Suspendisse diam sapien, luctus id sapien at, aliquet pellentesque lectus. Aliquam odio ipsum, fringilla a purus non, aliquet faucibus quam. Aliquam dolor erat, commodo nec arcu in, maximus congue lacus. Ut malesuada ornare justo sed rutrum. Cras rutrum tellus id faucibus pulvinar. Proin quis sapien fermentum, aliquet libero eu, hendrerit erat. In sit amet placerat augue, eu ultrices ante. Donec enim tellus, placerat tincidunt hendrerit sed, dictum non leo. Curabitur libero mi, tincidunt nec ornare sed, consequat mi.',
      'Phasellus varius velit est, at rutrum turpis aliquam nec. Nunc ac suscipit nisl, a rutrum dolor. Sed elementum viverra dolor nec tincidunt. In hac habitasse platea dictumst. Praesent euismod eros semper mi volutpat aliquam. Integer vel mollis justo. Duis quis vulputate sapien. Praesent ac tincidunt.',
    ]
  },
  {
    'id': 'section15',
    'dataNav': 'Section 15',
    'title': 'Section 15',
    'paragraphs': [
      'Duis sem est, elementum id pulvinar quis, lacinia sit amet dolor. Maecenas quis vestibulum mi, luctus ullamcorper ex. Fusce ut porta nisi, at scelerisque arcu. Etiam vulputate, eros vel iaculis interdum, enim risus scelerisque leo, nec aliquet mauris purus volutpat purus. In sit amet porttitor magna. Donec ut iaculis sapien. Cras quis faucibus arcu, eget accumsan eros. Aenean in convallis mauris. Suspendisse imperdiet finibus varius. Curabitur pulvinar dui a sapien ultricies, quis aliquet mauris ullamcorper. Vivamus ligula ipsum, luctus sed luctus vitae, tincidunt nec ipsum. Vivamus ultrices tortor at nisl suscipit, non ullamcorper augue tempor. In sed interdum lectus. Phasellus sodales sed.',
      'Donec ullamcorper orci at eleifend pulvinar. Donec finibus viverra suscipit. Integer dictum urna sapien, et auctor purus semper vitae. Suspendisse potenti. Sed ullamcorper, est non vulputate commodo, libero odio posuere nulla, in sodales lacus purus vitae est. Pellentesque in felis magna. Morbi non.',
    ]
  },
  {
    'id': 'section16',
    'dataNav': 'Section 16',
    'title': 'Section 16',
    'paragraphs': [
      'Vivamus sed hendrerit velit, at aliquet augue. Proin vitae faucibus nunc. Morbi hendrerit porta porta. Cras commodo ut orci hendrerit vulputate. In commodo sagittis felis sed porttitor. Maecenas dapibus sit amet eros id tincidunt. Aenean efficitur nulla id dolor vestibulum elementum. Phasellus finibus sodales iaculis. Suspendisse viverra tincidunt ex, in euismod lorem pretium eu. Praesent luctus augue mi, quis pulvinar sem mattis ac. Donec quis sapien fringilla, efficitur lacus nec, hendrerit ligula. Integer consectetur et nulla vitae aliquet. Nunc ut tortor pretium, semper nunc vel, bibendum purus. In pellentesque rhoncus blandit. Vivamus fermentum varius mi. Nam pulvinar eget justo mauris.',
      'Praesent suscipit dui sit amet blandit varius. Nullam dignissim dolor sed ullamcorper volutpat. Sed bibendum varius turpis lobortis tempus. Mauris vitae velit ex. Sed eget risus justo. Nulla maximus, dui sed molestie aliquam, purus lorem dignissim ante, vel tincidunt eros nisl eget magna porta ante.',
    ]
  },
]

/*
 * End global variables.
 * Begin main functions.
 */

/**
 * Appends a new section at the bottom of the page.
 * Does nothing if the current number of section is `MOCK_SECTIONS.length`.
 * @returns {HTMLElement | null} the new section, if any.
 */
export function appendSection() {
  // Get all sections.
  const sections = document.querySelectorAll('main > section');

  // Can we insert a new section at the bottom?
  if (sections.length < MOCK_SECTIONS.length) {
    // Retrieve the mock data.
    const sectionData = MOCK_SECTIONS[sections.length];

    // Retrieve the template and clone it.
    /** @type{HTMLTemplateElement} */
    // @ts-ignore: Type 'HTMLTemplateElement | null' is not assignable ... .
    const sectionTemplate = document.querySelector('#section-template');
    /** @type {DocumentFragment} */
    // @ts-ignoreType: Type 'Node' is missing the following properties ... .
    const sectionFragment = sectionTemplate.content.cloneNode(/*deep=*/true);

    // Update the new section.
    /** @type {HTMLElement} */
    // @ts-ignore: Type 'HTMLElement | null' is not assignable ... .
    const section = sectionFragment.querySelector('section');
    section.id = sectionData['id'];
    section.setAttribute('data-nav', sectionData['dataNav']);

    // Update the button.
    /** @type {HTMLElement} */
    // @ts-ignore: Type 'HTMLElement | null' is not assignable ... .
    const btn = section.querySelector('.collapsible__btn');
    btn.textContent = sectionData['title'];

    // Uupdate the paragraphs.
    const ps = section.querySelectorAll('.collapsible__content p');
    ps[0].textContent = sectionData['paragraphs'][0];
    ps[1].textContent = sectionData['paragraphs'][1];

    // Insert the new section.
    /** @type {HTMLElement} */
    // @ts-ignore: Type 'HTMLElement | null' is not assignable ... .
    const main = document.querySelector('main')
    main.appendChild(sectionFragment);

    return section;
  } else {
    return null;
  }
}

/**
 * Removes an existing section at the bottom of the page.
 * Does nothing if the current number of section is 1.
 * @returns {HTMLElement | null} the existing section, if any.
 */
export function removeSection() {
  // Get all sections.
  const sections = document.querySelectorAll('main > section');

  // Can we remove an existing section at the bottom?
  if (sections.length > 1) {
    // Get the last section.
    /** @type {HTMLElement} */
    // @ts-ignore: Type 'Element' is missing the following properties ... .
    const section = sections[sections.length - 1];
    // ... and remove it.
    section.remove();

    return section
  } else {
    return null;
  }
}

/*
 * End main functions.
 */
