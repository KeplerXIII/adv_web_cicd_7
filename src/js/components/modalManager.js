export class ModalManager {
  init () {
    this.renderModal()

    this.closeDeleteButton.addEventListener('click', () => {
      this.closeDeleteModal()
    })

    this.confirmDeleteButton.addEventListener('click', () => {
      this.removeByID(this.id)
    })

    this.addBtn.addEventListener('click', (e) => {
      this.openAddModal()
    })

    this.closeAddButton.addEventListener('click', (e) => {
      e.preventDefault()
      this.closeAddModal()
    })

    this.confirmAddButton.addEventListener('click', (e) => {
      e.preventDefault()
      const name = this.addModal.querySelector('.input-name')
      const description = this.addModal.querySelector('.input-description')
      if (name.value.length < 5) {
        name.setAttribute('placeholder', 'Минимум 5 символов.')
        return
      }
      if (description.value.length < 10) {
        description.setAttribute('placeholder', 'Минимум 10 символов.')
        return
      }
      this.addNew(name.value, description.value)
      location.reload()
    })
  }

  renderModal () {
    document.body.insertAdjacentHTML('beforeend', this.constructor.deleteMarkUp)
    document.body.insertAdjacentHTML('beforeend', this.constructor.addMarkUp)
  }

  static get deleteMarkUp () {
    return `
            <div class="modal delete-modal">
                <div class="modal-content">
                    <p>Уверенны, что хотите удалить?</p>
                    <button class="confirm-button">Да</button>
                    <button class="cancel-button">Отмена</button>
                </div>
            </div>
            `
  }

  static get addMarkUp () {
    return `
            <div class="modal add-modal">
              <div class="modal-content">
                <form class="input-form">
                    <p>Введите название и описание:</p>
                    <input class ="input-name" type="text" name="name" placeholder="Название">
                    <input class ="input-description" type="text" name="description" placeholder="Описание">
                    <div class="button-container">
                        <button class="confirm-button">Добавить</button>
                        <button class="cancel-button">Отмена</button>
                    </div>
                </form>
              </div>
            </div>
            `
  }

  get deleteModal () {
    return document.querySelector('.delete-modal')
  }

  get addModal () {
    return document.querySelector('.add-modal')
  }

  get closeDeleteButton () {
    return this.deleteModal.querySelector('.cancel-button')
  }

  get closeAddButton () {
    return this.addModal.querySelector('.cancel-button')
  }

  get confirmDeleteButton () {
    return this.deleteModal.querySelector('.confirm-button')
  }

  get confirmAddButton () {
    return this.addModal.querySelector('.confirm-button')
  }

  get addBtn () {
    return document.querySelector('.add-button')
  }

  openDeleteModal (ticket, render) {
    this.ticket = ticket
    this.render = render
    this.deleteModal.style.display = 'block'
  }

  openAddModal () {
    this.addModal.style.display = 'block'
  }

  closeDeleteModal () {
    this.deleteModal.style.display = 'none'
  }

  closeAddModal () {
    this.addModal.style.display = 'none'
  }

  removeByID (id) {
    this.render.remove()
    this.closeDeleteModal()
    const xhr = new XMLHttpRequest()
    xhr.open('DELETE', `http://localhost:6060/?method=removeByID&id=${this.ticket.id}`)
    xhr.send()
  }

  addNew (name, description) {
    this.closeAddModal()
    const xhr = new XMLHttpRequest()
    xhr.open('POST', `http://localhost:6060/?method=createNew&name=${name}&description=${description}`)
    xhr.send()
  }
}
