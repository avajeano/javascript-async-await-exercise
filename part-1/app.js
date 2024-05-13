let favoriteNumber = 11;
let url = "http://numbersapi.com";

// 1. make a request to get a fact about favorite number
async function one() {
    let data = await $.getJSON(`${url}/${favoriteNumber}?json`);
    console.log(data);
}

// 2. make a request for mulitple numbers 
async function two() {
    let favoriteNumbers = [11, 21, 18]
    let data = await $.getJSON(`${url}/${favoriteNumbers}?json`);
    console.log(data);
}

// 3. get 4 facts on favorite number 
async function three() {
    let facts = await Promise.all(
        Array.from({length:4}, () => $.getJSON(`${url}/${favoriteNumber}?json`))
    );
    facts.forEach(data => {
        $('body').append(`<p>${data.text}</p>`);
    });
}
three()