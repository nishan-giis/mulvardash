// This file consists of all the initializations,
// init() method is called at the beginning.
init();
async function init() {
  initMap();
  await initGeoJsons();
  await initData();
  $("#map").removeAttr("hidden");
  $("#loading").hide();

  mode = getUrlParameter("mode");
  if (mode) Global.mode = mode;
  Global.currentLayers = [
    {
      geoJson: Global.provinceGeoJson,
      style: null,
      id: "province",
    },
    {
      geoJson: Global.districtGeoJson,
      style: null,
      id: "district",
    },
    // {
    //     geoJson: await getGlobalMunicipalityGeoJson(),
    //     style: Filters.generalMunicipality,
    //     id:"municipality"
    // },
    {
      geoJson: Global.municipalityGeoJson,
      style: null,
      id: "municipality",
    },
  ];

  // Set default values for province and district dropdowns
  $('#provinceSelect').val("6").trigger('change'); // Karnali province
  setDistrictDropdown("6"); // Set districts for Karnali province
  $('#districtSelect').val("606").trigger('change'); // Dailekh district

  highlightSelect();
  // Global.map.on('click', onMapClick);
  await resetMap();
  await resetGeoJsons();
  await initMode();

  await renderMap();
  $(".leaflet-control-attribution.leaflet-control").hide();

  await resetToKTM();
  console.log(Global.currentLayers);
}

function initMap() {
  Global.map = L.map("map", MapOptions);
}

async function initGeoJsons() {
  
  await $.getJSON("NepalGeoJSONFiles/newdistricts.json", function (data) {
    GeoJsons.district = data;
    Global.districtGeoJson = L.geoJson(data, {
      onEachFeature: onEachDistrictFeature,
      style: function (feature) {
        return { color: "#000", weight: 1, fillOpacity: 0 };
      },
    });
    // Global.allDistrictGeoJson=L.geoJson( data, {
    //     onEachFeature: onEachDistrictFeature,
    //         style: function(feature){
    //             return { color: '#666', weight: 0.3,  fillOpacity: 0 };
    //         },
    //     });
    Global.Districts = addDistrictToMap(data, Global.map);
    addDistrictToSelect(data);
    // console.log(data)
  });

  // await $.getJSON("NepalGeoJSONFiles/newdistricts.json", function (data) {
  //   GeoJsons.district = data;
  //   Global.Districts = addDistrictToMap(data, Global.map);
  //   addDistrictToSelect(data);

  // });


  await $.getJSON("NepalGeoJSONFiles/newmunicipalities.json", function (data) {
    GeoJsons.municipality = data;
    Global.municipalityGeoJson = L.geoJson(data, {
      onEachFeature: onEachMunicipalityFeature,
      style: function (feature) {
        return { bordercolor: "#2296bd", weight: 0.3, fillOpacity: 0 };
      },
    }).addTo(map);
    Global.allMunicipalityGeoJson = L.geoJson(data, {
      onEachFeature: onEachMunicipalityFeature,
      style: function (feature) {
        return { color: "#2296bd", weight: 0.3, fillOpacity: 0 };
      },
    });
    // Focus on 'dailkeh.geojson' layer
    // Global.municipalityGeoJson.eachLayer(function (layer) {
    //   if (layer.feature.properties.name === "Dailkeh") {
    //     layer.bringToFront();
    //   }
    // });
  });
  await $.getJSON("NepalGeoJSONFiles/newprovince.json", function (data) {
    // console.log(data)
    GeoJsons.province = data;
    Global.Provinces = addProvinceToMap(data, Global.map);
    addProvinceToSelect(data);
  });

  // await $.getJSON("NepalGeoJSONFiles/Dailekh.geojson", function (data) {
  //   GeoJsons.dailekh = data; 
  //   // console.log(GeoJsons.dailkeh);
  //   Global.Dailekh = addDailekhToMap(data, Global.map);
  // });
}

