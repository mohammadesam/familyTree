let genderElem = document.getElementById("gender");
let partner = document.getElementById("partnerContainer");

genderElem.addEventListener("change", () => {
  let gender = genderElem.value;
  console.log(gender);
  if (gender == "male") {
    partner.innerHTML = `
      <div id="partnerContainer">
        <div>
            <label for="partner">  1الزوجة </label>
            <input type="text" name="partner1" id="partner">
        </div>

        <div>
            <label for="partner">  2الزوجة </label>
            <input type="text" name="partner2" id="partner">
        </div>
        <div>
            <label for="partner">  3الزوجة </label>
            <input type="text" name="partner3" id="partner">
        </div>
        <div>
            <label for="partner">  4الزوجة </label>
            <input type="text" name="partner4" id="partner">
        <div>
        </div>
      `;
  } else {
    partner.innerHTML = `
    <div id="partnerContainer">
      <label for="partner">  الزوج </label>
      <input type="text" name="partner" id="partner">
    </div>
    `;
  }
});
