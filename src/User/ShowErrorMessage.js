
const ShowErrorMessage = (message) => {
  global.VueApp && global.VueApp.$dialogs && global.VueApp.$dialogs.alert(message, {title: 'Ошибка'});
};

export default ShowErrorMessage;
