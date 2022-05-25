<template>
  <div class="mb-4 mt-4">
    <input
        v-model="search"
        @input="debounceSearch"
        type="text"
        class="form-control"
        placeholder="Search package"
    >
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'search-field',
  data() {
    return {
      search: this.$route.query?.query ?? null,
      debounce: null
    }
  },

  mounted() {
    this.$nextTick(() => {
      if (this.search) {
        this.debounceSearch();
      }
    });

    this.$root.$on('clearSearch', () => {
      this.search = null;
    })
  },

  methods: {
    ...mapActions(['getPackageList', 'cleanPackageList']),

    debounceSearch(event) {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        this.search = this.search ?? event.target.value
        // this.$store.dispatch('getPackageList', this.search);
        this.getPackageList({ query: this.search });
        this.setQuery(this.search);
      }, 500);
    },

    setQuery(search) {
      if (search !== this.$route.query.query) {
        this.$router.push({ path: this.$route.path, query: { query: search }});
      }

      if (!search) {
        this.$router.push(this.$route.path);
        this.cleanPackageList();
      }
    }
  }
}
</script>
