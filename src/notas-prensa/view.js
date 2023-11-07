/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */


document.addEventListener('DOMContentLoaded', () => {

    const sliderContainer = document.querySelector('.ma-ndp-slider-container');
    const slider = document.querySelector('.ma-ndp-slider');
    const prevButton = document.querySelector('#ma-ndp-prev');
    const nextButton = document.querySelector('#ma-ndp-next');
    const slides = document.querySelectorAll('.wp-block-ma-ndp-ma-single-nota');

    //get slider_container width in px
    const sliderWidth = sliderContainer.clientWidth;

    const numberOfSlides = 5;
    const marginRight = 30;
    const slideWidth1 = ((sliderWidth - (marginRight * (numberOfSlides - 1))) / numberOfSlides) * 2;
    const slideWidthRegular = (sliderWidth - (marginRight * (numberOfSlides - 1))) / numberOfSlides;

    //Set the slider width in px
    var i = 0;
    slides.forEach(slide => {
        if(i == 0){
            slide.style.width = `${slideWidth1}px`;
        }
        else{
            slide.style.width = `${slideWidthRegular}px`;
        }

        i++;
    });

    let currentIndex = 0;

    nextButton.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
        }
        updateSlider();
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        }
        updateSlider();
    });

    function updateSlider() {
        let offset = -(currentIndex * (slideWidthRegular + 30)) - slideWidthRegular;

        if(offset >= -slideWidthRegular){
            offset = 0;
        }

        slider.style.transform = `translateX(${offset}px)`;
    }
});