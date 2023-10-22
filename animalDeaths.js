// CONVERSION FACTORS
//===================
const LBS_PER_KG = 2.20462


//===================================================================================
// CHICKEN
//========
const kg_meat_per_chicken = 2.21 // source http://www.fao.org/faostat/en/#data/QCL
const LBS_MEAT_PER_CHICKEN = kg_meat_per_chicken * LBS_PER_KG

const lbs_meat_per_chicken_nugget =  0.0141096 // https://medium.com/swlh/the-nugget-numbers-how-much-chicken-is-in-a-chicken-nugget-41c607f490dc#:~:text=To%20be%20,Compounding%2C%20but%20for%20nuggets
const CHICKENS_PER_CHICKEN_NUGGET = LBS_MEAT_PER_CHICKEN*lbs_meat_per_chicken_nugget

// COW
//========
const kg_meat_per_cow = 370.6 // source http://www.fao.org/faostat/en/#data/QCL
const lbs_meat_per_cow = kg_meat_per_cow * LBS_PER_KG

// source https://rutherford.tennessee.edu/wp-content/uploads/sites/200/2022/05/PB1822-How-Much-Meat-to-Expect-from-a-Beef-Carcass.pdf
const ground_meat_per_cow = {
    'cut':{
        'chuck':39.2,
        'rib':4.3,
        'loin':3.5,
        'round':17.5,
        'flank':15.4,
    }
}

let total_ground_meat_lbs_per_cow = 0;
for (let cut in ground_meat_per_cow.cut) {
    total_ground_meat_lbs_per_cow += ground_meat_per_cow.cut[cut];
}
const total_meat_lbs_per_cow = 880; // source https://rutherford.tennessee.edu/wp-content/uploads/sites/200/2022/05/PB1822-How-Much-Meat-to-Expect-from-a-Beef-Carcass.pdf
const ground_meat_lbs_per_burger = 0.3125 // source https://www.epicurious.com/expert-advice/how-to-make-burger-patties-classic-smashed-stuffed-article#:~:text=Classic%20burgers%20usually%20range%20in,loosely%20form%20it%20into%20balls. //converts 5oz burger to pounds


const sirloin_pounds_per_cow = 50.5
const avg_lbs_per_sirloin = 0.625 //equivalent to 10oz steak


// PIG
//========
const kg_meat_per_pig = 97.6 // source http://www.fao.org/faostat/en/#data/QCL
const avg_lbs_ham_per_pig = 28// source http://www.fao.org/faostat/en/#data/QCL
const avg_lbs_loin_meat_per_pig = 23// source http://www.fao.org/faostat/en/#data/QCL
const avg_lbs_bacon_per_pig = 23// source http://www.fao.org/faostat/en/#data/QCL
const avg_slices_bacon_per_lb = 16 // source https://www.tysonfoodservice.com/products/wright/pork/bacon/00079621009518
const avg_slices_of_ham_per_lb = 16// source https://vendingproservice.com/how-many-slices-of-ham-are-in-a-pound/

// FINAL VALUES
// ============
const COWS_PER_BURGER = 1/(total_ground_meat_lbs_per_cow * ground_meat_lbs_per_burger)
const COWS_PER_SIRLOIN = sirloin_pounds_per_cow*avg_lbs_per_sirloin

const CHICKENS_PER_WING = 0.5;
const CHICKENS_PER_THIGH = 0.5;
const CHICKENS_PER_BREAST = 0.5;

const PIGS_PER_BACON_STRIP = 1/(avg_lbs_bacon_per_pig*avg_slices_bacon_per_lb)
const PIGS_PER_HAM_SLICE = 1/(avg_lbs_ham_per_pig*avg_slices_of_ham_per_lb)
const PIGS_PER_LOIN = 1/(avg_lbs_loin_meat_per_pig)

const animalDeathValues = {
    'beef':{
        'burger':COWS_PER_BURGER,
        'sirloin':COWS_PER_SIRLOIN
    },
    'chicken':{
        'nugget':CHICKENS_PER_CHICKEN_NUGGET,
        'wing':CHICKENS_PER_WING,
        'thigh':CHICKENS_PER_THIGH,
    },
    'pork':{
        'bacon strips':PIGS_PER_BACON_STRIP,
        'ham slice':PIGS_PER_HAM_SLICE,
        '1 lb loin':PIGS_PER_LOIN,
    }
}

const frequencyMultiplier = {
    'day':365,
    'week':52,
    'month':12,
    'year':1
}


const animalLookupFoodName = {
    'beef':'cow',
    'chicken':'chicken',
    'pork':'pig'
  }

function calculateAnimalsKilledPerYear(jsonString){
    const inputData = JSON.parse(jsonString);
    const { animal, meatType, qty, frequency } = inputData;

    let animalTypeKey = animal.toLowerCase();
    let meatTypeKey = meatType.toLowerCase();
    let frequencyKey = frequency.toLowerCase();

    let deaths;

    if (animalDeathValues[animalTypeKey] && animalDeathValues[animalTypeKey][meatTypeKey] && frequencyMultiplier[frequencyKey]) {
        const perServing = animalDeathValues[animalTypeKey][meatTypeKey];
        const totalAnimalsKilledPerYear = qty * frequencyMultiplier[frequencyKey] * perServing;
        deaths = Math.ceil(totalAnimalsKilledPerYear); // rounding up as you can't have a fraction of an animal
    }
    else {
        console.log('Invalid data provided.');
        return ['error','error']
    }

    const animalName = animalLookupFoodName[animalTypeKey];

    // console.log([deaths,animalName]);
    // console.log(animal);
    return [deaths,animalName];

}
