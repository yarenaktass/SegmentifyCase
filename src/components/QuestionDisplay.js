export const QuestionDisplay = {
    show(question, answers, onAnswerSelect) {
      const titleEl = document.getElementById("questionTitle");
      const answersContainer = document.getElementById("answersContainer");
  
      if (titleEl) titleEl.textContent = question.title;
  
      if (answersContainer) {
        answersContainer.innerHTML = "";
        answersContainer.className = `answers-container ${
          question.type === "color" ? "color-options" : ""
        }`;
  
        question.answers.forEach((answer) => {
          const button = document.createElement("button");
          button.className = "answer-btn";
  
          if (question.type === "color") {
            button.setAttribute("data-color", answer.toLowerCase());
            button.setAttribute("title", answer);
          } else {
            button.textContent = answer;
          }
          
          button.addEventListener("click", () => onAnswerSelect(answer));
  
          if (answers[question.type] === answer) {
            button.classList.add("selected");
          }
          
          answersContainer.appendChild(button);
        });
      }
    },
  
    updateStepIndicator(currentStep, totalSteps) {
      const stepIndicator = document.getElementById("stepIndicator");
      if (!stepIndicator) return;
  
      stepIndicator.innerHTML = "";
      for (let i = 0; i < totalSteps; i++) {
        const dot = document.createElement("div");
        dot.className = `step-dot${i === currentStep ? " active" : ""}`;
        stepIndicator.appendChild(dot);
      }
    },
  
    updateNavigationButtons(currentStep, hasAnswer) {
      const backBtn = document.getElementById("backBtn");
      const nextBtn = document.getElementById("nextBtn");
  
      if (backBtn) backBtn.disabled = currentStep === 0;
      if (nextBtn) nextBtn.disabled = !hasAnswer;
    }
  };