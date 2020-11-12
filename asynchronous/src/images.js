'use strict';

// Coding challenge #2
let currentImg;

const wait = function (seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const imgEl = document.createElement('img');
    imgEl.src = imgPath;

    imgEl.addEventListener('load', () => {
      document.querySelector('.images').append(imgEl);
      resolve(imgEl);
    });

    imgEl.addEventListener('error', () => {
      reject(new Error('Image not found'));
    });
  });
};

createImage('../images/img-1.jpg')
  .then(response => {
    currentImg = response;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('../images/img-2.jpg');
  })
  .then(response => {
    currentImg = response;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('../images/img-3.jpg');
  })
  .then(response => {
    currentImg = response;
    console.log('Image 3 loaded');
    return wait(2);
  })
  .catch(err => console.error(err));
