describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it("should not add a new server if the serverName is empty", function() {
    serverNameInput.value = "";
    const initialServerCount = Object.keys(allServers).length;

    submitServerInfo();

    expect(Object.keys(allServers).length).toBe(initialServerCount);
  });

  it("should update the server table with the current servers and average tip amount", function() {
    serverTbody.innerHTML = ""; // Clear the table body
    allServers = {
      server1: { serverName: "Server 1" },
      server2: { serverName: "Server 2" },
    };
    serverId = 2; // Set the serverId to match the number of servers

    updateServerTable();

    const tableRows = serverTbody.querySelectorAll("tr");
    expect(tableRows.length).toBe(2);

    const firstRow = tableRows[0];
    expect(firstRow.querySelector("td").textContent).toBe("Server 1");
    expect(firstRow.querySelectorAll("td")[1].textContent).toMatch(/\$\d+\.\d{2}/);

    const secondRow = tableRows[1];
    expect(secondRow.querySelector("td").textContent).toBe("Server 2");
    expect(secondRow.querySelectorAll("td")[1].textContent).toMatch(/\$\d+\.\d{2}/);
  });

  afterEach(function() {
    serverId = 0;
    serverTbody.innerHTML = '';
    allServers = {};
    document.getElementById("serverName").value = "";
  });
});
