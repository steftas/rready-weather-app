<template>
  <div>
    <Gridstack v-if="!loading" />
    <div v-if="loading">Loading</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import Gridstack from "../components/Gridstack.vue";
import packResponseData from "../utility/packResponseData";
import http from "../api/axios";

export default Vue.extend({
  name: "Home",

  components: {
    Gridstack,
  },

  data: () => ({
    loading: true,
  }),

  computed: {
    ...mapGetters({
      cities: "getCities",
    }),
  },
  methods: {
    onGetWeather(city) {
      this.loading = true;
      http
        .get(
          `api.openweathermap.org/data/2.5/weather?q=${city}&mode=json&units=metric&appid=f4c563633255c1fc7c79cc5f8a559729`
        )
        .then((response) => {
          this.$store.dispatch("addCityWeather", packResponseData(response.data));
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
  },
  mounted() {
    if (this.cities) {
      this.cities.forEach((city) => {
        this.onGetWeather(city);
      });
    }
  },
});
</script>
