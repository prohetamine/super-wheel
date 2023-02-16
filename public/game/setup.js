const root                          = document.querySelector('#root')
    , wrapperCanvas                 = document.querySelector('.wrapper-canvas')
    , wrapperMiniCanvas             = document.querySelector('.wrapper-mini-canvas')
    , wrapperMiniImgCanvas          = document.querySelector('img.mini-label')
    , wrapperMiniImgShadowCanvas    = document.querySelector('img.mini-shadow')
    , wrapperMiniTextCanvas         = document.querySelector('.wrapper-mini-canvas > div')
    , canvas                        = document.querySelector('canvas.main')
    , canvasMini                    = document.querySelector('canvas.mini')
    , time                          = document.querySelector('canvas.time')
    , spinnerName                   = document.querySelector('.spinner-name')
    , finderWrapper                 = document.querySelector('.finder-wrapper')
    , finder                        = document.querySelector('.finder')
    , timeText                      = document.querySelector('.time-text')
    , arrow                         = document.querySelector('.arrow')

let itemsLeft       = [...document.querySelectorAll('.item-left')]
  , itemsRight      = [...document.querySelectorAll('.item-right')]

const setup = (prizes, str = () => '') => {
  const _prizes = prizes.map(prize => [prize, Math.random()]).sort((a, b) => a[1] - b[1]).map(prize => prize[0])

  itemsLeft.forEach((node, i) => {
    node.innerHTML = `${str(i)} ${_prizes[i]}<div></div>`
  })

  itemsRight.forEach((node, i) => {
    node.innerHTML = `<div></div>${_prizes[i+12]} ${str(i+12)}`
  })

  itemsLeft.forEach((item) => {
    const { width } = item.getBoundingClientRect()
    item.style.left = (parseInt(item.style.left) - width + 60 + 10) + 'px'
    item.style.width = (width + 130) + 'px'
  })

  itemsRight.forEach(item => {
    const { width } = item.getBoundingClientRect()
    item.style.right = (parseInt(item.style.right) - width + 60 + 10) + 'px'
    item.style.width = (width + 130) + 'px'
  })

  window.prizes = [...itemsLeft, ...itemsRight].map(item => {
    const itemPosition = item.querySelector('div').getBoundingClientRect()
    return {
      x: Math.average(itemPosition.x),
      y: Math.average(itemPosition.y),
      node: item
    }
  })
}
