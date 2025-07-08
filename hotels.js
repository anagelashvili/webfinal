// Hotels Listing Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Price range slider
    const priceSlider = document.getElementById('price');
    const priceValue = document.getElementById('price-value');
    
    priceSlider.addEventListener('input', () => {
        const maxPrice = priceSlider.value;
        priceValue.textContent = `$0 - $${maxPrice}`;
        filterHotels();
    });
    
    // Filter checkboxes
    document.querySelectorAll('.filter input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', filterHotels);
    });
    
    // Sort dropdown
    document.getElementById('sort').addEventListener('change', sortHotels);
    
    // Pagination buttons
    let currentPage = 1;
    const hotelsPerPage = 6;
    
    document.getElementById('next-page').addEventListener('click', () => {
        currentPage++;
        updatePagination();
    });
    
    document.getElementById('prev-page').addEventListener('click', () => {
        currentPage--;
        updatePagination();
    });
    
    // Search form
    document.getElementById('search-form').addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real app, this would send the search to the server
        alert('Search functionality would be implemented here');
    });
    
    // Load hotels from API
    loadHotels();
});

async function loadHotels() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        
        // Add some custom properties to simulate hotel data
        const hotels = data.map(user => ({
            id: user.id,
            name: user.company.name,
            city: user.address.city,
            price: Math.floor(Math.random() * 450) + 50,
            rating: (Math.random() * 2 + 3).toFixed(1),
            stars: Math.floor(Math.random() * 2) + 3,
            hasWifi: Math.random() > 0.3,
            hasPool: Math.random() > 0.7,
            hasGym: Math.random() > 0.5,
            hasParking: Math.random() > 0.6
        }));
        
        // Store hotels in localStorage for filtering/sorting
        localStorage.setItem('hotels', JSON.stringify(hotels));
        
        displayHotels(hotels);
    } catch (error) {
        console.error('Error loading hotels:', error);
        document.getElementById('hotels-list').innerHTML = '<p>Unable to load hotels. Please try again later.</p>';
    }
}

function displayHotels(hotels) {
    const container = document.getElementById('hotels-list');
    container.innerHTML = '';
    
    if (hotels.length === 0) {
        container.innerHTML = '<p>No hotels match your filters. Please try different criteria.</p>';
        return;
    }
    
    hotels.forEach(hotel => {
        const hotelCard = document.createElement('div');
        hotelCard.className = 'hotel-card';
        hotelCard.innerHTML = `
            <div class="hotel-img">
                <img src="https://source.unsplash.com/random/600x400/?hotel,${hotel.id}" alt="${hotel.name}">
            </div>
            <div class="hotel-info">
                <h3>${hotel.name}</h3>
                <p>${hotel.city}</p>
                <div class="hotel-meta">
                    <span class="stars">${'★'.repeat(hotel.stars)}${'☆'.repeat(5 - hotel.stars)}</span>
                    <span class="rating">${hotel.rating}</span>
                </div>
                <div class="hotel-price">
                    <span class="price">$${hotel.price}/night</span>
                    <a href="hotel-details.html?id=${hotel.id}" class="btn">View Details</a>
                </div>
            </div>
        `;
        
        container.appendChild(hotelCard);
    });
}

function filterHotels() {
    const maxPrice = document.getElementById('price').value;
    const starFilters = {
        '5-star': document.getElementById('5-star').checked,
        '4-star': document.getElementById('4-star').checked,
        '3-star': document.getElementById('3-star').checked
    };
    
    const amenities = {
        wifi: document.getElementById('wifi').checked,
        pool: document.getElementById('pool').checked,
        gym: document.getElementById('gym').checked,
        parking: document.getElementById('parking').checked
    };
    
    const hotels = JSON.parse(localStorage.getItem('hotels'));
    
    const filteredHotels = hotels.filter(hotel => {
        // Price filter
        if (hotel.price > maxPrice) return false;
        
        // Star rating filter
        const starKey = `${hotel.stars}-star`;
        if (!starFilters[starKey]) return false;
        
        // Amenities filters
        if (amenities.wifi && !hotel.hasWifi) return false;
        if (amenities.pool && !hotel.hasPool) return false;
        if (amenities.gym && !hotel.hasGym) return false;
        if (amenities.parking && !hotel.hasParking) return false;
        
        return true;
    });
    
    sortHotels(filteredHotels);
}

function sortHotels(hotels) {
    if (!hotels) {
        hotels = JSON.parse(localStorage.getItem('filteredHotels')) || JSON.parse(localStorage.getItem('hotels'));
    }
    
    const sortValue = document.getElementById('sort').value;
    
    switch (sortValue) {
        case 'price-low':
            hotels.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            hotels.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            hotels.sort((a, b) => b.rating - a.rating);
            break;
        default:
            // Recommended (default sorting)
            hotels.sort((a, b) => b.rating - a.rating);
    }
    
    localStorage.setItem('filteredHotels', JSON.stringify(hotels));
    displayHotels(hotels);
}

function updatePagination() {
    // In a real app, this would fetch new data from the server
    const totalPages = Math.ceil(30 / 6); // Assuming 30 total hotels
    
    document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === totalPages;
}