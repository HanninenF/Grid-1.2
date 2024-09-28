const form = document.querySelector(".addDog-form");

const responseDiv = document.querySelector(".response");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const Dog = { name: "", age: null, race: "" };

    Dog.name = document.querySelector("#userName").value;

    console.log(`userName: ${Dog.name}`);

    let responseMessage = `<h2>Tack för ditt svar ${Dog.name}!
    </h2>`;

    responseDiv.innerHTML = responseMessage;
    form.reset();
  });
}
