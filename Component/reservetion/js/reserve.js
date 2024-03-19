// const {ipcRenderer}=   require('electron')

let barcode = document.querySelector('#barcode');
let reserveAdd = document.querySelector('#reserveAdd');
let nameReserve = document.querySelector('#nameReserve');
let numPersonal = document.querySelector('#numPersonal');
let startReserve = document.querySelector('#startReserve');
let endReserve = document.querySelector('#endReserve');
let phone = document.querySelector('#phone');
let adress = document.querySelector('#adress');
let itemsDress = document.querySelector('#itemsDress');
let itemsDetails = document.querySelector('#itemsDetails');
let itemsState = document.querySelector('#itemsState');
let totalPrice = document.querySelector('#totalPrice');
let pricePaid = document.querySelector('#pricePaid');
let priceRemaining = document.querySelector('#priceRemaining');
let numReserve = document.querySelector('#numReserve');
let create = document.querySelector('#create');
let itemsOthers = document.querySelector('#itemsOthers');
let saveData = document.querySelector('#saveData');
let mood = 'create';
let tmp;
let tmpOther;
let tmpOther2;
let tmpUpdate;




let date = new Date();
let userName = document.querySelector('.userName');
let dateAndTime = document.querySelector('.dateAndTime');

let namRecieve = document.querySelector('#namRecieve');
let idNameRecieve = document.querySelector('#idNameRecieve');
let adressRecieve = document.querySelector('#adressRecieve');
let phoneRecieve = document.querySelector('#phoneRecieve');
let dateSettle = document.querySelector('#dateSettle');
let priceSettle = document.querySelector('#priceSettle');
let remainAll = document.querySelector('#remainAll');
let totalRemainAll = document.querySelector('#totalRemainAll');
// let SearchDataRes = document.querySelector('#SearchDataRes');
userName.innerHTML = localStorage.getItem('userNameView');
dateAndTime.innerHTML = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;

