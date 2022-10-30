 import imagesTpl from './templates/images.hbs';

import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import ApiService from "./fetch-function";

const refs = {
   searchForm: document.querySelector('#search-form'),
   galleryContainer: document.querySelector('.gallery'),
   sentinel: document.querySelector('#sentinel'),
};

const funcApiCall = new ApiService();

let pagNum = 0;

refs.searchForm.addEventListener('submit', onSearch);

async function onSearch(evt){
evt.preventDefault();
if (evt.currentTarget.elements.searchQuery.value.trim() === '') {
   Notiflix.Notify.info('Field cannot be empty');
};
funcApiCall.query = evt.currentTarget.elements.searchQuery.value;

funcApiCall.resetPage();
try{
   const pics = await funcApiCall.fetchImages()
   pagNum = pics.totalPages;
   console.log(pics);
   Notiflix.Notify.success(`We found ${pics.totalHits} pics!`)
   clearContainer();
   appendImagesMarkup(pics);
   lightbox.refresh();
} catch (error){
   onFetchError();
}
return pagNum;
};

function clearContainer() {
   refs.galleryContainer.innerHTML = '';
}
function onFetchError(error) {
   Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}

function appendImagesMarkup({ pics }) {
   refs.galleryContainer.insertAdjacentHTML('beforeend', imagesTpl(pics));
}

let lightbox = new SimpleLightbox('.gallery a', {
   captionsData: 'alt',
   captionPosition: 'bottom',
   captionDelay: 250,
});