async function initData() {

  await $.getJSON("json/fire.json", function (data) {
    data.forEach(function (d) {
      Data.Hazard[d.LCode] = d;
      // console.log(Data.Hazard[d.LCode]);
    });
  });

  await $.ajax("csv/MunicipalityName.csv", {
    success: function(data) {
        data = $.csv.toObjects(data);
       data.forEach(function(d){
            Data.MunicipalityNames[d.Lcode] = d;
        // console.log(Data.MunicipaltyNames[d.Lcode]);
        });
    },
    error: function() {
        alert("error")
    }
  }); 

  await $.ajax("csv/ProvinceName.csv", {
    success: function(data) {
        data = $.csv.toObjects(data);
       data.forEach(function(d){
            Data.ProvinceNames[d.Lcode] = d;
        // console.log(Data.MunicipaltyNames[d.Lcode]);
        });
    },
    error: function() {
        alert("error")
    }
  }); 

  await $.ajax("csv/fire.csv", {
    success: function (data) {
      data = $.csv.toObjects(data);
      const headerRow = Object.keys(data[0]);

        // Store the header row in a variable or use it as needed
        // console.log('CSV Header:', headerRow);

      data.forEach(function (d) {
        Data.Hazard[d.LCode] = d;
      });
    },
    error: function () {
      alert("error");
    },
  });

  await $.ajax("csv/Flood.csv", {
    success: function (data) {
      data = $.csv.toObjects(data);
      const headerRow = Object.keys(data[0]);

        // Store the header row in a variable or use it as needed
        // console.log('CSV Header:', headerRow);

      data.forEach(function (d) {
        Data.HazardFlood[d.LCode] = d;
      });
    },
    error: function () {
      alert("error");
    },
  });

  // await $.ajax("csv/adcapDailkeh_Norm.csv", {
  //   success: function (data) {
  //     data = $.csv.toObjects(data);
  //     data.forEach(function (d) {
  //       Data.Indicator[d.LCode] = d;
  //     });
  //   },
  //   error: function () {
  //     alert("error");
  //   },
  // });

  await $.ajax("csv/hazardDailekh.csv", {
    success: function (data) {
      data = $.csv.toObjects(data);
      const value = data[0];
      // console.log('Value:', value);
      // // console.log('Value', value['Percentage of absentee population']);
      Data.hazardDailekh = value['Percentage of absentee population'];
      data.forEach(function (d) {
        Data.hazardDailekh[d.LCode] = d;
      });
    },
    error: function () {
      alert("error");
    },
  });

  // await $.ajax("csv/compositeDailekh.csv", {
  //   success: function (data) {
  //     data = $.csv.toObjects(data);
  //     const header = Object.keys(data[0]);
  //     // console.log(header);
  //     Data.compositeHeader = header;
  //     // // console.log(Data.compositeHeader);
        
  //     data.forEach(function (d) {
  //       Data.compositeDailekh[d.LCode] = d;
  //     });
  //   },
  //   error: function () {
  //     alert("error");
  //   },
  // });

  // await $.ajax("csv/Flood.csv", {
  //   success: function (data) {
  //     data = $.csv.toObjects(data);
  //     data.forEach(function (d) {
  //       Data.Hazard[d.lcode] = d;
  //     });
  //   }
  // });

  await $.getJSON("json/composite.json",function(data){
    data.forEach(function(d){
        Data.compositeDailekh[d.LCode] = d;
        // console.log(Data.compositeDailekh[d.LCode]);
    });
});

// await $.getJSON("json/data.json", function (data) {
//   data.forEach(function (d) {
//     Data.rawData[d.LCode] = d;
//     // console.log(Data.rawData[d.LCode]);
//   });
// });

  
  await $.getJSON("json/allraw.json", function (data) {
    data.forEach(function (d) {
      Data.rawData[d.LCode] = d;
      // console.log(Data.rawData[d.LCode]);
    });
  });

  await $.getJSON("json/fidcodemapnew.json", function (data) {
    data.forEach(function (d) {
      Data.fidCodeMap[d.F_ID] = d.Lcode;
      // // console.log(Data.fidCodeMap[d.F_ID]);
    });
  });

  await $.getJSON("json/fidcodedistrict.json", function (data) {
    data.forEach(function (d) {
      Data.fidCodeDistrict[d.fid] = d.Lcode;
    });
  });

  await $.getJSON("json/fidcodemunicipality.json", function (data) {
    data.forEach(function (d) {
      Data.fidCodeMunicipality[d.F_ID] = d.Lcode;
    });
  });

  await $.getJSON("json/objectidcodeprovince.json", function (data) {
    data.forEach(function (d) {
      Data.objectidCodeProvince[d.OBJECTID] = d.Lcode;
    });
  });

  await $.getJSON("json/districtnepaliname.json", function (data) {
    data.forEach(function (d) {
      Data.districtNepaliName[d.Lcode] = d.D_np;
    });
  });

  /*--  replace district nepali name D_np with D_en  --*/
  await $.getJSON("json/districtnepaliname.json", function (data) {
    data.forEach(function (d) {
      Data.districtNepaliName[d.Lcode] = d.D_en;
    });
  });

  // await $.ajax("csv/lcodemap.csv", {
  //   success: function (data) {
  //     data = $.csv.toObjects(data);
  //     data.forEach(function (d) {
  //       Data.Municipalities[d.lcode] = d.municipality;
  //       // console.log(Data.Municipalities[d.lcode]);
  //     });
  //   },
  //   error: function () {
  //     alert("error");
  //   },
  // });

  await $.ajax("csv/lcodemapMunicipal.csv", {
    success: function (data) {
      data = $.csv.toObjects(data);
      data.forEach(function (d) {
        Data.Municipalities[d.lcode] = d.municipality;
        // console.log(Data.Municipalities[d.lcode]);
      });
    },
    error: function () {
      alert("error");
    },
  });

  await $.ajax("csv/compositeDailekh.csv", {
    success: function(data) {
       Data.Composites = Data.Composites.concat($.csv.toObjects(data));
      //  console.log(Data.Composites);
    },
    error: function() {
        alert("error")
    }
  });

  await $.ajax("csv/rawData.csv", {
    success: function(data) {
       Data.Raw = Data.Raw.concat($.csv.toObjects(data));
       console.log(Data.Raw);
    },
    error: function() {
        alert("error")
    }
  });


}

