

document
    .querySelectorAll('.column')
    .forEach(Column.process)

document
    .querySelector('[data-action-addColumn]')
    .addEventListener('click', function (event) {
        const columnElement = document.createElement('div')
        columnElement.classList.add('column')
        columnElement.setAttribute('draggable', 'true')
        columnElement.setAttribute('data-column-id', Column.IdCounter)

        columnElement.innerHTML =
            `<p class="column-header">В плане</p>
					<div data-notes></div>
					<p class="column-footer">
						<span data-action-addNote class="action">+ Добавить карточку</span>
			    </p>`

        Column.IdCounter++

        document.querySelector('.columns').append(columnElement)

        Column.process(columnElement)

    })

document
    .querySelectorAll('.note')
    .forEach(Note.process)


