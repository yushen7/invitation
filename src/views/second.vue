<template>
  <div class="secondp normal">
    <transition :enter-active-class="oTarget.sky.clName">
      <div
        class="secondp-sky-bg normal-inner-bg"
        :style="{ backgroundImage: srcs[0] }"
        v-show="oTarget.sky.show"
        data-animation="secondp-animated"
        data-id="sky"
      ></div>
    </transition>
    <transition :enter-active-class="oTarget.man.clName">
      <div
        class="secondp-man"
        :style="{ backgroundImage: srcs[3] }"
        data-animation="secondp-animated"
        data-id="man"
        v-show="oTarget.man.show"
      ></div>
    </transition>
    <div class="secondp-words">
      <transition :enter-active-class="oTarget.words.clName">
        <div
          class="words-1 words-bg"
          v-show="oTarget.words1.show"
          data-animation="secondp-animated"
          data-id="words1"
        ></div>
      </transition>
      <transition :enter-active-class="oTarget.words.clName">
        <div
          class="words-2  words-bg"
          v-show="oTarget.words2.show"
          data-animation="secondp-animated"
          data-id="words2"
        ></div>
      </transition>
      <transition :enter-active-class="oTarget.words.clName">
        <div
          class="words-3  words-bg"
          v-show="oTarget.words3.show"
          data-animation="secondp-animated"
          data-id="words3"
        ></div>
      </transition>
      <transition :enter-active-class="oTarget.wordsStar.clName">
        <div class="words-star words-bg" v-show="oTarget.words3.show"></div>
      </transition>
      <transition :enter-active-class="oTarget.cornerStar.clName">
        <div class="corner-star words-bg" v-show="oTarget.sky.show"></div>
      </transition>
    </div>
    <transition :enter-active-class="oTarget.moon.clName">
      <div
        class="secondp-moon"
        :style="{ backgroundImage: srcs[2] }"
        v-show="oTarget.sky.show"
        data-animation=""
        data-id="moon"
      ></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'secondp',
  data() {
    return {
      srcs: [
        'url(' + require('@/assets/secondp/sky.png') + ')',
        'url(' + require('@/assets/secondp/words.png') + ')',
        'url(' + require('@/assets/secondp/moon.png') + ')',
        'url(' + require('@/assets/secondp/man.png') + ')'
      ],
      oTarget: {
        sky: {
          clName: 'animated fadeIn',
          show: false
        },
        moon: {
          clName: 'animated rotateIn slow'
        },
        man: {
          clName: 'animated bounceInRight',
          show: false
        },
        words1: {
          show: false
        },
        words2: {
          show: false
        },
        words3: {
          show: false
        },
        words: {
          clName: 'animated fadeInLeft'
        },
        wordsStar: {
          clName: 'animated rotateIn',
          show: false
        },
        cornerStar: {
          clName: 'animated rotateIn',
          show: false
        }
      }
    };
  },
  mounted() {
    const animationTargets = document.querySelectorAll(
      "div[data-animation='secondp-animated']"
    );
    this.$animations({
      els: animationTargets,
      targetsData: this.oTarget,
      event: this.$animationEnd
    });
  }
};
</script>

<style lang="stylus" scoped>
.secondp {
  background-position-y: -100%;
}

.secondp-moon {
  position: absolute;
  width: 43vw;
  height: 24vh;
  right: 3vw;
  top: 0;
  background-size: 100% 100%;
}

.secondp-man {
  position: absolute;
  width: 36vw;
  height: 29vh;
  right: 10vw;
  bottom: 10vh;
  background-size: 100% 100%;
}

.secondp-words {
  position: relative;
  margin: 16vh 4vw 28vh 10vw;
  width: 86vw;
  height: 56vh;
  background-size: 86vw 56vh;

  & .words-bg {
    width: 7vw;
    height: 100%;
    background-image: url('../assets/secondp/words.png');
    background-size: inherit;
    position: absolute;
    overflow: hidden;
  }

  & .words-1 {
    left: 0;
    background-position: 0 0;
  }

  & .words-2 {
    left: 12vw;
    background-position: -12vw 0;
  }

  & .words-3 {
    left: 23vw;
    background-position: -23vw 0;
    // 除去星星
    height: 30vh;
  }

  & .words-star {
    top: 30vh;
    left: 18vw;
    background-position: -18vw 26vh;
    width: 24vw;
    height: 9vh;
  }

  & .corner-star {
    height: 19vh;
    width: 36vw;
    left: 51vw;
    background-position: -50vw 0;
  }
}
</style>
