class Column {
    constructor(id = null) {
        const instance = this

        this.notes = []
        const element = this.element = document.createElement('div')
        element.classList.add('column')
        element.setAttribute('draggable', 'true')

        if (id) {
            element.setAttribute('data-column-id', id)
        } else {
            element.setAttribute('data-column-id', Column.idCounter)
            Column.idCounter++
        }
        element.innerHTML =
            `<p class="column-header">В плане</p>
            					<div data-notes></div>
					<p class="column-footer">
						<span data-action-addNote class="action">+ Добавить карточку</span>
                </p>`

        const spanAction_addNote = element.querySelector('[data-action-addNote]')

        spanAction_addNote.addEventListener('click', function (event) {


            const note = new Note
            instance.add(note)
            note.element.setAttribute('contenteditable', 'true')
            note.element.focus()

        })

        const headerElement = element.querySelector('.column-header')
        headerElement.addEventListener('dblclick', function (event) {
            headerElement.setAttribute('contenteditable', true)
            headerElement.focus()
        })

        headerElement.addEventListener('blur', function (event) {
            headerElement.removeAttribute('contenteditable', true)
        })

        element.addEventListener('dragstart', this.dragstart.bind(this))
        element.addEventListener('dragend', this.dragend.bind(this))

        // columnElement.addEventListener('dragenter', Column.dragenter)
        element.addEventListener('dragover', this.dragover.bind(this))
        //columnElement.addEventListener('dragleave', Column.dragleave)

        element.addEventListener('drop', this.drop.bind(this))
    }

    add(...notes) {
        for (const note of notes) {
            if (!this.notes.includes(note)) {
                this.notes.push(note)

                this.element.querySelector('[data-notes]').append(note.element)
            }
        }
    }



    dragstart(event) {
        Column.dragged = this.element
        Column.dragged.classList.add('dragged')

        event.stopPropagation()

        document
            .querySelectorAll('.note')
            .forEach(noteElement => noteElement.removeAttribute('draggable'))
    }

    dragend(event) {
        Column.dragged.classList.remove('dragged')
        Column.dragged = null
        Column.dropped = null
        document
            .querySelectorAll('.note')
            .forEach(noteElement => noteElement.setAttribute('draggable', true))

        document.querySelectorAll('.column')
            .forEach(columnElement => columnElement.classList.remove('under'))

        Application.save()
    }

    /*dragenter(event) {
        if (!Column.dragged || Column.dragged === this.element) {
            return
        }
        this.element.classList.add('under')
        console.log('dragenter')
    },*/
    dragover(event) {

        event.preventDefault()
        event.stopPropagation()
        if (Column.dragged === this.element) {
            if (Column.dropped) {
                Column.dropped.classList.remove('under')
            }
            Column.dropped = null
        }

        if (!Column.dragged || Column.dragged === this.element) {
            return
        }
        Column.dropped = this.element
        document
            .querySelectorAll('.column')
            .forEach(columnElement => columnElement.classList.remove('under'))

        this.element.classList.add('under')
    }
    /*dragleave(event) {
        if (!Column.dragged || Column.dragged === this.element) {
            return
        }
        this.element.classList.remove('under')
        console.log('dragleave')
    },*/

    drop() {
        if (Note.dragged) {
            return this.element.querySelector('[data-notes]').append(Note.dragged)
        }

        else if (Column.dragged) {
            const children = Array.from(document.querySelector('.columns').children)
            const indexA = children.indexOf(this.element)
            const indexB = children.indexOf(Column.dragged)

            if (indexA < indexB) {
                document.querySelector('.columns').insertBefore(Column.dragged, this.element)
            } else {
                document.querySelector('.columns').insertBefore(Column.dragged, this.element.nextElementSibling)
            }

            document.querySelectorAll('.column').forEach(columnElement => columnElement.classList.remove('under'))
        }
    }
}

Column.idCounter = 0

Column.dragged = null

Column.dropped = null