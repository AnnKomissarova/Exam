const books = [
  {
    title: "Михаил Булгаков - Мастер и Маргарита",
    description: "Роман, работа над которым началась в декабре 1928 года и продолжалась вплоть до смерти писателя.",
    tags: ["novel"],
    price: 20,
    img: "./img/1.jpg",
    rating: 4.9,
  },
  {
    title: "Брэм Стокер - Дракула",
    description: "Роман, впервые опубликованный в 1897. Главный антагонист — вампир-аристократ граф Дракула.",
    tags: ["horror", "novel"],
    price: 12,
    img: "./img/2.jpg",
    rating: 4.7,
  },
  {
    title: "Анжей Сапковский - Ведьмак",
    description: "Цикл книг польского писателя Анджея Сапковского в жанре фэнтези.",
    tags: ["fantasy", "novel"],
    price: 38,
    img: "./img/3.jpg",
    rating: 4.8,
  },
  {
    title: "Джон Рональд Руэл Толкин - Властелин Колец",
    description: "Одно из самых известных произведений жанра фэнтези.",
    tags: ["fantasy", "novel"],
    price: 27,
    img: "./img/4.jpg",
    rating: 5,
  },
  {
    title: "Стивен Кинг - Оно",
    description: "Роман, написанный в жанре ужасов, впервые опубликованный в 1986 году.",
    tags: ["horror", "novel"],
    price: 14,
    img: "./img/5.jpg",
    rating: 4.6,
  },
  {
    title: "Миры Говарда Филлипса Лавкрафта",
    description: "Иллюстрированная энциклопедия.",
    tags: ["horror", "fantasy"],
    price: 20,
    img: "./img/6.jpg",
    rating: 4.6,
  },
  {
    title: "Дж. К. Роулинг - Гарри Поттер",
    description: "Книги представляют собой хронику приключений юного волшебника Гарри Поттера, а также его друзей, обучающихся в школе чародейства и волшебства Хогвартс.",
    tags: ["fantasy", "novel"],
    price: 105,
    img: "./img/7.jpg",
    rating: 4.8,
  },
  {
    title: "Оскар Уайльд - Портрет Дориана Грея",
    description: "самое знаменитое произведение Оскара Уайльда, единственный его роман, вызвавший в своё время шквал негативных оценок и тем не менее имевший невероятный успех.",
    tags: ["novel"],
    price: 7,
    img: "./img/8.jpg",
    rating: 4.4,
  },
  {
    title: "Иоганн Вольфганг фон Гёте - Фауст",
    description: "Это произведение стало итогом философских и художественных исканий автора – поэта, драматурга, прозаика, крупнейшего ученого своего времени.",
    tags: ["tragedy", "novel"],
    price: 7,
    img: "./img/9.jpeg",
    rating: 4.3,
  },
  {
    title: "Дуглас Адамс - Автостопом по галактике",
    description: "Юмористический фантастический роман английского писателя Дугласа Адамса.",
    tags: ["fantasy", "novel"],
    price: 9,
    img: "./img/10.jpg",
    rating: 4.8,
  },
  {
    title: "Нил Гейман - Американские Боги",
    description: "Это роман о богах, привезенных в Америку людьми из разных уголков мира, почитаемых, а потом забытых.",
    tags: ["fantasy", "novel"],
    price: 10,
    img: "./img/11.jpg",
    rating: 4.7,
  },
  {
    title: "Фридрих Ницше - Так говорил Заратустра",
    description: "Философский роман Фридриха Ницше.",
    tags: ["novel"],
    price: 8,
    img: "./img/12.jpg",
    rating: 4.8,
  },
];

let currentState = [...books];

const booksContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

function renderBooks(arr) {
  nothingFound.textContent = "";
  booksContainer.innerHTML = "";
  arr.forEach((item) => {
    booksContainer.append(prepareShopItem(item));
  });
  if (!arr.length) {
    nothingFound.textContent = "Ничего не найдено";
  }
}

function sortByAlphabet(a, b) {
  if (a.title > b.title) {
    return 1;
  }
  if (a.title < b.title) {
    return -1;
  }
  return 0;
}

renderBooks(currentState.sort((a, b) => sortByAlphabet(a, b)));


function prepareShopItem(shopItem) {
  const { title, description, tags, img, price, rating } = shopItem;
  const item = itemTemplate.content.cloneNode(true);
  item.querySelector("h1").textContent = title;
  item.querySelector("p").textContent = description;
  item.querySelector("img").src = img;
  item.querySelector(".price").textContent = `${price}$`;

    const ratingContainer = item.querySelector(".rating");
   for (let i = 0; i < rating; i++) {
    const star = document.createElement("i");
    star.classList.add("fa", "fa-star");
    ratingContainer.append(star);
  }

  const tagsHolder = item.querySelector(".tags");

  tags.forEach((tag) => {
    const element = document.createElement("span");
    element.textContent = tag;
    element.classList.add("tag");
    tagsHolder.append(element);
  });

  return item;
}

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function applySearch() {
  const searchString = searchInput.value.trim().toLowerCase();
  currentState = books.filter((el) =>
    el.title.toLowerCase().includes(searchString)
  );
  currentState.sort((a, b) => sortByAlphabet(a, b));
  renderBooks(currentState);
  sortControl.selectedIndex = 0;
}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);

const sortControl = document.querySelector("#sort");
const genreControl = document.querySelector("#genre");

genreControl.addEventListener("change", (event) => {
  const selectedGenre = event.target.value;
  switch (selectedGenre) {
    case "novel": {
      currentState.filter(genre => genre.tags.includes("novel"));
      break;
    }
    case "horror": {
      currentState.filter(genre => genre.tags.includes("horror"));
      break;
    }
    case "fantasy": {
      currentState.filter(genre => genre.tags.includes("fantasy"));
      break;
    }
  }
  renderBooks(currentState);  
});


sortControl.addEventListener("change", (event) => {
  const selectedOption = event.target.value;
  switch (selectedOption) {
    case "expensive": {
      currentState.sort((a, b) => b.price - a.price);
      break;
    }
    case "cheap": {
      currentState.sort((a, b) => a.price - b.price);
      break;
    }
    case "rating": {
      currentState.sort((a, b) => b.rating - a.rating);
      break;
    }
    case "alphabet": {
      currentState.sort((a, b) => sortByAlphabet(a, b));
      break;
    }
    case "novel": {
      currentState.filter(genre => genre.tags.includes("novel"));
      break;
    }
    case "horror": {
      currentState.filter(genre => genre.tags.includes("horror"));
      break;
    }
    case "fantasy": {
      currentState.filter(genre => genre.tags.includes("fantasy"));
      break;
    }
  }
  renderBooks(currentState);
});

