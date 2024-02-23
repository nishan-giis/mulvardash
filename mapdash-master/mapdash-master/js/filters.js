//Legends keys must be same as filter keys

var Filters = {
    generalProvince: generalProvince,
    generalDistrict: generalDistrict,
    nullProvince: nullProvince,
    nullDistrict: nullDistrict,
    generalMunicipality: generalMunicipality,

    population: {
        province: province_population,
        // district: district_population,
        // municipality: municipality_population
    },
    density: {
        province: province_density,
        // district: district_density,
        // municipality: municipality_density
    },
    sarlahi_fire:{
        municipality: sarlahi_fire
    }, 
    sarlahi_flood:{
        municipality: sarlahi_flood
    },
    composite_adapcap:{
        municipality: composite_adapcap
    },
    composite_exposure:{
        municipality: composite_exposure
    },
    composite_sensitivity:{
        municipality: composite_sensitivity
    },
    composite_hazard:{
        municipality: composite_hazard
    },

    vulnerability_score:{
        municipality: vulnerability_score
    },
    risk_score:{
        municipality: risk_score
    },
    dailekh_hazard: {
        municipality: dailekh_hazard
    },
    dailekh_vulnerability: {
        municipality: dailekh_vulnerability
    },
    component_indicator: {
        municipality: component_indicator
    },
}



function none(feature)
{
    var color = NationalParks[feature.properties.F_ID] ? "#79d5ad" : "#ffffff00";
    var opacity = 0.8;
    
    if(NationalParks[feature.properties.F_ID]){
        color =  checkNationalPark(feature.properties.F_ID);
    }
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#333",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };
}

function generalProvince(feature)
{
    return {
    //   weight: 0.9,
      weight: 4,
      opacity: 1,
      color: "#3C0008",
      dashArray: "8",
      stroke: true,
      fillOpacity: 0,
      fillColor: "#fff"
    };
}

function nullProvince(feature)
{
    return {
      weight: 1,
      opacity: 1,
      color: "#33333300",
      dashArray: "1",
      fillOpacity: 1,
      fillColor: getProvinceColor(feature.properties.Province)
    };
}

function generalDistrict(feature)
{
    return {
        weight: 2,
        opacity: 0.8,
        color: "#333",
        dashArray: "3",
        fillOpacity: 0,
        // stroke: "#0a0a0a",
        fillColor: "getProvinceColor(feature.properties.Province)"
      };
}

function nullDistrict(feature)
{
    return {
        weight: 20,
        opacity: 1,
        color: "#33333300",
        dashArray: "5",
        fillOpacity: 1,
        fillColor: "#00000000"
      };
}


function generalMunicipality(feature)
{
    return {
        weight: 5,
        opacity: 1,
        color: "#000",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: "#00000000"
      };
}
function getProvinceColor(Province) {
    return "#ffffff";
}

function province_population(feature) {
    var Province_population= provincePopulation[feature.properties.Province-1][1];
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#333",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: getProvinceColor_population(Province_population)
    };
}

function getProvinceColor_population(Province_population) {
    return Province_population > 6000000 ? '#08519c' :
		   Province_population > 5000000 ? '#2166ac' :
           Province_population > 4000000 ? '#4393c3' :
           Province_population > 3000000 ? '#92c5de' :
		   Province_population > 2000000 ? '#d1e5f0' :
                     '#eff3ff';
}

function municipality_population(feature){

}

function province_density(feature) {
    return {
      weight: 0.5,
      opacity: opacity,
      color: "#333",
      dashArray: "1",
      fillOpacity: 1,
      fillColor: getProvinceColor_popDensity(provincePopulation[feature.properties.Province-1][2])
    };
}
  
function getProvinceColor_popDensity(Province_popDensity) {
    return Province_popDensity > 500 ? '#08519c' :
            Province_popDensity > 400 ? '#2166ac' :
            Province_popDensity > 300 ? '#4393c3' :
            Province_popDensity > 200 ? '#92c5de' :
            Province_popDensity > 100 ? '#d1e5f0' :
                    '#eff3ff';
}

function voters_count(feature){
    var color = NationalParks[feature.properties.F_ID] ? "#79d5ad" : (palikaFilter(feature.properties.F_ID) ? DataLayer.getVoterCountColor(feature.properties.F_ID) : "#ffffff00");
    var opacity = 0.8
    if(!regionFilter(feature.properties.F_ID))
    {
        color="#ffffff00";
        opacity = 0.3
    } 
    if(!Global.currentLegendKeys.includes(color.replace(/^\s+|\s+$/g,"").replace("#","")))
        color = "#ffffff00";
    if(NationalParks[feature.properties.F_ID]){
        color =  checkNationalPark(feature.properties.F_ID);
    }
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#333",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };

}

function mayor_name(feature){
    var color = NationalParks[feature.properties.F_ID] ? "#79d5ad" : (palikaFilter(feature.properties.F_ID) ? DataLayer.getMayorNameColor(feature.properties.F_ID) : "#ffffff00");
    if(!regionFilter(feature.properties.F_ID))
        color="#ffffff00";
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#333",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };
}



