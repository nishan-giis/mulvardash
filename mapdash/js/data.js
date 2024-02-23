var Data = {
    Parties: [],
    Mayors: [],
    Hazard: [],
    Composites: [],
    Raw: [],
    HazardFlood: [],
    compositeHeader: [],
    MunicipalityNames: [],
    ProvinceNames: [],
    // Indicator: [],
    hazardDailekh: [],
    compositeDailekh: [],
    // indicatorColor: [],
    rawData: [],
    ViceMayors: [],
    fidCodeMap: [],
    fidCodeDistrict: [],
    fidCodeMunicipality: [],
    objectidCodeProvince: [],
    districtNepaliName: [],
    registeredVoters: [],
    Candidates: [],
    Districts: [],
    Municipalities: [],
    Municipality: [],
    ResultCandidate: [],
    PartiesById: [],
    lcodeMidMap: {},
    MayorMargin: {},
    ViceMayorMargin : {}
    
}

var VulnarabilityRangeColor = {
    "Very Low" : "#f6eff7",
    "Low" : "#bdc9e1",
    "Medium" : "#67a9cf",
    "High" : "#1c9099",
    "Very High" : "#016c59"
}

var ComponentName = {
    "Risk": "Risk",
    "Vulnerability": "Vulnerability",
    "Exposure": "Exposure",
    "Sustainability": "Sustainability",
    "Adaptive Capacity": "Adaptive Capacity",
    "Hazard": "Hazard"
}

var ProvinceNepaliName = {
    "1": "Province 1",
    "2": "Madhesh",
    "3": "Bagmati",
    "4": "Gandaki",
    "5": "Lumbini",
    "6": "Karnali",
    "7": "Sudurpaschim"
}

var DistrictName = {
    "DAILEKH": "Dailekh",
    "SARLAHI": "Sarlahi"
}

var RangeBracketColor = {
    "Very High" : "#edf8b1",
    "High" : "#7fcdbb",
    "Medium" :  "#2c7fb8",
    "Low": "#f9c10a",
    "Very Low": "#e064a7"
}

var RangeColorDailekh = {
    "0 - 5" : "#993404",
    "5 - 10" : "#d95f0e",
    "10 - 15" : "#fe9929",
    "15 - 20": "#fed98e",
    "20 - 25": "#ffffd4"
}
// var RangeColor = {
//     "0 - 0.2" : "#fff7bc",
//     "0.2 - 0.4" : "#ddbb75",
//     "0.4 - 0.6" : "#d7834c",
//     "0.6 - 0.8": "#d95f0e",
//     "0.8 - 1.1": "#b35617"
// }
var RangeColor = {
    "0.800001 - 1.1": "#BA0F30",
    "0.600001 - 0.800001": "#FF5412",
    "0.400001 - 0.600001" : "#FFFF00",
    "0.200001 - 0.400001" : "#32CD30",
    "0 - 0.200001" : "#59981A"        
}

var RangeLabels = {
    "0.800001 - 1.1": "Very High",
    "0.600001 - 0.800001": "High",
    "0.400001 - 0.600001": "Medium",
    "0.200001 - 0.400001": "Low",
    "0 - 0.200001": "Very Low"
}

