const{ipcRenderer:ipcRenderer}=require("electron");let dateNow,date=new Date,userName=document.querySelector(".userName"),dateAndTime=document.querySelector(".dateAndTime");dateNow=date.getMonth()+1<10&&date.getDate()<10?`${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`:date.getMonth()+1<10&&date.getDate()>10?`${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`:date.getMonth()+1>10&&date.getDate()<10?`${date.getFullYear()}-${date.getMonth()+1}-0${date.getDate()}`:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,userName.innerHTML=localStorage.getItem("userNameView");let fromDate=document.querySelector("#fromDate"),toDate=document.querySelector("#toDate"),searchReports=document.querySelector("#searchReports");function changDate(){toDate.value=fromDate.value}dateAndTime.innerHTML=fromDate.value=toDate.value=dateNow;let tableExp=document.querySelector(".tableExpenses"),tableSalary=document.querySelector(".tableSalary"),tableImports=document.querySelector(".tableImports"),tableSupp=document.querySelector(".tableSuppliers"),tableMake=document.querySelector(".tableMakeUp"),tableTotalReports=document.querySelector(".tableTotalReports");function showAllReports(){tableExp.style.display="block",tableSalary.style.display="block",tableImports.style.display="block",tableSupp.style.display="block",tableMake.style.display="block",tableTotalReports.style.display="block"}function showReportsExpenses(){tableExp.style.display="block",tableSalary.style.display="none",tableImports.style.display="none",tableSupp.style.display="none",tableMake.style.display="none",tableTotalReports.style.display="none"}function showReportsSalary(){tableExp.style.display="none",tableSalary.style.display="block",tableImports.style.display="none",tableSupp.style.display="none",tableMake.style.display="none",tableTotalReports.style.display="none"}function showReportsImports(){tableExp.style.display="none",tableSalary.style.display="none",tableImports.style.display="block",tableSupp.style.display="none",tableMake.style.display="none",tableTotalReports.style.display="none"}function showReportsSuppliers(){tableExp.style.display="none",tableSalary.style.display="none",tableImports.style.display="none",tableSupp.style.display="block",tableMake.style.display="none",tableTotalReports.style.display="none"}function showReportsMakeUp(){tableExp.style.display="none",tableSalary.style.display="none",tableImports.style.display="none",tableSupp.style.display="none",tableMake.style.display="block",tableTotalReports.style.display="none"}function showTotalAllReports(){tableExp.style.display="none",tableSalary.style.display="none",tableImports.style.display="none",tableSupp.style.display="none",tableMake.style.display="none",tableTotalReports.style.display="block"}function returnback(){window.location.href="../accountClients/index.html"}let dateReserve,tableExpen,tableSala,tableRports2,tableMakeUp,tableSuppliers,newTableTotal,expenses,allSalary,employeesMakeUp,suppliers,totalReserve=0,totalSuppliers=0,totalSalary=0,totalExpenses=0,totalMakeup=0,resultSalary=0,resultSalaryPaid=0,resultSalaryRemain=0,trTableRports=document.querySelectorAll(".trTableRports"),resultTotal=0,resultPaid=0,resultRemain=0,totalPriceMakeUp=0,totalPaidMakeUp=0,totalRemainMakeUp=0;function getDateNow(){toDate.value=fromDate.value}expenses=null!=localStorage.myExpenses?JSON.parse(localStorage.myExpenses):[],allSalary=null!=localStorage.mySalary?JSON.parse(localStorage.mySalary):[],getDateNow(),employeesMakeUp=null!=localStorage.myEmployeesMakeUp?JSON.parse(localStorage.myEmployeesMakeUp):[],suppliers=null!=localStorage.mySuppliers?JSON.parse(localStorage.mySuppliers):[];let tableTotal,reserve=[];function getReserve(){ipcRenderer.send("get-reserve","bing"),ipcRenderer.on("get-reserve",((e,t)=>{JSON.parse(t);localStorage.setItem("myReserve",JSON.stringify(JSON.parse(t)))}))}function getSuplaiers(){ipcRenderer.send("get-suppliers","bing"),ipcRenderer.on("get-suppliers",((e,t)=>{JSON.parse(t);localStorage.setItem("mySuppliers",JSON.stringify(JSON.parse(t)))}))}function getMakeUp(){ipcRenderer.send("get-makeUp","bing"),ipcRenderer.on("get-makeUp",((e,t)=>{JSON.parse(t);localStorage.setItem("myEmployeesMakeUp",JSON.stringify(JSON.parse(t)))}))}function getExpenses(){ipcRenderer.send("get-expenses","bing"),ipcRenderer.on("get-expenses",((e,t)=>{JSON.parse(t);localStorage.setItem("myExpenses",JSON.stringify(JSON.parse(t)))}))}function getAllSalary(){ipcRenderer.send("get-salary","bing"),ipcRenderer.on("get-salary",((e,t)=>{JSON.parse(t);localStorage.setItem("mySalary",JSON.stringify(JSON.parse(t)))}))}function searchReport(){let e="";for(let t=0;t<reserve.length;t++)for(let a=0;a<reserve[t].myReserve.length;a++)fromDate.value<=reserve[t].myReserve[a].date&&toDate.value>=reserve[t].myReserve[a].date&&(dateReserve=fromDate.value,resultTotal+=+reserve[t].myReserve[a].price,resultPaid+=+reserve[t].myReserve[a].paid,resultRemain=+resultTotal-+resultPaid,totalReserve=resultPaid,e+=`\n                <tr class='trTableRports' >\n                    <td></td>\n                    <td>${reserve[t].myReserve[a].date}</td>\n                    <td>${reserve[t].myReserve[a].user}</td>\n                    <td>${reserve[t].myReserve[a].numReserve}</td>\n                    <td>حجز ${reserve[t].myReserve[a].itemsDress+" - "+reserve[t].myReserve[a].itemsOthers}</td>\n                    <td>${+reserve[t].myReserve[a].price}</td>\n                    <td>${+reserve[t].myReserve[a].paid}</td>\n                    <td>${+reserve[t].myReserve[a].price-+reserve[t].myReserve[a].paid}</td>\n                </tr>\n                `);e+=`\n    <tr style='border:2px solid'>\n        <th colspan='5' >الاجمالي</th>              \n        <th >${resultTotal}</th>\n        <th >${resultPaid}</th>\n        <th >${resultRemain}</th>                \n    </tr>\n    `,document.querySelector(".tbodyReports2").innerHTML=e,e="",resultTotal=resultPaid=resultRemain=0,e="";let t=0,a=0,l=0;tableSuppliers="";for(let e=0;e<suppliers.length;e++)fromDate.value<=suppliers[e].mySuppliers.date&&toDate.value>=suppliers[e].mySuppliers.date?(t+=+suppliers[e].mySuppliers.Totalprice,a+=+suppliers[e].mySuppliers.paidSuppliers,l+=+suppliers[e].mySuppliers.remainSuppliers,totalSuppliers=a,tableSuppliers+=`\n            <tr>\n                <td>${e+1}</td>\n                <td>${suppliers[e].mySuppliers.date}</td>\n                <td>${suppliers[e].mySuppliers.user}</td>\n                <td>${suppliers[e].mySuppliers.nameSuppliers}</td>\n                <td>${suppliers[e].mySuppliers.typeItems}</td>\n                <td>${suppliers[e].mySuppliers.Totalprice}</td>\n                <td>${suppliers[e].mySuppliers.paidSuppliers}</td>\n                <td class='remainSuppliers'>${suppliers[e].mySuppliers.remainSuppliers}</td>\n            </tr>\n            `):tableSuppliers="";tableSuppliers+=`\n                <tr>\n                    <th colspan='5' >الاجمالي</th>              \n                    \n                    <td>${t}</td>\n                    <td>${a}</td>\n                    <td class='remainSuppliers'>${l}</td>\n                    \n\n                </tr>\n            `,document.querySelector(".tbodySuppliers").innerHTML=tableSuppliers,tableSuppliers="",tableMakeUp="";for(let e=0;e<employeesMakeUp.length;e++)fromDate.value<=employeesMakeUp[e].myEmployeesMakeUp.date&&toDate.value>=employeesMakeUp[e].myEmployeesMakeUp.date&&(totalPriceMakeUp=employeesMakeUp[e].myEmployeesMakeUp.priceMakeUp,totalPaidMakeUp=employeesMakeUp[e].myEmployeesMakeUp.paidMakeUp,totalRemainMakeUp=employeesMakeUp[e].myEmployeesMakeUp.remainMakeUp,totalMakeup=totalPaidMakeUp,tableMakeUp+=`\n\n                    <tr>\n                        <td>${e+1}</td>\n                        <td>${employeesMakeUp[e].myEmployeesMakeUp.date}</td>\n                        <td>${employeesMakeUp[e].myEmployeesMakeUp.user}</td>\n                        <td>${employeesMakeUp[e].myEmployeesMakeUp.nameMakeUp}</td>\n                        <td>${employeesMakeUp[e].myEmployeesMakeUp.numReserve}</td>\n                        <td>${employeesMakeUp[e].myEmployeesMakeUp.dateReserve}</td>\n                        <td>${employeesMakeUp[e].myEmployeesMakeUp.nameReserve}</td>\n                        <td>${employeesMakeUp[e].myEmployeesMakeUp.typeMakeUp}</td>\n                        <td>${employeesMakeUp[e].myEmployeesMakeUp.priceMakeUp}</td>\n                        <td>${employeesMakeUp[e].myEmployeesMakeUp.paidMakeUp}</td>\n                        <td class='remainMakeUp'>${employeesMakeUp[e].myEmployeesMakeUp.remainMakeUp}</td>\n                        \n\n                    </tr>\n                `);tableMakeUp+=`\n            <tr>\n                <td colspan='8'>الاجمالي</td>\n                <td>${totalPriceMakeUp}</td>\n                <td>${totalPaidMakeUp}</td>\n                <td class='remainMakeUp'>${totalRemainMakeUp}</td>\n            </tr>\n        `,document.querySelector(".tbodyEmployeesMakeUP").innerHTML=tableMakeUp,tableMakeUp="",tableSala="";let s=0;for(let e=0;e<allSalary.length;e++)fromDate.value<=allSalary[e].mySalary.date&&toDate.value>=allSalary[e].mySalary.date?(s+=+allSalary[e].mySalary.paidPay,totalSalary=s,tableSala+=`\n                <tr>\n                    <td>${e+1}</td>\n                    <td>${allSalary[e].mySalary.date}</td>\n                    <td>${allSalary[e].mySalary.name}</td>\n                    <td>${allSalary[e].mySalary.month}</td>\n                    <td>${allSalary[e].mySalary.salary}</td>\n                    <td>${allSalary[e].mySalary.paidPay}</td>\n                </tr>\n            `):tableSala="";tableSala+=`\n            <tr>\n                <td colspan='5'>الاجمالي</td>\n                <td>${s}</td>\n            </tr>\n             `,document.querySelector(".tbodySalarys").innerHTML=tableSala,tableSala="",tableExpen="";let r=0;for(let e=0;e<expenses.length;e++)fromDate.value<=expenses[e].myExpenses.expensesDate&&toDate.value>=expenses[e].myExpenses.expensesDate?(r+=+expenses[e].myExpenses.price,totalExpenses=r,tableExpen+=`\n                <tr>\n                    <td>${e+1}</td>\n                    <td>${expenses[e].myExpenses.expensesDate}</td>\n                    <td>${expenses[e].myExpenses.user}</td>\n                    <td>${expenses[e].myExpenses.expensesType}</td>\n                    <td>${expenses[e].myExpenses.price}</td>\n                </tr>\n            `):tableExpen="";tableExpen+=`\n                <tr>\n                    <td colspan='4'>الاجمالي</td>\n                    <td>${r}</td>\n                </tr>\n            `,document.querySelector(".tbodyReportsExpen").innerHTML=tableExpen,showTotalReserve()}function showTotalReserve(){let e=0;e=+totalMakeup+ +totalSuppliers+ +totalExpenses+ +totalSalary,tableTotal="",tableTotal+=`\n    <tr>\n        <td>${dateReserve}</td>\n        <td> ايرادات</td>\n        <td>-</td>\n        <td class='colorGreen'>${totalReserve}</td>\n    </tr>\n    <tr>\n        <td>${dateReserve}</td>\n        <td>مرتبات</td>\n        <td class='colorRed'>${totalSalary}</td>\n        <td>-</td>\n\n    </tr>\n    <tr>\n        <td>${dateReserve}</td>\n        <td>مصرفات</td>\n        <td class='colorRed'>${totalExpenses}</td>\n        <td>-</td>\n\n    </tr>\n    <tr>\n        <td>${dateReserve}</td>\n        <td>واصل موظفي الميكب</td>\n        <td class='colorRed'>${totalMakeup}</td>\n        <td>-</td>\n\n    </tr>\n    <tr>\n        <td>${dateReserve}</td>\n        <td>واصل الموردين</td>\n        <td class='colorRed'>${totalSuppliers}</td>\n        <td>-</td>\n\n    </tr>\n   \n    <tr>\n        <td colspan='2'>الاجمالي</td>\n        \n        <td colspan='2' class='colorTotal'>${+totalReserve-+e}</td>\n    </tr>\n    `,document.querySelector(".tbodyTotalReports").innerHTML=tableTotal,showColorTotal(),totalReserve=e=totalMakeup=totalSuppliers=totalExpenses=totalSalary=0,tableTotal=""}function showColorTotal(){document.querySelector(".colorTotal").innerHTML<0?document.querySelector(".colorTotal").style.color="red":document.querySelector(".colorTotal").style.color="green"}reserve=null!=localStorage.myReserve?JSON.parse(localStorage.myReserve):[],getReserve(),getSuplaiers(),getMakeUp(),getExpenses(),getAllSalary(),searchReport();let fromD="2023-07-10",toD="2023-07-30";function printReport(){document.querySelector(".inputs").style.display="none",document.querySelector("header").style.display="none",document.querySelector("aside").style.display="none",document.querySelector(".content").style.width="100%",document.querySelector(".cancel").style.display="block",window.print()}function refresh(){window.location.reload()}