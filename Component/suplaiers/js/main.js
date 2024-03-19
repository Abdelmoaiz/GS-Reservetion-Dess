// variable
const {ipcRenderer}=   require('electron')


let date = new Date();
let dateNow;



if(date.getMonth()+1 < 10 && date.getDate() < 10) {
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`;
}else if(date.getMonth()+1 < 10 && date.getDate() > 10){
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`;
}else if(date.getMonth()+1 > 10 && date.getDate() < 10){
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-0${date.getDate()}`;
}else{
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

// expensesDate.value = dateOtherExp.value = dateNow;
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












// function printReciept(i){
    
//     document.querySelector('.content').style.display = 'none';
//     document.querySelector('header').style.display = 'none';
//     document.querySelector('aside').style.display = 'none';

//     document.querySelector('.receipt').style.display = 'block';

//     // document.querySelectorAll('.receiptMakeUpName')[0].innerHTML = employeesMakeUp[i].nameMakeUp;
//     // document.querySelectorAll('.receiptMakeUpName')[1].innerHTML = employeesMakeUp[i].nameMakeUp;

//     // document.querySelectorAll('.receiptUserName')[0].innerHTML = employeesMakeUp[i].user;
//     // document.querySelectorAll('.receiptUserName')[1].innerHTML = employeesMakeUp[i].user;
    
//     // document.querySelectorAll('.receiptDateReserve')[0].innerHTML = employeesMakeUp[i].dateReserve;
//     // document.querySelectorAll('.receiptDateReserve')[1].innerHTML = employeesMakeUp[i].dateReserve;

//     // document.querySelectorAll('.receiptNumReserve')[0].innerHTML = employeesMakeUp[i].numReserve;
//     // document.querySelectorAll('.receiptNumReserve')[1].innerHTML = employeesMakeUp[i].numReserve;


//     // document.querySelectorAll('.receiptNamePers')[0].innerHTML = employeesMakeUp[i].nameReserve;
//     // document.querySelectorAll('.receiptNamePers')[1].innerHTML = employeesMakeUp[i].nameReserve;

//     // document.querySelectorAll('.receiptItems')[0].innerHTML = employeesMakeUp[i].typeMakeUp;
//     // document.querySelectorAll('.receiptItems')[1].innerHTML = employeesMakeUp[i].typeMakeUp;

    

//     // document.querySelectorAll('.receiptPriceItems')[0].innerHTML = employeesMakeUp[i].priceMakeUp;
//     // document.querySelectorAll('.receiptPriceItems')[1].innerHTML = employeesMakeUp[i].priceMakeUp;

//     // document.querySelectorAll('.receiptPaid')[0].innerHTML = +employeesMakeUp[i].paidMakeUp;
//     // document.querySelectorAll('.receiptPaid')[1].innerHTML = +employeesMakeUp[i].paidMakeUp;

//     // document.querySelectorAll('.receiptRemain')[0].innerHTML = employeesMakeUp[i].remainMakeUp;
//     // document.querySelectorAll('.receiptRemain')[1].innerHTML = employeesMakeUp[i].remainMakeUp;

//     // document.querySelectorAll('.receiptDateNow')[0].innerHTML = employeesMakeUp[i].date;
//     // document.querySelectorAll('.receiptDateNow')[1].innerHTML = employeesMakeUp[i].date;

//     // document.querySelectorAll('.receiptRecieve')[0].innerHTML = employeesMakeUp[i].user;
//     // document.querySelectorAll('.receiptRecieve')[1].innerHTML = employeesMakeUp[i].user;

//     window.print();
// }
document.querySelector('.receipt').onclick = function(){
    document.querySelector('.receipt').style.display = 'none';
    document.querySelector('.content').style.display = 'block';
    document.querySelector('header').style.display = 'flex';
    document.querySelector('aside').style.display = 'block';


}
// suppliers

let nameSuppliers = document.querySelector('#nameSuppliers');
let idPersonalSuppliers = document.querySelector('#idPersonalSuppliers');
let phoneSuppliers = document.querySelector('#phoneSuppliers');
let typeItems = document.querySelector('#typeItems');
let numItems = document.querySelector('#numItems');
let priceItems = document.querySelector('#priceItems');
let Totalprice = document.querySelector('#Totalprice');
let paidSuppliers = document.querySelector('#paidSuppliers');
let remainSuppliers = document.querySelector('#remainSuppliers');
let moodSuppliers = 'create';
let tmpSuppliers;

let suppliers =[];
// if(localStorage.mySuppliers != null){
//     suppliers = JSON.parse(localStorage.mySuppliers)
// }else{
//     suppliers =[];
// }
function getTotalSupp(){
    Totalprice.value = +numItems.value * +priceItems.value
}
function getPriceSuppliers(){
    remainSuppliers.value = Totalprice.value;
}
function calcRemainSuppliers(){
    remainSuppliers.value = +Totalprice.value - +paidSuppliers.value
}
let createSuppliers = document.querySelector('.createSuppliers');

createSuppliers.addEventListener('click',e =>{
    let newSuppliers = '';
    if(nameSuppliers.value != '') {
        newSuppliers = {
            user: userName.innerHTML,
            date: dateNow,
            nameSuppliers: nameSuppliers.value,
            idPersonalSuppliers: idPersonalSuppliers.value,
            phoneSuppliers: phoneSuppliers.value,
            typeItems: typeItems.value,
            Totalprice:Totalprice.value,
            paidSuppliers: paidSuppliers.value,
            remainSuppliers:remainSuppliers.value
        }
        if(mood == 'create'){
            ipcRenderer.send('mySuppliers',newSuppliers)
            window.location.reload();


        }else if(mood == 'update'){
            ipcRenderer.send('update-suppliers',{...newSuppliers, tmp})
            window.location.reload();

        }
        
    }
    
    showDetailsSuppliers();
    
})

function updateSuppliers(id){
    for(let i=0; i<suppliers[suppliers.length-1].length;i++){
        if(suppliers[suppliers.length-1][i]._id == id){
            let data = suppliers[suppliers.length-1][i].mySuppliers;
            nameSuppliers.value = data.nameSuppliers;
            idPersonalSuppliers.value = data.idPersonalSuppliers;
            phoneSuppliers.value = data.phoneSuppliers;
            typeItems.value = data.typeItems;
            Totalprice.value = data.Totalprice;
            paidSuppliers.value = data.paidSuppliers;
            remainSuppliers.value =  data.remainSuppliers;
            mood = 'update';
            nameSuppliers.focus();
            scroll({
                top:0,
                behavior: "smooth",
            })
            document.querySelector('.createSuppliers').innerHTML = 'تحديث البيانات';
            tmp = id;
        }
    }
   

}
let tmpIdDelete;
function deletSuppliers(id){
    for(let x=0; x<users.length;x++){
        if(userName.innerHTML == users[x].user && (users[x].job == 'it' || users[x].job == 'مدير')){
            document.querySelector('.alarm').style.display = 'block';
            tmpIdDelete = id;
        }
    }
}
function checkPass(){
    ipcRenderer.send('delete-suppliers',tmpIdDelete)
    window.location.reload();
    showDetailsSuppliers();
}

function exitePass(){
    window.location.reload();
}


let tableSuppliers;
let totalPriceSuppliers = 0;
let totalPaidSuppliers = 0;
let totalRemainSuppliers = 0;

function showDetailsSuppliers(){
    tableSuppliers = '';
    ipcRenderer.send('get-suppliers', 'bing')
    ipcRenderer.on('get-suppliers',(e,args)=>{
        const mySuppliers = JSON.parse(args)
        suppliers.push(mySuppliers)
        tableSuppliers = '';
        mySuppliers.map(mS=>{
            totalPriceSuppliers += +mS.mySuppliers.Totalprice;
            totalPaidSuppliers += +mS.mySuppliers.paidSuppliers;
            totalRemainSuppliers += +mS.mySuppliers.remainSuppliers;

            tableSuppliers += `
            <tr>
                <td>${mS.mySuppliers.date}</td>
                <td>${mS.mySuppliers.user}</td>
                <td>${mS.mySuppliers.nameSuppliers}</td>
                <td>${mS.mySuppliers.typeItems}</td>
                <td>${mS.mySuppliers.Totalprice}</td>
                <td>${mS.mySuppliers.paidSuppliers}</td>
                <td>${mS.mySuppliers.remainSuppliers}</td>
                <td><button onclick="updateSuppliers('${mS._id}');">تعديل</button></td>
                <td><button onclick="deletSuppliers('${mS._id}');">حذف</button></td>

            </tr>
            `
        })
        tableSuppliers += `
            <tr>
                <td colspan='4'>الاجمالي</td>
                <td>${totalPriceSuppliers}</td>
                <td>${totalPaidSuppliers}</td>
                <td class='remainMakeUp'>${totalRemainSuppliers}</td>
                <td colspan='3'></td>
            </tr>
                `
        document.querySelector('.tbodySuppliers').innerHTML = tableSuppliers;
        totalPriceSuppliers = 0;
        totalPaidSuppliers = 0;
        totalRemainSuppliers = 0;
    })
   
}
showDetailsSuppliers();




function colorRemainSuppliers(){
    let textRemainSuppliers = document.querySelectorAll('.remainSuppliers');
    for(let i=0;i<textRemainSuppliers.length; i++){
        if(textRemainSuppliers[i].innerHTML < 0 ){
            textRemainSuppliers[i].style.color = 'red';
        }else if(textRemainSuppliers[i].innerHTML > 0 ){
            textRemainSuppliers[i].style.color = 'green';

        }
    }
    
}
colorRemainSuppliers();



document.querySelector('.viewSearchSuppliers').onclick = function(){
    document.querySelector('.addSuppliers').style.display = 'none';
    
    document.querySelector('.searchSuppliers').style.display = 'block';

}
document.querySelector('.viewAddSuppliers').onclick = function(){
    document.querySelector('.addSuppliers').style.display = 'block';
    document.querySelector('.searchSuppliers').style.display = 'none';

}

function printPage(){
    document.querySelector('.addSuppliers').style.display = 'none';
    document.querySelector('.searchSuppliers').style.display = 'none';
    document.querySelector('aside').style.display = 'none';
    document.querySelector('header').style.display = 'none';
    document.querySelector('.content').style.width = '100%';
    window.print();
    window.location.reload();
}


let wordSearchSuppliers = document.querySelector('#wordSearchSuppliers');

function searchSuppliers(value){
    tableSuppliers = '';


    for(let i=0; i<suppliers[suppliers.length-1].length;i++){

        if(value.includes(suppliers[suppliers.length-1][i].mySuppliers.nameSuppliers) || value.includes(suppliers[suppliers.length-1][i].mySuppliers.date)){

            totalPriceSuppliers += +suppliers[suppliers.length-1][i].mySuppliers.Totalprice;
            totalPaidSuppliers += +suppliers[suppliers.length-1][i].mySuppliers.paidSuppliers;
            totalRemainSuppliers += +suppliers[suppliers.length-1][i].mySuppliers.remainSuppliers;

            tableSuppliers += `
            <tr>
                <td>${suppliers[suppliers.length-1][i].mySuppliers.date}</td>
                <td>${suppliers[suppliers.length-1][i].mySuppliers.user}</td>
                <td>${suppliers[suppliers.length-1][i].mySuppliers.nameSuppliers}</td>
                <td>${suppliers[suppliers.length-1][i].mySuppliers.typeItems}</td>
                <td>${suppliers[suppliers.length-1][i].mySuppliers.Totalprice}</td>
                <td>${suppliers[suppliers.length-1][i].mySuppliers.paidSuppliers}</td>
                <td>${suppliers[suppliers.length-1][i].mySuppliers.remainSuppliers}</td>
                <td><button onclick="printReciept(${i});">طباعة</button></td>
                <td><button onclick="updateSuppliers(${i});">تعديل</button></td>
                <td><button onclick="deletSuppliers(${i});">حذف</button></td>

            </tr>
            `
        }else{
            
        }
    }
    tableSuppliers += `
        <tr>
            <td colspan='4'>الاجمالي</td>
            <td>${totalPriceSuppliers}</td>
            <td>${totalPaidSuppliers}</td>
            <td class='remainMakeUp'>${totalRemainSuppliers}</td>
            <td colspan='3'></td>
        </tr>
            `
    document.querySelector('.tbodySuppliers').innerHTML = tableSuppliers;
    totalPriceSuppliers = 0;
    totalPaidSuppliers = 0;
    totalRemainSuppliers = 0;
        
    
        
        
        
    
    
}


function refresh(){
    window.location.reload();
}
