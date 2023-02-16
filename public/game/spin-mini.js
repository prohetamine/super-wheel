const spinMini = ({ users, remains }) => {
  const ctx = canvasMini.getContext('2d')

  canvasMini.width = 130
  canvasMini.height = 130

  ctx.clearRect(0, 0, canvasMini.width, canvasMini.height)

  const x = canvasMini.width / 2
      , y = canvasMini.height / 2

  const radiusColor = canvasMini.height / 2
      , radiusText = radiusColor - 30

  let max100 = users.reduce((ctx, elem) => ctx + elem.tokens, 0)

  users = users.sort((b, a) => a.tokens - b.tokens).slice(0, 19)

  const count = users.length

  wrapperMiniTextCanvas.innerText = 800 - remains

  if (count === 0) {
    canvasMini.style.opacity = 0
    wrapperMiniCanvas.style.opacity = 0
    wrapperMiniTextCanvas.style.opacity = 0
    wrapperMiniImgCanvas.style.opacity = 0
    wrapperMiniImgShadowCanvas.style.opacity = 0
  } else {
    canvasMini.style.opacity = 1
    wrapperMiniCanvas.style.opacity = 1
    wrapperMiniTextCanvas.style.opacity = 1
    wrapperMiniImgCanvas.style.opacity = 1
    wrapperMiniImgShadowCanvas.style.opacity = 1
  }

  let start = 0

  for (let i = 0; i < count; i++) {
    ctx.beginPath()
    ctx.moveTo(x, y)
    const pieAngle2 = (2 * Math.PI / count) * (count * (users[i].procent))

    ctx.arc(x, y, radiusColor, start, start + pieAngle2, false)

    let hueValue = parseInt(i * 45 + (Math.random() * 10))
    ctx.fillStyle = `hsl(${hueValue}, 50%, 50%)`
    users[i].color = hslToHex(hueValue, 50, 50)
    ctx.fill()
    ctx.lineWidth = 1
    if (count > 1) {
      ctx.strokeStyle = '#333'
      ctx.stroke()
    }

    ctx.beginPath()
    ctx.moveTo(x, y)

    const textPositin = ctx._arc(x, y, radiusText, start, start + pieAngle2, false)

    ctx.strokeStyle = 'rgba(0, 0, 0, 0)'
    ctx.stroke()

    const textX = Math.average(textPositin.x2)
    const textY = Math.average(textPositin.y2)

    const rad = Math.atan2(y-textPositin.y2, x-textPositin.x2)

    start += pieAngle2
  }
}
