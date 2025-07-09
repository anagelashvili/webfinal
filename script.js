// script.js - Complete Working Solution
document.addEventListener('DOMContentLoaded', function() {
    // 1. Cookie Notification
    const cookieNotification = document.querySelector('.cookie-notification');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    
    if (!localStorage.getItem('cookiesAccepted')) {
        cookieNotification.style.display = 'flex';
    }
    
    acceptCookiesBtn.addEventListener('click', function() {
        cookieNotification.style.display = 'none';
        localStorage.setItem('cookiesAccepted', 'true');
    });

    // 2. Mobile Navigation
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    burger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
    });

    // 3. Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 4. Featured Hotels
    const featuredHotels = [
        {
            id: 1,
            name: "Grand Plaza Hotel",
            city: "New York",
            price: 299,
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            amenities: ["wifi", "pool", "gym"]
        },
        {
            id: 2,
            name: "Beach Resort",
            city: "Miami",
            price: 349,
            rating: 4.2,
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            amenities: ["wifi", "pool", "spa"]
        },
        {
            id: 3,
            name: "Mountain Lodge",
            city: "Aspen",
            price: 229,
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            amenities: ["wifi", "gym", "fireplace"]
        }
    ];

    const hotelsContainer = document.getElementById('featured-hotels');
    
    featuredHotels.forEach(hotel => {
        const hotelCard = document.createElement('div');
        hotelCard.className = 'hotel-card';
        hotelCard.innerHTML = `
            <div class="hotel-img">
                <img src="${hotel.image}" alt="${hotel.name}" loading="lazy">
            </div>
            <div class="hotel-info">
                <h3>${hotel.name}</h3>
                <p class="location">${hotel.city}</p>
                <div class="hotel-meta">
                    <span class="rating">${'★'.repeat(Math.floor(hotel.rating))}${'☆'.repeat(5-Math.floor(hotel.rating))} ${hotel.rating}</span>
                </div>
                <div class="hotel-price">
                    <span class="price">$${hotel.price}/night</span>
                    <a href="hotels.html?id=${hotel.id}" class="btn">Book Now</a>
                </div>
            </div>
        `;
        hotelsContainer.appendChild(hotelCard);
    });

    // 5. Weather Widget
    const weatherData = [
        { city: "New York", temp: 22, icon: "☀️", desc: "Sunny" },
        { city: "Paris", temp: 18, icon: "⛅", desc: "Partly Cloudy" },
        { city: "Tokyo", temp: 25, icon: "🌧️", desc: "Rainy" }
    ];

    const weatherContainer = document.getElementById('weather-data');
    
    weatherData.forEach(weather => {
        const weatherCard = document.createElement('div');
        weatherCard.className = 'weather-card';
        weatherCard.innerHTML = `
            <h3>${weather.city}</h3>
            <div class="weather-icon">${weather.icon}</div>
            <p>${weather.temp}°C</p>
            <p>${weather.desc}</p>
        `;
        weatherContainer.appendChild(weatherCard);
    });

    // 6. Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = e.target.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        // Basic email validation
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
            
            // Store email in localStorage
            let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
            subscribers.push(email);
            localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
        } else {
            alert('Please enter a valid email address');
            emailInput.focus();
        }
    });

    // 7. Header Scroll Effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});