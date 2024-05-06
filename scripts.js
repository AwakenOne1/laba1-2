document.getElementById('news-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const text = document.getElementById('text').value;

  const news = {
    title: title,
    text: text,
    date: new Date().toLocaleString(),
  };

  let storedNews = JSON.parse(localStorage.getItem('news')) || [];
  storedNews.push(news);
  localStorage.setItem('news', JSON.stringify(storedNews));

  // Обновить список новостей на странице
  updateNewsList();

  // Закрыть модальное окно
  closeModal();
});

function updateNewsList() {
  const newsList = document.getElementById('news-list');
  newsList.innerHTML = '';

  const storedNews = JSON.parse(localStorage.getItem('news')) || [];
  storedNews.forEach((news, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <h3>${news.title}</h3>
      <p>${news.text}</p>
      <small>${news.date}</small>
      <button class="delete" data-index="${index}">Удалить</button>
      <button class="update" data-index="${index}">Обновить</button>
    `;
    newsList.appendChild(li);
  });

  const deleteButtons = document.querySelectorAll('.delete');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', deleteNews);
  });

  const updateButtons = document.querySelectorAll('.update');
  updateButtons.forEach((button) => {
    button.addEventListener('click', updateNews);
  });
}

document.getElementById('search').addEventListener('input', function (e) {
  const searchText = e.target.value.toLowerCase();
  const storedNews = JSON.parse(localStorage.getItem('news')) || [];

  const filteredNews = storedNews.filter(
    (news) =>
      news.title.toLowerCase().includes(searchText) ||
      news.text.toLowerCase().includes(searchText)