const usersForm = document.querySelector('.usersForm');
const expensesForm = document.querySelector('.expensesForm');
const content = document.querySelector('.content');
const description = document.querySelector('.form__description');
const amount = document.querySelector('.form__amount');
const sendButton = document.querySelector('.form__post');

usersForm.addEventListener('submit', event => {
   event.preventDefault();
   const { form__email, form__password } = event.target.elements;
   const button = event.target.ownerDocument.activeElement.name;
   const user = {
      email: form__email.value,
      password: form__password.value
   };

   switch (button) {
      case 'form__signin':
         fetch('http://localhost:3000/users/signup', {
            method: 'post',
            body: JSON.stringify(user),
            headers: { 'Content-type': 'application/json' }
         })
            .then(res => res.json())
            .then(token => {
               alert('Usuario creado');
               usersForm.reset();
               console.log(token);
               sessionStorage.setItem('token', token.token);
            });
         break;
      case 'form__login':
         console.log(user);
         fetch(`http://localhost:3000/users/login`, {
            method: 'post',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
         })
            .then(res => {
               if (res.status === 200) {
                  return res.json();
               } else {
                  res = null;
               }
            })
            .then(token => {
               if (token) {
                  console.log(token);
                  usersForm.reset();
                  sessionStorage.setItem('token', token.token);
                  usersForm.reset();
                  alert('Log in');
               } else {
                  alert('Check email or password');
               }
            });
         break;
      case 'form__logout':
         sessionStorage.clear();
         alert('You are log out');
         break;
      default:
         break;
   }
});

expensesForm.addEventListener('submit', event => {
   event.preventDefault();
   const { form__description, form__amount } = event.target.elements;
   const button = event.target.ownerDocument.activeElement;
   const token = sessionStorage.getItem('token');
   const expense = {
      description: form__description.value,
      amount: form__amount.value
   };
   switch (button.name) {
      case 'form__get':
         if (token) {
            fetch('http://localhost:3000/expenses', {
               headers: {
                  Authorization: token,
                  'Content-type': 'application/json'
               }
            })
               .then(data => data.json())
               .then(expenses => {
                  let result = expenses
                     .map(
                        expense => `
                     <h2>${expense.description}</h2>
                     <p>${expense.amount}</p>
                     <button data-id="${expense._id}" name="delete">Borrar</button>
                     <button data-id="${expense._id}" name="edit">Editar</button>
                  `
                     )
                     .join('');
                  content.innerHTML = result;
               });
         } else {
            alert('Please log in');
         }
         break;
      case 'form__post':
         if (button.innerText === 'Enviar') {
            if (token) {
               fetch('http://localhost:3000/expenses', {
                  method: 'post',
                  body: JSON.stringify(expense),
                  headers: {
                     Authorization: token,
                     'Content-type': 'application/json'
                  }
               })
                  .then(data => data.json())
                  .then(expense => {
                     console.log(expense);
                  });
            } else {
               alert('Please log in');
            }
         } else if (button.innerText === 'Editar') {
            fetch(`http://localhost:3000/expenses/${button.dataset.id}`, {
               method: 'put',
               body: JSON.stringify(expense),
               headers: {
                  Authorization: token,
                  'Content-type': 'application/json'
               }
            })
               .then(data => data.json())
               .then(expense => console.log(expense));
            sendButton.innerText = 'Enviar';
         }
         expensesForm.reset();
         break;
      default:
         break;
   }
});

content.addEventListener('click', event => {
   event.preventDefault();
   const token = sessionStorage.getItem('token');
   const button = event.target;
   switch (button.name) {
      case 'delete':
         if (token) {
            fetch(`http://localhost:3000/expenses/${button.dataset.id}`, {
               method: 'delete',
               headers: {
                  Authorization: token,
                  'Content-Type': 'application/json'
               }
            })
               .then(data => data.json())
               .then(expense => console.log(expense));
            alert('Deleted');
         } else {
            alert('Please log in');
         }
         break;
      case 'edit':
         fetch(`http://localhost:3000/expenses/${button.dataset.id}`, {
            method: 'get',
            headers: {
               Authorization: token,
               'Content-Type': 'application/json'
            }
         })
            .then(data => data.json())
            .then(expense => {
               description.value = expense.description;
               amount.value = expense.amount;
               sendButton.innerText = 'Editar';
               sendButton.dataset.id = expense._id;
            });
         break;
      default:
         break;
   }
});
