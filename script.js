
const numDropdownMenu = document.querySelector('#qtyDropdown + .dropdown-menu');
for (let i = 1; i <= 100; i++) {
  const item = document.createElement('a');
  item.className = 'dropdown-item';
  item.href = '#';
  item.textContent = i;
  item.onclick = function() {
    changeSubMenuText(i,'qtyDropdown')
    const frequencyDropdown = document.getElementById('frequencyDropdown')
    enableSubMenu(frequencyDropdown);
    ; };
  numDropdownMenu.appendChild(item);
}

function changeTextAndEnable(dropDownItem, dropDownId) {
    document.getElementById(dropDownId).textContent = dropDownItem;
    const subDropdown = document.getElementById('subDropdown');
    subDropdown.innerText = "Choose meat type"
    const subMenu = document.querySelector('#subDropdown + .dropdown-menu');
    subMenu.innerHTML = ''; // Clear existing options

//populate the options of the subMenu
let options;
if (dropDownItem === 'Chicken') {
  options = ['Nugget', 'Wing'];
} else if (dropDownItem === 'Beef') {
  options = ['Steak', 'Burger'];
}
else if (dropDownItem === 'Pork') {
  options = ['Bacon strips', '1 lb loin', 'ham slice'];
}

    options.forEach(option => {
        const item = document.createElement('a');
        item.className = 'dropdown-item';
        item.href = '#';
        item.textContent = option;
        item.onclick = function() {
          changeSubMenuText(option,'subDropdown')
          const qtyDropdown = document.getElementById('qtyDropdown')
          enableSubMenu(qtyDropdown)
         }; 
        subMenu.appendChild(item);
      });

    enableSubMenu(subDropdown);
  }

  function changeSubMenuText(option, menuClass) {
    document.getElementById(menuClass).textContent = option;

  }

function enableSubMenu(subMenu){
    subMenu.disabled = false;
    subMenu.className = 'btn btn-primary dropdown-toggle';
  }

  function enableCalculateButton(frequency) {
    document.getElementById('frequencyDropdown').textContent = frequency;
    const calculateButton = document.getElementById('calculateButton');
    calculateButton.disabled = false; // Enable the Calculate button
    calculateButton.className = 'btn btn-primary'; // Change button color to standard
  }
 
  document.getElementById("calculateButton").addEventListener("click", function() {
    const animal = document.getElementById("animalDropdown").textContent.trim();
    const meatType = document.getElementById("subDropdown").textContent.trim();
    const qty = document.getElementById("qtyDropdown").textContent.trim();
    const frequency = document.getElementById("frequencyDropdown").textContent.trim();
    
    const obj = {
      animal: animal,
      meatType: meatType,
      qty: qty,
      frequency: frequency
    };
  
    const jsonStr = JSON.stringify(obj);
    console.log("JSON:", jsonStr);

  const blurbContainer = document.createElement('div');
  blurbContainer.classList.add('appendedDiv','container' ,'bg-light');

  
  const pluralQty = (parseInt(qty)>1) ? 's' : '';
  const result = calculateAnimalsKilledPerYear(jsonStr);
  const [deaths, animalName] = result.values();
  
  const pluralDeaths = (parseInt(deaths)>1) ? 's' : '';

  blurbContainer.innerHTML = `<p>In the US, Eating ${qty} ${animal.toLowerCase()} ${meatType.toLowerCase()}${pluralQty} per ${frequency.toLowerCase()} kills approximately ${deaths} ${animalName}${pluralDeaths} in a year.</p>`;
  
  // Append the new div to the body
  const mainContainer = document.querySelector(".main-container");
  mainContainer.appendChild(blurbContainer);
  // document.body.appendChild(blurbContainer);
  
  const resetButton = document.getElementById("resetButton")
  resetButton.disabled = false;
  resetButton.className ="btn btn-primary";

  });
 

$("#resetButton").click(function() {

  // Disable all 'btn' class buttons except the one with id 'animalDropdown'
  $(".btn").not("#animalDropdown").prop("disabled", true);
  $(".btn").not("#animalDropdown").removeClass("btn-primary").addClass('btn-secondary');
  
  // Remove appended divs
  const divs = document.querySelectorAll('.appendedDiv')
  divs.forEach((div) => {
    div.remove();
  });
});
