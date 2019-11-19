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

        document.querySelectorAll('.column')
            .forEach(columnElement => {
                const column = {
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

        console.log(json)

        return object
    },
    load() {
        
    }
}