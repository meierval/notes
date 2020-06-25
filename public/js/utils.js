// Theme switcher
const themeButton = document.querySelector('#theme-button');
themeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});