var NationalParks = {
    '72'	:	'कोशी टप्पु वन्यजन्तु आरक्ष',
    '139'	:	'कोशी टप्पु वन्यजन्तु आरक्ष',
    '158'	:	'कोशी टप्पु वन्यजन्तु आरक्ष',
    '313'	:	'शिवपुरी जलाधार र वन्यजन्तु आरक्ष',
    '314'	:	'लाङटाङ राष्ट्रिय निकुञ्ज',
    '343'	:	'पर्सा वन्यजन्तु आरक्ष',
    '344'	:	'चितवन राष्ट्रिय निकुञ्ज',
    '379'	:	'पर्सा वन्यजन्तु आरक्ष',
    '394'	:	'पर्सा वन्यजन्तु आरक्ष',
    '395'	:	'चितवन राष्ट्रिय निकुञ्ज',
    '403'	:	'चितवन राष्ट्रिय निकुञ्ज',
    '464'	:	'ढोरपाटन शिकार आरक्ष',
    '482'	:	'ढोरपाटन शिकार आरक्ष',
    '528'	:	'लुम्बिनी सांस्कृतिक विकास क्षेत्र',
    '607'	:	'बर्दिया राष्ट्रिय निकुञ्ज',
    '680'	:	'खप्तड राष्ट्रिय निकुञ्ज',
    '693'	:	'खप्तड राष्ट्रिय निकुञ्ज',
    '704'	:	'खप्तड राष्ट्रिय निकुञ्ज',
    '714'	:'खप्तड राष्ट्रिय निकुञ्ज',
    '737'	:	'शुक्लाफाँटा राष्ट्रिय निकुञ्ज',
    '773'	:	'चितवन राष्ट्रिय निकुञ्ज',
    '777'	:	'ढोरपाटन शिकार आरक्ष',
   
}

var DistrictsToInclude = {
    //Dailekh
    '617'   :   'Aathabis Nagarpalika',
    '618'   :   'Bhagawatimai Gaunpalika',
    '619'   :   'Bhairabi Gaunpalika',
    '620'   :   'Chamunda Bindrasaini Nagarpalika',
    '621'   :   'Dullu Nagarpalika',
    '622'   :   'Dungeshwor Gaunpalika',
    '623'   :   'Gurans Gaunpalika',
    '624'   :   'Mahabu Gaunpalika',
    '625'   :   'Narayan Nagarpalika',
    '626'   :   'Naumule Gaunpalika',
    '627'   :   'Thantikandh Gaunpalika',

    //Sarlahi
    '209'   :   'Bagmati Nagarpalika',
    '210'   :   'Balara Nagarpalika',
    '211'   :   'Barahathawa Nagarpalika',
    '212'   :   'Basbariya Gaunpalika',
    '213'   :   'Bishnu Gaunpalika',
    '214'   :   'Bramhapuri Gaunpalika',
    '215'   :   'Chakraghatta Gaunpalika',
    '216'   :   'Chandranagar Gaunpalika',
    '217'   :   'Dhankaul Gaunpalika',
    '218'   :   'Godaita Nagarpalika',
    '219'   :   'Haripur Nagarpalika',
    '220'   :   'Haripurwa Nagarpalika',
    '221'   :   'Hariwan Nagarpalika',
    '222'   :   'Ishworpur Nagarpalika',
    '223'   :   'Kabilasi Nagarpalika',
    '224'   :   'Kaudena Gaunpalika',
    '225'   :   'Lalbandi Nagarpalika',
    '226'   :   'Malangawa Nagarpalika',
    '227'   :   'Parsa Gaunpalika',
    '228'   :   'Ramnagar Gaunpalika',
}

var NationalParksProvince = {
    '72':	'1',
	'139':	'1',
	'158':	'2',
	'313':	'3',
	'314':	'3',
	'343':	'3',
	'344':	'3',
	'379':	'2',
	'394':	'2',
	'395':	'2',
	'403':	'3',
	'464':	'4',
	'482':	'4',
	'528':	'5',
	'607':	'5',
	'680':	'7',
	'693':	'7',
	'704':	'7',
	'714':	'7',
	'737':	'7',
	'773':	'4',
	'777':	'5',
}

var NationalParksDistrict = {
    '72':	'113',	
	'139':	'114',
	'158':	'201',
	'313':	'305',	
	'314':	'305',	
	'343':	'312',	
	'344':	'312',
	'379':	'207',	
	'394':	'208',
	'395':	'208',
	'403':	'313',
	'464':	'404',	
	'482':	'411',	
	'528':	'508',	
	'607':	'512',
	'680':	'701',
	'693':	'702',	
	'704':	'707',
	'714':	'706',
	'737':	'709',
	'773':	'408',
	'777':	'501',
}

