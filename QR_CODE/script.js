function generateQRCode() {
    let qrDiv = document.getElementById("qrcode");
    qrDiv.innerHTML = ""; // Clear previous QR code

    let text = document.getElementById("text").value;
    if (!text) {
      alert("Please enter a valid URL or text!");
      return;
    }

    new QRCode(qrDiv, {
      text: text,
      width: 200,
      height: 200,
    });
  }