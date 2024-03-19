let title = document.querySelector('#title');
let summary = document.querySelector('#summary');
let body = document.querySelector('#body');
let taskAdd = document.querySelector('#task');
const {ipcRenderer}=   require('electron')
let data = [];
taskAdd.addEventListener('submit', e=>{
    e.preventDefault();
    let task = {
        title: title.value,
        summary: summary.value,
        body: body.value
    }
    ipcRenderer.send('new-task',task)
    taskAdd.reset();
})


