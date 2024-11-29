class Carousel extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const styles = `<style>
            .carousel-container {
                max-width: 60rem;
                position: relative;
                margin: 0 auto;
            }

            .carousel-controls {
                text-align: center;
            }

            .carousel-slide {
                display: none;
            }

            .carousel-slide>img {
                width: 100%;
                height: 500px;
                object-fit: cover;
            }

            /* Next & previous buttons */

            .prev,
            .next {
                cursor: pointer;
                position: absolute;
                top: 50%;
                width: auto;
                margin-top: -22px;
                padding: 16px;
                color: white;
                font-weight: bold;
                font-size: 18px;
                transition: 0.6s ease;
                border-radius: 0 3px 3px 0;
                user-select: none;
            }

            /* Position the "next button" to the right */

            .next {
                right: 0;
                border-radius: 3px 0 0 3px;
            }

            /* On hover, add a black background color with a little bit see-through */

            .prev:hover,
            .next:hover {
                background-color: rgba(0, 0, 0, 0.8);
            }

            /* Caption text */

            .caption-text {
                color: #f2f2f2;
                font-size: 15px;
                padding: 8px 12px;
                position: absolute;
                bottom: 8px;
                width: 100%;
                text-align: center;
            }

            /* Number text (1/3 etc) */

            .number-text {
                color: #f2f2f2;
                font-size: 12px;
                padding: 8px 12px;
                position: absolute;
                top: 0;
            }

            /* The dots/bullets/indicators */
            .carousel-controls>.dot {
                cursor: pointer;
                height: 15px;
                width: 15px;
                margin: 0 2px;
                background-color: #bbb;
                border-radius: 50%;
                display: inline-block;
                transition: background-color 0.6s ease;
            }

            .active,
            .dot:hover {
                background-color: #717171;
            }

            /* Fading animation */

            .fade {
                -webkit-animation-name: fade;
                -webkit-animation-duration: 1.5s;
                animation-name: fade;
                animation-duration: 1.5s;
            }

            @-webkit-keyframes fade {
                from {
                    opacity: .4
                }

                to {
                    opacity: 1
                }
            }

            @keyframes fade {
                from {
                    opacity: .4
                }

                to {
                    opacity: 1
                }
            }
        </style>`;

        const carouselContainer = document.createElement("div");
        carouselContainer.className = "carousel-container";

        const images = JSON.parse(this.getAttribute("images"));
        const captions = JSON.parse(this.getAttribute("captions"));
        
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const caption = captions[i];
            
            const articleEl = document.createElement("article");
            articleEl.className = "carousel-slide fade";
            
            const p = document.createElement("p");
            p.className = "number-text";
            p.textContent = `${i + 1} / ${images.length}`;
            
            const img = document.createElement("img");
            img.src = image;
            img.alt = "carousel-item";
            
            const captionEl = document.createElement("p");
            captionEl.className = "caption-text";
            captionEl.textContent = caption;
            
            articleEl.append(p, img, captionEl);
            carouselContainer.appendChild(articleEl);
        }
        
        const prevArrow = document.createElement("a");
        prevArrow.className = "prev";
        prevArrow.innerHTML = "&#10094;";
        
        const nextArrow = document.createElement("a");
        nextArrow.className = "next";
        nextArrow.innerHTML = "&#10095;";
        
        carouselContainer.appendChild(prevArrow);
        carouselContainer.appendChild(nextArrow);

        const carouselControls = document.createElement("div");
        carouselControls.className = "carousel-controls";

        for (let i = 0; i < images.length; i++) {
            const span = document.createElement("span");
            span.className = "dot";

            carouselControls.appendChild(span);
        }
        
        this.shadow.innerHTML = styles;
        this.shadow.appendChild(carouselContainer);
        this.shadow.appendChild(carouselControls);
        
        let currentIndex = 0;

        const slides = this.shadow.querySelectorAll(".carousel-slide");
        slides[currentIndex].style.display = "block";

        prevArrow.addEventListener("click", () => {
            slides[currentIndex].style.display = "none";
            currentIndex--;

            if (currentIndex === -1) {
                currentIndex = slides.length - 1;
            }

            slides[currentIndex].style.display = "block";
        });

        nextArrow.addEventListener("click", () => {
            slides[currentIndex].style.display = "none";
            currentIndex++;

            if (currentIndex === slides.length) {
                currentIndex = 0;
            }

            slides[currentIndex].style.display = "block";
        });

        carouselControls.querySelectorAll(".dot").forEach((dot, i) => {
            dot.addEventListener("click", () => {
                slides[currentIndex].style.display = "none";
                slides[i].style.display = "block";
                currentIndex = i;
            });
        });
    }
}

customElements.define("custom-carousel", Carousel);