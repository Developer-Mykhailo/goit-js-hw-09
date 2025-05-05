import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formData = {
  email: '',
  message: '',
};

const KEY_LS = 'feedback-form-state';

const formElem = document.querySelector('.feedback-form');

formElem.addEventListener('input', onFormEvent);
formElem.addEventListener('submit', onFormSubmit);

function onFormEvent(event) {
  const emailValue = event.currentTarget.elements.email.value.trim();
  const messageValue = event.currentTarget.elements.message.value.trim();

  formData.email = emailValue;
  formData.message = messageValue;

  localStorage.setItem(KEY_LS, JSON.stringify(formData));
}

const saveData = JSON.parse(localStorage.getItem(KEY_LS));

if (saveData) {
  formElem.elements.email.value = saveData.email || '';
  formElem.elements.message.value = saveData.message || '';

  formData.email = saveData.email || '';
  formData.message = saveData.message || '';
}

function onFormSubmit(event) {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    iziToast.warning({
      message: 'Fill please all fields',
      position: 'center',
    });
    return;
  }
  console.log(formData);
  iziToast.success({
    timeout: 1000,
    message: 'Successfully inserted data!',
    position: 'center',
  });
  localStorage.removeItem(KEY_LS);
  formData.email = '';
  formData.message = '';
  formElem.reset();
}
