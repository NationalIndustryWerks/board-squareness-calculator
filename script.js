const customLength =
document.getElementById("customLength");

const lengthBox =
document.getElementById("length");

customLength.addEventListener("input", () =>
    lengthBox.addEventListener("change", () =>
{
    if(customLength.value === "")
    {
        document.getElementById(
            "usingLength"
        ).innerText =
        `Using Length: ${lengthBox.value}"`;
    }
});

{
    if(customLength.value !== "")
    {
        lengthBox.disabled = true;

        document.getElementById(
            "usingLength"
        ).innerText =
        `Using Length: ${customLength.value}"`;
    }
    else
    {
        lengthBox.disabled = false;

        document.getElementById(
            "usingLength"
        ).innerText =
        `Using Length: ${lengthBox.value}"`;
    }
});

function parseMeasurement(value)
{
    value = value.trim();

    if(value.includes("/"))
    {
        let parts = value.split(" ");

        if(parts.length === 2)
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
                document.getElementById(
                    "tolerance"
                ).value
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
            Math.abs(d1-d2);

        let outSquare =
            difference/2;

        let perfect =
            Math.sqrt(
                length*length +
                width*width
            );

        document.getElementById(
            "difference"
        ).innerText =
        "Difference: " +
        difference.toFixed(4);

        document.getElementById(
            "outSquare"
        ).innerText =
        "Out Of Square: " +
        outSquare.toFixed(4);

        document.getElementById(
            "perfectDiagonal"
        ).innerText =
        "Perfect Diagonal: " +
        perfect.toFixed(4);

        let pass =
            difference <= tolerance;

        let box =
            document.getElementById(
                "resultBox"
            );

        if(pass)
        {
            box.innerText = "PASS";
            box.style.background =
            "green";
        }
        else
        {
            box.innerText = "FAIL";
            box.style.background =
            "red";
        }
    }
    catch
    {
        alert(
          "Please enter valid values."
        );
    }
}

function convertFraction()
{
    let result =
        parseMeasurement(
            document.getElementById(
                "fractionInput"
            ).value
        );

    document.getElementById(
        "decimalOutput"
    ).innerText =
    result.toFixed(4);
}

function showCheatSheet()
{
    document.getElementById(
        "cheatSheet"
    ).style.display="block";
}

function closeCheatSheet()
{
    document.getElementById(
        "cheatSheet"
    ).style.display="none";
}
