const customLength = document.getElementById("customLength");
const lengthBox = document.getElementById("length");
const toleranceBox = document.getElementById("tolerance");

function parseMeasurement(value) {
    value = value.trim();

    if (value === "") {
        throw new Error("Empty value");
    }

    if (value.includes("/")) {

        const parts = value.split(" ");

        if (parts.length === 2) {
            const whole = parseFloat(parts[0]);

            const fraction = parts[1].split("/");

            return whole +
                   (parseFloat(fraction[0]) /
                    parseFloat(fraction[1]));
        }

        const fraction = value.split("/");

        return parseFloat(fraction[0]) /
               parseFloat(fraction[1]);
    }

    return parseFloat(value);
}

function updateLengthDisplay() {

    const usingLength =
        document.getElementById("usingLength");

    if (customLength.value !== "") {

        lengthBox.disabled = true;

        usingLength.innerText =
            `Using Length: ${customLength.value}"`;
    }
    else {

        lengthBox.disabled = false;

        usingLength.innerText =
            `Using Length: ${lengthBox.value}"`;
    }
}

function updateToleranceDisplay() {

    try {

        const tolerance =
            parseMeasurement(
                toleranceBox.value
            );

        document.getElementById(
            "toleranceDisplay"
        ).innerText =
        `Tolerance: ${toleranceBox.value} (${tolerance.toFixed(4)})`;

    } catch {

        document.getElementById(
            "toleranceDisplay"
        ).innerText =
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

function calculate() {

    try {

        const length =
            customLength.value !== ""
            ? parseFloat(customLength.value)
            : parseFloat(lengthBox.value);

        const width =
            parseFloat(
                document.getElementById("width").value
            );

        const tolerance =
            parseMeasurement(
                toleranceBox.value
            );

        const d1 =
            parseMeasurement(
                document.getElementById("diag1").value
            );

        const d2 =
            parseMeasurement(
                document.getElementById("diag2").value
            );

        const difference =
            Math.abs(d1 - d2);

        const outSquare =
            difference / 2;

        const perfect =
            Math.sqrt(
                (length * length) +
                (width * width)
            );

        document.getElementById(
            "difference"
        ).innerText =
        `Difference: ${difference.toFixed(4)}"`;

        document.getElementById(
            "outSquare"
        ).innerText =
        `Out Of Square: ${outSquare.toFixed(4)}"`;

        document.getElementById(
            "perfectDiagonal"
        ).innerText =
        `Perfect Diagonal: ${perfect.toFixed(4)}"`;

        const resultBox =
            document.getElementById("resultBox");

        let result = "";

        if (difference <= tolerance) {

            result = "PASS";
            resultBox.innerText = "PASS";
            resultBox.style.background = "green";

        } else {

            result = "FAIL";
            resultBox.innerText = "FAIL";
            resultBox.style.background = "red";
        }

        saveHistory(
            length,
            width,
            d1,
            d2,
            difference,
            outSquare,
            result
        );

    } catch (error) {

        alert(
            "Please enter valid measurements."
        );
    }
}

function convertFraction() {

    try {

        const value =
            parseMeasurement(
                document.getElementById(
                    "fractionInput"
                ).value
            );

        document.getElementById(
            "decimalOutput"
        ).innerText =
        value.toFixed(4);

    } catch {

        alert("Invalid fraction");
    }
}

function saveHistory(
    length,
    width,
    d1,
    d2,
    difference,
    outSquare,
    result
) {

    const history =
        JSON.parse(
            localStorage.getItem(
                "boardHistory"
            )
        ) || [];

    history.unshift({
        date: new Date().toLocaleString(),
        length,
        width,
        d1,
        d2,
        difference: difference.toFixed(4),
        outSquare: outSquare.toFixed(4),
        result
    });

    localStorage.setItem(
        "boardHistory",
        JSON.stringify(history)
    );
}

function showHistory() {

    const history =
        JSON.parse(
            localStorage.getItem(
                "boardHistory"
            )
        ) || [];

    if (history.length === 0) {
        alert("No history saved.");
        return;
    }

    let text = "";

    history.forEach(item => {

        text +=
`${item.date}
Length: ${item.length}
Width: ${item.width}
D1: ${item.d1}
D2: ${item.d2}
Difference: ${item.difference}
Result: ${item.result}

`;
    });

    alert(text);
}

function clearHistory() {

    if (confirm("Clear all history?")) {

        localStorage.removeItem(
            "boardHistory"
        );

        alert("History cleared.");
    }
}

updateLengthDisplay();
updateToleranceDisplay();
