import Blits from '@lightningjs/blits'
import Header from '../components/Header.js'
import SearchBar from '../components/SearchBar.js'
import RecipeGrid from '../components/RecipeGrid.js'
import RecipeDetail from '../components/RecipeDetail.js'
import { fetchRecipes } from '../services/api.js'
import { Theme, applyTheme } from '../theme.js'

export default Blits.Component('Home', {
  components: { Header, SearchBar, RecipeGrid, RecipeDetail },
  template: `
    <Element w="1920" h="1080" :color="$bg">
      <Header />
      <SearchBar ref="search" :x="240" :y="156" :onSearch="$doSearch" />
      <RecipeGrid ref="grid" :x="120" :y="280" :items="$items" :onOpen="$openDetail" />
      <RecipeDetail v-if="$showDetail" :recipe="$detail" :onClose="$closeDetail" />
    </Element>
  `,
  state() {
    return {
      items: [],
      showDetail: false,
      detail: null,
      bg: Theme.colors.background,
      currentQuery: '',
    }
  },
  hooks: {
    ready() {
      applyTheme(this)
      this.load()
    },
    focus() {
      // focus the grid by default
      this.$select('grid').$focus()
    },
  },
  methods: {
    async load(q = '') {
      this.currentQuery = q
      this.items = await fetchRecipes(q)
    },
    doSearch(q) {
      this.load(q || '')
      this.$select('grid').$focus()
    },
    openDetail(recipe) {
      this.detail = recipe
      this.showDetail = true
    },
    closeDetail() {
      this.showDetail = false
      this.detail = null
      this.$select('grid').$focus()
    },
  },
})
