import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={322}
      height={20}
      viewBox="0 0 322 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M1 19.5s140.5-42.5 320 0" stroke="#fff" />
    </Svg>
  )
}

export default SvgComponent
