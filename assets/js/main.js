$(function() {
  registerNavButtons();
});

function registerNavButtons() {
  var sections = ['bride-and-groom', 'location', 'photos', 'registry', 'rsvp'];

  sections.map(function(section) {
    clickAndScroll('#nav-' + section, '#' + section + '-section');
  });
}

function clickAndScroll(link, section) {
  var delay = 700;

  $(link).click(function() {
    $('html, body').animate({
      scrollTop: $(section).offset().top - 70
    }, delay);

    return false;
  });
}
