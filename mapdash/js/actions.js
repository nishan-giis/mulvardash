$(document).ready(function()
{
    $('#provinceSelect').on('change', function(e) {
        // console.log(Global.currentLayers)
        // Global.districtSelected = null;
        if(e.target.value!="All"){
            focusProvince(e, e.target.value);
            // console.log(e);
            setDistrictDropdown(e.target.value);
        }else{
            focusCountry();
            $('#provinceSelect').val("");
            $('#districtSelect').empty();
            $("#districtSelect").append(new Option("District",""));

        }

    });
    $('#districtSelect').on('change', function(e) {
        if(e.target.value!="All"){
            focusDistrict(e, e.target.value);
            // console.log(e);
        }
        else{
            Global.districtSelected = null;
            focusProvince(e, Global.provinceSelected);
            setDistrictDropdown(Global.provinceSelected);

        }
    });

    $('#mainDropdown').on('change',function(e){
        Global.currentBubble = "none";
        Global.currentFilter=e.target.value;
        console.log(Global.currentFilter);
        console.warn(Global.currentFilter)
            // populateSecondDropdown(); 
    });
    
    $('#secondDropdown').on('change',function(e){
        Global.currentBubble = "none";
        Global.currentFilter="component_indicator";
        console.log(Global.currentFilter);
        applyMapfilter(Global.currentFilter);
        // console.warn(Global.currentFilter)
    });
    // $('#dailekhSelect').on('change', function(e) {
    //     alert("hello");
    // });

    $('#palikaSelect').on('change', function(e) {
        resetMap();
        if(Global.currentFilter == "mayor_margin" || Global.currentFilter == "vice_mayor_margin"){
            Global.currentBubble = Global.currentFilter;
        }
        else{
            Global.currentBubble = "none";
        }
        applyMapfilterLayer(Global.currentFilter);
        Global.currentPalikaSelect = e.target.value;
        // focusDistrict(e, e.target.value);
        renderMap();
    });
    // $('#mayor_filter').on('change',function(e){
    //     applyMapfilter(e.target.value);
    // });
    // $('#vice_mayor_filter').on('change',function(e){
    //     applyMapfilter(e.target.value);
    // });
    $('#mayor_select_old').on('change',function(e){
        Global.currentFilter=$('#mayor_select_old').val()+"_"+$('#mode_'+Global.mode+'_toggler>li.active').attr("filter");
        if(Global.currentFilter == "mayor_margin" || Global.currentFilter == "vice_mayor_margin"){
            Global.currentBubble = Global.currentFilter;
        }
        else{
            Global.currentBubble = "none";
        }
        applyMapfilter(Global.currentFilter);
    });

    $('.btn_filter_select').click(function(){
        // var mySVG = document.getElementByClassName('leaflet-zoom-animated');
        // alert(mySVG);
        // alert($(this).val())
        applyMapfilter($(this).val());
        
    // mySVG.setAttribute("scale", "1.5");
    // mySVG.setAttribute("viewBox", "0 0 100 100");
    });

  
    $('#filter_select_1').on('change',function(e){
        Global.currentFilter=$('#mayor_select_old').val()+"_"+$('#filter_select_1').val()
        if(Global.currentFilter == "mayor_margin" || Global.currentFilter == "vice_mayor_margin"){
            Global.currentBubble = Global.currentFilter;
        }
        else{
            Global.currentBubble = "none";
        }     

        applyMapfilter(Global.currentFilter);
    });

    // $('#c_mayor_select').on('change',function(e){
    //     Global.currentFilter=$('#c_mayor_select').val()+"_"+$('#c_filter_select_1').val()
    //     applyMapfilter(Global.currentFilter);
    // });
    // $('#c_filter_select_1').on('change',function(e){
    //     Global.currentFilter=$('#c_mayor_select').val()+"_"+$('#c_filter_select_1').val()
    //     applyMapfilter(Global.currentFilter);
    // });


    $('#filter_select_2').click(function(){
        Global.currentFilter=$('#filter_select_2').val();
        Global.currentBubble = "none";

        applyMapfilter(Global.currentFilter);
    })

    $('#composite_filter').on('change',function(e){
        Global.currentBubble = "none";
        Global.currentFilter=e.target.value;
        applyMapfilter(Global.currentFilter);
    });

    $('#composite_filter_2').on('change',function(e){
        Global.currentBubble = "none";
        Global.currentFilter=e.target.value;
        applyMapfilter(Global.currentFilter);
    });

    $('#lead_mayor_select').on('change',function(e){
        Global.currentFilter=e.target.value;
        Global.currentBubble = "none";
        applyMapfilter(Global.currentFilter);
    })

    $('#reset').on('click',function(){
        $('#mayor_select').val("mayor");
        $('#filter_select_1').val("party");

        $('#c_mayor_select').val("c_mayor");
        $('#c_filter_select_1').val("candidate");
        $('#provinceSelect').val("");
        $('#districtSelect').val("");
        // $('#districtSelect').empty();
        // $("#districtSelect").append(new Option("District",""));
        $('#palikaSelect').val("");
        $('composite_filter').val("");
        $('mainDropdown').val("");


        Global.districtSelected = null;
        Global.provinceSelected = null;
        Global.optionSelected = null;
        Global.currentBubble = "none";

        Global.currentPalikaSelect = "All";
        if (Global.currentFilter== "mayor_party"){
            resetGeoJsons();
        }else if(Global.currentFilter== "mayor_age"){
            resetGeoJsons();
        }else if(Global.currentFilter== "mayor_margin"){
            resetGeoJsons();
        }else
        // Global.currentFilter= "mayor_party";
        resetGeoJsons();
        Global.boundLevel = "Country"
        applyMapfilter(Global.currentFilter);
    });
    $('.test').click(function(){
        console.log("ASD")
    })
    $('.summaryTitle').click(function(){
       if($('.accicon').hasClass('rotated')){
            $('.accicon').removeClass('rotated')
       } 
       else{
            $('.accicon').addClass('rotated')
       }
    })
});

