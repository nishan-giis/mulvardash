//Render methods

function renderMap(){
    // resetStyle();
    // removeAllLayer();
    renderLegend();
    renderSummary();
    renderLayer();
    if(Global.currentBubble != "none")
        renderBubble();
    fitBounds();
    highlightSelect();
    if(Global.boundLevel == "District") {
    renderMunicipalityNames();
    }
    if(Global.boundLevel == "Country") {
    renderProvinceNames();
    }
}

function fitBounds()
{
    if(Global.boundLevel == "Country")
        Global.map.fitBounds(Global.provinceGeoJson.getBounds());
    else if(Global.boundLevel == "Province")
        Global.map.fitBounds(Global.currentProvince.getBounds());
    else if(Global.boundLevel == "District")
        Global.map.fitBounds(Global.currentDistrict.getBounds());
}



// function resetStyle()
// {
//     Global.currentLayers.forEach(function(layer){
//         console.log(layer.geoJson)
//         if(layer.style)
//             layer.geoJson.resetStyle(layer.geoJson);
//         layer.geoJson.addTo(Global.map);
        
//     }); 
// }
// function removeAllLayer()
// {
//     // Global.map.eachLayer(function (layer) {
//     //     // Global.map.removeLayer(layer);
//     //     Global.map.remove(layer);
//     //     // layer.remove(Global.map);

//     // });   
//     Global.map.remove();
//     Global.map = L.map('map', {
//         center: [28.3, 84.4],
//         zoom: 7
//     });
// }


function removeAllLayer()
{
    Global.currentLayers = [
        {
            geoJson: Global.provinceGeoJson,
            style: Filters.generalProvince,
            id:"province"
        },
        {
            geoJson: Global.districtGeoJson,
            style: null,
            id:"district"
        },
        {
            geoJson: Global.municipalityGeoJson,
            style: null,
            id:"municipality"
        },
    ];
}

function renderLayer()
{
    Global.currentLayers.forEach(function(layer){
        if(layer.style)
            layer.geoJson.setStyle(layer.style);
        layer.geoJson.addTo(Global.map);
    }); 
    L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
        // relation[boundary=administrative][admin_level=6](area.a),
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, Tiles &copy; <a href="https://carto.com/attribution">CARTO</a>',
        }
        
      ).addTo(Global.map);
    
}

function renderSummary(){
    
    $('#summaryTitle').html(Global.currentSummaryTitle);
    var div ="";
    if(Global.currentSummaryBody){
        Object.entries(Global.currentSummaryBody).forEach(
            ([key, value]) => {
                div+="<p>" + key + " : " + value;
            }
        );
        $('#summaryBody').html(div);
    }

    if(Global.currentFilter != "voters_count"){
        $('.summary_div>.card').attr("hidden", "true")
    }
    else{
        $('.summary_div>.card').removeAttr("hidden")

    }

}

function renderMunicipalityNames(){
    GeoJsons.municipality.features.forEach(function(d){
        // console.log(e);
        var Lcode = Data.fidCodeMunicipality[d.properties.F_ID]
        // console.log(Lcode)
        var municipalityname = Data.MunicipalityNames[Lcode]
        // console.log(municipalityname)
        var default_center = [  81.46982838917172, 29.271845521328405]
        if(municipalityname){
            centroid = getCenterPoint(d.geometry.coordinates[0])
            textTransform = 0;
            baseFont = 22;
            
            // if(Global.boundLevel == "Province")
            //     baseFont = 10;
            // else if(Global.boundLevel == "District")
            //     baseFont = 10;
            if(isNaN(centroid[1]) || isNaN(centroid[0]) )
            {
                centroid = default_center
            }
            L.marker([centroid[1]+parseFloat(municipalityname.Y) , centroid[0]+parseFloat(municipalityname.X)], {
                icon: L.divIcon({
                    html: '<span style="font-weight:500; display: inline-block; transform: rotate('+(textTransform+parseInt(municipalityname.Transform_Angle))+'deg); font-size:'+(baseFont+parseInt(municipalityname.Font_size) )+'px;">'+municipalityname.Municipality+'</span>'
                }),
                opacity: 1,
                zIndexOffset: 10000     // Make appear above other map features
            }).addTo(Global.map);
        }
    
    
    })
    
}

