// variable
const {ipcRenderer}=   require('electron')

let barcode = document.querySelector('#barcode');
let title = document.querySelector('#title');
let color = document.querySelector('#color');
let quantity = document.querySelector('#quantity');
let priceNight = document.querySelector('#priceNight');
let itemsState = document.querySelector('#itemsState');
let create = document.querySelector('#create');
let expensesDetails = document.querySelector("#expensesDetails");
let price = document.querySelector("#price");
let expensesType = document.querySelector("#expensesType");
let expensesDate = document.querySelector("#expensesDate");
let dateOtherExp = document.querySelector("#dateOtherExp");
let otherExpenses = document.querySelector("#otherExpenses");
let otherPrice = document.querySelector("#otherPrice");
let otherDetails = document.querySelector("#otherDetails");

let addSalary = document.querySelector('#addSalary');
let employeeName = document.querySelector('#employeeName');
let datePayroll = document.querySelector('#datePayroll');
let month = document.querySelector('#month');
let paidPay = document.querySelector('#salaryPay');
let inputSalary = document.querySelector('#inputSalary');
let inputremain = document.querySelector('#inputremain');

let nameEmployee = document.querySelector('#name')
let idPersonal = document.querySelector('#idPersonal')
let phone = document.querySelector('#phone')
let job = document.querySelector('#job')
let salary = document.querySelector('#salary')
let tmpEmpl;
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


let users;
if(localStorage.allUsers != null){
    users = JSON.parse(localStorage.allUsers);
}else{
    users = []
}

expensesDate.value =  dateNow;
let userName = document.querySelector('.userName');
let dateAndTime = document.querySelector('.dateAndTime');
userName.innerHTML = localStorage.getItem('userNameView');
dateAndTime.innerHTML =  dateNow;

let mood = 'create';
let tmp;

function showInputs1(){
    document.querySelector(".inputsSalary").style.display = "block";
    document.querySelector(".inputsexpenses").style.display = "none";
    document.querySelector(".inputsOther").style.display = "none";
}





let expenses = []

function createExpenses() {
    if(expensesDate.value != '' && expensesType.value != '' && price.value != ''){
        let  newExpenses = {
            expensesDate:expensesDate.value,
            user: userName.innerHTML,
            expensesType:expensesType.value,
            price:price.value,
            expensesDetails: expensesDetails.value
        }
        if(mood == 'create'){
            expenses.push(newExpenses)
            ipcRenderer.send('myExpenses',newExpenses)

        }else{
            ipcRenderer.send('update-expenses', {...newExpenses, tmp})
        }
    }
    showExpenses();
}




function showExpenses() {
    let tableExpenses = '';
    ipcRenderer.send('get-expenses', 'bing')
    ipcRenderer.on('get-expenses',(e,args)=>{
        const myExpenses = JSON.parse(args)
        expenses.push(myExpenses)
        tableExpenses = '';
        myExpenses.map(mEx=>{
            tableExpenses += `
            <tr>
                <td>${mEx.myExpenses.expensesDate}</td>
                <td>${mEx.myExpenses.expensesType}</td>
                <td>${mEx.myExpenses.price}</td>
                <td>${mEx.myExpenses.expensesDetails}</td>
                <td><button onclick="updateData('${mEx._id}');">تعديل</button></td>
                <td><button onclick="deleteData('${mEx._id}');">حذف</button></td>
            </tr>
        `
        })
        document.querySelector('.tbodyExpenses').innerHTML = tableExpenses;

    })

   
    
}
showExpenses();






function updateData(id) {
    
    document.querySelector('.inputs').style.display = 'block';
    tmp = id;
    for(let i=0;i<expenses[expenses.length-1].length; i++){
        if(expenses[expenses.length-1][i]._id === id){
            let allExpenses = expenses[expenses.length-1][i].myExpenses;
            expensesType.value = allExpenses.expensesType;
            expensesDate.value = allExpenses.expensesDate;
            price.value = allExpenses.price;
            expensesDetails.value = allExpenses.expensesDetails;
        }
    
    }
    
    expensesType.focus();
    scroll({
        top:0,
        behavior: "smooth",
    })
    create.innerHTML = 'تحديث البيانات';
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
    ipcRenderer.send('delete-expenses',tmpIdDelete)
    window.location.reload();
    showExpenses();
}

function exitePass(){
    window.location.reload();
}

function refresh(){
    window.location.reload();
}
