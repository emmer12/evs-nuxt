<template>
  <div>
    <div class="heading wow bounceInLeft">
      <h1 v-if="feeds.length">Films</h1>
    </div>

    <div class="container">
      <div v-if="!feeds.length && !loading">
      <div class="heading wow bounceInLeft">
      <!-- <h1 else>{{$route.params.category.charAt(0).toUpperCase() + $route.params.category.substr(1) }}</h1> -->

     </div>

      <div class="ui info message">
        <div class="header">No videos under this category</div>
      </div>
    </div>
    </div>

    <div class="row" style="margin:10px 0px 25px 25px">
      <div class="col-md-3" v-for="i in 5" :key="i" v-show="loading">
        <div class="load-con">
          <div class="img-area loads"></div>
          <div class="leftDetails loads"></div>
        </div>
      </div>
    </div>
    <div class="vid-grid">
      <div
        class="items wow slideInUp"
        :data-wow-delay="(index * 0.2)+'s'"
        v-for="(image, index) in feeds"
        :key="index"
        @click="setIndex(index)"
      >
        <img :src="image.thumb" width="100%" height="100%" alt="evs" />
        <div class="details">{{ image.category }}</div>
         <div class="play"> <i class="play icon" style="font-size:30px;line-height:30px"></i></div>

      </div>
    </div>

    <CoolLightBox
      :items="feeds"
      :index="index"
      loop
      autoplay
      @on-change="handleChange"
      @close="index = null"
    ></CoolLightBox>

    <div style="height:100px"></div>
    <div :class="{'leaving':leaving}"></div>
    <div :class="{'entring':entring}" ></div>
  </div>
  <!-- <style src="slick-carousel/slick/slick.css"></style> -->
</template>

<script>
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
export default {
  components: {
    CoolLightBox
  },
  transitions: {
    name: "intro"
  },
  data() {
    return {
      leaving: false,
      index: null,
      loading: false,
      entring: false
    };
  },
  methods: {
    setIndex(index) {
      this.index = index;
    },
    handleChange(e) {
      let allVid = document.querySelectorAll("video");
      for (let index = 0; index < allVid.length; index++) {
        allVid[index].pause();
      }
    },
    getByCat() {
      this.$store.dispatch("getByCat",'film').then(() => {
        this.loading = false;
      });
    }
  },
  mounted() {
    this.loading = true;
    this.getByCat();
  },
  computed: {
    feeds() {
      return this.$store.getters.evsCatFeeds;
    }
  },
  created() {
    this.entring = true;
    let tis = this;
    setTimeout(function() {
      tis.entring = false;
    }, 600);
  },
  watch: {
    $route() {
      this.getByCat();
    }
  },

  beforeRouteLeave(to, from, next) {
    this.leaving = true;
    setTimeout(function() {
      next();
    }, 1000);
  }
};
</script>



<style lang="scss" scoped>
.intro-leave-active {
  opacity: 0.5s;
  transition: 0.4s;
}
</style>