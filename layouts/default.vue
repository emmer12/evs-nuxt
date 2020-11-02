<template>
  <div>
    <NavView />
    <Nuxt />
  </div>
</template>
<style src="cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css"></style>
<style lang="scss">
.heading {
  & h1 {
    color: #555;
    font-size: 30px;
    padding: 10px;
    letter-spacing: 4px;
    font-family: "Fugaz One", cursive;
    position: relative;
    margin: 10px;
  }

  & ::after {
    content: "";
    position: absolute;
    height: 3px;
    width: 100px;
    background: #555;
    bottom: 0px;
    left: 0px;
  }
}

.vid-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  margin-top: 25px;
  margin-left: 25px;
  margin-right: 25px;
  & .items {
  // box-shadow: 2px 3px 10px #666; 
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 1));
    height: 220px;
    cursor: pointer;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    img{
      object-fit: cover;
      height:100%;
      border-radius: 10px;

    }
    & .play{
      position:absolute;
      color:rgba(255, 255, 255, 1);
      left:50%;
      top:50%;
      transform:translate(-50%,-50%);
    }
    & .details {
    transition: 1s;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0.1));
      color: rgba(255, 255, 255, 0.7);
      padding: 10px;
      font-size: 16px;
      font-weight: 700;
    }
    &:hover > {
      & .details {
        color:#fff;
        transform-origin: bottom left;
        animation:zoomIn 0.3s;
      background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0));



      }
    }
  }
}





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
