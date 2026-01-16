// Make entire sections clickable
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.service-section');
    
    sections.forEach(section => {
        section.addEventListener('click', function(e) {
            // Don't trigger if clicking on links or buttons
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            const link = section.getAttribute('data-link');
            if (link) {
                window.location.href = link;
            }
        });
    });
});
