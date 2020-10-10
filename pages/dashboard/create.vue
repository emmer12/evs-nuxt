<template>
  <div class="post-container">
  

    <div class="ui elevate">
      <form
        class="ui form"
        @submit.prevent="processPost"
        enctype="multipart/formd-data"
        :class="{loading:loading}"
      >
        <div v-if="serverErrors">
          <div
            class="ui negative message"
            v-for="(error, index) in serverErrors"
            :key="index"
          >{{error[0]}}</div>
        </div>

        <!-- <validation-provider rules="required" v-slot="{ errors }"> -->
          <div class="field" >
            <label>Title</label>
            <input type="text" name="title" placeholder="Post title" required v-model="newPost.title" />
            <span class="error" style="color:#9f3a38"></span>
          </div>
        <!-- </validation-provider> -->

        <!-- <validation-provider rules="required" v-slot="{ errors }" >
                                    <div class="field" :class="{error:errors[0],success:errors[0]}">
                                        <label>Description</label>
                                        <ckeditor height="200px" :editor="editor" v-model="newPost.description" :config="editorConfig"></ckeditor>
                                        <span class="error" style="color:#9f3a38">{{errors[0]}}</span>
                                    </div>
        </validation-provider>-->
        
        <div class="field " style="margin-top:10px">
            <label>Category</label>
        <select class="ui fluid dropdown" required v-model="newPost.category">
          <option value=""> Select Category</option>
          <option v-for="(category, index) in categories" :key="index" :value="category.name">{{ category.name }}</option>
          <!-- <option value="Birthday">Birthday</option> -->
          <!-- <option value="Musical Vid">Musical Vid</option> -->
        </select>
        </div>

           <div class="progress" v-show="proImg">
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-primary" role="progressbar"
                  :style="{'width':progress+'%'}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{progress+'%'}}</div>
          </div>
        <div class="field custum-upload-manager" v-show="!src">
          <label for="display-pic">
            <div class="ui btn">
              <img src="~/assets/images/icons/img-icon.jpeg" ref="img" width="150px" height="150px" alt />
            </div>
          </label>
          <input
            type="file"
            name="thumb"
            id="display-pic"
            style="display:none"
            v-on:change="processForm"
          />
        </div>

        
           <div class="progress" v-show="proVid">
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-primary" role="progressbar"
                  :style="{'width':progress+'%'}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{progress+'%'}}</div>
          </div>
        <div class="field custum-upload-manager" v-show="!src">
          <label for="video">
            <div class="ui btn">
              <img src="~/assets/images/icons/vid-icon.png" v-if="!newPost.vid" width="150px" height="150px" alt />
              <video src="" ref="vid" width="150px" ></video>
            </div>
          </label>
          <input
            type="file"
            name="video"
            id="video"
            style="display:none"
            v-on:change="processForm"
          />
        </div>

        <div class="showImg" v-show="src">
          <img :src="src" width="100px" height="100px" />
          <div class="details">{{filename}}</div>
          <div class="ui button inverted red remove" @click="RemoveFile">Remove</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import { ValidationProvider } from "vee-validate";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { EventBus } from '../../event-bus'
export default {
  components: {
    // ValidationProvider
  },
  data() {
    return {
    //   editor: ClassicEditor,
      editorConfig: {},
      newPost: {
        title: "",
        category: "",
        img: "",
        vid:""
      },
      loading: false,
      serverErrors: null,
      src: "",
      filename: "",
      proImg:false,
      proVid:false
    };
  },
  methods: {
    processPost: function() {
      // this.$Progress.start();
     if (!this.newPost.title.length || !this.newPost.category.length) {
       alert('All field are required')
       return
     }else{
        this.loading = true;
        this.$store
        .dispatch("postNewData", this.newPost)
        .then(response => {
          this.loading = false;
          // this.$Progress.finish();
          this.newPost.title = "";
          this.newPost.description = "";
          this.newPost.fileUp = "";
          this.$toast.success({
            title: "Post Created",
            message: "post successfully created "
          });
          this.$router.push({ name: "dashboard" });
        })
        .catch(err => {
          this.loading = false;
          this.$Progress.fail();
          this.serverErrors = Object.values(err.response.data.errors);
          this.serverError = err.response.data.error;
          this.$toast.error({
            title: "Server Error",
            message: "please make sure that each field are filled correctly"
          });
        });
     }
    },

    processForm: function(e) {
      if (e.target.name==='thumb') {
        this.proImg=true
      }else{
        this.proVid=true
      }
      let target_e = e.target.files[0];
      this.newPost.fileUp = target_e;
      var current = this;
      this.$store.dispatch('uploadFile',{file:target_e,field:e.target.name}).then((res)=>{
        console.log('====================================');
        console.log(res);
        console.log('====================================');
        if (e.target.name==='thumb') {
          this.newPost.img=res.data.url
          this.$refs.img.src=res.data.url
          this.proImg=false
       }else{
          this.proVid=false
           this.newPost.vid=res.data.url
          this.$refs.vid.src=res.data.url
       }
      })

    },
    RemoveFile: function() {
      this.src = "";
      this.filename = "";
      this.newPost.fileUp = "";
    },
    backList: function() {
      this.$emit("backList");
    }
  },
  created () {
    this.$nuxt.$on('save-evs-feed',()=>{
      this.processPost()
    })
  },
  mounted() {
     this.$store.dispatch('getCategory')
  },


  computed: {
    progress(){
      return this.$store.getters.uploadProgress
    },
     categories(){
          return this.$store.getters.category
      }
  },
};
</script>

<style lang="scss">
.custum-upload-manager{
  border:1px dashed gray
}
.showImg {
  width: 100%;
  height: 120px;
  background: #f9f9f9;
  position: relative;
  padding: 10px;
  box-sizing: border-box;

  & img {
    float: left;
    border: 1px solid #ddd;
    border-radius: 3px;
  }
  & .details {
    color: #c3c6d8;
    font-weight: 700;
    width: 70%;
    background: transparent;
    float: left;
    line-height: 26px;
    margin-top: 74px;
    margin-left: 10px;
  }

  & .remove {
    position: absolute;
    right: 5%;
    top: 3%;
  }
}

.action-con {
      height: 50px;
      line-height: 50px;
      text-align: right;
      box-shadow: 2px 2px 3px #ccc;
      margin: 5px;
      padding: 0px 10px;
    }

.progress{
  height:4px;
  width:100%;
  background:#f7f6f6;

  & .progress-bar{
    transition:0.3s;
    background:#21ba45;
    height:100%;
    width:0%;
  }
}
</style>