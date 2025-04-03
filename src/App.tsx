import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
// import "survey-core/survey-core.min.css";
import "survey-core/defaultV2.min.css";
import "./index.css";
import { json } from "./json";
import { useEffect, useState } from "react";

const survey = new Model(json);
survey.questionsOnPageMode = "questionPerPage";
const totalPages = survey.pageCount;
console.log(`totalPages`, totalPages);

function SurveyComponent() {
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLastElement, setIsLastElement] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    survey.onCurrentPageChanged.add((_, options) => {
      setVisibleIndex(options.newCurrentPage.visibleIndex);
      setIsLastPage(survey.isLastPage ?? false);
      setIsLastElement(survey.isLastElement ?? false);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen max-w-md mx-auto">
      <div className="mb-4 w-full pt-5">
        <div className="text-sm text-gray-600 text-left pl-4">
          <p>visibleIndex: {visibleIndex}</p>
          <p>pageCount: {totalPages}</p>
          <p>isLastPage: {isLastPage.toString()}</p>
          <p>isLastElement: {isLastElement.toString()}</p>
        </div>
      </div>
      <Survey model={survey} />
    </div>
  );
}

export default SurveyComponent;
