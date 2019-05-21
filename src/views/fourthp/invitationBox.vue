<template>
  <div
    class="invitation-box"
    :class="{
      'submit-res-loading-step1': submitStatus.animating,
      'submit-req-finished': submitStatus.finished,
      'focus-input': isFocusInput
    }"
    v-show="!submitStatus.onLoading"
  >
    <transition leave-active-class="animated fadeOut fast">
      <div class="invitation-container" v-show="!submitData.pending.on">
        <form enctype="multipart/form-data" :id="formID" autocomplete="off">
          <div class="invitation-items">
            <div
              class="invitation-item"
              :class="{ 'invi-item-hidden': !canItemShowDataArrar[index] }"
              v-for="(item, index) in invitationItems"
              :key="index"
            >
              <label>{{ item.label }}</label>
              <input
                :id="item.input.id"
                :name="item.input.name"
                :type="item.input.type"
                v-model="item.bindVal"
                @change="inputChangeHandler(index)"
              />
            </div>
          </div>
          <div class="bookroom">
            <div class="bookroom-title">是否需要订房留夜</div>
            <div class="bookroom-select">
              <div
                class="bookroom-select-need"
                @click.capture.prevent="
                  () => {
                    selectStatus.need.isSelect = true;
                    selectStatus.nneed.isSelect = false;
                  }
                "
              >
                <span
                  class="bookroom-btn"
                  :class="{ 'select-active-btn': selectStatus.need.isSelect }"
                ></span>
                <p
                  :class="{ 'select-active-text': selectStatus.need.isSelect }"
                >
                  需要
                </p>
              </div>
              <div
                class="bookroom-select-nneed"
                @click.capture.prevent="
                  () => {
                    selectStatus.nneed.isSelect = true;
                    selectStatus.need.isSelect = false;
                  }
                "
              >
                <span
                  class="bookroom-btn"
                  :class="{ 'select-active-btn': selectStatus.nneed.isSelect }"
                ></span>
                <p
                  :class="{ 'select-active-text': selectStatus.nneed.isSelect }"
                >
                  不需要
                </p>
              </div>
            </div>
          </div>
          <div class="invitation-submit" @click.capture.prevent="onsubmit">
            不见不散！
          </div>
        </form>
      </div>
    </transition>
    <div class="submit-result" :class="{ 'submit-result-on': submitResult.on }">
      <p>{{ submitResult.text }}</p>
    </div>
  </div>
