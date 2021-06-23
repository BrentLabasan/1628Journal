export function openDialog() {
    const wiredDialog = document.querySelector('wired-dialog');

    wiredDialog.setAttribute('open', '');
  }
  export function closeDialog() {
    document.querySelector('wired-dialog').removeAttribute('open');
  }
  