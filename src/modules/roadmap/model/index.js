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
            remove: [{ type: Schema.Types.ObjectId, ref: 'nodes' }],
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