startReserve.value = 
dateSearch.value =
endReserve.value = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}` 
startReserve.addEventListener('change', e =>{
    endReserve.value = startReserve.value;
})

function showTableAllReservation(){
    document.querySelector("#AllReservation").style.display = "block";
    document.querySelector('#btnShowInp').style.display = "block";
    document.querySelector(".inputsItems").style.display = "none";
    document.querySelector(".search").style.display = "none";
    document.querySelector("#btnSear").style.backgroundColor = "rgb(110, 219, 247)";    
    document.querySelector("#btnDress").style.backgroundColor = "rgb(110, 219, 247)";
    document.querySelector("#btnAllReservation").style.backgroundColor = "rgb(33, 161, 112)";

}
function showReservation(){
    document.querySelector(".inputsItems").style.display = "block";
    document.querySelector('#btnShowInp').style.display = "block";
    document.querySelector(".search").style.display = "none";
    document.querySelector("#AllReservation").style.display = "none";
    document.querySelector("#btnAllReservation").style.backgroundColor = "rgb(110, 219, 247)";
    document.querySelector("#btnSear").style.backgroundColor = "rgb(110, 219, 247)";
    document.querySelector("#btnDress").style.backgroundColor = "rgb(33, 161, 112)";

}
function showSearch(){
    document.querySelector(".search").style.display = "block";
    document.querySelector(".inputsItems").style.display = "none";
    document.querySelector("#AllReservation").style.display = "none";
    document.querySelector("#btnAllReservation").style.backgroundColor = "rgb(110, 219, 247)";
    document.querySelector("#btnDress").style.backgroundColor = "rgb(110, 219, 247)";
    document.querySelector("#btnSear").style.backgroundColor = "rgb(33, 161, 112)";

    
}



let users;
if(localStorage.allUsers != null){
    users = JSON.parse(localStorage.allUsers);
}else{
    users = []
}



let items;
if(localStorage.myItems != null){
    items = JSON.parse(localStorage.myItems)
}else{
    items = []
}

// setTimeout(() => {
//     ipcRenderer.send('get-Data', 'bing')
//     ipcRenderer.on('get-Data',(e,args)=>{
//         const myItems = JSON.parse(args)
//         items.push(myItems)
//     })
//     showAllReserve();
// }, 1);

// function showItems() {
//     let tableItems= '';
//     ipcRenderer.send('get-Data', 'bing')
//     ipcRenderer.on('get-Data',(e,args)=>{
//         const myItems = JSON.parse(args)
//         items.push(myItems)
//     })
    

// }
// showItems();



function calcRemain() {
    priceRemaining.value = +totalPrice.value - +pricePaid.value;
    remainAll.value = priceRemaining.value;
    calcTotal();
}



function calcTotal(){
    totalRemainAll.value = +remainAll.value - +priceSettle.value;
}









let dateRes = `${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`;
let dateNow = document.querySelector('#dateNow');
if(date.getMonth()+1 < 10 && date.getDate() < 10) {
    dateNow.value =
    startReserve.value = 
    dateSearch.value = 
    endReserve.value = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`;
}else if(date.getMonth()+1 < 10 && date.getDate() > 10){
    dateNow.value =
    startReserve.value = 
    dateSearch.value = 
    endReserve.value = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`;
}else if(date.getMonth()+1 > 10 && date.getDate() < 10){
    dateNow.value =
    startReserve.value = 
    dateSearch.value = 
    endReserve.value = `${date.getFullYear()}-${date.getMonth()+1}-0${date.getDate()}`;
}else{
    dateNow.value =
    startReserve.value = 
    dateSearch.value = 
    endReserve.value = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}


let idReserve;
function getNumReserve(){
    // if(allReserve[allReserve.length-1] != ''){
    //     if(nameReserve.value != ''){
    //         for(let i =0;i<allReserve[allReserve.length-1].length;i++){
    //             if(numReserve.value == allReserve[allReserve.length-1][i].myReserve[0].numReserve ) {
    //                 numReserve.value =   1+  +allReserve[allReserve.length-1][i].myReserve[0].numReserve;
    //                 idReserve = 1 + +allReserve[allReserve.length-1][i].myReserve[0].numReserve;
    //                 // console.log('1')
    //             }else{
    //                 numReserve.value =  1  + +allReserve[allReserve.length-1][i].myReserve[0].numReserve;

    //                 // numReserve.value = 1000 + +allReserve[allReserve.length-1].length+1  ;     
    //                 idReserve = 1 + +allReserve[allReserve.length-1][i].myReserve[0].numReserve;
    //                 // console.log('2')

    //             }
    //         }
    //     }else{
    //         // numReserve.value = '';
    //         // console.log('3')

    //     }
    // }else{
    //     numReserve.value = 1000 + 1;
    //     idReserve = 1000+1;
    //     // console.log('4')


    // }
    
}

let showMessage = document.querySelector('.showMessage');

function checkReserve(){ 
    // if(mood === 'create' || mood === 'add'){
    //     if(allReserve[allReserve.length-1] != ''){
    //         for(let i =0;i<allReserve[allReserve.length-1].length;i++){
    //             for(let x =0;x<allReserve[allReserve.length-1][i].myReserve.length;x++){
    //                 if(startReserve.value == allReserve[allReserve.length-1][i].myReserve[x].startReserve && barcode.value == allReserve[allReserve.length-1][i].myReserve[x].barcode) {
    //                     showMessage.style.display = 'block';
    //                     document.querySelector('#reserveAdd').style.display = 'none';
    //                     break;         
    //                 }else{
    //                     for(let i=0;i<items[items.length-1].length;i++){   
    //                         if(barcode.value == items[items.length-1][i].myItems.barcode) {
    //                             itemsDress.value = items[items.length-1][i].myItems.title;
    //                             totalPrice.value = items[items.length-1][i].myItems.priceNight;
    //                         } 
    //                     }     
    //                 }
    //             }
    //         }
    //     }else{
    //         for(let i=0;i<items[items.length-1].length;i++){   
    //             if(barcode.value == items[items.length-1][i].myItems.barcode) {
    //                 itemsDress.value = items[items.length-1][i].myItems.title;
    //                 totalPrice.value = items[items.length-1][i].myItems.priceNight;
    //             } 
    //         }  
    //     }
        
    // }  
}


function resetInputs(){
    showMessage.style.display = 'none';
    document.querySelector('#reserveAdd').style.display = 'block';
    itemsDress.value =
    itemsOthers.value =
    
    totalPrice.value =
    pricePaid.value =
    priceRemaining.value =
    dateSettle.value =
    remainAll.value = '';

}
function closeMessage(){
    showMessage.style.display = 'none';

}
function showInputs(){
    reserveAdd.style.display = 'block';
    document.querySelector('#btnShowInp').style.display = 'none';
    document.querySelector('.viewTable').style.display = 'none';
    document.querySelector('.invoiceClient').style.display = 'block';
    nameReserve.focus();
}
let newRes =[];
reserveAdd.addEventListener( 'submit', (e) =>{
    e.preventDefault();
    let newReserve = '';
    if((numReserve.value ||nameReserve.value || barcode.value ) != ""){
        newReserve = {
            user: userName.innerHTML,
            date: dateNow.value,
            barcode: barcode.value,
            numReserve: numReserve.value,
            nameReserve: nameReserve.value,
            itemsDress : itemsDress.value,
            itemsOthers: itemsOthers.value,
            numPersonal : numPersonal.value,
            startReserve: startReserve.value,
            endReserve: endReserve.value,
            phone: phone.value,
            adress: adress.value,
            price: totalPrice.value,
            paid: pricePaid.value,
            remain: priceRemaining.value,
            namRecieve: namRecieve.value,
            idNameRecieve: idNameRecieve.value,
            adressRecieve:adressRecieve.value,
            phoneRecieve: phoneRecieve.value,
            state: 'open'                                    
        
    }
    if(mood === 'create') {
        newRes.push(newReserve);
        makeInvoice();

    }else if(mood === 'add'){
        let myReserve = [];

            for(let i =0;i<allReserve[allReserve.length-1].length;i++){
    
                if(allReserve[allReserve.length-1][i]._id == tmp){
                        myReserve = allReserve[allReserve.length-1][i].myReserve
                        myReserve.push(newReserve);
                        // ipcRenderer.send('update-reserve', {myReserve, tmp})
        
                        window.location.reload();
                    }
                   
            }
        
        
       
        
    }else if(mood === 'update'){
        let myReserve = [];
            if(allReserve[allReserve.length-1][tmpOther2]._id == tmp){
                for(let i =0;i<allReserve[allReserve.length-1][tmpOther2].myReserve.length;i++){
                    myReserve = allReserve[allReserve.length-1][tmpOther2].myReserve
    
                }
                myReserve[tmpOther] = newReserve
    
                // ipcRenderer.send('update-reserve', {myReserve, tmp})
    
                window.location.reload();
                
    
            }    
        
        

    }else if( mood === 'settle') {
        let myReserve = [];

            for(let i =0;i<allReserve[allReserve.length-1].length;i++){
    
                if(allReserve[allReserve.length-1][i]._id == tmp){
                    myReserve = allReserve[allReserve.length-1][i].myReserve
                    myReserve.push(newReserve);
                    ipcRenderer.send('update-reserve', {myReserve, tmp})
                    printreceipt(tmp)
                    window.location.reload();
                    
                }     
            }
        
        
    }
    }
    
    showAllReserve();
    showReserve();
    barcode.value =
    itemsDress.value =
    itemsOthers.value =
    numPersonal.value =
    phone.value =
    adress.value =
    totalPrice.value =
    pricePaid.value =
    priceRemaining.value = '';

})
let tableReserve= '';

let tmpPrintInvoice;
function makeInvoice(x) {
    if(mood == 'create'){
        for(let i = 0; i < newRes.length; i++){
            if((newRes[i].numReserve && newRes[i].nameReserve) != '') {
                if(numReserve.value == newRes[i].numReserve){
                tmpPrintInvoice = i;
                tableReserve += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${newRes[i].date}</td>
                        <td>${newRes[i].user}</td>
                        <td>${newRes[i].nameReserve}</td>
                        <td>${newRes[i].numReserve}</td>
                        <td>${newRes[i].startReserve}</td>
                        <td>${newRes[i].itemsDress}</td>     
                        <td>${newRes[i].itemsOthers}</td>
                        <td>${newRes[i].price}</td>
                        <td>${newRes[i].paid}</td>
                        <td>${newRes[i].remain}</td>
                        
                    </tr>
                    `
                }
            }
       
        
        }
    }
    
    document.querySelector('.invoiceReserve').innerHTML = tableReserve;
    tableReserve = '';
}