function addProvinceToMap(data, map) {
  Global.provinceGeoJson = L.geoJson(data, {
    style: {
      //   weight: 0.9,
        width: 10,
        opacity: 1,
        color: "#000",
        dasharray: "1",
        fillOpacity: 0,
        fillColor: "#000"
      },
    onEachFeature: onEachProvinceFeature,
  });
  var provinces = [];
  data.features.forEach((element) => {
    var d = {
      id: element.properties.Province,
      data: L.geoJson(data, {
        style: null,
        filter: function (feature, layer) {
          return feature.properties.Province == element.properties.Province;
        },
      }),
      
    };
    provinces.push(d);
  });
  return provinces;
}

// function addDailekhToMap(data, map) {
//   // console.log(data);
//   Global.dailekhGeoJson = L.geoJson(data, {
//     style: Filters.generalProvince,
//     onEachFeature: onEachDailekhFeature,
//   });
//   var dailekh = [];
//   data.feature.forEach((element) => {
//     var d = {
//       id: element.properties.district_id,
//       data: L.geoJson(data, {
//         style: null,
//         filter: function (feature, layer) {
//           return feature.properties.district_id == element.properties.district_id;
//         },
//       }),
      
//     };
//     dailekh.push(d);
//   });
//   return dailekh;
// }

function addProvinceToSelect(data) {
  data.features.forEach((element) => {
    var province_name = element.properties.PR_NAME;
    // console.log(element.properties.PR_NAME);
    var province_id = element.properties.Province;

    // console.log(province_id);
    // var option = '<option value="'+element.properties.PR_NAME+'" >'+element.properties.PR_NAME+'</option>';
    // $('#provinceSelect').append(option);

    if (province_id === 2 || province_id === 6) {
    $("#provinceSelect").append(
      $("<option>", {
        value: province_id,
        text: ProvinceNepaliName[province_id],
      })
    );
    }
  });
}

// function addDailekhToSelect(data) {
//   data.features.forEach((element) => {
//     var district_name = element.properties.GaPa_NaPa;
//     // console.log(element.properties.GaPa_NaPa);
//     var dailekh_id = element.properties.district_id;

//     // var option = '<option value="'+element.properties.PR_NAME+'" >'+element.properties.PR_NAME+'</option>';
//     // $('#provinceSelect').append(option);
//     $("#dailekhSelect").append(
//       $("<option>", {
//         value: dailekh_id,
//         text: ProvinceNepaliName[province_id],
//       })
//     );
//   });
// }

