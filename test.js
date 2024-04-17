document.addEventListener('DOMContentLoaded', function () {
    const apiUrlElement = document.getElementById('api-url');
    const contentElement = document.getElementById('api-content');

    const apiUrl = 'https://backendapiteam23.azurewebsites.net/plant_data';

    apiUrlElement.textContent = apiUrl;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            contentElement.textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            contentElement.textContent = 'Failed to load API data: ' + error.message;
        });
});
