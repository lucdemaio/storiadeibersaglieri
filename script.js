// Gestione delle pagine / Tab Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page-content');

    // Funzione per mostrare una pagina
    function showPage(pageId) {
        // Nascondi tutte le pagine
        pages.forEach(page => {
            page.classList.remove('active');
        });

        // Mostra la pagina selezionata
        const selectedPage = document.getElementById(pageId);
        if (selectedPage) {
            selectedPage.classList.add('active');
        }

        // Aggiorna i pulsanti del menù
        navBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.page === pageId) {
                btn.classList.add('active');
            }
        });

        // Scroll to top della pagina
        document.querySelector('.content-wrapper').scrollTop = 0;
    }

    // Aggiungi event listener a tutti i pulsanti del menù
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const pageId = this.dataset.page;
            showPage(pageId);
        });
    });

    // Mostra la home page per default
    showPage('home');

    // Smooth scroll per il contenuto interno
    const contentWrapper = document.querySelector('.content-wrapper');
    if (contentWrapper) {
        contentWrapper.addEventListener('scroll', function() {
            // Puoi aggiungere animazioni durante lo scroll se necessario
        });
    }

    // LIGHTBOX FUNCTIONALITY
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    let currentImageIndex = 0;
    let currentImages = [];

    // Aggiungi event listeners alle immagini clickabili
    const clickableImages = document.querySelectorAll('.clickable-image');
    
    clickableImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            currentImages = Array.from(document.querySelectorAll('.clickable-image'));
            currentImageIndex = currentImages.indexOf(this);
            openLightbox(this.src);
        });
    });

    function openLightbox(src) {
        lightboxImage.src = src;
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % currentImages.length;
        lightboxImage.src = currentImages[currentImageIndex].src;
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
        lightboxImage.src = currentImages[currentImageIndex].src;
    }

    // Event listeners per il lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', showNextImage);
    lightboxPrev.addEventListener('click', showPrevImage);

    // Chiudi il lightbox cliccando sul background
    lightboxModal.addEventListener('click', function(e) {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });

    // Navigazione con tastiera
    document.addEventListener('keydown', function(e) {
        if (!lightboxModal.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
    });
});

// Animazione aggiuntiva: aggiorna lo stile della navbar al scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 10) {
        header.style.boxShadow = '0 8px 30px rgba(220, 20, 60, 0.3)';
    } else {
        header.style.boxShadow = '0 4px 20px rgba(220, 20, 60, 0.2)';
    }
});

// FUNZIONE PER AGGIUNGERE I PULSANTI DI CONDIVISIONE
function addShareButtons() {
    const pages = document.querySelectorAll('.page-content');
    
    pages.forEach(page => {
        // Se i pulsanti di condivisione già esistono, rimuovili
        const existingShare = page.querySelector('.share-section');
        if (existingShare) {
            existingShare.remove();
        }
        
        // Crea il div della sezione condivisione
        const shareSection = document.createElement('div');
        shareSection.className = 'share-section';
        
        // Ottieni il titolo della pagina per la condivisione
        const pageTitle = page.querySelector('h2') ? page.querySelector('h2').textContent : 'I Bersaglieri';
        
        // Crea il testo per la condivisione
        const shareText = `Scopri di più su ${pageTitle} nel sito dedicato ai Bersaglieri - Velocità, Onore e Tradizione!`;
        const pageUrl = window.location.href;
        
        // Crea i pulsanti di condivisione
        const shareLabel = document.createElement('div');
        shareLabel.className = 'share-label';
        shareLabel.textContent = 'Condividi questa pagina';
        
        const whatsappBtn = document.createElement('a');
        whatsappBtn.className = 'share-btn whatsapp';
        whatsappBtn.href = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + pageUrl)}`;
        whatsappBtn.target = '_blank';
        whatsappBtn.innerHTML = '📱 WhatsApp';
        
        const telegramBtn = document.createElement('a');
        telegramBtn.className = 'share-btn telegram';
        telegramBtn.href = `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`;
        telegramBtn.target = '_blank';
        telegramBtn.innerHTML = '✈️ Telegram';
        
        // Aggiungi i pulsanti al contenitore
        shareSection.appendChild(shareLabel);
        shareSection.appendChild(whatsappBtn);
        shareSection.appendChild(telegramBtn);
        
        // Aggiungi la sezione di condivisione alla fine della pagina
        // Dopo completamente tutto il contenuto della pagina
        const pageBody = page.querySelector('.page-body');
        if (pageBody && pageBody.parentNode) {
            pageBody.parentNode.insertBefore(shareSection, pageBody.nextSibling);
        } else {
            page.appendChild(shareSection);
        }
    });
}

// Chiama la funzione al caricamento
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addShareButtons, 100);
    
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Aggiungi un piccolo ritardo per assicurarti che la pagina sia visibile
            setTimeout(addShareButtons, 100);
        });
    });
});
