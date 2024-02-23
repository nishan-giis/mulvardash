var Summary = {
    sarlahi_fire: count_sarlahi_fire,
    sarlahi_flood: count_sarlahi_flood,
    composite_adapcap: count_composite_adapcap,
    composite_exposure: count_composite_exposure,
    composite_sensitivity: count_composite_sensitivity,
    composite_hazard: count_composite_hazard,
    vulnerability_score: count_vulnerability_score,
    risk_score: count_risk_score,
    component_indicator: count_component_indicator,
}


function regionSummaryFilter(data){
    if(Global.currentPalikaSelect != "All"){
        if(Global.currentPalikaSelect == "Gaunpalika"){
            data = data.filter(function(m){
                var palika = DataLayer.getPalikaFromFid(Data.fidCodeMap.indexOf(m.code));
                
                return palika == "Gaunpalika" || palika == "gaupaika";
            })
        }
        if(Global.currentPalikaSelect == "Nagarpalika"){
            data = data.filter(function(m){
                var palika = DataLayer.getPalikaFromFid(Data.fidCodeMap.indexOf(m.code));
                return palika == "Nagarpalika" || palika == "Mahanagarpalika" || palika == "Upamahanagarpalika" || palika == "maha Nagarpalika";
            })
        }
        
    }
    if(Global.districtSelected)
        return data.filter(function(m){
            return m.code.toString().substring(0,3) == Global.districtSelected
        });
    if(Global.provinceSelected)
        return data.filter(function(m){
            return m.code.toString().substring(0,1) == Global.provinceSelected
        });
    else return data;
}



function summaryText(){
    var text ="";
    if(Global.provinceSelected){
        text += ProvinceNepaliName[Global.provinceSelected] +" Provinceको ";
    }
    if(Global.districtSelected){
        text += Data.districtNepaliName[Global.districtSelected] +" Districtको ";
    }
    if(Global.currentPalikaSelect != "All"){
        text += $('#palikaSelect').children(':selected').text()+"हरुमा "; 
    }
    text += $('#mayor_select').children(':selected').text() + " Winners " + "<b>"+$('#filter_select_1').children(':selected').text() + ": Count </b>";

    return text;
}

function count_sarlahi_fire(key){
    data = regionSummaryFilter(Data.Hazard);
    if(key == "Very High" ){
        return toNepaliDigits(data.filter(function(m){
            return m.range == key
        }).length);
    }
    else if(key == "High" ){
        return toNepaliDigits(data.filter(function(m){
            return m.range == key
        }).length);
    }
    else if(key == "Medium" ){
        return toNepaliDigits(data.filter(function(m){
            return m.range == key
        }).length);
    }
    else if(key == "Low" ){
        return toNepaliDigits(data.filter(function(m){
            return m.range == key
        }).length);
    }
    else if(key == "Very Low" ){
        return toNepaliDigits(data.filter(function(m){
            return m.range == key
        }).length);
    }
    else{
        return toNepaliDigits(0);
    }
}

function count_sarlahi_flood(key){
    data = regionSummaryFilter(Data.HazardFlood);
    if(key == "Very High" ){
        return toNepaliDigits(data.filter(function(m){
            return m.range == key
        }).length);
    }
    else if(key == "High" ){
        return toNepaliDigits(data.filter(function(m){
            return m.range == key
        }).length);
    }
    else if(key == "Medium" ){
        return toNepaliDigits(data.filter(function(m){
            return m.range == key
        }).length);
    }
    else if(key == "Low" ){
        return toNepaliDigits(data.filter(function(m){
            return m.range == key
        }).length);
    }
    else if(key == "Very Low" ){
        return toNepaliDigits(data.filter(function(m){
            return m.range == key
        }).length);
    }
    else{
        return toNepaliDigits(0);
    }
}

// function count_composite_sensitivity(key){
//     data = regionSummaryFilter(Data.compositeDailekh);
//     if(key == "0 - 0.2" ){
//         return toNepaliDigits(data.filter(function(m){
//             return m.range == key
//         }).length);
//     }
//     else if(key == "0.2 - 0.4" ){
//         return toNepaliDigits(data.filter(function(m){
//             return m.range == key
//         }).length);
//     }
//     else if(key == "0.4 - 0.6" ){
//         return toNepaliDigits(data.filter(function(m){
//             return m.range == key
//         }).length);
//     }
//     else if(key == "0.6 - 0.8" ){
//         return toNepaliDigits(data.filter(function(m){
//             return m.range == key
//         }).length);
//     }
//     else if(key == "0.8 - 1" ){
//         return toNepaliDigits(data.filter(function(m){
//             return m.range == key
//         }).length);
//     }
//     else{
//         return toNepaliDigits(0);
//     }
// }

