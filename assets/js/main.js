$(function() {
  registerNavButtons();

  mapboxgl.accessToken = 'pk.eyJ1Ijoia2lyYnkiLCJhIjoiY2lqZzd0d3FlMDE5d3RobTV0NW9hNjM4OCJ9.a_Ro4knFLUPjaQG3cTx3fw';
  var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
    center: [-74.50, 40], // starting position
    zoom: 9 // starting zoom
  });
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
