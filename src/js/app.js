import { TicketManager } from './components/ticketManager'
import config from '../../config'

const tickets = document.querySelector('.tickets')

document.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault()
  const xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return

    const data = JSON.parse(xhr.responseText)
    data.forEach(el => {
      const instance = new TicketManager(tickets, el)
      instance.init()
      document.querySelector('.loader').classList.add('hiden')
    })
  }
  xhr.open('GET', `${config.host}:${config.port}/?method=allTickets`)

  xhr.send()
})
