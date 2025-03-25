document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();

    // Append all selected files to the formData
    for (let i = 0; i < fileInput.files.length; i++) {
        formData.append('file[]', fileInput.files[i]);
    }

    // Send the files to the server
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            data.urls.forEach(url => displayMedia(url));
        } else {
            alert('Upload failed!');
        }
    })
    .catch(error => console.error('Error:', error));
});

// Function to display media based on file type
function displayMedia(url) {
    const mediaList = document.getElementById('mediaList');
    const mediaElement = document.createElement('div');

    const fileExtension = url.split('.').pop().toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'].includes(fileExtension)) {
        const imgElement = document.createElement('img');
        imgElement.src = url;
        imgElement.alt = 'Uploaded Image';
        imgElement.style.maxWidth = '200px';
        mediaElement.appendChild(imgElement);
    } else if (['mp3', 'wav', 'ogg'].includes(fileExtension)) {
        const audioElement = document.createElement('audio');
        audioElement.controls = true;
        audioElement.src = url;
        mediaElement.appendChild(audioElement);
    } else if (['mp4', 'avi', 'mov', 'webm'].includes(fileExtension)) {
        const videoElement = document.createElement('video');
        videoElement.controls = true;
        videoElement.src = url;
        mediaElement.appendChild(videoElement);
    } else if (['pdf', 'txt', 'doc', 'docx'].includes(fileExtension)) {
        const docElement = document.createElement('a');
        docElement.href = url;
        docElement.textContent = 'Download Document';
        docElement.target = '_blank';
        mediaElement.appendChild(docElement);
    } else if (['zip', 'rar'].includes(fileExtension)) {
        const zipElement = document.createElement('a');
        zipElement.href = url;
        zipElement.textContent = 'Download Archive';
        zipElement.target = '_blank';
        mediaElement.appendChild(zipElement);
    }

    mediaList.appendChild(mediaElement);
}