function sarlahi_fire(feature){
    var color = NationalParks[feature.properties.F_ID] ? "#79d5ad" : (palikaFilter(feature.properties.F_ID) ? DataLayer.getHazardRangeColor(feature.properties.F_ID) : "#ffffff00");
    var opacity = 0.8
    if(!regionFilter(feature.properties.F_ID))
    {
        color="#ffffff00";
        opacity = 0.3
    } 
    if (!Array.isArray(Global.currentLegendKeys) || (typeof color === "string" && color.trim() !== "" && color.includes("#") && !Global.currentLegendKeys.includes(color.replace(/^\s+|\s+$/g, "").replace("#", "")))){
        color = "#ffffff00";
    }
    
      
    // if(NationalParks[feature.properties.F_ID]){
    //     color =  checkNationalPark(feature.properties.F_ID);
    // }
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#fff",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };
}

function sarlahi_flood(feature){
    var color = NationalParks[feature.properties.F_ID] ? "#79d5ad" : (palikaFilter(feature.properties.F_ID) ? DataLayer.getHazardRangeColorFlood(feature.properties.F_ID) : "#ffffff00");
    var opacity = 0.8
    if(!regionFilter(feature.properties.F_ID))
    {
        color="#ffffff00";
        opacity = 0.3
    } 
    if (!Array.isArray(Global.currentLegendKeys) || (typeof color === "string" && color.trim() !== "" && color.includes("#") && !Global.currentLegendKeys.includes(color.replace(/^\s+|\s+$/g, "").replace("#", "")))){
        color = "#ffffff00";
    }
    
      
    // if(NationalParks[feature.properties.F_ID]){
    //     color =  checkNationalPark(feature.properties.F_ID);
    // }
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#fff",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };
}

function dailekh_hazard(feature){
    var color = NationalParks[feature.properties.F_ID] ? "#79d5ad" : (palikaFilter(feature.properties.F_ID) ? DataLayer.getHazardRangeColorDailekh(feature.properties.F_ID) : "#ffffff00");
    var opacity = 0.8
    if(!regionFilter(feature.properties.F_ID))
    {
        color="#ffffff00";
        opacity = 0.3
    } 
    if (!Array.isArray(Global.currentLegendKeys) || (typeof color === "string" && color.trim() !== "" && color.includes("#") && !Global.currentLegendKeys.includes(color.replace(/^\s+|\s+$/g, "").replace("#", "")))){
        color = "#ffffff00";
    }
    
      
    // if(NationalParks[feature.properties.F_ID]){
    //     color =  checkNationalPark(feature.properties.F_ID);
    // }
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#fff",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };
}

function dailekh_vulnerability(feature){
    var color = NationalParks[feature.properties.F_ID] ? "#79d5ad" : (palikaFilter(feature.properties.F_ID) ? DataLayer.getHazardRangeColorDailekh(feature.properties.F_ID) : "#ffffff00");
    var opacity = 0.8
    if(!regionFilter(feature.properties.F_ID))
    {
        color="#ffffff00";
        opacity = 0.3
    } 
    if (!Array.isArray(Global.currentLegendKeys) || (typeof color === "string" && color.trim() !== "" && color.includes("#") && !Global.currentLegendKeys.includes(color.replace(/^\s+|\s+$/g, "").replace("#", "")))){
        color = "#ffffff00";
    }
    
      
    // if(NationalParks[feature.properties.F_ID]){
    //     color =  checkNationalPark(feature.properties.F_ID);
    // }
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#fff",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };
}

function composite_feature(feature, featureType) {
    var color = NationalParks[feature.properties.F_ID] ? "#79d5ad" : (palikaFilter(feature.properties.F_ID) ? DataLayer.getCompositeColorDailekh(feature.properties.F_ID) : "#ffffff00");
    var opacity = 0.8;

    if (!regionFilter(feature.properties.F_ID)) {
        color = "#ffffff00";
        opacity = 0.3;
    }

    if (!Array.isArray(Global.currentLegendKeys) || (typeof color === "string" && color.trim() !== "" && color.includes("#") && !Global.currentLegendKeys.includes(color.replace(/^\s+|\s+$/g, "").replace("#", "")))) {
        color = "#ffffff00";
    }

    // Uncomment this section if needed
    // if (NationalParks[feature.properties.F_ID]) {
    //     color = checkNationalPark(feature.properties.F_ID);
    // }

    return {
        weight: 0.5,
        opacity: opacity,
        color: "#000",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };
}

// Usage examples for each feature type
function composite_adapcap(feature) {
    return composite_feature(feature, "adapcap");
}

function composite_exposure(feature) {
    return composite_feature(feature, "exposure");
}

function composite_sensitivity(feature) {
    return composite_feature(feature, "sensitivity");
}

function composite_hazard(feature) {
    return composite_feature(feature, "hazard");
}

function vulnerability_score(feature) {
    return composite_feature(feature, "vulnerability");
}
function risk_score(feature) {
    return comp_feature(feature, "sensitivity");
}

