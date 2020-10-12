import { nanoid } from "nanoid";

const toDo = () => {
  const toDoForm = document.querySelector(".todo"),
    toDoInput = toDoForm.querySelector(".todo__input"),
    toDoList = document.querySelector(".todo__list");

  const KEY_TODO = "toDos";

  let toDoById = {};

  const saveToDos = () => {
    localStorage.setItem(KEY_TODO, JSON.stringify(toDoById));
  };

  const loadToDos = () => {
    const loadedToDos = localStorage.getItem(KEY_TODO);
    if (!loadedToDos) {
      return;
    }

    const parsedToDos = JSON.parse(loadedToDos);
    for (const key in parsedToDos) {
      paintToDo(parsedToDos[key], key);
    }
  };

  const deleteToDo = (event) => {
    const btn = event.target;
    const li = btn.parentNode;
    li.parentNode.removeChild(li);
    delete toDoById[li.id];
    saveToDos();
  };

  const paintToDo = (text, id) => {
    if (!text) {
      return;
    }

    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    if (!id) {
      id = nanoid(6);
    }

    delBtn.classList.add("todo__button");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.id = id;
    li.appendChild(delBtn);
    li.appendChild(span);
    toDoList.appendChild(li);
    toDoById[id] = text;
    saveToDos();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!event || !toDoInput.value) {
      return;
    }

    const currentValue = toDoInput.value;
    toDoInput.value = "";
    paintToDo(currentValue);
  };

  const init = () => {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
  };
  init();
};
toDo();
