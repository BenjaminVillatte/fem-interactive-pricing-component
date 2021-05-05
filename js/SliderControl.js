export default class SliderControl extends HTMLElement {

  constructor() {
    super()
    var step = this.getAttribute('step')
    this.min = this.getAttribute('min')
    this.max = this.getAttribute('max')
    this.initialValue = this.getAttribute('value')
    this.value = this.initialValue
    this.innerHTML = `<input type="range" name="nb_views" min="${this.min}" max="${this.max}" value="${this.initialValue}" step="${step}" aria-label="Nb views">`
  }

  calculProgress = () => {
    return Math.ceil( (this.value-this.min)/(this.max-this.min)*100)
  }

  valueChanged = (e) => {
    this.value = e.target.value
    this.updateComponentProgress()
    this.sendEvent()
  }

  sendEvent = () => {
    if (this.value !== undefined) {
      this.dispatchEvent(
        new CustomEvent('valueChanged', { detail: this.value })
      )
    }
  }

  updateComponentProgress = () => {
    const completed = this.calculProgress(this.value) 
    const completeCssVar = `--track-completed: ${completed}%;`
    this.setAttribute('style', completeCssVar)
    
  }
  
  connectedCallback () {
    this.updateComponentProgress(this.value)
    this.sendEvent()
    this.querySelector('input').addEventListener('input', this.valueChanged)
  }

  disonnectedCallback () {
    this.querySelector('input').removeEventListener('input', this.valueChanged)
  }
}