var GeoJsons = {
    "province":null,
    "municipality":null,
    "district":null,
    "dailkeh":null,
    "sarlahi":null,
}

var provincePopulation = [
    [1, 4972021,190],
    [2, 6126288,630],
    [3, 6084042,300],
    [4, 2479745,120],
    [5, 5124225,230],
    [6, 1694889,61],
    [7, 2711270,140]
  ];

class DataLayerClass{


    getHazardRangeColor(f_id){
        var hazard = Data.Hazard[Data.fidCodeMap[f_id]];
        // // console.log(Data.Hazard[Data.fidCodeMap[f_id]]);
        if(!hazard)
            return "#fff";
        
        // console.log(RangeBracketColor[hazard.Total_Count]);
        return RangeBracketColor[hazard.Total_Count];
        
    }

    // getCompositeColor(f_id){
    //     var compositedailekh = Data.compositeDailekh[Data.fidCodeMap[f_id]];
    //     // // console.log(Data.Hazard[Data.fidCodeMap[f_id]]);
    //     if(!comp)
    //         return "#fff";
        
    //     // console.log(RangeBracketColor[hazard.Total_Count]);
    //     return RangeBracketColor[hazard.Total_Count];
        
    // }

    getHazardInfo(f_id){
        // console.log(f_id);
        return Data.Hazard[Data.fidCodeMap[f_id]];
        
    }

    getHazardRangeColorFlood(f_id){
        var hazardflood = Data.HazardFlood[Data.fidCodeMap[f_id]];
        // // console.log(Data.Hazard[Data.fidCodeMap[f_id]]);
        if(!hazardflood)
            return "#fff";
        
        // console.log(RangeBracketColor[hazardflood.Total_Count]);
        return RangeBracketColor[hazardflood.Total_Count];
        
    }

    getHazardInfoFlood(f_id){
        // console.log(f_id);
        return Data.HazardFlood[Data.fidCodeMap[f_id]];
        
    }

    // getCompositeAdapcapColorDailekh(f_id) {
    //     var hazard = Data.Hazard[Data.fidCodeMap[f_id]];
    //     // // console.log(Data.Hazard[Data.fidCodeMap[f_id]]);
    //     if(!hazard)
    //         return "#fff";
    //     return RangeColor[hazard['Percentage of households that use firewood as fuel source']];    
    // }

    // getCompositeExpColorDailekh(f_id) {
    //     var hazard = Data.Hazard[Data.fidCodeMap[f_id]];
    //     // // console.log(Data.Hazard[Data.fidCodeMap[f_id]]);
    //     if(!hazard)
    //         return "#fff";
    //     return RangeColor[hazard['Percentage of households with Mud bonded bricks/ stone foundation']];
    // }

    // getCompositeSensColorDailekh(f_id) {
    //     var hazard = Data.Hazard[Data.fidCodeMap[f_id]];
    //     // // console.log(Data.Hazard[Data.fidCodeMap[f_id]]);
    //     if(!hazard)
    //         return "#fff";
    //     return RangeColor[hazard['Percentage of households with Spout water*']];   
    // }

    getCompositeInfoDailekh(f_id) {
        // console.log(f_id);
        return Data.compositeDailekh[Data.fidCodeMap[f_id]];
    }
    
    getComponentInfo(f_id) {
        // console.log(f_id);
        return Data.rawData[Data.fidCodeMap[f_id]];
    }
    // Example usage
    // var f_id = 'your_f_id_here';
    // var functionName = 'composite_adapcap'; // Change this to the desired function
    // var color = getCompositeColorDailekh(f_id, functionName);
    // // console.log(color); // This will log the color based on the selected function
    
    // getCompositeAdapcapColorDailekh(f_id) {        
    //     var compositedailekh = Data.compositeDailekh[Data.fidCodeMap[f_id]];
    //     if(!compositedailekh)
    //         return "#fff";
    //     var totalValue = parseFloat(compositedailekh['Composite Adaptive Capacity']);
        
