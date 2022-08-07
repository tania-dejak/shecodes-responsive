function buy() {
  let name = prompt("What is your name?");
  let email = prompt("What is your email address?");
  let emoji = prompt("What is your favorite emoji?");

  alert(
    "Thank you, " +
      name +
      "! We'll be in touch by email, meanwhile have lot of Yogurt! " +
      emoji
  );
}

let buyButton = document.querySelector(".buy-button");
buyButton.addEventListener("click", buy);
