<template>
  <div>
    <TopBanner :page="'Contact page'" :background="'banner1'"></TopBanner>

    <div class="map-wrap">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="map-area">
              <h1>Map</h1>
              <div id="googleMap" style="width:100%;height:10px;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="contact">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <form class="ui form" @submit.prevent="sendMessage" :class="{loading:loading}">
              <div class="heading wow bounceInLeft">
                <h1>Stay In Touch</h1>
              </div>
              <p>Please fill he form below if you have an argent call. Thank you</p>
              <div class="ui positive message" v-if="success">
                <i class="close icon" @click="hideMes"></i>
                <div class="header">Message Sent</div>
                <p>Thank you, we will get back to you soon</p>
              </div>
              <div class="field">
                <label for="fullname">Fullname</label>
                <input placeholder="Fullname" type="text" id="fullname" v-model="message.fullname" />
              </div>
              <div class="two fields">
                <div class="field">
                  <label for="email">Email Address</label>
                  <input
                    placeholder="example@mail.com"
                    id="email"
                    type="email"
                    v-model="message.email"
                  />
                </div>
                <div class="field">
                  <label for="subject">Subject</label>
                  <input placeholder="Subject" type="text" id="subject" v-model="message.subject" />
                </div>
              </div>

              <div class="field">
                <label>Body</label>
                <textarea
                  id
                  cols="30"
                  rows="10"
                  placeholder="Messages"
                  type="text"
                  v-model="message.body"
                ></textarea>
              </div>

              <button class="ui button" type="submit">Submit</button>
            </form>
          </div>

          <div class="col-md-6 address">
            <ul>
              <li class="wow bounceInLeft" data-wow-delay="0.3s">
                <i class="icon map marker alternate"></i>
                <a href="#">No 34 texas lane 673h</a>
              </li>
              <li class="wow bounceInLeft" data-wow-delay="0.6s">
                <i class="icon phone square"></i>
                <a href="tel:+0947367434">098676566</a>
              </li>
              <li class="wow bounceInLeft" data-wow-delay="1s">
                <i class="icon envelope outline"></i>
                <a href="mail:admin@mail.com">admin@mail.com</a>
              </li>

                  <button class="ui facebook button">
                  <i class="facebook icon"></i>
                  Facebook
                </button>
                <button class="ui twitter button">
                  <i class="twitter icon"></i>
                  Twitter
                </button>
                <button class="ui linkedin button">
                  <i class="linkedin icon"></i>
                  LinkedIn
                </button>
                <button class="ui instagram button">
                  <i class="instagram icon"></i>
                  Instagram
                </button>
                <button class="ui youtube button" style="margin-top:10px">
                  <i class="youtube icon"></i>
                  YouTube
                </button>
            </ul>
          
          </div>
        </div>
        <!-- <div class="pre-loader"></div> -->
      </div>
    </div>
    <br />
    <br />
    <div :class="{'entring':entring}" ></div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      entring: false,
      message: {},
      loading: false,
      success: false
    };
  },
  methods: {
    sendMessage() {
      this.loading = true;
      this.$store
        .dispatch("sendMessage", this.message)
        .then(() => {
          this.message = {};
          this.loading = false;
          this.success = true;
          this.$toast.success({
            title: "Message sent",
            message: "Message has been sent, we will get back to you soon",
            showDuration: 5000
          });
        })
        .catch(err => {
          this.loading = false;
          this.$toast.error({
            title: "Server Error",
            message: "please make sure that each field are filled correctly"
          });
        });
    },
    hideMes() {
      this.success = false;
    }
  },
  created() {
    this.entring = true;
    let tis = this;
    setTimeout(function() {
      tis.entring = false;
    }, 600);
  },
  mounted() {},
  computed: {}
};
</script>


<style lang="scss">
.pre-loader {
  &::after {
    content: "";
    height: 50px;
    width: 50px;
    background: rgba(0, 0, 0, 1);
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 250px;
    animation: scaleN 0.5s;
    transform: scale(0);
    transform-origin: center;
  }

  &::before {
    content: "";
    height: 50px;
    width: 50px;
    background: rgba(255, 255, 255, 1);
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 250px;
    animation: scaleN 0.5s;
    transform: scale(0);
    transform-origin: center;
  }
}
@keyframes scaleN {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(5);
    opacity: 1;
    width: 500px;
    height: 500px;
  }
}
.contact {
  background: rgba(76, 58, 126, 0);
  padding: 10px;
  & .form p {
    font-size: 15px;
    color: #777;
    line-height: 26px;
    margin-bottom: 40px;
  }

  & .address {
    padding: 10px;
    margin-top: 10px;
    overflow: hidden;

    & ul li {
      line-height: 50px;
      background: radial-gradient(#f3f2ff, transparent);
      & a {
        color: #444;
        font-weight: 600;
      }
      & i {
        font-size: 30px;
        color: rgb(86, 79, 204);
      }
    }
  }
}
</style>