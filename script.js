// // Находим все нужные кнопки, кроме первых двух (потом удалить)

// const list = [
//   ...document.querySelectorAll("button.artdeco-button--secondary.ember-view"),
// ];

// // Фильтруем только кнопки с "Установить контакт"

// const filteredList = list.filter((elem) =>
//   elem.innerText.includes("Установить контакт") ? elem : false
// );

// // Вернуть кнопки с числами (т.е страницы)

// const pageButtons = [...querySelectorAll("button[aria-label]")].filter((elem) =>
//   elem.innerText > 0 ? elem : false
// );

// // Номер страниц

// numOfPages = +pageButtons[pageButtons.length - 1].innerText;

// // Нахожу кнопку "Персанолизировать"

// let msgBtn = document.querySelector("button.mr1");

// // Окно с текстом

// let textArea = document.querySelector("textarea#custom-message");

// // Меняем статус окна, чтобы увидеть измененный Value

// textArea.dispatchEvent(new Event("change", { bubbles: true }));

// // Окно подтвеждения

// let submitBtn = document.querySelector("button.ml1");

////////////////////////////////////////////////////
const app = () => {
  // sleep для будущего async

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function waitUntill(condition, doStuff) {
    return await new Promise((resolve) => {
      const waitError = setInterval(() => {
        if (!!eval(condition)) {
          resolve("123");
          clearInterval(waitError);
          doStuff();
        }
      }, 50);
    });
  }

  // Добавляем всех людей на странице, у которых есть "Установить контакт"

  async function addEveryone() {
    await waitUntill(`document.querySelector(".ember-view")`, () => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await sleep(1000);

    // Список кнопок с "Установить контакт"

    let list = [
      ...document.querySelectorAll(
        "button.artdeco-button--secondary.ember-view"
      ),
    ].filter((elem) =>
      elem.innerText.includes("Установить контакт") ? elem : false
    );

    // Цикл для нажатия каждой кнопки

    for (const elem of list) {
      elem.click();
      let msgBtn = document.querySelector("button.mr1");
      msgBtn.click();
      await sleep(100);
      let textArea = document.querySelector("textarea#custom-message");
      textArea.value = `Здравствуйте, я добавил вас, используя свой JS скрипт
      Hello, I added you using my own JS script.`;
      textArea.dispatchEvent(new Event("change", { bubbles: true }));
      document.querySelector("button.ml1").click();
      await waitUntill(
        `document.querySelector("button[aria-label='ОК']")`,
        () => {
          document.querySelector("button[aria-label='ОК']").click();
        }
      );
      // const waitError = setInterval(() => {
      //   if (!!document.querySelector("button[aria-label='ОК']")) {
      //     clearInterval(waitError);
      //     document.querySelector("button[aria-label='ОК']").click();
      //     resolve("123");
      //   }
      // }, 50);
    }
    if (!document.querySelector("button[aria-label='Далее']").disabled) {
      document.querySelector("button[aria-label='Далее']").click();
      await sleep(750);
      location.reload();
    }
  }

  addEveryone();
};

app();
