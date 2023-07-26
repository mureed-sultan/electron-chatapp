document.addEventListener('DOMContentLoaded', () => {

    const urlParams = new URLSearchParams(window.location.search);
    const countryCode = urlParams.get('countryCode');
    const phoneNumber = urlParams.get('phoneNumber');
    async function fetchCountryCodes() {
      try {
        const response = await fetch('https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json');
        const data = await response.json();

        const countryCodeSelect = document.getElementById('countryCodeSelect');
        data.forEach(country => {
          if (country.hasOwnProperty('dial_code')) {
            const countryCode = country.dial_code;
            const option = new Option(`${countryCode}`, `${countryCode}`);
            if (option.value.length<=4) {
              countryCodeSelect.appendChild(option);
            }
          }
        });
      } catch (error) {
        console.error('Error fetching country codes:', error);
      }
    }

    fetchCountryCodes();

    const countryCodeSelect = document.getElementById('countryCodeSelect');
    countryCodeSelect.addEventListener('change', (event) => {
      const selectedCountryCode = event.target.value;
    });
    if (countryCode && phoneNumber) {
      const phoneNumberDisplay = document.querySelector('.phone-number-display');
      const formattedCountryCode = countryCode.replace(/^\+{1,}/, '+');
      phoneNumberDisplay.textContent = `Phone Number: ${formattedCountryCode} ${phoneNumber}`;
    }
  });

  