saveData.addEventListener('click', e =>{
    e.preventDefault();
    localStorage.setItem("myReserve",JSON.stringify(newRes))
    // ipcRenderer.send('myReserve',newRes,`${idReserve}`)
    document.querySelector('.viewTable').style.display = 'block';
    document.querySelector('.invoiceClient').style.display = 'none';
    showAllReserve();
    showReserve();
    printInvoice(tmpPrintInvoice)
    window.location.reload();
    

})

function addInReserveOld(id){
    reserveAdd.style.display = 'block';
    document.querySelector('#btnShowInp').style.display = "none";
    for(let i=0;i<allReserve[allReserve.length-1].length; i++){
        if(allReserve[allReserve.length-1][i]._id == id){
           
            let myDataReserve = allReserve[allReserve.length-1][i].myReserve;
            numReserve.value = myDataReserve[0].numReserve;
            nameReserve.value = myDataReserve[0].nameReserve;
            phone.value = myDataReserve[0].phone;

        }
    
        
    }
   
    mood = 'add';
    tmp= id;
    barcode.focus();
    

}
function settlement(id){
    reserveAdd.style.display = 'block';
    document.querySelector('.infoItems').style.display = 'none';
    document.querySelector('.infoPersonal').style.display = 'none';
    document.querySelector('#btnShowInp').style.display = "none";

    let result = 0;
        for(let i=0;i<allReserve[allReserve.length-1].length; i++){
            if(allReserve[allReserve.length-1][i]._id == id){
               
                let myDataReserve = allReserve[allReserve.length-1][i].myReserve;
                for(let x=0;x<myDataReserve.length; x++){
                    result += +myDataReserve[x].remain;
                    myDataReserve[x].state = 'close';
                }
                barcode.value = 'تصفيه';
                itemsDress.value = 'تصفيه';

                priceRemaining.value = +result;
    
            }
        }
        

        pricePaid.focus();
        scroll({
            top:0,
            behavior: "smooth",
        })
        create.innerHTML = 'تصفية';
        mood = 'settle';
        tmp = id;
        
       
}
let inpuCheckPass = document.querySelector('#passCheck');

let checkTmpRese;
let tmpMoodReserve;


