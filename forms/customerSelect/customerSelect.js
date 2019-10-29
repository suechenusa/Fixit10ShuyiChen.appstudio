customerSelect.onshow=function(){
    //creat select query
  let query="SELECT state FROM customer"

  //run a Ajax call, which run query on database server
  req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=sch54620&query=" + query)

  if (req1.status==200){
    //transaction works
    results=JSON.parse(req1.responseText)
    
    console.log("the parsed JSON is " + results)
    
    let message = ""
    for (i=0; i <= results.length-1; i++)
        message = message + results[i][0] + "\n"
    console.log(message)
    txtState.value = message
  
  }else{
    NSB.MsgBox("Error code: " + req1.status)
  }
}


btSubmit.onclick=function(){
  let check = IptState.value
  let query2="SELECT name FROM customer WHERE state=" + '"' + check + '"' 
  
  console.log(query2)
  req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=sch54620&query=" + query2)

  if (req1.status==200){
    //transaction works
    results=JSON.parse(req1.responseText)
    
    console.log("the parsed JSON is " + results)
    
    let message2 = ""
    for (i=0; i <= results.length-1; i++)
        message2 = message2 + results[i][0] + "\n"
    console.log(message2)
    txtResults.value = message2
  
  }else{
    NSB.MsgBox("Error code: " + req1.status)
  }
}




BackS.onclick=function(){
  ChangeForm(Homepage)
}
