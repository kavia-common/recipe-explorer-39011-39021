import Blits from '@lightningjs/blits'
import { Theme } from '../theme.js'

export default Blits.Component('RecipeCard', {
  template: `
    <Element :x="$x" :y="$y">
      <Element w="360" h="420" :color="$bg" :effects="[$shader('radius', {radius: 14})]">
        <Element x="0" y="0" w="360" h="220" :color="$imgBg">
          <Element :alpha.transition="{value: $image ? 1 : 0}">
            <Element :src="$image" w="360" h="220" />
          </Element>
          <Element :alpha.transition="{value: $image ? 0 : 1}">
            <Text x="20" y="96" content="No Image" :size="22" :color="$muted" />
          </Element>
        </Element>
        <Element x="20" y="236">
          <Text :content="$title" :size="26" :color="$titleColor" />
          <Text y="44" :content="$summary" :size="20" :color="$muted" :maxwidth="320" />
        </Element>
        <Element x="20" y="360" w="320" h="40" :color="$cta" :effects="[$shader('radius', {radius: 12})]">
          <Text x="16" y="8" content="View Details" size="20" color="#0b1220" />
        </Element>
      </Element>
      <Element y="428" w="360" h="4" :color="$focusBarColor" :alpha.transition="{value: $focusAlpha, duration: 160}" />
    </Element>
  `,
  props: ['x', 'y', 'recipe', 'onOpen'],
  state() {
    return {
      x: 0,
      y: 0,
      title: '',
      image: '',
      summary: '',
      bg: Theme.colors.surface,
      imgBg: Theme.colors.background,
      titleColor: Theme.colors.text,
      muted: Theme.colors.mutedText,
      cta: Theme.colors.secondary,
      focusBarColor: Theme.colors.primary,
      focusAlpha: 0,
    }
  },
  hooks: {
    ready() {
      if (this.recipe) {
        this.title = this.recipe.title
        this.summary = this.recipe.summary || ''
        this.image = this.recipe.image || ''
      }
    },
    focus() {
      this.focusAlpha = 1
    },
    unfocus() {
      this.focusAlpha = 0
    },
  },
  input: {
    enter() {
      if (typeof this.onOpen === 'function') {
        this.onOpen(this.recipe)
      }
    },
  },
})
