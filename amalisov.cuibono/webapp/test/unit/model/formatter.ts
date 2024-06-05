import formatter from "amalisov/cuibono/model/formatter";

// format amount tests
QUnit.module("FormatterAmount Tests",{});

QUnit.test("should correctly format a normal number", assert => {
    assert.strictEqual(formatter.formatAmount(1234.567 as number), 1234.57, "Formats normal numbers correctly");
});

QUnit.test("should correctly remove commas and format the number", assert => {
    assert.strictEqual(formatter.formatAmount('1,234.567' as any,), 1234.57, "Correctly removes commas and formats number");
});

QUnit.test("should return 0 for null input", assert => {
    assert.strictEqual(formatter.formatAmount(null as any), 0, "Returns 0 for null input");
});

QUnit.test("should return 0 for undefined input", assert => {
    assert.strictEqual(formatter.formatAmount(undefined as any), 0, "Returns 0 for undefined input");
});

QUnit.test("should handle non-numeric characters", assert => {
    assert.strictEqual(formatter.formatAmount('1,234.56ab' as any), 1234.56, "Handles non-numeric characters and formats number");
});

// format Date tests
QUnit.module("Date Format", {});

function dateStateTestCase(oOptions: {Date: string | null}, expected: string) {
    //Act: call formatter with data
    const sFormattedDate = formatter.formatDate(oOptions.Date);

    //Assert: check if the formatted date matches the value
    QUnit.assert.strictEqual(sFormattedDate, expected, `Date ${oOptions.Date} should be formatted as ${expected}`)

}

// Add individual test cases
QUnit.test("formatDate - valid date", assert => {
    dateStateTestCase({ Date: "2023-06-05T00:00:00Z" }, "05.06.2023");
});

QUnit.test("formatDate - null date", assert => {
    dateStateTestCase({ Date: null }, null as any); 
});

QUnit.test("formatDate - empty string date", assert => {
    dateStateTestCase({ Date: "" }, "");
});

//Limit text Test
QUnit.module("Limit Text", {});

QUnit.test("should correctly format a text less than 7 characters", assert => {
    assert.strictEqual(formatter.limitText("Test" as string), "Test", "Formats strings less than 7 correctly");
});
QUnit.test("should correctly format a text exactly 7 characters", assert => {
    assert.strictEqual(formatter.limitText("Testing" as string), "Testing", "Formats strings with 7 characters correctly");
});

QUnit.test("should correctly format text longer than 7", assert => {
    assert.strictEqual(formatter.limitText('Formatted fff' as string,), "Formatt...", "Correctly shortens texts");
});

QUnit.test("should return null for null input", assert => {
    assert.strictEqual(formatter.limitText(null as null), null, "Returns null for null input");
});

QUnit.test("should correctly format an empty string", assert => {
    assert.strictEqual(formatter.limitText("" as string,), "", "Correctly Formats an empty string");
});
