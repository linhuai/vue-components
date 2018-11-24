<template>
  <div>
    <div class="marquee-message" id="marquee-message" ref="marqueeMessage">
      <ul ref="tempSlides">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'marquee-message',
    props: {
      speed: {
        type: Number,
        default: 200
      }
    },
    data () {
      return {
        marquee: '',
        tempWrapWidth: 0
      }
    },
    mounted () {
      console.log('mounted')
      this.$nextTick(() => {
        this.init()
      })
    },
    updated () {
      this.init()
    },
    methods: {
      init () {
        if (document.querySelector('.temp-wrap')) {
          document.querySelector('.temp-wrap').parentNode.removeChild(document.querySelector('.temp-wrap'))
        }
        let tempSlides = this.$refs.tempSlides
        tempSlides.className = 'temp-slides'

        // 克隆一个 tempSlides
        let tempSlidesClone = tempSlides.cloneNode(true)
        tempSlidesClone.className = 'temp-slides-clone'

        let tempWrap = document.createElement('div')
        tempWrap.className = 'temp-wrap'

        tempWrap.appendChild(tempSlides)
        tempWrap.appendChild(tempSlidesClone)

        let marqueeMessage = this.$refs.marqueeMessage
        marqueeMessage.appendChild(tempWrap)
        let duration = document.querySelector('.temp-wrap').offsetWidth / this.speed
        document.querySelector('.temp-wrap').style.cssText = `animation: roll ${duration}s linear infinite; display: flex; white-space: nowrap;`
      }
    }
  }
</script>

<style lang="scss" scoped>
  .marquee-message {
    display: flex;
    width: 5rem;
    height: 1rem;
    line-height: 1rem;
    white-space: nowrap;
    overflow: hidden;
    background: #333;
    color: #fff;
    margin: 0 auto;
    // .temp-wrap {
    //   display: flex;
    //   white-space: nowrap;
    //   animation: roll 10s linear infinite;
    // }
    .temp-slides, .temp-slides-clone {
      display: flex;
      white-space: nowrap;
    }
    li {
      padding: 0 .1rem;
    }
  }
  @keyframes roll {
    0% {
      transform: translate(0)
    }
    100% {
      transform: translate(-50%)
    }
  }
</style>