function renderProvinceNames(){
    GeoJsons.province.features.forEach(function(d){
        // console.log(d);
        var Lcode = Data.objectidCodeProvince[d.properties.OBJECTID]
        // console.log(Lcode)
        var provincename = Data.ProvinceNames[Lcode]
        // console.log(provincename)
        var default_center = [  81.46982838917172, 29.271845521328405]
        if(provincename){
            centroid = getCenterPoint(d.geometry.coordinates[0])
            textTransform = 0;
            baseFont = 35;
            
            // if(Global.boundLevel == "Province")
            //     baseFont = 10;
            // else if(Global.boundLevel == "District")
            //     baseFont = 10;
            if(isNaN(centroid[1]) || isNaN(centroid[0]) )
            {
                centroid = default_center
            }
            L.marker([centroid[1]+parseFloat(provincename.Y) , centroid[0]+parseFloat(provincename.X)], {
                icon: L.divIcon({
                    html: '<span style="font-weight:500; color:#808080; display: inline-block; transform: rotate('+(textTransform+parseInt(provincename.Transform_Angle))+'deg); font-size:'+(baseFont+parseInt(provincename.Font_size) )+'px;">'+provincename.Province+'</span>'
                }),
                opacity: 1,
                zIndexOffset: 10000     // Make appear above other map features
            }).addTo(Global.map);
        }
    
    
    })
    
}

function renderBubble()
{
    var bubbles = Bubbles[Global.currentBubble]();
    bubbles.forEach(function(m){
            L.circle(m.center, {
                color: m.color,
                opacity:0,
                fillColor: m.color,
                fillOpacity: 0.6,
                radius: m.radius
            }).addTo(Global.map);
       
    });
}

function getCenterPoint(arr)
{

    var minX, maxX, minY, maxY;
    for (var i = 0; i < arr.length; i++)
    {
        minX = (arr[i][0] < minX || minX == null) ? arr[i][0] : minX;
        maxX = (arr[i][0] > maxX || maxX == null) ? arr[i][0] : maxX;
        minY = (arr[i][1] < minY || minY == null) ? arr[i][1] : minY;
        maxY = (arr[i][1] > maxY || maxY == null) ? arr[i][1] : maxY;
    }
    return [(minX + maxX) / 2, (minY + maxY) / 2];
}

function renderLegend()
{
    Global.currentLegendKeys = [];
    Legends.national_park.addTo(Global.map);
    $('#national_park_legend').parent().css('box-shadow',"none");

    if(Global.oldFilterLegend){
        Global.oldFilterLegend.remove(Global.map);
    }
    if(Global.currentFilterLegend){
        Global.currentFilterLegend.addTo(Global.map);
        Global.oldFilterLegend = Global.currentFilterLegend;

    }

}

function resetFilterHighlight()
{
    $('#lead_mayor_select').parent().css("background-color","#F5F5F5");
    // $('#candidate_filters').parent().css("background-color","#F5F5F5");
    $('#composite_filter').parent().css("background-color","#F5F5F5");
    $('#filter_select_2').parent().css("background-color","#F5F5F5");
    $('#filter_select_2').parent().css("background-color","#F5F5F5");
    $('#mayor_select_old').parent().css("background-color","#F5F5F5");
    $('#mayor_select').parent().css("background-color","#F5F5F5");
    $('#filter_select_1').parent().css("background-color","#F5F5F5");
}

