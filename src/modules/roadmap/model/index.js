import { model, Schema } from 'mongoose'

const NodeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  overview: {
    type: String,
  },

  references: [
    {
      description: String,
      url: String,
    },
  ],

  parent: {
    type: Schema.Types.ObjectId,
    ref: 'nodes',
    default: null,
  },

  children: [
    {
      type: Schema.Types.ObjectId,
      ref: 'nodes',
    },
  ],

  position: {
    x: Number,
    y: Number,
  },
})

NodeSchema.pre('save', async function (next) {
  try {
    if (!this.parent || !this.isModified('parent')) return next()

    await Node.findByIdAndUpdate(this.parent, { $push: { children: this._id } })
      .lean()
      .exec()

    next()
  } catch (err) {
    console.log(err)
    next(err)
  }
})

NodeSchema.pre('remove', async function (next) {
  try {
    const newParent = this.parent
    const updateParent = this.children.map((child) =>
      Node.findByIdAndUpdate(child, { parent: newParent })
    )

    await Promise.all(updateParent)
    next()
  } catch (err) {
    next(err)
  }
})

const RoadmapSchema = new Schema(
  {
    field: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

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
        type: Schema.Types.ObjectId,
        ref: 'nodes',
      },
    ],

    links: [
      {
        id: String,
        source: String,
        target: String,
      },
    ],

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },

    contributors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    ],

    contributes: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'users' },
        changes: [
          {
            add: [{ type: Schema.Types.ObjectId, ref: 'nodes' }],
            update: [
              {
                currentNodeId: Schema.Types.ObjectId,
                updatedNodeId: Schema.Types.ObjectId,
              },
            ],
            delete: [{ type: Schema.Types.ObjectId, ref: 'nodes' }],
          },
        ],
        isOpen: {
          type: Boolean,
          default: true,
        },
      },
    ],
  },
  { timestamps: true }
)

export const Node = model('Node', NodeSchema, 'nodes')
export const Roadmap = model('Roadmap', RoadmapSchema, 'roadmaps')
