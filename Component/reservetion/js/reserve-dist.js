const{ipcRenderer:ipcRenderer}=require("electron");let tmp,tmpOther,tmpOther2,tmpUpdate,users,allReserve,barcode=document.querySelector("#barcode"),reserveAdd=document.querySelector("#reserveAdd"),nameReserve=document.querySelector("#nameReserve"),numPersonal=document.querySelector("#numPersonal"),startReserve=document.querySelector("#startReserve"),endReserve=document.querySelector("#endReserve"),phone=document.querySelector("#phone"),adress=document.querySelector("#adress"),itemsDress=document.querySelector("#itemsDress"),itemsDetails=document.querySelector("#itemsDetails"),itemsState=document.querySelector("#itemsState"),totalPrice=document.querySelector("#totalPrice"),pricePaid=document.querySelector("#pricePaid"),priceRemaining=document.querySelector("#priceRemaining"),numReserve=document.querySelector("#numReserve"),create=document.querySelector("#create"),itemsOthers=document.querySelector("#itemsOthers"),saveData=document.querySelector("#saveData"),mood="create",date=new Date,userName=document.querySelector(".userName"),dateAndTime=document.querySelector(".dateAndTime"),namRecieve=document.querySelector("#namRecieve"),idNameRecieve=document.querySelector("#idNameRecieve"),adressRecieve=document.querySelector("#adressRecieve"),phoneRecieve=document.querySelector("#phoneRecieve"),dateSettle=document.querySelector("#dateSettle"),priceSettle=document.querySelector("#priceSettle"),remainAll=document.querySelector("#remainAll"),totalRemainAll=document.querySelector("#totalRemainAll");function showTableAllReservation(){document.querySelector("#AllReservation").style.display="block",document.querySelector("#btnShowInp").style.display="block",document.querySelector(".inputsItems").style.display="none",document.querySelector(".search").style.display="none",document.querySelector("#btnSear").style.backgroundColor="rgb(110, 219, 247)",document.querySelector("#btnDress").style.backgroundColor="rgb(110, 219, 247)",document.querySelector("#btnAllReservation").style.backgroundColor="rgb(33, 161, 112)"}function showReservation(){document.querySelector(".inputsItems").style.display="block",document.querySelector("#btnShowInp").style.display="block",document.querySelector(".search").style.display="none",document.querySelector("#AllReservation").style.display="none",document.querySelector("#btnAllReservation").style.backgroundColor="rgb(110, 219, 247)",document.querySelector("#btnSear").style.backgroundColor="rgb(110, 219, 247)",document.querySelector("#btnDress").style.backgroundColor="rgb(33, 161, 112)"}function showSearch(){document.querySelector(".search").style.display="block",document.querySelector(".inputsItems").style.display="none",document.querySelector("#AllReservation").style.display="none",document.querySelector("#btnAllReservation").style.backgroundColor="rgb(110, 219, 247)",document.querySelector("#btnDress").style.backgroundColor="rgb(110, 219, 247)",document.querySelector("#btnSear").style.backgroundColor="rgb(33, 161, 112)"}function readReserve(){allReserve=null!=localStorage.allReserve?JSON.parse(localStorage.allReserve):[]}function getAllReserve(){ipcRenderer.send("get-reserve","bing"),ipcRenderer.on("get-reserve",((e,t)=>{const r=JSON.parse(t);localStorage.setItem("allReserve",JSON.stringify(r))}))}userName.innerHTML=localStorage.getItem("userNameView"),dateAndTime.innerHTML=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,startReserve.value=dateSearch.value=endReserve.value=`${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`,startReserve.addEventListener("change",(e=>{endReserve.value=startReserve.value})),users=null!=localStorage.allUsers?JSON.parse(localStorage.allUsers):[],allReserve=null!=localStorage.allReserve?JSON.parse(localStorage.allReserve):[],getAllReserve();let items=[];function showItems(){ipcRenderer.send("get-Data","bing"),ipcRenderer.on("get-Data",((e,t)=>{const r=JSON.parse(t);items.push(r)}))}function calcRemain(){priceRemaining.value=+totalPrice.value-+pricePaid.value,remainAll.value=priceRemaining.value,calcTotal()}function calcTotal(){totalRemainAll.value=+remainAll.value-+priceSettle.value}setTimeout((()=>{ipcRenderer.send("get-Data","bing"),ipcRenderer.on("get-Data",((e,t)=>{const r=JSON.parse(t);items.push(r)})),getAllReserve(),showAllReserve()}),1),showItems();let idReserve,dateRes=`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`,dateNow=document.querySelector("#dateNow"),timeReserve=`${date.getHours()}:${date.getMinutes()}:${date.getDay()}`;function getNumReserve(){if(readReserve(),""!=allReserve){if(""!=nameReserve.value)for(let e=0;e<allReserve.length;e++)numReserve.value,allReserve[e].myReserve[0].numReserve,allReserve.length>=5?numReserve.value=0:(numReserve.value=+allReserve[e]._id+1,idReserve=+allReserve[e]._id+1)}else numReserve.value=1001,idReserve=1001}date.getMonth()+1<10&&date.getDate()<10?dateNow.value=startReserve.value=dateSearch.value=endReserve.value=`${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`:date.getMonth()+1<10&&date.getDate()>10?dateNow.value=startReserve.value=dateSearch.value=endReserve.value=`${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`:date.getMonth()+1>10&&date.getDate()<10?dateNow.value=startReserve.value=dateSearch.value=endReserve.value=`${date.getFullYear()}-${date.getMonth()+1}-0${date.getDate()}`:dateNow.value=startReserve.value=dateSearch.value=endReserve.value=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;let showMessage=document.querySelector(".showMessage");function checkReserve(){if("create"===mood||"add"===mood)if(""!=allReserve)for(let e=0;e<allReserve.length;e++)for(let t=0;t<allReserve[e].myReserve.length;t++){if(startReserve.value==allReserve[e].myReserve[t].startReserve&&barcode.value==allReserve[e].myReserve[t].barcode){showMessage.style.display="block",document.querySelector("#reserveAdd").style.display="none";break}for(let e=0;e<items[items.length-1].length;e++)barcode.value==items[items.length-1][e].myItems.barcode&&(itemsDress.value=items[items.length-1][e].myItems.title,totalPrice.value=items[items.length-1][e].myItems.priceNight)}else for(let e=0;e<items[items.length-1].length;e++)barcode.value==items[items.length-1][e].myItems.barcode&&(itemsDress.value=items[items.length-1][e].myItems.title,totalPrice.value=items[items.length-1][e].myItems.priceNight)}function resetInputs(){showMessage.style.display="none",document.querySelector("#reserveAdd").style.display="block",itemsDress.value=itemsOthers.value=totalPrice.value=pricePaid.value=priceRemaining.value=dateSettle.value=remainAll.value=""}function closeMessage(){showMessage.style.display="none"}function showInputs(){reserveAdd.style.display="block",document.querySelector("#btnShowInp").style.display="none",document.querySelector(".viewTable").style.display="none",document.querySelector(".invoiceClient").style.display="block",nameReserve.focus()}let newRes=[];allReserve.length<=3?console.log(allReserve):console.log("no"),reserveAdd.addEventListener("submit",(e=>{console.log(allReserve),e.preventDefault();let t="";if(""!=(barcode.value||nameReserve.value||numReserve.value)&&0!=numReserve.value)if(t={user:userName.innerHTML,date:dateNow.value,time:timeReserve,barcode:barcode.value,numReserve:numReserve.value,nameReserve:nameReserve.value,itemsDress:itemsDress.value,itemsOthers:itemsOthers.value,numPersonal:numPersonal.value,startReserve:startReserve.value,endReserve:endReserve.value,phone:phone.value,adress:adress.value,price:totalPrice.value,paid:pricePaid.value,remain:priceRemaining.value,namRecieve:namRecieve.value,idNameRecieve:idNameRecieve.value,adressRecieve:adressRecieve.value,phoneRecieve:phoneRecieve.value,state:"open"},"create"===mood)newRes.push(t),makeInvoice();else if("add"===mood){let e=[];for(let r=0;r<allReserve.length;r++)allReserve[r]._id==tmp&&(e=allReserve[r].myReserve,e.push(t),ipcRenderer.send("update-reserve",{myReserve:e,tmp:tmp}),window.location.reload())}else if("update"===mood){let e=[];if(allReserve[tmpOther2]._id==tmp){for(let t=0;t<allReserve[tmpOther2].myReserve.length;t++)e=allReserve[tmpOther2].myReserve;e[tmpOther]=t,ipcRenderer.send("update-reserve",{myReserve:e,tmp:tmp}),window.location.reload()}}else if("settle"===mood){let e=[];for(let r=0;r<allReserve.length;r++)allReserve[r]._id==tmp&&(e=allReserve[r].myReserve,e.push(t),ipcRenderer.send("update-reserve",{myReserve:e,tmp:tmp}),printreceipt(tmp),window.location.reload())}showAllReserve(),showReserve(),barcode.value=itemsDress.value=itemsOthers.value=numPersonal.value=phone.value=adress.value=totalPrice.value=pricePaid.value=priceRemaining.value=""}));let tmpPrintInvoice,tableReserve="";function makeInvoice(e){if("create"==mood)for(let e=0;e<newRes.length;e++)""!=(newRes[e].numReserve&&newRes[e].nameReserve)&&numReserve.value==newRes[e].numReserve&&(tmpPrintInvoice=e,tableReserve+=`\n                    <tr>\n                        <td>${e+1}</td>\n                        <td>${newRes[e].date}</td>\n                        <td>${newRes[e].user}</td>\n                        <td>${newRes[e].nameReserve}</td>\n                        <td>${newRes[e].numReserve}</td>\n                        <td>${newRes[e].startReserve}</td>\n                        <td>${newRes[e].itemsDress}</td>     \n                        <td>${newRes[e].itemsOthers}</td>\n                        <td>${newRes[e].price}</td>\n                        <td>${newRes[e].paid}</td>\n                        <td>${newRes[e].remain}</td>\n                        \n                    </tr>\n                    `);document.querySelector(".invoiceReserve").innerHTML=tableReserve,tableReserve=""}function addInReserveOld(e){reserveAdd.style.display="block",document.querySelector("#btnShowInp").style.display="none";for(let t=0;t<allReserve[allReserve.length-1].length;t++)if(allReserve[allReserve.length-1][t]._id==e){let e=allReserve[allReserve.length-1][t].myReserve;numReserve.value=e[0].numReserve,nameReserve.value=e[0].nameReserve,phone.value=e[0].phone}mood="add",tmp=e,barcode.focus()}function settlement(e){reserveAdd.style.display="block",document.querySelector(".infoItems").style.display="none",document.querySelector(".infoPersonal").style.display="none",document.querySelector("#btnShowInp").style.display="none";let t=0;for(let r=0;r<allReserve.length;r++)if(allReserve[r]._id==e){let e=allReserve[r].myReserve;for(let r=0;r<e.length;r++)t+=+e[r].remain,e[r].state="close";barcode.value="تصفيه",itemsDress.value="تصفيه",priceRemaining.value=+t}pricePaid.focus(),scroll({top:0,behavior:"smooth"}),create.innerHTML="تصفية",mood="settle",tmp=e}saveData.addEventListener("click",(e=>{e.preventDefault(),0!=newRes.length&&(ipcRenderer.send("myReserve",newRes,`${idReserve}`),document.querySelector(".viewTable").style.display="block",document.querySelector(".invoiceClient").style.display="none",getAllReserve(),printInvoice(tmpPrintInvoice)),getAllReserve(),window.location.reload()}));let checkTmpRese,tmpMoodReserve,tmpIdDelete1,tableReserve2,inpuCheckPass=document.querySelector("#passCheck");function updateReserve(e,t,r){if(reserveAdd.style.display="block",tmp=r,tmpOther=e,tmpOther2=t,mood="update",create.innerHTML="تحديث",allReserve[t]._id==r){let r=allReserve[t].myReserve;startReserve.value=r[e].startReserve,nameReserve.value=r[e].nameReserve,numReserve.value=r[e].numReserve,barcode.value=r[e].barcode,itemsDress.value=r[e].itemsDress,itemsOthers.value=r[e].itemsOthers,numPersonal.value=r[e].numPersonal,phone.value=r[e].phone,adress.value=r[e].adress,totalPrice.value=r[e].price,pricePaid.value=r[e].paid,priceRemaining.value=r[e].remain,nameReserve.focus(),scroll({top:0,behavior:"smooth"})}}function deletReserve(e){document.querySelector(".alarm1").style.display="block",tmpIdDelete1=e,document.querySelector("#passDelete").focus()}function checkPass1(){"100"==document.querySelector("#passDelete").value?(ipcRenderer.send("delete-reserve",tmpIdDelete1),showReserve()):document.querySelector("#passDelete").value="",getAllReserve(),window.location.reload()}function exitePass(){window.location.reload()}function deletSomeReserve(e,t,r){if(document.querySelector(".alarm1").style.display="block",document.querySelector("#passDelete").focus(),"100"==document.querySelector("#passDelete").value){let l=[];barcode.value="-";let n={user:userName.innerHTML,date:"-",barcode:"-",numReserve:"-",nameReserve:"-",itemsDress:"-",itemsOthers:"-",numPersonal:"-",startReserve:"-",endReserve:"-",phone:"-",adress:"-",price:"0",paid:"0",remain:"0",namRecieve:"-",idNameRecieve:"-",adressRecieve:"-",phoneRecieve:"-",state:"close"};if(allReserve[t]._id==r){for(let e=0;e<allReserve[t].myReserve.length;e++)l=allReserve[t].myReserve,tmp=r;l.splice(e,1),l.push(n),ipcRenderer.send("update-reserve",{myReserve:l,tmp:tmp}),window.location.reload(),showAllReserve(),showReserve()}}else document.querySelector("#passDelete").value=""}function showAllReserve(){let e="";e="";for(let t=0;t<allReserve.length;t++)"-"!=allReserve[t].myReserve[0].startReserve&&(e+=`\n                <tr>\n                    <td>${allReserve[t].myReserve[0].date}</td>\n                    <td>${allReserve[t].myReserve[0].time}</td>\n                    <td>${allReserve[t].myReserve[0].user}</td>\n                    <td>${allReserve[t].myReserve[0].numReserve}</td>\n                    <td>${allReserve[t].myReserve[0].nameReserve}</td>\n                    <td>${allReserve[t].myReserve[0].startReserve}</td>\n                    <td><button onclick="showDetails('${allReserve[t]._id}','${t}');">عرض</button></td>\n                    <td><button onclick="printreceipt('${allReserve[t]._id}');">ايصال نقدية</button></td>\n                    <td><button onclick="deletReserve('${allReserve[t]._id}');">حذف</button></td>                    \n                </tr>\n                `);document.querySelector(".AllReservation").innerHTML=e}function showReserve(){let e="";e="";for(let t=0;t<allReserve.length;t++)"-"!=allReserve[t].myReserve[0].startReserve&&(e+=`\n                <tr>\n                    <td>${allReserve[t].myReserve[0].date}</td>\n                    <td>${allReserve[t].myReserve[0].time}</td>\n                    <td>${allReserve[t].myReserve[0].user}</td>\n                    <td>${allReserve[t].myReserve[0].numReserve}</td>\n                    <td>${allReserve[t].myReserve[0].nameReserve}</td>\n                    <td>${allReserve[t].myReserve[0].startReserve}</td>\n                    <td><button onclick="showDetails('${allReserve[t]._id}','${t}');">عرض</button></td>\n                    <td><button onclick="printreceipt('${allReserve[t]._id}');">ايصال نقدية</button></td>\n                    <td><button onclick="addInReserveOld('${allReserve[t]._id}');">اضافة</button></td>\n                    <td><button onclick="settlement('${allReserve[t]._id}');">تصفيه</button></td>\n                    <td><button onclick="deletReserve('${allReserve[t]._id}');">حذف</button></td>                    \n                </tr>\n                `),document.querySelector(".tbodyReserve").innerHTML=e}console.log(allReserve),showAllReserve(),showReserve();let totalPriceDetails=0,totalPaidDetails=0,totalRemainDetails=0;function showDetails(e,t){document.querySelector("#allDetails").style.display="block",scroll({top:0,behavior:"smooth"}),tableReserve2="";for(let r=0;r<allReserve[t].myReserve.length;r++)"-"!=allReserve[t].myReserve[r].barcode&&(tableReserve2+=`\n                <tr>\n                    <td>${r+1}</td>\n                    <td>${allReserve[t].myReserve[r].date}</td>\n                    <td>${allReserve[t].myReserve[r].time}</td>\n                    <td>${allReserve[t].myReserve[r].numReserve}</td>\n                    <td>${allReserve[t].myReserve[r].nameReserve}</td>\n                    <td>${allReserve[t].myReserve[r].startReserve}</td>\n                    <td>${allReserve[t].myReserve[r].phone}</td>\n                    <td>${allReserve[t].myReserve[r].barcode}</td>\n                    <td>${allReserve[t].myReserve[r].itemsDress}</td>\n                    <td>${allReserve[t].myReserve[r].price}</td>\n                    <td>${+allReserve[t].myReserve[r].paid}</td>\n                    <td>${allReserve[t].myReserve[r].remain}</td>\n                    <td><button class="btn-edite" onclick="updateReserve('${r}','${t}','${e}');">تعديل</button></td>\n                    <td><button class="btn-edite" onclick="deletSomeReserve('${r}','${t}','${e}');">حذف</button></td>\n                </tr>\n                `),document.querySelector(".AllDetails").innerHTML=tableReserve2;tmpUpdate=e,showTotalDetails(e)}function showTotalDetails(e){totalPriceDetails=0,totalPaidDetails=0,totalRemainDetails=0;for(let t=0;t<allReserve.length;t++)if(allReserve[t]._id==e){let e=allReserve[t].myReserve;for(let t=0;t<e.length;t++)totalPriceDetails+=+e[t].price,totalPaidDetails+=+e[t].paid,totalRemainDetails+=+e[t].remain,tmpUpdate=t}tableReserve2+=`\n    <tr>\n        <td colspan='9'>الاجمالي</td>\n        \n        <td>${totalPriceDetails}</td>\n        <td>${totalPaidDetails}</td>\n        <td>${totalRemainDetails}</td>\n        \n    </tr> \n    `,document.querySelector(".AllDetails").innerHTML=tableReserve2}function printReserve(e){document.querySelector(".reservation").style.display="none",document.querySelector(".invoice").style.display="block",window.print(),window.location.reload()}document.querySelector("#allDetails").onclick=function(){document.querySelector("#allDetails").style.display="none",tableReserve2="",totalPriceDetails=0,totalPaidDetails=0,totalRemainDetails=0};let tbRecipt="";function printInvoice(e){document.querySelector(".reservation").style.display="none",document.querySelector(".receipt").style.display="block";let t=newRes[e];console.log(t),document.querySelectorAll(".receiptPhone")[0].innerHTML=t.phone,document.querySelectorAll(".receiptPhone")[1].innerHTML=t.phone,document.querySelectorAll(".receiptAdress")[0].innerHTML=t.adress,document.querySelectorAll(".receiptAdress")[1].innerHTML=t.adress,document.querySelectorAll(".receiptNumReserve")[0].innerHTML=t.numReserve,document.querySelectorAll(".receiptNumReserve")[1].innerHTML=t.numReserve,document.querySelectorAll(".receiptNamePers")[0].innerHTML=t.nameReserve,document.querySelectorAll(".receiptNamePers")[1].innerHTML=t.nameReserve,document.querySelectorAll(".receiptTimeNow")[0].innerHTML=t.time,document.querySelectorAll(".receiptTimeNow")[1].innerHTML=t.time,document.querySelectorAll(".receiptDateNow")[0].innerHTML=t.date,document.querySelectorAll(".receiptDateNow")[1].innerHTML=t.date,document.querySelectorAll(".receiptRecieve")[0].innerHTML=t.user,document.querySelectorAll(".receiptRecieve")[1].innerHTML=t.user;for(let e=0;e<newRes.length;e++)"-"!=newRes[e].barcode&&(tbRecipt+=`\n                    \n                    <tr>\n                        <td>${newRes[e].barcode}</td>\n                        <td>${newRes[e].itemsDress}</td>\n                        <td>${newRes[e].itemsOthers}</td>\n                        <td>${newRes[e].startReserve}</td>\n                        <td>${newRes[e].price}</td>\n                        <td>${newRes[e].paid}</td>\n                        <td>${newRes[e].remain}</td>\n                    </tr>\n                \n                `);document.querySelectorAll(".tbodyRecip")[0].innerHTML+=tbRecipt,document.querySelectorAll(".tbodyRecip")[1].innerHTML+=tbRecipt,clacTotal(e),window.print(),window.location.reload()}function printreceipt(e){for(let t=0;t<allReserve.length;t++)if(allReserve[t]._id==e){document.querySelector(".reservation").style.display="none",document.querySelector(".receipt").style.display="block";let e=allReserve[t].myReserve;document.querySelectorAll(".receiptPhone")[0].innerHTML=e[0].phone,document.querySelectorAll(".receiptPhone")[1].innerHTML=e[0].phone,document.querySelectorAll(".receiptAdress")[0].innerHTML=e[0].adress,document.querySelectorAll(".receiptAdress")[1].innerHTML=e[0].adress,document.querySelectorAll(".receiptNumReserve")[0].innerHTML=e[0].numReserve,document.querySelectorAll(".receiptNumReserve")[1].innerHTML=e[0].numReserve,document.querySelectorAll(".receiptNamePers")[0].innerHTML=e[0].nameReserve,document.querySelectorAll(".receiptNamePers")[1].innerHTML=e[0].nameReserve,document.querySelectorAll(".receiptDateNow")[0].innerHTML=e[0].date,document.querySelectorAll(".receiptDateNow")[1].innerHTML=e[0].date,document.querySelectorAll(".receiptTimeNow")[0].innerHTML=e[0].time,document.querySelectorAll(".receiptTimeNow")[1].innerHTML=e[0].time,document.querySelectorAll(".receiptRecieve")[0].innerHTML=e[0].user,document.querySelectorAll(".receiptRecieve")[1].innerHTML=e[0].user,tbRecipt="";for(let e=0;e<allReserve[t].myReserve.length;e++)"-"!=allReserve[t].myReserve[e].barcode&&(tbRecipt+=`\n                        \n                        <tr>\n                            <td>${allReserve[t].myReserve[e].barcode}</td>\n                            <td>${allReserve[t].myReserve[e].itemsDress}</td>\n                            <td>${allReserve[t].myReserve[e].itemsOthers}</td>\n                            <td>${allReserve[t].myReserve[e].startReserve}</td>\n                            <td>${allReserve[t].myReserve[e].price}</td>\n                            <td>${allReserve[t].myReserve[e].paid}</td>\n                            <td>${allReserve[t].myReserve[e].remain}</td>\n                        </tr>\n                    \n                    `);document.querySelectorAll(".tbodyRecip")[0].innerHTML+=tbRecipt,document.querySelectorAll(".tbodyRecip")[1].innerHTML+=tbRecipt}clacTotal(e),window.print(),window.location.reload()}function clacTotal(e){for(let t=0;t<allReserve.length;t++)if(allReserve[t]._id==e){let e=0,r=0,l=0;for(let n=0;n<allReserve[t].myReserve.length;n++)tbRecipt="",e+=+allReserve[t].myReserve[n].price,r+=+allReserve[t].myReserve[n].paid,l+=+allReserve[t].myReserve[n].remain,tbRecipt+=`\n                        \n                        <tr>\n                            <td colspan='4'>الاجمالي</td>\n                            <td>${e}</td>\n                            <td>${r}</td>\n                            <td>${l}</td>\n        \n                    \n                        </tr>\n                    \n                    `;document.querySelectorAll(".tbodyRecip")[0].innerHTML+=tbRecipt,document.querySelectorAll(".tbodyRecip")[1].innerHTML+=tbRecipt}}let invoice=document.querySelector(".invoice");invoice.addEventListener("click",(e=>{document.querySelector(".reservation").style.display="block",invoice.style.display="none"})),document.querySelector(".receipt").addEventListener("click",(e=>{document.querySelector(".reservation").style.display="block",document.querySelector(".receipt").style.display="none"}));let inputSearch=document.querySelector("#inputSearch");function searchNumReserve(e){let t="";for(let r=0;r<allReserve.length;r++)for(let l=0;l<allReserve[r].myReserve.length;l++){if(allReserve[r].myReserve[l].numReserve.includes(e)){let e=allReserve[r].myReserve[l];t+=`\n                <tr>\n                    <td>${r+1}</td>\n                    <td>${e.date}</td>\n                    <td>${e.user}</td>\n                    <td><mark>${e.numReserve}</mark></td>\n                    <td>${e.nameReserve}</td>\n                    <td>${e.startReserve}</td>\n                    <td>${e.barcode}</td>\n                    <td>${e.itemsDress}</td>\n                    <td>${e.price}</td>\n                    <td>${e.paid}</td>\n                    <td>${e.remain}</td>\n                    <td><button onclick="printreceipt('${allReserve[r]._id}');">ايصال نقدية</button></td>\n\n                </tr>\n                `}else if(allReserve[r].myReserve[l].nameReserve.includes(e)){let e=allReserve[r].myReserve[l];t+=`\n                <tr>\n                    <td>${r+1}</td>\n                    <td>${e.date}</td>\n                    <td>${e.user}</td>\n                    <td>${e.numReserve}</td>\n                    <td><mark>${e.nameReserve}</mark></td>\n                    <td>${e.startReserve}</td>\n                    <td>${e.barcode}</td>\n                    <td>${e.itemsDress}</td>\n                    <td>${e.price}</td>\n                    <td>${e.paid}</td>\n                    <td>${e.remain}</td>\n                    <td><button onclick="printreceipt('${allReserve[r]._id}');">ايصال نقدية</button></td>\n\n                </tr>\n                `}else if(allReserve[r].myReserve[l].barcode.includes(e)){let e=allReserve[r].myReserve[l];t+=`\n                <tr>\n                    <td>${r+1}</td>\n                    <td>${e.date}</td>\n                    <td>${e.user}</td>\n                    <td>${e.numReserve}</td>\n                    <td>${e.nameReserve}</td>\n                    <td>${e.startReserve}</td>\n                    <td><mark>${e.barcode}</mark></td>\n                    <td>${e.itemsDress}</td>\n                    <td>${e.price}</td>\n                    <td>${e.paid}</td>\n                    <td>${e.remain}</td>\n                    <td><button onclick="printreceipt('${allReserve[r]._id}');">ايصال نقدية</button></td>\n\n                </tr>\n                `}document.querySelector(".tbodysearch").innerHTML=t}}function searchDateReserve(e){let t="";for(let r=0;r<allReserve.length;r++)for(let l=0;l<allReserve[r].myReserve.length;l++){let n=allReserve[r].myReserve[l];e==n.startReserve&&(t+=`\n                <tr>\n                    <td>${r+1}</td>\n                    <td>${n.date}</td>\n                    <td>${n.user}</td>\n                    <td>${n.numReserve}</td>\n                    <td>${n.nameReserve}</td>\n                    <td><mark>${n.startReserve}</mark></td>\n                    <td>${n.barcode}</td>\n                    <td>${n.itemsDress}</td>\n                    <td>${n.price}</td>\n                    <td>${n.paid}</td>\n                    <td>${n.remain}</td>\n                    <td><button onclick="printreceipt('${allReserve[r]._id}');">ايصال نقدية</button></td>\n\n                \n                </tr>\n            `),document.querySelector(".tbodysearch").innerHTML=t}}let btnSearDe=document.querySelector("#btnSearDe");function showSearch2(e){tableReserve="";for(let t=0;t<allReserve.length;t++)for(let r=0;r<allReserve[t].myReserve.length;r++){let l=allReserve[t];(l.myReserve[r].nameReserve.includes(e)||e==l.myReserve[r].numReserve)&&(tableReserve+=`\n                <tr>\n                    <td>${l.myReserve[r].date}</td>\n                    <td>${l.myReserve[r].time}</td>\n                    <td>${l.myReserve[r].user}</td>\n                    <td>${l.myReserve[r].numReserve}</td>\n                    <td>${l.myReserve[r].nameReserve}</td>\n                    <td>${l.myReserve[r].startReserve}</td>\n                    <td><button onclick="showDetails('${l._id}');">عرض</button></td>\n                    <td><button onclick="printreceipt('${l._id}');">ايصال نقدية</button></td>\n                    <td><button onclick="addInReserveOld('${l._id}');">اضافة</button></td>\n                    <td><button onclick="settlement('${l._id}');">تصفيه</button></td>\n                    <td><button onclick="deletReserve('${l._id}');">حذف</button></td>                    \n                </tr>\n                `)}document.querySelector(".tbodyReserve").innerHTML=tableReserve}function printInvoiceEmpty(){document.querySelector(".reservation").style.display="none",document.querySelector(".invoice").style.display="block",window.print()}function printSearch(){document.querySelector("aside").style.display="none",document.querySelector("header").style.display="none",document.querySelector("#search").style.display="none",document.querySelector(".content").style.width="100%",window.print()}function refresh(){window.location.reload()}