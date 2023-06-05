var express = require('express');
var Task = require("../model/Tasks")
var TaskSchema = require("../validators/TaskValidator")
const Joi = require("joi")
var router = express.Router();

router.get('/', function (req, res, next) {

  let obj = Task.getElementById(req.query.tid);
  params = { tasksAwaiting: Task.list(), task: obj, tasksDoing: Task.listDoing(), tasksDone: Task.listDone() }
  let prioridade_default = obj?.situation || '';
  params['situations'] = [
    { nome: 'Aguardando', value: 'aguardo', selected: prioridade_default == 'aguardo' },
    { nome: 'Em andamento', value: 'andamento', selected: prioridade_default == 'andamento' },
  ]
  res.render('index', params);
});

router.post("/erro", function (req, res) {
  const { error, value } = TaskSchema.validate(req.body);
  if (error) {
    res.render('index', { tasks: Task.list(), erro: "Dados incompletos" });
    return;
  }
  const { id, nome, situation } = value
  if (id === undefined) {

    Task.new(nome, situation);
  } else {

    Task.update(id, nome, situation);
  }
  res.redirect("/");
})
router.get("/erro/moveAndamento/:id", function (req, res) {
  const { id } = req.params;
  const { error, value } = Joi.number().integer().greater(0).validate(id)

  if (error || !Task.moveAndamento(value)) {
    res.send("Falha ao mover uma tarefa");
    return;
  }
  res.redirect("/");
})
router.get("/erro/concluir/:id", function (req, res) {
  const { id } = req.params;
  const { error, value } = Joi.number().integer().greater(0).validate(id)

  if (error || !Task.moveConcluido(value)) {
    res.send("Falha ao excluir uma tarefa");
    return;
  }
  res.redirect("/");
})


module.exports = router;
