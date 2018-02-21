let socket = io();
socket.on('connect', function () {
  console.log('Client connected to server.');

});

socket.on('disconnect', function () {
  console.log('Client disconnected from server.');
});

socket.on('newMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('hh:mm a');
  let template = jQuery('#message-template').html();
  let html = Mustache.render(template, {
    createdAt: formattedTime,
    from: message.from,
    text: message.text
  });

  jQuery('#messages').append(html);

});

socket.on('newLocationMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('hh:mm a')
  let template = jQuery('#location-message-template').html();
  let html = Mustache.render(template, {
    createdAt: formattedTime,
    from: message.from,
    url: message.url
  });

  jQuery('#messages').append(html);

});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name = message]').val()
  }, function () {
    jQuery('[name = message]').val('');
  })
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.')
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch geolocation.');
  });


});