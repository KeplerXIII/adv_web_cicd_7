import { TicketManager } from './ticketManager'
const btn = document.querySelector('.btn')
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

btn.addEventListener('click', (e) => {
  e.preventDefault()
  const xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return
    console.log(JSON.parse(xhr.responseText))
  }
  xhr.open('GET', 'http://localhost:6060/?method=switchByID&id=1')
  xhr.send()
})

// subscribeForm.addEventListener('submit', (e) => {
//   e.preventDefault()

//   const body = new FormData(subscribeForm)

//   const xhr = new XMLHttpRequest()

//   xhr.onreadystatechange = function () {
//     if (xhr.readyState !== 4) return
//     console.log(xhr.responseText)
//   }

//   xhr.open('POST', 'http://localhost:6060')

//   xhr.send()
// })

// unsubscribeBtn.addEventListener('click', (e) => {
//   e.preventDefault()
//   const xhr = new XMLHttpRequest()

//   const body = Array.from(subscribeForm.elements)
//     .filter(({ name }) => name)
//     .map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
//     .join('&')

//   xhr.onreadystatechange = function () {
//     if (xhr.readyState !== 4) return
//     console.log(xhr.responseText)
//   }

//   xhr.open('DELETE', 'http://localhost:6060/?' + body)

//   xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

//   xhr.send()
// })
