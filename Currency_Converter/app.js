const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies/";

const dropdowns = document.querySelectorAll(".dropdown select");
const but = document.querySelector("form .btn");
const fromcur = document.querySelector(".from select");
const tocur = document.querySelector(".to select");
const msg = document.querySelector("form .msg");

for (let select of dropdowns) {
    for (currcode in countryList) {
        let newoption = document.createElement("Option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if (select.name === "from" && currcode === "USD") {
            newoption.selected = "selected";
        }
        else if (select.name === "to" && currcode === "INR") {
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change", (evt) => {
        updateflag(evt.target)
    })
}

const updateflag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img")
    img.src = newsrc;
}

but.addEventListener("click", (event) => {
    event.preventDefault();
    updateexchange();
});

const updateexchange = async () => {
    let amount = document.querySelector(".amount input");
    let amval = amount.value;
    if (amval === "" || amval < 0) {
        amval = 1;
        amount.value = "1";
    }
    //console.log(fromcur.value.toLowerCase());
    const URL = `${BASE_URL}${fromcur.value.toLowerCase()}.json`
    let response = await fetch(URL);
    let data = await response.json();
    const y = fromcur.value.toLowerCase();
    const x = tocur.value.toLowerCase();
    let rate = data[y][x];
    let result = amval * rate;
    msg.innerText = `${amval} ${fromcur.value} = ${result} ${tocur.value}`;
}

window.addEventListener("load",()=>{
    updateexchange();
})