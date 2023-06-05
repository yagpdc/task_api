let ids = 0;
let tasks = [];


module.exports = {
  new(name, situation) {
    let task = { id: ++ids, name: name, situation: situation};
    tasks.push(task);
    return task;
  },
  update(id, name, situation) {
    let pos = this.getPositionById(id);
    if (pos >= 0) {
      tasks[pos].situation = situation
      tasks[pos].name = name;
    }
  },
  updateSituation(id, situation) {
    let pos = this.getPositionById(id);
    if (pos >= 0) {
      tasks[pos].situation = situation;
    }
  },
  list() {
    return tasks.filter(task => task.situation == "aguardo");
  },
  listDoing() {
    console.log( tasks.filter(task => task.situation == "andamento"));
    return tasks.filter(task => task.situation == "andamento");
  },
  listDone() {
    return tasks.filter(task => task.situation == "concluido");
  },

  getElementById(id) {
    let pos = this.getPositionById(id);
    if (pos >= 0) {
      return tasks[pos];
    }
    return null;
  },
  getPositionById(id) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id == id) {
        return i;
      }
    }
    return -1;
  },
  // delete(id) {
  //   let i = this.getPositionById(id);
  //   if (i >= 0) {
  //     tasks.splice(i, 1);
  //     return true;
  //   }
  //   return false;
  // },
  moveAndamento(id) {
    let task = this.getElementById(id);
    if (task) {
      task.situation = "andamento";
      console.log(task)
      return true;
    }
    return false;
  }, 
  moveConcluido(id) {
    let task = this.getElementById(id);
    if (task) {
      task.situation = "concluido";
      console.log(task)
      return true;
    }
    return false;
  }


};
