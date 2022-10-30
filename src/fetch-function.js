import axios from "axios";
import Notiflix from "notiflix";

export default async function fetchImages(searchVal, pagNum) {
    const url = `https://pixabay.com/api/`;

  return await axios
    .get(url, {
      params: {
        key: '30911598-44913a86afc6093c596bda643',
        q: `${searchVal}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 40,
        page: `${pagNum}`,
      },
    })

    .then(res => {
      if (res.data.totalHits < 40) {
        loadMoreBtn.hidden = true;
      }

      if (!res.data.totalHits) {
        loadMoreBtn.hidden = true;
        Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      if (pagNum === 1 && res.data.totalHits > 0) {
        Notiflix.Notify.success(
          `Hooray! We found ${res.data.totalHits} images.`
        );
      }

      return res.data;
    });
}