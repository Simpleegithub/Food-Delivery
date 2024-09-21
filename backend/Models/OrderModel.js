import mongooose from "mongoose";

const OrderSchema = new mongooose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },

    address: {
      type: Object,
      required: true,
    },

    status: {
      type: String,
      default: "Food Processing",
    },
    date: {
      type: Date,
      default: Date.now,
    },

    payment: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const OrderModel =
  mongooose.models?.Order || mongooose.model("Order", OrderSchema);

export default OrderModel;
