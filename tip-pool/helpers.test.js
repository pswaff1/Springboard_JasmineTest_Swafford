describe("sumPaymentTotal", function() {
    it("should calculate the total tip amount when 'type' is 'tipAmt'", function() {
      allPayments = {
        payment1: { billAmt: 50, tipAmt: 10, tipPercent: 20 },
        payment2: { billAmt: 30, tipAmt: 6, tipPercent: 20 },
      };
  
      const totalTipAmt = sumPaymentTotal("tipAmt");
      expect(totalTipAmt).toBe(16); // 10 + 6
    });
  
    it("should calculate the total bill amount when 'type' is 'billAmt'", function() {
      allPayments = {
        payment1: { billAmt: 50, tipAmt: 10, tipPercent: 20 },
        payment2: { billAmt: 30, tipAmt: 6, tipPercent: 20 },
      };
  
      const totalBillAmt = sumPaymentTotal("billAmt");
      expect(totalBillAmt).toBe(80); // 50 + 30
    });
  });
  
  describe("calculateTipPercent", function() {
    it("should calculate the tip percent based on billAmt and tipAmt", function() {
      const tipPercent = calculateTipPercent(50, 10);
      expect(tipPercent).toBe(20); // 10 / 50 * 100 = 20
    });
  
    it("should handle a zero bill amount without causing division by zero", function() {
      const tipPercent = calculateTipPercent(0, 10);
      expect(tipPercent).toBe(0); // 10 / 0 * 100 = NaN, but we expect 0
    });
  });
  
  describe("appendTd", function() {
    it("should append a new td element with the given value to the specified table row", function() {
      const tr = document.createElement("tr");
      appendTd(tr, "Test Value");
  
      const tdElement = tr.querySelector("td");
      expect(tdElement).toBeDefined();
      expect(tdElement.innerText).toBe("Test Value");
    });
  });
  