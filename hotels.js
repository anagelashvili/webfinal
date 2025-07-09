document.addEventListener('DOMContentLoaded', () => {
    // Sample hotel data with reliable image URLs
    const sampleHotels = [
        {
            id: 1,
            name: "Grand Plaza Hotel",
            city: "New York",
            price: 299,
            rating: 4.5,
            stars: 5,
            hasWifi: true,
            hasPool: true,
            hasGym: true,
            hasParking: true,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 2,
            name: "Beach Resort",
            city: "Miami",
            price: 349,
            rating: 4.2,
            stars: 4,
            hasWifi: true,
            hasPool: true,
            hasGym: false,
            hasParking: true,
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 3,
            name: "Mountain Lodge",
            city: "Aspen",
            price: 229,
            rating: 4.7,
            stars: 4,
            hasWifi: true,
            hasPool: false,
            hasGym: true,
            hasParking: true,
            image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        }
    ];

    // Store hotels and initialize
    localStorage.setItem('hotels', JSON.stringify(sampleHotels));
    let currentPage = 1;
    const hotelsPerPage = 6;

    // Initialize UI
    loadHotels();
    setupEventListeners();

    function loadHotels() {
        const hotels = JSON.parse(localStorage.getItem('hotels')) || [];
        displayHotels(hotels);
        updatePagination(hotels);
    }

    function setupEventListeners() {
        // Price range
        const priceSlider = document.getElementById('price');
        const priceValue = document.getElementById('price-value');
        
        priceSlider.addEventListener('input', () => {
            priceValue.textContent = `$0 - $${priceSlider.value}`;
            filterHotels();
        });

        // Filters
        document.querySelectorAll('.filter input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', filterHotels);
        });

        // Sort
        document.getElementById('sort').addEventListener('change', sortHotels);

        // Pagination
        document.getElementById('next-page').addEventListener('click', () => {
            currentPage++;
            filterHotels();
        });

        document.getElementById('prev-page').addEventListener('click', () => {
            currentPage--;
            filterHotels();
        });

        // Search
        document.getElementById('search-form').addEventListener('submit', (e) => {
            e.preventDefault();
            filterHotels();
        });
    }

    function displayHotels(hotels) {
        const container = document.getElementById('hotels-list');
        container.innerHTML = '';
        
        if (!hotels || hotels.length === 0) {
            container.innerHTML = '<p>No hotels found. Try different filters.</p>';
            return;
        }

        // Pagination slice
        const startIdx = (currentPage - 1) * hotelsPerPage;
        const paginatedHotels = hotels.slice(startIdx, startIdx + hotelsPerPage);

        paginatedHotels.forEach(hotel => {
            container.innerHTML += `
                <div class="hotel-card">
                    <div class="hotel-img">
                        <img src="${hotel.image}" alt="${hotel.name}" loading="lazy">
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
                </div>
            `;
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
        
        const allHotels = JSON.parse(localStorage.getItem('hotels'));
        const filteredHotels = allHotels.filter(hotel => {
            if (hotel.price > maxPrice) return false;
            
            const starKey = `${hotel.stars}-star`;
            if (!starFilters[starKey]) return false;
            
            if (amenities.wifi && !hotel.hasWifi) return false;
            if (amenities.pool && !hotel.hasPool) return false;
            if (amenities.gym && !hotel.hasGym) return false;
            if (amenities.parking && !hotel.hasParking) return false;
            
            return true;
        });
        
        sortHotels(filteredHotels);
    }

    function sortHotels(hotels) {
        const sortValue = document.getElementById('sort').value;
        
        const sorted = [...hotels].sort((a, b) => {
            switch (sortValue) {
                case 'price-low': return a.price - b.price;
                case 'price-high': return b.price - a.price;
                case 'rating': return b.rating - a.rating;
                default: return b.rating - a.rating;
            }
        });
        
        displayHotels(sorted);
    }

    function updatePagination(hotels) {
        const totalPages = Math.ceil(hotels.length / hotelsPerPage);
        document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages}`;
        document.getElementById('prev-page').disabled = currentPage <= 1;
        document.getElementById('next-page').disabled = currentPage >= totalPages;
    }
});