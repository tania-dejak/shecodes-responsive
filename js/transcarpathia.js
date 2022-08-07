function contact() {
  let name = prompt("What is your name?");
  let email = prompt("What is your email address?");
  if (name.length > 0 && email.length > 0) {
    alert(
      "Thank you, " +
        name +
        "! We will contact you by email. Travel to Transcarpathia. ⛺"
    );
  } else {
    alert("Name or email is incorrect.");
  }
}

let contactButton = document.querySelector(".contact-button");
contactButton.addEventListener("click", contact);
