<template>
  <v-container>
    <div v-if="layout.length === 0">NO API OR NO CITY</div>
    <grid-layout
      :layout.sync="layout"
      :col-num="12"
      :row-height="56"
      :is-draggable="true"
      :is-resizable="false"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[16, 16]"
      :use-css-transforms="true"
    >
      <grid-item v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i">
        <City :cityData="item.data" />
      </grid-item>
    </grid-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import VueGridLayout from "vue-grid-layout";
import { mapGetters } from "vuex";
import City from "./City.vue";

export default Vue.extend({
  name: "Gridstack",
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    City,
  },

  data: () => ({
    layout: [],
  }),
  computed: {
    ...mapGetters({
      citiesWeather: "getCitiesWeather",
    }),
  },
  watch: {
    citiesWeather() {
      this.layout = [];
      this.citiesWeather.forEach((el: Record<string, unknown>, i: number) => {
        const obj = {
          x: (i % 3) * 4,
          y: i,
          w: 4,
          h: 6,
          i: `${el.id}-${i}`,
          data: el,
        };

        this.layout.push(obj);
      });
    },
  },
});
</script>

<style lang="scss">
.container {
  .vue-grid-layout {
    background: transparent;
  }

  .vue-grid-item.vue-grid-placeholder {
    background: #1976d2 !important;
    opacity: 0.2 !important;
    border-radius: 4px !important;
  }
}
</style>
