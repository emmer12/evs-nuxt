<template>
  <!-- <slider-view></slider-view> -->
  <div  v-if="!loading">
    <!-- :style="`background:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${imageUrl})`" -->
    <div  class="banner">
      <img :src="imageUrl" alt="EVS" >
      <div class="content">
        <div class="column wow zoomIn" style="cursor:pointer" @click="setIndex(0)">
          <i class="play icon" style="font-size:40px;line-height:40px"></i>
        </div>
        <h1 v-if="feeds && feeds.length" class="wow fadeIn">{{ feeds[0].title }}</h1>
        <h4 v-if="feeds && feeds.length" class="wow fadeInUp">{{ feeds[0].category }}</h4><br>
        <nuxt-link :to="{name:'contact'}" class="ui button red">Get in touch</nuxt-link>
    
      </div>
    </div>

    <div class="row" style="margin:50px 0px 25px 25px">
      <div class="col-md-3" v-for="i in 5" :key="i" v-show="loading">
        <div class="load-con">
          <div class="img-area loads"></div>
          <div class="leftDetails loads"></div>
        </div>
      </div>
    </div>

    <div class="vid-grid" >
      <div class="items wow slideInUp"  :data-wow-delay="(index * 0.2)+'s'" v-for="(image, index) in feeds" :key="index" @click="setIndex(index)">
        <img :src="image.thumb" width="100%"  alt="evs" />
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

    <!-- :style="{ backgroundImage: 'url(' + image.src + ')' }" -->

    <!-- <LightBox :media="media" :autoPlay="true"></LightBox> -->

    <div :class="{'leaving':leaving}"></div>
    <div :class="{'entring':entring}" ></div>

    <div style="height:100px"></div>
  </div>
</template>

<script>
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
export default {
  transition:{
    name:'intro'
  },
  components: {
    // LightBox
    CoolLightBox
  },
  data() {
    return {
      leaving: false,
      entring: false,
      index: null,
      loading: true
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
    }
  },
  mounted() {
    this.loading = true;
    this.$store.dispatch("getEvsFeed").then(() => {
      this.loading = false;
    });
  },
  computed: {
    LoggedUser() {
      if (window.loggedUser) {
        return true;
      } else {
        return false;
      }
    },
    feeds() {
      return this.$store.getters.evsFeeds;
    },

    imageUrl(){
      return this.feeds[0].thumb
    }
  },
   created() {
    this.entring = true;
    let tis = this;
    setTimeout(function() {
      tis.entring = false;
    }, 550);
  },

  beforeRouteLeave(to, from, next) {
    this.leaving = true;
    setTimeout(function() {
      next();
    },1000);
  }
};
</script>


<style lang="scss">

.banner {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
  img{
    // display:none;
    position:relative;
    object-fit: cover;
    z-index: -1;
    width:100%;
    height: 90vh;
    display:block;
    opacity:0.7;
    // overflow:hidden
  }
  .content{
    display:bold;
    position: absolute;
    z-index: 111;
    left:50%;
    transform: translateX(-50%);
    width:100%;
  }
  background-repeat: no-repeat;
  background-size: cover;
  height: 90vh;
  width: 100vw;
  text-align: center;
  // clip-path: polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 100% 100%, 85% 100%, 15% 100%, 0 100%, 0% 85%);
  // clip-path: polygon(0% 15%, 0 0, 15% 0%, 85% 0%, 100% 0, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%);
  & div {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    color: white;


    & h1,
    h4 {
      line-height: 10px;
      
    }

    & h4{
      color:white;
      font-family: "Fugaz One", cursive;
      position: relative;
      display: inline-block;
      z-index:1;

      &::before{
        content: "";
        height: 15px;
        width: 15px;
        border-radius: 50%;
        position: absolute;
        top: -11px;
        left: -13px;
        z-index: 0;
        background: linear-gradient(21deg, #7148bd, #8585c4);
      }

    }

    & h1 {
      font-size: 50px;
      color:rgba(255, 255,255,1);
      font-family: serif;
      
    }
  }
}

@keyframes leftR {
  0% {
    transform: translate3d(-100%, 0px, 0px);
  }
  100% {
    transform: translate3d(0%, 0px, 100px);
  }
}

@keyframes rightR {
  0% {
    transform: translate3d(0%, 0px, 0px);
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translate3d(-100%, 0px, 100px);
    opacity: 0;
  }
}

.leaving {
  &::before {
    animation-name: leftR;
    animation-duration: 0.7s;
    top: 0px;
  }
  &::after {
    animation-name: leftR;
    animation-duration: 1s;
    bottom: 0;
  }
  &::before,
  &::after {
    content: "";
    height: 50%;
    width: 100%;
    position: fixed;
    left: 0px;
    transition-property: opacity, translate;
    transition-timing-function: ease-in-out;
    background: #444;
    z-index: 9999;
  }
}

.entring {
  &::before {
    animation-name: rightR;
    animation-duration: 0.7s;
    top: 0px;
  }
  &::after {
    animation-name: rightR;
    animation-duration: 1s;
    bottom: 0;
  }
  &::before,
  &::after {
    content: "";
    height: 50%;
    width: 100%;
    position: fixed;
    left: 0px;
    transition-property: opacity, translate;
    transition-timing-function: ease-in-out;
    background: #444;
    transform-origin: left;
    z-index: 9999;
  }
}

@media screen and (max-width: 640px) {
  .heading h1 {
    font-size: 20px;
  }
  .vid-grid {
    grid-template-columns: 1fr;
  }

  
.banner {
  // clip-path: polygon(0% 15%, 0 0, 15% 0%, 85% 0%, 100% 0, 100% 15%, 100% 85%, 85% 85%, 85% 92%, 15% 92%, 15% 85%, 0% 85%);
  & div {
    & h1,
    h4 {
      line-height: 0px;
      
    }
    & h1 {
      font-size: 40px;
    }
  }
}
}
</style>