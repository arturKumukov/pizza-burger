import { 
  list, 
  addPizzaForm, 
  buttonCheck, 
  formsList,
} from './lib/elements';

import { 
  createPizza,
  remove,
  markAsSelected,
  edit,
  checkButtons
} from './lib/helpers';

import cardHTML from './lib/card';
import formHTML from './lib/form';

let items = [];

function handleSubmit(e) {
  e.preventDefault();
  const newItems = createPizza(items, e.currentTarget);
  items = newItems;

  e.currentTarget.reset();
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayItems() {
  list.innerHTML = cardHTML(items); 
}

function displayFormItems() {
  formsList.innerHTML = formHTML(items);
}

function saveToLocalStorage() {
  localStorage.setItem('items', JSON.stringify(items));
}

function getFromLocalStorage() {
  const localStorageItems = JSON.parse(localStorage.getItem('items'));

  if (localStorageItems && localStorageItems.length) {
    // items = localStorageItems;
    // localStorageItems.forEach(res => {
    //   items.push(res);
    // })
    items.push(...localStorageItems);
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
  }
}

addPizzaForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', displayFormItems);
list.addEventListener('itemsUpdated', saveToLocalStorage);
// Делегирование событий: слушаем событие на родительском <ul>
// далее делегируем событие элементу <button>
list.addEventListener('click', function(e) {
  const id = parseInt(e.target.value);

  if (e.target.matches('button')) {
    const newItems = remove(id, items);
    items = newItems;
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
  }

  if (e.target.matches('input[type="checkbox"]')) {
    const newItems = markAsSelected(id, items);
    items = newItems;
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
  }
});

formsList.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const itemsUpdated = edit(e.target, items);
  items = itemsUpdated;
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
});

getFromLocalStorage();

buttonCheck.addEventListener('click', function() {
  const itemsChecked = checkButtons(items);
  items = itemsChecked;
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
})

