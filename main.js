

document.addEventListener('DOMContentLoaded', function() {
   
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
        initializeConverter();
    }
});

function initializeConverter() {
    const fileInput = document.getElementById('file-input');
    const fileName = document.getElementById('file-name');
    const fileSize = document.getElementById('file-size');
    const fileInfo = document.querySelector('.file-info');
    const convertBtn = document.getElementById('convert-btn');
    const downloadBtn = document.getElementById('download-btn');
    const progress = document.querySelector('.progress');
    const errorMessage = document.querySelector('.error-message');
    
    
    fileInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            
            
            fileName.textContent = file.name;
            fileSize.textContent = formatFileSize(file.size);
            fileInfo.classList.add('show');
            
            
            convertBtn.disabled = false;
            
          
            errorMessage.classList.remove('show');
            
            
            downloadBtn.classList.remove('show');
        }
    });
    
   
    const dropArea = document.querySelector('.upload-container');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        dropArea.classList.add('highlight');
    }
    
    function unhighlight() {
        dropArea.classList.remove('highlight');
    }
    
    dropArea.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length > 0) {
            fileInput.files = files;
            
           
            const event = new Event('change');
            fileInput.dispatchEvent(event);
        }
    }
    
  
    convertBtn.addEventListener('click', function() {
        if (fileInput.files.length === 0) {
            showError('Please select a file first');
            return;
        }
        
       
        const pageName = window.location.pathname.split('/').pop();
        const file = fileInput.files[0];
        
        
        convertBtn.disabled = true;
        
       
        simulateProgress()
            .then(() => {
                
                return convertFile(file, pageName);
            })
            .then(result => {
                if (result.success) {
                    
                    downloadBtn.classList.add('show');
                    downloadBtn.setAttribute('href', result.downloadUrl);
                    downloadBtn.setAttribute('download', result.fileName);
                } else {
                    showError(result.error || 'Conversion failed. Please try again.');
                   
                    convertBtn.disabled = false;
                }
            })
            .catch(error => {
                showError('An unexpected error occurred. Please try again.');
                console.error(error);
               
                convertBtn.disabled = false;
            });
    });
    
    
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
    }
    
 
    function simulateProgress() {
        return new Promise(resolve => {
            let width = 0;
            const interval = setInterval(() => {
                if (width >= 90) {
                    clearInterval(interval);
                    resolve();
                } else {
                    width += Math.random() * 10;
                    progress.style.width = `${Math.min(width, 90)}%`;
                }
            }, 200);
        });
    }
    
    // Function to convert file (simulation for demo purposes)
    function convertFile(file, pageName) {
        return new Promise(resolve => {
            // In a real application, this would be an API call to a server
            // For demonstration, we'll simulate a conversion process
            setTimeout(() => {
                // Complete the progress bar
                progress.style.width = '100%';
                
                // Create a fake result object
                const result = {
                    success: true,
                    downloadUrl: URL.createObjectURL(file), // Just use the original file for demo
                    fileName: getOutputFileName(file.name, pageName)
                };
                
                resolve(result);
            }, 1500);
        });
    }
    
    // Function to format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // Function to generate output file name based on conversion type
    function getOutputFileName(originalName, pageName) {
        const nameParts = originalName.split('.');
        const nameWithoutExt = nameParts.slice(0, -1).join('.');
        
        switch (pageName) {
            case 'pdf-to-jpg.html':
                return `${nameWithoutExt}.jpg`;
            case 'jpg-to-pdf.html':
                return `${nameWithoutExt}.pdf`;
            case 'pdf-to-doc.html':
            case 'pdf-to-word.html':
                return `${nameWithoutExt}.docx`;
            case 'doc-to-pdf.html':
            case 'word-to-pdf.html':
                return `${nameWithoutExt}.pdf`;
            case 'mp3-to-mp4.html':
                return `${nameWithoutExt}.mp4`;
            case 'compress.html':
                return `${nameWithoutExt}_compressed.${nameParts[nameParts.length - 1]}`;
            default:
                return originalName;
        }
    }
} 
