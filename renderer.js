let username = document.querySelector("#username");
let password = document.querySelector("#password");
let btnSignIn = document.querySelector(".btn-signIn");
// const {ipcRenderer}=   require('electron')


let users;
if(localStorage.allUsers != null){
    users = JSON.parse(localStorage.allUsers);
}else{
    users = []
}
let userNameView ;
let job;

btnSignIn.onclick = (e) =>{
    if(username.value == 'عبدالمعز' && password.value == '0164342246'){
        btnSignIn.href = "./Component/home/home.html";
        userNameView = username.value;
        job = 'it';

    }else if(username.value == 'Demo' && password.value == '2'){
        btnSignIn.href = "./Component/home/home.html";
        userNameView = username.value;
        job = 'it';

    }else if(username.value == 'هانى' && password.value == '123456'){
        btnSignIn.href = "./Component/home/home.html";
        userNameView = username.value;
        job = 'مدير';

    }else{
        for(let i=0; i<users.length;i++){
            if(username.value === users[i].user && password.value === users[i].password ){
            
                btnSignIn.href = "./Component/home/home.html";
                userNameView = username.value;
                
        
            }
        }
    }
    localStorage.setItem('userNameView',userNameView);
    // ipcRenderer.send('userNameView',userNameView)
    
    // btnSignIn.reset();


    // e.preventDefault();
    
    
}
userNameView = localStorage.getItem('userNameView');


// /Component/home/home.html