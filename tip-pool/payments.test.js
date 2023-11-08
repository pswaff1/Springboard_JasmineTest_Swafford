describe("Payment System Tests", function() {
    beforeEach(function() {
      // Set up a fresh environment for each test
      billAmtInput.value = "";
      tipAmtInput.value = "";
      paymentTbody.innerHTML = "";
      summaryTds[0].innerText = "";
      summaryTds[1].innerText = "";
      summaryTds[2].innerText = "";
      allPayments = {};
    });
  
    describe("submitPaymentInfo", function() {
      it("should add a new payment to allPayments and update tables when valid inputs are provided", async function() {
        billAmtInput.value = "50";
        tipAmtInput.value = "10";
        const initialPaymentCount = Object.keys(allPayments).length;
  
        await submitPaymentInfo();
  
        expect(Object.keys(allPayments).length).toBe(initialPaymentCount + 1);
  
        const paymentTableRow = document.getElementById(`payment${paymentId}`);
        expect(paymentTableRow).toBeDefined();
  
        expect(paymentTableRow.querySelectorAll("td")[0].innerText).toBe("$50");
        expect(paymentTableRow.querySelectorAll("td")[1].innerText).toBe("$10");
        expect(paymentTableRow.querySelectorAll("td")[2].innerText).toBe("20%");
  
        const summaryTds = document.querySelectorAll('#summaryTable tbody tr td');
        expect(summaryTds[0].innerText).toBe("$50");
        expect(summaryTds[1].innerText).toBe("$10");
        expect(summaryTds[2].innerText).toBe("20%");
      });
  
      it("should not add a new payment if billAmt is not positive", async function() {
        billAmtInput.value = "0";
        tipAmtInput.value = "10";
        const initialPaymentCount = Object.keys(allPayments).length;
  
        await submitPaymentInfo();
  
        expect(Object.keys(allPayments).length).toBe(initialPaymentCount);
      });
  
      it("should not add a new payment if tipAmt is negative", async function() {
        billAmtInput.value = "50";
        tipAmtInput.value = "-10";
        const initialPaymentCount = Object.keys(allPayments).length;
  
        await submitPaymentInfo();
  
        expect(Object.keys(allPayments).length).toBe(initialPaymentCount);
      });
    });
  
    describe("createCurPayment", function() {
      it("should create a valid payment object when valid inputs are provided", function() {
        billAmtInput.value = "50";
        tipAmtInput.value = "10";
  
        const curPayment = createCurPayment();
  
        expect(curPayment).toEqual({
          billAmt: "50",
          tipAmt: "10",
          tipPercent: 20,
        });
      });
  
      it("should return undefined when billAmt is not positive", function() {
        billAmtInput.value = "0";
        tipAmtInput.value = "10";
  
        const curPayment = createCurPayment();
  
        expect(curPayment).toBeUndefined();
      });
  
      it("should return undefined when tipAmt is negative", function() {
        billAmtInput.value = "50";
        tipAmtInput.value = "-10";
  
        const curPayment = createCurPayment();
  
        expect(curPayment).toBeUndefined();
      });
    });
  
    describe("appendPaymentTable", function() {
      it("should append a new payment row to the payment table", function() {
        const curPayment = {
          billAmt: "50",
          tipAmt: "10",
          tipPercent: 20,
        };
  
        appendPaymentTable(curPayment);
  
        const paymentTableRow = document.getElementById(`payment${paymentId}`);
        expect(paymentTableRow).toBeDefined();
      });
    });
  
    describe("updateSummary", function() {
      it("should update the summary table with the correct values", function() {
        allPayments = {
          payment1: { billAmt: "50", tipAmt: "10", tipPercent: 20 },
          payment2: { billAmt: "30", tipAmt: "6", tipPercent: 20 },
        };
  
        updateSummary();
  
        const summaryTds = document.querySelectorAll('#summaryTable tbody tr td');
        expect(summaryTds[0].innerText).toBe("$80"); // 50 + 30
        expect(summaryTds[1].innerText).toBe("$16"); // 10 + 6
        expect(summaryTds[2].innerText).toBe("20%");
      });
  
      it("should handle empty allPayments object without causing errors", function() {
        allPayments = {};
  
        updateSummary();
  
        const summaryTds = document.querySelectorAll('#summaryTable tbody tr td');
        expect(summaryTds[0].innerText).toBe("$0");
        expect(summaryTds[1].innerText).toBe("$0");
        expect(summaryTds[2].innerText).toBe("0%");
      });
    });

    afterEach(function() {
        document.getElementById("billAmt").value = "";
        document.getElementById("tipAmt").value = "";
        let summaryTds = document.querySelectorAll('#summaryTable tbody tr td');
        summaryTds[0].innerText = "";
        summaryTds[1].innerText = "";
        summaryTds[2].innerText = "";
      });
  });
  