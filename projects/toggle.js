document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    let currentOverlay = null;
    
    images.forEach(function(img) {
        img.addEventListener('click', function() {
            if (currentOverlay) {
                document.body.removeChild(currentOverlay);
                currentOverlay = null;
                return;
            }
            
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                padding: 20px;
                box-sizing: border-box;
                cursor: pointer;
            `;
            
            const enlargedImg = document.createElement('img');
            enlargedImg.src = this.src;
            enlargedImg.alt = this.alt;
            enlargedImg.style.cssText = `
                height: 60vh;
                width: auto;
                max-width: 80vw;
                object-fit: contain;
                cursor: pointer;
                padding: 0;
            `;
            
            overlay.appendChild(enlargedImg);
            
            overlay.addEventListener('click', function() {
                document.body.removeChild(overlay);
                currentOverlay = null;
            });
            
            document.body.appendChild(overlay);
            currentOverlay = overlay;
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && currentOverlay) {
            document.body.removeChild(currentOverlay);
            currentOverlay = null;
        }
    });
});