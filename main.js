import './css/reset.css'
import './css/style.css'
import './css/slider-control.css'
import './css/switch-control.css'

import SliderControl from './js/SliderControl'
import SwitchControl from './js/SwitchControl'
import PriceCalculator from './js/PriceCalculator'

customElements.define('slider-control', SliderControl)
customElements.define('switch-control', SwitchControl)

document.addEventListener('DOMContentLoaded', function() {

  const priceCalculator = new PriceCalculator({
    nbPageViews: 100000,
    targetSelector: ".pricing-card .priceValue"
  })

  document.querySelector('slider-control').addEventListener('valueChanged', function(e) { 
    document.querySelector('.pageviews .nb').innerHTML = `${e.detail}k`
    priceCalculator.updateNbPageViews(e.detail * 1000)
  })

  document.querySelector('switch-control').addEventListener('discountChanged', function(e) { 
    priceCalculator.applyDiscount(e.detail ? 25 : 0)
  })
})
