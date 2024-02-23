var Popups = {
    generalProvince: generalProvince,
    generalDistrict: generalDistrict,
    generalMunicipality: generalMunicipality,

    density: {
        province: province_density,
        // district: district_density,
        // municipality: municipality_density
    },
    sarlahi_fire: {
      municipality: sarlahi_fire
    }, 
    sarlahi_flood: {
      municipality: sarlahi_flood
    },
    dailekh_hazard: {
      municipality: dailekh_hazard
    },   
    composite_adapcap: {
      municipality: composite_adapcap
    }, 
    composite_exposure: {
      municipality: composite_exposure
    }, 
    composite_sensitivity: {
      municipality: composite_sensitivity
    },
    composite_hazard: {
      municipality: composite_hazard
    },
    vulnerability_score: {
      municipality: vulnerability_score
    },
    risk_score: {
      municipality: risk_score
    },
    component_indicator: {
      municipality: component_indicator
    },    
}



function highlightFeature(e) {
  if(Global.currentFilterLevel == "province"){
 
   var layer = e.target;
   var province_number = e.target.feature.properties.Province;
	
  layer.setStyle({
    weight: 2,   
  });
  
  layer.bindPopup("Province "+province_number+" : "+e.target.feature.properties.PR_NAME).openPopup();

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}
}


function resetHighlight(e) {
  // Global.provinceGeoJson.resetStyle(e.target);
}

//---District Map

function highlightDistrictFeature(e) {
 if(Global.currentFilterLevel == "district"){
  var layer = e.target;
 	
  layer.setStyle({
    weight: 2,   
  });
  
  layer.bindPopup("District :"+e.target.feature.properties.DISTRICT).openPopup();

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
 }
  
}

function resetDistrictHighlight(e) {
  e.target.setStyle({
    weight: 0.3,   
  });
}

//---Municipality Map

//--- Just PopUp on selected district ---//

// function highlightMunicipalityFeature(e) {
//   if (regionFilter(e.target.feature.properties.F_ID)) {
//     var layer = e.target;
 	
//     layer.setStyle({
//       weight: 2,   
//     });

//     var text = getDistrictPopUpDiv('', e.target.feature);

//     console.log(text);

//     if (text.trim() !== "") {
//       var popup = L.popup().setContent(text);
//       layer.bindPopup(popup).openPopup();
//     }

//     // if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
//     //   layer.bringToFront();
//     // }
//   }
// }

function highlightMunicipalityFeature(e) {
  if(regionFilter(e.target.feature.properties.F_ID)){
     var layer = e.target;
    
     layer.setStyle({
       weight: 2,   
     });
 
     var text = "";
     
     if( Global.currentFilter)
       text = Popups[Global.currentFilter][Global.currentFilterLevel](e.target.feature);
     else
       text = e.target.feature.properties.NAME
       // Check if 'F_ID' is in 'DistrictsToInclude'
    if (DistrictsToInclude[e.target.feature.properties.F_ID]) {
      // console.log(DistrictsToInclude[e.target.feature.properties.F_ID]);
      $('#info_div').html(text);
      layer.bindPopup(text).openPopup();
    }
 
     // if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
     //   layer.bringToFront();
     // }
   }
}
 


function resetMunicipalityHighlight(e) {
  e.target.setStyle({
    weight: 0.3,   
  });
}

function sarlahi_fire(feature){
  var info = DataLayer.getHazardInfo(feature.properties.F_ID);
  return getDistrictPopUpDiv(info,feature); // You can also return an empty string '' if you prefer
}

function sarlahi_flood(feature){
  var info = DataLayer.getHazardInfoFlood(feature.properties.F_ID);
  // console.log(info);
  
  // // Check if 'info' is not null and 'F_ID' is in 'DistrictsToInclude'
  // if (DistrictsToInclude[feature.properties.F_ID]) {
  //   return getDistrictPopUpDiv(info, feature);
  // }
  // console.log(DistrictsToInclude[feature.properties.F_ID]);
  
  // // Return null function if the conditions are not met
  return getDistrictPopUpDiv(info, feature); // You can also return an empty string '' if you prefer
}


function dailekh_hazard(feature, f_id){
  var info = DataLayer.getHazardInfoDailekh(feature.properties.F_ID);
  return getDistrictPopUpDiv(info,feature);
}

