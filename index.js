const AppChannel            = require('node-mermaid/store/app-channel')()
    , AppTransportChannel   = require('node-mermaid/store/app-transport-channel')()
    , parser                = require('node-mermaid/parser')
    , appMemoryFolderPath   = require('node-mermaid/store/app-memory-folder-path')


const spinTip = data => {
  if (data.isEasyData && data.easyData.events.isTokens) {
    const tokenCount = data.easyData.tokenCount
        , username = data.easyData.username

    AppTransportChannel.writeData({
      type: 'tip',
      data: {
        username,
        tokens: tokenCount
      }
    })
  }
}

AppChannel.on('connect', () => {
  AppTransportChannel.on('connect', () => {
    AppChannel.on('reload', () => {
      AppTransportChannel.writeData({
        type: 'reload'
      })
    })

    AppChannel.on('data', data => {
      parser.Chaturbate(data, spinTip)
      parser.xHamsterLive(data, spinTip)
      parser.Stripchat(data, spinTip)
      parser.BongaCams(data, spinTip)
    })

    AppChannel.on('state', (state) => {
      AppTransportChannel.writeData({
        type: 'state',
        data: state
      })
    })

    AppTransportChannel.on('readData', ({ type, data }) => {
      if (type === 'win') {
        const winMessages = {
          Chaturbate: [
            `[Bot] Super wheel fortune gamers:`,
            ...data.users.map((user, i) => `[Bot] #${i+1} ${user.isKing ? `(king) ` : ''}@${user.username} | contribution: ${user.tokens} tokens | probability of victory ${parseInt(user.procent * 100)}%`),
            `❤️🧡💛💚💙💜 🕹 💜💙💚💛🧡❤️`,
            `[Bot] Wow this @${data.out.username} guy won! And gets: ${data.out.prize}`,
            `[Bot] :fui387372hf87f23hf372h87j98j9j8j`
          ],
          BongaCams: [
            `Super wheel fortune gamers:`,
            ...data.users.map((user, i) => `#${i+1} ${user.isKing ? `(king) ` : ''}@${user.username} | contribution: ${user.tokens} tokens | probability of victory ${parseInt(user.procent * 100)}%`),
            `★★★★★`,
            `Wow this @${data.out.username} guy won! And gets: ${data.out.prize}`,
            `★★★★★`
          ],
          xHamsterLive: [
            `Super wheel fortune gamers:`,
            ...data.users.map((user, i) => `#${i+1} ${user.isKing ? `(king) ` : ''}@${user.username} | contribution: ${user.tokens} tokens | probability of victory ${parseInt(user.procent * 100)}%`),
            `★★★★★`,
            `Wow this @${data.out.username} guy won! And gets: ${data.out.prize}`,
            `★★★★★`
          ],
          Stripchat: [
            `Super wheel fortune gamers:`,
            ...data.users.map((user, i) => `#${i+1} ${user.isKing ? `(king) ` : ''}@${user.username} | contribution: ${user.tokens} tokens | probability of victory ${parseInt(user.procent * 100)}%`),
            `★★★★★`,
            `Wow this @${data.out.username} guy won! And gets: ${data.out.prize}`,
            `★★★★★`
          ]
        }

        Object.keys(winMessages).forEach(platform =>
          AppChannel.sendMessages(platform, winMessages[platform])
        )
      }
    })
  })
})
