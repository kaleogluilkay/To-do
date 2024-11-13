// DOM öğelerini alıyoruz
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// LocalStorage'den todo'ları alalım
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Todo'ları ekrana yazdıran fonksiyon
function renderTodos() {
  todoList.innerHTML = ''; // Önceki listeyi temizle
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'todo-item');
    if (todo.completed) {
      li.classList.add('completed');
    }

    li.innerHTML = `
      <span class="todo-text">${todo.text}</span>
      <button class="btn btn-warning btn-sm edit-btn">Düzenle</button>
      <button class="btn btn-danger btn-sm delete-btn">Sil</button>
    `;

    // Düzenle butonuna tıklandığında
    li.querySelector('.edit-btn').addEventListener('click', () => editTodo(index));
    // Silme butonuna tıklandığında
    li.querySelector('.delete-btn').addEventListener('click', () => deleteTodo(index));
    // Todo'nun üzerine tıklanırsa tamamlanmış yap
    li.addEventListener('click', () => toggleComplete(index));

    todoList.appendChild(li);
  });
}

// Yeni todo ekleme
addBtn.addEventListener('click', () => {
  const text = todoInput.value.trim();
  if (text !== '') {
    const newTodo = {
      text,
      completed: false
    };
    todos.push(newTodo);
    todoInput.value = ''; // Input'u temizle
    saveTodos();
    renderTodos();
  }
});

// Todo'yu tamamla (çiz)
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

// Todo'yu silme
function deleteTodo(index) {
  todos.splice(index, 1); // Todo'yu listeden çıkar
  saveTodos();
  renderTodos();
}

// Todo'yu düzenleme
function editTodo(index) {
  const newText = prompt("Todo'yu düzenleyin:", todos[index].text);
  if (newText !== null && newText.trim() !== '') {
    todos[index].text = newText;
    saveTodos();
    renderTodos();
  }
}

// Todos'u localStorage'a kaydetme
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Sayfa ilk yüklendiğinde todos'u render et
renderTodos();