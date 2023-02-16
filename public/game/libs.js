function determineWidth(ctx, text, font) {
  ctx.font = font
  let measure = ctx.measureText(text)
  let fontHei = parseInt(font.slice(0, font.indexOf("px")))
  return measure.width
}
CanvasRenderingContext2D.prototype._arc = function (x, y, radius, start, end, direction) {
    const PI = Math.PI;
    const PI2 = PI * 2;
    if (radius < 0) {
      throw new Error(`Failed to execute 'arc' on 'CanvasRenderingContext2D': The radius provided (${radius}) is negative.`)
    }

    if (radius == 0) {
      ctx.lineTo(x, y)
    } else {
      const angleDist = end - start;
      let step, i;
      let steps = radius;

      if ((direction !== true && angleDist >= PI2)){
          step = PI2 / steps;
      } else if ((direction === true && angleDist <= -PI2)) {
          step = -PI2 / steps;
      } else {

        start = ((start % PI2) + PI2) % PI2;
        end = ((end % PI2) + PI2) % PI2;
        if(end < start) { end += PI2 }
        if(direction === true){ end -= PI2 }
        steps *= (end - start) / PI2;
        step = (end - start) / steps;
        if(direction === true) { step = -step; }
        steps = Math.abs(steps);
      }

      for (i = 0 ; i < steps; i += 1){
          this.lineTo(
              Math.cos(start + step * i) * radius + x,
              Math.sin(start + step * i) * radius + y
          );
      }
      this.lineTo(
          Math.cos(start + step * steps) * radius + x,
          Math.sin(start + step * steps) * radius + y
      );

      return {
        x: Math.cos(start + step * steps) * radius + x,
        y: Math.sin(start + step * steps) * radius + y,
        x2: Math.cos(start + step * parseInt(steps / 2)) * radius + x,
        y2: Math.sin(start + step * parseInt(steps / 2)) * radius + y
      }
    }
}

Math.average= function(){
  var a= arguments, L= a.length, i= 0,
  total= 0, next, prec= [];
  if(L== 1) return +a[0];
  while(i<L){
      next= Number(a[i++]);
      total+= next;
      if(next!== Math.floor(next)){
          prec.push(String(next).split('.')[1].length);
      }
  }
  try {
    prec= Math.max.apply(Math, prec)+1;
    return +((total/L).toFixed(prec));
  } catch (e) {
    return +((total/L).toFixed(99));
  }

  // returns number after precision adjusted
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

const loadImage = src => new Promise(res => {
  const img = new Image()
  img.onload = () => res(img)
  img.src = src
})

const loadAudio = src => new Promise(res => {
  const audio = new Audio(src)
  audio.addEventListener('canplaythrough', () => res(audio), false)
})

const sleep = ms => new Promise(res => setTimeout(res, ms))


const virtualSigments = (users, count) => {
  users = users.sort((b, a) => a.tokens - b.tokens).slice(0, 19)

  let max100 = users.reduce((ctx, elem) => ctx + elem.tokens, 0)

  users = users.map(user => ({ ...user, procent: user.tokens / max100 }))

  max100 = users.reduce((ctx, elem) => ctx + elem.tokens, 0)

  users = users.map(user => ({ ...user, procent: user.tokens / max100 })).filter(e => e.procent > 0.05)

  max100 = users.reduce((ctx, elem) => ctx + elem.tokens, 0)

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

  users = users.map(
    user => ({
      ...user,
      isKing: king === user.username
    })
  )

  return users
}
