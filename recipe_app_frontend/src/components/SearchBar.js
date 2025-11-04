import Blits from '@lightningjs/blits'
import { Theme } from '../theme.js'

export default Blits.Component('SearchBar', {
  template: `
    <Element :x="$x" :y="$y">
      <Element
        :color="$surface"
        :effects="[$shader('radius', {radius: 12})]"
        w="1440"
        h="72"
      >
        <Element x="24" y="18">
          <Text :content="'Search recipes...'" :alpha="$placeholderAlpha" :size="$font" :color="$placeholderColor" />
          <Text :content="$value" :alpha="$valueAlpha" :size="$font" :color="$textColor" />
        </Element>
        <Element x="1380" y="12" w="48" h="48" :color="$buttonColor" :effects="[$shader('radius', {radius: 12})]">
          <Text x="14" y="10" content="Go" size="20" color="#0b1220" />
        </Element>
      </Element>
      <Element y="80">
        <Text :content="'Tip: type and press Enter to search'" size="18" :color="$hintColor" />
      </Element>
    </Element>
  `,
  props: ['x', 'y', 'onSearch'],
  state() {
    return {
      x: 240,
      y: 160,
      value: '',
      placeholderAlpha: 0.5,
      valueAlpha: 1,
      font: 28,
      surface: Theme.colors.surface,
      textColor: Theme.colors.text,
      placeholderColor: Theme.colors.mutedText,
      hintColor: Theme.colors.mutedText,
      buttonColor: Theme.colors.secondary,
      focused: false,
    }
  },
  hooks: {
    focus() {
      this.focused = true
      this.placeholderAlpha = this.value ? 0 : 0.25
      this.valueAlpha = this.value ? 1 : 0
    },
    unfocus() {
      this.focused = false
      this.placeholderAlpha = this.value ? 0 : 0.5
      this.valueAlpha = this.value ? 1 : 0
    },
  },
  input: {
    enter() {
      this.valueAlpha = this.value ? 1 : 0
      if (typeof this.onSearch === 'function') {
        this.onSearch(this.value)
      }
    },
    back() {
      if (this.value?.length) {
        this.value = this.value.slice(0, -1)
        this.valueAlpha = this.value ? 1 : 0
        this.placeholderAlpha = this.value ? 0 : 0.4
      } else {
        this.parent.focus()
      }
    },
    left() {},
    right() {},
    up() {
      this.parent.focus()
    },
    down() {
      this.parent.focus()
    },
    // Alphanumeric capture
    key(e) {
      const { key } = e
      if (!key) return
      if (key.length === 1) {
        this.value += key
        this.valueAlpha = 1
        this.placeholderAlpha = 0
      } else if (key === 'Space') {
        this.value += ' '
        this.valueAlpha = 1
        this.placeholderAlpha = 0
      }
    },
  },
})
