import { useWizard } from "./WizardVM";
import styles from "./Wizard.module.scss";

function Wizard() {
  const {
    currentQuestion,
    currentQuestionIndex,
    answers,
    handleNext,
    handlePrev,
    handleAnswerChange,
    handleCompositeAnswerChange,
    handleMultipleSelectChange,
    progressPercentage,
  } = useWizard();

  const isAnswerValid = () => {
    if (currentQuestion.type === "composite") {
      const compositeAnswer = answers[currentQuestion.id] || {};
      return compositeAnswer.city && compositeAnswer.distance;
    }
    if (currentQuestion.type === "multipleSelect") {
      const arr = answers[currentQuestion.id] || [];
      return Array.isArray(arr) && arr.length > 0;
    }
    return !!answers[currentQuestion.id];
  };

  return (
    <div className={styles.wizardContainer}>
         <button> X </button>
      <progress value={progressPercentage()} max={100} className={styles["progress-bar"]} />
      <h2 className={styles.questionText}>{currentQuestion.text}</h2>

      {currentQuestion.type === "multipleChoice" && (
        <div className={styles.buttonGroup}>
          {currentQuestion.options?.map((option) => (
            <button key={option} onClick={() => handleAnswerChange(option)}>
              {option}
            </button>
          ))}
        </div>
      )}

      {currentQuestion.type === "dropdown" && (
        <select onChange={(e) => handleAnswerChange(e.target.value)} className={styles.dropdown}>
          <option value="">בחר</option>
          {currentQuestion.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {currentQuestion.type === "openText" && (
        <textarea
          value={answers[currentQuestion.id] || ""}
          onChange={(e) => handleAnswerChange(e.target.value)}
          placeholder="הקלד כאן..."
        />
      )}

      {currentQuestion.type === "composite" && (
        <div className={styles.compositeGroup}>
          <label>עיר:</label>
          <select
            onChange={(e) => handleCompositeAnswerChange("city", e.target.value)}
            value={(answers[currentQuestion.id]?.city) || ""}
          >
            <option value="">בחר עיר</option>
            {currentQuestion.compositeOptions?.cities?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <br />
          <label>מרחק:</label>
          <select
            onChange={(e) => handleCompositeAnswerChange("distance", e.target.value)}
            value={(answers[currentQuestion.id]?.distance) || ""}
          >
            <option value="">בחר מרחק</option>
            {currentQuestion.compositeOptions?.distances?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      {currentQuestion.type === "multipleSelect" && (
        <div className={styles.checkboxGroup}>
          {currentQuestion.options?.map((option) => {
            const selected: string[] = answers[currentQuestion.id] || [];
            return (
              <label key={option}>
                <input
                  type="checkbox"
                  value={option}
                  checked={selected.includes(option)}
                  onChange={() => handleMultipleSelectChange(option)}
                />
                {option}
              </label>
            );
          })}
        </div>
      )}

      <br />
      <button onClick={handlePrev} disabled={currentQuestionIndex === 0}>
        הקודם
      </button>
      <button onClick={handleNext} disabled={!isAnswerValid()}>
        הבא
      </button>
    </div>
  );
}

export default Wizard;
