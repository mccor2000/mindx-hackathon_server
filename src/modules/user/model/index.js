import { model, Schema } from 'mongoose'
import { hash, compare } from 'bcrypt'

const Genders = Object.freeze({
  Male: 'male',
  Female: 'female',
  Other: 'other',
})

export const Roles = Object.freeze({
  User: 'user',
  Staff: 'staff',
  Admin: 'admin',
})

const UserProfile = new Schema({
  firstName: String,
  lastName: String,
  gender: { type: String, enum: Object.values(Genders) },
  studentID: String,
  school: String,
  picture: String,
})

const UserCredential = new Schema({
  password: String,
  githubId: String,
  googleId: String,
})

const RegisteredCourse = new Schema({
  courseId: Schema.Types.ObjectId,

  finishedLessons: [Schema.Types.ObjectId],

  fullfill: Number,
})

const User = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    profile: {
      type: UserProfile,
    },

    credentials: {
      type: UserCredential,
      required: true,
    },

    role: {
      type: String,
      enum: Object.values(Roles),
      default: Roles.User,
    },

    courses: [
      {
        type: RegisteredCourse,
      },
    ],

    verified: {
      type: Boolean,
      default: false,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

UserCredential.pre('save', async function (next) {
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
  return compare(password, this.credentials.password)
}

export default model('User', User, 'users')