function updateReserve(i,x,id) {
    reserveAdd.style.display = 'block';

    tmp = id;
    tmpOther = i;
    tmpOther2 = x;
    mood = 'update';
    create.innerHTML = 'تحديث';
    


    if(allReserve[allReserve.length-1][x]._id == id){
        let myDataReserve = allReserve[allReserve.length-1][x].myReserve;
        startReserve.value = myDataReserve[i].startReserve;
        nameReserve.value = myDataReserve[i].nameReserve;
        numReserve.value = myDataReserve[i].numReserve;
        barcode.value = myDataReserve[i].barcode;
        itemsDress.value = myDataReserve[i].itemsDress;
        itemsOthers.value = myDataReserve[i].itemsOthers;
        numPersonal.value = myDataReserve[i].numPersonal;
        phone.value = myDataReserve[i].phone;
        adress.value = myDataReserve[i].adress;
        totalPrice.value = myDataReserve[i].price;
        pricePaid.value = myDataReserve[i].paid;
        priceRemaining.value = myDataReserve[i].remain;
        nameReserve.focus();
        scroll({
            top:0,
            behavior: "smooth",
        })
    }
    
    
}
let tmpIdDelete1
function deletReserve(id) {
    document.querySelector('.alarm1').style.display = 'block';
    tmpIdDelete1 = id;
    document.querySelector('#passDelete').focus();
}

function checkPass1(){
    if(document.querySelector('#passDelete').value == '100'){
        ipcRenderer.send('delete-reserve',tmpIdDelete1)
        showReserve();
    }else{
        document.querySelector('#passDelete').value = '';
    }
    window.location.reload();

}

function exitePass(){
    window.location.reload();
}


function deletSomeReserve(i,x,id){
    let myReserve = [];
    barcode.value = '-'
    let newReserve = {
        user: userName.innerHTML,
        date: '-',
        barcode: '-',
        numReserve: '-',
        nameReserve: '-',
        itemsDress : '-',
        itemsOthers: '-',
        numPersonal : '-',
        startReserve: '-',
        endReserve: '-',
        phone: '-',
        adress: '-',
        price: '0',
        paid: '0',
        remain: '0',
        namRecieve: '-',
        idNameRecieve: '-',
        adressRecieve:'-',
        phoneRecieve: '-',
        state: 'close'                                    
    
}
    if(allReserve[allReserve.length-1][x]._id == id){
        for(let i =0;i<allReserve[allReserve.length-1][x].myReserve.length;i++){
            myReserve = allReserve[allReserve.length-1][x].myReserve;
            
            tmp = id;

        }
        myReserve.splice(i,1);
        myReserve.push(newReserve)
        ipcRenderer.send('update-reserve', {myReserve, tmp})
        window.location.reload();
        showAllReserve();
        showReserve();
    }  
   
}
let allReserve = [];
function showAllReserve() {
    let tableReserve= '';
    // ipcRenderer.send('get-reserve', 'bing')
    // ipcRenderer.on('get-reserve',(e,args)=>{
        // const myReserve = JSON.parse(args)
        // allReserve.push(myReserve)
        tableReserve = '';


        // for(let x=0;x<allReserve[allReserve.length-1].length; x++){
        //     if(allReserve[allReserve.length-1][x].myReserve[0].startReserve != '-'){
        //         tableReserve += `
        //         <tr>
        //             <td>${allReserve[allReserve.length-1][x].myReserve[0].date}</td>
        //             <td>${allReserve[allReserve.length-1][x].myReserve[0].user}</td>
        //             <td>${allReserve[allReserve.length-1][x].myReserve[0].numReserve}</td>
        //             <td>${allReserve[allReserve.length-1][x].myReserve[0].nameReserve}</td>
        //             <td>${allReserve[allReserve.length-1][x].myReserve[0].startReserve}</td>
        //             <td><button onclick="printreceipt('${allReserve[allReserve.length-1][x]._id}');">ايصال نقدية</button></td>
                    
        //         </tr>
        //         `
        //     }else{

        //     }
                

        // }
        
        // document.querySelector('.AllReservation').innerHTML = tableReserve;

            
           
           
        

    // })
    
}
showAllReserve();
// console.log(dateNow.value)
function showReserve() {
    let tableReserve= '';
    // ipcRenderer.send('get-reserve', 'bing')
    // ipcRenderer.on('get-reserve',(e,args)=>{
        // const myReserve = JSON.parse(args)
        // allReserve.push(myReserve)
        // tableReserve = '';
        // for(let x=0;x<allReserve[allReserve.length-1].length; x++){
        //     if(allReserve[allReserve.length-1][x].myReserve[0].startReserve != '-'){
               
        //         tableReserve += `
        //         <tr>
        //             <td>${allReserve[allReserve.length-1][x].myReserve[0].date}</td>
        //             <td>${allReserve[allReserve.length-1][x].myReserve[0].user}</td>
        //             <td>${allReserve[allReserve.length-1][x].myReserve[0].numReserve}</td>
        //             <td>${allReserve[allReserve.length-1][x].myReserve[0].nameReserve}</td>
        //             <td>${allReserve[allReserve.length-1][x].myReserve[0].startReserve}</td>
        //             <td><button onclick="showDetails('${allReserve[allReserve.length-1][x]._id}','${x}');">عرض</button></td>
        //             <td><button onclick="printreceipt('${allReserve[allReserve.length-1][x]._id}');">ايصال نقدية</button></td>
        //             <td><button onclick="addInReserveOld('${allReserve[allReserve.length-1][x]._id}');">اضافة</button></td>
        //             <td><button onclick="settlement('${allReserve[allReserve.length-1][x]._id}');">تصفيه</button></td>
        //             <td><button onclick="deletReserve('${allReserve[allReserve.length-1][x]._id}');">حذف</button></td>                    
        //         </tr>
        //         `

        //     }else{

        //     }
        //     document.querySelector('.tbodyReserve').innerHTML = tableReserve;

        

        // }
    // })
    
}
showReserve();


