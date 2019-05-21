<template>
  <div class="firstp normal">
    <transition :enter-active-class="srcs.dots.clName">
      <div
        class="firstp-dots-bg normal-inner-bg"
        :style="{ backgroundImage: srcs.dots.src }"
        v-show="srcs.dots.show"
        data-animation="firstp-animated"
        data-id="dots"
      ></div>
    </transition>

    <div class="firstp-main">
      <transition :enter-active-class="srcs.title.clName">
        <div
          class="firstp-title firstp-normal-div"
          v-show="srcs.title.show"
          data-animation="firstp-animated"
          data-id="title"
        >
          <img :src="srcs.title.src" alt="" /></div
      ></transition>
      <transition :enter-active-class="srcs.tenman.clName">
        <div
          class="firstp-ten-man firstp-normal-div"
          v-show="srcs.dots.show"
          data-animation=""
          data-id="tenman"
        >
          <img :src="srcs.tenman.src" alt="" /></div
      ></transition>
      <transition :enter-active-class="srcs.stars.clName">
        <div
          class="firstp-stars-bg normal-inner-bg  "
          :style="{ backgroundImage: srcs.stars.src }"
          v-show="srcs.title.show"
          data-animation=""
          data-id="stars"
        ></div
      ></transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      srcs: {
        tenman: {
          src: require('../assets/firstp/tenman.png'),
          show: false,
          clName: 'animated fadeInUp'
        },
        title: {
          src: require('../assets/firstp/title.png'),
          show: false,
          clName: 'animated fadeInDown'
        },
        dots: {
          src: 'url(' + require('../assets/firstp/dots.png') + ')',
          show: false,
          clName: 'animated fadeIn'
        },
        stars: {
          src: 'url(' + require('../assets/firstp/stars.png') + ')',
          show: false,
          clName: 'animated fadeIn'
        }
      },
      defaultAnimationClassName: 'animated fadeIn',
      show: false,
      animation: {
        transitionEnd: '',
        animationEnd: ''
      }
    };
  },
  name: 'firstp',
  mounted() {
    const animationTargets = document.querySelectorAll(
      "div[data-animation='firstp-animated']"
    );
    this.$animations({
      els: animationTargets,
      event: this.$animationEnd,
      targetsData: this.srcs
    });
  }
};
</script>

<style lang="stylus" scoped>
p {
  display: block;
  position: fixed;
  font-family: 'hyxqt';
  z-index: 9999;
  color: #ffffff;
  font-kerning: normal;
  font-stretch: 50%;
}

.firstp {
  top: 0;
  background-position: 0 0;
}

.firstp-main {
  position: relative;
  margin-top: 10.26986506746627vh;
}

.firstp-normal-div {
  width: 100%;
  background-size: 100% 100%;
  background-position: center center;
}

.firstp-dots-bg {
  // background-image: url('../assets/firstp/dots.png');
}

.firstp-ten-man {
  position: absolute;
  top: 19.6101949025487vh;
  height: 70vh;

  & img {
    width: 100%;
    height: 100%;
  }
}

.firstp-stars-bg {
  height: 92.6296851574213vh;
  z-index: 5;
  background-position-y: -2vh;
}

.firstp-title {
  // top: 8.2vh;
  position: absolute;
  height: 14.5vh;
  left: 11.33333vw;
  right: 11.33333vw;
  width: 77.86666666666667vw;
  z-index: 2;
  transition: opacity 0.2s ease-in-out;

  & img {
    width: 100%;
    height: 100%;
  }
}
</style>
