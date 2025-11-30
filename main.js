/**
* @description Generuje náhodný seznam zaměstnanců.
 * @param {object} dtoIn Vstupní objekt obsahující: count (počet zaměstnanců), age limit {min, max} (věkové rozpětí).
 * @returns {Array} dtoOut pole vygenerovaných zaměstnanců.
 */

//Hlavní fuknce, která náhodně vytváří zaměstnance podle požadavků
export function main(dtoIn) {
    let employeeCount = 0;
    let employees = [];
    
    // Hlavní cyklus: opakujeme, dokud nemáme požadovaný počet zaměstnanců
    while(employeeCount < dtoIn.count){
        let employee;
        let isDuplicate = true; // Předpokládáme, že je datum duplikátní

        // Vnitřní cyklus: generujeme, dokud nenajdeme unikátní datum narození
        while(isDuplicate) {
            
            employee = employeeRandom(dtoIn);
            isDuplicate = false; // Resetujeme před kontrolou

            // KONTROLA DUPLICITY: Projdeme již existující zaměstnance
            for(let i = 0; i < employees.length; i++){
                // Pokud datum nového zaměstnance odpovídá datumu existujícího...
                if(employees[i].birthdate === employee.birthdate){
                    isDuplicate = true; // ... nastavíme na true a cyklus se zopakuje
                    break; // Ukončíme for cyklus, nemusíme kontrolovat dál
                }
            }
        }
        
        // Zde je employee unikátní
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

/**
 * @description Generuje náhodné datum narození tak, aby věk osoby ležel v intervalu <minAge, maxAge>.
 * @param {number} minAge Minimální věk v letech.
 * @param {number} maxAge Maximální věk v letech.
 * @returns {Date} Objekt Date s náhodným datem narození.
 */

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

/**
 * @description Generuje objekt jednoho zaměstnance s náhodnými údaji (jméno, pohlaví, věk, úvazek).
 * @param {object} dtoIn Vstupní objekt s věkovými limity.
 * @returns {object} Objekt s údaji zaměstnance.
 */

function employeeRandom(dtoIn){
    let genderOpt = ["female", "male"];
    let name = "";
    let surname = "";

    let gender = genderOpt[Math.floor(Math.random() * genderOpt.length)]; //Náhodný výber pohlaví

    //Pokud je pohlaví žena, jména se vybírají z polí ženských jmen a příjmení
    if(gender === "female"){
        name = names.fNamesF[Math.floor(Math.random() * names.fNamesF.length)]
        surname = names.lNamesF[Math.floor(Math.random() * names.lNamesF.length)]
    //Pokud je pohlaví muž, jména se vybírají z polí mužských jmen a příjmení
    } else if(gender === "male"){
        name = names.fNamesM[Math.floor(Math.random() * names.fNamesM.length)]
        surname = names.lNamesM[Math.floor(Math.random() * names.lNamesM.length)]
        
    };

    let birthdate = randomBday(dtoIn.age.min, dtoIn.age.max); //Načtení náhodného data narození v rámci požadovaného rozsahu

    birthdate.setUTCHours(0, 0, 0, 0); //Nastavení času na půlnoc pro případ rozdílných časových zón 

    birthdate = birthdate.toISOString(); //Převedení na ISO formát 

    let workload = workLoadOpt[Math.floor(Math.random() * workLoadOpt.length)]; //Náhodné generování úvazku

  //Vrácení pole zaměstnaců
    return{
        name,
        surname,
        gender,
        birthdate,
        workload
    };
}


