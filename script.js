const customLength =
document.getElementById("customLength");

const lengthBox =
document.getElementById("length");

const toleranceBox =
document.getElementById("tolerance");



function parseMeasurement(value)
{
    value = value.trim();

    if (value.includes("/"))
    {
        let parts = value.split(" ");

        if (parts.length === 2)
        {
            let whole =
                parseFloat(parts[0]);

            let frac =
                parts[1].split("/");

            return whole +
                parseFloat(frac[0]) /
                parseFloat(frac[1]);
        }

        let frac =
            value.split("/");

        return parseFloat(frac[0]) /
               parseFloat(frac[1]);
    }

    return parseFloat(value);
}



function updateLengthDisplay()
{
    const usingLength =
        document.getElementById(
            "usingLength"
        );

    if (customLength.value !== "")
    {
        lengthBox.disabled = true;

        usingLength.innerText =
            `Using Length: ${customLength.value}"`;
    }
    else
    {
        lengthBox.disabled = false;

        usingLength.innerText =
            `Using Length: ${lengthBox.value}"`;
    }
}



function updateToleranceDisplay()
{
    const display =
        document.getElementById(
            "toleranceDisplay"
        );

    try
    {
        let tolerance =
            parseMeasurement(
                toleranceBox.value
            );

        display.innerText =
            `Tolerance: ${toleranceBox.value} (${tolerance.toFixed(4)})`;
    }
    catch
    {
        display.innerText =
            "Tolerance: Invalid";
    }
}



customLength.addEventListener(
    "input",
    updateLengthDisplay
);

lengthBox.addEventListener(
    "change",
    updateLengthDisplay
);

toleranceBox.addEventListener(
    "input",
    updateToleranceDisplay
);



function calculate()
{
    try
    {
        let length =
            customLength.value !== ""
            ?
            parseFloat(customLength.value)
            :
            parseFloat(lengthBox.value);

        let width =
            parseFloat(
                document.getElementById(
                    "width"
                ).value
            );

        let tolerance =
            parseMeasurement(
                toleranceBox.value
            );

        let d1 =
            parseMeasurement(
                document.getElementById(
                    "diag1"
                ).value
            );

        let d2 =
            parseMeasurement(
                document.getElementById(
                    "diag2"
                ).value
            );

        let difference =
            Math.abs(d1 - d2);

        let outSquare =
            difference / 2;

        let perfect =
            Math.sqrt(
                length * length +
                width * width
            );

        document.getElementById(
            "difference"
        ).innerText =
            `Difference: ${difference.toFixed(4)}"`;

        document.getElementById(
            "outSquare"
        ).innerText =
            `Out Of Square: ${outSquare.toFixed(4)}"`;
