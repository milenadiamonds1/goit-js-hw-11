import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryCont = document.querySelector('.gallery');

export default function renderMarkup(data) {
  const card = data.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <div class="photo-card">
        <a class="gallery-link" href="${largeImageURL}">
   <img src="${webformatURL}" alt="${tags}"  loading="lazy" /></a>
  <div class="info">
     <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
       <b>Views ${views}</b>
     </p>
     <p class="info-item">
       <b>Comments ${comments}</b>
     </p>
    <p class="info-item">
       <b>Downloads ${downloads}</b>
     </p>
     </div>
   </div>`;
      }
    )
    .join('');

  galleryCont.insertAdjacentHTML('beforeend', card);
  galleryEl.refresh();
}

let galleryEl = new SimpleLightbox('.gallery a', {});
galleryEl.on(('show.simplelightbox', function () {}));