function composite_adapcap(feature){
  var info = DataLayer.getCompositeInfoDailekh(feature.properties.F_ID);
  return getDistrictPopUpDiv(info,feature);
}
function composite_exposure(feature){
  var info = DataLayer.getCompositeInfoDailekh(feature.properties.F_ID);
  return getDistrictPopUpDiv(info,feature);
}
function composite_sensitivity(feature){
  var info = DataLayer.getCompositeInfoDailekh(feature.properties.F_ID);
  // console.log(feature);
  // if (DistrictsToInclude[feature.properties.F_ID]) {
  //   return getDistrictPopUpDiv(info, feature);
  // }
  
  // // Return null function if the conditions are not met
  return getDistrictPopUpDiv(info, feature);
}
function composite_hazard(feature){
  var info = DataLayer.getCompositeInfoDailekh(feature.properties.F_ID);
  return getDistrictPopUpDiv(info, feature);
}

function vulnerability_score(feature){
  var info = DataLayer.getCompositeInfoDailekh(feature.properties.F_ID);
  return getDistrictPopUpDiv(info, feature);
}
function risk_score(feature){
  var info = DataLayer.getCompositeInfoDailekh(feature.properties.F_ID);
  return getDistrictPopUpDiv(info, feature);
}

function component_indicator(feature){
  var info = DataLayer.getComponentInfo(feature.properties.F_ID);
  console.log(info);
  return getRawPopUpDiv(info, feature);
}


function getCandidatePopUpDiv(info, feature){
  var div = ""
  
  if(NationalParks[feature.properties.F_ID])
  {
    div += '<p style="font-size:18px">';
    div += NationalParks[feature.properties.F_ID];
    div += "</p>";
  }
  else{
    if(!info)
        div = "";
    else{
      data = {};
      data['body'] = info;
      data['header'] = DataLayer.getCandidateHeader(feature.properties.F_ID);
      div += Templates[Global.currentFilter](data);
    }
  }
  
  return div;
}


// function getDistrictPopUpDiv(info, feature, f_id) {
//     var div = "";
  
//   if (NationalParks[feature.properties.F_ID]) {
//     div += '<p style="font-size:18px">';
//     div += NationalParks[feature.properties.F_ID];
//     div += "</p>";
//     // div += totalValue;
    
//     // Return div only for required 'F_ID'
//     return div;
//   } else {
//     if (!info) {
//       div = "";
//     } else {
//       data = {};
//       data['header'] = DataLayer.getDistrictHeader(feature.properties.F_ID);
//       div += Templates[Global.currentFilter](data);
//     }
    
//     return div;
//   }
// }

function getDistrictPopUpDiv(info, feature) {
  var div = "";

if (NationalParks[feature.properties.F_ID]) {
  div += '<p style="font-size:18px">';
  div += NationalParks[feature.properties.F_ID];
  div += "</p>";
  // div += totalValue;
  
  // Return div only for required 'F_ID'
  // return div;
} else {
  if (!info) {
    div = "";
  } else {
    data = {};
    data['body'] = info;
    data['header'] = DataLayer.getDistrictHeader(feature.properties.F_ID);
    div += Templates[Global.currentFilter](data);
    // console.log(Templates[Global.currentFilter](data));
  }
  
  return div;
}
}

function getRawPopUpDiv(info, feature) {
  var div = "";

if (NationalParks[feature.properties.F_ID]) {
  div += '<p style="font-size:18px">';
  div += NationalParks[feature.properties.F_ID];
  div += "</p>";
  // div += totalValue;
  
  // Return div only for required 'F_ID'
  // return div;
} else {
  if (!info) {
    div = "";
  } else {
    data = {};
    data['body'] = info;
    data['header'] = DataLayer.getRawDataHeader(feature.properties.F_ID);
    div += Templates["component_indicator"](data);
    console.log(div);
  }
  
  return div;
}
}

function getNullPopUpDiv() {
  return '';
}
// function getDistrictPopUpDiv(info, feature) {
//   var div = "";
//   if (DistrictsToInclude[feature.properties.F_ID]) {
//     if (NationalParks[feature.properties.F_ID]) {
//       div += '<p style="font-size:18px">';
//       div += NationalParks[feature.properties.F_ID];
//       div += "</p>";
//       // div += totalValue;

//       // Return div only for required 'F_ID'
//       // return div;
//     } else {
//       data = {};
//       data['body'] = info;
//       data['header'] = DataLayer.getDistrictHeader(feature.properties.F_ID);
//       div += Templates[Global.currentFilter](data);
//     }
//   } else {
//     // For F_ID values not in allowedF_IDs, return an empty string
//     div = "";
//   }

//   return div;
// }



