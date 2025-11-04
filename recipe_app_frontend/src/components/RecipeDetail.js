import Blits from '@lightningjs/blits'
import { Theme } from '../theme.js'

export default Blits.Component('RecipeDetail', {
  template: `
    <Element :alpha.transition="{value: $alpha, duration: 200}">
      <Element w="1920" h="1080" color="#00000088" />
      <Element x="240" y="120" w="1440" h="840" :color="$surface" :effects="[$shader('radius', {radius: 16})]">
        <Element x="0" y="0" w="1440" h="280">
          <Element x="0" y="0" w="480" h="280" :color="$imgBg">
            <Element :alpha.transition="{value: $image ? 1 : 0}">
              <Element :src="$image" w="480" h="280" />
            </Element>
            <Element :alpha.transition="{value: $image ? 0 : 1}">
              <Text x="20" y="120" content="No Image" :size="22" :color="$muted" />
            </Element>
          </Element>
          <Element x="520" y="24" w="880">
            <Text :content="$title" :size="$titleSize" :color="$titleColor" />
            <Text y="72" :content="$summary" :size="22" :color="$muted" :maxwidth="820" />
            <Element y="140" w="160" h="48" :color="$chip" :effects="[$shader('radius', {radius: 10})]">
              <Text x="16" y="10" content="Close (Back)" size="20" color="#0b1220" />
            </Element>
          </Element>
        </Element>
        <Element x="40" y="320">
          <Text content="Ingredients" :size="28" :color="$titleColor" />
          <Element y="44">
            <Element :for="(ing, i) in $ingredients" :key="$i" :y="$i*28">
              <Text :content="'• ' + $ing" :size="20" :color="$textColor" />
            </Element>
          </Element>
        </Element>
        <Element x="760" y="320">
          <Text content="Steps" :size="28" :color="$titleColor" />
          <Element y="44" w="620">
            <Element :for="(stp, i) in $steps" :key="$i" :y="$i*32">
              <Text :content="($i+1) + '. ' + $stp" :size="20" :color="$textColor" :maxwidth="600" />
            </Element>
          </Element>
        </Element>
      </Element>
    </Element>
  `,
  props: ['recipe', 'onClose'],
  state() {
    return {
      alpha: 0,
      title: '',
      summary: '',
      image: '',
      ingredients: [],
      steps: [],
      surface: Theme.colors.surface,
      imgBg: Theme.colors.background,
      titleColor: Theme.colors.text,
      textColor: Theme.colors.text,
      muted: Theme.colors.mutedText,
      chip: Theme.colors.secondary,
      titleSize: 36,
    }
  },
  hooks: {
    ready() {
      this.alpha = 1
      if (this.recipe) {
        this.title = this.recipe.title
        this.summary = this.recipe.summary || ''
        this.image = this.recipe.image || ''
        this.ingredients = this.recipe.ingredients || []
        this.steps = this.recipe.steps || []
      }
    },
  },
  input: {
    back() {
      this.alpha = 0
      this.$setTimeout(() => {
        if (typeof this.onClose === 'function') this.onClose()
      }, 200)
    },
    enter() {
      this.input.back()
    },
  },
})
