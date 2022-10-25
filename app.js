const title  = document.querySelector('#task2')
const booksTable = document.querySelector('table')
const author = document.querySelector('#task1')
const ISBN = document.querySelector('#task3')
const form = document.querySelector('form')
const delAllTasks = document.querySelector('#del-tasks')

form.addEventListener("submit", addBook)
booksTable.addEventListener('click', deleteTask)
delAllTasks.addEventListener('click', deleteAllTasks)
document.addEventListener('DOMContentLoaded', getTasks)

/*function addBook(event) {
    const bookRow = document.createElement('tr')
    bookRow.innerHTML = `<tr>
                    <td>${title.value}</td>
                    <td>${Author.value}</td>
                    <td>${ISBN.value}</td>
                    <td><a href="#">X</a></td>
                    </tr>`
    booksTable.appendChild(bookRow)
    title.value = ''
    Author.value = ''
    ISBN.value = ''
    event.preventDefault()
}*/
function addBook(e) {
    const NewRow = booksTable.insertRow(-1)
    const cell1 = NewRow.insertCell(0)
    const cell2 = NewRow.insertCell(1)
    const cell3 = NewRow.insertCell(2)
    const cell4 = NewRow.insertCell(3)
    const a = document.createElement('a')
    a.appendChild(document.createTextNode('X'))
    a.className = 'blue-text text-darken-2 secondary-content'
    a.setAttribute('href', '#')
    cell1.innerHTML = title.value
    cell2.innerHTML = author.value
    cell3.innerHTML = ISBN.value
    cell4.appendChild(a)
    const lsbook = [title.value, author.value, ISBN.value]
    addTaskLS(lsbook)
    title.value = ""
    author.value = ""
    ISBN.value = ""

    e.preventDefault()
}

function deleteTask(e){
    if(e.target.textContent == 'X'){
        if(confirm('Are you sure to delete this task?')){
            e.target.parentElement.parentElement.remove()
            deleteTaskLS(e.target.parentElement.parentElement.textContent.slice(0,-1))
        }
    }
}

function deleteAllTasks(e){
    //taskList.innerHTML = ''
    while (booksTable.firstChild){
        booksTable.removeChild(booksTable.firstChild)
    }
    localStorage.removeItem('tasks')
}

function addTaskLS(task) {
    let tasks
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function deleteTaskLS(task) {
    let tasks
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach((taskLS, taskIndex) => {
        if(taskLS === task){
            tasks.splice(taskIndex, 1)
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}


function getTasks() {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach((task,taskIndex) => {
        let title = task[0]
        let author = task[1]
        let ISBN = task[2]
        const row = booksTable.insertRow(taskIndex+1)
        const cell1 = row.insertCell(0)
        const cell2 = row.insertCell(1)
        const cell3 = row.insertCell(2)
        const cell4 = row.insertCell(3)
        const a = document.createElement('a')
        a.appendChild(document.createTextNode('X'))
        a.setAttribute('href', '#')
        cell1.innerText = title
        cell2.innerHTML = author
        cell3.innerHTML = ISBN
        cell4.appendChild(a)
    })
}