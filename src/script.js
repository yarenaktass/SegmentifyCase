import { fetchData } from "./services/api.js";
import { filterProducts } from "./components/ProductFilter.js";
import { QuestionDisplay } from "./components/QuestionDisplay.js";
import { ProductDisplay } from "./components/ProductDisplay.js";

const ProductFinder = () => {
  let currentStep = 0;
  let answers = {};
  let questions = [];
  let products = [];
  let selectedCategory = "";
  let productSwiper = null;

  const getCurrentQuestion = () => {
    const categoryQuestions =
      questions.find((q) => q.name === selectedCategory) || questions[0];
    return categoryQuestions?.steps[currentStep];
  };

  const getCurrentCategory = () => {
    return questions.find((q) => q.name === selectedCategory) || questions[0];
  };

  const selectAnswer = (answer) => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return;

    const answerType = currentQuestion.subtype || currentQuestion.type;
    answers[answerType] = answer;

    if (answerType === "category") {
      selectedCategory = answer;
    }

    document.querySelectorAll(".answer-btn").forEach((btn) => {
      btn.classList.remove("selected");
    });

    if (currentQuestion.type === "color") {
      const selectedButton = Array.from(
        document.querySelectorAll(".answer-btn")
      ).find((btn) => btn.getAttribute("data-color") === answer.toLowerCase());
      if (selectedButton) {
        selectedButton.classList.add("selected");
      }
    } else {
      const selectedButton = Array.from(
        document.querySelectorAll(".answer-btn")
      ).find((btn) => btn.textContent === answer);
      if (selectedButton) {
        selectedButton.classList.add("selected");
      }
    }

    const nextBtn = document.getElementById("nextBtn");
    if (nextBtn) nextBtn.disabled = false;
  };

  const showQuestion = () => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return;

    QuestionDisplay.show(currentQuestion, answers, selectAnswer);
    QuestionDisplay.updateStepIndicator(
      currentStep,
      getCurrentCategory()?.steps.length || 0
    );
    QuestionDisplay.updateNavigationButtons(
      currentStep,
      answers[currentQuestion.type]
    );
  };

  const nextStep = () => {
    const currentCategory = getCurrentCategory();
    if (!currentCategory?.steps) return;

    if (currentStep < currentCategory.steps.length - 1) {
      currentStep++;
      showQuestion();
    } else {
      const filteredProducts = filterProducts(products, {
        selectedCategory,
        ...answers,
      });
      productSwiper = ProductDisplay.show(filteredProducts);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      currentStep--;
      showQuestion();
    }
  };

  const setupEventListeners = () => {
    const nextBtn = document.getElementById("nextBtn");
    const backBtn = document.getElementById("backBtn");

    if (nextBtn) nextBtn.addEventListener("click", nextStep);
    if (backBtn) backBtn.addEventListener("click", previousStep);
  };

  const init = async () => {
    try {
      const data = await fetchData();
      questions = data.questions;
      products = data.products;

      setupEventListeners();
      showQuestion();
    } catch (error) {
      console.error("Error initializing ProductFinder:", error);
    }
  };

  init();
};
ProductFinder();