</template>
<script>
//mobile
export default {
  name: 'invitationBox',
  data() {
    return {
      isFocusInput: false,
      formID: 'invitation-form',
      selectStatus: {
        need: {
          val: 'yes',
          isSelect: false
        },
        nneed: {
          val: 'no',
          isSelect: true
        }
      },
      profile: {
        name: '',
        telNum: undefined,
        wechatID: ''
      },
      invitationItems: [
        {
          label: '姓名',
          input: { id: 'name', type: 'text', name: 'name' },
          bindVal: ''
        },
        {
          label: '微信号',
          input: { id: 'wechat-ID', type: 'text', name: 'wechat' },
          bindVal: ''
        },
        {
          label: '手机号',
          input: { id: 'tel-num', type: 'text', name: 'phone' },
          bindVal: undefined
        }
      ],
      submitData: {
        pending: {
          on: false
        },
        success: {
          clName: 'submit-req-success',
          on: false
        },
        failure: {
          clName: 'submit-req-failure',
          on: false
        },
        loading: {
          step1: 'submit-res-loading-step1',
          step2: 'submit-res-loading-step2',
          on: false,
          el: null
        },
        finished: {
          clName: 'submit-req-finished'
        }
      },
      submitStatus: {
        finished: false,
        animating: false,
        onLoading: false
      },
      submitResult: {
        on: false,
        text: ''
      },
      resizeData: {
        originHeight: window.innerHeight,
        originWidth: window.innerWidth,
        currentHeight: 0,
        currentWidth: 0
      },
      canItemShowDataArrar: [true, false, true]
    };
  },
  computed: {
    canWechatInputShow() {
      return this.selectStatus.need.isSelect;
    },
    isSelect() {
      return this.selectStatus.need.isSelect
        ? this.selectStatus.need.val
        : this.selectStatus.nneed.val;
    }
  },
  watch: {
    canWechatInputShow() {
      //1为wechat在invitationitems数组里的索引，用计算出来更好
      this.canItemShowDataArrar[1] = this.canWechatInputShow;
    }
  },
  methods: {
    mobileKeyboardAppearsHandler() {
      this.isFocusInput = true;
    },
    mobileKeyboardDisappearsHandler() {
      this.isFocusInput = false;
    },
    toast({ text = '', duration = 0 }) {
      const sr = this.submitResult;
      sr.text = text;
      sr.on = true;
      //延时关闭提示框
      setTimeout(() => {
        sr.on = false;
      }, duration);
    },
    submitCallback(status = '', inBox = {}) {
      const sd = this.submitData;
      const st = this.submitStatus;

      const loadingTarget = sd.loading.el;
      const duration = 2500;
      const inBoxHandler = () => {
        switch (status) {
          case 'success':
            sd.success.on = true;
            this.toast({ text: '提交成功！', duration });
            break;
          case 'failure':
            sd.failure.on = true;
            this.toast({ text: '提交失败！', duration });
            break;
        }
      };
      const animationEndHandler = () => {
        loadingTarget.classList.remove(sd.loading.step2);
        //重新出现提交框
        inBox.addEventListener(this.$animationEnd, inBoxHandler, {
          capture: true,
          once: true
        });
        st.animating = false;
        st.finished = true;

        st.onLoading = false;
      };
      loadingTarget.addEventListener(this.$animationEnd, animationEndHandler, {
        capture: true,
        once: true
      });
      //如果animation为infinite的话，不会触发animationend
      //故在此改成1次
      loadingTarget.classList.add('animation-once');
      loadingTarget.classList.remove('animation-infinite');
      sd.loading.on = false;
      sd.pending.on = false;
    },
    submitLoading(target = null) {
      const sd = this.submitData;
      const st = this.submitStatus;
      const loading = sd.loading.el || document.createElement('div');
      const animationEndHandler = () => {
        const br = target.getBoundingClientRect();
        console.log(br);
        //24为loading div的一半
        loading.classList.add(sd.loading.step2);
        loading.style.top = br.top - 24 + 'px';
        loading.style.left = br.left - 24 + 'px';
        st.onLoading = true;
      };

      if (!sd.loading.el) {
        sd.loading.el = loading;
        loading.classList.add('submit-loading');
        document.body.appendChild(loading);
      }

      loading.classList.add('animation-infinite');
      loading.classList.remove('animation-once');
      //第一阶段登陆框动画尺寸缩小
      st.finished = false;
      st.animating = true;
      //第一阶段动画结束后，开始第二阶段loading动画
      target.addEventListener(this.$animationEnd, animationEndHandler, {
        capture: true,
        once: true
      });
      sd.loading.on = true;
      sd.pending.on = true;
    },
    checkFormDataHasEmpty(arr = []) {
      const length = arr.length;
      for (let i = 0; i < length; i++) {
        if (!arr[i]) {
          return i;
        }
      }
      return -1;
    },
    checkFormDataIsLegal(arr = [], rules = ['name', 'wechat', 'phone']) {
      const length = arr.length;
      const DEFAULT_RULES = {
        //四个汉字
        name: new RegExp(/^[\u4e00-\u9fa5]{2,4}$/),
        wechat: new RegExp(/\S/),
        phone: new RegExp(
          /^(10[0-9]|13[0-9]|14[1456789]|15[0-3,5-9]|16[6]|17[01235678]|18[0-9]|19[89])\d{8}$/
        )
      };

      for (let i = 0; i < length; i++) {
        if (!DEFAULT_RULES[rules[i]].test(arr[i])) {
          return i;
        }
      }
      return -1;
    },
    beforeSubmitHandler() {
      let detectedData = [];
      for (let i of this.invitationItems) {
        detectedData.push(i.bindVal);
      }

      //check empty vals
      const emptyVal = this.checkFormDataHasEmpty(detectedData);
      emptyVal !== -1 &&
        this.toast({
          text: this.invitationItems[emptyVal].label + '不能为空',
          duration: 1500
        });
      //check rule vals
      const illegalVal =
        emptyVal === -1 ? this.checkFormDataIsLegal(detectedData) : -1;

      illegalVal !== -1 &&
        this.toast({
          text: this.invitationItems[illegalVal].label + '不符合规范',
          duration: 1500
        });
      return emptyVal === -1 && illegalVal === -1 ? true : false;
    },
    submit() {
      const url = '/store';
      const profile = this.profile;
      //获得动画过渡元素
      const target = this.$el;
      const form = document.getElementById(this.formID);
      const formData = new FormData(form);
      formData.append('isroom', this.isSelect);
      /*Check the phone numbers here*/
      this.submitLoading(target);
      this.$http
        .post(url, formData)
        .then(res => {
          const data = res.data;
          if (data.status === 200) {
            this.submitCallback('success', target);
          } else if (data.status === 403) {
            this.submitCallback('failure', target);
          }
        })
        .catch(err => {
          this.submitCallback('failure', target);
        });
    },
    onsubmit() {
      const isCheckOk = this.beforeSubmitHandler();
      isCheckOk && this.submit();
    },
    inputChangeHandler() {},
    resizeHandler() {
      const curH = window.innerHeight;
      const curW = window.innerWidth;
      // const scaleH = this.resizeData.originHeight / curH;
      // const scaleW = this.resizeData.originWidth / curW;
      // document.body.style.transform = `scale(${scaleW},${scaleH})`;
      this.isFocusInput = !this.isFocusInput;
      if (curH !== window.innerHeight && curW !== window.innerWidth) {
        this.changeRemSize();
      }
    },
    changeRemSize() {
      const DESIGN_WIDTH = 375;
      const DESIGN_HEIGHT = 667;
      const DESIGN_DEFAULT_FONT_SIZE = 16;
      const ratio = this.resizeData.originHeight / DESIGN_HEIGHT;
      //改变根的字体大小 html.style.fontSize
      //默认为16
      if (ratio <= 1) {
        document.documentElement.style.fontSize =
          DESIGN_DEFAULT_FONT_SIZE * ratio + 'px';
      }
    }
  },
  mounted() {
    const VH = 66;
    const ratio = 66 * 0.01;
    this.changeRemSize();
    this.$el.style.minHeight = window.visualViewport.height * ratio + 'px';
    window.addEventListener('resize', this.resizeHandler);
  }
};
</script>

