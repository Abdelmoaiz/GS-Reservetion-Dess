// variable
function refreshAuto(){
    window.location.reload();
}
const {ipcRenderer}=   require('electron');
const { stat } = require('original-fs');

let create = document.querySelector('#create');
let barcode = document.querySelector('#barcode');
let title = document.querySelector('#title');
let color = document.querySelector('#color');
let priceNight = document.querySelector('#priceNight');
let itemsState = document.querySelector('#itemsState');
let date = new Date();
let userName = document.querySelector('.userName');
let dateAndTime = document.querySelector('.dateAndTime');
userName.innerHTML = localStorage.getItem('userNameView');
// dateAndTime.innerHTML = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`;

if(date.getMonth()+1 < 10 && date.getDate() < 10) {
    dateAndTime.innerHTML = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`;
}else if(date.getMonth()+1 < 10 && date.getDate() >= 10){
    dateAndTime.innerHTML = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`;
}else if(date.getMonth()+1 >= 10 && date.getDate() < 10){
    dateAndTime.innerHTML = `${date.getFullYear()}-${date.getMonth()+1}-0${date.getDate()}`;
}else{
    dateAndTime.innerHTML = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}


let users;
if(localStorage.allUsers != null){
    users = JSON.parse(localStorage.allUsers);
}else{
    users = []
}

let mood = 'create';
let tmp;

function addItems(){
    document.querySelector(".inputs").style.display = "block";
}
function exitInput(){
    document.querySelector(".inputs").style.display = "none";
}

let Upload = document.querySelector('#upload');
let img = document.querySelector('#img');
Upload.onchange = function() {
    let file = new FileReader();
    file.readAsDataURL(Upload.files[0])
    file.onload = function(){
        img.setAttribute('src',file.result)
    }
    
}
// create data
let items;
if(localStorage.myItems != null){
    items = JSON.parse(localStorage.myItems)
}else{
    items = []
}


create.onclick = function(){
    if((barcode.value && title.value && color.value  ) != ""){
        let newItems = {
            barcode: barcode.value,
            title : title.value,
            color: color.value,
            priceNight: +priceNight.value,
            state: itemsState.value,
            img: img.src,
            
        }
        if(mood === 'create') {
            items.push(newItems);
            ipcRenderer.send('myItems',newItems)
            localStorage.setItem('myItems',JSON.stringify(items));

        }else if (mood === 'update'){
            create.innerHTML = ' اضافة الصنف';
            ipcRenderer.send('update-items', {...newItems, tmp})

        }

    }
    
    showItems();
    
}


function checkBarcode(){
    for(let i=0;i<mydataPro[mydataPro.length-1].length;i++){
        let data = mydataPro[mydataPro.length-1][i].item;
        if(barcode.value.includes(mydataPro[mydataPro.length-1][i].myItems.barcode)){
            barcode.value = '';
        }
    }
}
// function img

// read data
let mydataPro =[];
function showItems() {
    let tableItems= '';
    ipcRenderer.send('get-Data', 'bing')
    ipcRenderer.on('get-Data',(e,args)=>{

    
        const myData = JSON.parse(args)
        mydataPro.push(myData)
        

        tableItems= '';
        myData.map(mD=>{
            tableItems += `
                    <tr>
                        <td>${mD.myItems.barcode}</td>
                        <td>${mD.myItems.title}</td>
                        <td>${mD.myItems.color}</td>
                        <td>${mD.myItems.priceNight}</td>
                        <td>${mD.myItems.state}</td>
                        <td><img class='imgItems' onclick="viewImg('${mD._id}');" src="" /></td>
                        <td><button onclick="updateData('${mD._id}');">تعديل</button></td>
                        <td><button onclick="deleteData('${mD._id}');">حذف</button></td>
                    </tr>
                        
                `
        })
        document.querySelector('.tbodyItems').innerHTML = tableItems;

    })
    
}
showItems();