function highlightSelect()
{
    // if(Global.districtSelected){candidate_filters
    //     $('#districtSelect').parent().css("background-color","#f5c775");
    // }
    // else{
    //     $('#districtSelect').parent().css("background-color","#F5F5F5");
    // }

    // const mainDropdown = document.getElementById("mainDropdown");
    // const secondDropdown = document.getElementById("secondDropdown");
    
    // if (mainDropdown.value != "") {
    //     mainDropdown.parent().css("background-color","#f5c775");
    // } else {
    //     mainDropdown.parent().css("background-color", "#F5F5F5");
    // }
    
    // if (secondDropdown.value != "") {
    //     secondDropdown.parent().css("background-color","#f5c775");
    // } else {
    //     secondDropdown.parent().css("background-color", "#F5F5F5");
    // }

    // if (composite_filter.value != "") {
    //     composite_filter.parent().css("background-color", "#f5c775");
    // } else {
    //     composite_filter.parent().css("background-color", "#F5F5F5");
    // }

    // if(Global.provinceSelected){
    //     $('#mainDropdown').parent().css("background-color","#f5c775");
    // }
    // else{
    //     $('#mainDropdown').parent().css("background-color","#F5F5F5");
    // }
    // if(Global.provinceSelected){
    //     $('#secondDropdown').parent().css("background-color","#f5c775");
    // }
    // else{
    //     $('#secondDropdown').parent().css("background-color","#F5F5F5");
    // }


    if(Global.provinceSelected){
        $('#provinceSelect').parent().css("background-color","#f5c775");
    }
    else{
        $('#provinceSelect').parent().css("background-color","#F5F5F5");
    }

    if(Global.districtSelected){
        $('#districtSelect').parent().css("background-color","#f5c775");
    }
    else{
        $('#districtSelect').parent().css("background-color","#F5F5F5");
    }

    if(Global.currentPalikaSelect != "All"){
        $('#palikaSelect').parent().css("background-color","#f5c775");
    }
    else{
        $('#palikaSelect').parent().css("background-color","#F5F5F5");
    }
    resetFilterHighlight();

    if(Global.currentFilter == "risk_score"){
        $('#filter_select_2').parent().css("background-color","#f5c775");

    }

    // if(Global.provinceSelected){
    //     $('#mainDropdown').parent().css("background-color","#f5c775");
    // }
    // else{
    //     $('#mainDropdown').parent().css("background-color","#F5F5F5");
    // }

    // if(Global.provinceSelected){
    //     $('#secondDropdown').parent().css("background-color","#f5c775");
    // }
    // else{
    //     $('#secondDropdown').parent().css("background-color","#F5F5F5");
    // }
    
    
     // Function to handle dropdown change event
     function handleDropdownChange(dropdownId) {
        var selectedValue = $("#" + dropdownId).val();
        if (selectedValue !== "") {
          $("#" + dropdownId).parent().css("background-color", "#f5c775");
        } else {
          $("#" + dropdownId).parent().css("background-color", ""); // Reset to default color
        }
      }

      // Event listener for the mainDropdown
      $("#mainDropdown").change(function() {
        handleDropdownChange("mainDropdown");
      });

      // Event listener for the secondDropdown
      $("#secondDropdown").change(function() {
        handleDropdownChange("secondDropdown");
      });
      $("#composite_filter").change(function() {
        // Reset background color for mainDropdown and secondDropdown
        $("#mainDropdown").parent().css("background-color", "");
        $("#secondDropdown").parent().css("background-color", "");
    

    var composite_filter = ["composite_adapcap", "composite_exposure",  "composite_sensitivity", "vulnerability_score", "composite_hazard"]
    var oldfilters = ["mayor_party", "mayor_age", "mayor_margin", "mayor_gender","vice_mayor_party", "vice_mayor_age", "vice_mayor_margin", "vice_mayor_gender"];
    
    if(composite_filter.includes(Global.currentFilter)){
        $('#composite_filter').parent().css("background-color","#f5c775");

    }

    if(oldfilters.includes(Global.currentFilter)){
        $('#filter_select_1').parent().css("background-color","#f5c775");
        $('#mayor_select_old').parent().css("background-color","#f5c775");
    }

    if(Global.currentFilter=="lead_mayor" || Global.currentFilter=="lead_vice_mayor" ){
        $('#lead_mayor_select').parent().css("background-color","#f5c775");

    }
});

}