const Person = require("./person.js");

function analizeTree(tree) {
  for (let node of tree) {
    let father = findById(node.father, tree);
    node.father = father == [] ? null : father;
    if (node.father != null) node.father.sons.push(node);
    //if (node.mother != null) node.mother.sons.push(node);
  }

  return tree.filter((node) => node.father == null);
}

function toClass(obj) {
  return new Person(obj.name, obj.father, obj.mother, obj.gender, obj._id);
}

function manipulateData(data, pageType) {
  let peopleArr = [];
  for (let person of data) {
    peopleArr.push(toClass(person));
  }
  let root = analizeTree(peopleArr)[0];
  let initObject = root.initObject(root);
  return root.getSons(root, initObject, pageType);
}

function findById(id, arr) {
  return arr.filter((one) => one.id == id)[0];
}

function getAllSons(parent, data) {
  let peopleArr = [];
  for (let person of data) {
    peopleArr.push(toClass(person));
  }

  analizeTree(peopleArr);

  parent = findById(parent._id, peopleArr);
  return parent.getAllSubNodes({});
}

module.exports = {
  getJson: manipulateData,
  getSubSons: getAllSons,
};