function countRange(key, data) {
    return toNepaliDigits(data.filter(function(m) {
      return m.range === key;
    }).length);
}

function count_composite_adapcap(key) {
  data = regionSummaryFilter(Data.compositeDailekh);
  if (key === "0 - 0.2") {
    return countRange(key, data);
  } else if (key === "0.21 - 0.4") {
    return countRange(key, data);
  } else if (key === "0.41 - 0.6") {
    return countRange(key, data);
  } else if (key === "0.61 - 0.8") {
    return countRange(key, data);
  } else if (key === "0.81 - 1") {
    return countRange(key, data);
  } else {
    return toNepaliDigits(0);
  }
}

function count_composite_sensitivity(key) {
  data = regionSummaryFilter(Data.compositeDailekh);
  if (key === "0 - 0.2") {
    return countRange(key, data);
  } else if (key === "0.21 - 0.4") {
    return countRange(key, data);
  } else if (key === "0.41 - 0.6") {
    return countRange(key, data);
  } else if (key === "0.61 - 0.8") {
    return countRange(key, data);
  } else if (key === "0.81 - 1") {
    return countRange(key, data);
  } else {
    return toNepaliDigits(0);
  }
}

function count_composite_hazard(key) {
  data = regionSummaryFilter(Data.compositeDailekh);
  if (key === "0 - 0.2") {
    return countRange(key, data);
  } else if (key === "0.21 - 0.4") {
    return countRange(key, data);
  } else if (key === "0.41 - 0.6") {
    return countRange(key, data);
  } else if (key === "0.61 - 0.8") {
    return countRange(key, data);
  } else if (key === "0.81 - 1") {
    return countRange(key, data);
  } else {
    return toNepaliDigits(0);
  }
}

function count_vulnerability_score(key) {
  data = regionSummaryFilter(Data.compositeDailekh);
  console.log(data);
  if (key === "0 - 0.2") {
    return countRange(key, data);
  } else if (key === "0.21 - 0.4") {
    return countRange(key, data);
  } else if (key === "0.41 - 0.6") {
    return countRange(key, data);
  } else if (key === "0.61 - 0.8") {
    return countRange(key, data);
  } else if (key === "0.81 - 1") {
    return countRange(key, data);
  } else {
    return toNepaliDigits(0);
  }
}
function count_risk_score(key) {
  data = regionSummaryFilter(Data.compositeDailekh);
  console.log(data);
  if (key === "0 - 0.2") {
    return countRange(key, data);
  } else if (key === "0.21 - 0.4") {
    return countRange(key, data);
  } else if (key === "0.41 - 0.6") {
    return countRange(key, data);
  } else if (key === "0.61 - 0.8") {
    return countRange(key, data);
  } else if (key === "0.81 - 1") {
    return countRange(key, data);
  } else {
    return toNepaliDigits(0);
  }
}
function count_composite_exposure(key) {
  data = regionSummaryFilter(Data.compositeDailekh);
  if (key === "0 - 0.2") {
    return countRange(key, data);
  } else if (key === "0.21 - 0.4") {
    return countRange(key, data);
  } else if (key === "0.41 - 0.6") {
    return countRange(key, data);
  } else if (key === "0.61 - 0.8") {
    return countRange(key, data);
  } else if (key === "0.81 - 1") {
    return countRange(key, data);
  } else {
    return toNepaliDigits(0);
  }
}

function count_component_indicator(key) {
  data = regionSummaryFilter(Data.rawData);
  if (key === "0 - 0.2") {
    return countRange(key, data);
  } else if (key === "0.21 - 0.4") {
    return countRange(key, data);
  } else if (key === "0.41 - 0.6") {
    return countRange(key, data);
  } else if (key === "0.61 - 0.8") {
    return countRange(key, data);
  } else if (key === "0.81 - 1") {
    return countRange(key, data);
  } else {
    return toNepaliDigits(0);
  }
}
