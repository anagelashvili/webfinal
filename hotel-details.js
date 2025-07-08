// Hotel Details Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Get hotel ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const hotelId = urlParams.get('id') || 1; // Default to 1 if no ID
    
    // Load hotel details
    loadHotelDetails(hotelId);
    
    // Load reviews
    loadReviews(hotelId);
    
    // Image gallery functionality
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-image');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            thumb.classList.add('active');
            
            // Change main image
            const newSrc = thumb.getAttribute('data-image');
            mainImage.src = newSrc;
        });
    });
    
    // Booking form validation
    document.getElementById('booking-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const checkIn = document.getElementById('check-in-date').value;
        const checkOut = document.getElementById('check-out-date').value;
        const roomType = document.getElementById('room-type').value;
        
        if (!checkIn || !checkOut || !roomType) {
            alert('Please fill in all required fields');
            return;
        }
        
        if (new Date(checkOut) <= new Date(checkIn)) {
            alert('Check-out date must be after check-in date');
            return;
        }
        
        // In a real app, this would process the booking
        alert('Booking successful! Thank you for your reservation.');
        
        // Store booking in localStorage
        const booking = {
            hotelId,
            checkIn,
            checkOut,
            roomType,
            date: new Date().toISOString()
        };
        
        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));
    });
});

async function loadHotelDetails(hotelId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${hotelId}`);
        const data = await response.json();
        
        // Display hotel details
        document.getElementById('hotel-name').textContent = data.company.name;
        document.querySelector('.location span').textContent = `${data.address.city}, ${data.address.street}`;
        
        // In a real app, we would have more detailed hotel information
    } catch (error) {
        console.error('Error loading hotel details:', error);
    }
}

async function loadReviews(hotelId) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments?postId=' + hotelId);
        const reviews = await response.json();
        
        const container = document.getElementById('reviews-container');
        container.innerHTML = '';
        
        if (reviews.length === 0) {
            container.innerHTML = '<p>No reviews yet for this hotel.</p>';
            return;
        }
        
        // Limit to 5 reviews
        reviews.slice(0, 5).forEach(review => {
            const rating = (Math.random() * 2 + 3).toFixed(1);
            const reviewDate = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString();
            
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review';
            reviewElement.innerHTML = `
                <div class="review-header">
                    <div class="user">
                        <img src="https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg" alt="User">
                        <div>
                            <h4>${review.name.split(' ')[0]}</h4>
                            <div class="rating">${'★'.repeat(Math.floor(rating))}${'☆'.repeat(5 - Math.floor(rating))} ${rating}</div>
                        </div>
                    </div>
                    <span class="date">${reviewDate}</span>
                </div>
                <div class="review-content">
                    <p>${review.body}</p>
                </div>
            `;
            
            container.appendChild(reviewElement);
        });
    } catch (error) {
        console.error('Error loading reviews:', error);
        document.getElementById('reviews-container').innerHTML = '<p>Unable to load reviews. Please try again later.</p>';
    }
}