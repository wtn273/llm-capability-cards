// Filter functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');
    const modal = document.getElementById('card-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.querySelector('.close-modal');

    // Filter cards by Bloom's level
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter cards
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.level === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Modal functionality for viewing cards
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img && img.src && !img.src.includes('undefined')) {
                modalImage.src = img.src;
                modalImage.alt = img.alt;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    function closeModalHandler() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeModal.addEventListener('click', closeModalHandler);

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalHandler();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModalHandler();
        }
    });
});
