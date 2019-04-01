//let bldName = ["ARC", "AL", "B1", "B2", "BAU", "BMH", "C2", "CIF", "CLV", "CMH",
//               "COM", "CPH", "DC", "DMS", "DWE", "E2", "E3", "E5", "E6", "E7",
//               "EC1", "EC2", "EC3", "EC4", "EC5", "ECH", "EIT", "ERC", "EV1",
//               "EV2", "EV3", "FED", "GH", "GSC", "HH", "HS", "IHB", "LIB", "M3",
//               "MC", "MHR", "MKV", "ML", "NH", "OPT", "PAC", "PAS", "PHR", "PHY",
//               "QNC", "RAC", "RA2", "RCH", "REV", "SCH", "SLC", "STC", "TC", "TH",
//               "TJB", "UC", "UWP", "V1"];

let floorName = ["Basement", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor", 
             "6th Floor", "7th Floor", "8th floor", "9th Floor", "10th Floor", "11th Floor",
             "12th Floor", "13th Floor", "14th Floor"];

let bld = [["ARC", 1, 3], ["AL", 0, 2], ["B1", 0, 3], ["B2", 0, 3], ["BAU", 1, 1], ["BMH", 0, 4],
           ["C2", 0, 4], ["CIF", 1, 1], ["CLV", 0, 2], ["CMH", 0, 13], ["COM", 0, 2], ["CPH", 0, 4], 
           ["DC", 0, 3], ["DMS", 1, 3], ["DWE", 0, 3], ["E2", 0, 4], ["E3", 1, 4], ["E5", 1, 6], 
           ["E6", 1, 6], ["E7", 1, 8], ["EC1", 1, 2], ["EC2", 1, 4], ["EC3", 1, 2], ["EC4", 1, 2],
           ["EC5", 1, 4], ["ECH", 1, 2], ["EIT", 0, 7], ["ERC", 1, 3], ["ESC", 0, 4], ["EV1", 1, 5],
           ["EV2", 1, 3], ["EV3", 1, 4], ["FED", 1, 1], ["GH", 0, 2], ["GSC", 0, 2], ["HH", 0, 4],
           ["HS", 1, 2], ["IHB", 0, 3], ["LIB", 0, 10], ["M3", 0, 4], ["MC", 0, 6], ["MHR", 1, 3], 
           ["MKV", 1, 5], ["ML", 0, 3], ["NH", 0, 4], ["OPT", 1, 4], ["PAC", 0, 3], ["PAS", 1, 5], 
           ["PHR", 0, 9], ["PHY", 0, 4], ["QNC", 0, 6], ["RAC", 1, 4], ["RA2", 1, 4], ["RCH", 1, 3],
           ["REV", 1, 3], ["SCH", 0, 2], ["SLC", 0, 3], ["STC", 0, 5], ["TC", 0, 3], ["TH", 0, 2],
           ["TJB", 1, 2], ["UC", 0, 1], ["UWP", 0, 1], ["V1", 0, 2]];

function insertBuilding() {
  let cur = document.getElementById("cur_bld_name");
  let target = document.getElementById("target_bld_name");
  let len = bld.length;
  for (let i = 0; i < len; i++) {
    let cur_option = document.createElement("option");
    let target_option = document.createElement("option");
    cur_option.value = bld[i][0];
    target_option.value = bld[i][0];
    cur.appendChild(cur_option);
    target.appendChild(target_option);
  }
}


function FloorReload(choice) {
  
  let bld_input, flr, input;
  
  if (choice === 0) {
    bld_input = document.getElementById("cur_bld_name_input");
    flr = document.getElementById("cur_flr_num");
    input = document.getElementById("cur_flr_num_input");
  } else {
    bld_input = document.getElementById("target_bld_name_input");
    flr = document.getElementById("target_flr_num");
    input = document.getElementById("target_flr_num_input");
  }
  
  let bldName = null;
  while (true) {
    bldName = bld_input.value;
    if (bldName !== undefined) {
      break;
    }
  }

  if (input.value !== null) {
    input.value = null;
  }
  
  let len = bld.length;
  
  let opt_len = flr.options.length;
  for (j = 0; j < opt_len; j++) {
    flr.removeChild(flr.options[0]);
  }
  
  
  for (let i = 0; i < len; i++) {
    if (bld[i][0] === bldName) {
      let start = bld[i][1];
      let end = bld[i][2];
      for (let j = start; j <= end; j++) {
        let flr_option = document.createElement("option");
        flr_option.value = floorName[j];
        flr.appendChild(flr_option);
      }
    }
  }
  
  
}