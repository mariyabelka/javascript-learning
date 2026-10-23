const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

// ===== 1. Билетная касса =====
function ticketPrice(category) {
  switch (category) {
    case 1: return 300;
    case 2: return 500;
    case 3: return 900;
    default: return 0;
  }
}

function maxTickets(budget, price) {
  let count = 0;
  let spent = 0;
  while (spent + price <= budget) {
    count++;
    spent += price;
  }
  return count;2
}

function printTicketResult(category, budget) {
  const price = ticketPrice(category);
  if (price === 0) {
    console.log('неизвестная категория');
    return;
  }
  const count = maxTickets(budget, price);
  console.log(`Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${count} шт.`);
}

// ===== 2. Доставка заказа =====
function deliveryPrice(distance, total) {
  if (total >= 3000) return 0;
  if (distance <= 3) return 0;
  if (distance <= 10) return 200;
  return 200 + 25 * (distance - 10);
}

function printDelivery(distance, total) {
  const price = deliveryPrice(distance, total);
  console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${price} руб.`);
}

// ===== 3. Лестница =====
function printSteps(height) {
  let count = 0;
  for (let i = 1; i <= height; i++) {
    if (i === 4) continue;
    console.log(`Ступень ${i}`);
    count++;
    if (i === 10) {
      console.log('Дальше лестница не построена');
      break;
    }
  }
  console.log(`Всего построено: ${count}`);
}

// ===== Меню =====
async function main() {
  console.log('Выберите задачу:');
  console.log('1 — билетная касса');
  console.log('2 — доставка заказа');
  console.log('3 — лестница');

  const choice = await ask('Ваш выбор: ');

  if (choice === '1') {
    const category = parseInt(await ask('Категория билета: '));
    const budget = parseInt(await ask('Бюджет: '));
    printTicketResult(category, budget);
  } else if (choice === '2') {
    const distance = parseInt(await ask('Расстояние: '));
    const total = parseInt(await ask('Сумма заказа: '));
    printDelivery(distance, total);
  } else if (choice === '3') {
    const height = parseInt(await ask('Высота лестницы: '));
    printSteps(height);
  } else {
    console.log('такой задачи нет');
  }

  rl.close();
}

main();