function viewImg(i) {
    console.log(i)
    document.querySelector('.View').style.display = 'block';
    // document.querySelector('.imgView').setAttribute('src',`${items[i].img}`)
}

function hideImg(){
    document.querySelector('.View').style.display = 'none';

}

function updateData(id) {
    document.querySelector('.inputs').style.display = 'block';
    tmp = id;
    for(let i=0;i<mydataPro[mydataPro.length-1].length; i++){
        if(mydataPro[mydataPro.length-1][i]._id === id){
            let allItems = mydataPro[mydataPro.length-1][i];
            barcode.value = allItems.myItems.barcode;
            title.value = allItems.myItems.title;
            color.value = allItems.myItems.color;
            priceNight.value = allItems.myItems.priceNight;
            itemsState.value = allItems.myItems.state;

        }
    }
    
    
    title.focus();
    scroll({
        top:0,
        behavior: "smooth",
    })
    create.innerHTML = 'تحديث';
    mood = 'update';

    
}
let tmpIdDelete;
function deleteData(id) {
    for(let x=0; x<users.length;x++){
        if(userName.innerHTML == users[x].user && (users[x].job == 'it' || users[x].job == 'مدير')){
            document.querySelector('.alarm').style.display = 'block';
            tmpIdDelete = id;
        }
    }

}
function checkPass(){
    ipcRenderer.send('delete-items',tmpIdDelete)
    window.location.reload();
    showItems();  
}

let searchBarcode = document.querySelector('#searchBarcode');
let searchMood = 'barcode';
let btnSearch = document.querySelector('#btnSearch');
let stateSearch = document.querySelector('#stateSearch');
let nameSearch = document.querySelector('#nameSearch');


function search(value) {
    let tableReserve = '';
        for(let i = 0; i < items.length; i++){
            if(items[i].barcode.includes(value.toLowerCase())){
                tableReserve += `
                    <tr>
                    <td>${i+1}</td>
                    <td><mark>${items[i].barcode}</mark></td>
                    <td>${items[i].title}</td>
                    <td>${items[i].color}</td>
                    <td>${items[i].priceNight}</td>
                    <td>${items[i].state}</td>
                    <td onclick="viewImg(${i});"><img src="${items[i].img}" /></td>
                    <td><button onclick="updateData(${i});">تعديل</button></td>
                    <td><button onclick="deleteData(${i});">حذف</button></td>
                        
                    </tr>
                `
                
            }else if(items[i].title.includes(value.toLowerCase())){
                    tableReserve += `
                        <tr>
                        <td>${i+1}</td>
                        <td>${items[i].barcode}</td>
                        <td><mark>${items[i].title}</mark></td>
                        <td>${items[i].color}</td>
                        <td>${items[i].priceNight}</td>
                        <td>${items[i].state}</td>
                        <td onclick="viewImg(${i});"><img src="${items[i].img}" /></td>
                        <td><button onclick="updateData(${i});">تعديل</button></td>
                        <td><button onclick="deleteData(${i});">حذف</button></td>
                            
                        </tr>
                    `
                    
            }else {
                if(items[i].color.includes(value.toLowerCase())){
                    tableReserve += `
                        <tr>
                        <td>${i+1}</td>
                        <td>${items[i].barcode}</td>
                        <td>${items[i].title}</td>
                        <td><mark>${items[i].color}</mark></td>
                        <td>${items[i].priceNight}</td>
                        <td>${items[i].state}</td>
                        <td onclick="viewImg(${i});"><img src="${items[i].img}" /></td>
                        <td><button onclick="updateData(${i});">تعديل</button></td>
                        <td><button onclick="deleteData(${i});">حذف</button></td>
                            
                        </tr>
                    `
                    
            }
        

        }
    }
    
    document.querySelector('.tbodyItems').innerHTML = tableReserve;

}



function exitePass(i) {
    window.location.reload();

}