function toggled(filter){
    console.log(filter);
    Global.currentFilter = $('#mayor_select_old').val() + "_" + filter;
    if(Global.currentFilter == "mayor_margin" || Global.currentFilter == "vice_mayor_margin"){
        Global.currentBubble = Global.currentFilter;
    }
    else{
        Global.currentBubble = "none";
    }
    applyMapfilter(Global.currentFilter);

}

async function applyMapfilter(filter){
    // removeAllLayer();   
    // $('#map').attr("hidden", true);
    // $("#loading").show();
    resetMap();
    Global.map.closePopup();

    Global.currentFilter = filter;
    var lastLayer = Global.currentLayers[Global.currentLayers.length - 1];
    // console.warn(filter);
    Global.currentLayers[Global.currentLayers.length - 1].style = Filters[filter][lastLayer.id];
    Global.currentFilterLegend =  Legends[filter];
    // Global.currentLayers[0].style = Filters[filter]["province"];
    Global.currentFilterLevel = lastLayer.id;
    resetToKTM();

    renderMap();
    // $('#map').removeAttr("hidden");
    // $("#loading").hide();
}

async function applyMapfilterLayer(filter){
    Global.map.closePopup();

    Global.currentFilter = filter;
    var lastLayer = Global.currentLayers[Global.currentLayers.length - 1];
    
    Global.currentLayers[Global.currentLayers.length - 1].style = Filters[filter][lastLayer.id];
    Global.currentFilterLegend =  Legends[filter];
    // Global.currentLayers[0].style = Filters[filter]["province"];
    Global.currentFilterLevel = lastLayer.id;
    resetToKTM();
    renderLayer();

}

function resetGeoJsons()
{
    Global.municipalityGeoJson=L.geoJson( GeoJsons.municipality, {
        onEachFeature: onEachMunicipalitiesFeature,
            style: function(feature){
            
                return { color: '#9c4228', weight: 0.3,  fillOpacity: 0 };
            }, 

    });
}

async function resetMap(evt) {
	// $('#provinceSelect').val("");
	// $('#districtCheck').prop('checked', true);
	// $('#municipalityCheck').prop('checked', true);
    // $('#wardCheck').prop('checked', true);

    Global.map.remove();
    Global.map = L.map('map', MapOptions);

    // Global.currentFilterLevel = "province";
    
    Global.currentLayers = [
        {
            geoJson: Global.provinceGeoJson,
            style: Filters.generalProvince,
            id:"province"
        },
        {
            geoJson: Global.districtGeoJson,
            style: Filters.generalDistrict,
            id:"district"
        },
        // {
        //     geoJson: await getGlobalMunicipalityGeoJson(),
        //     style: null,
        //     id:"municipality"
        // },
        {
            geoJson: Global.municipalityGeoJson,
            style: Filters.generalMunicipality,
            id:"municipality"
        },
    ];
    // Global.boundLevel = c;
    document.getElementById('map_info').style.visibility = 'hidden'; 
    // renderMap();
    $('.leaflet-control-attribution.leaflet-control').hide();
    Global.currentSummaryBody = {};


}

