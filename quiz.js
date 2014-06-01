(function(){
  var newscript = document.createElement('script');
     newscript.type = 'text/javascript';
     newscript.async = true;
     newscript.src = 'jquery.js';
  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript);
})();



(function(document) {
    var allQuestions = [
        {question: "Who is Prime Minister of the United Kingdom?", 
            choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"], 
            correctAnswer:0},
        {question: "Who invented internet?",
            choices:["Someone at CERN", "Al Gore", "Seagulls", "It invented itself"], 
            correctAnswer:0},
        {question: "Who invented internet?",
            choices:["Someone at CERN", "Al Gore", "Seagulls", "It invented itself"], 
            correctAnswer:0}];

    
    var current = 0,
        correctAns,
        next,
        score = 0;

  
    var Quiz = function(Questions) {
        if (Questions.length < 1) {
            return;
        }

        insertQuestionAndAnswer(Questions[0]);

    };

    //this holds the questions
    var createQuestion = function(question) {
        //Create question element
        var newQuestion = document.createElement("div");
        newQuestion.className = "inQuiz";
        newQuestion.id = "question";
        newQuestion.value = question;
        newQuestion.innerHTML = question;

        return newQuestion;
    };

    //this makes the radio button
    var createRadio = function(value) {
        var choice = document.createElement("input");
        choice.type = "radio";
        choice.name = "choice";
        choice.value = value;
        return choice;
    };

    //this makes the lable for each radio button
    var createRadioLabel = function(text) {
        var newLabel = document.createElement("Label");
        newLabel.setAttribute("for",text);
        newLabel.innerHTML = text;
        return newLabel;
    };

    //all of the choices will be in this div
    var createChoices = function(newChoices) {
        
        var i, choice, label, container, lineBreak;

        //this is the actual div
        var choices = document.createElement("div");
        choices.className = "inQuiz";
        choices.id = "choices";

        //this actually makes each choice's radio button & label
        for (i = 0; i < newChoices.length; i++) {
            //create each choice
            choice = createRadio(newChoices[i]);
            label = createRadioLabel(newChoices[i]);

            //Set checked radio button to be the first one by default.
            if (i === 0) {
                choice.checked = "checked";
            }

            //Wrap each choice in a div.
            container = document.createElement("div");
            container.className = "choice";
            container.appendChild(choice);
            container.appendChild(label);

            choices.appendChild(container);

            //If not the last choice, add a <br> to space out the choices.
            if (i !== newChoices.length - 1) {
                lineBreak = document.createElement("br");
                choices.appendChild(lineBreak);
            }
        }

        return choices;

    };

    /**
     * Create a question/answers and adds it all to DOM
     * @param {Object} questionObj
     */
    var insertQuestionAndAnswer = function(questionObj) {
        //Create question element
        var quest = createQuestion(questionObj.question);

        //Create the radio buttons
        var ans = createChoices(questionObj.choices);

        //Get DOM Elements
        var quizForm = document.getElementById("quiz");
        //var quizForm = $("#quiz");
        var next = document.getElementById("fixFloat");
        //var next = $("#fixFloat");

        //Set new correct answer.
        correctAns = questionObj.correctAnswer;

        //Add both to DOM model before the next button
        quizForm.insertBefore(quest, next);
        quizForm.insertBefore(ans, next);
        
        //$("quiz").insertBefore(q, next);
        //$("quiz").insertBefore(ans, next);
    };

    /**
     * Determines whether question was answered correctly
     * @param {Number} ans
     */
    var isCorrect = function(ans) {
        if (ans !== null) {
            if (ans === correctAns) {
                score++;
            }
        }
    };

    /**
     * Determines whether question was answered correctly
     * @param {string} name
     * @return {Number} i or null
     */
    var getRadioValue = function(name) {
        //Declares variables
        var i,
            ans = document.getElementsByName(name);

        //Looks for which radio value is checked.
        for(i = 0; i < ans.length; i++) {
            //If a radio button is checked, returns that index
            if (ans[i].checked) {
                return i;
            }
        }

        //Otherwise, returns null.
        return null;
    };

    /**
     * Removes old choices
     */
    var removeElement = function(idParent, idChild) {
        var child = document.getElementById(idChild),
            parent = document.getElementById(idParent);
        parent.removeChild(child);
    };

    /**
     * Removes question and answer from DOM
     */
    var removeQuestionAndAnswer = function() {
        removeElement("quiz", "question");
        removeElement("quiz", "choices");
    };

    /**
     * Display score
     */
    var displayScore = function() {
        //Create score element with same css as question
        var scoreText = createQuestion("Score: " + score + "/" + allQuestions.length);
        var endText = "This is a pretty good game"

        //Add score to DOM model
        var quizForm = document.getElementById("quiz");
        //var quizForm = $("#quiz");

        quizForm.appendChild(scoreText);
        quizForm.appendChild(endText);

    };

    /**
     * Changes screen to last screen.
     */
    var lastScreen = function lastScreen() {
        removeElement("quiz", "fixFloat");
        displayScore();
    };

    /**
     * Changes the question.
     */
    var changeQuestionAndAnswer = function() {
        //Declare variables.
        var newQuestion;

        //Get selected answer and compare to correct choice
        isCorrect(getRadioValue("choice"));

        //Removes the previous question and answers from the DOM
        //Increments current question
        current++;
        removeQuestionAndAnswer();

        //Checks to see if the previous question was the last question.
        if (current === allQuestions.length) {
            lastScreen();
            return;
        }

        //If more questions left, inserts next question/answer set
        newQuestion = allQuestions[current];
        insertQuestionAndAnswer(newQuestion);
    };

    //Starts the quiz, and registers an event handler for the next button.
    Quiz(allQuestions);

    //register event handler for next button
    next = document.getElementById("next");
    next.onclick = function() {changeQuestionAndAnswer();};

}(document));