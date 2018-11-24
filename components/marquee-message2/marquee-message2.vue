<template>
  <div ref="marqueeMessage2" class="marquee-message">
    <ul class="temp-wrap2" ref="tempWrap2">
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
        timer: ''
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.init()
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
        
        let tempWrap = this.$refs.tempWrap2
        tempWrap.style.cssText = ''

        let childs = tempWrap.children
        this.slideLength = childs.length

        let firstChild = childs[0].cloneNode(true)
        tempWrap.appendChild(firstChild)

        this.timer = setInterval(() => {
          if (this.activeIndex <= this.slideLength) {
            tempWrap.style.cssText = `transform: translateY(-${this.activeIndex * 0.6}rem); transition: transform .4s ease`
            this.activeIndex ++
          } else {
            tempWrap.style.cssText = ''
            this.activeIndex = 0
          }
        }, 3000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .marquee-message {
    width: 100%;
    height: .6rem;
    margin: 1rem 0;
    overflow: hidden;
    line-height: .6rem;
    background: #666;
    color: #fff;
  }
</style>
