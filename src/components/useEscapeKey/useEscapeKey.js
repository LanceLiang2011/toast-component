import React from "react";

function useEscapeKey(callback) {
  React.useEffect(() => {
    function fireWhenEsc(event) {
      if (event.key === "Escape") callback();
    }
    document.addEventListener("keydown", fireWhenEsc);

    return () => {
      document.removeEventListener("keydown", fireWhenEsc);
    };
  }, [callback]);
}

export default useEscapeKey;
