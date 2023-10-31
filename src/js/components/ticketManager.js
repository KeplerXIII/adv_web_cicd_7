import { ModalManager } from './modalManager'
const modalManager = new ModalManager()
modalManager.init()

export class TicketManager {
  constructor (taskDiv, tObject) {
    this.taskBoard = taskDiv
    this.ticket = tObject
  }

  init () {
    this.renderTicket()

    if (this.ticket.status === true) {
      this.radioBtn.checked = true
    } else {
      this.radioBtn.checked = false
    }

    this.radioBtn.addEventListener('change', (e) => {
      e.stopPropagation()
      const xhr = new XMLHttpRequest()
      xhr.open('GET', `http://localhost:6060/?method=switchByID&id=${this.ticket.id}`)
      xhr.send()
    })

    this.ticketRendered.addEventListener('click', (e) => {
      if (!e.target.closest('.noProp')) {
        this.description.classList.toggle('hiden')
      }
    })

    this.delBtn.addEventListener('click', () => {
      modalManager.openDeleteModal(this.ticket, this.ticketRendered)
    })
  }

  renderTicket () {
    this.taskBoard.insertAdjacentHTML('beforeend', this.htmlForm())
  }

  htmlForm () {
    const { id, name, description, __, created } = this.ticket
    const htmlRaw = `
    <div class="ticket" id=${id}>
      <div class="main-info">
        <input type="checkbox" class="radio-button noProp">
        <span class="name">${name}</span>
        <span class="date">${created}</span>
        <button class="delete-button noProp">X</button>
        <button class="edit-button noProp">✏️</button>
      </div>
      <div class="additional-info">
        <span class="description hiden">${description}</span>
      </div>
    </div>
    `
    return htmlRaw
  }

  get ticketRendered () {
    return document.getElementById(this.ticket.id)
  }

  get radioBtn () {
    return this.ticketRendered.querySelector('.radio-button')
  }

  get delBtn () {
    return this.ticketRendered.querySelector('.delete-button')
  }

  get editBtn () {
    return this.ticketRendered.querySelector('.edit-button')
  }

  get description () {
    return this.ticketRendered.querySelector('.description')
  }
}
