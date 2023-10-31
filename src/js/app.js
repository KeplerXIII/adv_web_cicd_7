import { TicketManager } from './components/ticketManager'

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
    })
  }
  xhr.open('GET', 'http://localhost:6060/?method=allTickets')
  xhr.send()
})

// btn.addEventListener('click', (e) => {
//   e.preventDefault()
//   const xhr = new XMLHttpRequest()

//   xhr.onreadystatechange = function () {
//     if (xhr.readyState !== 4) return
//     console.log(JSON.parse(xhr.responseText))
//   }
//   xhr.open('GET', 'http://localhost:6060/?method=switchByID&id=1')
//   xhr.send()
// })