function comp_feature(feature){
    var color = NationalParks[feature.properties.F_ID] ? "#79d5ad" : (palikaFilter(feature.properties.F_ID) ? DataLayer.getCompositeColor(feature.properties.F_ID) : "#ffffff00");
    var opacity = 0.8;

    if (!regionFilter(feature.properties.F_ID)) {
        color = "#ffffff00";
        opacity = 0.3;
    }

    if (!Array.isArray(Global.currentLegendKeys) || (typeof color === "string" && color.trim() !== "" && color.includes("#") && !Global.currentLegendKeys.includes(color.replace(/^\s+|\s+$/g, "").replace("#", "")))) {
        color = "#ffffff00";
    }

    // Uncomment this section if needed
    // if (NationalParks[feature.properties.F_ID]) {
    //     color = checkNationalPark(feature.properties.F_ID);
    // }

    return {
        weight: 0.3,
        opacity: opacity,
        color: "#000",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };
}



function component_feature(feature){
    var color = NationalParks[feature.properties.F_ID] ? "#79d5ad" : (palikaFilter(feature.properties.F_ID) ? DataLayer.getComponentColor(feature.properties.F_ID) : "#ffffff00");
    var opacity = 0.8;

    if (!regionFilter(feature.properties.F_ID)) {
        color = "#ffffff00";
        opacity = 0.3;
    }

    if (!Array.isArray(Global.currentLegendKeys) || (typeof color === "string" && color.trim() !== "" && color.includes("#") && !Global.currentLegendKeys.includes(color.replace(/^\s+|\s+$/g, "").replace("#", "")))) {
        color = "#ffffff00";
    }

    // Uncomment this section if needed
    // if (NationalParks[feature.properties.F_ID]) {
    //     color = checkNationalPark(feature.properties.F_ID);
    // }

    return {
        weight: 0.3,
        opacity: opacity,
        color: "#000",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };
}

function component_indicator(feature) {
    return component_feature(feature, "exposure");
}

// function component_indicator(feature){
//     // alert('hello');
//     console.error(feature);
//     // console.log(DataLayer.getComponentColor(feature.properties.F_ID));
//     var color = NationalParks[feature.properties.F_ID] ? "#79d5ad" : (palikaFilter(feature.properties.F_ID) ? DataLayer.getComponentColor(feature.properties.F_ID) : "#ffffff00");
//     var opacity = 0.8
//     if(!regionFilter(feature.properties.F_ID))
//     {
//         color="#ffffff00";
//         opacity = 0.3
//     } 
//     if (!Array.isArray(Global.currentLegendKeys) || (typeof color === "string" && color.trim() !== "" && color.includes("#") && !Global.currentLegendKeys.includes(color.replace(/^\s+|\s+$/g, "").replace("#", "")))){
//         color = "#ffffff00";
//     }
    
//     //  console.log(selectedIndicator); 
//     // if(NationalParks[feature.properties.F_ID]){
//     //     color =  checkNationalPark(feature.properties.F_ID);
//     // }
//     return {
//         weight: 0.5,
//         opacity: opacity,
//         color: "#fff",
//         dashArray: "1",
//         fillOpacity: 1,
//         fillColor: color
//     };
// }


// async function getCSVHeaders(csvUrl) {
//     try {
//         const response = await fetch(csvUrl);
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const csvText = await response.text();
//         const lines = csvText.split('\n');
//         const headers = lines[0].split(',');

//         return headers;
//     } catch (error) {
//         console.error('Error fetching or parsing CSV:', error);
//         return null;
//     }
// }

// // Usage example:
// const csvUrl = 'adcapDilekh_Norm.csv'; // Replace with your CSV file URL
// const csvHeaders = await getCSVHeaders(csvUrl);

// if (csvHeaders) {
//     console.log('CSV Headers:', csvHeaders);
// } else {
//     console.log('Failed to retrieve CSV headers.');
// }



function palikaFilter(fid){
    var palika = DataLayer.getPalikaFromFid(fid);
    if(palika == "Nagarpalika" || palika == "Mahanagarpalika" || palika == "Upamahanagarpalika" || palika == "maha Nagarpalika"){
        if(Global.currentPalikaSelect=="Nagarpalika")
            return true;
    }
    if(palika == "Gaunpalika" || palika == "gaupaika" )
        if(Global.currentPalikaSelect == "Gaunpalika")
            return true;
    if(Global.currentPalikaSelect == "All")
        return true;
    return false;
}

function checkNationalPark(fid){
    var color = "#79d5ad"
    if(Global.districtSelected )
    {
        // console.log(NationalParksDistrict[fid],NationalParksDistrict[fid].toString().substring(1,2), Global.districtSelected)
        if(parseInt(NationalParksDistrict[fid]) == parseInt(Global.districtSelected) )
            color = "#79d5ad";
        else
            color = "#ffffff00"
    }
    else if(Global.provinceSelected){
        if(parseInt(NationalParksProvince[fid]) == parseInt(Global.provinceSelected) )
            color = "#79d5ad";
        else
            color = "#ffffff00"
    }
    else{
        color = "#79d5ad"
    }
    return color;
}