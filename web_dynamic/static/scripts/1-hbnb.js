/* global $ */
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
});
