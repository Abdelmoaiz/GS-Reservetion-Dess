const Datastore = require('nedb')
const users = new Datastore({filename:'db/allUsers.db', autoload:true})
const reserve = new Datastore({filename:'db/myReserve.db', autoload:true})
const expenses = new Datastore({filename:'db/myExpenses.db', autoload:true})
const employeesMakeUp = new Datastore({filename:'db/myEmployeesMakeUp.db', autoload:true})
const userNameView = new Datastore({filename:'db/userNameView.db', autoload:true})
const items = new Datastore({filename:'db/myItems.db', autoload:true})
const suppliers = new Datastore({filename:'db/mySuppliers.db', autoload:true})
const salary = new Datastore({filename:'db/mySalary.db', autoload:true})
const employees = new Datastore({filename:'db/myEmployees.db', autoload:true})


const {ipcMain} = require('electron')

users.loadDatabase();
reserve.loadDatabase();
expenses.loadDatabase();
employeesMakeUp.loadDatabase();
userNameView.loadDatabase();
items.loadDatabase();
suppliers.loadDatabase();
salary.loadDatabase();
employees.loadDatabase();


console.log('server is runing and database');


ipcMain.on('userNameView',(e, userLogin)=>{
  userNameView.insert({userLogin}) 
});

ipcMain.on('myData',(e, mydataPro)=>{
  items.insert(mydataPro)
});

ipcMain.on('get-Data',(e,arg)=>{

  items.find({},(e,args)=>{
    ipcMain.on('get-Data', (e,da)=>{
      e.sender.send('get-Data', JSON.stringify(args))
    })
  })
})

ipcMain.on('update-items',(e,args)=>{
  items.update({_id:args.tmp},{myItems:args})
})

ipcMain.on('delete-items',(e,args)=>{
  items.remove({_id:args},{},(e,dataRemove)=>{
  })
})

ipcMain.on('myReserve',(e, myReserve,id)=>{
  reserve.insert({'myReserve':myReserve,_id:id})
  
});

ipcMain.on('get-reserve',(e,arg)=>{
  reserve.find({},(e,allReserve)=>{
    ipcMain.on('get-reserve', (e,da)=>{
      e.sender.send('get-reserve', JSON.stringify(allReserve))

    })
  })
})


ipcMain.on('update-reserve',(e,myReserve)=>{
  reserve.update({_id:myReserve.tmp},myReserve)
})


ipcMain.on('delete-reserve',(e,args)=>{
  reserve.remove({_id:args},{},(e,dataRemove)=>{
  })
})


ipcMain.on('myExpenses',(e, myExpenses)=>{
  expenses.insert({'myExpenses':myExpenses}) 
});

ipcMain.on('get-expenses',(e,arg)=>{
  expenses.find({},(e,allExpenses)=>{
    ipcMain.on('get-expenses', (e,da)=>{
      e.sender.send('get-expenses', JSON.stringify(allExpenses))

    })
  })
})

ipcMain.on('update-expenses',(e,myExpenses)=>{
  expenses.update({_id:myExpenses.tmp},{"myExpenses":myExpenses})
})


ipcMain.on('delete-expenses',(e,args)=>{
  expenses.remove({_id:args},{},(e,dataRemove)=>{
  })
})

ipcMain.on('myItems',(e, myItems)=>{
  items.insert({myItems}) 
});

ipcMain.on('myEmployees',(e, myEmployees)=>{
  employees.insert({myEmployees}) 
});

ipcMain.on('get-employees',(e,arg)=>{
  employees.find({},(e,allEmployees)=>{
    ipcMain.on('get-employees', (e,da)=>{
      e.sender.send('get-employees', JSON.stringify(allEmployees))

    })
  })
})


ipcMain.on('update-employees',(e,employee)=>{
  employees.update({_id:employee.tmpEmpl},{"myEmployees":employee})
})


ipcMain.on('delete-employees',(e,args)=>{
  employees.remove({_id:args},{},(e,dataRemove)=>{
  })
})



ipcMain.on('mySalary',(e, mySalary)=>{
  salary.insert({mySalary}) 
});


ipcMain.on('get-salary',(e,arg)=>{
  salary.find({},(e,allSalary)=>{
    ipcMain.on('get-salary', (e,da)=>{
      e.sender.send('get-salary', JSON.stringify(allSalary))

    })
  })
})


ipcMain.on('update-salary',(e,args)=>{
  salary.update({_id:args.tmp},{"mySalary":args})
})


ipcMain.on('delete-salary',(e,args)=>{
  salary.remove({_id:args},{},(e,dataRemove)=>{
  })
})


ipcMain.on('myEmployeesMakeUp',(e, myEmployeesMakeUp)=>{
  employeesMakeUp.insert({myEmployeesMakeUp}) 
});


ipcMain.on('get-makeUp',(e,arg)=>{
  employeesMakeUp.find({},(e,allEmployeesMakeUp)=>{
    ipcMain.on('get-makeUp', (e,da)=>{
      e.sender.send('get-makeUp', JSON.stringify(allEmployeesMakeUp))

    })
  })
})


ipcMain.on('update-makeUp',(e,employeeMakeUp)=>{
  employeesMakeUp.update({_id:employeeMakeUp.tmp},{"myEmployeesMakeUp":employeeMakeUp})
})


ipcMain.on('delete-makeUp',(e,args)=>{
  employeesMakeUp.remove({_id:args},{},(e,dataRemove)=>{
  })
})




ipcMain.on('mySuppliers',(e, mySuppliers)=>{
  suppliers.insert({mySuppliers})  
});


ipcMain.on('get-suppliers',(e,arg)=>{
  suppliers.find({},(e,mySuppliers)=>{
    ipcMain.on('get-suppliers', (e,da)=>{
      e.sender.send('get-suppliers', JSON.stringify(mySuppliers))

    })
  })
})


ipcMain.on('update-suppliers',(e,args)=>{
  suppliers.update({_id:args.tmp},{"mySuppliers":args})
})


ipcMain.on('delete-suppliers',(e,args)=>{
  suppliers.remove({_id:args},{},(e,dataRemove)=>{
  })
})



ipcMain.on('allUsers',(e, myUsers)=>{
  users.insert({myUsers})  
});



ipcMain.on('update-allUsers',(e,myUser)=>{

  users.update({_id:myUser.tmp},{"allUsers":myUser})
})


ipcMain.on('delete-allUsers',(e,myUser)=>{
  users.remove({_id:myUser},{},(e,dataRemove)=>{
  })
})

