import { model, Schema } from 'mongoose'
import { hash, compare } from 'bcrypt'

export const Roles = Object.freeze({
  Learner: 'learner',
  Contributor: 'contributor',
})

const UserProfile = new Schema({
  firstName: String,
  lastName: String,
})

const User = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    profile: {
      type: UserProfile,
    },

    role: {
      type: String,
      enum: Object.values(Roles),
      default: Roles.Learner,
    },

    currentRoadmaps: [
      {
        roadmapId: {
          type: Schema.Types.ObjectId,
          ref: 'roadmaps',
        },

        finished: [
          {
            type: Schema.Types.ObjectId,
            ref: 'nodes',
          },
        ],
      },
    ],

    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

User.pre('save', async function (next) {
  try {
    if (!this.isModified('password') || !this.password) return next()

    const hashedPassword = await hash(this.password, 10)
    this.password = hashedPassword
    next()
  } catch (err) {
    next(err)
  }
})

User.methods.comparePassword = async function (password) {
  return compare(password, this.password)
}

export default model('User', User, 'users')