let tableReserve2;
let totalPriceDetails = 0;
let totalPaidDetails = 0;
let totalRemainDetails = 0;
document.querySelector('#allDetails').onclick = function(){
    document.querySelector('#allDetails').style.display = 'none';
    tableReserve2 = '';
    totalPriceDetails = 0;
    totalPaidDetails = 0;
    totalRemainDetails = 0;
}
function showDetails(id,x){
    document.querySelector('#allDetails').style.display = 'block';
    tableReserve2 = '';
    //     for(let i=0;i<allReserve[allReserve.length-1][x].myReserve.length; i++){
    //         if(allReserve[allReserve.length-1][x].myReserve[i].barcode != '-'){
    //             tableReserve2 += `
    //             <tr>
    //                 <td>${i+1}</td>
    //                 <td>${allReserve[allReserve.length-1][x].myReserve[i].date}</td>
    //                 <td>${allReserve[allReserve.length-1][x].myReserve[i].numReserve}</td>
    //                 <td>${allReserve[allReserve.length-1][x].myReserve[i].nameReserve}</td>
    //                 <td>${allReserve[allReserve.length-1][x].myReserve[i].startReserve}</td>
    //                 <td>${allReserve[allReserve.length-1][x].myReserve[i].phone}</td>
    //                 <td>${allReserve[allReserve.length-1][x].myReserve[i].barcode}</td>
    //                 <td>${allReserve[allReserve.length-1][x].myReserve[i].itemsDress}</td>
    //                 <td>${allReserve[allReserve.length-1][x].myReserve[i].price}</td>
    //                 <td>${+allReserve[allReserve.length-1][x].myReserve[i].paid }</td>
    //                 <td>${allReserve[allReserve.length-1][x].myReserve[i].remain}</td>
    //                 <td><button class="btn-edite" onclick="updateReserve('${i}','${x}','${id}');">تعديل</button></td>
    //                 <td><button class="btn-edite" onclick="deletSomeReserve('${i}','${x}','${id}');">حذف</button></td>
    //             </tr>
    //             `
    //         }
            
        
    //     document.querySelector('.AllDetails').innerHTML = tableReserve2;
    
    //     }
    
    // tmpUpdate = id;
    // showTotalDetails(id)
}



function showTotalDetails(id){
    // totalPriceDetails = 0;
    // totalPaidDetails = 0;
    // totalRemainDetails = 0;
    // for(let x=0;x<allReserve[allReserve.length-1].length; x++){
    //     if(allReserve[allReserve.length-1][x]._id == id){
    //         let myDataReserve = allReserve[allReserve.length-1][x].myReserve;
    //         for(let i=0;i<myDataReserve.length; i++){
    //             totalPriceDetails += +myDataReserve[i].price;
    //             totalPaidDetails += +myDataReserve[i].paid ;
    //             totalRemainDetails += +myDataReserve[i].remain
    
    //             tmpUpdate = i;
    
    //         }
            
    //     }  
    // }
     
            
    // tableReserve2 += `
    // <tr>
    //     <td colspan='8'>الاجمالي</td>
        
    //     <td>${totalPriceDetails}</td>
    //     <td>${totalPaidDetails}</td>
    //     <td>${totalRemainDetails}</td>
        
    // </tr> 
    // `
    // document.querySelector('.AllDetails').innerHTML = tableReserve2;
    
}
function printReserve(i) {
    document.querySelector('.reservation').style.display = 'none';
    document.querySelector('.invoice').style.display = 'block';

    document.querySelectorAll('.nameInvoice')[0].innerHTML = reserve[i].nameReserve;
    document.querySelectorAll('.nameInvoice')[1].innerHTML = reserve[i].nameReserve;

    document.querySelectorAll('.recieveInvoice')[0].innerHTML = reserve[i].namRecieve;
    document.querySelectorAll('.recieveInvoice')[1].innerHTML = reserve[i].namRecieve;

    document.querySelectorAll('.idInvoice')[0].innerHTML = reserve[i].idNameRecieve;
    document.querySelectorAll('.idInvoice')[1].innerHTML = reserve[i].idNameRecieve;

    document.querySelectorAll('.phoneInvoice')[0].innerHTML = reserve[i].phoneRecieve;
    document.querySelectorAll('.phoneInvoice')[1].innerHTML = reserve[i].phoneRecieve;

    document.querySelectorAll('.adressInvoice')[0].innerHTML = reserve[i].adressRecieve;
    document.querySelectorAll('.adressInvoice')[1].innerHTML = reserve[i].adressRecieve;

    document.querySelectorAll('.itemsRecieve')[0].innerHTML = reserve[i].itemsDress + ' - ' + reserve[i].itemsOthers;
    document.querySelectorAll('.itemsRecieve')[1].innerHTML = reserve[i].itemsDress;
    window.print();
    window.location.reload();

}
let tbRecipt;

