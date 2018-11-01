import formatMoney from "../lib/formatMoney";

describe("formatMoney Function", () => {
  it("works with fractional euros", () => {
    expect(formatMoney(1)).toEqual("0,01 €");
    expect(formatMoney(10)).toEqual("0,10 €");
    expect(formatMoney(9)).toEqual("0,09 €");
    expect(formatMoney(40)).toEqual("0,40 €");
  });

  it("leave cents out for whole euros", () => {
    expect(formatMoney(5000)).toEqual("50 €");
    expect(formatMoney(100)).toEqual("1 €");
    expect(formatMoney(50000000)).toEqual("500 000 €");
  });
  
  it("works with whole and fractional euros", () => {
    expect(formatMoney(5012)).toEqual("50,12 €");
    expect(formatMoney(101)).toEqual("1,01 €");
    expect(formatMoney(110)).toEqual("1,10 €");
    expect(formatMoney(1234567890)).toEqual("12 345 678,90 €");
    expect(formatMoney(31823781027319023719)).toEqual("318 237 810 273 190 300,00 €");
  });
});