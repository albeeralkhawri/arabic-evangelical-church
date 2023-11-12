function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 53.332614420288564, lng: -6.258819521424945 },
        zoom: 15,
    });
    const request = {
        placeId: "ChIJOU8ohKEOZ0gRd1Btr4d8Skk",
        fields: ["name", "formatted_address", "geometry", "photo", "url"],
    };
    const infowindow = new google.maps.InfoWindow();
    const service = new google.maps.places.PlacesService(map);

    // Create an overlay div for additional info inside the map
    const overlayDiv = document.createElement("div");
    overlayDiv.style.position = "absolute";
    overlayDiv.style.top = "10px";
    overlayDiv.style.left = "10px";
    overlayDiv.style.width = "300px"; // Adjust width as needed
    overlayDiv.style.height = "200px"; // Adjust height as needed
    overlayDiv.style.zIndex = "1000";
    // Ensure it appears above the map
    document.getElementById("map").appendChild(overlayDiv);

    service.getDetails(request, (place, status) => {
        if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            place &&
            place.geometry &&
            place.geometry.location
        ) {
            const content = document.createElement("div");

            // Add an anchor element for the place photo
            if (place.photos && place.photos.length > 0) {
                const photoUrl = place.photos[0].getUrl();
                const photoLink = document.createElement("a");
                photoLink.href = place.url;
                photoLink.target = "_blank"; // Open link in a new tab
                const photoElement = document.createElement("img");
                // Set max-width to limit the size of the photo
                photoElement.style.maxWidth = "10%";
                photoElement.src = photoUrl;
                photoLink.appendChild(photoElement);
                content.appendChild(photoLink);
            }

            // Add the name as an h6 element with a link to Google Maps
            const nameElement = document.createElement("h6");
            const nameLink = document.createElement("a");
            nameLink.href = place.url;
            nameLink.target = "https://www.google.com/maps/place/Adelaide+Road+Presbyterian+Church/@53.332593,-6.258498,20z/data=!4m6!3m5!1s0x48670ea184284f39:0x494a7c87af6d5077!8m2!3d53.3324977!4d-6.2588292!16s%2Fg%2F11rs0qt6r?hl=en-US&entry=ttu"; // Open link in a new tab
            nameLink.textContent = 'Arabic Evangelical Church الكنيسة الانجيلية العربية في ايرلندا';
            nameElement.appendChild(nameLink);
            content.appendChild(nameElement);

            const placeIdElement = document.createElement("p");
            placeIdElement.textContent = place.place_id;
            content.appendChild(placeIdElement);

            const placeAddressElement = document.createElement("p");
            placeAddressElement.textContent = place.formatted_address;
            content.appendChild(placeAddressElement);

            const marker = new google.maps.Marker({
                map,
                position: place.geometry.location,
                title: 'Arabic Evangelical Church الكنيسة الانجيلية العربية في ايرلندا'
            });

            google.maps.event.addListener(marker, "click", () => {
                // Update the overlay div content on marker click
                overlayDiv.innerHTML = "";
                overlayDiv.appendChild(content);
                // Show the infowindow when clicking on the marker
                infowindow.setContent(content);
                infowindow.open(map, marker);
            });
        }
    });
}

window.initMap = initMap;
