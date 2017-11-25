export default function autocomplete(input, latInput, lngInput) {
  if (!input) {
    return;
  }

  const ENTER_KEYCODE = 13;

  const dropdown = new google.maps.places.Autocomplete(input);

  dropdown.addListener('place_changed', () => {
    const place = dropdown.getPlace();
    latInput.value = place.geometry.location.lat();
    lngInput.value = place.geometry.location.lng();
  });

  input.on('keydown', (evt) => {
    if (evt.keyCode === ENTER_KEYCODE) {
      evt.preventDefault();
    }
  });
}
