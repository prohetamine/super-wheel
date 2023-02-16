import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import styled from 'styled-components'
import './index.css'

import addIcon from './assets/icons/add.svg'
import okIcon from './assets/icons/ok.svg'
import bottomIcon from './assets/icons/bottom.svg'
import deleteIcon from './assets/icons/delete.svg'
import tokensIcon from './assets/icons/tokens.svg'
import timeIcon from './assets/icons/time.svg'
import topIcon from './assets/icons/top.svg'
import urlIcon from './assets/icons/url.svg'

const root = ReactDOM.createRoot(document.getElementById('root'))

const DefaultIcon = styled.div`
  width: 20px;
  min-width: 20px;
  height: 20px;
  min-height: 20px;
  background-image: url(${props => props.src});
`

const DefaultInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  background: rgba(0, 0, 0, 0);
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;
  color: #6B6B6B;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  padding: 0px;
`

const DefaultNavigationBody = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 10px 15px;
  gap: 10px;
  width: auto;
  height: 40px;
  background: #FAFAFA;
  border: 1px solid #F2F2F2;
  border-radius: 8px;
`

const Input = (() => {
  const Body = styled(DefaultNavigationBody)``

  const Input = styled(DefaultInput)`
    width: 100%;
  `

  return ({ placeholder, style, value, onChange }) => (
    <Body style={style}>
      <Input placeholder={placeholder} onChange={({ target: { value } }) => onChange(value)} value={value} />
    </Body>
  )
})()

const InputIcon = (() => {
  const Body = styled(DefaultNavigationBody)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `

  const Input = styled(DefaultInput)`
    width: calc(100% - 28px);
  `

  const Icon = styled(DefaultIcon)``

  return ({ placeholder, style, value, onChange, onBlur, onFocus, icon }) => (
    <Body style={style}>
      <Input
        placeholder={placeholder}
        onChange={({ target: { value } }) => onChange(value)}
        value={value}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <Icon src={icon} />
    </Body>
  )
})()

const SelectIcon = (() => {
  const Body = styled.div`
    position: relative;
  `

  const Wrapper = styled(DefaultNavigationBody)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  `

  const Text = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    display: flex;
    align-items: center;
    color: #6B6B6B;
    flex: none;
    flex-grow: 0;
    user-select: none;
  `

  const ItemsWrapper = styled(DefaultNavigationBody)`
    position: absolute;
    top: 0px;
    right: 0px;
    width: 52px;
    height: auto;
    box-shadow: 0px 1px 20px rgba(23, 23, 23, 0.15);
    font-size: 0px;
    z-index: 9999;
  `

  const Icon = styled(DefaultIcon)`
    cursor: pointer;
  `

  return ({ additional, value, icon, items, onChange, style }) => {
    const [isSelection, setSelection] = useState(false)

    return (
      <Body
        style={style}
        tabIndex='-1'
        onClick={({ target }) => !target.classList.contains('select') && setSelection(true)}
        onBlur={() => setSelection(false)}
      >
        <Wrapper>
          <Text>{additional}</Text>
          <Icon src={icon} />
        </Wrapper>
        {
          isSelection
            ? (
              <ItemsWrapper>
                {
                  items.map((item, key) => (
                    <Icon
                      className='select'
                      key={key}
                      src={item.icon}
                      onClick={() => {
                        onChange(item.value)
                        setSelection(false)
                      }}
                    />
                  ))
                }
              </ItemsWrapper>
            )
            : (
              null
            )
        }
      </Body>
    )
  }
})()

const Select = (() => {
  const Body = styled.div`
    position: relative;
  `

  const Wrapper = styled(DefaultNavigationBody)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  `

  const Text = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    display: flex;
    align-items: center;
    color: #6B6B6B;
    flex: none;
    flex-grow: 0;
    cursor: pointer;
    user-select: none;
  `

  const ItemsWrapper = styled(DefaultNavigationBody)`
    position: absolute;
    top: 0px;
    right: 0px;
    height: auto;
    box-shadow: 0px 1px 20px rgba(23, 23, 23, 0.15);
    font-size: 0px;
    z-index: 9999;
  `

  const Icon = styled(DefaultIcon)`
    cursor: pointer;
  `

  return ({ value, items, onChange, style }) => {
    const [isSelection, setSelection] = useState(false)

    return (
      <Body
        style={style}
        tabIndex='-1'
        onClick={({ target }) => !target.classList.contains('select') && setSelection(true)}
        onBlur={() => setSelection(false)}
      >
        <Wrapper>
          <Text>{value}</Text>
          <Icon src={bottomIcon} />
        </Wrapper>
        {
          isSelection
            ? (
              <ItemsWrapper style={{ width: style.width }}>
                <Icon src={topIcon} style={{ position: 'absolute', top: '9px', right: '15px' }} />
                {
                  items.map((item, key) => (
                    <Text
                      className='select'
                      key={key}
                      onClick={() => {
                        onChange(item)
                        setSelection(false)
                      }}
                    >
                      {item}
                    </Text>
                  ))
                }
              </ItemsWrapper>
            )
            : (
              null
            )
        }
      </Body>
    )
  }
})()

const ButtonIcon = (() => {
  const Body = styled(DefaultNavigationBody)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    user-select: none;
  `

  const Text = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    display: flex;
    align-items: center;
    color: #6B6B6B;
    flex: none;
    order: 0;
    flex-grow: 0;
  `

  const Icon = styled(DefaultIcon)``

  return ({ style, text, icon, onClick }) => (
    <Body style={style} onClick={onClick}>
      <Text>{text}</Text>
      <Icon src={icon} />
    </Body>
  )
})()

const Condition = (() => {
  const Body = styled(DefaultNavigationBody)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `

  const Text = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    display: flex;
    align-items: center;
    color: #6B6B6B;
    flex: none;
    order: 2;
    flex-grow: 0;
  `

  const Icon = styled(DefaultIcon)``

  return ({ style, value, icons }) => (
    <Body style={style}>
      <Icon src={icons[0]} />
      <Icon src={icons[1]} />
      <Text>{value}</Text>
    </Body>
  )
})()

const Icon = (() => {
  const Body = styled(DefaultNavigationBody)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  `

  const Icon = styled(DefaultIcon)``

  return ({ icon, style, onClick }) => (
    <Body style={style} onClick={onClick}>
      <Icon src={icon} />
    </Body>
  )
})()

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 27px;
  gap: 10px;
  background: #FAFAFA;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 24px;
  width: 100%;
  flex: none;
  order: 0;
  flex-grow: 0;
