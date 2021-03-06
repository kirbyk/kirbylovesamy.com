import $ from 'jquery';
window.jQuery = $;
import Fuse from 'fuse.js';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
import invitees from './invitees.js';
import RSVPModal from './RSVPModal.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
require('bootstrap');


$(function() {
  registerNavButtons();
  initPhotoGallery();
  registerRSVP();
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

  var index = parseInt($(e.target.parentNode).data('index'), 10) - 1;

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

  var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
  gallery.init();
}

function registerRSVP() {
  var denormalized = invitees.map((invitee) => ({
    formatted: invitee.formatted,
    people: invitee.people,
    concatPeople: invitee.people.join(' ')
  }));

  var fuse = new Fuse(denormalized, { keys: ['concatPeople'], tokenize: true });

  $('#rsvp-lookup').click(() => launchRSVPModal(fuse));
  $('#rsvp-name').enter(() => launchRSVPModal(fuse));
}

jQuery.fn.enter = function(callback) {
  var self = $(this[0]);

  self.keypress(function(e) {
    if (e.which == 13) {
      callback();
      return false;
    }
  });
};

function launchRSVPModal(fuse) {
  var attendee = $('#rsvp-name').val().replace('and', '');

  var matchingInvitees = fuse.search(attendee);

  if (matchingInvitees < 1) {
    console.log('error');
    // TODO: display error message
    return;
  }

  ReactDOM.render(
    React.createElement(RSVPModal, { attendee: matchingInvitees[0] }),
    document.getElementById('rsvp-modal-body')
  );

  $('#rsvp-modal').modal();
}
