import Blits from '@lightningjs/blits'
import RecipeDetail from '../components/RecipeDetail.js'
import { fetchRecipeById } from '../services/api.js'
import { Theme } from '../theme.js'

export default Blits.Component('Details', {
  components: { RecipeDetail },
  template: `
    <Element w="1920" h="1080" :color="$bg">
      <Element :alpha.transition="{value: $recipe ? 1 : 0, duration: 120}">
        <RecipeDetail :recipe="$recipe" :onClose="$backToHome" />
      </Element>
      <Element :alpha.transition="{value: $recipe ? 0 : 1, duration: 120}">
        <Text x="40" y="40" content="Loading..." size="28" color="#111827" />
      </Element>
    </Element>
  `,
  props: ['id'],
  state() {
    return {
      bg: Theme.colors.background,
      recipe: null,
    }
  },
  hooks: {
    async ready() {
      if (this.id) {
        this.recipe = await fetchRecipeById(this.id)
      }
    },
  },
  methods: {
    backToHome() {
      this.$router.back()
    },
  },
})
