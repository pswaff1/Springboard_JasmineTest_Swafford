
it('should calculate the monthly payment correctly', function () {
  const values = {
    amount: 100000,
    years: 8,
    rate: 5.8
  };
  expect(calculateMonthlyPayment(values)).toEqual('1304.43');
});



