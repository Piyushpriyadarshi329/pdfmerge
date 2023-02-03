import React from 'react'
import { MathComponent } from "mathjax-react";

export default function Eqution() {
  return (
    <MathComponent tex={String.raw`lim┬(x→0)⁡((∫_0^(x^2)▒sec^2⁡〖t dt〗 )/(x sin⁡x ))`} />
 )
}
