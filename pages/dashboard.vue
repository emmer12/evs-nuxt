<template>
  <div>
    <div class="dashboard container">
      <div class="sidebar" :class="{'added':menu}">
      <button class="dash-bar circular ui icon button small" @click="openMenu">
        <i class="icon th large"></i>
      </button>
        <ul>
          <li>
            <nuxt-link :class="{active:$route.name==='dashboard'}" tag="span" to="/dashboard">Feeds</nuxt-link>
          </li>
          <li>
            <nuxt-link :class="{active:$route.name==='dashboard-category'}" tag="span" :to="'/dashboard/category'">Category</nuxt-link>
          </li>
           <li>
            <nuxt-link :class="{active:$route.name=='dashboard-inbox'}" tag="span" to="/dashboard/inbox">Inbox</nuxt-link>
          </li>
          <li>
            <nuxt-link :class="{active:$route.name=='settings'}" tag="span" to="#">Settings</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="body">
        <div class="action-con">
          <router-link
            class="pull-left"
            style="float: left;"
            v-if="$route.path==='/dashboard/create' || $route.path==='/dashboard/category'"
            :to="{name:'dashboard'}"
          >
            <button class="circular ui icon button small">
              <i class="icon arrow left"></i>
            </button>
          </router-link>
          <div class="right">
            <button
              v-if="$route.path==='/dashboard/create'"
              class="circular ui icon button medium green"
              @click="processPost"
              :disabled="loading"
            >
              <i class="icon save"></i> Save 
            </button>
            <router-link v-else :to="'/dashboard/create'">
              <button class="circular ui icon button medium green">
                <i class="icon plus"></i>
              </button>
            </router-link>
          </div>
        </div>

        <nuxt-child></nuxt-child>
  
      </div>
    </div>

  </div>
</template>
<script>

export default {
  middleware:['auth'],
  data() {
    return {
      editting: false,
      addNew: false,
      postList: true,
      menu:false,
      loading:false
    };
  },
  watch: {
    $route(){
      this.menu=false
    }
  },
  methods: {
    addPost: function() {
      this.addNew = true;
      this.postList = false;
    },
    backList: function() {
      this.addNew = false;
      this.postList = true;
    },
    processPost() {
      this.loading=true
      this.$nuxt.$emit("save-evs-feed")
      this.loading=false
    },
    openMenu(){
      this.menu=!this.menu
    }
  },
  mounted() {}
};
</script>
<style src="cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css"></style>
<style lang="scss" scoped>
.dashboard {
  padding:20px;
  background:#fff;
  top: 10px;
  position: relative;
  & .sidebar {
  & .dash-bar{
   transition:0.3s;
    position:fixed;
    z-index: 888;
    left:20px;
    display:none
  }
 
   transition:0.3s;
    width: 230px;
    background: #fafafa;
    position: absolute;
    height: 70vh;
    & ul {
      display: flex;
      flex-direction: column;
      margin: 0px;
      padding: 0px;

      & li span {
        display: block;
        padding: 10px 20px;
        font-weight: 700;
        margin: 5px;
        color: #555;
        background: #f5f5f5;
        cursor: pointer;
        width: 90%;
        &.active {
          background: #3d3df6;
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
          width: 100%;
          color: white;
        }
      }
    }
  }
  & .body {
    margin-left: 230px;
    padding: 20px;
    & .action-con {
      height: 50px;
      line-height: 50px;
      text-align: right;
      box-shadow: 2px 2px 3px #ccc;
      margin: 5px;
      padding: 0px 10px;
    }
  }
}

@media (max-width: 640px) {
  .dashboard {
    & .sidebar {
      left: -240px;
      z-index: 999;
       & .dash-bar{
         display:block;
         }
     &.added{
      left:0px;
      & .dash-bar{
        left:240px;
        z-index:666;
      }
     }
    }
    & .body {
      margin-left: 0px;
    }
  }
}
</style>