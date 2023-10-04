import { API_URL } from "./const.js";
import { createElement, createSelectDate, handleImageFileSelection } from "./helper.js";
import { router } from "./index.js";
import { getUser, sendDataUser } from "./serviceAPI.js";

export const createEditProfile = async (login) => {
    const user = await getUser(login);

    const sectionEditProfile = createElement('section', {
        className: 'edit edit__profile',
    });

    const container = createElement('div', {
        className: 'container',
    });

    sectionEditProfile.append(container);

    const formProfile = createElement('form', {
        className: 'edit__form',
    });

    formProfile.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        if (data.day && data.month && data.year) {
            data.birthdate = `${data.month}/${data.day}/${data.year}`;
        }

        await sendDataUser(user.id, data);
        router.setRoute(`/user/${login}`);
    });

    const editAvatar = createElement('fieldset', {
        className: 'edit__avatar',
    });

    const editAvatarImage = createElement('img', {
        className: 'edit__avatar-image',
        src: `${API_URL}/${user.avatar}`,
        alt: `Аватар ${user.login}`,
    });

    const editAvatarLoad = createElement('div', {
        className: 'edit__avatar-load',
    });

    const editAvatarLabel = createElement('label', {
        className: 'edit__label-avatar',
        htmlFor: 'avatar-load',
        innerHTML: `
            <svg class="edit__icon-avatar" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.75 29.25H6.6875L24.1992 11.7384L18.2617 5.80086L0.75 23.3125V29.25ZM3.91667 24.6267L18.2617 10.2817L19.7183 11.7384L5.37333 26.0834H3.91667V24.6267ZM25.0858 1.20919C24.9394 1.06241 24.7654 0.94596 24.5738 0.866506C24.3823 0.787052 24.177 0.746155 23.9696 0.746155C23.7622 0.746155 23.5569 0.787052 23.3653 0.866506C23.1738 0.94596 22.9998 1.06241 22.8533 1.20919L19.9558 4.10669L25.8933 10.0442L28.7908 7.14669C28.9376 7.00021 29.0541 6.82622 29.1335 6.63468C29.213 6.44314 29.2539 6.23781 29.2539 6.03044C29.2539 5.82307 29.213 5.61774 29.1335 5.4262C29.0541 5.23466 28.9376 5.06067 28.7908 4.91419L25.0858 1.20919Z" fill="white"/>
            </svg>
            Обновить фотографию
        `,
    });

    const editAvatarInput = createElement('input', {
        className: 'edit__input-file edit__input-file_avatar',
        type: 'file',
        id: 'avatar-load',
        accept: 'image/jpeg, image/png',
    });

    const editHiddenInput = createElement('input', {
        type: 'hidden',
        name: 'avatar'
    });
    
    handleImageFileSelection(editAvatarInput, editAvatarImage, editHiddenInput);

    const btnDeleteAvatar = createElement('button', {
        className: 'edit__avatar-delete',
        type: 'button',
        innerHTML: `
            <svg class="edit__icon-avatar" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.48842 29.6389C9.48842 31.35 10.9027 32.75 12.6313 32.75H25.2027C26.9313 32.75 28.3456 31.35 28.3456 29.6389V10.9722H9.48842V29.6389ZM12.6313 14.0833H25.2027V29.6389H12.6313V14.0833ZM24.417 6.30556L22.8456 4.75H14.9884L13.417 6.30556H7.91699V9.41667H29.917V6.30556H24.417Z" fill="white"/>
            </svg>                                    
            Удалить
        `,
    });

    btnDeleteAvatar.addEventListener('click', () => {
        editAvatarInput.value = '';
        editAvatarImage.src = `img/avatar.png`;
    });

    editAvatarLoad.append(editAvatarLabel, editAvatarInput, editHiddenInput, btnDeleteAvatar);

    editAvatar.append(editAvatarImage, editAvatarLoad);

    const editName = createElement('fieldset', {
        className: 'edit__name',
    });

    const editNameLabel = createElement('label', {
        className: 'edit__label',
        innerHTML: '<span class="edit__label-text">Имя</span>',
    });

    const editNameInput = createElement('input', {
        className: 'edit__input',
        name: 'name',
        type: 'text',
        value: user.name || '',
    });

    editNameLabel.append(editNameInput);

    const editSurnameLabel = createElement('label', {
        className: 'edit__label',
        innerHTML: '<span class="edit__label-text">Фамилия</span>',
    });

    const editSurnameInput = createElement('input', {
        className: 'edit__input',
        name: 'surname',
        type: 'text',
        value: user.surname || '',
    });

    editSurnameLabel.append(editSurnameInput);

    editName.append(editNameLabel, editSurnameLabel);

    const editBirthday = createElement('fieldset', {
        className: 'edit__birthdate',
    });

    const editBirthdayLabel = createElement('legend', {
        className: 'edit__label edit__label-text',
        textContent: 'Дата рождения:',
    });

    const editBirthdayWrapper = createElement('div', {
        className: 'edit__birthdate-wrapper',
    });

    editBirthday.append(editBirthdayLabel, editBirthdayWrapper);

    const editBirthdayLabelDay = createElement('label', {
        className: 'edit__label edit__label_select',
    });

    const editBirthdaySelectDay = createElement('select', {
        className: 'edit__select',
        name: 'day',
    });

    editBirthdayLabelDay.append(editBirthdaySelectDay);

    const editBirthdayLabelMonth = createElement('label', {
        className: 'edit__label edit__label_select',
    });

    const editBirthdaySelectMonth = createElement('select', {
        className: 'edit__select',
        name: 'month',
    });

    editBirthdayLabelMonth.append(editBirthdaySelectMonth);

    const editBirthdayLabelYear = createElement('label', {
        className: 'edit__label edit__label_select',
    });

    const editBirthdaySelectYear = createElement('select', {
        className: 'edit__select',
        name: 'year',
    });
    
    editBirthdayLabelYear.append(editBirthdaySelectYear);

    createSelectDate(
        editBirthdaySelectDay,
        editBirthdaySelectMonth,
        editBirthdaySelectYear,
        user.birthdate,
        );

    editBirthdayWrapper.append(
        editBirthdayLabelDay,
        editBirthdayLabelMonth,
        editBirthdayLabelYear,
        );

    const editDescription = createElement('fieldset', {
        className: 'edit__description',
    });

    const editDescriptionLabel = createElement('label', {
        className: 'edit__label-text',
        textContent: 'Вступительный текст',
        htmlFor: 'description',
    });

    const editDescriptionTextarea = createElement('textarea', {
        className: 'edit__description-input',
        name: 'description',
        id: 'description',
        value: user.description ?? '',
    });

    editDescription.append(editDescriptionLabel, editDescriptionTextarea);

    const editSubmitBtn = createElement('button', {
        className: 'edit__submit-btn btn',
        textContent: 'Сохранить изменения',
        type: 'submit',
    });

    formProfile.append(editAvatar, editName, editBirthday, editDescription, editSubmitBtn);

    container.append(formProfile);

    return {sectionEditProfile, formProfile};

};