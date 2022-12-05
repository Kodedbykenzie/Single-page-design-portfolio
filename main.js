console.log('working')
class Carousel {

    /**
     * 
     * @param {HTMLElement} element 
     * @param {Object} options 
     * @param {Object} options.slidesToScroll Nombre d'élement à faire défiler
     * @param {Objet} options.slidesVisible Nombre d'élement à afficher
     */

    constructor (element, options = {}) {
        this.element = element,
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1
        }, options)
        let children = [].slice.call(element.children);
        this.currentItem = 0;
        let root = this.createDivWithClass('carousel');
        let nextButton = document.querySelector('.carousel-right');
        let prevButton = document.querySelector('.carousel-left');
        this.translateX = 0;
        this.container = this.createDivWithClass('carousel__container');
        root.appendChild(this.container);
        this.element.appendChild(root);
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__item');
            item.appendChild(child);
            this.container.appendChild(item);
            return item
        })
       this.setStyle()
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))    
    }
    /**
     * Applique les bonnes dimensions aux élements
     */
    setStyle () {
        let ratio = this.items.length / this.options.slidesVisible;
        this.container.style.width = (ratio * 100) + '%';
        this.container.style.transform = 'translate3d(' + (this.translateX) +'%, 0, 0)'
    }


    next() {
        this.goToItem(this.currentItem + this.options.slidesToScroll)
    }
    prev () {
        this.goToItem(this.currentItem - this.options.slidesToScroll)

    }
/**
 * Déplace le carousel vers l'élement ciblé
 * @param {number} index 
 */
    goToItem (index) {
        if (index < 0) {
           index = this.items.length - this.options.slidesVisible
        } else if (index >= this.items.length - this.options.slidesVisible) {
            index = 0
        }
        console.log(index)
        this.translateX = index * -125 / (this.items.length)
        this.container.style.transform = 'translate3d(' + this.translateX +'%, 0, 0)'
        this.currentItem = index;

    }
    /**
     * 
     * @param {string} className 
     * @return {HTMLElement}
     */
    createDivWithClass (className) {
        let div = document.createElement('div');
        div.setAttribute('class', className);
        return div
    }
}

document.addEventListener('DOMContentLoaded', function () {
    new Carousel (document.querySelector('#carousel'), {
        slidesToScroll: 1,
        slidesVisible: 2.5
    })
})