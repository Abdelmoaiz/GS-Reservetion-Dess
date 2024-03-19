// variable
const {ipcRenderer}=   require('electron')

let date = new Date();
let dateNow;


let nameMakeUp = document.querySelector('#nameMakeUp');
let idPersonalmakeUp = document.querySelector('#idPersonalmakeUp');
let phoneMakeUp = document.querySelector('#phoneMakeUp');
let numReserve = document.querySelector('#numReserve');
let dateReserve = document.querySelector('#dateReserve');
let nameReserve = document.querySelector('#nameReserve');
let typeMakeUp = document.querySelector('#typeMakeUp');
let priceMakeUp = document.querySelector('#priceMakeUp');
let paidMakeUp = document.querySelector('#paidMakeUp');
let remainMakeUp = document.querySelector('#remainMakeUp');

if(date.getMonth()+1 < 10 && date.getDate() < 10) {
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`;
}else if(date.getMonth()+1 < 10 && date.getDate() > 10){
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`;
}else if(date.getMonth()+1 > 10 && date.getDate() < 10){
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-0${date.getDate()}`;
}else{
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

let userName = document.querySelector('.userName');
let dateAndTime = document.querySelector('.dateAndTime');
userName.innerHTML = localStorage.getItem('userNameView');
dateAndTime.innerHTML =  dateNow;

let mood = 'create';
let tmp;

let users;
if(localStorage.allUsers != null){
    users = JSON.parse(localStorage.allUsers);
}else{
    users = []
}


function openInputsAdd(){
    document.querySelector('.addEmployee').style.display = "block";
    document.querySelector('.inputs').style.display = "none";
}





// create data

let employeesMakeUp = [];
let allReserve = [] ;

function getAllReserve(){
    let tableReserve= '';
    ipcRenderer.send('get-reserve', 'bing')
    ipcRenderer.on('get-reserve',(e,args)=>{
        const myReserve = JSON.parse(args)
        allReserve.push(myReserve)
    })

}
getAllReserve();

function getReserve(){
    for(let i=0; i<allReserve[allReserve.length-1].length;i++){
        for(let x=0; x<allReserve[allReserve.length-1][i].myReserve.length;x++){
            if(numReserve.value == allReserve[allReserve.length-1][i].myReserve[x].numReserve){
                numReserve.value = allReserve[allReserve.length-1][i].myReserve[x].numReserve;
                dateReserve.value = allReserve[allReserve.length-1][i].myReserve[x].startReserve;
                nameReserve.value = allReserve[allReserve.length-1][i].myReserve[x].nameReserve;
            }
        }
        
    }
}


function getPriceMakeUp(){
    remainMakeUp.value = priceMakeUp.value;
}
function calcRemainMakeUp(){
    remainMakeUp.value = +priceMakeUp.value - +paidMakeUp.value
}
let createEmplMakeUp = document.querySelector('.createEmplMakeUp');

createEmplMakeUp.addEventListener('click',e =>{
    let newMakeUp = '';
    if(nameMakeUp.value != '') {
        newMakeUp = {
            user: userName.innerHTML,
            date: dateNow,
            nameMakeUp: nameMakeUp.value,
            idPersonalmakeUp: idPersonalmakeUp.value,
            phoneMakeUp: phoneMakeUp.value,
            numReserve: numReserve.value,
            dateReserve: dateReserve.value,
            nameReserve: nameReserve.value,
            typeMakeUp: typeMakeUp.value,
            priceMakeUp:priceMakeUp.value,
            paidMakeUp: paidMakeUp.value,
            remainMakeUp:remainMakeUp.value
        }
        if(mood == 'create'){
            employeesMakeUp.push(newMakeUp);
            ipcRenderer.send('myEmployeesMakeUp',newMakeUp)
            window.location.reload();

        }else if(mood == 'update'){
            ipcRenderer.send('update-makeUp',{...newMakeUp, tmp})
            window.location.reload();

        }
        
    }
    showDetailsMakeUp()
    
})


function updateMakeUp(id){
    for(let i=0; i<employeesMakeUp[employeesMakeUp.length-1].length;i++){
        if(employeesMakeUp[employeesMakeUp.length-1][i]._id == id){
            let myEmployees = employeesMakeUp[employeesMakeUp.length-1][i].myEmployeesMakeUp;
            
            nameMakeUp.value = myEmployees.nameMakeUp;
            idPersonalmakeUp.value = myEmployees.idPersonalmakeUp; 
            phoneMakeUp.value = myEmployees.phoneMakeUp;
            numReserve.value = myEmployees.numReserve;
            dateReserve.value = myEmployees.dateReserve;
            nameReserve.value = myEmployees.nameReserve;
            typeMakeUp.value = myEmployees.typeMakeUp;
            priceMakeUp.value = myEmployees.priceMakeUp;
            paidMakeUp.value = myEmployees.paidMakeUp;
            remainMakeUp.value =  myEmployees.remainMakeUp;

            mood = 'update';

            nameMakeUp.focus();
            scroll({
                top:0,
                behavior: "smooth",
            })
            document.querySelector('.createEmplMakeUp').innerHTML = ' تحديث البيانات';
            tmp = id;
            



        }
    }
    

}
let tmpIdDelete;
function deletMakeUp(id){
    for(let x=0; x<users.length;x++){
        if(userName.innerHTML == users[x].user && (users[x].job == 'it' || users[x].job == 'مدير')){
            document.querySelector('.alarm').style.display = 'block';
            tmpIdDelete = id
        }
    }
    
}

function checkPass(){
    ipcRenderer.send('delete-makeUp',tmpIdDelete)
    window.location.reload();
    showDetailsMakeUp()
}

let tableMakeUp;

let totalPriceMakeUp = 0;
let totalPaidMakeUp = 0;
let totalRemainMakeUp = 0;

function showDetailsMakeUp(){
    tableMakeUp = '';

    ipcRenderer.send('get-makeUp', 'bing')
    ipcRenderer.on('get-makeUp',(e,args)=>{
        const myMakeUp = JSON.parse(args)
        employeesMakeUp.push(myMakeUp)
        tableMakeUp = '';
        myMakeUp.map(mK=>{
            totalPriceMakeUp += +mK.myEmployeesMakeUp.priceMakeUp;
            totalPaidMakeUp += +mK.myEmployeesMakeUp.paidMakeUp;
            totalRemainMakeUp += +mK.myEmployeesMakeUp.remainMakeUp;

            tableMakeUp += `
            <tr>
                <td>${mK.myEmployeesMakeUp.date}</td>
                <td>${mK.myEmployeesMakeUp.user}</td>
                <td>${mK.myEmployeesMakeUp.nameMakeUp}</td>
                <td>${mK.myEmployeesMakeUp.numReserve}</td>
                <td>${mK.myEmployeesMakeUp.dateReserve}</td>
                <td>${mK.myEmployeesMakeUp.nameReserve}</td>
                <td>${mK.myEmployeesMakeUp.typeMakeUp}</td>
                <td>${mK.myEmployeesMakeUp.priceMakeUp}</td>
                <td>${mK.myEmployeesMakeUp.paidMakeUp}</td>
                <td class='remainMakeUp'>${mK.myEmployeesMakeUp.remainMakeUp}</td>
                <td><button onclick="printReciept1('${mK._id}');">طباعة</button></td>
                <td><button onclick="updateMakeUp('${mK._id}');">تعديل</button></td>
                <td><button onclick="deletMakeUp('${mK._id}');">حذف</button></td>

            </tr>
            `
        })
        document.querySelector('.tbodyEmployeesMakeUP1').innerHTML = tableMakeUp;
        tableMakeUp += `
        <tr>
            <td colspan='7'>الاجمالي</td>
            <td>${totalPriceMakeUp}</td>
            <td>${totalPaidMakeUp}</td>
            <td class='remainMakeUp'>${totalRemainMakeUp}</td>
            <td colspan='3'></td>
        </tr>
            `
        document.querySelector('.tbodyEmployeesMakeUP1').innerHTML = tableMakeUp;
        totalPriceMakeUp = 0;
        totalPaidMakeUp = 0;
        totalRemainMakeUp = 0;

    })
    
    
    
}
showDetailsMakeUp();


document.querySelector('.viewSearchEmplMakeUp').onclick = function(){
    document.querySelector('.addEmployeeMakeUp').style.display = 'none';
    
    document.querySelector('.searchEmployeeMakeUp').style.display = 'block';

}
document.querySelector('.viewAddEmplMakeUp').onclick = function(){
    document.querySelector('.addEmployeeMakeUp').style.display = 'block';
    document.querySelector('.searchEmployeeMakeUp').style.display = 'none';

}

function printPage(){
    document.querySelector('.addEmployeeMakeUp').style.display = 'none';
    document.querySelector('.searchEmployeeMakeUp').style.display = 'none';
    document.querySelector('aside').style.display = 'none';
    document.querySelector('header').style.display = 'none';
    document.querySelector('.content').style.width = '100%';
    window.print();
    window.location.reload();

}


let wordSearch = document.querySelector('#wordSearch');

function searchMakeName(value){
    document.querySelector('.tableAllEmployees1').style.display = 'none';
    document.querySelector('.tableAllEmployees2').style.display = 'block';

    tableMakeUp = '';

    for(let i=0; i<employeesMakeUp[employeesMakeUp.length-1].length;i++){
        if(value == employeesMakeUp[employeesMakeUp.length-1][i].myEmployeesMakeUp.nameMakeUp){

            let data = employeesMakeUp[employeesMakeUp.length-1][i].myEmployeesMakeUp;
            totalPriceMakeUp += +data.priceMakeUp;
            totalPaidMakeUp += +data.paidMakeUp;
            totalRemainMakeUp += +data.remainMakeUp;
            tableMakeUp += `
                <tr>
                    <td>${i+1}</td>
                    <td>${data.date}</td>
                    <td>${data.user}</td>
                    <td>${data.nameMakeUp}</td>
                    <td>${data.numReserve}</td>
                    <td>${data.dateReserve}</td>
                    <td>${data.nameReserve}</td>
                    <td>${data.typeMakeUp}</td>
                    <td>${data.priceMakeUp}</td>
                    <td>${data.paidMakeUp}</td>
                    <td class='remainMakeUp'>${data.remainMakeUp}</td>
                    <td><button onclick="printReciept2(${i});">طباعة</button></td>
                    <td><button onclick="updateMakeUp(${i});">تعديل</button></td>
                    <td><button onclick="deletMakeUp(${i});">حذف</button></td>
                    `

        }else{

        }

        
    }
    tableMakeUp += `
        <tr>
            <td colspan='8'>الاجمالي</td>
            <td>${totalPriceMakeUp}</td>
            <td>${totalPaidMakeUp}</td>
            <td class='remainMakeUp'>${totalRemainMakeUp}</td>
            <td colspan='3'></td>
        </tr>
        `
    document.querySelector('.tbodyEmployeesMakeUP2').innerHTML = tableMakeUp;
    totalPriceMakeUp = 0;
    totalPaidMakeUp = 0;
    totalRemainMakeUp = 0;
   
}


function printReciept1(id){
    for(let i=0; i<employeesMakeUp[employeesMakeUp.length-1].length;i++){
        if(employeesMakeUp[employeesMakeUp.length-1][i]._id == id){
            let data = employeesMakeUp[employeesMakeUp.length-1][i].myEmployeesMakeUp;

            document.querySelector('.content').style.display = 'none';
            document.querySelector('header').style.display = 'none';
            document.querySelector('aside').style.display = 'none';
        
            document.querySelector('.receipt').style.display = 'block';
        
            document.querySelectorAll('.receiptMakeUpName')[0].innerHTML = data.nameMakeUp;
            document.querySelectorAll('.receiptMakeUpName')[1].innerHTML = data.nameMakeUp;
        
            document.querySelectorAll('.receiptUserName')[0].innerHTML = data.user;
            document.querySelectorAll('.receiptUserName')[1].innerHTML = data.user;
            
            document.querySelectorAll('.receiptDateReserve')[0].innerHTML = data.dateReserve;
            document.querySelectorAll('.receiptDateReserve')[1].innerHTML = data.dateReserve;
        
            document.querySelectorAll('.receiptNumReserve')[0].innerHTML = data.numReserve;
            document.querySelectorAll('.receiptNumReserve')[1].innerHTML = data.numReserve;
        
        
            document.querySelectorAll('.receiptNamePers')[0].innerHTML = data.nameReserve;
            document.querySelectorAll('.receiptNamePers')[1].innerHTML = data.nameReserve;
        
            document.querySelectorAll('.receiptItems')[0].innerHTML = data.typeMakeUp;
            document.querySelectorAll('.receiptItems')[1].innerHTML = data.typeMakeUp;
        
            
        
            document.querySelectorAll('.receiptPriceItems')[0].innerHTML = data.priceMakeUp;
            document.querySelectorAll('.receiptPriceItems')[1].innerHTML = data.priceMakeUp;
        
            document.querySelectorAll('.receiptPaid')[0].innerHTML = +data.paidMakeUp;
            document.querySelectorAll('.receiptPaid')[1].innerHTML = +data.paidMakeUp;
        
            document.querySelectorAll('.receiptRemain')[0].innerHTML = data.remainMakeUp;
            document.querySelectorAll('.receiptRemain')[1].innerHTML = data.remainMakeUp;
        
            document.querySelectorAll('.receiptDateNow')[0].innerHTML = data.date;
            document.querySelectorAll('.receiptDateNow')[1].innerHTML = data.date;
        
            document.querySelectorAll('.receiptRecieve')[0].innerHTML = data.user;
            document.querySelectorAll('.receiptRecieve')[1].innerHTML = data.user;
        
            window.print();
            window.location.reload();

        }


    }

   
}

function printReciept2(i){
    // console.log(employeesMakeUp[employeesMakeUp.length-1][i].myEmployeesMakeUp)
    let data = employeesMakeUp[employeesMakeUp.length-1][i].myEmployeesMakeUp;

    document.querySelector('.content').style.display = 'none';
    document.querySelector('header').style.display = 'none';
    document.querySelector('aside').style.display = 'none';

    document.querySelector('.receipt').style.display = 'block';

    document.querySelectorAll('.receiptMakeUpName')[0].innerHTML = data.nameMakeUp;
    document.querySelectorAll('.receiptMakeUpName')[1].innerHTML = data.nameMakeUp;

    document.querySelectorAll('.receiptUserName')[0].innerHTML = data.user;
    document.querySelectorAll('.receiptUserName')[1].innerHTML = data.user;
    
    document.querySelectorAll('.receiptDateReserve')[0].innerHTML = data.dateReserve;
    document.querySelectorAll('.receiptDateReserve')[1].innerHTML = data.dateReserve;

    document.querySelectorAll('.receiptNumReserve')[0].innerHTML = data.numReserve;
    document.querySelectorAll('.receiptNumReserve')[1].innerHTML = data.numReserve;


    document.querySelectorAll('.receiptNamePers')[0].innerHTML = data.nameReserve;
    document.querySelectorAll('.receiptNamePers')[1].innerHTML = data.nameReserve;

    document.querySelectorAll('.receiptItems')[0].innerHTML = data.typeMakeUp;
    document.querySelectorAll('.receiptItems')[1].innerHTML = data.typeMakeUp;

    

    document.querySelectorAll('.receiptPriceItems')[0].innerHTML = data.priceMakeUp;
    document.querySelectorAll('.receiptPriceItems')[1].innerHTML = data.priceMakeUp;

    document.querySelectorAll('.receiptPaid')[0].innerHTML = +data.paidMakeUp;
    document.querySelectorAll('.receiptPaid')[1].innerHTML = +data.paidMakeUp;

    document.querySelectorAll('.receiptRemain')[0].innerHTML = data.remainMakeUp;
    document.querySelectorAll('.receiptRemain')[1].innerHTML = data.remainMakeUp;

    document.querySelectorAll('.receiptDateNow')[0].innerHTML = data.date;
    document.querySelectorAll('.receiptDateNow')[1].innerHTML = data.date;

    document.querySelectorAll('.receiptRecieve')[0].innerHTML = data.user;
    document.querySelectorAll('.receiptRecieve')[1].innerHTML = data.user;

    window.print();
    window.location.reload();
}
document.querySelector('.receipt').onclick = function(){
    document.querySelector('.receipt').style.display = 'none';
    document.querySelector('.content').style.display = 'block';
    document.querySelector('header').style.display = 'flex';
    document.querySelector('aside').style.display = 'block';


}

function exitePass(){
    window.location.reload();
}

function refresh(){
    window.location.reload();
}
