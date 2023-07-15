import React from "react";

import Friend from "./Friend";
import WidgetWrapper from "./WidgetWrapper";

export default function PostWidget() {
  return (
    <WidgetWrapper m="2rem 0">
      <Friend />
    </WidgetWrapper>
  );
}