<style lang="stylus">
* {
  font-family: 'wyxqnt';
}

.animation-once {
  animation-iteration-count: 1;
}

.animation-infinite {
  animation-iteration-count: infinite;
}

.submit-req-finished {
  animation: srf-animation 1s 1;
}

@keyframes srf-animation {
  from {
    transform: scale(0, 0);
  }

  to {
    transform: scale(1, 1);
  }
}

.submit-loading {
  position: absolute;
  width: 48px;
  height: 48px;
  text-align: center;
  line-height: 48px;
  font-size: 0.75rem;
  border-radius: 100%;
  border: 2px dotted;
  display: none;
}

.submit-result {
  text-align: center;
  border-radius: 10px;
  left: 0;
  top: 0;
  color: #fff;
  position: absolute;
  width: 100%;
  height: 70px;
  background-color: rgba(0, 0, 0, 1);
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  z-index: -1;
  -webkit-transform: translateY(0px);
  transform: translateY(0px);
  opacity: 0;
  line-height: 35px;
  box-shadow: 2px 3px 4px #aaa;
}

.submit-result-on {
  transform: translateY(50px);
  opacity: 1;
  z-index: 1;
}

.submit-res-loading-step1 {
  animation: srl1-animation 0.5s 1;
  animation-fill-mode: forwards;
}

@keyframes srl1-animation {
  0% {
    border-radius: 0;
    transform: scale(1, 1);
  }

  100% {
    border-radius: 25px;
    transform: scale(0, 0);
  }
}

.submit-res-loading-step2 {
  display: block;
  animation-name: srl2-animation;
  animation-duration: 2s;
  animation-fill-mode: forwards;
}

