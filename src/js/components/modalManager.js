import config from '../../../config'

export class ModalManager {
  init () {
    this.renderModal()

    this.addBtn.addEventListener('click', (e) => {
      this.openAddModal()
    })

    this.closeDeleteButton.addEventListener('click', () => {
      this.closeDeleteModal()
    })

    this.confirmDeleteButton.addEventListener('click', () => {
      this.removeByID(this.id)
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
        name.value = ''
        name.setAttribute('placeholder', 'Минимум 5 символов.')
        return
      }
      if (description.value.length < 10) {
        description.value = ''
        description.setAttribute('placeholder', 'Минимум 10 символов.')
        return
      }
      this.addNew(name.value, description.value)
    })

    this.closeEditButton.addEventListener('click', (e) => {
      e.preventDefault()
      this.closeEditModal()
    })

    this.confirmEditButton.addEventListener('click', (e) => {
      e.preventDefault()
      const name = this.editableName
      const description = this.editableDescription
      if (name.value.length < 5) {
        name.value = ''
        name.setAttribute('placeholder', 'Минимум 5 символов.')
        return
      }
      if (description.value.length < 10) {
        description.value = ''
        description.setAttribute('placeholder', 'Минимум 10 символов.')
        return
      }
      this.editByID(this.id, name.value, description.value)
      this.closeEditModal()
    })
  }

  renderModal () {
    document.body.insertAdjacentHTML('beforeend', this.constructor.deleteMarkUp)
    document.body.insertAdjacentHTML('beforeend', this.constructor.addMarkUp)
    document.body.insertAdjacentHTML('beforeend', this.constructor.editMarkUp)
  }

  static get deleteMarkUp () {
    return `
            <div class="modal delete-modal">
                <div class="modal-content">
                    <p>Уверенны, что хотите удалить?</p>
                    <button class="confirm-button">Да</button>
                    <button class="cancel-button">Нет</button>
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

  static get editMarkUp () {
    return `
            <div class="modal edit-modal">
              <div class="modal-content">
                <form class="input-form">
                    <p>Введите название и описание:</p>
                    <input class ="input-name" type="text" name="name" placeholder="Название">
                    <input class ="input-description" type="text" name="description" placeholder="Описание">
                    <div class="button-container">
                        <button class="confirm-button">Изменить</button>
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

  get editModal () {
    return document.querySelector('.edit-modal')
  }

  get closeDeleteButton () {
    return this.deleteModal.querySelector('.cancel-button')
  }

  get closeAddButton () {
    return this.addModal.querySelector('.cancel-button')
  }

  get closeEditButton () {
    return this.editModal.querySelector('.cancel-button')
  }

  get confirmDeleteButton () {
    return this.deleteModal.querySelector('.confirm-button')
  }

  get confirmAddButton () {
    return this.addModal.querySelector('.confirm-button')
  }

  get confirmEditButton () {
    return this.editModal.querySelector('.confirm-button')
  }

  get addBtn () {
    return document.querySelector('.add-button')
  }

  get editableName () {
    return this.editModal.querySelector('.input-name')
  }

  get editableDescription () {
    return this.editModal.querySelector('.input-description')
  }

  openDeleteModal (ticket, render) {
    this.ticket = ticket
    this.render = render
    this.deleteModal.style.display = 'block'
  }

  openAddModal () {
    this.addModal.style.display = 'block'
  }

  openEditModal (ticket, render) {
    this.editModal.style.display = 'block'
    const { id, name, description } = ticket
    this.render = render
    this.id = id
    this.editableName.value = name
    this.editableDescription.value = description
  }

  closeDeleteModal () {
    this.deleteModal.style.display = 'none'
  }

  closeAddModal () {
    this.addModal.style.display = 'none'
  }

  closeEditModal () {
    this.editModal.style.display = 'none'
  }

  removeByID () {
    this.render.remove()
    this.closeDeleteModal()
    const xhr = new XMLHttpRequest()
    xhr.open(
      'DELETE',
      `${config.host}:${config.port}/?method=removeByID&id=${this.ticket.id}`
    )
    xhr.send()
  }

  addNew (name, description) {
    this.closeAddModal()
    const xhr = new XMLHttpRequest()
    xhr.open(
      'POST',
      `${config.host}:${config.port}/?method=createNew&name=${name}&description=${description}`
    )

    document.querySelector('.loader').classList.remove('hiden')
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) {
        return
      }
      document.querySelector('.loader').classList.add('hiden')
      location.reload()
    }

    xhr.send()
  }

  editByID (id, name, description) {
    const xhr = new XMLHttpRequest()
    const tempName = this.render.querySelector('.name')
    const tempDesc = this.render.querySelector('.description')
    xhr.open(
      'POST',
      `${config.host}:${config.port}/?method=editByID&id=${id}&name=${name}&description=${description}`
    )
    document.querySelector('.loader').classList.remove('hiden')
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) {
        return
      }
      tempName.textContent = name
      tempDesc.textContent = description
      document.querySelector('.loader').classList.add('hiden')
    }

    xhr.send()
  }
}
