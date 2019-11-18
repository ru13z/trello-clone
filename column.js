const Column = {
    idCounter: 4,

    process(columnElement) {
        const spanAction_addNote = columnElement.querySelector('[data-action-addNote]')

        spanAction_addNote.addEventListener('click', function (event) {
            const noteElement = Note.create()
            columnElement.querySelector('[data-notes]').append(noteElement)
            noteElement.setAttribute('contenteditable', 'true')
            noteElement.focus()
        })

        const headerElement = columnElement.querySelector('.column-header')
        headerElement.addEventListener('dblclick', function (event) {
            headerElement.setAttribute('contenteditable', true)
            headerElement.focus()
        })

        headerElement.addEventListener('blur', function (event) {
            headerElement.removeAttribute('contenteditable', true)
        })

        columnElement.addEventListener('dragover', Column.dragover)

        columnElement.addEventListener('drop', Column.drop)
    },

    dragover(event) {
        event.preventDefault()
    },

    drop() {
        if (Note.dragged) {
            return this.querySelector('[data-notes]').append(Note.dragged)
        }
    }

}