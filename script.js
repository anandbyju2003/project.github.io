const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
tryAgainBtn = document.querySelector(".content button"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span");

welcometab=document.getElementById("welcome");
startbutton=document.getElementById('welcome-button');
wrapper=document.getElementById('wrap')
endscreen=document.getElementById("endscreen")


let username,classid;
let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;

function loadParagraph() {
    const selection=document.getElementById("dropdown").value
    const ranIndex = Math.floor(Math.random() * eval(selection).length);
    typingText.innerHTML = "";
    eval(selection)[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping(event) {
    let wpm;
    let characters = typingText.querySelectorAll("span");
    let typedChar = event.data || inpField.value.charAt(charIndex); // Get the typed character

    if (event.inputType === 'deleteContentBackward') {
        event.preventDefault(); // Prevent backspace from deleting characters
    }
    if(charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if(typedChar == null) {
            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if(characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        wpm = Math.round((((charIndex - mistakes)  / 5) / (maxTime - timeLeft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmTag.innerText =wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        endscreen.style.display='flex';
        wrapper.style.display='none'
        wpm = Math.round((((charIndex - mistakes)  / 5) / (maxTime - timeLeft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        document.getElementById("uid").innerText=username
        document.getElementById("classid").innerText=classid
        document.getElementById("cpmid").innerText=charIndex-mistakes
        document.getElementById('missid').innerText=mistakes
        document.getElementById("wordsper").innerText=wpm
        document.getElementById("diff").innerText=document.getElementById('dropdown').value
        clearInterval(timer);
        inpField.value = "";
    }   
}

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round((((charIndex - mistakes)  / 5) / (maxTime - timeLeft)) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

document.getElementById("inputform").addEventListener("submit",(event)=>{
    username=document.getElementById('username').value;
    classid=document.getElementById('userclass').value;
    console.log(username,classid)
    event.preventDefault();
    welcometab.style.display='none';
    wrapper.style.display='block';
    loadParagraph();
    inpField.addEventListener("input", initTyping);
})


