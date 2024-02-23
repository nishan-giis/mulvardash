var Global = {
	provinceGeoJson:null, 
	districtGeoJson:null, 
    municipalityGeoJson:null, 
    allMunicipalityGeoJson:null,
	wardGeoJson:null,
    dailekhGeoJson:null,
	currentLayers: [],  
	currentFilter: "mayor_party",
	currentFilterLevel: "municipality",
    currentGeoLevel: null,
    provinceSelected: 0,
    districtSelected: 0,
    selectedValue: 0,
    currentProvince: null,
    currentDistrict: null,
    currentParty: null,
    Provinces: [],
    Districts: [],
    Dailekh: [],
    currentFilterLegend: null,
    oldFilterLegend: null,
    boundLevel:  "Country", // Country, Province, District
	map: null,
	popup: L.popup(),
    mapLend: null,
    currentPalikaSelect: "All",
    currentSummaryTitle: "Summary",
    currentSummaryBody: {},
    currentBubble: "none",
    mode:"region",
    var: "totalValue"
}

nepaliDigits = {
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
}

function toNepaliDigits(s){
    var final = ""
    var str = s ? s.toString():"";
    if(!isNaN(s)){
        var x=s;
        x=x.toString();
        var lastThree = x.substring(x.length-3);
        var otherNumbers = x.substring(0,x.length-3);
        if(otherNumbers != '')
            lastThree = ',' + lastThree;
        var str = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    }
    for (var i = 0; i < str.toString().length; i++) {
        if(nepaliDigits[str[i]])
            final += nepaliDigits[str[i]];
        else
            final += str[i];
    }
    return final;
}

function toEnglishDigits(s){
    var final = ""
    var str = s.toString();
    for (var i = 0; i < str.toString().length; i++) {
        var v = Object.keys(nepaliDigits).find(key => nepaliDigits[key] === str[i]); 
        if(v)
            final += v;
        else
            final += str[i];
    }
    return final;
}

function regionFilter(fid){
    var lcode;
    if(NationalParksDistrict[fid])
        lcode = NationalParksDistrict[fid];
    else
        lcode = Data.fidCodeMap[fid];
    if(Global.districtSelected){
        if(lcode.toString().substring(0,3) == Global.districtSelected){
            return true;

        }
        else return false;
    }
    else{
        if(Global.provinceSelected)
            if(lcode.toString().substring(0,1) == Global.provinceSelected)
                return true;
            else return false;
    }
    
    return true;

}

function sortByNepaliNumeric(obj){
    return Object.entries(obj).sort((a, b) => toEnglishDigits(b[1]) - toEnglishDigits(a[1]));
}

MapOptions= {
    center: [28.3, 84.4],
    zoom: L.Browser.mobile? 6:7,
    minZoom: L.Browser.mobile? 7:8,
    maxZoom:13,
    snapZoom:0.5,
    doubleClickZoom : false,
    inertia:true,
    inertiaDeceleration:500,
    scrollWheelZoom: true,

}
