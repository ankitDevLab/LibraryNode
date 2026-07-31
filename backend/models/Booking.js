const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookingNumber: {
      type: String,
      unique: true,
      index: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    libraryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Library",
      required: true,
      index: true,
    },

    seatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seat",
      required: true,
      index: true,
    },

    seatNumber: {
      type: Number,
      required: true,
      min: 1,
    },

    libraryName: {
      type: String,
      required: true,
      trim: true,
    },

    slotId: {
      type: String,
      required: true,
      index: true,
    },

    // Snapshot of slot at booking time
    slotSnapshot: {
      name: {
        type: String,
        required: true,
      },

      startTime: {
        type: String,
        required: true,
      },

      endTime: {
        type: String,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },
    },

    planDuration: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    payment: {
      status: {
        type: String,
        enum: ["Pending", "Paid", "Failed", "Refunded"],
        default: "Pending",
      },

      method: {
        type: String,
        default: "Cash",
      },

      transactionId: {
        type: String,
        default: "",
      },

      paidAt: Date,
    },

    bookingDate: {
      type: Date,
      default: Date.now,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
        "Cancelled",
        "Completed",
        "Expired",
        "Transferred",
        "Renewed",
      ],
      default: "Pending",
      index: true,
    },

    transferHistory: [
      {
        oldSeatNumber: Number,
        newSeatNumber: Number,
        transferredAt: {
          type: Date,
          default: Date.now,
        },
        reason: String,
      },
    ],

    renewHistory: [
      {
        oldEndDate: Date,
        newEndDate: Date,
        amount: Number,
        renewedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    cancellation: {
      cancelledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      cancelledAt: Date,

      reason: String,
    },

    qrCode: {
      type: String,
      default: "",
    },

    remarks: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate active booking
bookingSchema.index({
  libraryId: 1,
  seatId: 1,
  slotId: 1,
  status: 1,
});


// Expiry lookup
bookingSchema.index({
  endDate: 1,
});

module.exports = mongoose.model("Booking", bookingSchema);