const {ipcRenderer}=   require('electron')

let date = new Date();
let userName = document.querySelector('.userName');
let dateAndTime = document.querySelector('.dateAndTime');
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
userName.innerHTML = localStorage.getItem('userNameView');

let fromDate = document.querySelector('#fromDate');
let toDate = document.querySelector('#toDate');
let searchReports = document.querySelector('#searchReports');
dateAndTime.innerHTML = fromDate.value = toDate.value = dateNow;

function changDate(){
    toDate.value = fromDate.value
}

let tableExp = document.querySelector('.tableExpenses');
let tableSalary = document.querySelector('.tableSalary');
let tableImports = document.querySelector('.tableImports');
let tableSupp = document.querySelector('.tableSuppliers');
let tableMake = document.querySelector('.tableMakeUp');
let tableTotalReports = document.querySelector('.tableTotalReports');

function showAllReports(){
    tableExp.style.display = 'block';
    tableSalary.style.display = 'block';
    tableImports.style.display = 'block';
    tableSupp.style.display = 'block';
    tableMake.style.display = 'block';
    tableTotalReports.style.display = 'block';

}

function showReportsExpenses(){
    tableExp.style.display = 'block';
    tableSalary.style.display = 'none';
    tableImports.style.display = 'none';
    tableSupp.style.display = 'none';
    tableMake.style.display = 'none';
    tableTotalReports.style.display = 'none';

}
function showReportsSalary(){
    tableExp.style.display = 'none';
    tableSalary.style.display = 'block';
    tableImports.style.display = 'none';
    tableSupp.style.display = 'none';
    tableMake.style.display = 'none';
    tableTotalReports.style.display = 'none';

}

function showReportsImports(){
    tableExp.style.display = 'none';
    tableSalary.style.display = 'none';
    tableImports.style.display = 'block';
    tableSupp.style.display = 'none';
    tableMake.style.display = 'none';
    tableTotalReports.style.display = 'none';

}
function showReportsSuppliers(){
    tableExp.style.display = 'none';
    tableSalary.style.display = 'none';
    tableImports.style.display = 'none';
    tableSupp.style.display = 'block';
    tableMake.style.display = 'none';
    tableTotalReports.style.display = 'none';

}

function showReportsMakeUp(){
    tableExp.style.display = 'none';
    tableSalary.style.display = 'none';
    tableImports.style.display = 'none';
    tableSupp.style.display = 'none';
    tableMake.style.display = 'block';
    tableTotalReports.style.display = 'none';

}
function showTotalAllReports(){
    tableExp.style.display = 'none';
    tableSalary.style.display = 'none';
    tableImports.style.display = 'none';
    tableSupp.style.display = 'none';
    tableMake.style.display = 'none';
    tableTotalReports.style.display = 'block';

}
function returnback(){
    window.location.href = '../accountClients/index.html'
}


let totalReserve = 0;
let dateReserve;
let totalSuppliers = 0;
let totalSalary = 0;
let totalExpenses = 0;
let totalMakeup = 0;

let tableExpen;
let tableSala;

let resultSalary = 0;
let resultSalaryPaid = 0;
let resultSalaryRemain = 0;

let trTableRports =  document.querySelectorAll('.trTableRports');
let tableRports2;
let resultTotal = 0;
let resultPaid = 0;
let resultRemain = 0;
let tableMakeUp;
let totalPriceMakeUp = 0;
let totalPaidMakeUp = 0;
let totalRemainMakeUp = 0;
let tableSuppliers;


let newTableTotal;


let expenses;
if(localStorage.myExpenses != null){
    expenses = JSON.parse(localStorage.myExpenses)
}else{
    expenses = []
}

let allSalary;
if(localStorage.mySalary != null){
    allSalary = JSON.parse(localStorage.mySalary)
}else{
    allSalary = [];
}


function getDateNow(){
    toDate.value = fromDate.value;

}
getDateNow();

let employeesMakeUp;
if(localStorage.myEmployeesMakeUp != null){
    employeesMakeUp = JSON.parse(localStorage.myEmployeesMakeUp);
}else{
    employeesMakeUp = []; 
}


