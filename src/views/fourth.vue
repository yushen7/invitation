<template>
  <transition name="fadeIn" :enter-active-class="oTarget.bg.clName">
    <div
      class="fourthp normal"
      data-animation="fourthp-animated"
      data-id="bg"
      v-show="oTarget.bg.show"
    >
      <transition :enter-active-class="oTarget.fourthpDate.clName">
        <div
          data-id="fourthpDate"
          data-animation="fourthp-animated-banned"
          v-show="oTarget.bg.show"
          class="fourthp-date"
        >
          六月一号<br />
          18:00
        </div>
      </transition>
      <transition :enter-active-class="oTarget.inviBox.clName">
        <InvitationBox
          data-id="inviBox"
          data-animation="fourthp-animated"
          v-show="oTarget.inviBox.show"
        />
      </transition>
    </div>
  </transition>
</template>

<script>
import InvitationBox from './fourthp/invitationBox.vue';
export default {
  name: 'fourthp',
  data() {
    return {
      oTarget: {
        inviBox: {
          id: 'inviBox',
          show: false,
          clName: 'animated lightSpeedIn'
        },
        fourthpDate: {
          id: 'fourthpDate',
          show: false,
          clName: 'animated fadeInDown'
        },
        bg: {
          id: 'bg',
          show: false,
          clName: 'animated fadeIn'
        }
      }
    };
  },
  mounted() {
    const animationTargets = document.querySelectorAll(
      "div[data-animation='fourthp-animated']"
    );
    this.$animations({
      els: animationTargets,
      targetsData: this.oTarget,
      event: this.$animationEnd
    });
  },
  components: {
    InvitationBox
  }
};
</script>

<style lang="stylus" scoped>
.fourthp-date {
  position: absolute;
  width: 100%;
  top: 1.5rem;
  color: #ffffff;
  font-size: 2.5rem;
}

.fourthp {
  background-position-y: -300%;
}
</style>