function printInvoice(i){
    document.querySelector('.reservation').style.display = 'none';
    document.querySelector('.receipt').style.display = 'block';
            
            let myDataReserve = newRes[i];

            document.querySelectorAll('.receiptPhone')[0].innerHTML = myDataReserve.phone;
            document.querySelectorAll('.receiptPhone')[1].innerHTML = myDataReserve.phone;

            document.querySelectorAll('.receiptAdress')[0].innerHTML = myDataReserve.adress;
            document.querySelectorAll('.receiptAdress')[1].innerHTML = myDataReserve.adress;

            document.querySelectorAll('.receiptNumReserve')[0].innerHTML = myDataReserve.numReserve;
            document.querySelectorAll('.receiptNumReserve')[1].innerHTML = myDataReserve.numReserve;


            document.querySelectorAll('.receiptNamePers')[0].innerHTML = myDataReserve.nameReserve;
            document.querySelectorAll('.receiptNamePers')[1].innerHTML = myDataReserve.nameReserve;
    
            document.querySelectorAll('.receiptDateNow')[0].innerHTML = myDataReserve.date;
            document.querySelectorAll('.receiptDateNow')[1].innerHTML = myDataReserve.date;
        
            document.querySelectorAll('.receiptRecieve')[0].innerHTML = myDataReserve.user;
            document.querySelectorAll('.receiptRecieve')[1].innerHTML = myDataReserve.user;

            tbRecipt = '';


                if(newRes[i].barcode != '-'){
                    tbRecipt += `
                        
                        <tr>
                            <td>${newRes[i].barcode}</td>
                            <td>${newRes[i].itemsDress}</td>
                            <td>${newRes[i].itemsOthers}</td>
                            <td>${newRes[i].startReserve}</td>
                            <td>${newRes[i].price}</td>
                            <td>${newRes[i].paid}</td>
                            <td>${newRes[i].remain}</td>
                        </tr>
                    
                    `
                
                
                    
            
            
            document.querySelectorAll('.tbodyRecip')[0].innerHTML += tbRecipt;
            document.querySelectorAll('.tbodyRecip')[1].innerHTML += tbRecipt;
        

    }

        
    
    clacTotal(i);
    window.print();
    window.location.reload();
}

function printreceipt(id){
    for(let x=0;x<allReserve[allReserve.length-1].length; x++){
        if(allReserve[allReserve.length-1][x]._id == id){
            document.querySelector('.reservation').style.display = 'none';
            document.querySelector('.receipt').style.display = 'block';
            let myDataReserve = allReserve[allReserve.length-1][x].myReserve;

            document.querySelectorAll('.receiptPhone')[0].innerHTML = myDataReserve[0].phone;
            document.querySelectorAll('.receiptPhone')[1].innerHTML = myDataReserve[0].phone;

            document.querySelectorAll('.receiptAdress')[0].innerHTML = myDataReserve[0].adress;
            document.querySelectorAll('.receiptAdress')[1].innerHTML = myDataReserve[0].adress;

            document.querySelectorAll('.receiptNumReserve')[0].innerHTML = myDataReserve[0].numReserve;
            document.querySelectorAll('.receiptNumReserve')[1].innerHTML = myDataReserve[0].numReserve;


            document.querySelectorAll('.receiptNamePers')[0].innerHTML = myDataReserve[0].nameReserve;
            document.querySelectorAll('.receiptNamePers')[1].innerHTML = myDataReserve[0].nameReserve;
    
            document.querySelectorAll('.receiptDateNow')[0].innerHTML = myDataReserve[0].date;
            document.querySelectorAll('.receiptDateNow')[1].innerHTML = myDataReserve[0].date;
        
            document.querySelectorAll('.receiptRecieve')[0].innerHTML = myDataReserve[0].user;
            document.querySelectorAll('.receiptRecieve')[1].innerHTML = myDataReserve[0].user;

            tbRecipt = '';

            for(let i=0;i<allReserve[allReserve.length-1][x].myReserve.length; i++){

                if(allReserve[allReserve.length-1][x].myReserve[i].barcode != '-'){
                    tbRecipt += `
                        
                        <tr>
                            <td>${allReserve[allReserve.length-1][x].myReserve[i].barcode}</td>
                            <td>${allReserve[allReserve.length-1][x].myReserve[i].itemsDress}</td>
                            <td>${allReserve[allReserve.length-1][x].myReserve[i].itemsOthers}</td>
                            <td>${allReserve[allReserve.length-1][x].myReserve[i].startReserve}</td>
                            <td>${allReserve[allReserve.length-1][x].myReserve[i].price}</td>
                            <td>${allReserve[allReserve.length-1][x].myReserve[i].paid}</td>
                            <td>${allReserve[allReserve.length-1][x].myReserve[i].remain}</td>
                        </tr>
                    
                    `
                }
                
                    
            
            }
            document.querySelectorAll('.tbodyRecip')[0].innerHTML += tbRecipt;
            document.querySelectorAll('.tbodyRecip')[1].innerHTML += tbRecipt;
        }

    }

        
    
    clacTotal(id);
    window.print();
    window.location.reload();
    
  
}
// function calcTotalInvoice(){

