function toggleCategory(header) {
    const card = header.parentElement;
    const isActive = card.classList.contains('active');
    
    // Close all other categories
    document.querySelectorAll('.category-card').forEach(otherCard => {
        if (otherCard !== card) {
            otherCard.classList.remove('active');
        }
    });
    
    // Toggle current category
    if (isActive) {
        card.classList.remove('active');
    } else {
        card.classList.add('active');
    }
}

// Optional: Add smooth scroll behavior when opening a category
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.category-card');
    
    cards.forEach(card => {
        const header = card.querySelector('.category-header');
        header.addEventListener('click', function() {
            // Small delay to ensure smooth animation
            setTimeout(() => {
                if (card.classList.contains('active')) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 100);
        });
    });
});
