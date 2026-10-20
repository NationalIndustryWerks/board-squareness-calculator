const customLength = document.getElementById("customLength");
const lengthBox = document.getElementById("length");
const toleranceBox = document.getElementById("tolerance");

let sortAscending = true;

function parseMeasurement(value) {
    value = value.trim();

    if (!value) throw new Error();

    if (value.includes("/")) {

        const parts = value.split(" ");

        if (parts.length === 2) {
            const whole = parseFloat(parts[0]);
            const frac = parts[1].split("/");

            return whole +
                (parseFloat(frac[0]) /
                 parseFloat(frac[1]));
        }

        const frac = value.split("/");

        return parseFloat(frac[0]) /
               parseFloat(frac[1]);
    }

    return parseFloat(value);
}

function updateLengthDisplay() {

    if (customLength.value !== "") {

        lengthBox.disabled = true;

        document.getElementById(
            "usingLength"
        ).textContent =
        `Using Length: ${customLength.value}"`;

    } else {

        lengthBox.disabled = false;

        document.getElementById(
            "usingLength"
        ).textContent =
        `Using Length: ${lengthBox.value}"`;
    }
}

function updateToleranceDisplay() {

    try {

        const value =
            parseMeasurement(
                toleranceBox.value
            );

        document.getElementById(
            "toleranceDisplay"
        ).textContent =
        `Tolerance: ${toleranceBox.value} (${value.toFixed(4)})`;

    } catch {

        document.getElementById(
            "toleranceDisplay"
        ).textContent =
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

        document.getElementById("difference").textContent =
            `Difference: ${difference.toFixed(4)}"`;

        document.getElementById("outSquare").textContent =
            `Out Of Square: ${outSquare.toFixed(4)}"`;

        document.getElementById("perfectDiagonal").textContent =
            `Perfect Diagonal: ${perfect.toFixed(4)}"`;

        let result = "FAIL";

        if (difference <= tolerance) {
            result = "PASS";
        }

        const resultBox =
            document.getElementById("resultBox");

        resultBox.textContent = result;
        resultBox.style.background =
            result === "PASS"
            ? "green"
            : "red";

        saveHistory(
            length,
            width,
            document.getElementById("diag1").value,
            document.getElementById("diag2").value,
            difference,
            outSquare,
            result
        );

    } catch {

        alert(
            "Please enter valid measurements."
        );
    }
}

function convertFraction() {

    try {

        const result =
            parseMeasurement(
                document.getElementById("fractionInput").value
            );

        document.getElementById(
            "decimalOutput"
        ).textContent =
        result.toFixed(4);

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
            localStorage.getItem("boardHistory")
        ) || [];

    history.unshift({
        date:new Date().toLocaleString(),
        length,
        width,
        d1,
        d2,
        difference:difference.toFixed(4),
        outSquare:outSquare.toFixed(4),
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
            localStorage.getItem("boardHistory")
        ) || [];

    let html = "";

    history.forEach(item => {

        const rowClass =
            item.result === "PASS"
            ? "passRow"
            : "failRow";

        html += `
        <tr class="${rowClass}">
            <td>${item.date}</td>
            <td>${item.length}</td>
            <td>${item.width}</td>
            <td>${item.d1}</td>
            <td>${item.d2}</td>
            <td>${item.difference}</td>
            <td>${item.outSquare}</td>
            <td>${item.result}</td>
        </tr>`;
    });

    document.getElementById(
        "historyContent"
    ).innerHTML = html;

    document.getElementById(
        "historyModal"
    ).style.display = "block";
}

function closeHistory() {
    document.getElementById("historyModal").style.display = "none";
}

function sortHistory(field) {

    let history =
        JSON.parse(
            localStorage.getItem("boardHistory")
        ) || [];

    history.sort((a,b) => {

        let aVal = a[field];
        let bVal = b[field];

        if (!isNaN(aVal) && !isNaN(bVal)) {
            aVal = Number(aVal);
            bVal = Number(bVal);
        }

        if (aVal < bVal)
            return sortAscending ? -1 : 1;

        if (aVal > bVal)
            return sortAscending ? 1 : -1;

        return 0;
    });

    sortAscending = !sortAscending;

    localStorage.setItem(
        "boardHistory",
        JSON.stringify(history)
    );

    showHistory();
}

function clearHistory() {

    if(confirm("Clear all history?")) {

        localStorage.removeItem(
            "boardHistory"
        );

        alert("History cleared.");
    }
}

function showCheatSheet() {
    document.getElementById("cheatSheet").style.display = "block";
}

function closeCheatSheet() {
    document.getElementById("cheatSheet").style.display = "none";
}

updateLengthDisplay();
updateToleranceDisplay();
