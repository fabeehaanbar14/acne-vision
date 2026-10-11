//COMP 3450: Authors: Magdala Nwuke, Fabeeha Anbar Ahmed, Oyinkansola Olarerin (Mabel)
const quizinfo = document.querySelector('.quiz-info');
const question1 = document.getElementById("question1");
const question2 = document.getElementById("question2");
const question3 = document.getElementById("question3");
const question4 = document.getElementById("question4");
const question5 = document.getElementById("question5");
const question6 = document.getElementById("question6");
const question7 = document.getElementById("question7");

const thankYou = document.querySelector('.thank-you');
const startbtn = document.getElementById('start-btn');
const submitBtn = document.getElementById('submit-btn');
const nextbtn1 = document.getElementById('next-btn1');
const nextbtn2 = document.getElementById('next-btn2');
const nextbtn3 = document.getElementById('next-btn3');
const nextbtn4 = document.getElementById('next-btn4');
const nextbtn5 = document.getElementById('next-btn5');
const nextbtn6 = document.getElementById('next-btn6');

// Corrected helper functions (single element)
function makeVisible(element) {
    if (element) {
        element.style.display = "flex";
    }
}

function makeInvisible(element) {
    if (element) {
        element.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Hide all question elements on load
    makeInvisible(question1);
    makeInvisible(question2);
    makeInvisible(question3);
    makeInvisible(question4);
    makeInvisible(question5);
    makeInvisible(question6);
    makeInvisible(question7);

    // Keep an ordered list of your questions
const questions = [question1, question2, question3, question4, question5, question6, question7];

function goToNextQuestion(currentQuestion) {
  const index = questions.indexOf(currentQuestion);
  if (index === -1) return;

  // If not last question → go to next
  if (index < questions.length - 1) {
    makeInvisible(currentQuestion);
    makeVisible(questions[index + 1]);
  } else {
    // Last question: just scroll to the submit button nicely
    submitBtn.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}


    nextbtn1.addEventListener('click', () => {
        makeInvisible(question1);
        makeVisible(question2);
        // Hide Aloe when moving to Question 2
    document.getElementById("aloe-q1").classList.remove("show");
    });

    nextbtn2.addEventListener('click', () => {
        makeInvisible(question2);
        makeVisible(question3);
    });


    nextbtn3.addEventListener('click', () => {
        makeInvisible(question3);
        makeVisible(question4);
    });

    nextbtn4.addEventListener('click', () => {
        makeInvisible(question4);
        makeVisible(question5);
    });

    nextbtn5.addEventListener('click', () => {
        makeInvisible(question5);
        makeVisible(question6);
    });

    nextbtn6.addEventListener('click', () => {
        makeInvisible(question6);
        makeVisible(question7);
    });

    startbtn.addEventListener('click', () => {
    makeVisible(question1);
    makeInvisible(quizinfo);
    // Show Dr Aloe AFTER start quiz
    const aloe = document.getElementById("aloe-q1");
    aloe.classList.add("show");

    // Auto-hide Aloe after 6 seconds
    setTimeout(() => {
        aloe.classList.remove("show");
    }, 6000);
    
});


  

  const firebaseConfig = {
    apiKey: "AIzaSyDOYdeSkSxmRkj_q1rSJrPHV40vVmQkiF4",
    authDomain: "acnevision-85adc.firebaseapp.com",
    projectId: "acnevision-85adc",
    storageBucket: "acnevision-85adc.firebasestorage.app",
    messagingSenderId: "790385055700",
    appId: "1:790385055700:web:2c47213a66d4e489df6841"
  };
  
  //firebase initialisation
   firebase.initializeApp(firebaseConfig);
   const auth= firebase.auth();
    const user=auth.currentUser;
    const db=firebase.firestore();

    const quiz= document.getElementById("quiz");
    const submitBtn= document.getElementById("submit-btn");

    // Track answers
let answerCounts = {
  hormonal: 0,
  cystic: 0,
  fungal: 0
};

document.querySelectorAll('.options-container').forEach(container => {

  // find which question this options-container belongs to
  const parentQuestion = container.closest('[id^="question"]');

  container.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', () => {

      //check if user selected anything previously
      const prev = container.querySelector('.selected');
      if (prev) {
        const oldType = prev.dataset.type;
        answerCounts[oldType]--;   // remove old answer
      }

      // update selection
      container.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');

      // add new answer
      const newType = option.dataset.type;
      answerCounts[newType]++;

      console.log("Updated counts:", answerCounts);

      // 👉 Automatically go to the next question
      goToNextQuestion(parentQuestion);
    });
  });

});

  
function getMostFrequentType(counts) {
  let maxType = null;
  let maxCount = -1;

  for (const [type, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxCount = count;
      maxType = type;
    }
  }

  return maxType;
    }
    
  
  function isTie(counts) {
  let max = Math.max(counts.hormonal, counts.fungal, counts.cystic);

  let numMax = Object.values(counts).filter(c => c === max).length;

  return numMax > 1;  
}
    

const mostFrequent = getMostFrequentType(answerCounts);
console.log("Most frequent acne type:", mostFrequent);



// Dr. Aloe popup function
function showAloePopup() {
  const popup = document.getElementById("aloe-popup");
  popup.classList.add("show");
}


// On submit, save to Firestore
submitBtn.addEventListener('click', async () => {
  const user = firebase.auth().currentUser;


  // If user is NOT logged in, show Dr. Aloe popup and STOP quiz submission.
if (!user) {
  showAloePopup();
  return;
}


  try {
    await firebase.firestore().collection('quizResults').doc(user.uid).set({
      results: answerCounts,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
      //alert("Results saved!");
    makeVisible(thankYou);
     makeInvisible(question7);

    var page;
    var maxtype = getMostFrequentType(answerCounts);
    if (isTie(answerCounts)) {
      page = "fungal.html";
    }
    else if (maxtype == "hormonal") {
      page = "hormonal.html";
    }
    else if (maxtype == "fungal") {
      page="fungal.html";
    }
    else {
      page= "cystic.html";
    }


    setTimeout(() => {
      window.location.href=page}, 3000);
     
}
  catch (err) {
    console.error(err);
  }
// Show Aloe when Question 1 loads
function showAloeQ1() {
  const aloe = document.getElementById("aloe-q1");
  const bubble = aloe.querySelector(".aloe-q1-bubble");

  aloe.classList.remove("hidden");

  // Hide the speech bubble after 5 seconds
  setTimeout(() => {
    bubble.style.display = "none";
  }, 5000);
}

// Call function when quiz starts (when Question 1 appears)
document.getElementById("start-btn").addEventListener("click", () => {
  setTimeout(showAloeQ1, 800); // small delay so Q1 loads first
});


  

});

});

