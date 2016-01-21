$(function() {
  registerNavButtons();
  initPhotoGallery();
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

function initPhotoGallery() {
  $('.gallery-img').each(function(index, el) {
    $(el).click(onThumbnailClick);
  });
}

function onThumbnailClick(e) {
  e.preventDefault();

  var index = parseInt($(e.target.parentNode).data('index'), 10);

  openPhotoSwipe(index);

  return false;
}

function getItems() {
  return $('.gallery-img').map(function(index, el) {
    return {
      src: $(el).attr('href'),
      w: parseInt($(el).data('width'), 10),
      h: parseInt($(el).data('height'), 10)
    };
  });
}

function openPhotoSwipe(index) {
  var pswpElement = $('.pswp')[0];

  var items = getItems();

  var options = {
    index: index,
    captionEl: false,
    fullscreenEl: false,
    shareEl: false
  };

  gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
  gallery.init();
};
