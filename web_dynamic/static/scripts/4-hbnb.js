$(() => {
  // Un objet pour stocker les Amenity IDs
  const amenities = {};

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).closest('li').data('id'); // Prendre l'ID de l'aménité de l'élément li le plus proche
    const amenityName = $(this).closest('li').data('name'); // Prendre le nom de l'aménité de l'élément li le plus proche

    if ($(this).is(':checked')) {
      amenities[amenityId] = amenityName;
    } else {
      delete amenities[amenityId];
    }

    $('.amenities h4').text(Object.values(amenities).join(', '));
  });

  $.get('http://127.0.0.1:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  $.ajax({
    url: 'http://127.0.0.1:5001/api/v1/places_search',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (place) {
      for (let i = 0; i < place.length; i++) {
        const user_url = 'http://127.0.0.1:5001/api/v1/users/' + place[i].user_id;
        $.get(user_url, function (owner) {
          const article = `
			<article>
			<div class="title_box">
				<h2>${place[i].name}</h2>
				<div class="price_by_night">$${place[i].price_by_night}</div>
			</div>
			<div class="information">
				<div class="max_guest">${place[i].max_guest} Guest${place[i].max_guest > 1 ? 's' : ''}</div>
				<div class="number_rooms">${place[i].number_rooms} Bedroom${place[i].number_rooms > 1 ? 's' : ''}</div>
				<div class="number_bathrooms">${place[i].number_bathrooms} Bathroom${place[i].number_bathrooms > 1 ? 's' : ''}</div>
			</div>
			<div class="user">
			<b>Owner:</b> ${owner.first_name} ${owner.last_name}
			</div>
			<div class="description">
				${place[i].description || ''}
			</div>

			</article>`;

          $('section.places').append(article);
        });
      }
    },
    error: function (error) {
      console.error(error);
    }
  });

  $('button').on('click', () => {
    $.ajax({
      url: 'http://127.0.0.1:5001/api/v1/places_search',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(amenities),
      success: function (place) {
        for (let i = 0; i < place.length; i++) {
          const user_url = 'http://127.0.0.1:5001/api/v1/users/' + place[i].user_id;
          $.get(user_url, function (owner) {
            const article = `
				<article>
				<div class="title_box">
					<h2>${place[i].name}</h2>
					<div class="price_by_night">$${place[i].price_by_night}</div>
				</div>
				<div class="information">
					<div class="max_guest">${place[i].max_guest} Guest${place[i].max_guest > 1 ? 's' : ''}</div>
					<div class="number_rooms">${place[i].number_rooms} Bedroom${place[i].number_rooms > 1 ? 's' : ''}</div>
					<div class="number_bathrooms">${place[i].number_bathrooms} Bathroom${place[i].number_bathrooms > 1 ? 's' : ''}</div>
				</div>
				<div class="user">
			    <b>Owner:</b> ${owner.first_name} ${owner.last_name}
			  </div>
				<div class="description">
					${place[i].description || ''}
				</div>
	
				</article>`;

            $('section.places').html(article);
          });
        }
      },
      error: function (error) {
        console.error(error);
      }
    });
  });
});
