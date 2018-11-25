<template>
  <div>
    <div class="marquee-message" id="marquee-message">
      <div class="temp-wrap" ref="tempWrap">
        <ul class="temp-slides">
          <slot></slot>
        </ul>
      </div>
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
      return {}
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
        let $marqueeMessage = document.querySelector('#marquee-message')
        let $tempWrap = $marqueeMessage.querySelector('.temp-wrap')

        // 如果 DOM 发生变化，重新初始化的时候，删除 clone DOM
        let $tempSlidesClone = $tempWrap.querySelector('.temp-slides-clone')
        if ($tempSlidesClone) {
          $tempSlidesClone.parentNode.removeChild($tempSlidesClone)
        }

        // 克隆一个 tempSlides 并添加到 temp-wrap
        let $tempSlides = $tempWrap.querySelector('.temp-slides')
        $tempSlidesClone = $tempSlides.cloneNode(true)
        $tempSlidesClone.className = 'temp-slides-clone'
        $tempWrap.appendChild($tempSlidesClone)

        // 开始滚动
        let duration = $tempSlides.offsetWidth / this.speed
        document.querySelector('.temp-wrap').style.animationDuration = `${duration}s`
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
    .temp-wrap {
      display: flex;
      white-space: nowrap;
      animation: roll linear infinite;
    }
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
      transform: translate3d(0, 0, 0)
    }
    100% {
      transform: translate3d(-50%, 0, 0)
    }
  }
</style>

