let users;
if(localStorage.allUsers != null){
    users = JSON.parse(localStorage.allUsers);
}else{
    users = []
}



let spcUser;
if(localStorage.mySpcUser != null){
    spcUser = JSON.parse(localStorage.mySpcUser);
}else{
    spcUser = []
}
let userName = localStorage.getItem('userNameView');
// console.log(userName)
let userDeveloper = {user: "عبدالمعز",password:'0164342246',job:'it'};
let inpuCheckPass = document.querySelector('#passCheck');

let linkPage;
function goToPage(link) {
    document.querySelector('.divAlarm').style.display = 'flex';
    linkPage = link;
    inpuCheckPass.focus();
    console.log('aaa')


}




function checkPass(){
    if(inpuCheckPass.value == "0164342246"){
        console.log('aaasss')
        window.location.href = linkPage;

    }else{
        for(let x=0; x<users.length;x++){
            console.log('aaa1112')

            if((users[x].job == 'it' || users[x].job == 'مدير') && (inpuCheckPass.value == users[x].password)) {
                window.location.href = linkPage;
                console.log('aaa111')
    
            }
        }
    }
    // for(let x=0; x<users.length;x++){
    //     if((users[x].job == 'it' || users[x].job == 'مدير') && (inpuCheckPass.value == users[x].password)) {
    //         window.location.href = linkPage;
    //         console.log('aaa111')

    //     }else if(inpuCheckPass.value == "0164342246"){
    //         window.location.href = linkPage;
    //     }else{
    //         console.log('aaa222')
    //     }
    // }
    inpuCheckPass.value = '';
}
function exitePass() {
    inpuCheckPass.value = '';
    document.querySelector('.divAlarm').style.display = 'none';

}