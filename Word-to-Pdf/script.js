var addfile = document.querySelector("#addfile");
var pdf = document.querySelector(".pdf");
var dwpdf = document.querySelector('#dwpdf');

var opt = {
    margin: 1,
    pagebreak: { mode: 'avoid-all' },
    filename: 'myfile.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 1 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
};
addfile.addEventListener('change', (e) => {

    console.time();
    var reader = new FileReader();
    reader.onloadend = function (event) {
        var arrayBuffer = reader.result;
        // debugger

        mammoth.convertToHtml({ arrayBuffer: arrayBuffer }).then(function (resultObject) {
            pdf.innerHTML = resultObject.value
            console.log(resultObject.value)
        })
        console.timeEnd();
    }
    reader.readAsArrayBuffer(addfile.files[0]);
    pdf.style.display = 'none';
    dwpdf.disabled = false;
})


function dwnldpdf() {
    pdf.style.display = 'block';
    console.log('Saving Pdf');
    html2pdf().set(opt).from(pdf).save();
    setTimeout(() => { pdf.style.display = 'none'; }, 1);
}
dwpdf.addEventListener('click', dwnldpdf)
dwpdf.addEventListener('mouseover', () => {
    dwpdf.classList.add('dwpdf_hover');
    dwpdf.style.backgroundColor = '#1f8036';
})
dwpdf.addEventListener('mouseout', () => {
    dwpdf.style.backgroundColor = '#28a745';
    dwpdf.classList.remove('dwpdf_hover');
})