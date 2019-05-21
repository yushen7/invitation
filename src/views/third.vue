<template>
  <div class="thirdp normal">
    <transition :enter-active-class="oTarget.sky.clName">
      <div
        class="thirdp-sky normal-inner-bg"
        data-animation="thirdp-animated"
        data-id="sky"
        v-show="oTarget.sky.show"
      ></div>
    </transition>
    <div class="thirdp-words">
      <transition :enter-active-class="oTarget.words.clName">
        <div
          class="words-1 words-bg"
          data-animation="thirdp-animated"
          data-id="words1"
          v-show="oTarget.words1.show"
        ></div>
      </transition>
      <transition :enter-active-class="oTarget.words.clName">
        <div
          class="words-2 words-bg"
          data-animation="thirdp-animated"
          data-id="words2"
          v-show="oTarget.words2.show"
        ></div>
      </transition>
      <transition :enter-active-class="oTarget.words.clName">
        <div
          class="words-3 words-bg"
          data-animation="thirdp-animated"
          data-id="words3"
          v-show="oTarget.words3.show"
        ></div>
      </transition>
      <transition :enter-active-class="oTarget.words.clName">
        <div
          class="words-4 words-bg"
          data-animation="thirdp-animated"
          data-id="words4"
          v-show="oTarget.words4.show"
        ></div>
      </transition>
    </div>
    <transition :enter-active-class="oTarget.man.clName">
      <div
        class="thirdp-man"
        :style="{ backgroundImage: srcs[1] }"
        data-animation="thirdp-animated"
        data-id="man"
        v-show="oTarget.man.show"
      ></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'thirdp',
  data() {
    return {
      srcs: [
        'url(' + require('../assets/thirdp/words.png') + ')',
        'url(' + require('../assets/thirdp/man.png') + ')'
      ],
      oTarget: {
        sky: {
          show: false,
          clName: 'animated fadeIn'
        },
        man: {
          show: false,
          clName: 'animated fadeIn'
        },
        words: {
          clName: 'animated fadeInUp'
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
        words4: {
          show: false
        }
      }
    };
  },
  mounted() {
    const animationTargets = document.querySelectorAll(
      "div[data-animation='thirdp-animated']"
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
.thirdp {
  background-position-y: -200vh;
}

.thirdp-sky {
  background-image: url('../assets/thirdp/sky.png');
}

$BACKGROUND_SIZE = 90vw 51vh;

.thirdp-words {
  position: relative;
  margin-left: 9vw;
  width: 90vw;
  height: 51vh;
  background-size: $BACKGROUND_SIZE;

  & .words-bg {
    width: 100%;
    height: 5vh;
    background-image: url('../assets/thirdp/words.png');
    background-size: inherit;
    background-repeat: no-repeat;
    position: absolute;
    overflow: hidden;
  }

  & .words-1 {
    top: 24%;
    background-position-y: 27%;
  }

  & .words-2 {
    top: 41%;
    background-position-y: 45%;
  }

  & .words-3 {
    top: 58%;
    background-position-y: 64%;
  }

  & .words-4 {
    height: 8vh;
    top: 75%;
    background-position-y: 89%;
  }

  & .corner-stars {
    height: 9vh;
    right: 0;
    top: 3vh;
    background-position-y: -3vh;
  }
}

.thirdp-man {
  position: absolute;
  left: 8vw;
  bottom: 0;
  height: 61vh;
  width: 92vw;
  background-size: 92vw 64vh;
}
</style>


