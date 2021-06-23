export function openDialog() {
    const wiredDialog = document.querySelector('wired-dialog');

    wiredDialog.setAttribute('open', '');
    // wiredDialog.innerHTML = `
    //   <div id="wiredCardInnerContainer">
    //     <h1>wow</h1>
    //     <button onclick="archiveAndCreateNewTwen()">archiveAndCreateNewTwen</button>
    //   </div>

    // `;
  }
  export   function closeDialog() {
    document.querySelector('wired-dialog').removeAttribute('open');
  }
  