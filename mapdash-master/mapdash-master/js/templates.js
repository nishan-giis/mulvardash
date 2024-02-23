
class TemplateClass{
    sarlahi_fire(info){
      return `<h2>` + `Sarlahi Fire` +`</h2>` +
        `<p>` + `<u>` + Data.Municipalities[info.header.LCode] + `</u> `+ `: ` + info.body.Count + `<p>`       
    }

    sarlahi_flood(info){
        return `<h2>` + `Composite Vulnerability` + `</h2>`;
    }
    // composite_exposure(info){
    //     return `h2`+ `hello` + `h2`;
    // }
    dailekh_hazard(info){
        return `<h2>` + `Composite Vulnerability` + `</h2>`;
    }
    
    composite_adapcap(info){
        return `<h2>` + `Composite Adaptive Capacity` +`</h2>` +
        `<p>` + `<u>` + Data.Municipalities[info.header.LCode] + `</u> `+ `: ` + parseFloat(info.body.composite_adapcap).toFixed(2) + `<p>`
    }

    composite_exposure(info){
        return `<h2>` + `Composite Exposure` +`</h2>` +
        `<p>` + `<u>` + Data.Municipalities[info.header.LCode] + `</u> `+ `: ` + parseFloat(info.body.composite_exposure).toFixed(2) + `<p>`
    }
    
    composite_sensitivity(info){
        return `<h2>` + `Composite Sensitvity` +`</h2>` +
        `<p>` + `<u>` + Data.Municipalities[info.header.LCode] + `</u> `+ `: ` + parseFloat(info.body.composite_sensitivity).toFixed(2) + `<p>`
    }

    composite_hazard(info){
        return `<h2>` + `Composite Hazard` +`</h2>` +
        `<p>` + `<u>` + Data.Municipalities[info.header.LCode] + `</u> `+ `: ` + parseFloat(info.body.composite_hazard).toFixed(2) + `<p>`
    }

    vulnerability_score(info){
        return `<p>` + `<u>` + Data.Municipalities[info.header.LCode] + `</u> `+ `: ` + parseFloat(info.body.vulnerability_score).toFixed(2) + `<p>`
    }
    risk_score(info){
        return `<p>` + Data.Municipalities[info.header.LCode] +`</p>` +
        `<p>` + `  ` + parseFloat(info.body.risk_score).toFixed(2) + `  ` + `</p>`
    }

    // component_indicator(info){
    //   var selectedProperty = document.getElementById("secondDropdown").value;
    //   const replacedString = selectedProperty.replace(/_/g, ' ');
    //   console.log(selectedProperty);
    //   return `<h2>` +  replacedString +`</h2>` +
    //   `<p>` + `<u>` + Data.Municipalities[info.body.LCode] + `</u> `+ `: ` + info.body[selectedProperty] + `<p>`
    // }

    component_indicator(info){
      var selectedProperty = document.getElementById("secondDropdown").value;
      console.log(selectedProperty)
      const replacedString = selectedProperty.replace(/_/g, ' ');
      return `<p>` + Data.Municipalities[info.header.LCode] + `</p> ` + `<p>` + parseFloat(info.body[selectedProperty]).toFixed(2) + `<p>`
    }
}


var Template = new TemplateClass()

var Templates = {
    sarlahi_fire: Template.sarlahi_fire,
    sarlahi_flood: Template.sarlahi_flood,
    dailekh_hazard: Template.dailekh_hazard,
    composite_adapcap: Template.composite_adapcap,
    composite_exposure: Template.composite_exposure,
    composite_sensitivity: Template.composite_sensitivity,
    composite_hazard: Template.composite_hazard,
    vulnerability_score: Template.vulnerability_score,
    risk_score: Template.risk_score,
    component_indicator: Template.component_indicator,

};


// function getPopupBodyDiv(data){
//   div = "";
//   Object.entries(data).forEach(([key, value]) => {
//     if(key != "Others")
//     div += `<div class="row-wrap">
//             <div>`+key+`</div>
//             <div>`+toNepaliDigits(value)+`</div>
//           </div>`;
//   });
//   div+= `<div class="row-wrap">
//       <div>Others</div>
//       <div>`+toNepaliDigits(data["Others"])+`</div>
//     </div>`;
//   return div;
// }

// function getLeadPopupBodyDiv(data){
//   div = "";
//   var c = 1;
//   data.forEach((d) => {
//     div += `
//       <div class="row-wrap">
//         <div>
//           <div class="row">
          
//             <div class="col-md-8 candidate_info">
//               <p class="candidate_name">`+ d.full_name +`</p>
//               <p class="candidate_party">`+d.party_name+`</p>
//             </div>
//           </div>
//         </div>
//         <div>
//             <div class="candidate_vote_count">
//               `+ getVictoryIcon(d.winner_type) +`
//               <span>`+toNepaliDigits(d.total_vote)+`</span>
//               <img class="party_image" src="`+ d.party_image+`">
//             </div>
//         </div>
//       </div>

//     `;
//       c+=1;
//     });
//   return div;
// }

