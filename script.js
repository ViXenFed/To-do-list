// Check if there is saved data
localStorage.length === 0 ? null : getSaved(); 

// get num of all elements of list
let numsOfLi = document.getElementsByClassName('note').length;

// give id to li
let li_list = document.getElementsByClassName('note');
let id_act = 0; 
for (let i = 0; i < numsOfLi; i++) {
    if (!li_list[i].classList.contains("completed")) {
        li_list[i].id = id_act;
        id_act++;
    }
}
let completed_li = document.getElementsByClassName('completed');
for (let i = 0; i < completed_li.length; i++) completed_li[i].id=i+'compl_li';

// give id to buttons
let btn_li_del = document.getElementsByClassName('delete');
for (let i = 0; i < btn_li_del.length; i++) btn_li_del[i].id=i+'del';
let btn_li_comp = document.getElementsByClassName('complete');
for (let i = 0; i < btn_li_comp.length; i++) btn_li_comp[i].id=i+'compl';
let btn_li_delCompl = document.getElementsByClassName('del_compl');
for (let i = 0; i < btn_li_delCompl.length; i++) btn_li_delCompl[i].id=i+'del_compl';

// update values & ids
function updateLi() {
    numsOfLi, 
    li_list, 
    btn_li_comp, 
    btn_li_del, 
    btn_li_delCompl,
    completed_li = null;
    id_act = 0;
    numsOfLi = document.getElementsByClassName('note').length;
    li_list = document.getElementsByClassName('note');
    for (let i = 0; i < numsOfLi; i++) {
        if (!li_list[i].classList.contains("completed")) {
            li_list[i].id = id_act;
            id_act++;
        }
    }
    btn_li_del = document.getElementsByClassName('delete');
    for (let i = 0; i < btn_li_del.length; i++) { btn_li_del[i].id=i+'del';}
    btn_li_comp = document.getElementsByClassName('complete');
    for (let i = 0; i <btn_li_comp.length; i++) {btn_li_comp[i].id=i+'compl';}
    btn_li_delCompl = document.getElementsByClassName('del_compl');
    for (let i = 0; i < btn_li_delCompl.length; i++) { btn_li_delCompl[i].id=i+'del_compl';}
    completed_li = document.getElementsByClassName('completed');
    for (let i = 0; i < completed_li.length; i++) { completed_li[i].id=i+'compl_li';}
    console.log('ID updated succesfully.');
    saveTasks();
}

// mark Odd li
let oddClicked = false;
function markOdd() {
    updateLi();
    if (!oddClicked) {
        let idsOfLi = numsOfLi - 1;
        for (let i = 0; i <= idsOfLi; i++) {
            if (i == 0 || i%2 == 0) {
                let markColor = 'rgba(255, 200, 66, 0.5)'
                i = i.toString();
                document.getElementById(i).style.backgroundColor = markColor;
                i = Number(i);
                oddClicked = true;
            }
        }
    }
    else {
        let idsOfLi = numsOfLi - 1;
        for (let i = 0; i <= idsOfLi; i++) {
            if (i == 0 || i%2 == 0) {
                let markColor = '#F8F7F3'
                i = i.toString();
                document.getElementById(i).style.backgroundColor = markColor;
                i = Number(i);
                oddClicked = false;
            }
        }
    } 
}

// mark Even li 
let evenClicked = false;
function markEven() {
    updateLi();
    if (!evenClicked) {
        let idsOfLi = numsOfLi - 1;
        for (let i = 0; i <= idsOfLi; i++) {
            if (i == 1 || i%2 != 0) {
                let markColor = 'rgba(255, 200, 66, 1)'
                i = i.toString();
                document.getElementById(i).style.backgroundColor = markColor;
                i = Number(i);
                evenClicked = true;
            }
        }
    }
    else {
        let idsOfLi = numsOfLi - 1;
        for (let i = 0; i <= idsOfLi; i++) {
            if (i == 1 || i%2 != 0) {
                let markColor = '#F8F7F3'
                i = i.toString();
                document.getElementById(i).style.backgroundColor = markColor;
                i = Number(i);
                evenClicked = false;
            }
        }
    } 
}

// Delete first
function deleteFirst() {
    document.getElementById('0').remove();
    updateLi();
}

// Delete last
function deleteLast() {
    let lastLi = li_list.length - 1;
    lastLi.toString();
    li_list[lastLi].remove();
    updateLi();
}

// Delete li
function deleteLi(clickedId) {
    clickedId = clickedId.replace('del','');
    document.getElementById(clickedId).remove();
    updateLi();
}

// Delete completed li
function deleteCompl(clickedId) {
    updateLi();
    if (clickedId.indexOf('del_compl') >= 0) {
        clickedId = clickedId.replace('del_compl', '');
    }
    document.getElementById(clickedId+'compl_li').remove();
    updateLi();
}

// Complete li
function completeLi(clickedId) {
    updateLi();
    clickedId = clickedId.replace('compl', '');
    document.getElementById(clickedId + 'del').remove();
    document.getElementById(clickedId).className += ' completed';
    clickedId = clickedId.toString() + 'compl'
    document.getElementById(clickedId).className ='del_compl';
    document.getElementById(clickedId).innerHTML = 'X';
    clickedId = clickedId.replace('compl', '');
    document.getElementById(clickedId+'compl').setAttribute('onclick', 'deleteCompl(this.id)');
    let elem_li = document.getElementById(clickedId);
    elem_li.remove();
    ul.append(elem_li);
    updateLi();
}

// Buttons for li
const innerButtons = '<button type="button" class="delete" onclick="deleteLi(this.id)">X</button><button type="button" class="complete" onclick="completeLi(this.id)">V</button>'

// Add new task
function addTask() {
    let input_value = add_title.value;
    if (!input_value || input_value.trim().length === 0) {
        alert("Task can't be empty!");
        return;
    }
    let newLi = document.createElement('li');
    newLi.innerHTML = input_value + innerButtons;
    newLi.className = 'note';
    ul.prepend(newLi);
    updateLi();
}

// Save to local storage
function saveTasks() {
    let tasks = document.getElementById('ul').innerHTML;
    localStorage.setItem('list', tasks);
}
 
window.addEventListener("beforeunload", function() {
    saveTasks();
})

// display saved tasks
function getSaved() {
    ul.innerHTML = localStorage.getItem('list');
}