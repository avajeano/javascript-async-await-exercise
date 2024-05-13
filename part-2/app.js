url = "https://deckofcardsapi.com/api/deck/";

// 1. request a single card
async function one() {
    let data = await $.getJSON(`${url}/new/draw`);
    let {suit, value} = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
}

// 2. make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck
async function two() {
    let firstCard = await $.getJSON(`${url}/new/draw`);
    let deckId = firstCard.deck_id;
    let secondCard = await $.getJSON(`${url}/${deckId}/draw/`);
    [firstCard, secondCard].forEach(card => {
        let {suit, value} = card.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
    });
}

// 3. new deck on page load, display a new card until there are no more 
async function three() {
    let $btn = $('button');
    let $cardArea = $('#card-area');

    let deckData = await $.getJSON(`${url}/new/shuffle`);

    $btn.show().on('click', async function() {
        let cardData = await $.getJSON(`${url}/${deckData.deck_id}/draw`);
        let cardSource = cardData.cards[0].image;
        $cardArea.append($('<img>', {src: cardSource}));

        if (cardData.remaining === 0) {
            $btn.remove();
        }
    });
}
three()
