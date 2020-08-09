'use strict';

const mobileMenu = document.querySelector('.mobile-menu');
const slidingPanelScreen = document.querySelector('.sliding-panel-fade-screen');
const slidingPanelMenu = document.querySelector('.sliding-panel-content');

mobileMenu.addEventListener('click', () => {
  if(mobileMenu.classList.contains('close-menu')){
    slidingPanelScreen.classList.remove('is-visible');
    slidingPanelMenu.classList.remove('is-visible');
    mobileMenu.classList.remove('close-menu');
  }else{
    slidingPanelScreen.classList.add('is-visible');
    slidingPanelMenu.classList.add('is-visible');
    mobileMenu.classList.add('close-menu');
  }
});

slidingPanelScreen.addEventListener('click', () => {
  slidingPanelScreen.classList.remove('is-visible');
  slidingPanelMenu.classList.remove('is-visible');
  mobileMenu.classList.remove('close-menu');
});