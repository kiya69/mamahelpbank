// Language schools data
const languageSchools = {
    'Berlin': [
        'did deutsch-institut',
        'Carl Duisberg Centren (CDC)',
        'GLS Berlin',
        'BWS Germanlingua',
        'Humboldt-Institut e.V.',
        'iik Deutschland'
    ],
    'Hamburg': [
        'did deutsch-institut',
        'Colón Language Center'
    ],
    'Frankfurt': [
        'did deutsch-institut',
        'Sprachcaffe'
    ],
    'München': [
        'did deutsch-institut',
        'Carl Duisberg Centren (CDC)',
        'BWS Germanlingua'
    ],
    'Köln': [
        'BWS Germanlingua',
        'Carl Duisberg Centren (CDC)'
    ],
    'Stuttgart': [
        'anglo-german Institute (agi)'
    ],
    'Marburg': [
        'Carl Duisberg Centren (CDC)'
    ],
    'Radolfzell': [
        'Carl Duisberg Centren (CDC)'
    ],
    'Saarbrücken': [
        'Carl Duisberg Centren (CDC)'
    ],
    'Konstanz': [
        'Humboldt-Institut e.V.'
    ],
    'Lindenberg': [
        'Humboldt-Institut e.V.'
    ],
    'Bad Schussenried': [
        'Humboldt-Institut e.V.'
    ],
    'Düsseldorf': [
        'iik Deutschland',
        'GoAcademy! International House Duesseldorf Sprachschule'
    ],
    'Heidelberg': [
        'Alpha Aktiv Language Academy'
    ],
    'Dresden': [
        'Kästner Kolleg'
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    const markers = document.querySelectorAll('.city-marker');
    const tooltip = document.getElementById('map-tooltip');
    const schoolsList = document.getElementById('schools-list');

    // Handle marker hover
    markers.forEach(marker => {
        const cityName = marker.getAttribute('data-city');
        
        marker.addEventListener('mouseenter', function(e) {
            const schools = languageSchools[cityName] || [];
            if (schools.length > 0) {
                showTooltip(e, cityName, schools);
            }
        });

        marker.addEventListener('mousemove', function(e) {
            if (tooltip.classList.contains('show')) {
                updateTooltipPosition(e);
            }
        });

        marker.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });

    // Populate schools list
    populateSchoolsList();

    function showTooltip(e, cityName, schools) {
        const header = tooltip.querySelector('.tooltip-header');
        const content = tooltip.querySelector('.tooltip-content');
        
        header.textContent = cityName;
        content.innerHTML = schools.map(school => 
            `<div class="school-item">
                <div class="school-name">${school}</div>
            </div>`
        ).join('');
        
        tooltip.classList.add('show');
        updateTooltipPosition(e);
    }

    function updateTooltipPosition(e) {
        const mapContainer = document.querySelector('.map-container');
        const rect = mapContainer.getBoundingClientRect();
        
        // Get mouse position relative to map container
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Position tooltip near cursor
        let left = x + 20;
        let top = y - 10;
        
        // Adjust if tooltip goes off right edge
        if (left + tooltip.offsetWidth > rect.width - 20) {
            left = x - tooltip.offsetWidth - 20;
        }
        
        // Adjust if tooltip goes off left edge
        if (left < 20) {
            left = 20;
        }
        
        // Adjust if tooltip goes off top edge
        if (top < 20) {
            top = y + 20;
        }
        
        // Adjust if tooltip goes off bottom edge
        if (top + tooltip.offsetHeight > rect.height - 20) {
            top = rect.height - tooltip.offsetHeight - 20;
        }
        
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
    }

    function hideTooltip() {
        tooltip.classList.remove('show');
    }

    function populateSchoolsList() {
        schoolsList.innerHTML = '';
        
        Object.keys(languageSchools).forEach(city => {
            const schools = languageSchools[city];
            if (schools.length > 0) {
                const card = document.createElement('div');
                card.className = 'school-card';
                card.innerHTML = `
                    <div class="city-name">${city}</div>
                    ${schools.map(school => `<div class="school-name">${school}</div>`).join('')}
                `;
                schoolsList.appendChild(card);
            }
        });
    }
});
