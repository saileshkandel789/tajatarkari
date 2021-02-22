const OrderController = {};
const Order = require("../models/orderSchema");

OrderController.addOrder = async (req, res) => {
  try {
    let order = req.body;
    console.log(order,'order');
    if (order && order._id) {
      
      Order.findByIdAndUpdate(
        order._id,
        { $set: order },
        { new: true }
      )
        .then((update) => {
          return res.status(200).json(update);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
        isDelivered : "notdelivered"
      });
      const new_order_save = await order.save();
      return res.json({
        new_order_save,
        uploaded: true,
      });
    }
  } catch (err) {
    res.json(err);
  }
};
OrderController.getOrders = async (req, res, next) => {
  try {
    const populate = [
      { path: 'shippingAddress', select: { mobileNo: 1,Address:1,City:1, _id: 0 } },
      { path: 'user', select: { name: 1, _id: 0 } }]

      let sortq = '-_id';

    const data = await Order.find().sort(sortq).populate(populate);
    return res.json(data);
  } catch (err) {
    res.json(err);
  }
};
OrderController.getOrderByUser = async (req, res, next) => {
  try {
    const id = req.params.userId;
    const populate = [
      { path: 'shippingAddress', select: { mobileNo: 1,Address:1,City:1, _id: 0 } },
      { path: 'user', select: { name: 1, _id: 0 } }]
    const data = await Order.find({ user: id }).populate(populate);
    return res.json(data);
  } catch (err) {
    res.json(err);
  }
};


module.exports = OrderController;
