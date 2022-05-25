<template>
  <div class="home-page">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <search-field />
          <result-list />
          <result-pagination />
        </div>
      </div>
    </div>
    <footer class="footer">
      <p class="footer__author">Yuriy Parshyn</p>
      <a class="footer__link" href="https://github.com/parshyn1988" target="_blank">GitHub</a>
    </footer>
  </div>
</template>

<script>
import SearchField from '@/components/SearchField';
import ResultList from '@/components/ResultList';
import ResultPagination from '@/components/ResultPagination';

export default {
  name: 'home-view',

  components: {
    SearchField,
    ResultList,
    ResultPagination,
  }
}
</script>
