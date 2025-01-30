"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const googleDriveLinks = [
        "https://drive.google.com/file/d/1govdSSwSwZFX9Cn5FmPktv7iuDp0iUfb/view?usp=drive_link",
        "https://drive.google.com/file/d/17WvhvpmKjUJptRSQmjNMEZfYjyQFomVm/view?usp=drive_link",
        "https://drive.google.com/file/d/1fuTbgTr2TLSa_T-4L1hhOCyktr5mGK8Y/view?usp=drive_link",
        "https://drive.google.com/file/d/1SMKIYhd-8TySOwy5iuDNLNoKYjc0ol0Z/view?usp=drive_link",
        "https://drive.google.com/file/d/1CZVlbMcoE-OALoIbdp7fmxTankNm7yea/view?usp=drive_link",
        "https://drive.google.com/file/d/1-tF01QR3b_-lXZ10uO36m5Vc3hnszR1y/view?usp=drive_link",
        "https://drive.google.com/file/d/1_yKeJ_LSgjIyywGw6odFatRM_RsmXf6u/view?usp=drive_link",
        "https://drive.google.com/file/d/17c6Ro2jIkBgWvusIDl8CkPG5Q1kNmM6b/view?usp=drive_link",
        "https://drive.google.com/file/d/1x-yDIliWpm_FkIDSvLeyW_kVgNntdKqF/view?usp=drive_link",
        "https://drive.google.com/file/d/1huATw-XFlMs_ROU9sM5W-KhituuMlOEC/view?usp=drive_link",
        "https://drive.google.com/file/d/1x8LVFO8IL9T12gsDY1fOT4-KQLnK7AqC/view?usp=drive_link",
        "https://drive.google.com/file/d/1z4BrfZSwYU3hXOvEtLfiOrrWXfGxkFP1/view?usp=drive_link"
    ];
    // Convert Google Drive links to direct image links
    const photoGalleryImages = googleDriveLinks.map(getGoogleDriveDirectLink);
    createGallery(photoGalleryImages, "gallery-pictures");
    createGallery([
        "https://storage.googleapis.com/msgsndr/LQvEkxCKABszMRwJfao1/media/679a404c46ab5b6c9cab2d2b.jpeg",
        "https://storage.googleapis.com/msgsndr/LQvEkxCKABszMRwJfao1/media/679a404c2ee485d068c2597b.jpeg",
        "https://storage.googleapis.com/msgsndr/LQvEkxCKABszMRwJfao1/media/679a404c2ee4856926c2597a.jpeg"
    ], "gallery-floorplan");
    createDroneFootage("gallery-drone", "https://storage.googleapis.com/msgsndr/LQvEkxCKABszMRwJfao1/media/679a402b60184584a3d94753.mp4");
});
// Function to convert Google Drive links to direct image links
function getGoogleDriveDirectLink(fileUrl) {
    const match = fileUrl.match(/\/d\/(.*?)\//);
    return match
        ? `https://lh3.googleusercontent.com/d/${match[1]}=w800`
        : fileUrl;
}
// Function to create a gallery
function createGallery(images, galleryId) {
    const galleryElement = document.getElementById(galleryId);
    if (!galleryElement)
        return;
    let galleryHTML = `
    <div class="gallery__main">
      <img id="${galleryId}-current" class="gallery__img" src="${images[0]}" alt="Main Gallery Image">
    </div>
    <div class="gallery__thumbnails">
  `;
    images.forEach((imgUrl, index) => {
        galleryHTML += `
      <label class="gallery__thumb" data-index="${index}">
        <img src="${imgUrl}" alt="Thumbnail ${index + 1}">
      </label>
    `;
    });
    galleryHTML += `</div>`;
    galleryElement.innerHTML = galleryHTML;
    setupThumbnailClickHandler(galleryId, images);
}
// Function to create the drone footage video
function createDroneFootage(galleryId, videoUrl) {
    const galleryElement = document.getElementById(galleryId);
    if (!galleryElement)
        return;
    galleryElement.innerHTML = `
    <div class="drone-container">
      <video controls class="drone-video">
        <source src="${videoUrl}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  `;
}
// Function to handle thumbnail clicks
function setupThumbnailClickHandler(galleryId, images) {
    const mainImage = document.getElementById(`${galleryId}-current`);
    const thumbnails = document.querySelectorAll(`#${galleryId} .gallery__thumb`);
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener("click", () => {
            mainImage.src = images[index];
            // Remove active class from all thumbnails
            thumbnails.forEach((t) => t.classList.remove("active"));
            // Add active class to the selected thumbnail
            thumb.classList.add("active");
        });
    });
}