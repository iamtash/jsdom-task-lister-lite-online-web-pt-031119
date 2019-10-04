document.addEventListener("DOMContentLoaded", () => {
  form = document.querySelector('#create-task-form')
  form.addEventListener('submit', function(e) {
    let newTaskField = document.getElementById('new-task-description')
    let newTask = newTaskField.value;
    if (newTask) {
      e.preventDefault();
      let taskList = document.querySelector('#list #tasks');
      
      taskList.appendChild(buildLi(newTask));

      newTaskField.value = null
    }
      
  });


});

let buildLi = (newTask) => {
  let liItem = document.createElement('li');
  liItem.className = newTask.split(' ').join('-');
  liItem.innerHTML = newTask;
  liItem.appendChild(buttonGenerator(newTask, 'edit')); 
  liItem.appendChild(buttonGenerator(newTask, 'delete'));
  return liItem;
}

let buildEditForm = (itemClass) => {
  let lineItem = document.querySelector(`.${itemClass}`)
  
  let editForm = document.createElement('form'); 
  editForm.id = itemClass
  editForm.action = '#'; 
  editForm.method = 'post';
  let textInput = document.createElement('input');
  textInput.type = 'text'; 
  
  textInput.value = lineItem.innerText.split('edit')[0]; 
  
  editForm.appendChild(textInput); 
  editForm.appendChild(generateUpdateButton());
  
  lineItem.parentNode.replaceChild(editForm, lineItem);
}

let generateUpdateButton = () => {
  let submit = document.createElement('input'); 
  submit.type = 'submit';
  submit.value = 'Update'
  submit.addEventListener('click', function(e) {
    e.preventDefault();
    let itemId = e.srcElement.form.id;
    let itemToUpdate = document.querySelector(`#${itemId}`);
    itemToUpdate.parentNode.replaceChild(rebuildLi(e), itemToUpdate)
  });
  return submit;
}

let rebuildLi = (e) => {
  let newText = e.srcElement.previousSibling.value;
  return buildLi(newText);
}

let deleteListItem = (itemClass) => {
  let lineItem = document.querySelector(`.${itemClass}`);
  lineItem.parentNode.removeChild(lineItem);
}

let buttonEventCallback = (e) => {
  if (e.srcElement.textContent === 'edit') {
    buildEditForm(e.currentTarget.parentNode.className);
  } else if (e.srcElement.textContent === 'delete') {
    deleteListItem(e.currentTarget.parentNode.className);
  }
}

let buttonGenerator = (newTask, action) => {
  let button = document.createElement('button'); 
  button.innerHTML = action; 
  button.className = `${action}-${newTask.split(' ').join('-')}`;
  button.addEventListener('click', function(e) {
    buttonEventCallback(e)
  });
  return button;
}


