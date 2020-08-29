import { getData } from '../services/data-service';
import { headerTemplate } from '../src/header';
import { listTamplate } from '../src/list';
import '../styles/style.css';

const data = getData();

render(headerTemplate(), listTamplate());

document
    .querySelector('.list-wrap__container')
    .addEventListener('scroll', event => usersListLoading(event));
const listContainer = document.querySelector('.list-wrap__content');

firstLoad();

function render(...components) {
    components.forEach(comp =>
        document.getElementById('app').insertAdjacentHTML('beforeend', comp)
    );
}

function usersListLoading(event) {
    const scrollPoss = event.target.scrollTop;

    const startToRender = Math.floor(scrollPoss / 30);

    listContainer.innerHTML = '';
    renderUserItem(data.slice(startToRender, startToRender + 20));
    listContainer.style.paddingTop = scrollPoss + 'px';
    listContainer.style.height = 300000 - scrollPoss + 'px';
}

function firstLoad() {
    renderUserItem(data.slice(0, 20));
}

function renderUserItem(list) {
    list.forEach(user => {
        const userItem = getUserItemTemplate(user);
        listContainer.insertAdjacentHTML('beforeend', userItem);
    });
}

function getUserItemTemplate({ index, name, fathername, surname }) {
    return `
        <div id=${index + 1} class="user-item">
            <span>${index + 1}</span>
            <div>${name}</div>
            <div>${fathername}</div>
            <div>${surname}</div>
        </div>
    `;
}
