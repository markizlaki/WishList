import { createElement } from "./helper.js";

const nav = document.querySelector(".nav");

// const burger = createBurgerMenu(nav);

export const renderNavigation = () => {
    nav.textContent = '';
    
    // <button class="nav__btn btn">Зарегистрироваться</button>
    // <button class="nav__btn btn">Войти</button>

    const buttonSignUp = createElement("button", {
        className: "nav__btn btn",
        textContent: "Зарегистрироваться"
    })

    buttonSignUp.addEventListener("click", () => {

    })

    const buttonLogin = createElement("button", {
        className: "nav__btn btn",
        textContent: "Войти"
    });

    buttonLogin.addEventListener("click", () => {
        
    })
    nav.append(buttonSignUp, buttonLogin);
}