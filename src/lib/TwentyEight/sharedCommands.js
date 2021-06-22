export function openDialog() {
    document.querySelector('wired-dialog').setAttribute('open', '');
  }
  export   function closeDialog() {
    document.querySelector('wired-dialog').removeAttribute('open');
  }
  