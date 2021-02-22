const mongoose  = require('mongoose');
const Schema = mongoose.Schema;


const orderSchema = Schema(
  {
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'ShippingAddress',
    },
    paymentMethod: {
      type: String,
      required: true,
      default : 'Cashondelivery'
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isDelivered: {
      type: String,
      enum: ['notdelivered', 'delivered'],
      // required: true,
      // default: 'notdelivered',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = Order = mongoose.model("Order", orderSchema);
