import { model, Schema } from 'mongoose'

const Leave = new Schema({
  title: {
    type: String,
    required: true,
  },

  references: [
    {
      type: String,
      default: [],
    },
  ],
})

const Node = new Schema({
  title: {
    type: String,
    required: true,
  },

  childrens: [
    {
      type: Node,
      default: [],
    },
  ],

  leaves: [
    {
      type: Leave,
      default: [],
    },
  ],
})

const Roadmap = new Schema(
  {
    field: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    author: [
      {
        type: String,
      },
    ],

    rating: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'users',
        },

        point: {
          type: Number,
          default: 0,
        },
      },
    ],

    content: [
      {
        type: Node,
        default: [],
      },
    ],
  },
  { timestamps: true }
)

export default model('Roadmap', Roadmap, 'roadmaps')
