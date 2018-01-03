const sessionId = "937rbewr72479bnr9w";
module.exports.sessionId = sessionId;

module.exports.questions = [
  {
    _id: "5a4978a3242a391728146cfc",
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry?",
    order: 0,
    __v: 0,
  },
  {
    _id: "5a4978a3242a391728146cfd",
    text:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book?",
    order: 1,
    __v: 0,
  },
  {
    _id: "5a4978a3242a391728146cfe",
    text:
      "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged?",
    order: 2,
    __v: 0,
  },
];

module.exports.validQuestion = {
  text:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry?",
  order: 0,
};

module.exports.validAnswer = {
  session_id: sessionId,
  question_id: "5a4978a3242a391728146cfd",
  text: "This is an amazing answer",
};

module.exports.answers = [
  {
    _id: "5a4bc705969023ee86fa3693",
    session_id: sessionId,
    question_id: "5a4978a3242a391728146cfd",
    text: "This is an amazing answer",
    __v: 0,
  },
  {
    _id: "5a4bc70b969023ee86fa3694",
    session_id: sessionId,
    question_id: "5a4978a3242a391728146cfe",
    text: "This is an amazing answer 2",
    __v: 0,
  },
];

module.exports.expectedNextQuestion = {
  question: {
    _id: "5a4978a3242a391728146cfd",
    text:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book?",
    order: 1,
    __v: 0,
  },
  answers: [
    {
      _id: "5a4bc705969023ee86fa3693",
      session_id: sessionId,
      question_id: "5a4978a3242a391728146cfd",
      text: "This is an amazing answer",
      __v: 0,
    },
  ],
};

module.exports.expectedSummary = [
  {
    id: "5a4978a3242a391728146cfc",
    question:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry?",
    answers: [],
  },
  {
    id: "5a4978a3242a391728146cfd",
    question:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book?",
    answers: [
      {
        _id: "5a4bc705969023ee86fa3693",
        session_id: sessionId,
        question_id: "5a4978a3242a391728146cfd",
        text: "This is an amazing answer",
        __v: 0,
      },
    ],
  },
  {
    id: "5a4978a3242a391728146cfe",
    question:
      "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged?",
    answers: [
      {
        _id: "5a4bc70b969023ee86fa3694",
        session_id: sessionId,
        question_id: "5a4978a3242a391728146cfe",
        text: "This is an amazing answer 2",
        __v: 0,
      },
    ],
  },
];

module.exports.request = {
  validAnswer: () => {
    return {
      body: {
        text: "Test answer text",
      },
      headers: {
        ["sw-session-id"]: sessionId,
      },
      params: {
        question_id: "5a4978a3242a391728146cfc",
      },
    };
  },
  validSession: () => {
    return {
      headers: {
        ["sw-session-id"]: sessionId,
      },
    };
  },
  missingSession: () => {
    return {
      body: {
        text: "Test answer text",
      },
      headers: {},
      params: {
        question_id: "5a4978a3242a391728146cfc",
      },
    };
  },
  missingBody: () => {
    return {
      body: {},
      headers: {
        ["sw-session-id"]: sessionId,
      },
      params: {
        question_id: "5a4978a3242a391728146cfc",
      },
    };
  },
  missingQuestionId: () => {
    return {
      body: {
        text: "Test answer text",
      },
      headers: {
        ["sw-session-id"]: sessionId,
      },
      params: {},
    };
  },
};
