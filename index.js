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
        AppChannel.sendMessage('Chaturbate', `@${data.out.username} you winner! your prize: ${data.out.prize}`)
        AppChannel.sendMessage('BongaCams', `@${data.out.username} you winner! your prize: ${data.out.prize}`)
        AppChannel.sendMessage('xHamsterLive', `@${data.out.username} you winner! your prize: ${data.out.prize}`)
        AppChannel.sendMessage('Stripchat', `@${data.out.username} you winner! your prize: ${data.out.prize}`)
      }
    })
  })
})
