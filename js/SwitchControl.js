export default class SwitchControl extends HTMLElement {

  constructor() {
    super()
    this.shadow = this.attachShadow({mode: 'open'})
    this.shadow.innerHTML = `
    <style>
    :host {
      --background-color: hsl(223, 50%, 87%);
      --cursor-color: hsl(0, 0%, 100%);

      --background-color-checked: hsl(174, 77%, 80%);
      --cursor-color-checked: hsl(174, 86%, 45%);
    }
    .switch-control {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 3.5em;
      min-width: 3.5em;
      height: 2em;
      margin: 0 0.4em;
    }
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      display: inline-block;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--background-color);
      -webkit-transition: .4s;
      transition: .4s;
      border-radius: 34px;
    }
    .slider:hover {
      background-color: var(--background-color-checked);
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 1.4em;
      width: 1.4em;
      left: 4px;
      bottom: 4px;
      background-color: var(--cursor-color);
      -webkit-transition: .2s;
      transition: .2s;
      border-radius: 50%;
    }

    input:checked + .slider {
      background-color: var(--background-color-checked);
    }
    input:focus + .slider {
      box-shadow: 0 0 1px var(--background-color-checked);
    }
    input:checked + .slider:before {
      -webkit-transform: translateX(calc(3.5em - 1.4em - 8px));
      -ms-transform: translateX(calc(3.5em - 1.4em - 8px));
      transform: translateX(calc(3.5em - 1.4em - 8px));
      background-color: var(--cursor-color-checked);
    }
    .text {
      font-size: 0.9em;
    }
    </style>

    <div class="switch-control">
      <slot name="off" class="text"></slot>
      <label class="switch">
        <input type="checkbox" value="0" />
        <span class="slider"></span>
      </label>
      <slot name="on" class="text"></slot>
    </div>
    `
  }

  onChange = (e) => {
    this.dispatchEvent(
      new CustomEvent('discountChanged', { detail: e.target.checked })
    )
  }

  connectedCallback () {
    this.shadow.querySelector('input').addEventListener('change', this.onChange)
  }
}