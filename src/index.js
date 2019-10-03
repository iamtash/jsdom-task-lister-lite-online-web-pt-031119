document.addEventListener("DOMContentLoaded", () => {
  form = document.querySelector('#create-task-form')
  form.addEventListener('submit', function(e) {
    let newTaskField = document.getElementById('new-task-description')
    let newTask = newTaskField.value;
    if (newTask) {
      e.preventDefault();
      let taskList = document.querySelector('#list #tasks');
      let liItem = document.createElement('li');
      liItem.innerHTML = newTask;
      taskList.appendChild(liItem)
      let editButton = document.createElement('button'); editButton.innerHTML = 'Edit';
      let deleteButton = document.createElement('button'); deleteButton.innerHTML = 'Delete';
      liItem.appendChild(editButton); liItem.appendChild(deleteButton);
      let itemButtons = document.querySelectorAll('#tasks li button');
      itemButtons.forEach(function(itemButton) {
        itemButton.addEventListener('click', function(e) {
          if (e.srcElement.textContent === 'Edit') {
            buildEditForm(itemButton.parentNode);
          } else if (e.srcElement.textContent === 'Delete') {
            itemButton.parentNode.parentNode.removeChild(itemButton.parentNode)
          }
        });
      });
      newTaskField.value = null
      }
  });


});

let buildEditForm = (item) => {
  let editForm = document.createElement('form'); 
  editForm.action = '#'; editForm.method = 'post';
  let textInput = document.createElement('input');
  textInput.type = 'text'; textInput.value = item.innerText.split('Edit')[0];
  let submit = document.createElement('input'); submit.value = 'Update'
  editForm.appendChild(textInput); editForm.appendChild(submit);
  item.appendChild(editForm);
}

