$(document).ready(resizePaddingDiv)
$(window).on('resize', resizePaddingDiv)

const menu = {
    coffee: {
        espresso: 3.00,
        doubleEspresso: 3.50,
        americano: 3.30,
        cappuccino: 3.80,
        latte: 4.00
    },
    tea: {
        breakfastTea: 3.00,
        herbalInfusion: 3.20,
        greenTea: 3.20,
        chaiTea: 3.50
    },
    coldDrink: {
        water: 1.50,
        icedTea: 3.50,
        icedCoffee: 4.00,
        coke: 2.50,
        fanta: 2.50,
        sprite: 2.50
    },
    snack: {
        sandwich: 6.00,
        pastry: 3.50,
        cookie: 2.50,
        cake: 4.50
    }
}

const order = {
    coffees: [],
    teas: [],
    coldDrinks: [],
    snacks: []
}

function resizePaddingDiv() {
    let footer = $('#footer')
    let paddingDiv = $('#paddingDiv')
    let outerHeight = footer.outerHeight(true)
    paddingDiv.outerHeight(outerHeight, true)
}

function updateCounter(type, increase) {
    let counter;
    switch (type) {
        case "coffee":
            counter = $('#coffeeCounter')
            break;
        
        case "tea":
            counter = $('#teaCounter')
            break;

        case "coldDrink":
            counter = $('#coldDrinkCounter')
            break;
    
        case "snack":
            counter = $('#snackCounter')
            break;

        default:
            break;
    }

    let counterValue = counter[0].textContent
    
    if (counterValue === "-") counterValue = 0
    else counterValue = Number(counterValue)
    
    if(increase) counterValue += 1
    else if(counterValue > 0) counterValue -= 1 // can't go lower than 0
    
    if (counterValue === 0) counter[0].textContent = '-' // display '-' instead of 0
    else counter[0].textContent = counterValue
    
}

function addItemsToCart() {

    let coffeeSelect = $('#coffeeSelect')[0]
    let coffeeCounter = $('#coffeeCounter')[0]
    let teaSelect = $('#teaSelect')[0]
    let teaCounter = $('#teaCounter')[0]
    let coldDrinkSelect = $('#coldDrinkSelect')[0]
    let coldDrinkCounter = $('#coldDrinkCounter')[0]
    let snackSelect = $('#snackSelect')[0]
    let snackCounter = $('#snackCounter')[0]

    if (coffeeSelect.value !== "-" && coffeeCounter.textContent !== "-") {
        order.coffees.push({
            product: coffeeSelect.selectedOptions[0].textContent,
            quantity: Number(coffeeCounter.textContent),
            total: menu["coffee"][coffeeSelect.value] * Number(coffeeCounter.textContent)
        })
    }

    if (teaSelect.value !== "-" && teaCounter.textContent !== "-") {
        order.teas.push({
            product: teaSelect.selectedOptions[0].textContent,
            quantity: Number(teaCounter.textContent),
            total: menu["tea"][teaSelect.value] * Number(teaCounter.textContent)
        })
    }

    if (coldDrinkSelect.value !== "-" && coldDrinkCounter.textContent !== "-") {
        order.coldDrinks.push({
            product: coldDrinkSelect.selectedOptions[0].textContent,
            quantity: Number(coldDrinkCounter.textContent),
            total: menu["coldDrink"][coldDrinkSelect.value] * Number(coldDrinkCounter.textContent)
        })
    }

    if (snackSelect.value !== "-" && snackCounter.textContent !== "-") {
        order.snacks.push({
            product: snackSelect.selectedOptions[0].textContent,
            quantity: Number(snackCounter.textContent),
            total: menu["snack"][snackSelect.value] * Number(snackCounter.textContent)
        })
    }

    coffeeCounter.textContent = "-"
    teaCounter.textContent = "-"
    coldDrinkCounter.textContent = "-"
    snackCounter.textContent = "-"

    coffeeSelect.value = "-"
    teaSelect.value = "-"
    coldDrinkSelect.value = "-"
    snackSelect.value = "-"

    fillCart()

}

function fillCart() {
    let total = 0
    let div = $('#cart')
    div[0].innerHTML = "<div class='mt-md-0 mt-5'>"

    for (const key in order) {
        order[key].forEach(item => {
            total += item.total
            div[0].innerHTML += `<div class="row mt-1">
                <div class="col-2">${item.quantity} x</div><div class="col-7">${item.product}</div><div class="col-3 text-right">€ ${item.total.toFixed(2)}</div>
            </div>`
        });
    }
    div[0].innerHTML += `<h4 class="mt-3 text-right">Total € ${total.toFixed(2)}</h4>`
}


function sendEmail() {
    const recipient = "coffeeshop@test.com"
    const firstName = $('#firstName')[0].value.trim()
    const lastName = $('#lastName')[0].value.trim()
    const phoneNumber = $('#phoneNumber')[0].value.trim()
    const location = $('#locationSelect')[0].selectedOptions[0].textContent.trim()

    const subject = `${location} Shop - New order from ${firstName} ${lastName} - ${phoneNumber}`

    let body = ''
    let total = 0
    for (const key in order) {
        order[key].forEach(item => {
            total += item.total
            body += `${item.quantity} x ${item.product} - € ${item.total.toFixed(2)}\n`
        });
    }
    body += `Total € ${total.toFixed(2)}`

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    clearForm()
}

function clearForm() {
    let coffeeSelect = $('#coffeeSelect')[0]
    let coffeeCounter = $('#coffeeCounter')[0]
    let teaSelect = $('#teaSelect')[0]
    let teaCounter = $('#teaCounter')[0]
    let coldDrinkSelect = $('#coldDrinkSelect')[0]
    let coldDrinkCounter = $('#coldDrinkCounter')[0]
    let snackSelect = $('#snackSelect')[0]
    let snackCounter = $('#snackCounter')[0]

    coffeeCounter.textContent = "-"
    teaCounter.textContent = "-"
    coldDrinkCounter.textContent = "-"
    snackCounter.textContent = "-"

    coffeeSelect.value = "-"
    teaSelect.value = "-"
    coldDrinkSelect.value = "-"
    snackSelect.value = "-"

    let div = $('#cart')
    div[0].innerHTML = ""

    order = {
        coffees: [],
        teas: [],
        coldDrinks: [],
        snacks: []
    }
}