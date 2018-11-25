function Marquee (el, options = {}) {
  this.wrapper = typeof el === 'string' ? document.querySelector(el) : el
  this.slideLength = 0            // 滚动元素的长度
  this.limitArr = []
  const DEFAULT_OPTIONS = {
    dirction: 'horizontal', // 水平(horizontal)或垂直(vertical)
    activeIndex: 0,        // 当前索引
    speed: 500                // 每秒移动的距离
  }
  this.options = Object.assign({}, DEFAULT_OPTIONS, options)
  this._init()
}

Marquee.prototype._init = function () {
  this._calculateLimit()
  this._clone()
  this._start()
}
Marquee.prototype._start = function () {
  setTimeout(() => {
    let tempWidth = this.limitArr[this.limitArr.length - 1]
    let tempWrap = this.wrapper.querySelector('.temp-wrap')
    tempWrap.style.cssText = `transform: translate(-50%); width: ${tempWidth * 2}px; display: flex; white-space: nowrap;`
    let duration = Math.round(tempWidth / this.options.speed)
    tempWrap.style.transition = `transform ${duration}s linear`

    let index = 0
    tempWrap.addEventListener('transitionend', () => {
      tempWrap.style.transform = `translate(-100%)`
      tempWrap.appendChild(tempWrap.children[index])
      if (index === 0) {
        index = 1
      } else {
        index = 0
      }
    })

    // tempWrap.addEventListener('transitionend', () => {
    //   tempWrap.style.transform = `translate(0)`
    //   tempWrap.style.transition = `none`
    //   setTimeout(() => {
    //     tempWrap.style.cssText = `transform: translate(-50%); width: ${tempWidth * 2}px; display: flex; white-space: nowrap;`
    //     tempWrap.style.transition = `transform ${duration}s linear`
    //   }, 0)
    // })
  }, 200)
}
Marquee.prototype._clone = function () {
  // let { dirction } = this.options
  let children = Array.from(this.wrapper.children)

  let tempSlideWrap = document.createElement('div')
  tempSlideWrap.className = 'temp-slide'
  tempSlideWrap.style.cssText = 'display: flex; white-space: nowrap'

  children.forEach(child => {
    tempSlideWrap.appendChild(child)
  })

  let tempSlideWrapClone = tempSlideWrap.cloneNode(true)
  tempSlideWrapClone.className = 'temp-slide-clone'

  let tempWrap = document.createElement('div')
  tempWrap.className = 'temp-wrap'
  tempWrap.appendChild(tempSlideWrap)
  tempWrap.appendChild(tempSlideWrapClone)
  this.wrapper.appendChild(tempWrap)
  // if (dirction === 'horizontal') {

  // } else {
  //   debugger
  //   let cloneChild = children[0].cloneNode(true)
  //   console.log(cloneChild)
  //   this.wrapper.appendChild(cloneChild)
  // }
}

Marquee.prototype._calculateLimit = function () {
  let childList = this.wrapper.children
  let limit = 0
  this.limitArr.push(limit)
  Array.from(childList).forEach(child => {
    limit += child.offsetWidth
    this.limitArr.push(limit)
  })
}
export default Marquee
