const Application = {
    save() {
        const object = {
            columns: {
                idCounter: Column.idCounter,
                items: []
            },
            notes: {
                idCounter: Note.idCounter,
                items: []
            }
        }

        document
            .querySelectorAll('.column')
            .forEach(columnElement => {
                const column = {
                    title: '',
                    id: parseInt(columnElement.getAttribute('data-column-id')),
                    noteIds: []
                }
                columnElement.querySelectorAll('.note')
                    .forEach(noteElement => {
                        column.noteIds.push(parseInt(noteElement.getAttribute('data-note-id')))
                    })

                object.columns.items.push(column)
            })

        document
            .querySelectorAll('.note')
            .forEach(noteElement => {
                const note = {
                    id: parseInt(noteElement.getAttribute('data-note-id')),
                    content: noteElement.textContent
                }

                object.notes.items.push(note)
            })

        const json = JSON.stringify(object)

        localStorage.setItem('trello', json)

        console.log(json)
    },
    load() {
        if (!localStorage.getItem('trello')) {
            return
        }
        const mountePoint = document.querySelector('.columns')
        mountePoint.innerHTML = ''

        const object = JSON.parse(localStorage.getItem('trello'))

        //console.log(object)

        const getNoteById = id => object.notes.items.find(note => note.id === id)

        for (const { id, noteIds } of object.columns.items) {
            const column = new Column(id)

            mountePoint.append(column.element)

            for (const noteid of noteIds) {
                const { id, content } = getNoteById(noteid)
                // console.log(note)
                const note = new Note(id, content)
                column.add(note)
                //column.element.querySelector('[data-notes]').append(note.element)
                //console.log(note)
            }
        }

    }
}