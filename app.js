console.log("Hello back to school!!");
//1.Create a variable to store the VisContainer
//2. Create a variable to store the dash options
//3. create a variable to Store thr URL -if doesn't load. might need
let viz;
const url =
  "https://public.tableau.com/views/B2SEmbedding_16867370046470/EmbeddingDashboard?:language=en-US&:display_count=n&:origin=viz_share_link";
const containerDiv = document.getElementById("vizContainer");
const options = { device: "desktop", height: "800px", width: "1100px" };
const exportpdfbutton = document.getElementById("exportPDF");
const exportpptbutton = document.getElementById("exportPPT");
function initViz() {
  viz = new tableau.Viz(containerDiv, url, options);
}
document.addEventListener("DOMContentLoaded", initViz);
exportpdfbutton.addEventListener("click", exportPDFfunction);
exportpdfbutton.addEventListener("click", exportPPTfunction);
document
  .getElementById("FilterButton")
  .addEventListener("click", getRangeValue);
function exportPDFfunction() {
  viz.showExportPDFDialog();
}

function exportPPTfunction() {
  viz.showExportPowerPointDialog();
}
function getRangeValue() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  // need to get active sheet ut this could be dash or workbook
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  // inspect the sheets you need to filter
  console.log(sheets);
  const sheetToFilter = sheets[0];
  //do the actual filtering
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", { min: minValue, max: maxValue })
    .then(alert("viz filtered"));
}