function getGlobalMunicipalityGeoJson(){
   return L.geoJson( GeoJsons.municipality, {
        onEachFeature: onEachMunicipalityFeature,
            style: function(feature){
                return { color: '#2296bd', weight: 0.3,  fillOpacity: 0 };
            }, 
        })
}

async function focusCountry(){

    resetMap();

    Global.provinceSelected = null;
    Global.districtSelected = null;
    Global.currentProvince = null;

    // console.log(Global.currentProvince);
    Global.boundLevel = "Country";
    // if(Global.currentLayers.filter(x => x.id=="province").length > 0){
    //     Global.currentLayers.filter(x => x.id=="province")[0].geoJson = L.geoJson(GeoJsons.province, {
    //         style: null,
    //         filter: function(feature, layer) {
    //             // console.log(feature.properties.Province);
    //             return feature.properties.Province == provinceNumber;
    //         },			
    // });
    // }

    // data = await filterMunicipalityByProvince(GeoJsons.municipality, provinceNumber);
    // Global.municipalityGeoJson = L.geoJson(data, {
    //     style: null,		
    //     onEachFeature: onEachMunicipalitiesFeature,
    // });
    Global.currentLayers.filter(x => x.id=="municipality")[0].geoJson = Global.municipalityGeoJson
    Global.currentLayers.filter(x => x.id=="province")[0].style = Filters["nullProvnce"];
    Global.currentLayers.filter(x => x.id=="district")[0].style = Filters["nullDistrict"];
    
    // console.log(Global.currentLayers);
    var lastLayer = Global.currentLayers[Global.currentLayers.length - 1].id;
    if(Global.currentFilter)
        Global.currentLayers[Global.currentLayers.length - 1].style=Filters[Global.currentFilter][lastLayer];

    // console.log(Global.currentFilterLevel)
    
    renderMap();
}

async function focusProvince(evt, provinceNumber) {
    resetMap();
    console.log(provinceNumber);
    Global.provinceSelected=provinceNumber;
    Global.currentProvince = Global.Provinces.find(x => x.id == provinceNumber).data;
    console.log(Global.Provinces);

    // console.log(Global.provinceSelected);
    Global.boundLevel = "Province";
    
    Global.currentLayers.filter(x => x.id=="municipality")[0].style = Filters["nullDistrict"];
    
    Global.currentLayers.filter(x => x.id=="province")[0].style = Filters["nullProvince"];
    Global.currentLayers.filter(x => x.id=="district")[0].style = Filters["generalDistrict"];
    
    var lastLayer = Global.currentLayers[Global.currentLayers.length - 1].id;
    if(Global.currentFilter)
        Global.currentLayers[Global.currentLayers.length - 1].style=Filters[Global.currentFilter][lastLayer];

    // console.log(Global.currentFilter)
    
    renderMap();
}

// async function focusDailekh

// async function focusDailekh(evt,  )
function onEachMunicipalitiesFeature(feature, layer) {
  
    layer.on({
      mouseover: highlightMunicipalityFeature,
      mouseout: resetMunicipalityHighlight,
    });
  
  }

// async function focusDistrict(evt, id) {
//     resetMap();

//     Global.currentDistrict = Global.Districts.find(x => Data.fidCodeDistrict[x.id] == id).data;
//     Global.districtSelected = id;
//     Global.boundLevel = "District";

//     console.log(Global.districtSelected);
//     // data = await filterMunicipalityByDistrict(GeoJsons.municipality, id);
//     // Global.municipalityGeoJson = L.geoJson(data, {
//     //     style: null,		
//     //     onEachFeature: onEachMunicipalitiesFeature,
//     // });
//     Global.currentLayers.filter(x => x.id=="province")[0].style = Filters["nullProvince"];
//     Global.currentLayers.filter(x => x.id=="district")[0].style = Filters["generalDistrict"];
    
  
//     Global.currentLayers.filter(x => x.id=="municipality")[0].geoJson = Global.municipalityGeoJson
//     var lastLayer = Global.currentLayers[Global.currentLayers.length - 1].id;
//     if(Global.currentFilter)
//         Global.currentLayers[Global.currentLayers.length - 1].style=Filters[Global.currentFilter][lastLayer];

//     renderMap();
// }

// /*-- Works for only two districts --*/
// async function focusDistrict(evt, districtNumber) {
//     resetMap();
  
  
//     console.log(districtNumber);
//     Global.districtSelected = districtNumber;
//     Global.currentDistrict = Global.Districts.find(x => x.id == districtNumber).data;
//     Global.boundLevel = "District";
  
