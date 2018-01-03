module.exports = function() {
  var Question = require("./app/models/Question");

  var questions = [
    {
      text:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry?",
      order: 0,
    },
    {
      text:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book?",
      order: 1,
    },
    {
      text:
        "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged?",
      order: 2,
    },
    {
      text:
        "Contrary to popular belief, Lorem Ipsum is not simply random text?",
      order: 3,
    },
  ];

  questions.forEach(question => {
    var q = new Question();
    q.text = question.text;
    q.order = question.order;
    q.save();
  });
};