function addComponentToSelect(data) {
  
}

function addDistrictToMap(data, map) {
  Global.districtGeoJson = L.geoJson(data, {
    onEachFeature: onEachDistrictFeature,
    style: function (feature) {
      return { color: "#00000000", weight: 0.3, fillOpacity: 0 };
    },
  }).addTo(map);
  map.fitBounds(Global.districtGeoJson.getBounds());
  var districts = [];
  data.features.forEach((element) => {
    var d = {
      id: element.properties.fid,
      data: L.geoJson(data, {
        style: null,
        filter: function (feature, layer) {
          return feature.properties.fid == element.properties.fid;
        },
      }),
    };
    districts.push(d);
  });
  return districts;
}

/*-- Works for only two districts --*/
function addDistrictToSelect(data) {
  data.features.forEach((element) => {
    var district = element.properties.DISTRICT;
    var district_id = element.properties.fid;
    // console.log(district)
    // var option = '<option value="'+element.properties.PR_NAME+'" >'+element.properties.PR_NAME+'</option>';
    // $('#provinceSelect').append(option);
    
    if(district_id === 14 || district_id === 66) {
    $("#districtSelect").append(
      $("<option>", {
        value: district_id,
        text: district,
      })
    );
  }
  });
}

/*-- // Works for all districts
function addDistrictToSelect(data) {
  data.features.forEach((element) => {
    var district = element.properties.DISTRICT;
    var district_id = element.properties.fid;
    // console.log(district)
    // var option = '<option value="'+element.properties.PR_NAME+'" >'+element.properties.PR_NAME+'</option>';
    // $('#provinceSelect').append(option);
    
    $("#districtSelect").append(
      $("<option>", {
        value: district_id,
        text: district,
      })
    );
  });
} --*/

function addMunicipalitiesToMap(data, map) {
  Global.municipalityGeoJson = L.geoJson(data, {
    onEachFeature: onEachMunicipalitiesFeature,
    style: function (feature) {
      return { color: "#9c4228", weight: 0.3, fillOpacity: 0 };
    },
  }).addTo(map);
  map.fitBounds(Global.municipalityGeoJson.getBounds());
  var municipalities = [];
  data.features.forEach((element) => {
    var d = {
      id: element.id,
      data: L.geoJson(data, {
        style: Filters.generalProvince,
        filter: function (feature, layer) {
          return feature.id == element.id;
        },
      }),
    };
    districts.push(d);
  });
  return districts;
}

function onEachProvinceFeature(feature, layer) {
  if (Global.currentFilterLevel == "province")
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToProvince,
    });
}

function onEachDistrictFeature(feature, layer) {
  if (Global.currentFilterLevel == "district")
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToDistrict,
    });
}

function onEachMunicipalityFeature(feature, layer) {
  if (Global.currentFilterLevel == "municipality")
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToProvince,
    });
}

function onEachDailekhFeature(feature, layer) {
  if (Global.currentFilterLevel == "dailekh")
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToProvince,
    });
}

function onMapClick(e) {
  // alert("hello");
  //     Global.popup.setContent("You clicked me " )
  //         .openOn(Global.map);
}

function zoomToProvince(e) {
  province_number = e.target.feature.properties.Province;
  console.log(e.target.feature.properties.Province)
  map.fitBounds(e.target.getBounds());
}

function zoomToDistrict(e) {
  district_number = e.target.feature.properties.fid;
  console.log(e.target.feature.properties.fid)
  map.fitBounds(e.target.getBounds());
}

function resetToKTM() {
  console.log(Global.currentLayers);
  Global.currentLayers[2].geoJson.eachLayer(function (layer) {
    // Mimick event object because highlightFeature and resetHighlight
    // expect an object with the layer as target property
    layer = { target: layer };

    if (layer.target.feature.properties.F_ID == 295)
      highlightMunicipalityFeature(layer);

    // Up the delay amount
  });
}

function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
}

function initMode() {
  $("." + Global.mode + "_mode").show();
  if (Global.mode == "region") {
    Global.currentFilter = "risk_score";
    applyMapfilter("risk_score");

  }

  if (Global.mode == "demographics") {
    Global.currentFilter = "mayor_gender";
    applyMapfilter("mayor_age");
  }
}
