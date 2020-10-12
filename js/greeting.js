const nameContainer = document.querySelector(".name");
const KEY_USER = "currentUser";

const paintName = (name) => {
  nameContainer.innerHTML = "";
  const nameText = document.createElement("span");
  nameText.className = "name__text";
  nameText.innerText = `Hello ${name}`;
  nameContainer.appendChild(nameText);
};

const handleSubmit = (event) => {
  event.preventDefault();
  const form = event.target;
  const input = form.querySelector("input");
  const currentValue = input.value;
  localStorage.setItem(KEY_USER, currentValue);
  paintName(currentValue);
};

const paintInput = () => {
  const input = document.createElement("input");
  input.className = "name__input";
  input.placeholder = "Type your name here";
  input.type = "text";

  const form = document.createElement("form");
  form.addEventListener("submit", handleSubmit);
  form.appendChild(input);

  nameContainer.appendChild(form);
};

const tryLoadName = () => {
  const name = localStorage.getItem(KEY_USER);
  if (name) {
    paintName(name);
  } else {
    paintInput();
  }
};

const init = () => {
  tryLoadName();
};
init();
