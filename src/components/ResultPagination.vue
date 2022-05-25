<template>
  <b-pagination
      v-if="packagesList"
      :value="currentPage"
      :total-rows="totalPackages"
      :per-page="perPage"
      first-number
      last-number
      align="center"
      @change="selectPage"
  ></b-pagination>
</template>

<script>
import { BPagination } from 'bootstrap-vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'result-pagination',

  components: {
    BPagination,
  },

  data() {
    return {
      currentPage: 1,
      perPage: 10,
    }
  },

  computed: {
    ...mapGetters(['packagesList', 'error']),

    totalPackages() {
      return this.packagesList.total;
    }
  },

  watch: {
    error(val) {
      if (val) {
        this.currentPage = 1;
      }
    },
  },

  methods: {
    ...mapActions(['getPackageList']),

    selectPage(page) {
      if (this.currentPage !== page) {
        this.currentPage = page;
        const fromPage = (page - 1) * this.perPage;
        this.getPackageList({ query: this.$route.query.query, from: fromPage });
      }
    },
  }
}
</script>