//     for(let x=0;x<allReserve[allReserve.length-1].length; x++){
//         if(allReserve[allReserve.length-1][x]._id == id){
//             let totalPrice = 0;
//             let totalPaid = 0;
//             let totalRemain = 0;
//             for(let i=0;i<allReserve[allReserve.length-1][x].myReserve.length; i++){
//                 tbRecipt = '';
//                 totalPrice += +allReserve[allReserve.length-1][x].myReserve[i].price;
//                 totalPaid += +allReserve[allReserve.length-1][x].myReserve[i].paid;
//                 totalRemain += +allReserve[allReserve.length-1][x].myReserve[i].remain;
//                 tbRecipt += `
                        
//                         <tr>
//                             <td colspan='4'>الاجمالي</td>
//                             <td>${totalPrice}</td>
//                             <td>${totalPaid}</td>
//                             <td>${totalRemain}</td>
        
                    
//                         </tr>
                    
//                     `
//             }
//             document.querySelectorAll('.tbodyRecip')[0].innerHTML += tbRecipt;
//             document.querySelectorAll('.tbodyRecip')[1].innerHTML += tbRecipt;
//         }
//     }
// }
function clacTotal(id){
    for(let x=0;x<allReserve[allReserve.length-1].length; x++){
        if(allReserve[allReserve.length-1][x]._id == id){
            let totalPrice = 0;
            let totalPaid = 0;
            let totalRemain = 0;
            for(let i=0;i<allReserve[allReserve.length-1][x].myReserve.length; i++){
                tbRecipt = '';
                totalPrice += +allReserve[allReserve.length-1][x].myReserve[i].price;
                totalPaid += +allReserve[allReserve.length-1][x].myReserve[i].paid;
                totalRemain += +allReserve[allReserve.length-1][x].myReserve[i].remain;
                tbRecipt += `
                        
                        <tr>
                            <td colspan='4'>الاجمالي</td>
                            <td>${totalPrice}</td>
                            <td>${totalPaid}</td>
                            <td>${totalRemain}</td>
        
                    
                        </tr>
                    
                    `
            }
            document.querySelectorAll('.tbodyRecip')[0].innerHTML += tbRecipt;
            document.querySelectorAll('.tbodyRecip')[1].innerHTML += tbRecipt;
        }
    }
    
    
}
let invoice = document.querySelector('.invoice');

invoice.addEventListener('click', e =>{
    document.querySelector('.reservation').style.display = 'block';
    invoice.style.display = 'none';
})

document.querySelector('.receipt').addEventListener('click', e =>{
    document.querySelector('.reservation').style.display = 'block';
    document.querySelector('.receipt').style.display = 'none';

})


let inputSearch = document.querySelector('#inputSearch');


function searchNumReserve(value){
    let tableSearch ='';
    

    for(let i=0;i<allReserve[allReserve.length-1].length; i++){
        for(let x=0; x<allReserve[allReserve.length-1][i].myReserve.length; x++) {

            if(allReserve[allReserve.length-1][i].myReserve[x].numReserve.includes(value)) {
                let myData = allReserve[allReserve.length-1][i].myReserve[x];
                tableSearch += `
                <tr>
                    <td>${i+1}</td>
                    <td>${myData.date}</td>
                    <td>${myData.user}</td>
                    <td><mark>${myData.numReserve}</mark></td>
                    <td>${myData.nameReserve}</td>
                    <td>${myData.startReserve}</td>
                    <td>${myData.barcode}</td>
                    <td>${myData.itemsDress}</td>
                    <td>${myData.price}</td>
                    <td>${myData.paid}</td>
                    <td>${myData.remain}</td>
                </tr>
                `
            }else if(allReserve[allReserve.length-1][i].myReserve[x].nameReserve.includes(value)){
                let myData = allReserve[allReserve.length-1][i].myReserve[x];

                tableSearch += `
                <tr>
                    <td>${i+1}</td>
                    <td>${myData.date}</td>
                    <td>${myData.user}</td>
                    <td>${myData.numReserve}</td>
                    <td><mark>${myData.nameReserve}</mark></td>
                    <td>${myData.startReserve}</td>
                    <td>${myData.barcode}</td>
                    <td>${myData.itemsDress}</td>
                    <td>${myData.price}</td>
                    <td>${myData.paid}</td>
                    <td>${myData.remain}</td>
                </tr>
                `
            }else if(value == allReserve[allReserve.length-1][i].myReserve[x].barcode){
                let myData = allReserve[allReserve.length-1][i].myReserve[x];

                tableSearch += `
                <tr>
                    <td>${i+1}</td>
                    <td>${myData.date}</td>
                    <td>${myData.user}</td>
                    <td>${myData.numReserve}</td>
                    <td>${myData.nameReserve}</td>
                    <td>${myData.startReserve}</td>
                    <td><mark>${myData.barcode}</mark></td>
                    <td>${myData.itemsDress}</td>
                    <td>${myData.price}</td>
                    <td>${myData.paid}</td>
                    <td>${myData.remain}</td>
                </tr>
                `
            }else{

            }
            document.querySelector('.tbodysearch').innerHTML = tableSearch;
            
        }
        
    }
}
function searchDateReserve(value){
    let tableSearchNum='';
    for(let i=0;i<allReserve[allReserve.length-1].length; i++){
        for(let x=0; x<allReserve[allReserve.length-1][i].myReserve.length; x++) {
            let myData = allReserve[allReserve.length-1][i].myReserve[x];

            if(value == myData.startReserve) {

                tableSearchNum += `
                <tr>
                    <td>${i+1}</td>
                    <td>${myData.date}</td>
                    <td>${myData.user}</td>
                    <td>${myData.numReserve}</td>
                    <td>${myData.nameReserve}</td>
                    <td><mark>${myData.startReserve}</mark></td>
                    <td>${myData.barcode}</td>
                    <td>${myData.itemsDress}</td>
                    <td>${myData.price}</td>
                    <td>${myData.paid}</td>
                    <td>${myData.remain}</td>
                
                </tr>
            `
            }
            document.querySelector('.tbodysearch').innerHTML = tableSearchNum;
            
        }
       
    }
}


