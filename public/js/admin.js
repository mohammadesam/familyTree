let dataElemnt = document.getElementsByClassName("root")[0].innerHTML;

let data = JSON.parse(dataElemnt);
console.log(data);
var chart_config = {
  chart: {
    container: "#con",
    scrollbar: "fancy",
    animateOnInit: true,

    node: {
      collapsable: true,
      HTMLclass: "admin-style",
    },
    animation: {
      nodeAnimation: "easeOutBounce",
      nodeSpeed: 700,
      connectorsAnimation: "bounce",
      connectorsSpeed: 700,
    },
    connectors: {
      type: "bCurve",
    },
  },

  nodeStructure: {
    text: {
      name: data.text.name,
      contact: {
        val: "ADD Child",
        href: "/add/" + data.id,
        target: "_self",
      },
    },
    HTMLid: data.id,
    children: data.children,
  },
};
new Treant(chart_config);

let allNodes = document.getElementsByClassName("node");

for (let node of allNodes) {
  const edit = document.createElement("div");
  const img = document.createElement("img");
  const deleteBtn = document.createElement("img");

  img.style.width = "15px";
  img.style.height = "15px";
  img.src = "/images/edit.svg";
  edit.appendChild(img);
  img.classList.add("editBtn");
  node.appendChild(edit);
  node.appendChild(deleteBtn);
  console.log(node.id);
  deleteBtn.src = "/images/cancel.svg";
  deleteBtn.classList.add("nodeDel");
  deleteBtn.addEventListener("click", () => {
    let conf = confirm("are you sure you want to do this");
    document.location.href = "/admin/delete/" + node.id + "?confirm=" + conf;
  });
  img.addEventListener("click", () => {
    document.location.href = "/admin/edit/" + node.id;
  });
}