//     console.log(Global.Districts);
  
//     // Update the style for the district layer
//     Global.currentLayers.filter(x => x.id=="municipality")[0].style = Filters["generalMunicipality"];
//     // console.log(Filters["generalMunicipality"]);
//     // Global.currentLayers.filter(x => x.id=="province")[0].style = Filters["nullProvince"];

//     Global.currentLayers.filter(x => x.id=="district")[0].style = Filters["generalDistrict"];
    
//     // Remove other layers
//     var lastLayer = Global.currentLayers[Global.currentLayers.length - 1].id;
//     if(Global.currentFilter)
//         Global.currentLayers[Global.currentLayers.length - 1].style=Filters[Global.currentFilter][lastLayer];
//     // console.log(Global.currentFilterLevel);
//     renderMap();
// }

/*-- Works for all districts --*/
async function focusDistrict(evt, districtNumber) {
    resetMap();


    console.log(districtNumber);
    Global.currentDistrict = Global.Districts.find(x => Data.fidCodeDistrict[x.id] == districtNumber).data;
    Global.districtSelected = districtNumber;
    Global.boundLevel = "District";

    console.log(Global.Districts);
  
    // Update the style for the district layer
    Global.currentLayers.filter(x => x.id=="municipality")[0].style = Filters["generalMunicipality"];
    // console.log(Filters["generalMunicipality"]);
    Global.currentLayers.filter(x => x.id=="district")[0].style = Filters["generalDistrict"];
    
    // Remove other layers
    var lastLayer = Global.currentLayers[Global.currentLayers.length - 1].id;
    if(Global.currentFilter)
        Global.currentLayers[Global.currentLayers.length - 1].style=Filters[Global.currentFilter][lastLayer];
    console.log(lastLayer);
    renderMap();
} 

async function selectIndicator() {
    resetMap();

}


function filterGeoJsons(){

}

function filterMunicipalityByProvince(d, province){
    data = Object.assign({}, d); 
    data["features"] = data["features"].filter(function(d){
        if(NationalParksProvince[d.properties.F_ID]){
            if( NationalParksProvince[d.properties.F_ID] == province)
                return true;
            else
                return false;
        }
        return Data.fidCodeMap[d.properties.F_ID].toString().charAt(0) == province;
    })
    return data;
}

function filterMunicipalityByDistrict(d, district){
    data = Object.assign({}, d); 
    data["features"] = data["features"].filter(function(d){
        if(NationalParksDistrict[d.properties.F_ID]){
            if( NationalParksDistrict[d.properties.F_ID] == district)
                return true;
            else
                return false;
        }
        // if(NationalParks[d.properties.F_ID])
        //     return true
        return Data.fidCodeDistrict[d.properties.F_ID].toString().substring(0,3) == district;
    })
    return data;
}

function setDistrictDropdown(id){
    $('#districtSelect').empty();
    $('#districtSelect').append('<option value="" disabled selected>District</option>');
    // $('#districtSelect').append('<option value="All" >All</option>');


    if (id == 2) {
        // Append 'Sarlahi' with a value of 205
        $('#districtSelect').append(new Option('Sarlahi', 205));
    } else if (id == 6) {
        // Append 'Dailekh' with a value of 606 when id is 6
        $('#districtSelect').append(new Option('Dailekh', 606));
    } else {
    for (const [key, value] of Object.entries(Data.fidCodeDistrict)) {

        if( (parseInt(value) >= parseInt(id)*100) && (parseInt(value) < (parseInt(id)+1)*100)){
            $('#districtSelect').append(new Option(Data.districtNepaliName[value], value));
            
        }
    }
}
}


function setIndicatorDropdown()
{
    $('#secondDropdown').empty();
    $('#secondDropdown').append('<option value="" disabled selected>Indicator</option>');
    $('#secondDropdown').append('<option value="All" >All</option>');


    for (const [key, value] of Object.entries(Data.fidCodeMap)) {

        if( (parseInt(value) >= parseInt(id)*100) && (parseInt(value) < (parseInt(id)+1)*100)){
            $('#secondDropdown').append(new Option(Data.rawData[value], value));

        }
    }
}

function getDistrictFromGeoJson(fid){
    // console.log(fid)
    return GeoJsons.district.features.filter(function(feature){
        return feature.properties.fid == fid
    })[0].properties.DISTRICT;
}


$.get( "https://thegiis.org/api/test-api" )
  .done(function( data ) {
    alert( "Data Loaded: " + data );
});