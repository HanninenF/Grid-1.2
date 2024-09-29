// Funktion för att generera en slumpmässig hex-färg
function generateRandomColor() {
  const letters = "0123456789ABCDEF"; // Hex-tecken för färger
  let color = "#"; // Hex-färger börjar alltid med #
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]; // Slumpmässigt väljer en siffra/bokstav från letters och lägger till den i color-strängen
  }
  return color; // Returnerar den genererade färgen, t.ex. "#3A5F2E"
}

/*  Vad gör denna funktion? Den skapar en slumpmässig hex-färg som används för att tilldela en bakgrundsfärg till varje hund (Dog)-objekt. */

function displayAllDogs() {
  // Tömmer responseDiv innan vi lägger till ny information
  responseDiv.innerHTML = "";

  // Loopar igenom alla hundar i dogs-arrayen
  dogs.forEach((dog, index) => {
    // Skapa ett unikt klassnamn för varje hund
    const dogClassName = `dogDetails${index}`;

    // Skapa HTML-innehållet för den aktuella hunden
    let dogInfoHTML = `<div class="${dogClassName}">`;
    Object.entries(dog).forEach(
      ([key, value]) => (dogInfoHTML += `<p>${key}: ${value}</p>`)
    );
    dogInfoHTML += `</div>`;

    // Lägg till den nya hundens information i responseDiv
    responseDiv.innerHTML += dogInfoHTML;
  });
}

const dogs = []; // Skapar en tom array för att lagra alla hundobjekt

// Hämtar HTML-elementen från sidan
const form = document.querySelector(".addDog-form"); // Hämtar formuläret med klassen .addDog-form
const responseDiv = document.querySelector(".response"); // Hämtar div där hundens information kommer att visas
const slider = form.querySelector("#slider"); // Hämtar slidern för att välja styrkan på hunden
const output = form.querySelector("#sliderValue"); // Hämtar elementet som visar värdet på slidern i realtid

// Skapa ett style-element för att hålla de dynamiska stilarna för hundarna
const styleSheet = document.createElement("style");
document.head.appendChild(styleSheet); // Lägg till style-elementet i dokumentets <head> så att CSS-regler kan läggas till dynamiskt

/*  form: Hämtar det HTML-formulär som har klassen .addDog-form.
responseDiv: Hämtar det HTML-element som har klassen .response (där svaret, dvs. information om den nya hunden, kommer att visas).
slider och output: Hämtar slidern (ett input-element som låter användaren justera hundens styrka) och ett element för att visa värdet på slidern i realtid.
styleSheet: Skapar ett nytt <style>-element för att hålla dynamiska CSS-regler (som bakgrundsfärg för varje ny hund). */

