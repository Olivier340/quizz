// tableau des bonnes réponses
const arrayResponses = ['d', 'b', 'a', 'c', 'b'];

// emojis recupérer sur https://emojipedia.org/
const emojis = ['✔️', '✨', '👀', '😭', '👎'];

//on récupère les sélecteurs necessaires au projet 
const form = document.querySelector('.form-quizz');
const titleResult = document.querySelector('.results h3');
const scoreResult = document.querySelector('.note');
const helpResult = document.querySelector('.help');
const blockQuestions = document.querySelector('.questions-container');
const questions = document.querySelectorAll('.question');

// initialisation du tableau des resultats 
let arrayResults = [];

// Initialisation du tableau des réponses de l'utilisateur
let arrayUserResponses = [];


form.addEventListener('submit', (event) => {
    event.preventDefault();

    //on parcours toutes les questions
    for (let index = 1; index <= questions.length; index++) {

        // on ajoute les valeurs repondues dans le tableau de réponses de l'utilisateur
        // on utilise les litteraux de gabarits (`input[name="q${index}"]:checked`)
        arrayUserResponses.push(document.querySelector(`input[name="q${index}"]:checked`).value);

    }
    checkResults(arrayUserResponses);
    // On remet le tableau de réponses de l'uitilisateur à 0
    arrayUserResponses = [];
});


function checkResults(arrayUserResponses) {
    for (let index = 0; index < questions.length; index++) {

        if (arrayResponses[index] === arrayUserResponses[index]) {
            //la réponse est bonne, on mets à jour le tableau de résultats
            arrayResults.push(true);

        } else {
            // la réponse est mauvaise ,  on mets à jour le tableau de résultats
            arrayResults.push(false);

        }
    }
    // on affiche les résultats et couleurs 
    displayResults(arrayResults);
    displayColors(arrayResults);

    // reinitialisation du tableau de résultats
    arrayResults = [];

}

function displayResults(arrayResults) {

    // on compte le nombre de mauvaises réponses
    const nbFalseResponses = arrayResults.filter(result => result == false).length;

    // affichage des résultats selon le nombre de faute
    switch (nbFalseResponses) {

        case 0:
            titleResult.innerText = `✔️ Bravo, c'est un sans faute ! ✔️`
            helpResult.innerText = ''
            scoreResult.innerText = '5/5'
            break;
        case 1:
            titleResult.innerText = `✨ Vous y êtes presque ! ✨`
            helpResult.innerText = 'Retentez une autre réponse dans la case rouge, puis re-validez !'
            scoreResult.innerText = '4/5'
            break;
        case 2:
            titleResult.innerText = `✨ Encore un effort ... 👀`
            helpResult.innerText = 'Retentez une autre réponse dans les deux cases rouges, puis re-validez !'
            scoreResult.innerText = '3/5'
            break;
        case 3:
            titleResult.innerText = `👀 Il reste quelques erreurs. 😭`
            helpResult.innerText = 'Retentez une autre réponse dans les trois cases rouges, puis re-validez !'
            scoreResult.innerText = '2/5'
            break;
        case 4:
            titleResult.innerText = `😭 Peux mieux faire ! 😭`
            helpResult.innerText = 'Retentez une autre réponse dans les quatres cases rouges, puis re-validez !'
            scoreResult.innerText = '1/5'
            break;
        case 5:
            titleResult.innerText = `👎 Peux mieux faire ! 👎`
            helpResult.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
            scoreResult.innerText = '0/5'
            break;

        default:
            'Oups, cas innatendu.';

    }
}

function displayColors(arrayResults) {

    // Parcours des résultats et affichage des couleurs avec les classes hit et defeat 
    // l'animation et les couleurs sont gérés dans le css
    for (let index = 0; index < arrayResults.length; index++) {

        if (arrayResults[index] == true) {
            //la réponse est bonne
            questions[index].classList.add('hit');
            questions[index].classList.remove('defeat');
        } else {
            // La réponse est fausse
            questions[index].classList.add('defeat');
            questions[index].classList.remove('hit');
        }

    }
}

// au click sur une question on remet la couleur à l'etat initial 
questions.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.remove('hit');
        item.classList.remove('defeat');
    })
})
