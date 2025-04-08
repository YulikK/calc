import ButtonOperation from '@/shared/ui/button-operation/button-operation';

const THEMES = [
  {
    className: 'forest',
    src: new URL('@/shared/assets/forest.png', import.meta.url).href,
  },
  {
    className: 'water',
    src: new URL('@/shared/assets/water.png', import.meta.url).href,
  },
  {
    className: 'fire',
    src: new URL('@/shared/assets/fire.png', import.meta.url).href,
  },
];

export default class ThemeSwitcher extends ButtonOperation {
  #currentThemeIndex = 0;
  constructor() {
    super({
      operation: THEMES[0],
      onClick: () => this.#onClick(),
    });
    this.#setTheme(0, this.#currentThemeIndex);
  }

  #onClick() {
    const lastThemeIndex = this.#currentThemeIndex;
    this.#currentThemeIndex = (this.#currentThemeIndex + 1) % THEMES.length;
    this.#setTheme(lastThemeIndex, this.#currentThemeIndex);
  }

  #setTheme(lastThemeIndex, newThemeIndex) {
    const { body } = document;
    body.classList.remove(THEMES[lastThemeIndex].className);
    const newTheme = THEMES[newThemeIndex];
    body.classList.add(newTheme.className);
    this.setImage(newTheme.src);
  }
}