let suppliers;
if(localStorage.mySuppliers != null){
    suppliers = JSON.parse(localStorage.mySuppliers)
}else{
    suppliers =[];
}

let reserve  = [];
if(localStorage.myReserve != null){
    reserve = JSON.parse(localStorage.myReserve);
}else{
    reserve = []
}

setTimeout(() => {
    getReserve();
    getSuplaiers();
    getMakeUp();
    getExpenses();
    getAllSalary();
    searchReport();
    
}, 1);
function getReserve() {
    ipcRenderer.send('get-reserve', 'bing')
    ipcRenderer.on('get-reserve',(e,args)=>{
        const myReserve = JSON.parse(args)
        
        localStorage.setItem("myReserve", JSON.stringify(JSON.parse(args)))
    })
}


getReserve();

// get suplaiers
function getSuplaiers(){
    ipcRenderer.send('get-suppliers', 'bing')
    ipcRenderer.on('get-suppliers',(e,args)=>{
        const mySuppliers = JSON.parse(args);
        localStorage.setItem("mySuppliers", JSON.stringify(JSON.parse(args)))
    })
}
getSuplaiers();



// ger makeUp 
function getMakeUp(){
    ipcRenderer.send('get-makeUp', 'bing')
    ipcRenderer.on('get-makeUp',(e,args)=>{
        const myMakeUp = JSON.parse(args)
        localStorage.setItem("myEmployeesMakeUp", JSON.stringify(JSON.parse(args)))

    })
}
getMakeUp();


// get expenses
function getExpenses() {
    ipcRenderer.send('get-expenses', 'bing')
    ipcRenderer.on('get-expenses',(e,args)=>{
        const myExpenses = JSON.parse(args)
        localStorage.setItem("myExpenses", JSON.stringify(JSON.parse(args)))

        // expenses.push(myExpenses)

    })
}
getExpenses();


//get salary

function getAllSalary(){

    ipcRenderer.send('get-salary', 'bing')
    ipcRenderer.on('get-salary',(e,args)=>{
        const mySalary = JSON.parse(args)
        localStorage.setItem("mySalary", JSON.stringify(JSON.parse(args)))

    })
}
getAllSalary();


