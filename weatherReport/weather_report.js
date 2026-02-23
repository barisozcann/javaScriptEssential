// 1) Form submit olunca çalışacak fonksiyon
function showweatherDetails(event) {
  // 2) Formun default davranışını durdur (sayfa yenilenmesin)
  event.preventDefault();

  // 3) Kullanıcı inputlarından lat/lon değerlerini al
  const lat = document.getElementById("lat").value;
  const lon = document.getElementById("lon").value;

  // 4) API key (GÜVENLİK: GitHub'a atarken bunu 'YOUR_API_KEY' yap!)
  const apiKey = "YOUR_API_KEY";

  // 5) Lat/Lon ile OpenWeatherMap Current Weather endpoint'i
  // units=metric -> Celsius
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  // 6) fetch ile HTTP isteği at
  fetch(apiUrl)
    .then((response) => {
      // 7) API bazen 404/401 döner. fetch "error" fırlatmaz; ok değilse biz fırlatıyoruz.
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 8) Response'u JSON'a çevir
      return response.json();
    })
    .then((data) => {
      // 9) Ekrana basacağımız alanı seç
      const weatherInfo = document.getElementById("weatherInfo");

      // 10) Gelen JSON içinden gerekli alanları çek
      const cityName = data.name; // Bazı koordinatlarda boş olabilir (deniz vb.)
      const temp = data.main?.temp;
      const feelsLike = data.main?.feels_like;
      const desc = data.weather?.[0]?.description;
      const humidity = data.main?.humidity;
      const windSpeed = data.wind?.speed;

      // 11) HTML’i dinamik olarak doldur
      weatherInfo.innerHTML = `
        <h2>Weather Result</h2>
        <p><strong>Coordinates:</strong> lat=${lat}, lon=${lon}</p>
        <p><strong>Location:</strong> ${cityName || "Unknown (no city name)"} </p>
        <p><strong>Temperature:</strong> ${temp} &#8451;</p>
        <p><strong>Feels Like:</strong> ${feelsLike} &#8451;</p>
        <p><strong>Weather:</strong> ${desc}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind:</strong> ${windSpeed} m/s</p>
      `;
    })
    .catch((error) => {
      // 12) Hata yakalama: yanlış lat/lon, yanlış API key, ağ problemi vb.
      console.error("Error fetching weather:", error);
      const weatherInfo = document.getElementById("weatherInfo");
      weatherInfo.innerHTML = `
        <p>Failed to fetch weather. Please check latitude/longitude and API key.</p>
        <p><small>${error.message}</small></p>
      `;
    });
}

// 13) Form submit eventini yakala ve kendi fonksiyonunu çalıştır
document.getElementById("weatherForm").addEventListener("submit", showweatherDetails);