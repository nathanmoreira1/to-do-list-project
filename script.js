let saved_informations = [];

const addItem = () => {
    let father = document.querySelector(".to-do-list-itens");
    let child = document.querySelector(".to-do-list-item").cloneNode(true);
    father.append(child);

    /* Resetar as informações de um elemento para outro */
    child.children[0].children[0].setAttribute("src", "./images/none.jpg"); // Reseta a imagem
    child.children[1].value = ""; // Reseta o texto
    child.children[1].focus()
}

const removeItem = (el) => {
  if(document.querySelector(".to-do-list-itens").children.length > 1) {
    let father = el.parentNode;
    father.parentNode.removeChild(father);
  }
  else {
    let father = el.parentNode;
    father.children[0].children[0].setAttribute("src", "./images/none.jpg");
    father.children[1].value = "";
  }
}

const TaskDone = (el) => {
  let img = el.children[0];

  if(img.getAttribute("src") == "./images/none.jpg") {
    img.setAttribute("src", "./images/done.png");
  }
  else {
    img.setAttribute("src", "./images/none.jpg");
  }
}

const saveTasks = () => {
  let itens = document.querySelector(".to-do-list-itens").children
  let itens_array = [...itens]
  itens_array.map((item) => {
    if([...item.children][1].value !== '') {
      saved_informations.push(
        {
          img: [...item.children][0].children[0].getAttribute("src"),
          text: [...item.children][1].value
        }
      )
    }
  })
  // Precisamos filtrar as informações do array "saved_informations"
  let unique_saved_informations = new Map();

  saved_informations.forEach((information) => {
    if(!unique_saved_informations.has(information.text)) {
      unique_saved_informations.set(information.text, information);
    }
  });

  unique_saved_informations = [...unique_saved_informations.values()]

  localStorage.setItem("ToDoList", JSON.stringify(unique_saved_informations));
}

const loadPastItens = () => {
  let pastContentJson = localStorage.getItem("ToDoList");
  let father = document.querySelector(".to-do-list-itens");

  if(pastContentJson !== '') {
    let pastContentArray = JSON.parse(pastContentJson);
    pastContentArray.map((item) => {
      let child = document.querySelector(".to-do-list-item").cloneNode(true);
      child.children[0].children[0].setAttribute("src", item.img);
      child.children[1].value = item.text;
      father.append(child);
    })
  }

  // Como, no HTML, já existe o molde do primeiro item adicionado, ele se "repete". Dessa maneira, precisamos excluí-lo
  father.children[0].remove()
}

loadPastItens()
