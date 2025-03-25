document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    for (let i = 0; i < fileInput.files.length; i++) {
        formData.append('file', fileInput.files[i]);
    }

    // Sending the file to Catbox API
    fetch('https://catbox.moe/user/api.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())  // Catbox returns a URL as plain text
    .then(data => {
        if (data.startsWith('https://')) {
            displayMedia(data);  // If the response starts with a URL, display the media
        } else {
            alert('Upload failed! Response: ' + data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Upload failed!');
    });
});

function displayMedia(url) {
    const mediaList = document.getElementById('mediaList');
    const mediaElement = document.createElement('a');
    
    // Check file extension to determine whether it's an image, audio, video, etc.
    const fileExtension = url.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
        const imgElement = document.createElement('img');
        imgElement.src = url;
        imgElement.alt = 'Uploaded Image';
        imgElement.style.maxWidth = '300px';
        imgElement.style.maxHeight = '300px';
        mediaElement.appendChild(imgElement);
    } else if (['mp3', 'wav'].includes(fileExtension)) {
        const audioElement = document.createElement('audio');
        audioElement.controls = true;
        audioElement.src = url;
        mediaElement.appendChild(audioElement);
    } else if (['mp4', 'webm', 'avi'].includes(fileExtension)) {
        const videoElement = document.createElement('video');
        videoElement.controls = true;
        videoElement.src = url;
        mediaElement.appendChild(videoElement);
    } else {
        mediaElement.href = url;
        mediaElement.textContent = 'Download file';
    }

    mediaList.appendChild(mediaElement);
}
