export default class PriceCalculator {

  constructor(options) {
    this.discountPercent = options.discountPercent ?? 0
    this.nbPageViews = options.nbPageViews ?? 0
    this.targetSelector = options.targetSelector

    this.unitPrice = 16 / 100000
    this.calculate()
  }

  applyDiscount = (discount) => {
    this.discountPercent = discount
    this.calculate()
  }

  updateNbPageViews = (nb) => {
    this.nbPageViews = nb
    this.calculate()
  }

  calculate = () => {
    let price = this.nbPageViews * this.unitPrice
    if (this.discountPercent > 0) {
      price = price * (100 - this.discountPercent) / 100
    }

    price = Math.ceil(price)

    if (this.targetSelector !== undefined) {
      document.querySelector(this.targetSelector).innerHTML = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
    }
    return price
  }
}