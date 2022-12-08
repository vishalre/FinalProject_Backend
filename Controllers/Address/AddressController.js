const AddressController = (app) => {
  app.get("/api/address", async (req, res) => {
    const address = await findAllAddressAdao();
    res.json(address);
  });
  app.post("/api/address", async (req, res) => {
    const address = await createAddressAdao(req.address);
    res.json(address);
  });
};
export default AddressController;
