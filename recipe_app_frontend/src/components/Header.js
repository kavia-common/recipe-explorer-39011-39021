import Blits from '@lightningjs/blits'
import { Theme } from '../theme.js'

export default Blits.Component('Header', {
  template: `
    <Element :color="$bgColor" w="1920" h="120">
      <Element x="40" y="28">
        <Text :content="$title" :size="$titleSize" :color="$titleColor" />
        <Text y="64" :content="$subtitle" :size="$subtitleSize" :color="$subtitleColor" />
      </Element>
      <Element x="1600" y="36">
        <Element w="240" h="48" :color="$chipColor" :effects="[$shader('radius', {radius: 24})]">
          <Text x="20" y="8" :content="'Ocean Professional'" :size="22" color="#0b1220" />
        </Element>
      </Element>
      <Element x="0" y="118" w="1920" h="2" :color="$divider" />
    </Element>
  `,
  state() {
    return {
      title: 'Recipe Explorer',
      subtitle: 'Browse, search, and cook with confidence',
      bgColor: Theme.colors.surface,
      divider: Theme.colors.border,
      titleColor: Theme.colors.text,
      subtitleColor: Theme.colors.mutedText,
      chipColor: Theme.colors.secondary,
      titleSize: Theme.typography.h1,
      subtitleSize: Theme.typography.caption,
    }
  },
})
