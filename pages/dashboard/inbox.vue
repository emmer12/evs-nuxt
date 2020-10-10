<template>
  <div class="container">
    <div class="list" v-if="inboxs.length">
      <div class="ui celled list my-list">
        <transition-group enter-active-class="animated slideInLeft" leave-active-class="animated slideOutRight">
          <div class="item" v-for="inbox in inboxs" :key="inbox._id">
            <i class="user icon"></i>
            <div class="content">
              <div class="header">{{ inbox.fullname }} | <span class="">{{ inbox.subject }}</span></div>
               <p>{{inbox.body }}</p>
              <button class="ui icon button red circular " @click="deleteCat(inbox._id)">
              <i class="trash icon"></i>
              </button>
            </div>
          </div>
        </transition-group>
        </div>
      <br />
    </div>
        <div v-else>
           <div class="ui floating text-center empty" v-show="!loading">
            <h2 style="color:rgba(0,0,0,0.5)">You don't have any message</h2>
              <button class="circular ui icon button huge grey">
                <i class="icon envelope outline"></i>
              </button>
    </div>
        </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hide: true,
      loadingi:false,
      category:'',
      loading:false
    };
  },
  methods: {
      submit(){
          this.loadingi=true
          this.$store.dispatch('saveCategory',{'category':this.category}).then(()=>{
            this.category='';
              this.loadingi=false
                this.$toast.success({
                          title: "Category Added",
                          message: "category successfully Added "
                     });
          })
      },
      deleteCat(id){
          let confirmed=confirm("you are about to delete a category !")
          if (confirmed) {
             this.$store.dispatch('deleteInbox',id).then(()=>{
                   this.$toast.success({
                        title: "Inbox Deleted",
                        message: "inbox successfully deleted "
                    });
             })
          }else{
              return
          }
      }
  },
  mounted () {
        this.loading=true
      this.$store.dispatch('getMessage').then(()=>{
        this.loading=false;
      })
  },
  computed: {
      inboxs(){
          return this.$store.getters.inbox
      }
  },
};
</script>

<style lang="scss" scoped>
.my-list {
    overflow: hidden;
    box-shadow: 0px 3px 5px #ddd;
  & .item {
    border:1px solid #f6f6f6;
    padding: 20px 10px;
    display:flex;
    margin-top :10px;

    & i.user{
      font-size:30px;
      color:grey;
    }
   & .content{
     width:100%;
     margin-left:10px;

     & .header{
       font-weight:700;

     }
    }

    & button {
      float: right;
    }
  }
  & .input{
      opacity:1;
      transition: 0.3s;
  }
  & .hide{
       opacity:0;
      transform: translate(30px);
  }
}

.empty{
  text-align:center;
  margin-top:100px;
}
</style>