    //     for (var range in RangeColor) {
    //         var [min, max] = range.split(" - ").map(parseFloat);
    //         if (totalValue >= min && totalValue < max) return RangeColor[range];
    //     }
    
    //     return "#fff";
    // }

    // getCompositeExpColorDailekh(f_id) {
    //     var compositedailekh = Data.compositeDailekh[Data.fidCodeMap[f_id]];
    //     if(!compositedailekh)
    //         return "#fff";
    //     var totalValue = parseFloat(compositedailekh['Composite Exposure']);
        
    //     for (var range in RangeColor) {
    //         var [min, max] = range.split(" - ").map(parseFloat);
    //         if (totalValue >= min && totalValue < max) return RangeColor[range];
    //     }
    
    //     return "#fff";
    // }

    // getCompositeSensColorDailekh(f_id) {
    //     var compositedailekh = Data.compositeDailekh[Data.fidCodeMap[f_id]];
        
    //     if(!compositedailekh)
    //         return "#fff";
    //     var totalValue = parseFloat(compositedailekh['Composite Sensitivity']);
        
    //     for (var range in RangeColor) {
    //         var [min, max] = range.split(" - ").map(parseFloat);
    //         if (totalValue >= min && totalValue < max) return RangeColor[range];
    //     }
    
    //     return "#fff";
    // }

    // getIndicatorColor(f_id) {
    //     var indicatorColor = Data.indicatorColor[Data.fidCodeMap[f_id]];
    //     if(!indicatorColor)
    //         return "#fff";

        
    // }

    getCompositeColorDailekh(f_id) {
        // console.warn(f_id);
        var selectedProperty = document.getElementById("composite_filter").value;
        console.log(selectedProperty);
        var compositedailekh = Data.compositeDailekh[Data.fidCodeMap[f_id]];
        if (!compositedailekh)
            return "#fff";
    
        // var properties = ['Composite Adaptive Capacity', 'Composite Exposure', 'Composite Sensitivity'];
    
        window.totalValue = parseFloat(compositedailekh[selectedProperty]);
        // console.log(totalValue);
        // // console.log(RangeColor[compositedailekh[selectedProperty]]);

        for (var range in RangeColor) {
            var [min, max] = range.split(" - ").map(parseFloat);
            if (totalValue >= min && totalValue < max) return RangeColor[range];
        }
    
        // console.log(RangeColor[totalValue]);
        // getDistrictPopUpDiv(info, feature);
    
        return "#fff";
    }

    // getCompositeColor(f_id) {
    //     // console.warn(f_id);
    //         var compositedailekh = Data.compositeDailekh[Data.fidCodeMap[f_id]];
    //         if (!compositedailekh)
    //             return "#fff";

    //         window.totalValue = parseFloat(compositedailekh.risk_score);

    //         for (var range in RangeColor) {
    //             var [min, max] = range.split(" - ").map(parseFloat);
    //             if (totalValue >= min && totalValue < max) return RangeColor[range];
    //         }

    //         return "#fff";
    //     }

    getCompositeColor(f_id) {
        // console.warn(f_id);
            var compositedailekh = Data.compositeDailekh[Data.fidCodeMap[f_id]];
            if (!compositedailekh)
                return "#fff";

            window.totalValue = parseFloat(compositedailekh.risk_score);

            for (var range in RangeColor) {
                var [min, max] = range.split(" - ").map(parseFloat);
                if (totalValue >= min && totalValue < max) return RangeColor[range];
            }

            return "#fff";
        }

    getComponentColor(f_id) {
        // console.warn(f_id);
        var selectedProperty = document.getElementById("secondDropdown").value;
        console.log(selectedProperty);
        var rawdata = Data.rawData[Data.fidCodeMap[f_id]];
        if (!rawdata)
            return "#fff";
        // var properties = ['Composite Adaptive Capacity', 'Composite Exposure', 'Composite Sensitivity'];
    
        window.totalValue = parseFloat(rawdata[selectedProperty]);
        // console.log(totalValue);
        // // console.log(RangeColor[compositedailekh[selectedProperty]]);

        for (var range in RangeColor) {
            var [min, max] = range.split(" - ").map(parseFloat);
            if (totalValue >= min && totalValue < max) return RangeColor[range];
        }
    
        // console.log(RangeColor[totalValue]);
        // getDistrictPopUpDiv(info, feature);
    
        return "#fff";
    }

