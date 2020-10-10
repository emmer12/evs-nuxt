<template>
  <div>
    <NavView />
    <Nuxt />
  </div>
</template>
<style src="cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css"></style>
<style lang="scss">

.load-con{
  background: #ddd;
    height: 260px;
    width: 100%;
    position: relative;

   & .img-area{
         height: 180px;
        background: #cdcdcd;
        padding: 10px;
        margin: 10px;
        border-radius: 3px;
        position: relative;
        overflow: hidden;
        top:12px
   }
   & .details{
    height: 26px;
    background: #999;
    padding: 10px;
    margin: 10px;
    width: 30%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 3px;
    overflow: hidden;
    top:14px
   }
   & .leftDetails{
      height: 26px;
    background:#cdcdcd;
    padding: 10px;
    margin: 10px;
    width: 30%;
    position: relative;
    left:5px;
    border-radius: 3px;
    overflow: hidden;
    top:14px
   }


  
}

.loads{
      background:red;
      
      &::after{
      content: "";
      position: absolute;
      height:100%;
      width: 100%;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent);
      animation:loading 1s infinite backwards;
      top:0px;
      left:0px;
      transform:translateX(-100%)
    }
  }
.fade-enter-active, .fade-leave-active {
transition: opacity .5s ease;
}
.fade-enter, .fade-leave-to{
  opacity:0;
}
 @keyframes loading{
        100%{
           transform: translateX(100%)
       }
   }
</style>
