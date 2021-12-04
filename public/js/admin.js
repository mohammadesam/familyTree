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
      drawLineThrough: true,
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
      // contact: {
      //   val: "ADD Child",
      //   href: "/add/" + data.id,
      //   target: "_self",
      // },
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
  const addChildBtn = document.createElement("div");
  const warperDiv = document.createElement("div");

  warperDiv.style.display = "flex";
  warperDiv.style.justifyContent = "center";
  warperDiv.style.alignItems = "center";

  addChildBtn.innerHTML = "+";
  addChildBtn.classList.add("add-child");
  addChildBtn.style.cursor = "pointer";
  addChildBtn.style.margin = "0px 0 0 6px";

  img.style.width = "12px";
  img.style.height = "12px";
  edit.style.margin = "0 0 10px 0";
  img.src = "/images/edit.svg";
  edit.appendChild(img);
  img.classList.add("editBtn");

  // appending child elements to their parent
  node.appendChild(deleteBtn);
  warperDiv.appendChild(edit);
  warperDiv.appendChild(addChildBtn);
  node.appendChild(warperDiv);
  deleteBtn.src = "/images/cancel.svg";
  deleteBtn.classList.add("nodeDel");

  //! events
  deleteBtn.addEventListener("click", () => {
    let conf = confirm(
      "هل انت متاكد من انك تريد حذف هذا الشخص سيؤدي ذلك الى حذف جميع الابناء المتصلين به"
    );
    if (!conf) return;
    document.location.href = "/admin/delete/" + node.id + "?confirm=" + conf;
  });
  img.addEventListener("click", () => {
    document.location.href = "/admin/edit/" + node.id;
  });

  addChildBtn.addEventListener("click", () => {
    document.location.href = "/add/" + node.id;
  });
}
