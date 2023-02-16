const drawSigments = (canvas, users, size, kingIcon) => {
  const ctx = canvas.getContext('2d')

  canvas.width = size
  canvas.height = size

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const x = canvas.width / 2
      , y = canvas.height / 2

  const radiusColor = canvas.height / 2
      , radiusText = radiusColor - 30

  users = users.sort((b, a) => a.tokens - b.tokens).slice(0, 19)

  let max100 = users.reduce((ctx, elem) => ctx + elem.tokens, 0)

  users = users.map(user => ({ ...user, procent: user.tokens / max100 }))

  max100 = users.reduce((ctx, elem) => ctx + elem.tokens, 0)

  users = users.map(user => ({ ...user, procent: user.tokens / max100 })).filter(e => e.procent > 0.05)

  max100 = users.reduce((ctx, elem) => ctx + elem.tokens, 0)

  users = users.map(elem => [elem, Math.random()]).sort((a, b) => a[1] - b[1]).map(e => e[0])

  users = users
            .map(
              user => ({
                ...user,
                procent: user.tokens / max100,
                username: user.username,
                drawUsername: (username => username.length > 10 ? username.slice(0, 10) + '...' : username)(user.username),
                tokens: user.tokens,
                drawTokens: user.tokens + ' tip'
              })
            )

  const king = users.sort((b, a) => a.tokens - b.tokens)[0].username

  const count = users.length

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

    if (users[i].username == king) {
      ctx.save()
      ctx.clip()
      ctx.rotate(0.1)
      for (let x = -645; x < 645; x += 45) {
        for (let y = -645; y < 645; y += 45) {
          ctx.translate(x, y)
          ctx.rotate((Math.PI / 2))

          ctx.globalAlpha = (Math.random() * 0.1) + 0.3
          ctx.drawImage(kingIcon, -7.5, -7.5, 15, 15)

          ctx.rotate(-(Math.PI / 2))
          ctx.translate(-x, -y)
        }
      }
      ctx.restore()
    }

    ctx.beginPath()
    ctx.moveTo(x, y)

    const textPositin = ctx._arc(x, y, radiusText, start, start + pieAngle2, false)

    ctx.strokeStyle = 'rgba(0, 0, 0, 0)'
    ctx.stroke()

    const textX = Math.average(textPositin.x2)
    const textY = Math.average(textPositin.y2)

    const rad = Math.atan2(y-textPositin.y2, x-textPositin.x2)

    ctx.translate(textX, textY)
    ctx.rotate(rad)

    ctx.fillStyle = 'white'
    ctx.font = 'bold 17px Arial'
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
    ctx.shadowBlur = 5
    ctx.lineWidth = 1

    const usernameTextWidth = determineWidth(ctx, users[i].drawUsername, ctx.font) / 2

    ctx.fillText(users[i].drawUsername, 0, 0)

    ctx.font = 'bold 15px Arial'

    const tokensTextWidth = determineWidth(ctx, users[i].drawTokens, ctx.font) / 2

    ctx.fillText(users[i].drawTokens, usernameTextWidth - tokensTextWidth, 0 + 20)

    if (users[i].username == king) {
      ctx.drawImage(kingIcon, usernameTextWidth - 16.5, -43, 33, 22)
    }

    ctx.shadowColor = 'rgba(0, 0, 0, 0)'
    ctx.shadowBlur = 0
    ctx.lineWidth = 0

    ctx.rotate(-rad)
    ctx.translate(-textX, -textY)

    start += pieAngle2
  }

  return [ctx, users]
}