let btnSearDe = document.querySelector('#btnSearDe');
function showSearch2(value){
    // let tableSearch ='';
    
    tableReserve = "";
    for(let x=0;x<allReserve[allReserve.length-1].length; x++){
        for(let i=0; i<allReserve[allReserve.length-1][x].myReserve.length; i++) {
            let myData = allReserve[allReserve.length-1][x];

            if(myData.myReserve[i].nameReserve.includes(value)) {

                tableReserve += `
                <tr>
                    <td>${myData.myReserve[i].date}</td>
                    <td>${myData.myReserve[i].user}</td>
                    <td>${myData.myReserve[i].numReserve}</td>
                    <td>${myData.myReserve[i].nameReserve}</td>
                    <td>${myData.myReserve[i].startReserve}</td>
                    <td><button onclick="showDetails('${myData._id}');">عرض</button></td>
                    <td><button onclick="printreceipt('${myData._id}');">ايصال نقدية</button></td>
                    <td><button onclick="addInReserveOld('${myData._id}');">اضافة</button></td>
                    <td><button onclick="settlement('${myData._id}');">تصفيه</button></td>
                    <td><button onclick="deletReserve('${myData._id}');">حذف</button></td>                    
                </tr>
                `
            }else if(value == myData.myReserve[i].numReserve){
                tableReserve += `
                <tr>
                    <td>${myData.myReserve[i].date}</td>
                    <td>${myData.myReserve[i].user}</td>
                    <td>${myData.myReserve[i].numReserve}</td>
                    <td>${myData.myReserve[i].nameReserve}</td>
                    <td>${myData.myReserve[i].startReserve}</td>
                    <td><button onclick="showDetails('${myData._id}');">عرض</button></td>
                    <td><button onclick="printreceipt('${myData._id}');">ايصال نقدية</button></td>
                    <td><button onclick="addInReserveOld('${myData._id}');">اضافة</button></td>
                    <td><button onclick="settlement('${myData._id}');">تصفيه</button></td>
                    <td><button onclick="deletReserve('${myData._id}');">حذف</button></td>                    
                </tr>
                `
            }

        }
    }
    document.querySelector('.tbodyReserve').innerHTML = tableReserve;



}

// function searchDateReserve(value){
//     let tableSearchNum='';
//     console.log(value)
//     for(let x=0;x<allReserve[allReserve.length-1].length; x++){
//         for(let i=0; i<allReserve[allReserve.length-1][i].myReserve.length; i++) {
//             let myData = allReserve[allReserve.length-1][x];
//             console.log(value)
//             console.log(myData.myReserve[i].startReserve)

//             if(value == myData.myReserve[i].startReserve){
//                 tableSearchNum = '';
//                 tableSearchNum += `
//                 <tr>
//                     <td>${myData.myReserve[i].date}</td>
//                     <td>${myData.myReserve[i].user}</td>
//                     <td>${myData.myReserve[i].numReserve}</td>
//                     <td>${myData.myReserve[i].nameReserve}</td>
//                     <td>${myData.myReserve[i].startReserve}</td>
//                     <td><button onclick="showDetails('${myData._id}');">عرض</button></td>
//                     <td><button onclick="printreceipt('${myData._id}');">ايصال نقدية</button></td>
//                     <td><button onclick="addInReserveOld('${myData._id}');">اضافة</button></td>
//                     <td><button onclick="settlement('${myData._id}');">تصفيه</button></td>
//                     <td><button onclick="deletReserve('${myData._id}');">حذف</button></td>                    
//                 </tr>
//                 `
//             }
//         }
//     }
//     document.querySelector('.tbodyReserve').innerHTML = tableSearchNum;

// }


function printInvoiceEmpty() {
    document.querySelector('.reservation').style.display = 'none';
    document.querySelector('.invoice').style.display = 'block';
    
    window.print();
}




function printSearch(){
    document.querySelector('aside').style.display = 'none';
    document.querySelector('header').style.display = 'none';
    document.querySelector('#search').style.display = 'none';
    document.querySelector('.content').style.width = '100%';


    
window.print();
}

function refresh() {
    window.location.reload()
}

