const subscribeWidget = document.querySelector('.subscribe')
const subscribeForm = subscribeWidget.querySelector('.subscribe-form')
const nameInput = subscribeWidget.querySelector('.name')
const phoneInput = subscribeWidget.querySelector('.phone')
const unsubscribeBtn = subscribeWidget.querySelector('.unsubscribe-btn')

subscribeForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const xhr = new XMLHttpRequest()

  const body = Array.from(subscribeForm.elements)
    .filter(({ name }) => name)
    .map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
    .join('&')

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return
    console.log(xhr.responseText)
  }

  xhr.open('POST', 'http://localhost:6060')

  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

  xhr.send(body)
})

unsubscribeBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const xhr = new XMLHttpRequest()
  console.log(Array.from(subscribeForm.elements).filter(({ name }) => name))

  const body = Array.from(subscribeForm.elements)
    .filter(({ name }) => name)
    .map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
    .join('&')

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return
    console.log(xhr.responseText)
  }

  xhr.open('DELETE', 'http://localhost:6060/?' + body)

  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

  xhr.send()
})
