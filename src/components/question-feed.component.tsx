import React, { useContext, useState } from "react";
import styled from "styled-components";

import Question from "./question.component";
import { QuestionsContext } from "../services/questions/questions.provider";
import { IQuestion } from "../services/questions/questions.types";
import { sortByCreatedAt, sortByUpVotes } from "../services/utilities";
import Button from "./ui/button.component";
import { AclActions } from "../services/auth/auth.acl";
import Can from "../hoc/can.component";
import { MDHeader } from "./ui/header.component";

interface QuestionFeedProps {
  roomId: string;
}

type FilterTypes = "answered" | "unanswered" | "approved" | "unapproved";

type Filter = {
  [key in FilterTypes]: (question: IQuestion) => boolean;
};

type AppliedFilters = {
  [key in FilterTypes]?: boolean;
};

type FiltersAcl = {
  [key in FilterTypes]?: AclActions;
};

const QUESTION_FILTERS: Filter = {
  answered: (question: IQuestion) => !!question.answered,
  unanswered: (question: IQuestion) => !question.answered,
  approved: (question: IQuestion) => !!question.approved,
  unapproved: (question: IQuestion) => !question.approved,
};

const filters: FilterTypes[] = [
  "answered",
  "unanswered",
  "approved",
  "unapproved",
];

const filtersAcl: FiltersAcl = {
  approved: AclActions.APPROVE_QUESTION,
  unapproved: AclActions.APPROVE_QUESTION,
};

const QuestionFeedControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 15px;

  @media (min-width: 1020px) {
    flex-direction: row;
  }
`;

const SpacedQuestion = styled(Question)`
  margin-bottom: 1rem;
`;

const EmptyFeed = styled.p`
  text-align: center;
  margin-top: 4rem;
`;

const QuestionFeed: React.FC<QuestionFeedProps> = ({ roomId }) => {
  const { questions } = useContext(QuestionsContext);
  const [orderBy, setOrderBy] = useState<"createdAt" | "upVotes">("upVotes");
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({
    approved: true,
    // unanswered: true,
  });
  const toggleFilter = (filter: FilterTypes) => {
    // Disabling
    if (appliedFilters[filter]) {
      return setAppliedFilters((lastAppliedFilters) => {
        const newAppliedFilters = { ...lastAppliedFilters };
        delete newAppliedFilters[filter];
        return newAppliedFilters;
      });
    }
    // Enabling (Prevent both Answered and Unanswered from being true at the same time)
    if (filter === "answered" && appliedFilters["unanswered"]) {
      setAppliedFilters((lastAppliedFilters) => {
        const newFilters = { ...lastAppliedFilters, answered: true };
        delete newFilters.unanswered;
        return newFilters;
      });
    }
    if (filter === "unanswered" && appliedFilters["answered"]) {
      return setAppliedFilters((lastAppliedFilters) => {
        const newFilters = { ...lastAppliedFilters, unanswered: true };
        delete newFilters.answered;
        return newFilters;
      });
    }
    return setAppliedFilters((lastAppliedFilters) => ({
      ...lastAppliedFilters,
      [filter]: true,
    }));
  };

  const filteredQuestions = (questions || [])
    .sort(orderBy === "upVotes" ? sortByUpVotes : sortByCreatedAt)
    .filter(
      (question) =>
        Object.keys(appliedFilters).length === 0 ||
        Object.entries(appliedFilters).every(
          ([filter, val]) =>
            val && QUESTION_FILTERS[filter as FilterTypes](question)
        )
    );

  // TODO: Add a filter/sorting SVG for the sorting
  return (
    <section>
      <MDHeader style={{ marginTop: "50px" }}>Question Feed</MDHeader>
      <QuestionFeedControlsContainer>
        <div>
          <span style={{ marginRight: "10px" }}>Sort</span>
          <Button
            variant={orderBy === "createdAt" ? "primary" : "secondary"}
            onClick={() => {
              setOrderBy("createdAt");
            }}
          >
            Newest
          </Button>
          <Button
            variant={orderBy === "upVotes" ? "primary" : "secondary"}
            onClick={() => setOrderBy("upVotes")}
          >
            Most Votes
          </Button>
        </div>
        <div>
          <span style={{ marginRight: "10px" }}>Filter</span>
          {filters.map((filter) =>
            filtersAcl[filter] !== undefined ? (
              <Can key={filter} aclAction={filtersAcl[filter] as AclActions}>
                <Button
                  variant={appliedFilters[filter] ? "primary" : "secondary"}
                  onClick={() => toggleFilter(filter)}
                >
                  {filter}
                </Button>
              </Can>
            ) : (
              <Button
                key={filter}
                variant={appliedFilters[filter] ? "primary" : "secondary"}
                onClick={() => toggleFilter(filter)}
              >
                {filter}
              </Button>
            )
          )}
        </div>
      </QuestionFeedControlsContainer>

      {filteredQuestions.length > 0 &&
        filteredQuestions.map((q) => (
          <SpacedQuestion key={q.id} question={q} />
        ))}

      {filteredQuestions.length === 0 && (
        <EmptyFeed>
          No questions.. try asking one or adjusting the filters!
        </EmptyFeed>
      )}
    </section>
  );
};

export default QuestionFeed;