    // getComponentColor(f_id) {
    //     var selectedComponent = selectIndicator;
    //     console(selectedComponent);
    //     var rawdata = Data.rawData[Data.fidCodeMap[f_id]];
    //     if (!rawdata)
    //         return "#fff";
    
    //     // var properties = ['Composite Adaptive Capacity', 'Composite Exposure', 'Composite Sensitivity'];
    
    //     window.totalValue = parseFloat(rawdata[selectIndicator]);
    //     // console.log(RangeColor[rawdata[selectedComponent]]);

    //     for (var range in RangeColor) {
    //         var [min, max] = range.split(" - ").map(parseFloat);
    //         if (totalValue >= min && totalValue < max) return RangeColor[range];
    //     }
    
    //     // console.log(RangeColor[totalValue]);
    //     // getDistrictPopUpDiv(info, feature);
    
    //     return "#fff";
    // }
    
    // getHazardRangeColorDailekh(f_id){
    //     var hazard = Data.hazardDailekh[Data.fidCodeMap[f_id]];
    //     // console.log(Data.hazardDailekh[Data.fidCodeMap[f_id]]);
    //     // // console.log(d['Percentage of absentee population']);
    //     if(!hazard)
    //         return "#fff";
    //     // Convert the "Total" value to a number (assuming hazard.Total is a string)
    //     var totalValue = parseFloat(hazard['Percentage of absentee population']);

    //     // Find the appropriate range
    //     for (var range in RangeColor) {
    //     var rangeParts = range.split(" - ");
    //     var min = parseFloat(rangeParts[0]);
    //     var max = parseFloat(rangeParts[1]);
    //         if (totalValue >= min && totalValue < max) {
    //             return RangeColor[range];
    //         }
    //     }

    //     // If no range matches, return a default color
    //     return "#fff";
    // }

    getHazardRangeColorDailekh(f_id) {
        var hazard = Data.hazardDailekh[Data.fidCodeMap[f_id]];
        
        if (!hazard) return "#fff";
        
        var totalValue = parseFloat(hazard['Percentage of absentee population']);
        
        for (var range in RangeColor) {
            var [min, max] = range.split(" - ").map(parseFloat);
            if (totalValue >= min && totalValue < max) return RangeColor[range];
        }
    
        return "#fff";
        // return RangeColor(hazard['Percentage of absentee population']);
    }
    

    getHazardInfoDailekh(f_id){
        
        return Data.hazardDailekh[Data.fidCodeMap[f_id]];
        
    }
    
    // getCandidateHeader(f_id){
    //     var lcode = Data.fidCodeMap[f_id];
    //     var d = Data.Candidates.filter(function(c){
    //         return c.lcode == lcode;
    //     });

    //     if(d.length > 0){
    //         return d[0];
    //     }
    //     return "";

    // }

        
    getRawDataHeader(f_id){
        var LCode = Data.fidCodeMap[f_id];
        console.log(LCode);
        var d = Data.Raw.filter(function(c){
            return c.LCode == LCode;
        });

        if(d.length > 0){
            return d[0];
        }
        return "";

    }
    getDistrictHeader(f_id){
        var LCode = Data.fidCodeMap[f_id];
        // console.log(LCode);
        var d = Data.Composites.filter(function(c){
            return c.LCode == LCode;
        });

        if(d.length > 0){
            return d[0];
        }
        return "";

    }



    getPalikaFromFid(fid){
        var m = GeoJsons.municipality.features.filter(function(feature){
            return feature.properties.F_ID == fid
        });
        if(m.length){
            return m[0].properties.Type_GN
        }
        return "";
    }
};

var DataLayer = new DataLayerClass();