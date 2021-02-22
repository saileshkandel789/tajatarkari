const ShipAddressController = {};
const ShipAddress = require("../models/shippingAddress");

ShipAddressController.addAddress = async (req, res,next) => {
  try {
    let Address = req.body;
    console.log(req.body ,'requser')
    // throw new Error('cant add');

    if (Address && Address._id) {
        ShipAddress.findByIdAndUpdate(
            Address._id,
        { $set: Address },
        { new: true }
      )
        .then((update) => {
          return res.status(200).json(update);
        })
        .catch((err) => {
          const error = new Error(err);
          return next(error);
        });
    } else {
      const Address = new ShipAddress({
        name: req.body.name,
        mobileNo: req.body.mobileNo,
        Address: req.body.Address,
        City : req.body.City,
        user: req.user._id
      });
      const new_address_save = await Address.save();
      return res.json({
        new_address_save,
        uploaded: true,
      });
    }
  } catch (err) {
    console.log('kkkkkk');
    const error = new Error(err);
        return next(error);
  }
};
ShipAddressController.getAddress = async (req, res, next) => {
  try {
    const data = await ShipAddress.find();
    return res.json(data);
  } catch (err) {
    res.json(err);
  }
};
ShipAddressController.getUserAddress = async (req, res, next) => {
  try {
    const id = req.params.userId;
    const data = await ShipAddress.findOne({
        user: id,
    });
    return res.json(data);
  } catch (err) {
    res.json(err);
  }
};


module.exports = ShipAddressController;
