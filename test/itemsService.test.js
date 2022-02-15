const itemsService = require("../src/itemsService");
const itemsData = require("../src/itemsData");
const sinon = require("sinon");

test("Deve obter os itens", async function () {
	const items = await itemsService.getItems(itemsData);
	expect(items).toHaveLength(3);
});

test("Deve obter os itens com stub", async function () {
	sinon.stub(itemsData, "getItems").returns([ { id_item: 4 }]);
	const items = await itemsService.getItems(itemsData);
	expect(items).toHaveLength(1);
	sinon.restore();
});

test("Deve obter os itens com spy", async function () {
	const spy = sinon.spy(itemsData, "getItems");
	const items = await itemsService.getItems(itemsData);
	expect(items).toHaveLength(3);
	sinon.assert.calledOnce(spy);
	sinon.restore();
});

test("Deve obter os itens com mock", async function () {
	const mock = sinon.mock(itemsService);
	mock.expects("getItems").once().returns([ { id_item: 4 }]);
	const items = await itemsService.getItems(itemsData);
	expect(items).toHaveLength(1);
	mock.verify();
	sinon.restore();
});

test("Deve obter os itens com fake", async function () {
	const itemsDataFake = {
		getItems() {
			return [ { id_item: 4}]
		}
	};
	const items = await itemsService.getItems(itemsDataFake);
	expect(items).toHaveLength(1);
});
