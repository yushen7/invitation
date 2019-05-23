<template>
  <div
    id="app"
    @touchstart="ontouchstart"
    @touchmove.prevent="ontouchmove"
    @touchend="ontouchend"
  >
    <div class="gesture-box">
      <transition :name="transitionName">
        <component :is="views[index]"></component>
      </transition>
    </div>

    <div class="touchmove-to-top-tips" v-show="canShowSlideUpGuide"></div>
  </div>
</template>
<script>
import Firstp from '@/views/first.vue';
import Secondp from '@/views/second.vue';
import Thirdp from '@/views/third.vue';
import Fourthp from '@/views/fourth.vue';
export default {
  name: 'app',
  data() {
    return {
      views: ['Firstp', 'Secondp', 'Thirdp', 'Fourthp'],
      index: 0,
      gestureData: {
        start: {
          y: 0
        },
        moveFlag: true
      },
      transitionName: '',
      usLogo: require('@/assets/uslogo.png')
    };
  },
  computed: {
    canShowSlideUpGuide() {
      const limit = this.pageLength - 1;
      return this.index === limit ? false : true;
    },
    canSlideToDown() {
      return this.index === 0 ? false : true;
    },
    pageLength() {
      return this.views.length;
    }
  },
  watch: {
    index(n, o) {
      this.transitionName = n > o ? 'top-to-bottom' : 'bottom-to-top';
    }
  },
  components: {
    Firstp,
    Secondp,
    Thirdp,
    Fourthp
  },
  methods: {
    onFinished() {},
    ontouchstart(e) {
      this.gestureData.start.y = e.targetTouches[0].screenY;
    },
    ontouchmove(e) {},
    ontouchend(e) {
      const slideToTopFlag = this.canShowSlideUpGuide;
      const slideToDownFlag = this.canSlideToDown;
      if (!slideToTopFlag && !slideToDownFlag) {
        return;
      }
      const offsetY = e.changedTouches[0].screenY - this.gestureData.start.y;
      const isTouchmoveToTop = offsetY <= -10 ? true : false;
      const isTouchMoveToDown = offsetY >= 10 ? true : false;

      if (isTouchmoveToTop && slideToTopFlag) {
        e.preventDefault();
        this.index++;
      } else if (isTouchMoveToDown && slideToDownFlag) {
        e.preventDefault();
        this.index--;
      }
    }
    // beforeEnter: function(el) {
    //   // ...
    // },
    // // 当与 CSS 结合使用时
    // // 回调函数 done 是可选的
    // enter: function(el, done) {
    //   // ...
    //   done();
    // },
    // afterEnter: function(el) {
    //   // ...
    // },
    // enterCancelled: function(el) {
    //   // ...
    // },
    // // --------
    // // 离开时
    // // --------
    // beforeLeave: function(el) {
    //   // ...
    // },
    // // 当与 CSS 结合使用时
    // // 回调函数 done 是可选的
    // leave: function(el, done) {
    //   // ...
    //   done();
    // },
    // afterLeave: function(el) {
    //   // ...
    // },
    // // leaveCancelled 只用于 v-show 中
    // leaveCancelled: function(el) {
    //   // ...
    // }
  }
};
</script>

<style lang="stylus">
body {
  margin: 0;
}

#app {
  z-index: -1;
  width: 100%;
  height: 100vh;
}

.uslogo-wrapper {
  position: absolute;
  width: 8vw;
  height: 4vw;
  bottom: 0;
  left: 46vw;
  max-width: 48px;

  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}

.touchmove-to-top-tips {
  position: fixed;
  bottom: 10px;
  width: 8vw;
  height: 4vw;
  left: 46vw;
  animation: wave 1.5s linear infinite;
  background-image: url('./assets/slideDown.png');
  background-size: 100% 100%;
}

@keyframes wave {
  0% {
    transform: translateY(0);
  }

  25% {
    transform: translateY(-10px);
  }

  75% {
    transform: translateY(10px);
  }

  100% {
    transform: translateY(0);
  }
}

@font-face {
  font-family: 'hyxqt';
  src: url('./assets/hyxqt.ttf');
}

@font-face {
  font-family: 'wyxqnt';
  src: url('./assets/wyxqnt.otf');
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.normal {
  margin: 0 auto;
  position: absolute;
  margin: 0;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  background-image: url('./assets/background.jpg');
  background-size: 100vw 400vh;
  overflow: hidden;
  max-width: 420px;
}

.normal-inner-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-position: center center;
}

.bottom-to-top-enter-active, .bottom-to-top-leave-active, .top-to-bottom-enter-active, .top-to-bottom-leave-active {
  transition: all 0.5s ease-in-out;
}

.bottom-to-top-enter, .bottom-to-top-leave-to, .top-to-bottom-enter, .top-to-bottom-leave-to {
  opacity: 0.5;
}

.bottom-to-top-enter {
  transform: translateY(-100%);
  // transform: scale(0.1, 0.1);
}

.bottom-to-top-leave-to {
  transform: translateY(100%);
  // transform: scale(0.1, 0.1);
}

.top-to-bottom-enter-to, .top-to-bottom-leave, .bottom-to-top-enter-to, .bottom-to-top-leave {
  transform: translateY(0);
  opacity: 1;
  // transform: scale(1, 1);
}

.top-to-bottom-enter {
  transform: translateY(100%);
  // transform: scale(0.1, 0.1);
}

.top-to-bottom-leave-to {
  transform: translateY(-100%);
  // transform: scale(0.1, 0.1);
}
</style>
