// Portfolio Interactive Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Toggle functionality for Other Projects
    const toggle = document.getElementById('other-projects-toggle');
    const otherProjectsSection = document.getElementById('other-projects');
    
    if (toggle && otherProjectsSection) {
        toggle.addEventListener('change', function() {
            if (this.checked) {
                otherProjectsSection.classList.remove('hidden');
            } else {
                otherProjectsSection.classList.add('hidden');
            }
        });
    }
    
    // Drag and Drop functionality
    let draggedElement = null;
    
    // Add drag event listeners to all projects
    const projects = document.querySelectorAll('.project[draggable="true"]');
    const projectsSections = document.querySelectorAll('.projects-section');
    
    projects.forEach(project => {
        project.addEventListener('dragstart', handleDragStart);
        project.addEventListener('dragend', handleDragEnd);
    });
    
    projectsSections.forEach(section => {
        section.addEventListener('dragover', handleDragOver);
        section.addEventListener('drop', handleDrop);
        section.addEventListener('dragenter', handleDragEnter);
        section.addEventListener('dragleave', handleDragLeave);
    });
    
    function handleDragStart(e) {
        draggedElement = this;
        this.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.outerHTML);
    }
    
    function handleDragEnd(e) {
        this.classList.remove('dragging');
        // Clean up any drag-over classes
        projectsSections.forEach(section => {
            section.classList.remove('drag-over');
        });
    }
    
    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }
    
    function handleDragEnter(e) {
        this.classList.add('drag-over');
    }
    
    function handleDragLeave(e) {
        // Only remove if we're actually leaving the section
        if (!this.contains(e.relatedTarget)) {
            this.classList.remove('drag-over');
        }
    }
    
    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        
        this.classList.remove('drag-over');
        
        if (draggedElement !== null && this !== draggedElement.parentNode) {
            // Create a new element from the dragged content
            const newElement = document.createElement('div');
            newElement.innerHTML = e.dataTransfer.getData('text/html');
            const newProject = newElement.firstChild;
            
            // Add drag functionality to the new element
            newProject.addEventListener('dragstart', handleDragStart);
            newProject.addEventListener('dragend', handleDragEnd);
            
            // Append to the new section
            this.appendChild(newProject);
            
            // Remove the original element
            draggedElement.remove();
            
            // Smooth animation
            newProject.style.opacity = '0';
            newProject.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                newProject.style.transition = 'all 0.3s ease';
                newProject.style.opacity = '1';
                newProject.style.transform = 'translateY(0)';
            }, 10);
        }
        
        return false;
    }
    
    // Save state to localStorage (optional)
    function saveProjectsState() {
        const recentProjects = Array.from(document.querySelectorAll('#recent-projects .project')).map(p => p.dataset.project);
        const otherProjects = Array.from(document.querySelectorAll('#other-projects .project')).map(p => p.dataset.project);
        const otherProjectsVisible = document.getElementById('other-projects-toggle').checked;
        
        localStorage.setItem('portfolioState', JSON.stringify({
            recent: recentProjects,
            other: otherProjects,
            otherVisible: otherProjectsVisible
        }));
    }
    
    // Load state from localStorage (optional)
    function loadProjectsState() {
        const saved = localStorage.getItem('portfolioState');
        if (saved) {
            const state = JSON.parse(saved);
            document.getElementById('other-projects-toggle').checked = state.otherVisible;
            
            if (!state.otherVisible) {
                otherProjectsSection.classList.add('hidden');
            }
        }
    }
    
    // Auto-save state when changes are made
    document.addEventListener('drop', saveProjectsState);
    if (toggle) {
        toggle.addEventListener('change', saveProjectsState);
    }
    
    // Load saved state on page load
    loadProjectsState();
});