let errLen = 1500
let winLen = 2000

let string = ''
// row index
let r = 0
// letter index
let l = 0
let over = false

function alertReal(text, type) {
    let alertPlaceholder = document.getElementById('alertPlaceholder')
    let wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-light" role="alert" type="' + type + '">' + text + '</div>'
    alertPlaceholder.append(wrapper)
    if(type == 'err') {
        setTimeout(function() {
            wrapper.parentNode.removeChild(wrapper)
        }, errLen)
        let row = document.getElementById(`r${r}`)
        row.setAttribute("error", "y")
        setTimeout(function() {
            row.setAttribute("error", "n")
        }, 500)
    }
    else if(type == 'win') {
        setTimeout(function() {
            wrapper.parentNode.removeChild(wrapper)
        }, winLen)
    }
}

const start = new Date('6/5/2022');
let dt = new Date();
let now = new Date(dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate());
const diff = Math.ceil(Math.abs(now - start) / (1000 * 60 * 60 * 24));
if(diff > 142) {
    // Žodžiukui galas! Ačiū, kad žaidėte!
    over = true
    document.removeEventListener('keyup', handleInput, true);
}
let word = common_words.split('\n')[diff]

let ltdict = {
    49: 'ą',
    50: 'č',
    51: 'ę',
    52: 'ė',
    53: 'į',
    54: 'š',
    55: 'ų',
    56: 'ū',
    187: 'ž'
}

function lettersInput(kc) {
    if (string.length < 5 && over == false) {
        string += String.fromCharCode(kc).toLowerCase()
        let letter = document.getElementById(`r${r}`).querySelector(`#l${l}`)
        letter.innerHTML = String.fromCharCode(kc)
        letter.setAttribute("state", "tbd")
        l++
    }
}
function ltLettersInput(kc) {
    if (string.length < 5 && over == false) {
        string += ltdict[kc]
        let letter = document.getElementById(`r${r}`).querySelector(`#l${l}`)
        letter.innerHTML = ltdict[kc]
        letter.setAttribute("state", "tbd")
        l++
    }
}
function backspaceInput() {
    if (over == false) {
        string = string.slice(0, -1)
        if (l > 0) {
            l--
        }
        let letter = document.getElementById(`r${r}`).querySelector(`#l${l}`)
        letter.innerHTML = ''
        letter.setAttribute("state", "empty")
    }
}
function enterInput() {
    if (over == false) {
        if (string.length != 5) {
            alertReal('Nepakankamai raidžių', 'err')
        }
        else if (!all_words.includes(string)) {
            alertReal('Netinkamas žodis', 'err')
        }
        else {
            // green
            let wordtemp = word
            for(let i = 0; i < 5; i++) {
                let letter = document.getElementById(`r${r}`).querySelector(`#l${i}`)
                if(string[i] == wordtemp[i]) {
                    letter.setAttribute('state', 'correct')
                    wordtemp = wordtemp.replace(string[i], '_')
                }
            }
            // yellow
            for(let i = 0; i < 5; i++) {
                let letter = document.getElementById(`r${r}`).querySelector(`#l${i}`)
                if(wordtemp.includes(string[i]) && letter.getAttribute('state') == 'tbd') {
                    letter.setAttribute('state', 'present')
                    wordtemp = wordtemp.replace(string[i], '_')
                }
            }
            // grey
            for(let i = 0; i < 5; i++) {
                let letter = document.getElementById(`r${r}`).querySelector(`#l${i}`)
                if(letter.getAttribute('state') == 'tbd') {
                    letter.setAttribute('state', 'absent')
                }
            }
            if(string == word) {
                switch(r) {
                    case 0:
                        alertReal('Genialu', 'win')
                        break;
                    case 1:
                        alertReal('Nuostabu', 'win')
                        break;
                    case 2:
                        alertReal('Įspudinga', 'win')
                        break;
                    case 3:
                        alertReal('Žavu', 'win')
                        break;
                    case 4:
                        alertReal('Puiku', 'win')
                        break;
                    case 5:
                        alertReal('Arti', 'win')
                        break;
                }
                over = true
                document.removeEventListener('keyup', handleInput, true);
            }
            else if(r == 5) {
                alertReal(word.toUpperCase(), 'lose')
                over = true
                document.removeEventListener('keyup', handleInput, true);
            }
            string = ''
            l = 0
            r++
        }
    }
}
function handleInput(event) {
    // letters
    if (64 < event.keyCode && event.keyCode < 91) {
        lettersInput(event.keyCode)
    }
    // lt letters
    if ((48 < event.keyCode && event.keyCode < 57) || (event.keyCode == 187)){
        ltLettersInput(event.keyCode)
    }
    // backspace
    else if (event.keyCode == 8) {
        backspaceInput()
    }
    // enter
    else if (event.keyCode == 13) {
        enterInput()
    }
}

document.addEventListener('keyup', handleInput, true);