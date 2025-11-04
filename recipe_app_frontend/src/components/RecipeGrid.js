import Blits from '@lightningjs/blits'
import { Theme } from '../theme.js'
import RecipeCard from './RecipeCard.js'

export default Blits.Component('RecipeGrid', {
  components: { RecipeCard },
  template: `
    <Element :x="$x" :y="$y">
      <Element
        :for="(item, idx) in $items"
        :key="$item.id"
        :x="$gridX($index)"
        :y="$gridY($index)"
      >
        <RecipeCard
          :x="0"
          :y="0"
          :recipe="$item"
          :onOpen="$open"
        />
      </Element>
      <Text v-if="!$items.length" :content="'No recipes found'" :size="26" :color="$muted" />
    </Element>
  `,
  props: ['x', 'y', 'items', 'onOpen'],
  state() {
    return {
      x: 120,
      y: 280,
      items: [],
      columns: 4,
      gapX: 40,
      gapY: 40,
      cardW: 360,
      cardH: 432,
      muted: Theme.colors.mutedText,
      activeIndex: 0,
    }
  },
  methods: {
    gridX(i) {
      const col = i % this.columns
      return col * (this.cardW + this.gapX)
    },
    gridY(i) {
      const row = Math.floor(i / this.columns)
      return row * (this.cardH + this.gapY)
    },
    open(item) {
      if (typeof this.onOpen === 'function') this.onOpen(item)
    },
  },
  input: {
    left() {
      if (!this.items.length) return
      this.activeIndex = Math.max(0, this.activeIndex - 1)
      this.$focusChildAt(this.activeIndex)
    },
    right() {
      if (!this.items.length) return
      this.activeIndex = Math.min(this.items.length - 1, this.activeIndex + 1)
      this.$focusChildAt(this.activeIndex)
    },
    up() {
      if (!this.items.length) return
      this.activeIndex = Math.max(0, this.activeIndex - this.columns)
      this.$focusChildAt(this.activeIndex)
    },
    down() {
      if (!this.items.length) return
      this.activeIndex = Math.min(this.items.length - 1, this.activeIndex + this.columns)
      this.$focusChildAt(this.activeIndex)
    },
    enter() {
      const item = this.items[this.activeIndex]
      if (item) this.open(item)
    },
  },
})
