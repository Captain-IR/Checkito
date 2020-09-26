import { Dialog, Loading } from 'quasar'

export function showErrorMessage(error) {
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    Dialog.create({
      title: 'Error',
      message: error.response.data.errors[0].message
    })
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log('Error', error.message);
  }
  console.log(error.config);
  Loading.hide()
}