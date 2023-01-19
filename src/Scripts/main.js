function fixList(wordsList) {
    // Removes '~' and '\n' from list
    let text = wordsList.split('');

    for(let character = 0; character < text.length; character ++) {
        if(text[character - 1] == "\n" || text[character + 1] == " ") {
            let characterPortion = character;
            while(text[characterPortion] == ' ') {
                characterPortion += 1
            }

            for(characterRange = character; characterRange < characterPortion; characterRange += 1) {
                text[characterRange] = '~';
            }
        }
    }

    let character = 0;
    while(character < text.length) {
        if(text[character] == "~" || text[character] == "\n") {
            text.splice(character, 1);
            character = 0;
        }

        else {character += 1;}
    }

    return text;
}

function randomizeWordOrder(wordList) {
    var shuffleCount = 0;
    function shuffle(wordList) {
        var shuffled = [];
        var rand;
        while (wordList.length !== 0) {
            rand = Math.floor(Math.random() * wordList.length)
            shuffled.push(wordList.splice(rand, 1)[0]);
        }
        return shuffled;
    }
    
    for(let runs = 0; runs <= 5; runs ++) {
        wordList = shuffle(wordList);
    }

    return wordList;
}


String.prototype.replaceAt = function (index, char) {
    let a = this.split("");
    a[index] = char;
    return a.join("");
}

function getWords(numberOfWords) {
    var xhr = new XMLHttpRequest();
    var url = `https://random-word-api.herokuapp.com/word?number=${numberOfWords}`;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

let wordsText = document.getElementById("typing-text");

let wordsList = getWords(20)
let wordsString = wordsList.replaceAll('","', ' ');
wordsString = wordsString.replaceAll('["', '');
wordsString = wordsString.replaceAll('"]', '');

wordsText.innerHTML = wordsString;
console.log(wordsText.innerHTML);

let wordCountText = document.getElementById("word-count");
let text = fixList(wordsText.innerHTML);
let textLog = 0;
let wordCount = 0;

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {return;}
    if(event.key != text[textLog]) {return;}

    console.log("Letter Pressed");
    const lastArrow = wordsText.innerHTML.lastIndexOf(">");
    const index = wordsText.innerHTML.indexOf(event.key, lastArrow);

    newWords = wordsText.innerHTML.replaceAt(index, `<span style="color: #a4ffbb;">${event.key}</span>`);
    wordsText.innerHTML = newWords;
    textLog += 1;

    if(event.key != " ") {return;}
    wordCount += 1;
    wordCountText.innerHTML = wordCount;
});
