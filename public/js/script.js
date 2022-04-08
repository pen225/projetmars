const userImage = document.querySelector('.userImage');
const logOut = document.querySelector('.btn-logout');

userImage.addEventListener('mouseover', () =>{
    logOut.style.visibility ="visible";
})

userImage.addEventListener('mouseout', () =>{
    logOut.style.visibility ="hidden";
})

logOut.addEventListener('mouseover', () =>{
    logOut.style.visibility ="visible";
})
logOut.addEventListener('mouseout', () =>{
    logOut.style.visibility ="hidden";
})


// -------------------- API

const url = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium';
const form = document.getElementById('quizForm')
const container = document.querySelector('.containQuiz');
const quizForm = document.querySelector('.quizForm');
const quest = document.querySelector('.quest');
const allOption = document.querySelector('.allOption');
const buttons = document.querySelector('.buttons');
const scoreEl = document.querySelector('.menuScore .scoreNum');
const repEl = document.querySelector('.menuScore .reponseNum');
console.log('scoreEl', scoreEl);

// window.addEventListener('DOMContentLoaded', quizApp);


let question, reponse;
let options = [];
let score = 0;
let repQuetions = 0;




const  fetchQuiz = async () =>{
     menuScore();
     fetch(url)
    .then(response => response.json())
    .then(data =>{
        let dataResults = data.results
        question = dataResults[0].question;
        reponse = dataResults[0].correct_answer;
        option = [];
        // dataResults[0].incorrect_answers.map(option => option.push(option))
        let incorrect_answers = dataResults[0].incorrect_answers
        console.log(dataResults);
        console.log('incorrect_answers', incorrect_answers);
        for (let index = 0; index < incorrect_answers.length; index++) {
            const element = incorrect_answers[index];
            console.log(element);
            // option = option.push(element)
            option.push(element)
        }
        option.push(reponse)
        console.log('option avant random', option);
        let optionRandom = option.sort(function() {
            return .3 - Math.random();
          });
        console.log(optionRandom, reponse);

        generateTemplate(question, optionRandom);
    })


    .catch((err) => console.log(err))
}

window.addEventListener('DOMContentLoaded', fetchQuiz);


const generateTemplate = (question, optionRandom) =>{
    quest.innerHTML = question;
    allOption.innerHTML = '';
    option.map( (opt, index) =>{
        const item = document.createElement('div');
        item.classList.add('option');
        item.innerHTML = `
        <input type="radio" id="option${index+1}" value="${opt}" name="quiz">
        <label for="option${index+1}">${opt}</label>
        `
        allOption.appendChild(item);
    })
}
const checkQuiz = (selected) =>{
    score++;
    if (selected === reponse) {
        repQuetions++;
    }
    menuScore();
    form.quiz.forEach(element => {
        if (element.value === reponse) {
            element.parentElement.classList.add('correctRep');
        }
    });
}

const menuScore = () =>{
    scoreEl.innerHTML= score;
    repEl.innerHTML= repQuetions;
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    if (e.target.quiz.value) {
        checkQuiz(e.target.quiz.value);
        e.target.querySelector('button').style.display = 'none';
        generateButton();
    }else{
        return
    }
})


// fonction generer les bouton next et fin
const generateButton = () =>{

    const buttonFin = document.createElement('button');
    buttonFin.setAttribute('type', 'button');
    buttonFin.innerText= 'Fin'
    buttonFin.classList.add('btn');
    buttonFin.classList.add('finish-btn');
    buttons.appendChild(buttonFin);
    console.log('Bonjour penuel essoh');

    const suivant = document.createElement('button');
    suivant.setAttribute('type', 'button');
    suivant.innerText= 'Suivant'
    suivant.classList.add('btn');
    suivant.classList.add('next-btn');
    buttons.appendChild(suivant);

    buttonFin.addEventListener('click', finishQuiz)
    suivant.addEventListener('click', nextQuiz)
}

const nextQuiz = () =>{
    const suivant = document.querySelector('.next-btn');
    const buttonFin = document.querySelector('.finish-btn');

    buttons.removeChild(suivant);
    buttons.removeChild(buttonFin);


    buttons.querySelector('.button').style.display = 'block';
    fetchQuiz();
}

const finishQuiz = () =>{
    console.log('Fin du quiz');
    const suivant = document.querySelector('.next-btn');
    const buttonFin = document.querySelector('.finish-btn');

    buttons.removeChild(suivant);
    buttons.removeChild(buttonFin);
    buttons.querySelector('.button').style.display = 'block';
    const affichResultat = document.createElement('div');
    affichResultat.classList.add('afficheResult');
    affichResultat.innerHTML=` 
    <h1>Resultat</>
    <div class ="resultatFinal">${repQuetions}/${score}</div>
    <button class ="btn btn-success w-100">Encore !</button>
    `
    container.appendChild(affichResultat);
    affichResultat.querySelector('button').addEventListener('click', () =>{
        container.removeChild(affichResultat);
        jouerEncore();
    });

    function jouerEncore (){
        score = 0;
        repQuetions = 0;
        fetchQuiz();
    }
}

