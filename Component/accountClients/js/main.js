// variable
const {ipcRenderer}=   require('electron')


let addSalary = document.querySelector('#createSalary');
let datePayroll = document.querySelector('#datePayroll');
let paidPay = document.querySelector('#salaryPay');
let inputSalary = document.querySelector('#inputSalary');

let nameEmployee = document.querySelector('#name')
let idPersonal = document.querySelector('#idPersonal')
let phone = document.querySelector('#phone')
let job = document.querySelector('#job')
let salary = document.querySelector('#salary')
let tmpEmpl;


let date = new Date();
let dateNow;

let numReserve = document.querySelector('#numReserve');
let dateReserve = document.querySelector('#dateReserve');
let nameReserve = document.querySelector('#nameReserve');


if(date.getMonth()+1 < 10 && date.getDate() < 10) {
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`;
}else if(date.getMonth()+1 < 10 && date.getDate() > 10){
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`;
}else if(date.getMonth()+1 > 10 && date.getDate() < 10){
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-0${date.getDate()}`;
}else{
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}
let monthNow;
if(date.getMonth()+1 < 10) {
    monthNow = `${date.getFullYear()}-0${date.getMonth()+1}`;
}else{
    monthNow = `${date.getFullYear()}-${date.getMonth()+1}`;
}

datePayroll.value = monthNow;

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
    document.querySelector('.inputsEmployees').style.display = "block";
    document.querySelector('.inputsSalary').style.display = "none";
}

let allSalary = [];
let optionItems; 
let selectEmployeeName = document.querySelector('#selectEmployeeName');

function addEmployee(){
    if((nameEmployee.value && idPersonal.value && job.value && salary.value) != '') {
        let newEmployees = {
            user: userName.innerHTML,
            date : dateNow,
            name: nameEmployee.value,
            idPersonal: idPersonal.value,
            phone: phone.value,
            job: job.value,
            salary: salary.value,
        }

        if(mood == 'create') {
           
            ipcRenderer.send('myEmployees',newEmployees)
            
            window.location.reload();


        }else{
            
            ipcRenderer.send('update-employees', {...newEmployees, tmpEmpl})
            mood = 'create';
            
            window.location.reload();

            
        }

    }

    showEmployees();
    
}

function updateEmployee(id) {
    for(let x=0; x<users.length;x++){
        if(userName.innerHTML == users[x].user && (users[x].job == 'it' || users[x].job == 'مدير')){
            document.querySelector('.addEmployee').style.display = "block";
            document.querySelector('.inputs').style.display = "none";
            tmpEmpl = id;
            for(let i=0;i<allEmployees[allEmployees.length-1].length; i++){
                if(allEmployees[allEmployees.length-1][i]._id === id){
                    let myEmployees = allEmployees[allEmployees.length-1][i].myEmployees;
    
                    nameEmployee.value = myEmployees.name;
                    idPersonal.value = myEmployees.idPersonal;
                    phone.value = myEmployees.phone;
                    job.value = myEmployees.job;
                    salary.value = myEmployees.salary;
                }
            nameEmployee.focus();
            scroll({
                top:0,
                behavior: "smooth",
            })
            mood = 'update';
            document.querySelector('.createEmpl').innerHTML = 'تحديث بيانات';
        }
        }
    }
       
 
}

let tmpIdDelete1;
function deleteEmployee(id){
    for(let x=0; x<users.length;x++){
        if(userName.innerHTML == users[x].user && (users[x].job == 'it' || users[x].job == 'مدير')){
            document.querySelector('.alarm1').style.display = 'block';
            tmpIdDelete1 = id;
        }
    }
}


function checkPass1(){
    ipcRenderer.send('delete-employees',id)
    window.location.reload();
    showEmployees();
}


let allEmployees = [];
function showEmployees() {
    let tableEmployees = '';

    ipcRenderer.send('get-employees', 'bing')
    ipcRenderer.on('get-employees',(e,args)=>{
        const myEmployees = JSON.parse(args);
        allEmployees.push(myEmployees);
        tableEmployees = '';
        optionItems = '';
        myEmployees.map(mE=>{
            tableEmployees += `
            <tr>
                <td>${mE.myEmployees.date}</td>
                <td>${mE.myEmployees.name}</td>
                <td>${mE.myEmployees.salary}</td>
                <td><button onclick="updateEmployee('${mE._id}');">تعديل</button></td>
                <td><button onclick="deleteEmployee('${mE._id}');">حذف</button></td>

            </tr>
            `
        optionItems += `
        <option>${mE.myEmployees.name}</option>
        `
        selectEmployeeName.innerHTML = optionItems;
        selectEmployeeName.value = optionItems;

         
        })
         
        document.querySelector('.tbodyEmployees').innerHTML = tableEmployees;
    })
}
showEmployees();


function selectEmpl(){
    for(let i=0; i< allEmployees[allEmployees.length-1].length; i++){
        if(selectEmployeeName.value == allEmployees[allEmployees.length-1][i].myEmployees.name){
            inputSalary.value = allEmployees[allEmployees.length-1][i].myEmployees.salary;            
        }
    }
   
}




// create data

let resultTotalPaid =0;

addSalary.onclick = function(){
    let newSalary = '';
    if((selectEmployeeName.value && paidPay.value) !== ""){
        newSalary = {
            user: userName.innerHTML,
            date: dateNow,
            name: selectEmployeeName.value,
            month: datePayroll.value,
            salary: inputSalary.value,
            paidPay: paidPay.value,
        }
        
        
        
        if(mood === 'create') {
            ipcRenderer.send('mySalary',newSalary)
            window.location.reload();

        }else if(mood == 'update'){
            ipcRenderer.send('update-salary', {...newSalary, tmp})
            window.location.reload();
    
        }

    }

    showAllSalary(); 
}

let tableSalary = '';
let resultSalary = 0;

function showAllSalary(){

    ipcRenderer.send('get-salary', 'bing')
    ipcRenderer.on('get-salary',(e,args)=>{
        const mySalary = JSON.parse(args)
        allSalary.push(mySalary)
        tableSalary = '';
        resultSalary = 0;
        mySalary.map(mS=>{
            if(mS.mySalary.month == monthNow){
                resultSalary += +mS.mySalary.paidPay;

                tableSalary += `
                <tr>
                    <td>${mS.mySalary.date}</td>
                    <td>${mS.mySalary.name}</td>
                    <td>${mS.mySalary.salary}</td>
                    <td>${mS.mySalary.month}</td>
                    <td>${mS.mySalary.paidPay}</td>
                    <td><button onclick="updateSalary('${mS._id}');">تعديل</button></td>
                    <td><button onclick="deleteSalary('${mS._id}');">حذف</button></td>
                </tr>
                
                `
            }
           
        })
        document.querySelector('.tbodySalarys1').innerHTML = tableSalary;
        tableSalary = '';
        resultSalary = 0;
    })
    
}
showAllSalary();

function updateSalary(id) {
    for(let x=0; x<users.length;x++){
        if(userName.innerHTML == users[x].user && (users[x].job == 'it' || users[x].job == 'مدير')){
            for(let i=0;i<allSalary[allSalary.length-1].length; i++){
                if(allSalary[allSalary.length-1][i]._id == id){
                    let data = allSalary[allSalary.length-1][i].mySalary;
                    selectEmployeeName.value = data.name;
                    inputSalary.value = data.salary
                    datePayroll.value = data.month;
                    paidPay.value = data.paidPay;
                    paidPay.focus();
                    scroll({
                        top:0,
                        behavior: "smooth",
                    })
                    mood = 'update';
                    tmp = id;
                    document.querySelector('#createSalary').innerHTML = 'تحديث البيانات'
                }
            } 
        }
    }
}
let tmpIdDelete2;
function deleteSalary(id){
    for(let x=0; x<users.length;x++){
        if(userName.innerHTML == users[x].user && (users[x].job == 'it' || users[x].job == 'مدير')){
            document.querySelector('.alarm2').style.display = 'block';
            tmpIdDelete2 = id;
        }
    }
}

function checkPass2(){
    ipcRenderer.send('delete-salary',tmpIdDelete2)
    window.location.reload();
    showAllSalary();
}

function searchSalary(){
    tableSalary = '';
    resultSalary = 0;

    document.querySelector('.tableSearch').style.display = 'block';
    document.querySelector('.tableSalary').style.display = 'none';

    for(let i=0; i<allSalary[allSalary.length-1].length;i++){
        let data = allSalary[allSalary.length-1][i].mySalary;
        if(selectEmployeeName.value == data.name && datePayroll.value == data.month){
            resultSalary += +data.paidPay;

            tableSalary += `
                <tr>
                    <td>${data.date}</td>
                    <td>${data.name}</td>
                    <td>${data.salary}</td>
                    <td>${data.month}</td>
                    <td>${data.paidPay}</td>
                    <td>${+data.salary - resultSalary}</td>
                </tr>
                
                `
        }
    }
    document.querySelector('.tbodySalarys2').innerHTML = tableSalary; 
    tableSalary = '';
    resultSalary = 0;
}

function returnpageEmployees(){
    document.querySelector('.tableDetailsEmployee').style.display = 'none';
    document.querySelector('.tableAllEmployees').style.display = 'block';
}

function printThisPage() {
    document.querySelector('header').style.display = 'none';
    document.querySelector('aside').style.display = 'none';
    document.querySelector('.content').style.width = '100%';
    document.querySelector('#addSalary').style.display = 'none';
    window.print();
    window.location.reload();
}
function exiteTable(){
    document.querySelector('.tablePrint').style.display = 'none';
    document.querySelector('.app').style.display = 'block';
}


function getReserve(){
    for(let i=0; i<reserve.length;i++){
        if(numReserve.value == reserve[i].numReserve){
            numReserve.value = reserve[i].numReserve;
            dateReserve.value = reserve[i].startReserve;
            nameReserve.value = reserve[i].nameReserve;
        }
    }
}









function refresh(){
    window.location.reload();
}


function exitePass(){
    window.location.reload();
}