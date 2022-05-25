<template>
  <div class="table-responsive">
    <table v-if="packagesList" class="table table-hover table-striped table-bordered">
      <thead>
      <tr>
        <th scope="col" width="25%">Name</th>
        <th scope="col" width="50%">Description</th>
        <th scope="col" width="25%">Author</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="(item, index) in packagesList.results"
          :key="index"
          @click="showPackageInfo(item.package)"
          role="button"
      >
        <th scope="row" class="text-nowrap">{{ item.package.name }}</th>
        <td>{{ item.package.description }}</td>
        <td class="text-nowrap">
          {{ item.package.author ? item.package.author.name : 'no_information' }}
        </td>
      </tr>
      </tbody>
    </table>

    <b-modal
        ref="modal"
        hide-footer
        :title="packageName"
        size="xl"
        @hide="closeModal"
    >
      <div class="d-block">
        <div v-if="packageInfo.version" class="table-responsive">
          <table class="table table-bordered">
            <tbody>
            <tr v-for="(item, index) in packageInfo.version.tags" :key="index">
              <th scope="row">{{ index }}</th>
              <td>{{ item }}</td>
            </tr>
            </tbody>
          </table>

          <div class="mt-3 overflow-text">
            <b>Versions:</b> {{ packageInfo.version.versions }}
          </div>

          <div class="mt-3">
            <b>Files:</b>
            <ul>
              <li v-for="(item, index) in packageInfo.stat.files" :key="index">
                <b>{{ item.type === 'directory' ? `/${item.name}` : item.name }}</b>
                <ul>
                  <li v-for="(file, fileIndex) in item.files" :key="fileIndex">
                    {{ file.name }}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </b-modal>

    <b-alert :show="showAlert" variant="danger">
      <p>{{ error }}</p>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="button" class="btn btn-danger" @click="goHome">Home page</button>
      </div>
    </b-alert>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { BModal, BAlert } from 'bootstrap-vue'

export default {
  name: 'result-list',

  components: {
    BModal,
    BAlert,
  },

  data() {
    return {
      showAlert: false,
      packageName: '',
    }
  },

  computed: {
    ...mapGetters(['packagesList', 'packageInfo', 'error']),
  },

  watch: {
    error(val) {
      if (val) {
        this.showAlert = true;
      }
    },
  },

  methods: {
    ...mapActions(['getPackageInfo', 'cleanPackageList', 'clearError', 'clearPackageInfo']),

    showPackageInfo(packageItem) {
      this.packageName = packageItem.name;
      this.getPackageInfo({ query: packageItem.name });
      this.getPackageInfo({ query: packageItem.name, version: packageItem.version, type: 'stat' });
      this.$refs.modal.show();
    },

    closeModal() {
      this.clearPackageInfo();
      this.packageName = '';
    },

    goHome() {
      this.showAlert = false;
      this.$router.push('/');
      this.$root.$emit('clearSearch');
      this.clearError();
    }
  }
}
</script>
