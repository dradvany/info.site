function openProject(projectId) {
    document.body.classList.add('project-open');
    const container = document.getElementById('projectContainer');
    container.style.display = 'block';
    
    document.querySelectorAll('.project-content').forEach(el => {
        el.style.display = 'none';
    });
    
    document.getElementById(projectId).style.display = 'block';
    
    // Always scroll to top
    container.scrollTop = 0;
    
    // Update URL without scrolling
    history.replaceState(null, null, '#' + projectId);
}

function closeProject() {
    document.body.classList.remove('project-open');
    document.getElementById('projectContainer').style.display = 'none';
    history.replaceState(null, null, window.location.pathname);
}

function checkMobileClose() {
    if (window.innerWidth <= 768) {
        closeProject();
    }
}

// Check for anchor link on page load
window.addEventListener('load', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'decay-type' || hash === 'archive-installation') {
        openProject(hash);
    }
    checkMobileClose();
});

window.addEventListener('resize', checkMobileClose);