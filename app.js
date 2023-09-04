//auth vars
let login = document.getElementById('userName');
let password = document.getElementById('userPassword');
let createUserBtn = document.querySelector("#createUserBtn");
let regBtn = document.querySelector("#regBtn");
let regSaveBtn = document.getElementById("regSaveBtn");
let regCloseBtn = document.getElementById("regCloseBtn");
let loginBtn = document.getElementById("LoginBtn");
let greet = document.getElementById("greet");
let userNameLogIn = document.getElementById("userNameLogIn");
let userPasswordLogIn = document.getElementById("userPasswordLogIn");



let addBtn = document.getElementById("addBtn");
let sellCar = document.getElementById('sellCar');
let addImg = document.getElementById('addImg');
let addText = document.getElementById('addText');
let addDescr = document.getElementById('addDescr');
let price = document.getElementById("price")
let sectionCards = document.querySelector(".section_cards");
let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById('nextBtn');
let val = '';
let val2 = '';
let page = 1;
let countPage = 1;
let search = document.getElementById("searchInp");
let transmission = document.getElementById("transmission")
let wd = document.getElementById("wd");
let Carbody = document.getElementById("Carbody");
let btnDelete = document.querySelector(".card-delete");
let editBtn = document.querySelector(".editBtn1");

//modal
let modalRus = document.querySelector(".modalRus");
let regModal = document.getElementById("regModal");
let logInModal = document.getElementById("logInModal");


//
let authBtn = document.getElementById("authBtn");
let gearBox = document.getElementById("gearBox")
let editInpImage= document.getElementById("editInpImage")
let editCarBody = document.getElementById("editCarBody")
let editInpName = document.getElementById("editInpName")
let editInpDescription = document.getElementById("editInpDescription")
let editInpTransmission = document.getElementById("editInpTransmission");
let editBtnSave = document.getElementById("editBtnSave");
let closeBtn = document.getElementById("closeBtn");
let LoginCloseBtn = document.getElementById("LoginCloseBtn");


let URL = 'http://localhost:3000/cars'

sellCar.addEventListener("click",()=>{
    
    let cars =     {
        cardImage: addImg.value,
        name: addText.value,
        description: addDescr.value,
        transmission: transmission.value,
        Carbody: Carbody.value,
        price:price.value
      }
    createCards(cars)
    readCards();
})

//registration
regCloseBtn.addEventListener("click", () => regModal.style.display = 'none');


regSaveBtn.addEventListener("click",(e)=>{ 
      e.preventDefault();
      createUser()
})

createUserBtn.addEventListener("click",()=>{
  regModal.style.display = "grid";
})

function createUser(){
    let users = {
        name: login.value,
        pass: password.value,
    }

    fetch("http://localhost:3000/users",{
        method: 'POST',
        body: JSON.stringify(users),
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(alert('Спасибо за регистрацию!'))
}


//login




let openLoginModalBtn = document.getElementById("openLoginModalBtn");


openLoginModalBtn.addEventListener("click",()=>{ logInModal.style.display = 'grid'; })
LoginCloseBtn.addEventListener("click", () => logInModal.style.display = 'none');

loginBtn.addEventListener("click",(e)=>{
  e.preventDefault();
  logIn();
})


let delBtn= document.getElementById("delBtn");



function logIn(){
  fetch(`http://localhost:3000/users?q=${userNameLogIn.value}&pass=${userPasswordLogIn.value}`).then((response)=>{

  if (response.status !== 200) {
    console.error(`Ошибка: ${response.status}`);
    return;
  }
     return response.json();

  }).then((data)=>{
    data.forEach((item)=>{
      if(item.name && item.pass == userNameLogIn.value && userPasswordLogIn.value){
        let cardGroup = document.querySelectorAll(".card-button")
        cardGroup.forEach((item)=>{
          item.style.display = 'flex';
          data.preventDefault;
        })
      }
      else{
        alert("Пользователя не существует")
      }
    })
  })
  
}


//create
function createCards(cards){
    fetch(URL,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cards)
    }).then((()=> readCards()))
    addImg.value = '';
    addDescr.value = '';
    addText.value = '';
}
//read
function readCards(){
    fetch(`${URL}?q=${val}&_page=${page}&_limit=2`)
    .then((response)=> response.json())
    .then((data)=>{
        sectionCards.innerHTML = "";
        data.forEach(element => {
            sectionCards.innerHTML+=`
                    
          <li class="cards" > 
          <div class="img"> 
            <img 
              src="${element.cardImage}" 
              alt="cars" 
              class="carsCards"
            />
            <h2 class="card-name">${element.name}</h2> 
            <p>${element.description}</p> 
            <p>${element.price}</p> 
            <div class="card-button"> 
              <button type="button" class="card-delete btn btn-danger" id="${element.id}">Delete</button>
              <button id="${element.id}" class="btn btn-success editBtn1 card-edit">Edit</button>
            </div> 
          </div> 
        </li>
          `;
        });
        pagination()
    })
}
readCards();

//search
search.addEventListener("input",(e)=>{
  val = e.target.value
  readCards();
})

//пагинация
function pagination(){
    fetch(`${URL}?q=${val}`)
    .then((response)=> response.json())
    .then((data)=>{
        countPage = Math.ceil(data.length /5);
    })
}

prevBtn.addEventListener("click",()=>{
    if(page <= 1) return;
    page--
    readCards();
})

nextBtn.addEventListener("click",()=>{
    if(page >= countPage) return;
    page++
    readCards();
})
//delete

document.addEventListener("click", (event) => {
    let del_class = [...event.target.classList];
    if (del_class.includes("card-delete")) {
      let del_id = event.target.id;
      fetch(`${URL}/${del_id}`, {
        method: "DELETE",
      }).then(() => readCards());
    }
  });


//filter
gearBox.addEventListener("change",(event)=>{
  val = event.target.value
  if(val == 'All'){
    val = "";
    event.preventDefault()
  }
  readCards();
})

let CarType = document.getElementById("CarType");
CarType.addEventListener("change",(event)=>{
  val = event.target.value
  if(val == 'All'){
    val = "";
    event.preventDefault()
  }
  readCards();
})


//edit
document.addEventListener("click",(event)=>{
  let arr = [...event.target.classList];
  if(arr.includes("card-edit")){
    let id = event.target.id
    fetch(`${URL}/${id}`)
    .then((res)=> res.json()).then((data)=> {
      editInpImage.value = data.cardImage
      editCarBody.value = data.Carbody
      editInpName.value = data.name
      editInpTransmission.value = data.transmission
      editInpDescription.value = data.description
      editBtnSave.setAttribute("id",data.id);
    })
  }
})

closeBtn.addEventListener("click",()=>{
  modalRus.style.display="none"
})

let edit = document.querySelectorAll(".card-edit");



edit.addEventListener("click",()=>{
  console.log(12)
})