import mongoose from  "mongoose"

const MessageSchema = new mongoose.Schema(
  {
    to: { required: true, type: String },
    message: { required: true, type: String },
    user: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
)

MessageSchema.pre("find", function () {
  this.populate("user")
})

const Message = mongoose.model("Message", MessageSchema)

export default Message
