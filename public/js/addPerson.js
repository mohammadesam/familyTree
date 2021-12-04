let genderElem = document.getElementById("gender");
let partner = document.getElementById("partnerContainer");

const addPartnerBtn = document.querySelector("#addPartnerBtn");
let partnerCount = partner.childElementCount;

addPartnerBtn.addEventListener("click", () => {
  partnerCount++;
  const div = document.createElement("div");
  const input = document.createElement("input");
  const label = document.createElement("label");
  const deleteBtn = document.createElement("button");

  deleteBtn.innerText = "حذف";
  input.id = "partner";
  input.name = "partner" + partnerCount;
  label.for = "partner";
  label.innerText = getRightPartnerName() + partnerCount;

  div.appendChild(label);
  div.appendChild(input);
  div.appendChild(deleteBtn);
  partner.appendChild(div);

  deleteBtn.addEventListener("click", () => {
    partner.removeChild(div);
  });
});

function deleteElement(e) {
  e.preventDefault();
  partner.removeChild(e.target.parentElement);
}

function getRightPartnerName() {
  if (genderElem.value === "male") return "الزوجة";
  return "الزوج";
}

// genderElem.addEventListener("change", () => {
//   let gender = genderElem.value;
//   console.log(gender);
//   if (gender == "male") {
//     partner.innerHTML = `
//       <div id="partnerContainer">
//         <div>
//             <label for="partner">  1الزوجة </label>
//             <input type="text" name="partner1" id="partner">
//         </div>

//         <div>
//             <label for="partner">  2الزوجة </label>
//             <input type="text" name="partner2" id="partner">
//         </div>
//         <div>
//             <label for="partner">  3الزوجة </label>
//             <input type="text" name="partner3" id="partner">
//         </div>
//         <div>
//             <label for="partner">  4الزوجة </label>
//             <input type="text" name="partner4" id="partner">
//         <div>
//         </div>
//       `;
//   } else {
//     partner.innerHTML = `
//     <div id="partnerContainer">
//       <label for="partner">  الزوج </label>
//       <input type="text" name="partner" id="partner">
//     </div>
//     `;
//   }
// });
