class Person {
  constructor(name, father, mother, gender = "male", id = 0, partner) {
    this.id = id;
    this.name = name;
    this.father = father;
    this.mother = mother;
    this.partner = partner;
    this.sons = [];
    this.gender = gender;
  }

  setPartner(male, female) {
    male.partner = female;
    female.partner = male;
  }

  minifiedObj(node, type) {
    if (type == "admin")
      return {
        text: {
          // desc: {
          //   val: "X",
          //   href: "/admin/delete/" + node.id,
          //   target: "_self",
          // },
          name: node.name,
          contact: {
            val: "ADD Child",
            href: "/add/" + node.id,
            target: "_self",
          },
        },
        HTMLid: node.id,
        children: [],
      };
    else
      return {
        text: {
          name: node.name,
        },
        HTMLid: node.id,
        children: [],
      };
  }

  initObject(father) {
    return { ...this.minifiedObj(father), id: father.id };
  }
  getSons(parent, obj, type) {
    parent.sons.forEach((son) => {
      let CurrentObj = this.minifiedObj(son, type);
      obj.children.push(CurrentObj);
      this.getSons(son, CurrentObj, type);
    });
    return obj;
  }

  getAllSubNodes(obj, parent = this) {
    parent.sons.forEach((son) => {
      obj[son.id] = son;
      this.getAllSubNodes(obj, son);
    });
    return obj;
  }
}

module.exports = Person;
