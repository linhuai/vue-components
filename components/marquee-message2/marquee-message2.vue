<template>
  <div id="roll-message" class="roll-message">
    <ul class="temp-wrap">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'marquee-message2',
    data () {
      return {
        activeIndex: 0,
        slideLength: 0,
        hasObserve: false,
        timer: ''
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.init()
        this.observe()
      })
    },
    updated () {
      this.init()
    },
    methods: {
      init () {
        if (this.timers) {
          clearInterval(this.timers)
        }
        this.activeIndex = 0
        
        let $rollMessage = document.querySelector('#roll-message')
        let $tempWrap = $rollMessage.querySelector('.temp-wrap')
        $tempWrap.style.cssText = ''

        this.slideLength = $tempWrap.children.length

        // 克隆 temp-wrap 第一个子元素，并添加到末尾
        let $firstChild = $tempWrap.firstChild.cloneNode(true)
        $tempWrap.appendChild($firstChild)

        // 开始滚动
        this.timer = setInterval(() => {
          if (this.activeIndex <= this.slideLength) {
            let cssText = `transition: transform .4s ease; transform: translate3d(0, -${this.activeIndex * 0.6}rem, 0);`
            $tempWrap.style.cssText = cssText
            this.activeIndex ++
          } else {
            $tempWrap.style.cssText = ''
            this.activeIndex = 0
          }
        }, 3000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .roll-message {
    width: 100%;
    height: .6rem;
    margin: 1rem 0;
    overflow: hidden;
    line-height: .6rem;
    background: #666;
    color: #fff;
  }
</style>
