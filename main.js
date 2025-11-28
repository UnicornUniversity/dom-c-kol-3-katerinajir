/**
* @description Generuje náhodný seznam zaměstnanců.
 * @param {object} dtoIn Vstupní objekt obsahující: count (počet zaměstnanců), age limit {min, max} (věkové rozpětí).
 * @returns {Array} dtoOut pole vygenerovaných zaměstnanců.
 */

    export function main(dtoIn) {
   let employeeCount = 0;
    let employees = []
   while(employeeCount < dtoIn.count){
      const employee = employeeRandom(dtoIn);
      

      employees.push({
        name: employee.name,
        surname: employee.surname,
        gender: employee.gender,
        birthdate: employee.birthdate,
        workload: employee.workload
      });

      employeeCount++;
    };

 return employees;
};

const names = {
    fNamesF:[
        "Anna", "Eliška", "Adéla", "Tereza", "Kristýna",
    "Karolína", "Klára", "Sára", "Natálie", "Nikola",
    "Barbora", "Kateřina", "Markéta", "Lucie", "Veronika",
    "Michaela", "Jana", "Šárka", "Denisa", "Alena",
    "Marie", "Zuzana", "Pavla", "Lenka", "Monika"
    ],

    lNamesF: [  "Nováková", "Svobodová", "Novotná", "Dvořáková", "Černá",
  "Procházková", "Kučerová", "Veselá", "Horáková", "Němcová",
  "Pokorná", "Marková", "Hájková", "Králová", "Jelínková",
  "Krejčová", "Růžičková", "Benešová", "Fialová", "Sedláčková",
  "Doležalová", "Zemanová", "Kolářová", "Vaňková", "Kadlecová"
    ],

    fNamesM: [
        "Jan", "Jakub", "Tomáš", "Adam", "Matěj",
    "Vojtěch", "Lukáš", "Ondřej", "Petr", "Josef",
    "David", "Daniel", "Michal", "Martin", "Šimon",
    "Tadeáš", "Filip", "Marek", "Roman", "Václav",
    "Radek", "Karel", "Jaroslav", "Patrik", "Dominik"
    ],

    lNamesM: [
         "Novák", "Svoboda", "Novotný", "Dvořák", "Černý",
  "Procházka", "Kučera", "Veselý", "Horák", "Němec",
  "Pokorný", "Marek", "Hájek", "Král", "Jelínek",
  "Krejčí", "Růžička", "Beneš", "Fiala", "Sedláček",
  "Doležal", "Zeman", "Kolář", "Vaněk", "Kadlec"
    ],
};


const workLoadOpt = [10, 20, 30, 40];

function randomBday(minAge, maxAge) {
  const today = new Date();
  
  // Přesný výpočet v ms: 365.25 dní/rok * 24h * 60m * 60s * 1000ms
  const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;
  
  // 1. Nejstarší datum (T_min) = Dnes - MAXIMÁLNÍ věk (v ms)
  const minTime = today.getTime() - (maxAge * MS_PER_YEAR);

  // 2. Nejmladší datum (T_max) = Dnes - MINIMÁLNÍ věk (v ms)
  const maxTime = today.getTime() - (minAge * MS_PER_YEAR);

  // Generování náhodného timestampu
  let randomTime = minTime + Math.random() * (maxTime - minTime);

  return new Date(randomTime);
}
 

function employeeRandom(dtoIn){
    let genderOpt = ["female", "male"];
    let name = "";
    let surname = "";

    let gender = genderOpt[Math.floor(Math.random() * genderOpt.length)];

    if(gender === "female"){
        name = names.fNamesF[Math.floor(Math.random() * names.fNamesF.length)]
        surname = names.lNamesF[Math.floor(Math.random() * names.lNamesF.length)]    
    } else if(gender === "male"){
        name = names.fNamesM[Math.floor(Math.random() * names.fNamesM.length)]
        surname = names.lNamesM[Math.floor(Math.random() * names.lNamesM.length)]
        
    };

    let birthdate = randomBday(dtoIn.age.min, dtoIn.age.max);

    birthdate.setUTCHours(0, 0, 0, 0);

    birthdate = birthdate.toISOString();

    let workload = workLoadOpt[Math.floor(Math.random() * workLoadOpt.length)];

  
    return{
        name,
        surname,
        gender,
        birthdate,
        workload
    };
}


