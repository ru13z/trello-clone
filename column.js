const Column = {
    idCounter: 4,

    process(columnElement) {
        const spanAction_addNote = columnElement.querySelector('[data-action-addNote]')

        spanAction_addNote.addEventListener('click', function (event) {
            const noteElement = document.createElement('div')
            noteElement.classList.add('note')
            noteElement.setAttribute('draggable', 'true')
            noteElement.setAttribute('data-note-id', Note.IdCounter)

            Note.IdCounter++

            columnElement.querySelector('[data-notes]').append(noteElement)
            Note.process(noteElement)

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

        columnElement.addEventListener('dragover', function (event) {
            event.preventDefault()
        })

        columnElement.addEventListener('drop', function (event) {
            if (Note.dragged) {
                return columnElement.querySelector('[data-notes]').append(Note.dragged)
            }
        })
    }
}