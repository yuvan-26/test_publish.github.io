document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded event fired'); // Debugging output

    // Declare the parsed variable outside the fetchPlantData function
    let parsed;

    // Fetch plant data from the backend API
    async function fetchPlantData() {
        try {
            const response = await fetch('https://render-api-2cxj.onrender.com/plant_data');
            const data = await response.json();

            console.log('Fetched data (before parsing):', data); // Check the content of data
            parsed = JSON.parse(data); // Assign data to the parsed variable after parsing

            // Check if parsed is an array
            if (Array.isArray(parsed)) {
                console.log('Parsed data is an array');
                // Populate the UI with plant data
                displayAllPlants(parsed);
                displayRandomPlants(parsed);
            } else {
                throw new Error('Parsed data is not an array');
            }
        } catch (error) {
            console.error('Error fetching plant data:', error.message);
        }
    }

    function displayAllPlants(data) {
        console.log('displayAllPlants called'); // Debugging output
        const plantList = document.getElementById('plantList');
        plantList.innerHTML = ''; // Clear previous contents if any

        // Sort data by Common Name alphabetically
        data.sort((a, b) => {
            if (a['Common Name'] < b['Common Name']) return -1;
            if (a['Common Name'] > b['Common Name']) return 1;
            return 0;
        });

        data.forEach(plant => {
            console.log('Creating button for plant:', plant['Common Name']); // Log the plant name
            const btn = document.createElement('button');
            btn.textContent = plant['Common Name'];
            btn.addEventListener('click', () => {
                console.log('Button clicked for plant:', plant['Common Name']); // Log the button click event
                displayPlantInfo(plant);
            });
            plantList.appendChild(btn);
        });

        // Setup toggle functionality for buttons
        setupToggle('btn', 'plantList');
    }

    function displayRandomPlants(data) {
        console.log('displayRandomPlants called'); // Debugging output
        const randomPlants = chooseRandom(data, 8); // Choose 4 random plants
        console.log('Random plants selected:', randomPlants); // Debugging output
        const galleryDiv = document.getElementById('plantInfo');
        galleryDiv.innerHTML = ''; // Clear previous contents if any

        randomPlants.forEach(plant => {
            const imgContainer = document.createElement('div');
            imgContainer.innerHTML = `
                <div class="plant-card">
                    <div class="image-container-plant">
                        <img src="${plant['Image Url']}" alt="${plant['Common Name']} Image" class="plant-image-modeling">
                    </div>
                    <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 30%; background-color: #403323;">
                        <div style="width: 90%; font-size: 20px; font-family: 'Jost'; color: #FFFFFF; text-align: center;">
                            ${plant['Common Name']}
                        </div>
                    </div>
                </div>
            `;
            galleryDiv.appendChild(imgContainer);

            imgContainer.addEventListener('click', () => displayPlantInfo(plant));
        });
    }

    function chooseRandom(data, num) {
        const shuffled = data.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

    function displayPlantInfo(plant) {
        console.log('Displaying info for plant:', plant); // Debugging output
        const infoDiv = document.getElementById('plantInfo');
        infoDiv.innerHTML = `
            <div style="display: flex; font-family: 'Jost'; width:100%">
                <div style="width: 55%; gap: 30px;">
                    <div style="font-size: 30px; font-weight: 400px; margin-bottom: 20px">${plant['Common Name']}</div>
                    <div><strong>Botanical Name:</strong> ${plant['Botanical Name']}</div>
                    <div><strong>Plant Type:</strong> ${plant['Plant Type']}</div>
                    <div><strong>Water Needs:</strong> ${plant['Water Needs']}</div>
                    <div><strong>Climate Zones:</strong> ${plant['Climate Zones']}</div>
                    <div><strong>Light Needs:</strong> ${plant['Light Needs']}</div>
                    <div><strong>Soil Type:</strong> ${plant['Soil Type']}</div>
                    <div><strong>Soil Additional:</strong> ${plant['Soil Additional']}</div>
                    <div><strong>Maintenance:</strong> ${plant['Maintenance']}</div>
                    <div><strong>Abcission:</strong> ${plant['Abcission']}</div>
                    <div><strong>Height Ranges:</strong> ${plant['Height Ranges']}</div>
                    <div><strong>Description:</strong> ${plant['Description']}</div>
                </div>
                <div style="width: 40%;">
                    <div style="overflow: hidden; width: 350px; height: 350px">
                        <img src="${plant['Image Url']}" alt="${plant['Common Name']} Image">
                    </div>
                </div>
            </div>
        `;
    }

    function setupToggle(buttonId, listId) {
        const button = document.getElementById(buttonId);
        const list = document.getElementById(listId);
        button.onclick = () => {
            const isActive = list.classList.contains('active');
            if (!isActive) {
                list.classList.add('active');
            } else {
                list.classList.remove('active');
            }
        };
    }

    // Call the function to fetch and display plant data
    fetchPlantData();
});
