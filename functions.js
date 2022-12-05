
// a function called mergeLocation that merges city, province, and country together
// into a single field called location with the format 'city, province, country'
// e.g. if a record has city = 'c', province = 'p', and country = 'co',
// there should be a new field location = 'c, p, co'
// if the city is either empty or equals to 'etc', location should just be 'p, co'
const mergeLocation = (arrRecords)=>{
  arrRecords.forEach(patient => {
    let city = patient.city
    let province = patient.province
    let country = patient.country
    let newLoc = {city, province, country}
    if (city===null || city==='etc'){
      newLoc = {province, country}
    }
    patient['location'] = newLoc
    delete patient.city
    delete patient.province
    delete patient.country
  
  });
}


// a function called mostConfirmedCase that decides which age group has the most confirmed case
// SKIP RECORDS WHICH DO NOT HAVE AGE GROUP SPECIFIED
const mostConfirmedCase = (arrRecords)=>{
  let output = '0s'
  let most = 1
  let map = new Map() // map to tabulate age group frequencies

  arrRecords.forEach(patient=>{
    var ageGrp = patient.age
    // tabulate the map
    if (map.hasOwnProperty(ageGrp)) {
      map[ageGrp] = map[ageGrp]+1
    } 
    else {
      map[ageGrp] = 1
    }
    delete map['']
  })

  // loop through map values to fnd the

  for (var key of Object.keys(map)){
    if (map[key]>most){
      most = map[key]
      output = key
    }
  }
  console.log(map)
  console.log(output)
  return output
}

// a function called averageRecoveryTime for those who are confirmed and released, this function computes
// the average recovery time (in days)
//round down at the last step of computation, specifically use Math.floor
// SKIP RECORDS WHICH DO NOT HAVE A RELEASED DATE
const averageRecoveryTime=(arrRecords)=>{
  let total = 0
  let numPatients = 0
  arrRecords.forEach(patient=>{
    let diff_in_days = 0
    
      let confirmed = new Date(patient.confirmed_date)
      let released = new Date(patient.released_date)
      let diff_in_time = confirmed.getTime() - released.getTime()
      if (patient.confirmed_date.length===0 || patient.released_date.length===0){
        diff_in_days = 0;
      }
      else{
        numPatients++;
        diff_in_days = diff_in_time/(1000*3600*24)
        diff_in_days = Math.abs(diff_in_days)
      }
      // console.log(diff_in_days)
      total+=diff_in_days
  })
  total = Math.floor(total)
  console.log(total/numPatients)
}


// a function called stateTally: out of all the VALID records in the CSV file, this function compute the stateTally of
// 1) males that are released
// 2) males that are deceased
// 3) males that are isolated
// 4) females that are released
// 5) females that are deceased
// 6) females that are isolated
// SKIP ALL RECORDS THAT DO NOT HAVE SEX OR STATE SPECIFIED, ALL OTHER RECORDS ARE VALID
const stateTally=(arrRecords)=>{
  let pMap = new Map()
  pMap['male_released']=0
  pMap['male_isolated']=0
  pMap['male_deceased']=0
  pMap['female_released']=0
  pMap['female_isolated']=0
  pMap['female_deceased']=0
  

  arrRecords.forEach(patient=>{
    let gender = patient.sex
    let status = patient.state
    if (gender==='male'){
      if (status==='released'){
        pMap['male_released'] = pMap.male_released+1
      }
      else if (status==='isolated'){
        pMap['male_isolated'] = pMap.male_isolated+1
      }
      else if (status==='deceased'){
        pMap['male_deceased'] = pMap.male_deceased+1
      }
    }
    else if (gender==='female'){
      if (status==='released'){
        pMap['female_released'] = pMap.female_released+1
      }
      else if (status==='isolated'){
        pMap['female_isolated'] = pMap.female_isolated+1
      }
      else if (status==='deceased'){
        pMap['female_deceased'] = pMap.female_deceased+1
      }
    }
  })
  console.log(pMap)
}


// TODO: export your functions HERE
module.exports ={mergeLocation, mostConfirmedCase, averageRecoveryTime, stateTally}