customerUpdating.onshow=function(){
      //creat select query
  let query="SELECT name FROM customer"

  //run a Ajax call, which run query on database server
  req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=sch54620&query=" + query)

  if (req1.status==200){
    //transaction works
    results=JSON.parse(req1.responseText)
    
    //console.log("the parsed JSON is " + results)
    
    let message = ""
    for (i=0; i <= results.length-1; i++)
        message = message + results[i][0] + "\n"
    txtNameU.value = message
  
  }else{
    NSB.MsgBox("Error code: " + req1.status)
  }
}

btDelete.onclick=function(){
    let deleteN = IptNameD.value
    // make sure the name is in the database before you try to delete it
    console.log("print"+results)
    let found = false
    for (i = 0; i <= results.length - 1; i++) {
        if (deleteN == results[i][0])
            found = true
    }
    if (found == false) 
       NSB.MsgBox("That name is not in the database.")
    else if (found == true) {
      let queryDelete = "DELETE FROM customer WHERE name = " + '"' + deleteN + '"'
      req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=sch54620&query=" + queryDelete)

      if (req1.status == 200) { //transit worked.
        if (req1.responseText == 500){    // means the delete succeeded
            let message = ""
            for (i=0; i <= results.length-1; i++){
                let queryNew="SELECT name FROM customer"
                req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=sch54620&query=" + queryNew)

                if (req1.status==200){
                  //transaction works
                  results=JSON.parse(req1.responseText)
                  
                  
                  let message = ""
                  for (i=0; i <= results.length-1; i++)
                      message = message + results[i][0] + "\n"
                  txtNameD.value = message
                
                }else{
                  NSB.MsgBox("Error code: " + req1.status)
                }
            }
            NSB.MsgBox("You have successfully deleted the named " + deleteN)
        }else{
            NSB.MsgBox("There was a problem deleting " + deleteN + " from the database.")
        }
      } else {
        // transit error
        NSB.MsgBox("Error: " + req1.status);
      }  
  } // count if

}






btUpdate.onclick=function(){
    let newName = IptNameU2.value
    let oldName = IptNameU.value
    let query = "UPDATE customer SET name =" + '"' + newName + '"' + " WHERE name = " + '"' + oldName + '"'
    alert(query)
    req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=sch54620&query=" + query)

    if (req1.status == 200) { //transit worked.
        if (req1.responseText == 500) {   // means the update succeeded
            let result = JSON.parse(req1.responseText)
            console.log(result)
            let message = ""
            for (i=0; i <= results.length-1; i++){
                let queryNew="SELECT name FROM customer"
                req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=sch54620&query=" + queryNew)

                if (req1.status==200){
                  //transaction works
                  results=JSON.parse(req1.responseText)
                  
                  
                  let message = ""
                  for (i=0; i <= results.length-1; i++)
                      message = message + results[i][0] + "\n"
                  txtNameU.value = message
                 }
            }
            
            NSB.MsgBox("You have successfully changed the name!")
        } else
            NSB.MsgBox("There was a problem changing the name.")
    } else {
        // transit error
        NSB.MsgBox("Error: " + req1.status)
    }  
}
