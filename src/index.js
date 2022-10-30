import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import renderMarkup from "./markup";
import fetchImages from "./fetch-function";

const refs = {
   searchForm: document.querySelector('#search-form'),
   galleryContainer: document.querySelector('.gallery'),
   sentinel: document.querySelector('#sentinel'),
   loadMoreBtn: document.querySelector('.load-more')
};


let searchVal= '';
let pagNum = 1;

refs.searchForm.addEventListener('submit', onSearch);
 
refs.loadMoreBtn.hidden = true;

function onSearch(evt){
evt.preventDefault();
refs.loadMoreBtn.hidden = false;
clearGallery()
if (evt.currentTarget.elements.searchQuery.value.trim() === '') {
   Notiflix.Notify.info('Field cannot be empty');
};
searchVal = evt.currentTarget.elements.searchQuery.value;

if(!searchVal){
   refs.loadMoreBtn.hidden = true;
    return Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
pagNum = 1;
fetchImages(searchVal, pagNum).then(renderMarkup);
// funcApiCall.resetPage(); 

function onLoad() {
   pagNum += 1;
   fetchImages(funcApiCall.query, pagNum)
     .then(renderMarkup)
     .catch(data => {
       refs.loadMoreBtn.hidden = true;
       Notiflix.Notify.info(
         `We're sorry, but you've reached the end of search results.`
       );
     });
 }
 


function clearGallery() {
   refs.galleryContainer.innerHTML = '';
}


// let lightbox = new SimpleLightbox('.gallery', {
//    captionsData: 'alt',
//    captionPosition: 'bottom',
//    captionDelay: 250,
// });