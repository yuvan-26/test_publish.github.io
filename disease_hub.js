document.addEventListener('DOMContentLoaded', function () {
    fetch('https://bulblos-plant-disease-8203f4e60c19.herokuapp.com/api/plant_disease')
        .then(response => response.json())
        .then(data => {
            populateLists(data);
            displayRandomDiseases(data);
        });

    function populateLists(data) {
        const bacterialList = document.getElementById('bacterialList');
        const fungalList = document.getElementById('fungalList');
        const viralList = document.getElementById('viralList');

        data.forEach(disease => {
            const btn = document.createElement('button');
            btn.textContent = disease.Disease_name;
            btn.addEventListener('click', () => displayDiseaseInfo(disease));

            if (disease.Disease_type === 'Bacterial') {
                bacterialList.appendChild(btn);
            } else if (disease.Disease_type === 'Fungal') {
                fungalList.appendChild(btn);
            } else if (disease.Disease_type === 'Viral') {
                viralList.appendChild(btn);
            }
        });

        setupToggle('bacterialBtn', 'bacterialList', [fungalList, viralList]);
        setupToggle('fungalBtn', 'fungalList', [bacterialList, viralList]);
        setupToggle('viralBtn', 'viralList', [bacterialList, fungalList]);
    }

    function displayRandomDiseases(data) {

        const randomDiseases = chooseRandom(data, 4); // Choose 4 random diseases
        const galleryDiv = document.getElementById('diseaseInfo');
        galleryDiv.innerHTML = ''; // Clear previous contents if any

        randomDiseases.forEach(disease => {
            const imgContainer = document.createElement('div');
            imgContainer.innerHTML =
                `
                                    <div class="disease-card">
                                    <div class="image-container-disease">
                                        <img src="${disease['Image_url']}" alt="${disease['Disease_name']} Image" class="plant-image-modeling">
                                    </div>
                                    <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 30%; background-color: #403323;">
                                        <div style="width: 90%; font-size: 20px; font-family: 'Jost'; color: #FFFFFF; text-align: center;">
                                            ${disease['Disease_name']}
                                        </div>
                                    </div>
                                    </div>
                                    `

            galleryDiv.appendChild(imgContainer);

            imgContainer.addEventListener('click', () => displayDiseaseInfo(disease));
        });
    }

    function chooseRandom(data, num) {
        const shuffled = data.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }


    function setupToggle(buttonId, listId, otherLists) {
        const button = document.getElementById(buttonId);
        const list = document.getElementById(listId);
        button.onclick = () => {
            const isActive = list.classList.contains('active');
            if (!isActive) {
                list.classList.add('active');
                otherLists.forEach(otherList => otherList.classList.remove('active'));
            } else {
                list.classList.remove('active');
            }
        };
    }


    function displayDiseaseInfo(disease) {
        const infoDiv = document.getElementById('diseaseInfo');
        infoDiv.innerHTML = `
                            <div style="display: flex; font-family: 'Jost'; width:100%">
                                <div style="width: 55%; gap: 30px;">
                                    <div style="font-size: 30px; font-weight: 400px; margin-bottom: 20px">${disease.Disease_name}</div>
                                    <div><strong>Description:</strong> ${disease.Description}</div>
                                    <div><strong>Causes:</strong> ${disease.Causes}</div>
                                    <div><strong>Symptoms:</strong> ${disease.Symptoms}</div>
                                    <div><strong>Management Tips:</strong> ${disease.Management_tips}</div>
                                </div>
                                <div style="width: 40%;">
                                <div style="overflow: hidden; width: 350px; height: 350px">
                                    <img src=${disease.Image_url}>
                                </div>
                                </div>
                            </div>
                            
                            `
    }
});