@keyframes srl2-animation {
  0% {
    transform: scale(0, 0);
    border-color: hsla(231, 95%, 7%, 1);
    background-image: -webkit-radial-gradient(center, ellipse cover, hsla(231, 95%, 7%, 1) 20%, hsla(211, 95%, 49%, 1) 35%, hsla(173, 95%, 45%, 1) 54%, hsla(56, 100%, 75%, 1) 65%);
    // background-image: -webkit-radial-gradient(center, ellipse cover, hsla(231, 95%, 7%, 1) 14%, hsla(173, 95%, 45%, 1) 25%, hsla(211, 95%, 49%, 1) 54%, hsla(56, 100%, 75%, 1) 73%);
  }

  50% {
    transform: scale(1, 1);
    border-color: hsla(56, 100%, 75%, 1);
  }

  100% {
    transform: scale(0, 0);
    background-image: -webkit-radial-gradient(center, ellipse cover, hsla(231, 95%, 7%, 1) 20%, hsla(211, 95%, 49%, 1) 35%, hsla(173, 95%, 45%, 1) 54%, hsla(56, 100%, 75%, 1) 65%);
    // background-image: -webkit-radial-gradient(center, ellipse cover, hsla(231, 95%, 7%, 1) 14%, hsla(173, 95%, 45%, 1) 25%, hsla(211, 95%, 49%, 1) 54%, hsla(56, 100%, 75%, 1) 73%);
    border-color: hsla(173, 95%, 45%, 1);
  }
}

.invitation-items {
  display: flex;
  flex-direction: column;

  :nth-child(1) {
    & label {
      margin: 0;
    }
  }

  :nth-child(2) {
    & label {
      margin-left: 0;
    }
  }

  :nth-child(3) {
    & label {
      margin-left: 0;
    }
  }
}

.invitation-item {
  position: relative;
  text-align: left;
  margin-bottom: 4.3%;
  padding: 4.3% 0;
  color: #000;
  transition: all 0.5s ease-in-out;

  & label {
    font-size: 1.125rem;
    margin: 0;
  }

  & input {
    box-sizing: border-box;
    width: 57vw;
    padding: 0;
    margin-left: 5vw;
    border: none;
    border-bottom: 2px solid #000;
    padding-left: 12vw;
    outline: none;
    position: absolute;
    top: 25%;
    left: -1vw;
    background-color: transparent;
    height: 65%;
    font-size: 1.375rem;
  }
}

.invitation-box {
  position: relative;
  padding: 10% 11vw 7% 9vw;
  margin: 28vh auto 0 auto;
  width: 87vw;
  height: 66vh;
  box-sizing: border-box;
  background-color: #ffffff;
  box-shadow: 0vh 0vh 4vh 0vh rgba(11, 3, 6, 0.58);
  border-radius: 18px;
  transition: transform 0.5s linear;
  max-width: 420px;
}

.bookroom {
  color: #000;
  text-align: left;

  :nth-child(1) {
    font-size: 1.125rem;
  }

  :nth-child(2) {
    font-size: 1.5rem;
  }
}

.bookroom-btn {
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: #000;
  border-radius: 100%;
  margin-right: 8px;
}

.bookroom-select {
  position: relative;
  margin: 5% auto auto;
  width: 80%;
  overflow: hidden;

  :nth-child(1), :nth-child(2) {
    display: flex;
    align-items: center;
    transition: all 0.3s ease-in-out;
  }

  p {
    margin: 0;
    transition: color 0.6s linear;
  }

  & .bookroom-select-need {
    float: left;
  }

  & .bookroom-select-nneed {
    float: right;
  }

  ::after {
    content: '';
    clear: both;
  }
}

.invitation-submit {
  width: 43vw;
  /* height: 10%; */
  position: relative;
  margin: 0 auto;
  background-color: #091446;
  border-radius: 12px;
  margin-top: 14%;
  padding: 4% 0;
  color: #fff;
  /* line-height: 100%; */
  font-size: 1.5rem;
}

.select-active-btn {
  // transform: translateY(1vh);
  animation: confirmWave 0.6s;
  animation-fill-mode: forwards;
}

@keyframes confirmWave {
  0% {
    background-color: #000;
    transform: translateY(0);
  }

  25% {
    transform: translateY(-5px);
  }

  75% {
    transform: translateY(5px);
  }

  100% {
    background-color: #fbe024;
    transform: translateY(0);
  }
}

.select-active-text {
  color: #fbe024;
}

.invitation-submit:focus {
  background-color: #000;
}

.focus-input {
  margin-top: 0vh;
}

input:-internal-autofill-selected {
  background-color: transparent !important;
}

.invi-item-hidden {
  margin-top: -50px;
  opacity: 0;
}
</style>