`

const WhiteBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 11px;
  background: #FFFFFF;
  box-shadow: 0px 1px 5px rgba(23, 23, 23, 0.15);
  border-radius: 8px;
  flex: none;
  order: 0;
  width: 100%;
  box-sizing: border-box;
  flex-grow: 0;
`

const BigTitle = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #6B6B6B;
  flex: none;
  order: 0;
  flex-grow: 0;
`

const MiddleTitle = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 21px;
  display: flex;
  align-items: center;
  color: #6B6B6B;
  flex: none;
  order: 0;
  flex-grow: 0;
`

const CreateRuleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 14px;
  height: 40px;
  flex: none;
  order: 0;
  flex-grow: 0;
`

const ClientContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
  width: 100%;
`

const CommandsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5px 0px 0px;
  gap: 13px;
  width: 451px;
  flex: none;
  order: 2;
  flex-grow: 0;
`

const Command = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 14px;
  flex: none;
  order: 3;
  flex-grow: 0;
`

const ClientHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 14px;
  flex: none;
  order: 1;
  flex-grow: 0;
`


const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #EBEBEB;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`

const AppTransportChannel = window.MermaidAppTransportChannel()

const App = () => {
  const defaultClient = {
    ip: '',
    name: '',
    flag: 'Read and write',
    platform: 'All platforms',
    id: null
  }

  const [clients, setClients] = useState([])
      , [client, setClient] = useState(defaultClient)

  useEffect(() => {
    AppTransportChannel.on('connect', () => {
      AppTransportChannel.on('readData', async ({ type, data }) => {
        if (type === 'reload') {
          localStorage.clear()
          window.location.reload()
        }
      })

      AppTransportChannel.writeData({ type: 'get-clients' })
    })
  }, [])

  const connectedClients = clients.filter(client => client.isConnect)
      , disconnectedClients = clients.filter(client => !client.isConnect)

  return (
    <Body>
      
    </Body>
  )
}

root.render(<App />)