function searchReport() {
    let tableRports2 ='';
   
    for(let i=0; i<reserve.length; i++){
        for(let x=0; x< reserve[i].myReserve.length;x++){
            if(fromDate.value <= reserve[i].myReserve[x].date && toDate.value >= reserve[i].myReserve[x].date){
                dateReserve = fromDate.value;
                resultTotal += +reserve[i].myReserve[x].price;
                resultPaid += +reserve[i].myReserve[x].paid;
                resultRemain = +resultTotal - +resultPaid;

                totalReserve = resultPaid;
                tableRports2 +=
                `
                <tr class='trTableRports' >
                    <td></td>
                    <td>${reserve[i].myReserve[x].date}</td>
                    <td>${reserve[i].myReserve[x].user}</td>
                    <td>${reserve[i].myReserve[x].numReserve}</td>
                    <td>حجز ${reserve[i].myReserve[x].itemsDress + ' - ' + reserve[i].myReserve[x].itemsOthers}</td>
                    <td>${+reserve[i].myReserve[x].price}</td>
                    <td>${+reserve[i].myReserve[x].paid}</td>
                    <td>${+reserve[i].myReserve[x].price - +reserve[i].myReserve[x].paid}</td>
                </tr>
                `    
            }else{

            }
            

        }
                

            
        
    }

    

    tableRports2 += `
    <tr style='border:2px solid'>
        <th colspan='5' >الاجمالي</th>              
        <th >${resultTotal}</th>
        <th >${resultPaid}</th>
        <th >${resultRemain}</th>                
    </tr>
    `
    document.querySelector('.tbodyReports2').innerHTML = tableRports2;
    tableRports2 = '';

    resultTotal = 
    resultPaid = 
    resultRemain = 0;
    
    tableRports2 ='';

    let totalPriceSuppliers = 0;
    let totalPaidSuppliers = 0;
    let totalRemainSuppliers = 0;
    tableSuppliers = '';
    for(let i=0; i<suppliers.length; i++){
        if(fromDate.value <= suppliers[i].mySuppliers.date && toDate.value >= suppliers[i].mySuppliers.date){
            totalPriceSuppliers += +suppliers[i].mySuppliers.Totalprice;
            totalPaidSuppliers += +suppliers[i].mySuppliers.paidSuppliers;
            totalRemainSuppliers += +suppliers[i].mySuppliers.remainSuppliers;
            totalSuppliers = totalPaidSuppliers;

            tableSuppliers += `
            <tr>
                <td>${i+1}</td>
                <td>${suppliers[i].mySuppliers.date}</td>
                <td>${suppliers[i].mySuppliers.user}</td>
                <td>${suppliers[i].mySuppliers.nameSuppliers}</td>
                <td>${suppliers[i].mySuppliers.typeItems}</td>
                <td>${suppliers[i].mySuppliers.Totalprice}</td>
                <td>${suppliers[i].mySuppliers.paidSuppliers}</td>
                <td class='remainSuppliers'>${suppliers[i].mySuppliers.remainSuppliers}</td>
            </tr>
            `
            
        }else{
            tableSuppliers = '';
        }
        
        

    }
    tableSuppliers += `
                <tr>
                    <th colspan='5' >الاجمالي</th>              
                    
                    <td>${totalPriceSuppliers}</td>
                    <td>${totalPaidSuppliers}</td>
                    <td class='remainSuppliers'>${totalRemainSuppliers}</td>
                    

                </tr>
            `
    document.querySelector('.tbodySuppliers').innerHTML = tableSuppliers;
    tableSuppliers = '';

    tableMakeUp = '';
    for(let i=0; i<employeesMakeUp.length; i++){
        if(fromDate.value <= employeesMakeUp[i].myEmployeesMakeUp.date && toDate.value >= employeesMakeUp[i].myEmployeesMakeUp.date){
            totalPriceMakeUp = employeesMakeUp[i].myEmployeesMakeUp.priceMakeUp;
            totalPaidMakeUp = employeesMakeUp[i].myEmployeesMakeUp.paidMakeUp;
            totalRemainMakeUp = employeesMakeUp[i].myEmployeesMakeUp.remainMakeUp;
            totalMakeup = totalPaidMakeUp;
            tableMakeUp += `

                    <tr>
                        <td>${i+1}</td>
                        <td>${employeesMakeUp[i].myEmployeesMakeUp.date}</td>
                        <td>${employeesMakeUp[i].myEmployeesMakeUp.user}</td>
                        <td>${employeesMakeUp[i].myEmployeesMakeUp.nameMakeUp}</td>
                        <td>${employeesMakeUp[i].myEmployeesMakeUp.numReserve}</td>
                        <td>${employeesMakeUp[i].myEmployeesMakeUp.dateReserve}</td>
                        <td>${employeesMakeUp[i].myEmployeesMakeUp.nameReserve}</td>
                        <td>${employeesMakeUp[i].myEmployeesMakeUp.typeMakeUp}</td>
                        <td>${employeesMakeUp[i].myEmployeesMakeUp.priceMakeUp}</td>
                        <td>${employeesMakeUp[i].myEmployeesMakeUp.paidMakeUp}</td>
                        <td class='remainMakeUp'>${employeesMakeUp[i].myEmployeesMakeUp.remainMakeUp}</td>
                        

                    </tr>
                `

        }else{
            // tableMakeUp = '';
        }
    }
    tableMakeUp += `
            <tr>
                <td colspan='8'>الاجمالي</td>
                <td>${totalPriceMakeUp}</td>
                <td>${totalPaidMakeUp}</td>
                <td class='remainMakeUp'>${totalRemainMakeUp}</td>
            </tr>
        `
    document.querySelector('.tbodyEmployeesMakeUP').innerHTML = tableMakeUp;
    tableMakeUp = '';

    tableSala = '';
    let totalSala = 0;
    for(let i=0; i< allSalary.length; i++){
        if(fromDate.value <= allSalary[i].mySalary.date && toDate.value >= allSalary[i].mySalary.date){
            totalSala += +allSalary[i].mySalary.paidPay;
            totalSalary = totalSala;
            tableSala += `
                <tr>
                    <td>${i+1}</td>
                    <td>${allSalary[i].mySalary.date}</td>
                    <td>${allSalary[i].mySalary.name}</td>
                    <td>${allSalary[i].mySalary.month}</td>
                    <td>${allSalary[i].mySalary.salary}</td>
                    <td>${allSalary[i].mySalary.paidPay}</td>
                </tr>
            `

           
            
        }else{
            tableSala ='';
        }

    }
    tableSala += `
            <tr>
                <td colspan='5'>الاجمالي</td>
                <td>${totalSala}</td>
            </tr>
             `
    document.querySelector('.tbodySalarys').innerHTML = tableSala;
    tableSala = '';
    tableExpen ='';
    let totalExpen = 0;
    for(let i = 0; i < expenses.length; i++){
        if(fromDate.value <= expenses[i].myExpenses.expensesDate && toDate.value >= expenses[i].myExpenses.expensesDate){
            totalExpen += +expenses[i].myExpenses.price;
            totalExpenses = totalExpen
            tableExpen += `
                <tr>
                    <td>${i+1}</td>
                    <td>${expenses[i].myExpenses.expensesDate}</td>
                    <td>${expenses[i].myExpenses.user}</td>
                    <td>${expenses[i].myExpenses.expensesType}</td>
                    <td>${expenses[i].myExpenses.price}</td>
                </tr>
            `
        }else{

            tableExpen = '';

        }
        
        
    }
    tableExpen += `
                <tr>
                    <td colspan='4'>الاجمالي</td>
                    <td>${totalExpen}</td>
                </tr>
            `
    document.querySelector('.tbodyReportsExpen').innerHTML = tableExpen;

           
    showTotalReserve();
}
let tableTotal;
function showTotalReserve(){
    let totalAllExport =0;
    totalAllExport = +totalMakeup + +totalSuppliers + +totalExpenses + +totalSalary;

    tableTotal = '';

    tableTotal += `
    <tr>
        <td>${dateReserve}</td>
        <td> ايرادات</td>
        <td>-</td>
        <td class='colorGreen'>${totalReserve}</td>
    </tr>
    <tr>
        <td>${dateReserve}</td>
        <td>مرتبات</td>
        <td class='colorRed'>${totalSalary}</td>
        <td>-</td>

    </tr>
    <tr>
        <td>${dateReserve}</td>
        <td>مصرفات</td>
        <td class='colorRed'>${totalExpenses}</td>
        <td>-</td>

    </tr>
    <tr>
        <td>${dateReserve}</td>
        <td>واصل موظفي الميكب</td>
        <td class='colorRed'>${totalMakeup}</td>
        <td>-</td>

    </tr>
    <tr>
        <td>${dateReserve}</td>
        <td>واصل الموردين</td>
        <td class='colorRed'>${totalSuppliers}</td>
        <td>-</td>

    </tr>
   
    <tr>
        <td colspan='2'>الاجمالي</td>
        
        <td colspan='2' class='colorTotal'>${+totalReserve - +totalAllExport}</td>
    </tr>
    `

    document.querySelector('.tbodyTotalReports').innerHTML = tableTotal;
    showColorTotal();
    totalReserve =
    totalAllExport =
    totalMakeup =
    totalSuppliers = 
    totalExpenses = 
    totalSalary = 0;
    tableTotal = '';

}
searchReport();

function showColorTotal(){
    if(document.querySelector('.colorTotal').innerHTML < 0){
        document.querySelector('.colorTotal').style.color = 'red';
    }else{
        document.querySelector('.colorTotal').style.color = 'green';

    }
    
}

let fromD = '2023-07-10';
let toD = '2023-07-30';




function printReport(){
    document.querySelector('.inputs').style.display = 'none';
    document.querySelector('header').style.display = 'none';
    document.querySelector('aside').style.display = 'none';
    document.querySelector('.content').style.width = '100%';
    document.querySelector('.cancel').style.display = 'block';
    window.print();
}

function refresh(){
    window.location.reload();
}