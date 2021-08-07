// For syntax highlighting only
const html = String.raw

const moon = `
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
`

const sun = `
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
`

class ThemeToggle extends HTMLElement {
  constructor() {
    super()

    this.STORAGE_KEY = 'user-color-scheme'
    this.COLOR_MODE_KEY = '--color-mode'
  }

  connectedCallback() {
    this.render()
  }

  getCSSCustomProp(propKey) {
    let response = getComputedStyle(document.documentElement).getPropertyValue(propKey)

    // Tidy up the string if there’s something to work with
    if (response.length) {
      response = response.replace(/\'|"/g, '').trim()
    }

    // Return the string response by default
    return response
  }

  applySetting(passedSetting) {
    let currentSetting = passedSetting || localStorage.getItem(this.STORAGE_KEY)

    if (currentSetting) {
      document.documentElement.setAttribute('data-user-color-scheme', currentSetting)
      // Tailwind support:
      if (currentSetting === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      this.setButtonLabelAndStatus(currentSetting)
    } else {
      this.setButtonLabelAndStatus(this.getCSSCustomProp(this.COLOR_MODE_KEY))
    }
  }

  toggleSetting() {
    let currentSetting = localStorage.getItem(this.STORAGE_KEY)

    switch (currentSetting) {
      case null:
        currentSetting =
          this.getCSSCustomProp(this.COLOR_MODE_KEY) === 'dark' ? 'light' : 'dark'
        break
      case 'light':
        currentSetting = 'dark'
        break
      case 'dark':
        currentSetting = 'light'
        break
    }

    localStorage.setItem(this.STORAGE_KEY, currentSetting)

    return currentSetting
  }

  setButtonLabelAndStatus(currentSetting) {
    this.modeToggleButton.setAttribute(
      'title',
      `${currentSetting === 'dark' ? 'Light' : 'Dark'} theme`
    )
    this.modeToggleButton.innerHTML = currentSetting === 'dark' ? sun : moon
    this.modeStatusElement.innerText = `Color mode is now "${currentSetting}"`
  }

  render() {
    this.innerHTML = html`
      <div class="theme-toggle md:text-right mt-5">
        <div role="status" class="sr-only js-mode-status"></div>
        <button class="btn theme-toggle-btn font-bold js-mode-toggle">Dark theme</button>
      </div>
    `

    this.afterRender()
  }

  afterRender() {
    this.modeToggleButton = document.querySelector('.js-mode-toggle')
    this.modeStatusElement = document.querySelector('.js-mode-status')

    this.modeToggleButton.addEventListener('click', (evt) => {
      evt.preventDefault()
      this.applySetting(this.toggleSetting())
    })

    this.applySetting()
  }
}

if ('customElements' in window) {
  customElements.define('theme-toggle', ThemeToggle)
}

export default ThemeToggle
