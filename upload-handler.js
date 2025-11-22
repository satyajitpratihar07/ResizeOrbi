class FileUploadHandler {
    constructor() {
        this.uploadContainers = document.querySelectorAll('.upload-container');
        this.uploadedFiles = new Map();
        this.initializeUploadContainers();
    }

    initializeUploadContainers() {
        this.uploadContainers.forEach(container => {
            const input = container.querySelector('input[type="file"]');
            const containerId = container.id;

            // Add preview container
            const previewContainer = document.createElement('div');
            previewContainer.className = 'preview-container';
            container.appendChild(previewContainer);

            // Drag and drop events
            container.addEventListener('dragover', (e) => {
                e.preventDefault();
                container.classList.add('drag-over');
            });

            container.addEventListener('dragleave', () => {
                container.classList.remove('drag-over');
            });

            container.addEventListener('drop', (e) => {
                e.preventDefault();
                container.classList.remove('drag-over');
                const files = e.dataTransfer.files;
                this.handleFiles(files, containerId);
            });

            // File input change event
            input.addEventListener('change', () => {
                this.handleFiles(input.files, containerId);
            });
        });
    }

    handleFiles(files, containerId) {
        Array.from(files).forEach(file => {
            // Store file in the Map
            this.uploadedFiles.set(file.name, file);

            // Update all preview containers
            this.updateAllPreviews();
        });
    }

    updateAllPreviews() {
        this.uploadContainers.forEach(container => {
            const previewContainer = container.querySelector('.preview-container');
            previewContainer.innerHTML = ''; // Clear existing previews

            this.uploadedFiles.forEach((file, fileName) => {
                const preview = this.createPreviewElement(file);
                previewContainer.appendChild(preview);
            });
        });
    }

    createPreviewElement(file) {
        const preview = document.createElement('div');
        preview.className = 'file-preview animate-in';

        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            preview.appendChild(img);
        } else {
            const icon = document.createElement('i');
            icon.className = this.getFileIcon(file.type);
            preview.appendChild(icon);
        }

        const name = document.createElement('span');
        name.textContent = file.name;
        preview.appendChild(name);

        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '<i class="fas fa-times"></i>';
        removeBtn.className = 'remove-file';
        removeBtn.onclick = () => this.removeFile(file.name);
        preview.appendChild(removeBtn);

        return preview;
    }

    getFileIcon(fileType) {
        if (fileType.includes('pdf')) return 'fas fa-file-pdf';
        if (fileType.includes('word') || fileType.includes('doc')) return 'fas fa-file-word';
        if (fileType.includes('text')) return 'fas fa-file-alt';
        return 'fas fa-file';
    }

    removeFile(fileName) {
        this.uploadedFiles.delete(fileName);
        this.updateAllPreviews();
    }
}

// Initialize the handler when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FileUploadHandler();
});
