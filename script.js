// MENU MOBILE

document.addEventListener('DOMContentLoaded', function() {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navbar = document.getElementById('navbar');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Toggle menu mobile
    if (mobileBtn) {
        mobileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navbar.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Gestion des dropdowns sur mobile AVEC le bouton trigger
    if (window.innerWidth <= 768) {
        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('.dropdown-trigger');
            if (trigger) {
                trigger.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    dropdown.classList.toggle('active');
                });
            }
        });
    }
    
    // Fermer le menu en cliquant ailleurs
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (navbar && mobileBtn && !navbar.contains(e.target) && !mobileBtn.contains(e.target)) {
                navbar.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                document.body.style.overflow = '';
            }
        }
    });
    
    // Fermer le menu lors du clic sur un lien (sauf le trigger)
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navbar.classList.remove('active');
                if (mobileBtn) {
                    const icon = mobileBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                document.body.style.overflow = '';
            }
        });
    });
    
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Animation fade au scroll
    const fadeElements = document.querySelectorAll('.axe-card, .prog-card, .perspective-card, .team-card, .value-card');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });
    
    // Gestion du scroll pour la navbar
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll && currentScroll > 100) {
            if (header) header.style.transform = 'translateY(-100%)';
        } else {
            if (header) header.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });
    
    // Réactiver le scroll quand on redimensionne
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (navbar) {
                navbar.classList.remove('active');
                document.body.style.overflow = '';
            }
            if (mobileBtn) {
                const icon = mobileBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });

    
    // PAGE DON - GESTION DES MONTANTS

    const amountBtns = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.querySelector('.custom-amount-input');
    const customAmountField = document.getElementById('customAmount');
    const donTotalDisplay = document.getElementById('donTotalDisplay');
    let selectedAmount = 0;
    
    if (amountBtns.length > 0) {
        amountBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Retirer la classe active de tous les boutons
                amountBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                if (this.classList.contains('custom-amount')) {
                    customAmountInput.style.display = 'block';
                    selectedAmount = 0;
                    if (donTotalDisplay) donTotalDisplay.textContent = '0 F';
                } else {
                    customAmountInput.style.display = 'none';
                    selectedAmount = parseInt(this.getAttribute('data-amount'));
                    if (donTotalDisplay) donTotalDisplay.textContent = selectedAmount + ' €';
                }
            });
        });
        
        if (customAmountField) {
            customAmountField.addEventListener('input', function() {
                selectedAmount = parseInt(this.value) || 0;
                if (donTotalDisplay) donTotalDisplay.textContent = selectedAmount + ' €';
            });
        }
    }
    
    // VALIDATION FORMULAIRE CONTACT
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simulation d'envoi - à remplacer par votre logique backend
            alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
            this.reset();
        });
    }
    

    // VALIDATION FORMULAIRE DON
    const donForm = document.getElementById('donForm');
    if (donForm) {
        donForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (selectedAmount === 0) {
                alert('Veuillez sélectionner ou saisir un montant de don.');
                return;
            }
            // Simulation d'envoi - à remplacer par la logique backend (API Mobile Money)
            alert('Merci pour votre générosité ! Vous allez être redirigé vers la page de paiement sécurisé.');
            // Ici, intégration API Mobile Money (MTN/Moov)
        });
    }

    // PAGE BÉNÉVOLAT - GESTION MODAL
    const modal = document.getElementById('applyModal');
    const applyBtns = document.querySelectorAll('.apply-btn');
    const modalClose = document.querySelector('.modal-close');
    const modalOfferName = document.getElementById('modalOfferName');
    const applicationForm = document.getElementById('applicationForm');
    
    if (applyBtns.length > 0) {
        applyBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const offerName = this.getAttribute('data-offer');
                if (modalOfferName) modalOfferName.textContent = offerName;
                if (modal) modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Fermer modal en cliquant en dehors
    if (modal) {
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simulation d'envoi - à remplacer par votre logique backend
            alert('Merci pour votre candidature ! Nous vous contacterons dans les plus brefs délais.');
            modal.classList.remove('active');
            document.body.style.overflow = '';
            this.reset();
        });
    }

});