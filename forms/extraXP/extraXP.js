extraXP.onshow=function(){

  let query="SELECT state FROM customer"

  //run a Ajax call, which run query on database server
  req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=sch54620&query=" + query)

  if (req1.status==200){
    //transaction works
    results=JSON.parse(req1.responseText)
    
    console.log("the parsed JSON is " + results)
    
    let message = ""
    for (i=0; i <= results.length-1; i++){
        message = results[i][0]
        DdState.addItem(message,"divider")
    }
  
  }else{
    NSB.MsgBox("Error code: " + req1.status)
  }
  
  DdState.clear()   
  for (i = 0; i <= results.length - 1; i++) 
    DdState.addItem(results[i][0])
}




DdState.onclick=function(s){
    //select
    if (typeof(s) == "object"){  // means control clicked but no selection made yet
    return                     // do nothing
    } else {
    DdState.value = s   // make dropdown show choice user made
    }
   
    let check = DdState.selection
    let query2="SELECT name FROM customer WHERE state=" + '"' + check + '"' 
  
    console.log(query2)
    req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=sch54620&query=" + query2)

    if (req1.status==200){
      results=JSON.parse(req1.responseText)
      console.log("the parsed JSON is " + results)
    
      let message2 = ""
      for (i=0; i <= results.length-1; i++)
        message2 = message2 + results[i][0] + "\n"
      console.log(message2)
      txtResults1.value = message2
  
  }else{
    NSB.MsgBox("Error code: " + req1.status)
  }
}

BackX.onclick=function(){
  ChangeForm(Homepage)
}
