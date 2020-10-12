const bg = () => {
  const KEY_UNSPLASH = "mUNDXdZc6ILSjrjUc4qtlvLSdC0kBf0AoktQdp_iSho";
  const API_UNSPLASH = `https://api.unsplash.com/photos/random/?client_id=${KEY_UNSPLASH}&query=landscape&orientation=landscape`;
  const SEC_REFRESH = 3600;

  const body = document.querySelector("body"),
    locationContainer = document.querySelector(".location");

  const loadBackground = () => {
    const savedImage = localStorage.getItem("bg");
    if (!savedImage) {
      getBackground();
      return;
    }

    const parsedImage = JSON.parse(savedImage);
    const now = Date.now();
    if (parsedImage.expiresOn < now) {
      getBackground();
      return;
    }

    body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url(${parsedImage.url})`;

    const { name, city, country } = parsedImage;
    let text = name;
    if (!name) {
      return;
    }

    if (city && !text.includes(city)) {
      text += `, ${city}`;
    }
    if (country && !text.includes(country)) {
      text += `, ${country}`;
    }

    locationContainer.innerText = text;
  };

  const saveBackground = (imageUrl, city, country, name) => {
    const expirationTs = Date.now() + SEC_REFRESH * 1000;
    const imageObject = {
      url: imageUrl,
      expiresOn: expirationTs,
      city,
      country,
      name
    };
    localStorage.setItem("bg", JSON.stringify(imageObject));
    loadBackground();
  };

  const getBackground = () => {
    fetch(API_UNSPLASH)
      .then((response) => {
        if (!response.ok) {
          console.error(`Error ${response.status}\n`);
          response.text().then(console.error);
          return null;
        }
        return response.json();
      })
      .then((json) => {
        if (!json) {
          return;
        }

        console.dir(json);
        if (!json.urls || !json.urls.full || !json.location) {
          getBackground();
          return;
        }

        const {
          urls: { full },
          location: { city, country, name }
        } = json;
        saveBackground(full, city, country, name);
      });
  };

  const init = () => {
    loadBackground();
  };
  init();
};
bg();
