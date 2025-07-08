// DOM Elements
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const scrollToTopBtn = document.getElementById('scroll-to-top');
const cookieNotification = document.querySelector('.cookie-notification');
const acceptCookiesBtn = document.getElementById('accept-cookies');
const newsletterForm = document.getElementById('newsletter-form');
const featuredHotelsContainer = document.getElementById('featured-hotels');
const weatherContainer = document.getElementById('weather-data');

// Burger Menu Toggle
burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// Scroll to Top Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
    
    // Header background change on scroll
    if (window.pageYOffset > 50) {
        document.querySelector('header').classList.add('header-scrolled');
    } else {
        document.querySelector('header').classList.remove('header-scrolled');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Cookie Notification
if (!localStorage.getItem('cookiesAccepted')) {
    cookieNotification.style.display = 'flex';
}

acceptCookiesBtn.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieNotification.style.display = 'none';
});

// Newsletter Form Validation
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Store in localStorage
    let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
    subscribers.push(email);
    localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
    
    alert('Thank you for subscribing!');
    newsletterForm.reset();
});

// Fetch Featured Hotels from API
async function fetchHotels() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        
        // Limit to 6 hotels for display
        const hotels = data.slice(0, 6);
        
        hotels.forEach(hotel => {
            const price = Math.floor(Math.random() * 300) + 50;
            const rating = (Math.random() * 2 + 3).toFixed(1);
            
            const hotelCard = document.createElement('div');
            hotelCard.className = 'hotel-card';
            hotelCard.innerHTML = `
                <div class="hotel-img">
                    <img src="https://source.unsplash.com/random/600x400/?hotel,${hotel.id}" alt="${hotel.name}">
                </div>
                <div class="hotel-info">
                    <h3>${hotel.company.name}</h3>
                    <p>${hotel.address.city}, ${hotel.address.street}</p>
                    <div class="hotel-price">
                        <span class="price">$${price}/night</span>
                        <span class="rating">⭐ ${rating}</span>
                    </div>
                </div>
            `;
            
            featuredHotelsContainer.appendChild(hotelCard);
        });
    } catch (error) {
        console.error('Error fetching hotels:', error);
        featuredHotelsContainer.innerHTML = '<p>Unable to load hotels. Please try again later.</p>';
    }
}

// Fetch Weather Data from API
async function fetchWeather() {
    const cities = ['New York', 'London', 'Paris', 'Tokyo', 'Dubai'];
    
    try {
        for (const city of cities) {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=YOUR_API_KEY`);
            const data = await response.json();
            
            const weatherCard = document.createElement('div');
            weatherCard.className = 'weather-card';
            
            // Get weather icon
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            
            weatherCard.innerHTML = `
                <h3>${city}</h3>
                <img src="${iconUrl}" alt="${data.weather[0].description}" class="weather-icon">
                <p>${Math.round(data.main.temp)}°C</p>
                <p>${data.weather[0].description}</p>
            `;
            
            weatherContainer.appendChild(weatherCard);
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        
        // Fallback data if API fails
        const fallbackCities = [
            { city: 'New York', temp: 22, desc: 'Sunny' },
            { city: 'London', temp: 18, desc: 'Cloudy' },
            { city: 'Paris', temp: 20, desc: 'Partly Cloudy' },
            { city: 'Tokyo', temp: 25, desc: 'Rainy' },
            { city: 'Dubai', temp: 35, desc: 'Hot' }
        ];
        
        weatherContainer.innerHTML = '<p>Weather data unavailable. Showing sample data.</p>';
        
        fallbackCities.forEach(city => {
            const weatherCard = document.createElement('div');
            weatherCard.className = 'weather-card';
            weatherCard.innerHTML = `
                <h3>${city.city}</h3>
                <p>${city.temp}°C</p>
                <p>${city.desc}</p>
            `;
            
            weatherContainer.appendChild(weatherCard);
        });
    }
}

// Initialize functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchHotels();
    fetchWeather();
    
    // Add animation to sections when they come into view
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
});