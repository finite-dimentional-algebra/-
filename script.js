function Formatdatelist(dateInput){
  
  const date = new Date(dateInput); // 文字列でもDate型でもOK
  return [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours()]



}
//時刻表示
function formatJapaneseDate(dateInput) {
    if(dateInput){
        
        const DateList = Formatdatelist(dateInput)
        
        return `${DateList[0]}年${DateList[1]}月${DateList[2]}日 ${DateList[3]}時`;
    }
    else{return "---"}
  
 
  
}




//リストの要素の生成
function CreateObjs(id, time){
    const text = id + "   :  "+ formatJapaneseDate(time)
    let item = document.createElement("li");
    
    item.textContent=text
    item.id = id
    butt = document.createElement("button");
    butt.className="del-button"
    butt.onclick = function(){
        Del(id, time)
    }
   
    butt.textContent="削除"
     item.prepend(butt)
    return item

}

function addTask() {
    let textinput=document.getElementById("taskInput")
    let input = textinput.value;
    let time = document.getElementById("dateinput").value;
    console.log("time=", time)
    if (input === "") return;
    
    let list = document.getElementById("taskList");
    
    if(document.getElementById(input)){
       return
    }
    else{ let item = CreateObjs(input, time)
        list.appendChild(item);
        let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        tasks.push([input, time]);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    textinput.value = ""
}


const Del =(id, time)=>{
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    let item = document.getElementById(id);
    console.log(tasks)
    console.log("compared to:", [id, time])
    let newtasks = tasks.filter(task => JSON.stringify(task) != JSON.stringify([id, time]));
    
    item.remove()
    localStorage.setItem("tasks", JSON.stringify(newtasks));
    console.log("tasks=", newtasks)

}

// ロード時に復元
window.onload = () => {let tasks = JSON.parse(localStorage.getItem("tasks"));
    console.log(tasks)

    tasks.forEach(task => {
        let item = CreateObjs(task[0], task[1]);
        let list = document.getElementById("taskList");
        list.appendChild(item)

    })
    
    
}


