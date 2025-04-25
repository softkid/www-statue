function toggleMenu() {
    const menu = document.querySelector('.nav-menu');
    menu.classList.toggle('active');
}

async function generateImage() {
    const imageInput = document.getElementById('imageInput');
    const generatedImageDiv = document.getElementById('generatedImage');
    const file = imageInput.files[0];

    if (!file) {
        generatedImageDiv.innerHTML = '<p>Please upload an image.</p>';
        return;
    }

    // Placeholder for Stable Diffusion API integration
    generatedImageDiv.innerHTML = '<p>Generating image...</p>';

    // Example: Using a Stable Diffusion API (e.g., Segmind or Runware)
    const apiKey = 'YOUR_API_KEY'; // Replace with your API key
    const formData = new FormData();
    formData.append('image', file);
    formData.append('prompt', 'Pixar-style cartoon version of the uploaded image');
    formData.append('model', 'sdxl1.0-txt2img'); // Example model

    try {
        const response = await fetch('https://api.segmind.com/v1/sdxl1.0-txt2img', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to generate image');
        }

        const result = await response.json();
        const imageUrl = result.image_url; // Adjust based on API response
        generatedImageDiv.innerHTML = `<img src="${imageUrl}" alt="Generated Image">`;
    } catch (error) {
        generatedImageDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}
