const spin = ({
  users,
  spennerUser
}) => new Promise(async res => {
  time.width = 288
  time.height = 288

  const ctxTime = time.getContext('2d')

  const kingIcon = await loadImage('king.svg')
      , spin1 = await loadAudio('spin1.mp3')
      , spin2 = await loadAudio('spin2.mp3')

  canvas.style.transform = 'rotate(900deg)'
  canvas.style.transition = '0s'

  prizes.forEach(prize => {
    prize.node.style.background = 'rgba(0,0,0,0)'
    prize.node.style.boxShadow = '0px 0px 0px rgba(0, 0, 0, 0)'
    prize.node.style.textShadow = `0px 0px 5px rgba(0, 0, 0, 0)`
  })

  spinnerName.innerText = spennerUser.toUpperCase()
  const [ctx, finalUsers] = drawSigments(canvas, users, 637, kingIcon)
  const timeSpin = (Math.random() * 3000) + 2000

  wrapperCanvas.style.opacity = 1
  wrapperMiniCanvas.style.opacity = 0
  wrapperMiniTextCanvas.style.opacity = 0
  wrapperMiniImgCanvas.style.opacity = 0
  wrapperMiniImgShadowCanvas.style.opacity = 0

  spin1.playbackRate = 0.4
  spin1.play()

  ctxTime.clearRect(0, 0, 288, 288)

  ctxTime.translate((288 / 2), (288 / 2))
  ctxTime.rotate(-(Math.PI / 2) - 0.07)

  ctxTime.strokeStyle = '#363636'
  ctxTime.beginPath()
  ctxTime.setLineDash([18, 7])
  ctxTime.lineWidth = 4
  ctxTime.beginPath()
  ctxTime.arc(0, 0, (288 / 2) - 4, 0, Math.PI * 2)
  ctxTime.stroke()

  ctxTime.rotate(-(-(Math.PI / 2) - 0.07))
  ctxTime.translate(-(288 / 2), -(288 / 2))

  canvas.style.transform = 'rotate(0deg)'
  canvas.style.transition = '3s'

  finderWrapper.style.transition = `transform 0s linear`
  finderWrapper.style.transform = `rotate(0deg)`

  setTimeout(() => {
    ctxTime.clearRect(0, 0, 288, 288)

    ctxTime.translate((288 / 2), (288 / 2))
    ctxTime.rotate(-(Math.PI / 2) - 0.07)

    ctxTime.strokeStyle = '#363636'
    ctxTime.beginPath()
    ctxTime.setLineDash([18, 7])
    ctxTime.lineWidth = 4
    ctxTime.beginPath()
    ctxTime.arc(0, 0, (288 / 2) - 4, 0, Math.PI * 2)
    ctxTime.stroke()

    ctxTime.rotate(-(-(Math.PI / 2) - 0.07))
    ctxTime.translate(-(288 / 2), -(288 / 2))

    let winnerData = false

    const findWinner = () => {
      finderWrapper.style.transition = `transform 30s linear`
      finderWrapper.style.transform = `rotate(${parseInt(Math.random() * 100) + 5000}deg)`

      arrow.style.opacity = 1
      const intervalFindWinnerId = setInterval(() => {
        const canvasPosition = canvas.getBoundingClientRect()
        const finderPosition = finder.getBoundingClientRect()

        const x = Math.average(finderPosition.left, finderPosition.left + finderPosition.width) - canvasPosition.x
            , y = Math.average(finderPosition.top, finderPosition.top + finderPosition.height) - canvasPosition.y

        const color = ctx.getImageData(x, y, 1, 1).data

        const distance = p => Math.sqrt(Math.pow((y+canvasPosition.y) - p.y, 2) + Math.pow((x + canvasPosition.x) - p.x, 2))

        closest = prizes.reduce((a, b) => distance(a) < distance(b) ? a : b);

        prizes.forEach(prize => {
          prize.node.style.background = 'rgba(0,0,0,0)'
          prize.node.style.boxShadow = '0px 0px 0px rgba(0, 0, 0, 0)'
          prize.node.style.textShadow = `0px 0px 5px rgba(0, 0, 0, 0)`
        })

        if (winnerData.color !== color) {
          spin2.play()
        }

        winnerData = {
          color,
          prize: closest.node.innerText
        }
        closest.node.style.background = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
        closest.node.style.boxShadow = `0px 0px 28px rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`
        closest.node.style.textShadow = `0px 0px 5px rgba(0, 0, 0, 0.4)`
      }, 10)

      const stopTime = (Math.random() * 7000) + 7000

      let seconds = parseInt(stopTime / 1000)

      const secondInterval = setInterval(() => {
        seconds -= 1
        if (seconds < 1) {
          ctxTime.translate((288 / 2), (288 / 2))
          ctxTime.rotate(-(Math.PI / 2) - 0.07)

          ctxTime.strokeStyle = '#363636'
          ctxTime.beginPath()
          ctxTime.setLineDash([18, 7])
          ctxTime.lineWidth = 4
          ctxTime.beginPath()
          ctxTime.arc(0, 0, (288 / 2) - 4, 0, Math.PI * 2)
          ctxTime.stroke()

          ctxTime.rotate(-(-(Math.PI / 2) - 0.07))
          ctxTime.translate(-(288 / 2), -(288 / 2))
          clearInterval(secondInterval)
          return
        }
        timeText.querySelector('div.seconds').innerText = seconds
      }, 1000)
      timeText.querySelector('div.seconds').innerText = seconds
      timeText.style.opacity = 1

      let i = (Math.PI * ((2 / 14600) * stopTime))
      const intervalProgressTimeId = setInterval(() => {
        ctxTime.clearRect(0, 0, 288, 288)

        ctxTime.translate((288 / 2), (288 / 2))
        ctxTime.rotate(-(Math.PI / 2) - 0.07)

        ctxTime.strokeStyle = '#363636'
        ctxTime.beginPath()
        ctxTime.setLineDash([18, 7])
        ctxTime.lineWidth = 4
        ctxTime.beginPath()
        ctxTime.arc(0, 0, (288 / 2) - 4, 0, Math.PI * 2)
        ctxTime.stroke()

        ctxTime.strokeStyle = '#1CBC02'
        ctxTime.beginPath()
        ctxTime.setLineDash([18, 7])
        ctxTime.lineWidth = 4
        ctxTime.beginPath()
        ctxTime.arc(0, 0, (288 / 2) - 4, 0, i+1)
        ctxTime.stroke()

        ctxTime.rotate(-(-(Math.PI / 2) - 0.07))
        ctxTime.translate(-(288 / 2), -(288 / 2))

        i -= 0.02

        if (i < -1.01) {
          clearInterval(intervalProgressTimeId)
          ctxTime.clearRect(0, 0, 288, 288)

          ctxTime.translate((288 / 2), (288 / 2))
          ctxTime.rotate(-(Math.PI / 2) - 0.07)

          ctxTime.strokeStyle = '#363636'
          ctxTime.beginPath()
          ctxTime.setLineDash([18, 7])
          ctxTime.lineWidth = 4
          ctxTime.beginPath()
          ctxTime.arc(0, 0, (288 / 2) - 4, 0, Math.PI * 2)
          ctxTime.stroke()

          ctxTime.rotate(-(-(Math.PI / 2) - 0.07))
          ctxTime.translate(-(288 / 2), -(288 / 2))
        }
      }, 40)

      setTimeout(() => {
        const winnerColor = rgbToHex(...winnerData.color)
            , winner = finalUsers.find(({ color }) => color === winnerColor) || finalUsers.sort((a, b) => b.tokens - a.tokens)[0]

        setTimeout(() => {
          canvas.style.transform = 'rotate(900deg)'
          canvas.style.transition = '0s'

          finderWrapper.style.transition = `transform 0s linear`
          finderWrapper.style.transform = `rotate(0deg)`
        }, 3900)

        clearInterval(intervalFindWinnerId)
        timeText.style.opacity = 0
        arrow.style.opacity = 0
        clearInterval(secondInterval)
        clearInterval(intervalProgressTimeId)
        ctxTime.clearRect(0, 0, 288, 288)

        ctxTime.translate((288 / 2), (288 / 2))
        ctxTime.rotate(-(Math.PI / 2) - 0.07)

        ctxTime.strokeStyle = '#363636'
        ctxTime.beginPath()
        ctxTime.setLineDash([18, 7])
        ctxTime.lineWidth = 4
        ctxTime.beginPath()
        ctxTime.arc(0, 0, (288 / 2) - 4, 0, Math.PI * 2)
        ctxTime.stroke()

        ctxTime.rotate(-(-(Math.PI / 2) - 0.07))
        ctxTime.translate(-(288 / 2), -(288 / 2))

        setTimeout(() => {
          wrapperCanvas.style.opacity = 0
          wrapperMiniCanvas.style.opacity = 1
          wrapperMiniTextCanvas.style.opacity = 1
          wrapperMiniImgCanvas.style.opacity = 1
          wrapperMiniImgShadowCanvas.style.opacity = 1

          res({
            username: winner.username,
            tokens: winner.tokens,
            prize: winnerData.prize
          })
        }, 3000)
      }, stopTime)
    }

    findWinner()
  }, 3000)
})
