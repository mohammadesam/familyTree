let root = document.getElementById("data");
let nodes = document.getElementsByClassName("node");
let data = JSON.parse(root.innerHTML);
let peopleInfo = JSON.parse(document.getElementById("objData").innerHTML);
console.log(peopleInfo);
/*
chart: {
            container: "#collapsable-example",

            animateOnInit: true,
            
            node: {
                collapsable: true
            },
            animation: {
                nodeAnimation: "easeOutBounce",
                nodeSpeed: 700,
                connectorsAnimation: "bounce",
                connectorsSpeed: 700
            }
        },
        chart: {
    container: "#family-tree",
    // levelSeparation: 30,
    siblingSeparation: 20,
    subTeeSeparation: 60,
    scrollbar: "fancy",
  },
*/

var chart_config = {
  chart: {
    container: "#family-tree",
    scrollbar: "fancy",
    animateOnInit: true,

    node: {
      collapsable: true,
      HTMLclass: "node-style",
    },
    animation: {
      nodeAnimation: "easeOutBounce",
      nodeSpeed: 700,
      connectorsAnimation: "bounce",
      connectorsSpeed: 700,
    },
    connectors: {
      type: "step",
    },
  },

  nodeStructure: {
    text: {
      name: data.text.name,
    },
    HTMLid: data.HTMLid,
    children: data.children,
  },
};
new Treant(chart_config);

let infoSwitch = false;

// slide details
const div = document.getElementsByClassName("details")[0];
const dataElement = document.getElementsByClassName("dataElem")[0];
const close_details = document.getElementsByClassName("close-details")[0];

close_details.addEventListener("click", () => {
  div.classList.add("hide");
  infoSwitch = !infoSwitch;
  document.body.classList.remove("shadow");
});
let collapseSwitchElements = document.getElementsByClassName("collapse-switch");
let allNodes = document.getElementsByClassName("node");

for (let collapse of allNodes) {
  /// info btn
  let info = document.createElement("span");
  collapse.appendChild(info);
  info.innerText = "+";
  info.classList.add("info");

  let elem = collapse;
  let elemData = peopleInfo[elem.id];

  info.addEventListener("click", () => {
    if (!infoSwitch) {
      document.body.classList.add("shadow");
    } else {
      document.body.classList.remove("shadow");
    }
    infoSwitch = !infoSwitch;
    dataElement.innerHTML = getDetails(elemData);
    div.classList.toggle("hide");
  });
}

function getDetails(obj) {
  //  let father =
  //   obj.father == null ? "no father" : peopleInfo[obj.father].name;
  //   let mother = obj.motehr == null ? "no mother" : obj.mother

  let partner = obj.partner == null ? "غير متزوج" : obj.partner;
  let partnerGender = obj.gender == "male" ? "الزوجة" : "الزوج";

  let str = ``;

  partner.forEach((wife, index) => {
    let ind = index + 1;
    if (wife.length !== 0) {
      str += partnerGender + " " + ind + " : " + wife + "<br>";
    }
  });

  str += `الاب:   ${obj.Father || "غير مسجل"} <br>`;
  str += `الام:  ${obj.mother || "غير مسجل"}  <br>`;
  return str;
}

//https://dashboard.heroku.com/apps/family-tree-s/deploy/heroku-git
