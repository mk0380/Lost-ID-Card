document.addEventListener("DOMContentLoaded", function () {
    const inputFields = document.querySelectorAll('.input-data input');

    inputFields.forEach(input => {
        input.addEventListener('input', function () {
            const label = this.parentNode.querySelector('label');
            if (this.value.trim() !== '') {
                label.classList.add('focused');
            } else {
                label.classList.remove('focused');
            }
        });
    });
});


import { PDFDocument, rgb } from 'https://cdn.skypack.dev/pdf-lib'


const generatePDF = async (name, roll, DOB, department, local, permanent, cond1, cond2, cond3, cond4, lost_place, lost_date) => {

    const exBytes = await fetch("./id-card.pdf").then((res) =>
        res.arrayBuffer()
    );

    const exFont = await fetch("./Sanchez-Regular.ttf").then((res) =>
        res.arrayBuffer()
    );

    const ticFont = await fetch("./DejaVuSans.ttf").then((res) =>
        res.arrayBuffer()
    );

    const pdfDoc = await PDFDocument.load(exBytes);
    pdfDoc.registerFontkit(fontkit);

    const myFont = await pdfDoc.embedFont(exFont)
    const tickFont = await pdfDoc.embedFont(ticFont)


    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const font_size = 10;

    firstPage.drawText(name, {
        x: 226,
        y: 618,
        size: font_size,
        font: myFont,
        color: rgb(0, 0, 0),
    });

    firstPage.drawText(roll, {
        x: 226,
        y: 593,
        size: font_size,
        font: myFont,
        color: rgb(0, 0, 0),
    });
    firstPage.drawText(department, {
        x: 226,
        y: 569,
        size: font_size,
        font: myFont,
        color: rgb(0, 0, 0),
    });
    firstPage.drawText(DOB, {
        x: 226,
        y: 543,
        size: font_size,
        font: myFont,
        color: rgb(0, 0, 0),
    });
    firstPage.drawText(lost_place, {
        x: 226,
        y: 340,
        size: font_size,
        font: myFont,
        color: rgb(0, 0, 0),
    });
    if (cond1) {
        firstPage.drawText("✓", {
            x: 273,
            y: 408,
            size: 35,
            font: tickFont,
            color: rgb(0, 0, 0),
        });
    }
    if (cond2) {
        firstPage.drawText("✓", {
            x: 523,
            y: 385.5,
            size: 35,
            font: tickFont,
            color: rgb(0, 0, 0),
        });
    }
    if (cond3) {
        firstPage.drawText("✓", {
            x: 523,
            y: 408,
            size: 35,
            font: tickFont,
            color: rgb(0, 0, 0),
        });
    }
    if (cond4) {
        firstPage.drawText("✓", {
            x: 273,
            y: 385.5,
            size: 35,
            font: tickFont,
            color: rgb(0, 0, 0),
        });
    }
    firstPage.drawText(lost_date, {
        x: 226,
        y: 315,
        size: font_size,
        font: myFont,
        color: rgb(0, 0, 0),
    });
    if (local.length < 54) {
        firstPage.drawText(local, {
            x: 226,
            y: 520,
            size: font_size,
            font: myFont,
            color: rgb(0, 0, 0),
        });
    } else {
        firstPage.drawText(local.substring(0, 54) + "-", {
            x: 226,
            y: 520,
            size: font_size,
            font: myFont,
            color: rgb(0, 0, 0),
        });

        firstPage.drawText(local.substring(54, local.length), {
            x: 226,
            y: 506,
            size: font_size,
            font: myFont,
            color: rgb(0, 0, 0),
        });
    }

    if (permanent.length < 54) {
        firstPage.drawText(permanent, {
            x: 226,
            y: 495,
            size: font_size,
            font: myFont,
            color: rgb(0, 0, 0),
        });
    } else {
        firstPage.drawText(permanent.substring(0, 54) + "-", {
            x: 226,
            y: 495,
            size: font_size,
            font: myFont,
            color: rgb(0, 0, 0),
        });

        firstPage.drawText(permanent.substring(54, permanent.length), {
            x: 226,
            y: 481,
            size: font_size,
            font: myFont,
            color: rgb(0, 0, 0),
        });
    }

    const pdfBytes = await pdfDoc.save();

    var file = new File(
        [pdfBytes],
        "I-Card Reissue Form.pdf",
        {
            type: "application/pdf;charset=utf-8",
        }
    );
    saveAs(file);

    // const uri =await pdfDoc.saveAsBase64({dataUri:true})

    // document.querySelector('#mypdf').src = uri

};

function formatDate(date) {
    if(date.length==0){
        return ""
    }
    var inputDate = date.split('-');
    var formattedDate = inputDate[2]+"-"+inputDate[1]+"-"+inputDate[0];
    return formattedDate;
}


const submitBtn = document.getElementById('btn')

const name = document.querySelector("#studentInput")
const roll = document.querySelector("#rollInput")
const DOB = document.querySelector("#DOB");
const department = document.querySelector("#branchInput")
const local = document.querySelector("#locAddInput")
const permanent = document.querySelector("#perAddInput")

const con1 = document.querySelector("#con1")
const con2 = document.querySelector("#con2")
const con3 = document.querySelector("#con3")
const con4 = document.querySelector("#con4")

const lost_place = document.querySelector("#lost_place")
const lost_date = document.querySelector("#lost_date")

submitBtn.addEventListener('click', (ev) => {

    ev.preventDefault()

    if (name.value.length == 0 || roll.value.length == 0 || DOB.value.length == 0 || department.value.length == 0 || local.value.length == 0 || permanent.value.length == 0) {
        alert("Please fill all the required details before submitting")
        return
    }

    if (!con1.checked && !con2.checked && !con3.checked && !con4.checked) {
        alert("Please check the condition which is reponsible for issuing your new ID Card")
        return
    }

    generatePDF(name.value.toUpperCase(), roll.value, formatDate(DOB.value), department.value.toUpperCase(), local.value.toUpperCase(), permanent.value.toUpperCase(), con1.checked, con2.checked, con3.checked, con4.checked, lost_place.value.toUpperCase(), formatDate(lost_date.value))
})






