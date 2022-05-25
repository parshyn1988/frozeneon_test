import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    packagesList: null,
    packageInfo: {
      version: null,
      stat: null,
    },
    error: null,
  },

  getters: {
    packagesList(state) {
      return state.packagesList;
    },

    packageInfo(state) {
      return state.packageInfo;
    },

    error(state) {
      return state.error;
    }
  },

  mutations: {
    packagesList(state, payload) {
      state.packagesList = payload;
    },

    packageInfo(state, payload) {
      console.log(' payload ', payload);

      if (payload) {
        switch (payload.type) {
          case 'version':
            state.packageInfo.version = payload.data;
            break;
          case 'stat':
            state.packageInfo.stat = payload.data;
            break;
        }
      } else {
        state.packageInfo.version = payload;
        state.packageInfo.stat = payload;

      }

    },

    packageInfoStat(state, payload) {
      state.packageInfo.stat = payload;
    },

    error(state, payload) {
      state.error = payload;
    }
  },

  actions: {
    async getPackageList({ commit }, { query, from = 0 }) {
      commit('error', null);

      if (query) {
        const res = await fetch(`https://api.npms.io/v2/search?q=${query}&size=10&from=${from}`);
        try {
          const packages = await res.json();
          commit('packagesList', packages);

          if (packages.message) {
            commit('packagesList', null);
            commit('error', packages.message);
          }
        } catch(error) {
          console.error(error);
        }
      }
    },

    cleanPackageList({ commit }) {
      commit('packagesList', null);
    },

    clearError({ commit }) {
      commit('error', null);
    },

    async getPackageInfo({ commit }, { query, version, type = 'version' }) {
      const packageVersion = version ? `@${version}` : '';
      const res = await fetch(`https://data.jsdelivr.com/v1/package/npm/${query}${packageVersion}`);
      try {
        const data = await res.json();
        commit('packageInfo', { data, type })
      } catch(error) {
        console.error(error);
      }
    },

    clearPackageInfo({ commit }) {
      commit('packageInfo', null);
    }
  },
});