// Kontrollera att formuläret existerar
if (form) {
  // Lyssnar på när användaren flyttar slidern och uppdaterar det visade värdet
  slider.addEventListener("input", function () {
    output.textContent = slider.value; // Visar sliderns värde i elementet output i realtid
  });

  let gridRowStart = 1;
  let gridRowEnd = 2;
  let gridColumnStart = 1;
  let gridColumnEnd = 5;

  // Lyssnar på när formuläret skickas in
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Förhindrar att sidan laddas om när formuläret skickas in

    // Skapar ett nytt hundobjekt (Dog) från inmatningsfälten
    const Dog = {
      name: addDogKey("#userName") || "unknown name", // Hämtar hundens namn från formulärfältet eller använder standardvärde
      age: parseInt(addDogKey("#userAge")) || 0, // Hämtar hundens ålder och omvandlar den till ett heltal, eller använder standardvärde
      race: addDogKey("#userRace") || "unknown race", // Hämtar hundens ras eller använder standardvärde
      strength: slider.value, // Hämtar värdet från slidern som representerar hundens styrka
    };

    /*  Dog: Ett objekt som representerar den nya hunden med egenskaperna namn, ålder, ras och styrka. Värdena hämtas från respektive inmatningsfält i formuläret. Om något av fälten är tomt används standardvärden som "unknown name". */

    dogs.push(Dog); // Lägger till det nya hundobjektet i arrayen dogs

    const dogIndex = dogs.length - 1; // Hämta indexet för den senaste hunden (dvs. den hund som precis lades till)
    const newClassName = `dogDetails${dogIndex}`; // Skapar ett unikt klassnamn för varje hund baserat på index

    // Visa alla hundar
    displayAllDogs(); // Anropa funktionen för att visa all hundinformation

    /* dogs.push(Dog): Lägger till det nya hundobjektet i arrayen dogs.
    dogIndex: Beräknar indexet för den senaste hunden i arrayen.
    newClassName: Skapar ett unikt klassnamn för varje hund som t.ex. "dogDetails0", "dogDetails1", etc. */

    // Skapa en ny CSS-regel för att ge den nya hunden en slumpmässig bakgrundsfärg
    const newColor = generateRandomColor();
    const newFontColor = generateRandomColor(); // Genererar en slumpmässig färg

    // Skapar en CSS-regel för den nya hunden med färg och stil

    /* newColor: Genererar en slumpmässig färg genom att anropa funktionen generateRandomColor().
    styleSheet.innerHTML: Lägger till en ny CSS-regel i det dynamiska styleSheet-elementet. Varje hund får sin egen unika färg och stil. */

    // Logga varje hunds egenskaper i konsolen för debugging
    Object.entries(Dog).forEach(([key, value]) => {
      console.log(`${key}: ${value}`); // Loggar varje nyckel och värde (t.ex. "name: Fido") i webbläsarkonsolen
    });

    /*   responseDiv.innerHTML: Lägger till den nya hundens HTML-innehåll i responseDiv.
    console.log: Skriver ut varje egenskap för den nya hunden i webbläsarkonsolen. */

    // Återställ formuläret så att användaren kan mata in en ny hund
    form.reset(); // Återställer alla fält i formuläret till sina ursprungliga värden
    slider.value = 0; // Sätter slidern tillbaka till 0
    output.textContent = 0; // Visar värdet 0 som standard i output-elementet
    gridRowStart++;
    gridRowEnd++;

    /* 
    form.reset(): Återställer alla fält i formuläret till sina standardvärden.
    slider.value = 0 och output.textContent = 0: Återställer slidern och dess visade värde till 0. */
  });
}

/* Sammanfattning:
Din kod tar emot formulärinmatningar för en hund, skapar ett nytt hundobjekt, genererar en slumpmässig färg för att visa hunden på ett snyggt sätt i ett HTML-element, och sedan återställer formuläret för nästa inmatning. Slutligen loggas hundens detaljer till konsolen. */

/* Förklaring av huvuddelarna i koden:
generateRandomColor-funktionen: Skapar en slumpmässig hex-färg som används för att dynamiskt tilldela en bakgrundsfärg till varje ny hund som läggs till.

HTML-elementhämtning:

Hämtar viktiga element från HTML som formuläret (form), där användaren matar in hundens namn, ålder, ras och styrka.
responseDiv används för att visa resultatet (hundens detaljer) efter att formuläret skickats in.
slider är ett input-element där användaren kan justera hundens styrka, och output visar värdet på slidern i realtid.
Dynamiska stilar (CSS): Koden skapar ett dynamiskt <style>-element för att lägga till unika stilar för varje hund, såsom slumpmässig bakgrundsfärg och stil.

Formulärinmatning och hundobjekt:

Koden väntar på att användaren ska skicka in formuläret. När det sker, hämtas inmatningsvärdena från formulärfälten och sparas i ett hundobjekt (Dog).
Detta hundobjekt innehåller egenskaperna: namn, ålder, ras och styrka.
HTML för hunden:

När en ny hund läggs till, skapas dynamiskt en HTML-struktur som visar hundens information i en <div> med en unik klass.
HTML-koden som skapas läggs till responseDiv och visas på sidan.
Återställning:

När formuläret har skickats in och hundens detaljer visas, återställs formuläret så att användaren kan mata in en ny hund. Slidern återställs till sitt ursprungsvärde (0), och output-elementet uppdateras till att visa detta värde.
Nu kan du dynamiskt lägga till nya hundar, varje hund får en unik bakgrundsfärg, och formuläret återställs för varje ny inmatning. */
