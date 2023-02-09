import { nanoid } from 'nanoid';

export function createPizza(items, currentTarget) {
  const title = currentTarget.title.value;
  const price = currentTarget.price.value;
  const image = currentTarget.image.value;
  const description = currentTarget.description.value;
  console.log(nanoid())
  if (!title || !price || !image || !description) return;

  const item = {
    title,
    price,
    image,
    description,
    selected: false,
    id: Date.now()
  }

  return [...items, item];
}

export function remove(id, items) {
  return items.filter(res => res.id !== id);
}

export function markAsSelected(id, items) {
  const item = items.find(res => res.id === id);
  const curIndex = items.findIndex(res => res.id === id);

  const itemUpdated = {
    ...item,
    selected: !item.selected
  }

  return [
    ...items.slice(0, curIndex),
    itemUpdated,
    ...items.slice(curIndex + 1)
  ]
}

export function edit(eTarget, items) {
  const id = parseInt(eTarget.id);
  const title = eTarget.title.value;
  const price = eTarget.price.value;
  const image = eTarget.image.value;
  const description = eTarget.description.value;

  if (!title || !price || !image || !description) return;

  // 1) Найти пиццу по ID
  const itemOriginal = items.find(res => res.id === id);
  const curIndex = items.findIndex(res => res.id === id);

  const itemUpdated = {
    ...itemOriginal,
    title,
    price,
    image,
    description
  }

  return [
    ...items.slice(0, curIndex),
    itemUpdated,
    ...items.slice(curIndex + 1)
  ]
}

export function checkButtons(items) {
  let checkedPizzas = 0;
  let itemsChecked = [];

  items.forEach(res => {
    if (res.selected === true) {
      checkedPizzas++;
    }
  });

  if (checkedPizzas === items.length) {
    itemsChecked = items.map(res => {
      return {
        ...res,
        selected: false
      }
    });
  } else {
    itemsChecked = items.map(res => {
      return {
        ...res,
        selected: true
      }
    });
  }
  return itemsChecked;
}

