import userAPIservices from "./userAPIservices"
import albumAPIservices from "./albumAPIservices"
import imageAPIservices from "./imageAPIservices"

export default {
  ...userAPIservices,
  ...albumAPIservices,
  ...imageAPIservices,
}